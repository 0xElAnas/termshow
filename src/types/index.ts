export interface CommandBlock {
  command: string;
  autoExecute: boolean;
  inline?: boolean;
  number?: number;
}

export interface Slide {
  title: string;
  content: string;
  commands: CommandBlock[];
} 