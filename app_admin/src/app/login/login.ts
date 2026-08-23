import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    email = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        this.authService.login(this.email, this.password).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.errorMessage = 'Login failed: ' + (err.error?.message || err.message);
            }
        });
    }
}