import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser = { name: '', email: '', bio: '' };
  editUser: any = null;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  /** ✅ Load all users */
  async loadUsers() {
    this.users = await this.userService.getUsers();
  }

  /** ✅ Create user */
  async addUser() {
    await this.userService.createUser(this.newUser);
    this.newUser = { name: '', email: '', bio: '' };
    await this.loadUsers();
  }

  /** ✅ Select user for editing */
  editUserDetails(user: any) {
    this.editUser = { ...user };
  }

  /** ✅ Update user */
  async updateUser() {
    await this.userService.updateUser(this.editUser.id, this.editUser);
    this.editUser = null;
    await this.loadUsers();
  }

  /** ✅ Delete user */
  async deleteUser(id: string) {
    await this.userService.deleteUser(id);
    await this.loadUsers();
  }
}
