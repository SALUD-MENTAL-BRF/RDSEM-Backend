// src/notes/dto/update-note.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
