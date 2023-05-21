import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSummarytDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  summary: string;
}
