import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//sponsors
import { Sponsor } from './entities/sponsor.entity';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
//user relations
import { User } from '../users/entities/user.entity';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorRepository: Repository<Sponsor>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createSponsor(CreateSponsorDto: CreateSponsorDto) {
    try {
      const { user_id, ...sponsorData } = CreateSponsorDto;

      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const newSponsor = new Sponsor(
        sponsorData.title,
        sponsorData.image,
        sponsorData.active,
        sponsorData.location,
        user,
      );
      await this.sponsorRepository.save(newSponsor);
      return newSponsor;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getSponsors() {
    return this.sponsorRepository.find();
  }

  async getSponsor(id: number) {
    const sponsorFound = await this.sponsorRepository.findOne({
      where: { id },
    });
    if (!sponsorFound) {
      throw new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
    }
    return sponsorFound;
  }

  async deleteSponsor(id: number) {
    const sponsorFound = await this.sponsorRepository.findOne({
      where: { id },
    });

    if (!sponsorFound) {
      throw new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
    }

    return this.sponsorRepository.delete({ id });
  }

  async updateSponsor(id: number, SponsorDto: UpdateSponsorDto) {
    const sponsorFound = await this.sponsorRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!sponsorFound) {
      throw new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
    }
    const { user_id, ...sponsorData } = SponsorDto;

    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    sponsorFound.title = sponsorData.title;
    sponsorFound.image = sponsorData.image;
    sponsorFound.active = sponsorData.active;
    sponsorFound.location = sponsorData.location;
    sponsorFound.user = user;

    return this.sponsorRepository.save(sponsorFound);
  }
}
