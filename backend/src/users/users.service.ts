import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as couchbase from 'couchbase';
import * as dotenv from 'dotenv';
import { UserDto } from './users.model';

dotenv.config(); // ✅ Load .env file

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  private cluster: couchbase.Cluster;
  private bucket: couchbase.Bucket;
  private collection: couchbase.Collection;

  async onModuleInit() {
    try {
      const host = process.env.COUCHBASE_HOST || '';
      const username = process.env.COUCHBASE_USERNAME || '';
      const password = process.env.COUCHBASE_PASSWORD || '';
      const bucketName = process.env.COUCHBASE_BUCKET || '';
      const scopeName = process.env.COUCHBASE_SCOPE || '';
      const collectionName = process.env.COUCHBASE_COLLECTION || '';

      this.cluster = await couchbase.connect(host, { username, password });
      this.bucket = this.cluster.bucket(bucketName);
      this.collection = this.bucket.scope(scopeName).collection(collectionName);

      console.log('✅ Connected to Couchbase successfully!');
    } catch (error) {
      console.error('❌ Couchbase Connection Error:', error);
      throw new Error('Failed to connect to Couchbase');
    }
  }

  async createUser(user: UserDto) {
    try {
      const userId = `uid-${Date.now().toString()}`;
      const userDocument = { id: userId, ...user, createdAt: new Date() };
      await this.collection.insert(userId, userDocument);
      return {
        message: 'User created successfully',
        data: { id: userId, ...user },
      };
    } catch (error) {
      console.error('Failed to generate User ID:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const query = `SELECT * FROM \`${process.env.COUCHBASE_BUCKET}\`.\`${process.env.COUCHBASE_SCOPE}\`.\`${process.env.COUCHBASE_COLLECTION}\``;
      const result = await this.cluster.query(query);
      // return {
      //   message: 'Users fetched successfully',
      //   data: result.rows,
      // };
      return result.rows;
    } catch (error) {
      console.error('❌ Failed to fetch Users:', error);
      throw error;
    }
  }

  /** ✅ READ - Get user by ID */
  async getUserById(userId: string) {
    try {
      const result = await this.collection.get(userId);
      return result.content;
    } catch (error) {
      console.error(`❌ User with ID ${userId} not found`, error);
      throw error;
    }
  }

  /** ✅ UPDATE - Update user by ID */
  async updateUser(
    userId: string,
    updateData: { name?: string; email?: string; bio?: string },
  ) {
    try {
      const existingUser = await this.collection.get(userId);
      const updatedUser = {
        ...existingUser.content,
        ...updateData,
        updatedAt: new Date(),
      };

      await this.collection.replace(userId, updatedUser);
      console.log('✅ User updated:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error(`❌ Failed to update user ${userId}:`, error);
      throw error;
    }
  }

  /** ✅ DELETE - Remove user by ID */
  async deleteUser(userId: string) {
    try {
      await this.collection.remove(userId);
      console.log(`✅ User ${userId} deleted`);
      return { message: `User ${userId} deleted successfully` };
    } catch (error) {
      console.error(`❌ Failed to delete user ${userId}:`, error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.cluster.close();
    console.log('🔌 Couchbase connection closed');
  }
}
