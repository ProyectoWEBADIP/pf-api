import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//pago
import { Pago } from './entities/pago.entity';
import { CreatePagosDto } from './dto/create-pago.dto';
import { UpdatePagosDto } from './dto/update-pago.dto';
//user relations
import { User } from '../users/entities/user.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createPago(CreatePagoDto: CreatePagosDto) {
    try {
      const { user_id, ...pagoData } = CreatePagoDto;

      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      const newPago = new Pago(
        pagoData.cuota,
        pagoData.estado,
        pagoData.comprobante,
        user,
      );
      await this.pagoRepository.save(newPago);
      return newPago;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getPagos() {
    return this.pagoRepository.find();
  }

  async getPago(id: number) {
    const pagoFound = await this.pagoRepository.findOne({
      where: { id },
    });
    if (!pagoFound) {
      throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    return pagoFound;
  }

  async deletePago(id: number) {
    const pagoFound = await this.pagoRepository.findOne({
      where: { id },
    });
    if (!pagoFound) {
      throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    await this.pagoRepository.delete({ id });
    return { message: 'Pago eliminado satisfactoriamente' };
  }

  async updatePago(id: number, updatePagoDto: UpdatePagosDto) {
    const pagoFound = await this.pagoRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!pagoFound) {
      throw new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    const { user_id, ...pagoData } = updatePagoDto;

    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    pagoFound.cuota = pagoData.cuota;
    pagoFound.estado = pagoData.estado;
    pagoFound.comprobante = pagoData.comprobante;
    pagoFound.user = user;

    await this.pagoRepository.update({ id }, pagoData);
    return { message: 'Pago actualizado satisfactoriamente' };
  }
}
