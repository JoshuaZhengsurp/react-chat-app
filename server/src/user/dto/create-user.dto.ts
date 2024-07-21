export class CreateUserDto {
  id?: number;
  email: string;
  password: string;
  username: string;
  avator?: string;
  role?: number;
  createTime?: string;
  updateTime?: number;
}
