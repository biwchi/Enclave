import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.findOne(createUserDto.email);
    if (userExist) throw new BadRequestException('This email alredy used');
    const user = await this.userRepository.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });

    await this.cartRepository.insert({
      user: {
        id: user.id,
      },
    });

    const token = this.jwtService.sign({ email: user.email, id: user.id });
    delete user.password;
    return { ...user, access_token: token };
  }

  async findOne(email: string, id?: string) {
    return await this.userRepository.findOne({
      where: {
        email,
        id,
      },
    });
  }
}
