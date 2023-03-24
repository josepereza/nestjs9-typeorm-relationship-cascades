import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPostDto } from 'src/dto/create-user-post.dto';
import { CreateUserPostsDto } from 'src/dto/create-user-posts.dto';
import { CreateUserProfileDto } from 'src/dto/create-user-profile.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Post } from 'src/typeorm/entities/post.entity';
import { Profile } from 'src/typeorm/entities/profile.entity';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getUsers(): Promise<any> {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  getPostsByUserId(id: number): Promise<any> {
    return this.userRepository.find({ relations: ['posts'], where: { id } });
  }

  getUserById(id: number): Promise<any> {
    return this.userRepository.find({
      relations: ['profile', 'posts'],
      where: { id },
    });
  }

  createUser(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    const newUser = this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  deleteUser(id: number): Promise<any> {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );

    const newProfile = this.profileRepository.create({
      ...createUserProfileDto,
    });
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async getUsersProfiles(): Promise<any> {
    return this.profileRepository.find();
  }

  async createUserPost(
    id: number,
    createUserPostDto: CreateUserPostDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({ ...createUserPostDto, user });
    return this.postRepository.save(newPost);
  }

  async createUserPosts(createUserPostsDto: CreateUserPostsDto): Promise<any> {
    return await this.userRepository.save(createUserPostsDto);
  }
}
