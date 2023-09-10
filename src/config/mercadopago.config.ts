import * as mercadopago from 'mercadopago';

export const initializeMercadoPago = () => {
  mercadopago.configure({
    access_token:
      'TEST-5715773100891030-051614-a66723262e69134aca6c461e4a4e744c-218316911',
    // Configura otras opciones si es necesario
  });
};
