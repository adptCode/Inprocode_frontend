import { Component } from '@angular/core';
import { ListUsersComponent } from "../../components/list-users/list-users.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ListUsersComponent]
})
export class HomeComponent {

}
