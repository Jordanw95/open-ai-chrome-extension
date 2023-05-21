import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Summary, SummaryDocument } from './schemas/summaries.schemas';
import { CreateSummarytDto } from './dto/summary-create.dto';
import { validate } from 'class-validator';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel(Summary.name) private summaryModel: Model<SummaryDocument>,
  ) {}

  validateSummary = async (summary: any): Promise<CreateSummarytDto> => {
    const summaryDto = Object.assign(new CreateSummarytDto(), summary);
    const errors = await validate(summaryDto);
    if (errors.length > 0) {
      throw new Error('Validation failed!');
    } else {
      return summaryDto;
    }
  };

  requestSummary = async (content: string): Promise<string> => {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are going to act as a summary creation bot, taking in given information and summarising it.',
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
    return completion.data.choices[0].message.content;
  };

  async createSummary(content: string): Promise<Summary> {
    const summary = await this.requestSummary(content);
    const summaryDto = await this.validateSummary({ summary });
    const createdSummary = new this.summaryModel(summaryDto);
    return createdSummary.save();
  }

  async findAll(): Promise<Summary[]> {
    return this.summaryModel.find().sort({ created_at: -1 }).exec();
  }
}
