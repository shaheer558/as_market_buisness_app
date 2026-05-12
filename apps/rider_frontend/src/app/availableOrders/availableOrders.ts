import { Component } from '@angular/core';

@Component({
  selector: 'app-available-orders',
  standalone: false,
  templateUrl: './availableOrders.html',
  styleUrls: ['./availableOrders.css', '../../output.scss'],
})
export class AvailableOrders {
  showMenu = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  // Optional: close menu when clicking outside (can be used with (blur) or document click)
  closeMenu(): void {
    this.showMenu = false;
  }
}
