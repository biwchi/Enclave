import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.finsOne(email);
    const passIsValid = await bcrypt.compare(password, user.password);

    if (user && passIsValid) {
      return user;
    }

    throw new BadRequestException('User or password are incorrect');
  }
}
