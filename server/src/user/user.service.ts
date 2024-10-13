import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Prisma } from '@prisma/client';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    /**
     * @todo: use i18n to message?
     */
    async create(data: Prisma.UserCreateInput) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (existingUser) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    message: '该邮箱已被注册',
                    error: 'Conflict', // 你可以定制错误类型或信息
                },
                HttpStatus.CONFLICT,
            );
        }
        return !!this.prisma.user.create({ data });
    }

    /**
     * @description 获取密码，但不获取用户密码；
     */
    async findOne(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where,
        });
    }

    /**
     * @description 验证密码
     */
    async validatePassword(plainTextPassword: string, hashPassword: string): Promise<boolean> {
        return compare(plainTextPassword, hashPassword);
    }

    async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({
            data,
            where,
        });
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
