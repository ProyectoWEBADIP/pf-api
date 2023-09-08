import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { Repository } from 'typeorm';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorRepository: Repository<Sponsor>,
  ) {}

  async createSponsor(createDto: CreateSponsorDto) {
    const sponsorFound = await this.sponsorRepository.findOne({
      where: {
        title: createDto.title,
      },
    });

    if (sponsorFound) {
      throw new HttpException('Sponsor already exists', HttpStatus.CONFLICT);
    }

    const newSponsor = this.sponsorRepository.create(createDto);
    return await this.sponsorRepository.save(newSponsor);
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
    });

    if (!sponsorFound) {
      return new HttpException('Sponsor not found', HttpStatus.NOT_FOUND);
    }
    const updateSponsor = Object.assign(sponsorFound, SponsorDto);
    return this.sponsorRepository.save(updateSponsor);
  }
}
