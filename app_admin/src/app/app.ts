import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TripListing],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app_admin');
}