import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  trip: Trip = {
    code: '', name: '', length: '', start: '',
    resort: '', perPerson: '', image: '', description: ''
  };

  message = '';

  constructor(
    private tripDataService: TripDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.tripDataService.getTrip(code).subscribe({
        next: (trip) => {
          this.trip = trip;
        },
        error: (err) => {
          this.message = 'Error loading trip: ' + err.message;
        }
      });
    }
  }

  onSubmit(): void {
    this.tripDataService.updateTrip(this.trip).subscribe({
      next: () => {
        this.message = 'Trip updated successfully!';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = 'Error updating trip: ' + err.message;
      }
    });
  }
}