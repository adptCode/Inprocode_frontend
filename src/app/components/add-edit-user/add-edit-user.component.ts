import { Component, OnInit } from '@angular/core';
import { AlertComponent } from "../alert/alert.component";
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-edit-user',
    standalone: true,
    templateUrl: './add-edit-user.component.html',
    styleUrl: './add-edit-user.component.css',
    imports: [CommonModule,ReactiveFormsModule, AlertComponent]
})
export class AddEditUserComponent implements OnInit {

  userForm: FormGroup;
  userId?: number;
  alertMessage?: string;
  alertType?: 'success' | 'danger' | 'warning' | 'info';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      state: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3), Validators.maxLength(20)]],
      favoriteTeam: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    })
  }

 

  hasAnyErrors(field: string): boolean {
    const control = this.userForm.get(field);
    return !!(control?.errors && control?.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'You have to complete this field';
      } else if (control.errors['pattern']) {
        return 'Only letters';
      } else if (control.errors['minlength']) {
        return 'Too short';
      } else if (control.errors['maxlength']) {
        return 'Too long';
      }
    }
    return '';
  }

  onSubmit() {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

  }


}
