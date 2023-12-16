import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/db/entities/reservation.entity';
import { ClerkMiddlewareRequireAuth } from 'src/middleware/clerk-require-auth';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClerkMiddlewareRequireAuth).forRoutes(
      {
        path: 'reservation/create',
        method: RequestMethod.POST,
      },
      {
        path: 'reservation/delete*',
        method: RequestMethod.DELETE,
      },
      {
        path: 'reservation/all',
        method: RequestMethod.GET,
      },
    );
  }
}
