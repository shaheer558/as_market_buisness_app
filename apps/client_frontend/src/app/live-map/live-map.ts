import { Component, Pipe, PipeTransform } from '@angular/core';

interface Rider {
  id: number;
  name: string;
  base: string;
  tripId: number;
  cash: number;
  status: 'onroute' | 'delayed' | 'undelivered';
  hasUndelivered: boolean;
  checklist: { name: string; picked: boolean }[];
}

@Component({
  selector: 'app-live-map',
  standalone: false,
  templateUrl: './live-map.html',
  styleUrls: ['./live-map.css', '../../output.scss'],
})
export class LiveMap {
  showRiderList = true;
  selectedRider: Rider | null = null;

  // Filter state
  showFilters = false;
  filterBase = '';
  filterStatus = '';
  filterName = '';
  filterCashMin: number | null = null;
  filterCashMax: number | null = null;

  // Replay modal
  replayModalOpen = false;
  replayRider: Rider | null = null;
  replayPlaying = false;
  replayProgress = 50; // percentage

  // Intervention modal
  interventionModalOpen = false;
  interventionRider: Rider | null = null;

  riders: Rider[] = [
    {
      id: 1,
      name: 'Ahmed Khan',
      base: 'Gulberg',
      tripId: 4521,
      cash: 2500,
      status: 'onroute',
      hasUndelivered: false,
      checklist: [
        { name: 'Milk', picked: true },
        { name: 'Bread', picked: true },
        { name: 'Eggs', picked: false },
        { name: 'Cheese', picked: false },
        { name: 'Juice', picked: true },
      ],
    },
    {
      id: 2,
      name: 'Bilal Ahmed',
      base: 'Model Town',
      tripId: 4528,
      cash: 1800,
      status: 'delayed',
      hasUndelivered: true,
      checklist: [
        { name: 'Milk', picked: false },
        { name: 'Bread', picked: false },
      ],
    },
    {
      id: 3,
      name: 'Sana Malik',
      base: 'Gulberg',
      tripId: 4530,
      cash: 3200,
      status: 'onroute',
      hasUndelivered: false,
      checklist: [
        { name: 'Cheese', picked: true },
        { name: 'Juice', picked: true },
      ],
    },
  ];

  // Derived filtered list
  get filteredRiders(): Rider[] {
    return this.riders.filter((rider) => {
      if (this.filterBase && rider.base !== this.filterBase) return false;
      if (this.filterStatus && rider.status !== this.filterStatus) return false;
      if (
        this.filterName &&
        !rider.name.toLowerCase().includes(this.filterName.toLowerCase())
      )
        return false;
      if (this.filterCashMin !== null && rider.cash < this.filterCashMin)
        return false;
      if (this.filterCashMax !== null && rider.cash > this.filterCashMax)
        return false;
      return true;
    });
  }

  selectRider(rider: Rider): void {
    this.selectedRider = rider;
  }

  viewChecklist(rider: Rider): void {
    this.selectedRider = rider;
  }

  // --- Replay Modal ---
  openReplayModal(rider: Rider): void {
    this.replayRider = rider;
    this.replayModalOpen = true;
    this.replayProgress = 0;
    this.replayPlaying = false;
  }

  closeReplayModal(): void {
    this.replayModalOpen = false;
    this.replayRider = null;
  }

  toggleReplayPlay(): void {
    this.replayPlaying = !this.replayPlaying;
    if (this.replayPlaying) {
      // Start incrementing progress (demo)
      const interval = setInterval(() => {
        if (!this.replayPlaying || this.replayProgress >= 100) {
          clearInterval(interval);
          this.replayPlaying = false;
          return;
        }
        this.replayProgress += 5;
      }, 500);
    }
  }

  // --- Intervention Modal ---
  openInterventionModal(rider: Rider): void {
    this.interventionRider = rider;
    this.interventionModalOpen = true;
  }

  closeInterventionModal(): void {
    this.interventionModalOpen = false;
    this.interventionRider = null;
  }

  confirmIntervention(): void {
    // POST /orders/{orderId}/intervene
    console.log('Intervening on rider', this.interventionRider?.tripId);
    // Remove from list or mark as re‑marketed
    this.closeInterventionModal();
  }

  // --- Map Refresh ---
  refreshMap(): void {
    // In real app, fetch latest data
    console.log('Refreshing map…');
  }

  interveneOrder(rider: Rider): void {
    // Open intervention modal, then POST /orders/{orderId}/intervene
    console.log('Intervene order for', rider.name);
  }

  clearFilters(): void {
    this.filterBase = '';
    this.filterStatus = '';
    this.filterName = '';
    this.filterCashMin = null;
    this.filterCashMax = null;
  }
}
