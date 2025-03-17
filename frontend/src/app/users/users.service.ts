import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5100/users'; // NestJS API

  /** ✅ Get all users */
  async getUsers() {
    const response = await fetch(this.apiUrl);
    return await response.json();
  }

  /** ✅ Get user by ID */
  async getUserById(id: string) {
    const response = await fetch(`${this.apiUrl}/${id}`);
    return await response.json();
  }

  /** ✅ Create user */
  async createUser(user: { name: string; email: string; bio: string }) {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await response.json();
  }

  /** ✅ Update user */
  async updateUser(
    id: string,
    userData: { name?: string; email?: string; bio?: string }
  ) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  }

  /** ✅ Delete user */
  async deleteUser(id: string) {
    const response = await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
    return await response.json();
  }
}
