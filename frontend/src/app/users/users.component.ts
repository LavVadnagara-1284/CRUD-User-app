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
    console.log('ngOnInit called'); // ✅ Debugging
    await this.fetchUsers();
  }

  async fetchUsers() {
    console.log('Fetching users...'); // ✅ Debugging

    try {
      const data = await this.usersService.getUsers();
      console.log('Raw API Response:', data); // ✅ See exactly what is returned

      if (!Array.isArray(data)) {
        console.error('Unexpected API response format:', data);
        return;
      }

      this.users = data;
      console.log('Users after processing:', this.users); // ✅ Verify final assignment
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async showUser() {
    this.addUser();
  }

  async addUser() {
    if (this.newUser.name && this.newUser.email && this.newUser.bio) {
      try {
        const addedUser = await this.usersService.addUser(this.newUser);
        this.users = [...this.users, addedUser]; // ✅ Update the array immediately
        // this.newUser = { name: '', email: '', bio: '' };
        // await this.fetchUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  }

  async editUserDetails(user: any) {
    this.editUser = { ...user };
  }

  async updateUser() {
    if (this.editUser.name && this.editUser.email && this.editUser.bio) {
      try {
        await this.usersService.updateUser(this.editUser.id, this.editUser);
        await this.fetchUsers(); // ✅ Refetch updated users
        this.editUser = null;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  async deleteUser(id: string) {
    try {
      console.log(`Deleting user with ID: ${id}`);
      await this.usersService.deleteUser(id);
      console.log(`User ${id} deleted successfully`);
      await this.fetchUsers(); // ✅ Refresh user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}
