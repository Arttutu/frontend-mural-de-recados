import { api } from './api';

export interface Message {
  id: string;
  author: string;
  content: string;
  image?: string;
  createdAt: string;
}
export interface CreateMessage {
  author: string;
  content: string;
  image?: string;
}

export const getMessages = () => api.get<Message[]>('/messages');

export const createMessage = (message: CreateMessage) => api.post<Message>('/messages', message);

export default api;
