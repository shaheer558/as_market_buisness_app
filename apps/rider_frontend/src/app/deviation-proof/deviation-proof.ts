import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deviation-proof',
  standalone: false,
  templateUrl: './deviation-proof.html',
  styleUrls: ['./deviation-proof.css', '../../output.scss'],
})
export class DeviationProof {
  description = '';
  uploadedFiles: File[] = [];
  errors: string[] = [];

  // Countdown timer
  timeRemaining = '';
  private timerInterval: any;

  // Deviation data (from service/route params)
  deviationDistance = 450;
  frozenFuelCost = 350;
  deadline = new Date(Date.now() + 23 * 60 * 60 * 1000 + 45 * 60 * 1000); // 23h 45m from now

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateTimeRemaining();
    this.timerInterval = setInterval(() => this.updateTimeRemaining(), 30000); // update every 30s
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimeRemaining(): void {
    const now = Date.now();
    const remaining = this.deadline.getTime() - now;

    if (remaining <= 0) {
      this.timeRemaining = 'Expired';
      if (this.timerInterval) clearInterval(this.timerInterval);
      return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    this.timeRemaining = `${hours}h ${minutes}m`;
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        // Avoid duplicates (simple name check)
        const exists = this.uploadedFiles.some(
          (f) => f.name === input.files![i].name,
        );
        if (!exists) {
          this.uploadedFiles.push(input.files[i]);
        }
      }
    }
    // Clear the input so the same file can be re‑selected
    input.value = '';
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  submitProof(): void {
    this.errors = [];

    // Validate: at least one file or a description
    if (
      this.uploadedFiles.length === 0 &&
      this.description.trim().length === 0
    ) {
      this.errors.push(
        'Please attach at least one file or provide a description.',
      );
      return;
    }

    // POST /incident/deviation/{id}/proof with form data
    // On success:
    this.router.navigate(['/active-trip-map']);
  }

  goBack(): void {
    this.router.navigate(['/active-trip-map']);
  }
}
