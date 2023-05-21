import { Test, TestingModule } from '@nestjs/testing';
import { SummariesController } from './summaries.controller';
import { SummariesService } from './summaries.service';
import { getModelToken } from '@nestjs/mongoose';
import { Summary } from './schemas/summaries.schemas';

describe('SummariesController', () => {
  let controller: SummariesController;
  let summaryModel;

  beforeEach(async () => {
    summaryModel = {
      find: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummariesService,
        {
          provide: getModelToken(Summary.name),
          useValue: summaryModel,
        },
      ],
    }).compile();

    controller = module.get<SummariesController>(SummariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
