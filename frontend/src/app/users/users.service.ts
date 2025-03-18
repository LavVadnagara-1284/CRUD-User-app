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
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // 🔹 Create User
  async addUser(user: { name: string; email: string; bio: string }) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // 🔹 Update User
  async updateUser(
    id: string,
    user: { name: string; email: string; bio: string }
  ) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  // 🔹 Delete User
  async deleteUser(id: string) {
    await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
  }
}
