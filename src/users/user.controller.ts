import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
	constructor(private readonly usersService: UserService) { }
}