import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  standalone: false,
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css', '../../output.scss'],
})
export class Wallet implements OnInit {
  ngOnInit() {
    // Select all rows with the class 'transaction-row'
    document
      .querySelectorAll<HTMLDivElement>('.transaction-row')
      .forEach((row) => {
        row.addEventListener('click', () => {
          // Safely find the details element
          const details = row.parentElement?.querySelector<HTMLDivElement>(
            '.transaction-details',
          );
          if (details) {
            details.classList.toggle('hidden');
          }
        });
      });
  }
}
