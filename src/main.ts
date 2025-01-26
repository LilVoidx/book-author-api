import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = process.env.PORT;
  await app.listen(port ?? 3001);
  const logger = new Logger('NestApplication');
  logger.log(`App Listening on http://localhost:${port ?? 3001}`);
}
bootstrap();
