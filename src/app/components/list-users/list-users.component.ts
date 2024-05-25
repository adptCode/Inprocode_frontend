import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {

  users: User[] = [
    {
      id: 1,
      name: 'Riccardo',
      lastName: 'Mari',
      email: 'ciro@gmail.com',
      city: 'Modena',
      state: 'Italy',
      favoriteTeam: 'Milan'
    },
    {
      id: 2,
      name: 'Alessandro',
      lastName: 'Deppa',
      email: 'alle@gmail.com',
      city: 'Barcelona',
      state: 'Spain',
      favoriteTeam: 'Inter'
    }
  ];

  deleteUser(id:number):void {
    console.log('delete')
  }

  getFullName(user: User): string {
    return `${user.name} ${user.lastName}`;
  }

}
