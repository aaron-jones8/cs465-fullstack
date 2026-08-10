import { Component, OnInit, signal } from '@angular/core';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip';
import { TripCard } from '../trip-card/trip-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips = signal<Trip[]>([]);
  errorMessage = signal<string>('');

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips) => {
        this.trips.set(trips);
      },
      error: (err) => {
        this.errorMessage.set('Error retrieving trips: ' + err.message);
      }
    });
  }
}