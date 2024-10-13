import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Public } from 'src/utils/public';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { exclude } from 'src/utils/exclude';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly config: ConfigService,
    ) {}

    @Post('register')
    @ApiTags('创建用户账号')
    @Public()
    async register(@Body() createUserDto: Prisma.UserCreateInput) {
        const data = Object.assign(createUserDto, {
            password: await hash(createUserDto.password, Number(this.config.get('HASH_SALT_OR_ROUNDS'))),
        });
        const isSuccess = await this.userService.create(data);
        if (!isSuccess) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: '账号创建失败',
                    error: 'INTERNAL_SERVER_ERROR',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        return { result: 1 };
    }

    @Post('login')
    @ApiTags('用户登录')
    @Public()
    async login(@Body() loginUserDto: { email: string; password: string }) {
        const { email, password } = loginUserDto;

        const user = await this.userService.findOne({ email });

        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    message: '用户不存在',
                    error: 'Unauthorized',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        // 2. 检查密码是否正确（假设密码是加密存储的）
        const isPasswordValid = await this.authService.validatePassword(
            password,
            user.password, // 假设数据库中存储的是加密后的密码
        );

        if (!isPasswordValid) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    message: '密码不正确',
                    error: 'Unauthorized',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        // const Token = await this.
        let access_token: string;
        try {
            access_token = await this.authService.generateJwt({
                email: user.email,
                id: user.id,
            });
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: '生成token失败',
                    error: err,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return {
            result: 1,
            message: '登录成功',
            access_token,
            info: exclude(user, ['password']),
        };
    }
}
