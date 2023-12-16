import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/db/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/createReservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    if (!userId) {
      throw new BadRequestException('Dati mancanti o non validi.');
    }

    const existingReservation = await this.reservationRepo.findOne({
      where: {
        eventId: createReservationDto.eventId,
        userId: userId,
      },
    });

    if (existingReservation) {
      throw new ConflictException(
        "L'utente si è già prenotato per questo evento.",
      );
    }

    const reservation = {
      eventId: createReservationDto.eventId,
      userId: userId,
      eventDate: createReservationDto.eventDate,
      firstName: createReservationDto.firstName,
      lastName: createReservationDto.lastName,
      eventName: createReservationDto.eventName,
      coverImage: createReservationDto.coverImage,
    };

    try {
      const todoOrm = this.reservationRepo.create(reservation);
      return await this.reservationRepo.save(todoOrm);
    } catch (error) {
      throw new Error(
        'Si è verificato un errore durante la creazione della prenotazione.',
      );
    }
  }

  async allByUserId(userId: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepo.find({
        where: { userId },
      });

      return reservations;
    } catch (error) {
      throw new BadRequestException('Errore nel recuperare le prenotazioni');
    }
  }

  async deleteById(reservationId: number): Promise<string> {
    try {
      const reservation = await this.reservationRepo.findOneBy({
        id: reservationId,
      });

      if (!reservation) {
        throw new NotFoundException(`La prenotazione non è stata trovata.`);
      }

      await this.reservationRepo.remove(reservation);
      return 'Prenotazione eliminata';
    } catch (error) {
      throw new Error("Si è verificato un errore durante l'eliminazione");
    }
  }
}
