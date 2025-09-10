import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString() // Garante que a data está no formato ISO 8601 (ex: "2025-12-31T20:00:00Z")
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  location: string;
}
