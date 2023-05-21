import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsController } from './highlights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Highlight, HighlightSchema } from './schemas/highlights.schema';
import { SummariesModule } from 'src/summaries/summaries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Highlight.name, schema: HighlightSchema },
    ]),
    SummariesModule,
  ],
  controllers: [HighlightsController],
  providers: [HighlightsService],
})
export class HighlightsModule {}
