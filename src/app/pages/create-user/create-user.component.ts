import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  userForm: any;
  actionMessage: string = '';
  userId!: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('id', this.userId);
  }

  ngOnInit() {
    if (this.userId) {
      let users: any = localStorage.getItem('users');
      if (!users) {
        users = [];
      } else {
        users = JSON.parse(users);
      }
      const selectedUser = users[this.userId];
      console.log(selectedUser);
      this.userForm = this.fb.group({
        name: [selectedUser.name, [Validators.required]],
        email: [selectedUser.email, [Validators.required, Validators.email]],
        mobile: [selectedUser.mobile, Validators.required],
        gender: [selectedUser.gender, Validators.required],
        role: [selectedUser.role, Validators.required],
        addresses: this.fb.array([]),
      });

      selectedUser.addresses.forEach((add: {name: string}) => {
        this.addAddress(add);        
      });
    } else {
      this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', Validators.required],
        gender: ['', Validators.required],
        role: ['', Validators.required],
        addresses: this.fb.array([]),
      });

      this.addAddress();
    }
    (window as any)['form'] = this.userForm;
  }

  addAddress(add = {name: ''}) {

    const address = this.userForm.get('addresses') as FormArray;
    const phone = this.fb.group({
      name: [add.name, Validators.required],
    });
    address.push(phone);
  }

  deleteAddress(i: number) {
    const address = this.userForm.get('addresses') as FormArray;
    address.removeAt(i);
  }

  registerUser() {
    let users: any = localStorage.getItem('users');
    if (!users) {
      users = [];
    } else {
      users = JSON.parse(users);
    }
    users.push(this.userForm.value);
    localStorage.setItem('users', JSON.stringify(users));

    this.userForm.reset();

    this.actionMessage = 'User registred successfully';
  }

  updateUser() {
    let users: any = localStorage.getItem('users');
    users = JSON.parse(users);

    users[this.userId] = this.userForm.value;
    localStorage.setItem('users', JSON.stringify(users));

    this.userForm.reset();

    this.actionMessage = 'User updated successfully';
  }
}
