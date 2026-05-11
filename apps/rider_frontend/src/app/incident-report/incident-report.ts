import { Component } from '@angular/core';
import { Router } from '@angular/router';

type IncidentView = 'main' | 'deviation' | 'vehicle' | 'health';

@Component({
  selector: 'app-incident-report',
  standalone: false,
  templateUrl: './incident-report.html',
  styleUrls: ['./incident-report.css', '../../output.scss'],
})
export class IncidentReport {
  currentView: IncidentView = 'main';

  constructor(private router: Router) {}

  /** Dynamic header title based on current view */
  get headerTitle(): string {
    switch (this.currentView) {
      case 'deviation':
        return 'Report Deviation';
      case 'vehicle':
        return 'Vehicle Issue';
      case 'health':
        return 'Health / Accident';
      default:
        return 'Report Incident';
    }
  }

  /** Back button logic: from sub-view → main; from main → ActiveTripMap */
  handleBack(): void {
    if (this.currentView !== 'main') {
      this.currentView = 'main';
    } else {
      this.router.navigate(['/active-trip-map']);
    }
  }

  /** Navigate back to main menu (used by Cancel buttons) */
  cancelToMain(): void {
    this.currentView = 'main';
  }

  // ────────── Navigation to sub‑views ──────────

  openDeviation(): void {
    this.currentView = 'deviation';
  }

  openVehicleIssue(): void {
    this.currentView = 'vehicle';
  }

  openHealthAccident(): void {
    this.currentView = 'health';
  }

  // ────────── Confirmation actions ──────────

  confirmDeviation(): void {
    // POST /incident/deviation
    // Navigate to DeviationProofScreen
    this.router.navigate(['/deviation-proof']);
  }

  confirmVehicleIssue(): void {
    // POST /incident/vehicle-issue
    // Navigate back to HomeAvailableOrders (rider status → Vehicle_Repair)
    this.router.navigate(['/available-orders']);
  }

  returnToBaseHealth(): void {
    // POST /incident/health (option: return to base)
    // Navigate to return route
    this.router.navigate(['/return-route']);
  }

  cancelOrders(): void {
    // POST /incident/health (option: cancel orders, rider pays product cost)
    // Navigate back to HomeAvailableOrders (rider marked ineligible)
    this.router.navigate(['/available-orders']);
  }
}
