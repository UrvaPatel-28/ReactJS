import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from "src/db/entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'
import { title } from 'process';

@Injectable()
export class UserService {

  //inject user repo
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log("hii", createUserDto);

      const existingUser: User = await this.userRepository.findOneBy({ userName: createUserDto.userName });
      if (existingUser) {
        throw new ConflictException("user alerady exist");

      }

      const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);

      // Create a new user object with the hashed password
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,

      });

      return this.userRepository.save(user);
    } catch (error) {
      throw error

    }

  }


  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // //for authorization
  async findOne(userName: string) {
    try {
      return await this.userRepository.findOneBy({ userName });
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findById(id: string) {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
////