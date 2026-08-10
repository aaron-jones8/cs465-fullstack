import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
    providedIn: 'root'
})
export class TripDataService {
    private baseUrl = 'http://localhost:3000/api/trips';

    constructor(private http: HttpClient) { }

    getTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(this.baseUrl);
    }

    getTrip(tripCode: string): Observable<Trip> {
        return this.http.get<Trip>(`${this.baseUrl}/${tripCode}`);
    }

    addTrip(trip: Trip): Observable<Trip> {
        return this.http.post<Trip>(this.baseUrl, trip);
    }

    updateTrip(trip: Trip): Observable<Trip> {
        return this.http.put<Trip>(`${this.baseUrl}/${trip.code}`, trip);
    }

    deleteTrip(tripCode: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${tripCode}`);
    }
}