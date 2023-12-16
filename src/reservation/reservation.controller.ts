import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { RequireAuthProp } from '@clerk/clerk-sdk-node';
import { Request } from 'express';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('create')
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: RequireAuthProp<Request>,
  ) {
    const userId = req.auth?.userId;
    if (!userId) {
      throw new UnauthorizedException('Utente non loggato');
    }
    return this.reservationService.create(createReservationDto, userId);
  }

  @Get('all')
  async allByUserId(@Req() req: RequireAuthProp<Request>) {
    const userId = req.auth?.userId;
    if (!userId) {
      throw new UnauthorizedException('Utente non loggato');
    }
    return this.reservationService.allByUserId(userId);
  }

  @Delete('delete/:reservationId')
  async deleteById(
    @Param('reservationId') reservationId: number,
    @Req() req: RequireAuthProp<Request>,
  ) {
    const userId = req.auth?.userId;
    if (!userId) {
      throw new UnauthorizedException('Utente non loggato');
    }
    return this.reservationService.deleteById(reservationId);
  }
}
