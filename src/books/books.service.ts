import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { AuthorsService } from '../authors/authors.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private authorsService: AuthorsService,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorsService.findOne(createBookDto.authorId);
    const book = this.booksRepository.create({ ...createBookDto, author });
    return this.booksRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    const author = await this.authorsService.findOne(updateBookDto.authorId);
    this.booksRepository.merge(book, { ...updateBookDto, author });
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<{ message: string }> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
    return { message: `Book with id (${id}) was deleted` };
  }
}
