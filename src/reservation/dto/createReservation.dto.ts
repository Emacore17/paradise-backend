import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  eventId: number;

  @IsDateString()
  eventDate: Date;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  eventName: string;

  @IsString()
  coverImage: string;
}
