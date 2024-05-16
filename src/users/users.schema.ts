import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Address {
  @Prop({ required: false })
  permanent?: string;

  @Prop({ required: false })
  present?: string;
}

@Schema()
export class User {
  @Prop({ required: [true, 'User name is required'] })
  firstName: string;

  @Prop({ required: [true, 'Last name is required'] })
  lastName: string;

  @Prop({ required: [true, 'Password is required'] })
  password: string;

  @Prop({ required: [true, 'Confirm password is required'] })
  confirmPassword: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  address?: Address;

  @Prop({ required: false })
  dob?: string;
  @Prop({ required: false })
  profileImg?: string;
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'timestamps',
  true,
);
