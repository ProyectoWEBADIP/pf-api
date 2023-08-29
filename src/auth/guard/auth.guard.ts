/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información
    // sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // Si la validación es exitosa, devuelve true, permitiendo el acceso.
    // Si la validación falla, devuelve false, denegando el acceso.
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      //verifica si la palabra secreta es igual que la de la constante
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      //Aca a la request le agrego una propiedad llamada "user", donde le paso el payload del token, es decir el mail para poder recibirlo en la response, como recibirlo por el body, pero en vez de eso, lo recibo por la propiedad "user".
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    //Desde Postman mando el token, como Bearer Token, tiene la siguiente estructura:
    // Bearer asda0sd9a0sd90as9d0a9sd0a90sd9a0s9d0as9d0a9sd091029309sd0am90, la siguiente funcion, lo que hace es hacer un split en el ' ', separar el string en un array y validar si es de tipo Bearer, de ser el caso lo retorna para que pueda usarlo la funcion canActivate
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
