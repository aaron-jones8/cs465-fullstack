import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip!: Trip;
  imageBaseUrl = 'http://localhost:3000/images/';
}