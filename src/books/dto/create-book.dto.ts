import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  publishedDate?: Date;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
