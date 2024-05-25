import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapsComponent } from './pages/maps/maps.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'graphics', component: GraphicsComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'user/add', component: AddEditUserComponent },
  { path: 'user/edit/:id', component: AddEditUserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
