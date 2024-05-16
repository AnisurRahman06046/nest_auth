import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...userWithoutPassword } =
      result.toObject();

    return userWithoutPassword;
  }

  async login(payload): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    const checkPassword = await bcrypt.compare(payload.password, user.password);

    if (!checkPassword)
      throw new HttpException('invalid credentials', HttpStatus.BAD_REQUEST);
    const jwtPayload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(jwtPayload);
    return { access_token: token };
  }

  async allUsers() {
    const result = await this.userModel
      .find({})
      .select('-password -confirmPassword');
    return result;
  }
}
