import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user.entity';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from '../dtos/auth.dto';
import { HttpException } from '../shared/utils/http-exception';

const JWT_SECRET = process.env.JWT_SECRET || 'furniro_jwt_secret_key_2026';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const userExists = await this.userRepository.findOneBy({ email: data.email });

    if (userExists) {
      throw new HttpException(400, 'E-mail já cadastrado.', null);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  }

  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (!user) {
      throw new HttpException(401, 'E-mail ou senha inválidos.', null);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(401, 'E-mail ou senha inválidos.', null);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };
  }
}