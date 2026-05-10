import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  standalone: false,
  templateUrl: './accountSettings.html',
  styleUrl: './accountSettings.css',
})
export class AccountSettings {
  openConfirmModal(): void {
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  closeConfirmModal(): void {
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  openErrorModal(): void {
    const modal = document.getElementById('errorModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  closeErrorModal(): void {
    const modal = document.getElementById('errorModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  attemptCloseAccount(): void {
    // Simulate GET /rider/close-account/validate
    const hasActiveTrip: boolean = false; // toggle to true to test error path
    if (hasActiveTrip) {
      this.openErrorModal();
    } else {
      this.openConfirmModal();
    }
  }

  confirmCloseAccount(): void {
    this.closeConfirmModal();
    // In production: POST /rider/close-account → redirect to /login
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
        // window.location.href = '/login';
      }, 2500);
    }
  }
}
