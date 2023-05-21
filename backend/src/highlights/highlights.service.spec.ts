import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SummariesService } from '../summaries/summaries.service';
import { HighlightsService } from './highlights.service';
import { Highlight } from './schemas/highlights.schema';

describe('HighlightsService', () => {
  let service: HighlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HighlightsService,
        {
          provide: getModelToken(Highlight.name),
          useValue: {
            new: jest.fn().mockResolvedValue({ save: jest.fn() }),
          },
        },
        {
          provide: SummariesService,
          useValue: {
            createSummary: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HighlightsService>(HighlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
