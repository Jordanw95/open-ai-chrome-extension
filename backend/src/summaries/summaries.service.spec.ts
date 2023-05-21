import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SummariesService, openai } from './summaries.service';
import { Summary } from './schemas/summaries.schemas';

jest.mock('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn().mockImplementation(() => ({
    createChatCompletion: jest.fn(),
  })),
}));

describe('SummariesService', () => {
  let service: SummariesService;

  const mockSummaryModel = function () {
    this.save = jest.fn().mockResolvedValue(this);
  };
  beforeEach(async () => {
    (openai.createChatCompletion as jest.Mock).mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummariesService,
        {
          provide: getModelToken(Summary.name),
          useValue: mockSummaryModel,
        },
      ],
    }).compile();

    service = module.get<SummariesService>(SummariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSummary', () => {
    it('should call OpenAI', async () => {
      const mockContent = 'This is some content';
      const mockSummary = 'This is a summary';

      (openai.createChatCompletion as jest.Mock).mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: mockSummary,
              },
            },
          ],
        },
      });

      await service.createSummary(mockContent);

      expect(openai.createChatCompletion).toHaveBeenCalledWith({
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
              brief summary. Here is the text to summarise: ${mockContent}.
              `,
          },
        ],
      });
    });
  });
});
