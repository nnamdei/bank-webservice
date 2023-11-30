import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from 'src/user/data/user.repository';
import { JwtStrategy } from './strategies/auth.jwt.strategy';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
