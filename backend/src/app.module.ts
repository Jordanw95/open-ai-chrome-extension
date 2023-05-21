import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HighlightsModule } from './highlights/highlights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesModule } from './summaries/summaries.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    HighlightsModule,
    SummariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
