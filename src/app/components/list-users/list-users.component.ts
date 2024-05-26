import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { AlertComponent } from "../alert/alert.component";

@Component({
    selector: 'app-list-users',
    standalone: true,
    templateUrl: './list-users.component.html',
    styleUrl: './list-users.component.css',
    imports: [RouterLink, SpinnerComponent, AlertComponent]
})
export class ListUsersComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  alertMessage?: string;
  alertType?: 'success' | 'danger' | 'warning' | 'info';

  constructor(private _userService: UserService) {}


  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.loading = true;
    this._userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.loading = false;
    })
  }

  deleteUser(id:number):void {
    this.loading = true;
    this._userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.alertMessage = 'User delete successfully!';
      this.alertType = 'danger';
      setTimeout(() => {
        this.alertMessage = "";
        this.alertType = undefined;
        this.getUsers();
      }, 3000)

    });
  }

  getFullName(user: User): string {
    return `${user.name} ${user.lastName}`;
  }

}
