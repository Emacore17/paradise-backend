import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

function checkEnvironment(configService: ConfigService) {
  const requiredEnvVars = ['SERVER_PORT', 'BACKEND_URL', 'FRONTEND_URL'];

  requiredEnvVars.forEach((envVar) => {
    if (!configService.get<string>(envVar)) {
      throw Error(`Variabili d'ambiente non definite: ${envVar}`);
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
    }),
  );

  app.enableCors();
  await app.listen(configService.get<string>('SERVER_PORT'));
}
bootstrap();
