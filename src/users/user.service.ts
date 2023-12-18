import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
	constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }

	public async createUser(email: string, password: string): Promise<User> {
    const user = await this.getUser({ email });
    if (user) throw new ConflictException();
		const saltOrRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltOrRounds);
		return this.userModel.create({email, hashedPassword});
	}

	public async getUser(query: object): Promise<User> {
		return this.userModel.findOne(query);
	}
}