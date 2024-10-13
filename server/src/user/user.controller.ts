import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { exclude } from 'src/utils/exclude';

// TODO 拆分出auth模块
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/info')
    async getUserInfo(@Req() request) {
        return {
            result: 1,
            data: exclude(request.user, ['password']),
        };
    }

    @Get()
    findOne(@Param('id') id: string) {
        return this.userService.findOne({ id: Number(id) });
    }

    @Post('update/:id')
    async updateUserInfo(@Body() data: Prisma.UserUpdateInput, @Param('id') id: string): Promise<UserModel> {
        return this.userService.update({ id: Number(id) }, data);
    }
}
