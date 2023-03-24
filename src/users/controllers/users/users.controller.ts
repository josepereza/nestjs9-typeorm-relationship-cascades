import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserPostDto } from 'src/dto/create-user-post.dto';
import { CreateUserPostsDto } from 'src/dto/create-user-posts.dto';
import { CreateUserProfileDto } from 'src/dto/create-user-profile.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const { password, password_confirmation } = createUserDto;
    if (password === password_confirmation)
      return this.usersService.createUser(createUserDto);
    return { error: 'Password does not match' };
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Get('all/profiles')
  async getUsersProfiles() {
    return this.usersService.getUsersProfiles();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post(':id/post')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.usersService.createUserPost(id, createUserPostDto);
  }

  @Post('/userposts')
  createUserPosts(@Body() createUserPostsDto: CreateUserPostsDto,
  ) {
    return this.usersService.createUserPosts(createUserPostsDto);
  }

  @Get(':id/posts')
  getPostsByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPostsByUserId(id);
  }
}
