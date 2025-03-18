import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  imports: [FormsModule, NgIf, NgFor],
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = { name: '', email: '', bio: '' };
  editUser: any = null;

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    this.users = await this.usersService.getUsers();
  }
 
  async addUser() {
    if (this.newUser.name && this.newUser.email && this.newUser.bio) {
      await this.usersService.addUser(this.newUser);
      this.newUser = { name: '', email: '', bio: '' };
      await this.fetchUsers();
    }
  }

  async editUserDetails(user: any) {
    this.editUser = { ...user };
  }

  async updateUser() {
    if (this.editUser.name && this.editUser.email && this.editUser.bio) {
      await this.usersService.updateUser(this.editUser.id, this.editUser);
      this.editUser = null;
      await this.fetchUsers();
    }
  }

  async deleteUser(id: string) {
    await this.usersService.deleteUser(id);
    await this.fetchUsers();
  }
}
