import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipe/pipe.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    PipeModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: any = [];

  filterText: string = '';

  ngOnInit() {
    const users = localStorage.getItem('users');
    if(users) {
      this.users = JSON.parse(users);
    }

    console.log('users', this.users)
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user: any, index: number) => index !== id); 
    localStorage.setItem('users', JSON.stringify(this.users))
  }


}
