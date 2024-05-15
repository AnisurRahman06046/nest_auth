import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //   register user
  async register(payload: UserDto) {
    const result = await this.userModel.create(payload);
    return result;
  }
}
