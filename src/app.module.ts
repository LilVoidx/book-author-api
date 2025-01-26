import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/book.entity';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Author, Book],
      synchronize: true,
    }),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}
