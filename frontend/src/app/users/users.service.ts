import { Injectable } from '@angular/core';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  // 🔹 Get All Users
  async getUsers() {
    try {
      console.log('Fetching users from:', `${API_URL}/users`);

      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // 🔹 Debugging

      const users = data.map((item: any) => item.users_collection)
      console.log('Processed users:', users);
      

      // 🔹 Ensure it returns an array
      return users;
    } catch (error) {
      console.error('Fetch error in getUsers:', error);
      throw new Error(`HTTP error: ${(error as Error).message}`);
    }
  }

  // 🔹 Create User
  async addUser(user: { name: string; email: string; bio: string }) {
    try {
      console.log('Adding user:', user);

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error in addUser:', error);
      throw new Error(`HTTP error: ${(error as Error).message}`);
    }
  }

  // 🔹 Update User
  async updateUser(
    id: string,
    user: { name: string; email: string; bio: string }
  ) {
    try {
      console.log(`Updating user with ID: ${id}`);

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error in updateUser:', error);
      throw new Error(`HTTP error: ${(error as Error).message}`);
    }
  }

  // 🔹 Delete User
  async deleteUser(id: string) {
    try {
      console.log(`Deleting user with ID: ${id}`);

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error in deleteUser:', error);
      throw new Error(`HTTP error: ${(error as Error).message}`);
    }
  }
}
