import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './users.model';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: UserDto) {
    return await this.UserService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return await this.UserService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return await this.UserService.getUserById(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateData: { name?: string; email?: string; bio?: string },
  ) {
    return await this.UserService.updateUser(userId, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.UserService.deleteUser(userId);
  }
}
