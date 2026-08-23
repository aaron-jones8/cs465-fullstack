import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('travlr-token', response.token);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('travlr-token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('travlr-token');
    }

    getToken(): string | null {
        return localStorage.getItem('travlr-token');
    }
}