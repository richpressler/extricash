import { UserDAL } from './';
import { sign } from 'jsonwebtoken';
import { Document } from 'mongoose';

export class UserService {
  public static async register(userData: {username: string, email: string, password: string, createdDate?: string}) {
    const existingEmail = await UserDAL.findOne({ email: userData.email });
    console.log(existingEmail);
    if (existingEmail) {
      throw new Error('Email already taken');
    }

    const existingUsername = await UserDAL.findOne({ username: userData.username });
    console.log(existingUsername);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

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
