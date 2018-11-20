import { UserDAL } from './';
import { sign } from 'jsonwebtoken';
import { Document } from 'mongoose';

export class UserService {
  public static async register(userData: {username: string, email: string, password: string, createdDate?: string}) {
    userData.createdDate = new Date().toISOString();
    const newUser = await UserDAL.create(userData);
    const token = await sign({ id: (newUser as any).id }, 'test');
    return { token };
  }

  public static async login(loginData: {username: string, password: string}) {
    const users = await UserDAL.find(loginData);
    if ((users as Document[]).length === 0) {
      return new Error('Username or password incorrect');
    }
    const token = await sign({ id: (users[0] as any).id }, 'test');
    return { token };
  }
}