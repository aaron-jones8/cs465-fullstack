import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'add-trip', component: AddTrip },
    { path: 'edit-trip/:code', component: EditTrip }
];