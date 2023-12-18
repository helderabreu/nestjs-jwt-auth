import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from "@nestjs/mongoose"
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from "../users/user.model"
import { UserService } from '../users/user.service';

@Module({
  imports: [
    PassportModule, 
    JwtModule.register({secret: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '60s' }}),
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}
