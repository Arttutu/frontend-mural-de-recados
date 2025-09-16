// messagemService.ts
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
  image?: File;
}

export const getMessages = () => api.get<Message[]>('/messages');

export const createMessage = (message: CreateMessage) => {
  const formData = new FormData();
  formData.append('author', message.author);
  formData.append('content', message.content);

  if (message.image) {
    formData.append('image', message.image, message.image.name);
  }

  return api.post<Message>('/messages', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
