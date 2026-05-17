import { RegularExpressionLiteralExpr } from '@angular/compiler';
import { Component, OnInit, signal } from '@angular/core';
import { form, min, minLength, required, schema } from '@angular/forms/signals';

interface LegalAgreement {
  id: number;
  type: 'rider' | 'customer';
  typeLabel: string;
  version: string;
  status: 'active' | 'retired' | 'draft';
  effectiveDate: string;
}

interface NewAgreement {
  type: string;
  version: string;
  effectiveDate: string;
  contentFile: File | null;
  requireReacceptance: boolean;
}

@Component({
  selector: 'app-legal-agreements',
  standalone: false,
  templateUrl: './legal-agreements.html',
  styleUrls: ['./legal-agreements.css', '../../output.scss'],
})
export class LegalAgreements {
  // Filters
  filterType = 'all';
  filterStatus = 'all';

  // Modals
  showCreateModal = false;
  showRetireModal = false;
  showViewModal = false;

  // Targets for retire/view
  retireTarget: LegalAgreement | null = null;
  viewTarget: LegalAgreement | null = null;

  //new agreement modal
  newAgreementModal = signal<NewAgreement>({
    type: 'rider',
    version: '',
    effectiveDate: '',
    contentFile: null as File | null,
    requireReacceptance: false,
  });

  newAgreementForm = form(
    this.newAgreementModal,
    (schemaPath) => {
      required(schemaPath.version, {
        message: 'Please fill all required fields and upload a file.',
      });
      required(schemaPath.effectiveDate, {
        message: 'Please fill all required fields and upload a file.',
      });
      required(schemaPath.contentFile, {
        message: 'Please fill all required fields and upload a file.',
      });

      minLength(schemaPath.version, 1, { message: 'Invalid Version' });
    },
    {
      submission: {
        action: async (field) => {
          const newId = Math.max(...this.allAgreements.map((a) => a.id)) + 1;
          this.allAgreements.push({
            id: newId,
            type: this.newAgreementForm.type().value() as 'rider' | 'customer',
            typeLabel:
              this.newAgreementForm.type().value() === 'rider'
                ? 'Rider Agreement'
                : 'Customer Terms',
            version: this.newAgreementForm.version().value(),
            status: this.newAgreementFormStatus()!,
            effectiveDate: this.newAgreementForm.effectiveDate().value(),
          });
          this.showCreateModal = false;
        },
        onInvalid: (field) => {
          field().errorSummary()[0].fieldTree().focusBoundControl();
        }
      },
    },
  );

  newAgreementFormFileSizeError = signal<string | null>(null);
  createNewAgreementFormErrorDisplay = signal<boolean>(false);
  newAgreementFormStatus = signal <'active' | 'draft' | null>(null);

  // All agreements
  allAgreements: LegalAgreement[] = [];

  // Auto‑suggested version
  get suggestedVersion(): string {
    const latest = this.allAgreements
      .filter((a) => a.type === this.newAgreementForm.type().value())
      .sort(
        (a, b) =>
          parseFloat(b.version.replace('v', '')) -
          parseFloat(a.version.replace('v', '')),
      )[0];
    if (!latest) return `v1.0`;
    const nextMajor = parseFloat(latest.version.replace('v', '')) + 0.1;
    return `v${nextMajor.toFixed(1)} (auto‑suggested)`;
  }

  ngOnInit(): void {
    // Fetch agreements from API
    this.allAgreements = [
      {
        id: 1,
        type: 'rider',
        typeLabel: 'Rider Agreement',
        version: 'v2.1',
        status: 'active',
        effectiveDate: '15 Apr 2026',
      },
      {
        id: 2,
        type: 'customer',
        typeLabel: 'Customer Terms',
        version: 'v1.3',
        status: 'active',
        effectiveDate: '10 Apr 2026',
      },
      {
        id: 3,
        type: 'rider',
        typeLabel: 'Rider Agreement',
        version: 'v2.0',
        status: 'retired',
        effectiveDate: '01 Jan 2026',
      },
      {
        id: 4,
        type: 'customer',
        typeLabel: 'Customer Terms',
        version: 'v1.2',
        status: 'retired',
        effectiveDate: '15 Dec 2025',
      },
      {
        id: 5,
        type: 'rider',
        typeLabel: 'Rider Agreement',
        version: 'v2.2',
        status: 'draft',
        effectiveDate: '—',
      },
    ];
  }

  get filteredAgreements(): LegalAgreement[] {
    let result = this.allAgreements;
    if (this.filterType !== 'all') {
      result = result.filter((a) => a.type === this.filterType);
    }
    if (this.filterStatus !== 'all') {
      result = result.filter((a) => a.status === this.filterStatus);
    }
    return result;
  }

  // ─── Create Modal ───
  openCreateModal(): void {
    this.showCreateModal = true;
  }

  onContentFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Validate file size (max 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        this.newAgreementFormFileSizeError.update(
          () => 'File size exceeds 5 MB.',
        );
        return;
      }
      else{
        this.newAgreementFormFileSizeError.update(() => null);
      }
      this.newAgreementModal.update((current) => ({
        ...current,
        contentFile: file,
      }));
      console.log("file uploaded with name: ", file.name);
    }
  }

  async updateOtherAgreements(){
    // Archive the current active version for this type
      const currentActive = this.allAgreements.find(
        (a) =>
          a.type === this.newAgreementForm.type().value() &&
          a.status === 'active',
      );
      if (currentActive) {
        currentActive.status = 'retired';
      }
  }

  submitAgreement(action: 'publish' | 'draft'): void {
    // POST /legal-agreements with form data
    const status = action === 'publish' ? 'active' : 'draft';
    this.newAgreementFormStatus.update(() => status);
    if (action === 'publish') {
      this.updateOtherAgreements();
    }

  }

  // ─── View Modal ───
  viewAgreement(agreement: LegalAgreement): void {
    this.viewTarget = agreement;
    this.showViewModal = true;
    // In production, fetch signed URL from Cloud Storage and display content
  }

  // ─── Retire Modal ───
  confirmRetire(agreement: LegalAgreement): void {
    this.retireTarget = agreement;
    this.showRetireModal = true;
  }

  retireAgreement(): void {
    if (this.retireTarget) {
      // POST /legal-agreements/{id}/retire
      this.retireTarget.status = 'retired';
    }
    this.showRetireModal = false;
    this.retireTarget = null;
  }

  publishDraft(agreement: LegalAgreement): void {
    // Archive the current active version of this type
    const currentActive = this.allAgreements.find(
      (a) => a.type === agreement.type && a.status === 'active',
    );
    if (currentActive) {
      currentActive.status = 'retired';
    }
    // Activate the draft
    agreement.status = 'active';
    agreement.effectiveDate = new Date().toISOString().slice(0, 10); // or let user choose
  }

  deleteDraft(agreement: LegalAgreement): void {
    if (confirm('Delete this draft?')) {
      this.allAgreements = this.allAgreements.filter(
        (a) => a.id !== agreement.id,
      );
    }
  }
}
