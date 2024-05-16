import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //   register user
  async register(payload: UserDto) {
    // console.log('before creating')
    if (payload.password != payload.confirmPassword)
      throw new HttpException(
        'Password does not match',
        HttpStatus.BAD_REQUEST,
      );
    const hashedPassword = await bcrypt.hash(payload.password, 10); // 10 is the salt rounds

    // Replace the plain password with the hashed one in the payload
    const payloadWithHashedPassword = {
      ...payload,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    };

    const result = await this.userModel.create(payloadWithHashedPassword);
    // console.log('after creating')
    const { password, confirmPassword, ...userWithoutPassword } =
      result.toObject();

    return userWithoutPassword;
  }
}
