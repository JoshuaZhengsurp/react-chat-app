import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

// TODO 拆分出auth模块
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiTags('创建用户账号')
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: Number(id) });
  }

  @Post('update/:id')
  async updateUserInfo(
    @Body() data: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<UserModel> {
    return this.userService.update({ id: Number(id) }, data);
  }
}
