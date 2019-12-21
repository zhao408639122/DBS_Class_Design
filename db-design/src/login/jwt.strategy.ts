import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from './login.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly loginService: LoginService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            passReqToCallback: true,
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: JwtPayload, done: Function) {
        console.log('entered jwt');
        // const user = await this.loginService.validateUser(payload.username);
    }
}