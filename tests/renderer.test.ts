import { jest } from '@jest/globals';
import { renderSlides } from '../src/renderer';

// Mock process.stdin
const mockStdin = {
  setRawMode: jest.fn(),
  setEncoding: jest.fn(),
  on: jest.fn(),
  resume: jest.fn(),
  pause: jest.fn(),
  removeAllListeners: jest.fn()
};

// Mock console.log
const mockConsoleLog = jest.fn();

// Mock process.stdin and console.log
beforeAll(() => {
  Object.defineProperty(process, 'stdin', {
    value: mockStdin
  });
  console.log = mockConsoleLog;
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Renderer', () => {
  test('should render basic slide content', () => {
    const slides = [{
      title: 'Test Slide',
      content: '# Title\n\nContent',
      commands: []
    }];
    renderSlides(slides);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Title'));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Content'));
  });

  test('should render commands', () => {
    const slides = [{
      title: 'Command Slide',
      content: '```bash\n$ echo "Hello"\n```',
      commands: [{ command: 'echo "Hello"', autoExecute: true }]
    }];
    renderSlides(slides);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('echo "Hello"'));
  });

  test('should handle multiple commands', () => {
    const slides = [{
      title: 'Multiple Commands',
      content: '```bash\n$ cmd1\n$ cmd2\n```',
      commands: [
        { command: 'cmd1', autoExecute: true },
        { command: 'cmd2', autoExecute: false }
      ]
    }];
    renderSlides(slides);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('cmd1'));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('cmd2'));
  });
}); 