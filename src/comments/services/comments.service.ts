/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getOne(id: number) {
    const commentFound = await this.commentRepository.findOne({
      where: {
        id,
      },
    });
    if (!commentFound) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return commentFound;
  }

  createOne(body: any) {
    const newComment = this.commentRepository.create(body);
    return this.commentRepository.save(newComment);
  }

  async update(id: number, body: any) {
    const commentUpd = await this.commentRepository.findOne({
      where: {
        id,
      },
    });
    this.commentRepository.merge(commentUpd, body);
    return this.commentRepository.save(commentUpd);
  }

  async delete(id: number) {
    return await this.commentRepository.delete(id);
  }
}
