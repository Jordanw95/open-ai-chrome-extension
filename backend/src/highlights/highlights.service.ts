import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { Highlight, HighlightDocument } from './schemas/highlights.schema';

@Injectable()
export class HighlightsService {
  constructor(
    @InjectModel(Highlight.name)
    private highlightModel: Model<HighlightDocument>,
  ) {}
  create(createHighlightDto: CreateHighlightDto) {
    const createdHighlight = new this.highlightModel(createHighlightDto);
    return createdHighlight.save();
  }

  findAll() {
    return this.highlightModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} highlight`;
  }

  update(id: number, updateHighlightDto: UpdateHighlightDto) {
    return `This action updates a #${id} highlight`;
  }

  remove(id: number) {
    return `This action removes a #${id} highlight`;
  }
}
