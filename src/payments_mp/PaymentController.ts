/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Controller('payment')
export class PaymentController {
  @Post('create-preference')
  async createPreference({ req, res }) {
    // Crea un objeto de preferencia
    const preference = {
      items: [
        {
          title: req.body.title,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      // Maneja la respuesta según tus necesidades
      return response.body;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear la preferencia de pago');
    }
  }
}
