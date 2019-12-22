import { Injectable } from '@nestjs/common';
import { user_tb } from '../login/user_tb.entity';

@Injectable()
export class AuthService {
    async validateUser(user: {user_id: string, password: string}): Promise<any> {
        return await user_tb.authenticateUser(user);
    }
}
