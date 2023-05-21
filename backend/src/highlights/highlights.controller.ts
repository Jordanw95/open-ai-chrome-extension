import { Controller, Post, Body } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';

@Controller('highlights')
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Post()
  async create(@Body() createHighlightDto: CreateHighlightDto) {
    return await this.highlightsService.create(createHighlightDto);
  }
}
