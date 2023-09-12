import { Injectable } from '@nestjs/common';
import { CreateLigasDto } from './dto/create-ligas.dto';
import { UpdateLigasDto } from './dto/update-ligas.dto';

@Injectable()
export class LigasService {
  create(createLigasDto: CreateLigasDto) {
    return 'This action adds a new ligas';
  }

  findAll() {
    return `This action returns all ligas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ligas`;
  }

  update(id: number, updateLigasDto: UpdateLigasDto) {
    return `This action updates a #${id} ligas`;
  }

  remove(id: number) {
    return `This action removes a #${id} ligas`;
  }
}
