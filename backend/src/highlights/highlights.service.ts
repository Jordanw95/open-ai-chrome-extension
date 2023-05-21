import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { Highlight, HighlightDocument } from './schemas/highlights.schema';
import { SummariesService } from '../summaries/summaries.service';

@Injectable()
export class HighlightsService {
  constructor(
    @InjectModel(Highlight.name)
    private highlightModel: Model<HighlightDocument>,
    private readonly SummariesService: SummariesService,
  ) {}

  async create(createHighlightDto: CreateHighlightDto) {
    const createdHighlight = new this.highlightModel(createHighlightDto);
    const summary = await this.SummariesService.createSummary(
      createHighlightDto.content,
    );
    return createdHighlight.save();
  }
}
