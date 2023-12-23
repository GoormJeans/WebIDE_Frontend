export interface Message{
  id: number;
  nickname: string;
  content: string;
  createdAt: Date;
  type?: string;
}
