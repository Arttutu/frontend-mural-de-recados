import { Button } from '@heroui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';
import { Plus } from 'lucide-react';

import { createMessage } from '@/app/service/messagemService';

interface MessageFormData {
  author: string;
  content: string;
  image?: string;
}

export default function FormMensagem() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newMessage: { author: string; content: string; image?: string }) => {
      const response = await createMessage(newMessage);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      onOpenChange();
      addToast({
        title: 'Recado publicado!',
        description: 'Seu recado foi enviado com sucesso 🚀',
        color: 'success',
        timeout: 5000,
      });
    },
    onError: (err) => {
      addToast({
        title: 'Erro ao publicar',
        description: `Ops! ${err}`,
        color: 'danger',
        timeout: 5000,
      });
    },
  });

  const handleSubmit = () => {
    const formData: MessageFormData = { author, content, image: image || undefined };

    if (!author.trim() || !content.trim()) {
      setError('Preencha seu nome e a mensagem antes de publicar!');

      return;
    }
    mutation.mutate(formData);
  };

  return (
    <>
      <Button
        className="text-xl w-auto my-6  "
        color="primary"
        size="lg"
        variant="shadow"
        onPress={() => {
          onOpen();
        }}
      >
        <Plus /> Criar recado
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Crie o seu recado!</ModalHeader>
          <ModalBody>
            <Form>
              <Input
                isRequired
                isDisabled={mutation.isPending}
                label="Seu nome"
                name="author"
                placeholder="Digite o seu nome"
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <Textarea
                isRequired
                isDisabled={mutation.isPending}
                label="Sua mensagem"
                minRows={3}
                name="content"
                placeholder="Digite sua mensagem"
                onChange={(e) => setContent(e.target.value)}
              />
              <Input
                isDisabled={mutation.isPending}
                label="URL da imagem (opcional)"
                name="image"
                placeholder="Link da sua imagem aqui"
                onChange={(e) => setImage(e.target.value)}
              />
              <Button
                className="w-full"
                color="primary"
                isLoading={mutation.isPending}
                type="submit"
                onPress={handleSubmit}
              >
                Publicar Recado
              </Button>
              {error ? <p className="text-red-500">{error}</p> : ''}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
