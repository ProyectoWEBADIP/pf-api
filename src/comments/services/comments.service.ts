/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Entity, Repository } from 'typeorm';
import { Comments } from '../entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}

  getAll() {
    return this.commentRepository.find();
  }

  getOne(id: string) {
    return this.commentRepository.findOne({
      where: {
        id,
      },
    });
  }

  createOne(body: any) {
    const newComment = this.commentRepository.create(body);
    return this.commentRepository.save(newComment);
  }

  async update(id: string, body: any) {
    const commentUpd = await this.commentRepository.findOne({
      where: {
        id,
      },
    });
    this.commentRepository.merge(commentUpd, body);
    return this.commentRepository.save(commentUpd);
  }
}

async delete(id: string) {
   await this.commentRepository.delete(id);
return true
}