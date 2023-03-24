import { IsNotEmpty } from 'class-validator';
import { Post } from 'src/typeorm/entities/post.entity';

export class CreateUserPostsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  password_confirmation: string;

  posts: Post[];
}
