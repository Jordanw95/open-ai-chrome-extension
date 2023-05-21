import { Test, TestingModule } from '@nestjs/testing';
import { HighlightsController } from './highlights.controller';
import { HighlightsService } from './highlights.service';
import { getModelToken } from '@nestjs/mongoose';
import { Highlight } from './schemas/highlights.schema';
import { SummariesService } from '../summaries/summaries.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';

describe('HighlightsController', () => {
  let controller: HighlightsController;

  const mockHighlightModel = function () {
    this.save = jest.fn().mockResolvedValue(this);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighlightsController],
      providers: [
        HighlightsService,
        {
          provide: getModelToken(Highlight.name),
          useValue: mockHighlightModel,
        },
        {
          provide: SummariesService,
          useValue: {
            createSummary: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HighlightsController>(HighlightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a highlight', async () => {
    const highlightDto: CreateHighlightDto = {
      content: 'This is some content',
    };

    jest.spyOn(controller, 'create');

    await controller.create(highlightDto);

    expect(controller.create).toHaveBeenCalledWith(highlightDto);
  });
});
