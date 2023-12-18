import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private jwtService: JwtService) { }
  
  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  
  public async signin(user: any) {
    const payload = {email: user.email, sub: user._id};
    return {access_token: this.jwtService.sign(payload)};
  }
}