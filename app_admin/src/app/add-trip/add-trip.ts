import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  message = '';

  constructor(private tripDataService: TripDataService, private router: Router) {}

  onSubmit(): void {
    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        this.message = 'Trip added successfully!';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Error adding trip: ' + err.message;
      }
    });
  }
}