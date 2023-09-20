/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as mercadopago from 'mercadopago';

@Injectable()
export class PaymentService {
  async createPayment(req: CreatePaymentDto) {
    const preference = {
      items: [
        {
          title: req.description,
          unit_price: Number(req.price),
          quantity: Number(req.quantity),
        },
      ],
      back_urls: {
        success: 'https://front-deploy-adipweb.onrender.com',
        failure: 'https://front-deploy-adipweb.onrender.com',
        pending: '',
      },
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      return response;
    } catch (error) {
      throw new Error('Error al crear la preferencia de MercadoPago');
    }
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
