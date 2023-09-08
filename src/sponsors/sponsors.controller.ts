import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { Sponsor } from './entities/sponsor.entity';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { SponsorsService } from './sponsors.service';

@Controller('sponsors')
export class SponsorsController {
  constructor(private sponsorsService: SponsorsService) {}

  @Get()
  getSponsors(): Promise<Sponsor[]> {
    return this.sponsorsService.getSponsors();
  }

  @Get(':id')
  getSponsor(@Param('id', ParseIntPipe) id: number) {
    return this.sponsorsService.getSponsor(id);
  }

  @Post()
  createSponsor(@Body() newSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    return this.sponsorsService.createSponsor(newSponsorDto);
  }

  @Delete(':id')
  deleteSponsor(@Param('id', ParseIntPipe) id: number) {
    return this.sponsorsService.deleteSponsor(id);
  }

  @Patch(':id')
  updateSponsor(
    @Param('id', ParseIntPipe) id: number,
    @Body() sponsorDto: UpdateSponsorDto,
  ) {
    return this.sponsorsService.updateSponsor(id, sponsorDto);
  }
}
