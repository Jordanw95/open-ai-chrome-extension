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
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: '1', name: 'Test summary' }),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummariesController],
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

  it('should return all summaries', async () => {
    const testSummaries = [{ _id: '1', name: 'Test summary' }];
    summaryModel.exec.mockResolvedValue(testSummaries);

    expect(await controller.findAll()).toEqual(testSummaries);
    expect(summaryModel.find).toHaveBeenCalled();
    expect(summaryModel.sort).toHaveBeenCalledWith({ created_at: -1 });
    expect(summaryModel.exec).toHaveBeenCalled();
  });
});
