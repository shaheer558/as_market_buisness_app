import { Component, signal } from '@angular/core';
import { form, min, minLength, required, schema } from '@angular/forms/signals';

interface DiscountEvent {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  estimatedBudget: number;
  status: 'active' | 'pending' | 'approved' | 'expired';
  statusLabel: string;
  voted: boolean; // track whether current client has voted (for pending events)
}

interface NewEvent {
  name: string;
  startDate: string;
  endDate: string;
  percentage: number;
  mediaFile: File | null;
}

@Component({
  selector: 'app-discount-events',
  standalone: false,
  templateUrl: './discount-events.html',
  styleUrls: ['./discount-events.css', '../../output.scss'],
})
export class DiscountEvents {
  statusFilter = 'all';
  showCreateModal = false;

  // New event form model
  newEventModal = signal<NewEvent>({
    name: '',
    startDate: '',
    endDate: '',
    percentage: 0,
    mediaFile: null,
  });

  newEventForm = form(
    this.newEventModal,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Event name is required' });
      required(schemaPath.startDate, { message: 'Start Date is required' });
      required(schemaPath.endDate, { message: 'End Date is required' });
      required(schemaPath.percentage, { message: 'Percentage is required' });
      minLength(schemaPath.name, 1, { message: 'Invalid name' });
      minLength(schemaPath.startDate, 1, { message: 'Invalid start Date' });
      minLength(schemaPath.endDate, 1, { message: 'Invalid end date' });
      min(schemaPath.percentage, 0.1, { message: 'invalid percentage' });
    },
    {
      submission: {
        action: async (field) => {
          const newId = Math.max(...this.allEvents.map((e) => e.id)) + 1;
          this.allEvents.push({
            id: newId,
            name: field.name().value(),
            startDate: field.startDate().value(),
            endDate: field.endDate().value(),
            estimatedBudget: 0, // will be calculated later
            status: 'pending',
            statusLabel: 'PENDING APPROVAL',
            voted: false,
          });
          this.showCreateModal = false;
        },
        onInvalid: (field) => {
          this.newEventErrorDisplay.update(() => true);
          field().errorSummary()[0].fieldTree().focusBoundControl();
        },
      },
    },
  );

  newEventErrorDisplay = signal<boolean>(false);
  newEventFileSizeError = signal<string | null>(null);

  allEvents: DiscountEvent[] = [
    {
      id: 1,
      name: 'Summer Sale',
      startDate: '01 May 2026',
      endDate: '10 May 2026',
      estimatedBudget: 150000,
      status: 'active',
      statusLabel: 'ACTIVE',
      voted: false,
    },
    {
      id: 2,
      name: 'Ramzan Offer',
      startDate: '20 Apr 2026',
      endDate: '30 Apr 2026',
      estimatedBudget: 200000,
      status: 'pending',
      statusLabel: 'PENDING APPROVAL',
      voted: false,
    },
    {
      id: 3,
      name: 'Eid Special',
      startDate: '15 Jun 2026',
      endDate: '25 Jun 2026',
      estimatedBudget: 180000,
      status: 'approved',
      statusLabel: 'APPROVED',
      voted: false,
    },
    {
      id: 4,
      name: 'Spring Promo',
      startDate: '01 Mar 2026',
      endDate: '15 Mar 2026',
      estimatedBudget: 90000,
      status: 'expired',
      statusLabel: 'EXPIRED',
      voted: false,
    },
  ];

  // Filtered events based on statusFilter
  get filteredEvents(): DiscountEvent[] {
    if (this.statusFilter === 'all') return this.allEvents;
    return this.allEvents.filter((e) => e.status === this.statusFilter);
  }

  // Open create modal
  openCreateModal(): void {
    this.showCreateModal = true;
  }

  // Vote on a pending approval event
  vote(event: DiscountEvent, approve: boolean): void {
    // POST /discount-events/{id}/vote
    // For now, mark as voted and update status if rejected
    event.voted = true;
    if (!approve) {
      event.status = 'expired'; // or 'rejected'
      event.statusLabel = 'EXPIRED';
    }
    // In real app, the backend would handle unanimous vote logic
  }

  onMediaFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if(input.files[0].size > 1024*1024*1024){
        this.newEventFileSizeError.update(() => "File is too large");
        return;
      }
      this.newEventFileSizeError.update(() => null);
      this.newEventModal.update((modal) => ({
        ...modal,
        mediaFile: input.files![0],
      }));
    }
  }
}
