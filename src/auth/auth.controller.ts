import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private userService: UserService) { }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  public async signin(@Request() req) {
    return await this.authService.signin(req.user);
  }

	@Post('/signup')
	public async createUser(@Body('email') email: string, @Body('password') password: string): Promise<User> {
		return await this.userService.createUser(email, password);
	}
}