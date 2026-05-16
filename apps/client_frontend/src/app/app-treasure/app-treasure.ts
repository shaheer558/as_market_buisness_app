import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  form,
  max,
  min,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';

interface PaymentMethod {
  label: string;
  value: string;
}
interface DestinationAccount {
  label: string;
  value: string;
}
interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  reference: string;
}

interface depositForm {
  depositAmount: number | null;
  depositMethod: string;
  depositReference: string;
}

interface withdrawForm {
  withdrawAmount: number | null;
  withdrawDestination: string;
  withdrawPurpose: string;
}

@Component({
  selector: 'app-app-treasure',
  standalone: false,
  templateUrl: './app-treasure.html',
  styleUrls: ['./app-treasure.css', '../../output.scss'],
  providers: [CurrencyPipe],
})
export class AppTreasure {
  // Balance and limits
  currentBalance = signal<number>(520000);
  chunkSize = signal<number>(50000);

  //track timeouts
  timeOutCall = signal<ReturnType<typeof setTimeout> | undefined>(undefined);

  displayDepositFormError = signal<boolean>(false);
  displayWithdrawFormError = signal<boolean>(false);

  depositFormModel = signal<depositForm>({
    depositAmount: null,
    depositMethod: '',
    depositReference: '',
  });

  withdrawFormModel = signal<withdrawForm>({
    withdrawAmount: null,
    withdrawDestination: '',
    withdrawPurpose: '',
  });

  //create deposit form
  depositForm = form(
    this.depositFormModel,
    (schemaPath) => {
      required(schemaPath.depositAmount, {
        message: 'Please enter a valid amount.',
      });
      required(schemaPath.depositMethod, {
        message: 'please select deposit method',
      });

      min(schemaPath.depositAmount, 1, {
        message: 'Please enter a valid amount.',
      });
      minLength(schemaPath.depositMethod, 1, {
        message: 'Invalid Deposit Method',
      });
    },
    {
      submission: {
        action: async (field) => {
          console.log('Deposit Form Submitted: ' + field().value());
          alert('Opening payment gateway...');
        },
        onInvalid: (field) => {
          this.displayDepositFormError.update(() => true);
          //turn focus to the field
          field().errorSummary()[0].fieldTree().focusBoundControl();

          //clear any timeout
          clearTimeout(this.timeOutCall());
          //disappear error after 5 seconds
          this.timeOutCall.update(() =>
            setTimeout(() => {
              this.displayDepositFormError.update(() => false);
              this.timeOutCall.update(() => undefined);
            }, 5000),
          );
        },
      },
    },
  );

  //create withdraw form
  withdrawForm = form(
    this.withdrawFormModel,
    (schemaPath) => {
      required(schemaPath.withdrawAmount, {
        message: 'Please enter a valid amount.',
      });
      required(schemaPath.withdrawDestination, {
        message: 'Please select reciever account',
      });

      max(schemaPath.withdrawAmount, this.currentBalance(), {
        message: 'Insufficient balance.',
      });
      max(schemaPath.withdrawAmount, this.chunkSize(), {
        message: 'Amount exceeds chunk size limit.',
      });
      min(schemaPath.withdrawAmount, 1, {
        message: 'Please enter a valid amount.',
      });
      minLength(schemaPath.withdrawDestination, 1, {message: 'Receiver account info is required'});
    },
    {
      submission: {
        action: async (field) => {
          if (field().value().withdrawAmount! > this.approvalThreshold()) {
            this.pendingApproval.update(() => true);
            return;
          }

          // Simulate OTP flow for normal withdrawals
          alert('OTP sent to registered phone. Verify to proceed.');
        },
        onInvalid: (field) => {
          //display form errors
          this.displayWithdrawFormError.update(() => true);
          //turn focus to the field
          field().errorSummary()[0].fieldTree().focusBoundControl();
          //clear previous timeout
          clearTimeout(this.timeOutCall());
          //disappear error after 5 seconds
          this.timeOutCall.update(() =>
            setTimeout(() => {
              this.displayWithdrawFormError.update(() => false);
              this.timeOutCall.update(() => undefined);
            }, 5000),
          );
        },
      },
    },
  );

  // Tab state for mobile
  activeTab: 'deposit' | 'withdraw' = 'deposit';

  // Mock payment methods and destinations
  paymentMethods: PaymentMethod[] = [
    { label: 'Mastercard ****1234', value: 'mc' },
    { label: 'Easypaisa', value: 'ep' },
    { label: 'Jazzcash', value: 'jc' },
  ];
  destinationAccounts: DestinationAccount[] = [
    { label: 'Easypaisa – 0300****78', value: 'ep_acct' },
    { label: 'Jazzcash – 0321****45', value: 'jc_acct' },
    { label: 'Bank – 123456789', value: 'bank' },
  ];

  // Transaction history
  transactions: Transaction[] = [
    {
      date: '15 Apr 2026',
      type: 'Deposit',
      amount: 50000,
      status: 'Completed',
      reference: 'TXN001',
    },
    {
      date: '12 Apr 2026',
      type: 'Withdrawal',
      amount: -20000,
      status: 'Completed',
      reference: 'TXN002',
    },
    {
      date: '10 Apr 2026',
      type: 'Withdrawal',
      amount: -15000,
      status: 'Pending',
      reference: 'TXN003',
    },
    {
      date: '05 Apr 2026',
      type: 'Deposit',
      amount: 100000,
      status: 'Completed',
      reference: 'TXN004',
    },
  ];

  // Pagination
  currentPage = 1;
  totalPages = 2;

  // Large withdrawal threshold (1% of total app treasure – will be fetched from backend)
  approvalThreshold = signal<number>(Math.round(this.currentBalance() * 0.01)); // 1% of balance

  // Whether a withdrawal request is pending unanimous approval
  pendingApproval = signal<boolean>(false);

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
