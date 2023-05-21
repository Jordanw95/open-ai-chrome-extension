import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { Highlight, HighlightDocument } from './schemas/highlights.schema';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class HighlightsService {
  constructor(
    @InjectModel(Highlight.name)
    private highlightModel: Model<HighlightDocument>,
  ) {}

  createSummary = async (content: string) => {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are going to act summariser, taking in given information and summarising it.',
        },
        {
          role: 'user',
          content: `
          I want you to generate a brief summary of the following text, containing 
          only key information. Do not respond with any other text, other than the 
          brief summary. Here is the text to summarise: ${content}.
          `,
        },
      ],
    });
    console.log(completion.data.choices[0].message);
    return completion;
  };

  async create(createHighlightDto: CreateHighlightDto) {
    await this.createSummary(createHighlightDto.content);
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
