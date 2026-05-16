import { AfterViewInit, Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { form } from '@angular/forms/signals';

interface SystemConfiguration {
  appOpenTime: string;
  appCloseTime: string;
  chunkSize: number;
  defaultCommission: number;
  defaultRiderFee: number;
  riderProfitShare: number;
  freeDeliveryEnabled: boolean;
  discountEventPercent: number;
  fuelPricePerL: number;
  fuelPricePerkWH: number;
  dividendDistribution: Record<string, number>;
}

@Component({
  selector: 'app-system-config',
  standalone: false,
  templateUrl: './system-config.html',
  styleUrls: ['./system-config.css', '../../output.scss'],
})
export class SystemConfig implements OnInit, AfterViewInit {
  isEditing = false;
  hasPendingRequest = false; // set true by GET /configuration/pending

  config = signal<SystemConfiguration>({
    appOpenTime: '08:00',
    appCloseTime: '23:00',
    chunkSize: 50000,
    defaultCommission: 12.5,
    defaultRiderFee: 50.0,
    riderProfitShare: 70,
    freeDeliveryEnabled: true,
    discountEventPercent: 10,
    fuelPricePerL: 280.5,
    fuelPricePerkWH: 50,
    dividendDistribution: {
      'Client A': 50,
      'Client B': 30,
      'Client C': 20,
    },
  });

  configForm = form(this.config);

  draftConfig = signal<SystemConfiguration>({ ...this.config() });

  // draftConfigForm.freeDeliveryEnabled is typed as boolean in SystemConfiguration.
  // The template error happens because the signal form binding for the select expects string.
  // Fix by representing freeDeliveryEnabled as a string in the draft form.
  draftConfigForm = form(this.draftConfig);

  ngOnInit(): void {
    // In production: fetch current config and pending request status
    // GET /configuration
    // GET /configuration/pending → set hasPendingRequest
  }

  ngAfterViewInit() {
    const timeInputs =
      document.querySelectorAll<HTMLInputElement>('input[type="time"]');
    timeInputs.forEach((inputElem) => {
      inputElem.addEventListener('focus', () => {
        inputElem.showPicker();
      });
    });
  }

  onFreeDeliveryEnableChange(event: Event): void{
    const select = event.target as HTMLSelectElement;
    this.config.update((cConfig) => ({
      ...cConfig,
      freeDeliveryEnabled: select.value == 'true' ? true : false
    }));
  }

  openProposeChange(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  submitProposal(): void {
    // POST /configuration/propose with draftConfig
    // On success:
    this.hasPendingRequest = true;
    this.isEditing = false;
  }
}
