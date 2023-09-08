import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidationArguments,
} from 'class-validator';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Rol } from '../entities/rol.entity';

@Injectable()
@ValidatorConstraint({ name: 'isValueUnique', async: true })
export class IsValueUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const genre = args.object['genre']; // Obtener el género del contexto
    const category = args.object['category']; // Obtener la categoría del contexto

    // Realizar una consulta a la base de datos para verificar la unicidad del valor
    const existingRol = await this.rolRepository.findOne({
      where: {
        genero: genre,
        category: category,
        subCategory: value,
      },
    });

    // Si existingRol es null, significa que el valor es único; de lo contrario, no lo es.
    return !existingRol;
  }
}

export function IsUniqueInGenreAndCategory(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValueUniqueConstraint, // Cambia el nombre de la clase aquí
    });
  };
}

export class CreateRolDto {
  @IsNotEmpty()
  @IsString()
  @IsUniqueInGenreAndCategory({
    message: 'El género y la categoría deben ser únicos en combinación.',
  })
  genero: string;

  @IsNotEmpty()
  @IsString()
  @IsUniqueInGenreAndCategory({
    message: 'El género y la categoría deben ser únicos en combinación.',
  })
  category: string;

  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
