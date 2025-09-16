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
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/toast';
import { Plus, Upload, X } from 'lucide-react';

import { createMessage } from '@/app/service/messagemService';
import { FormattedMessage, useIntl } from 'react-intl';

interface MessageFormData {
  author: string;
  content: string;
  image?: File;
}

export default function FormMensagem() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newMessage: { author: string; content: string; image?: File }) => {
      const response = await createMessage(newMessage);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      onOpenChange();
      // Reset form
      setAuthor('');
      setContent('');
      setImage(null);
      setImagePreview('');
      setError('');

      addToast({
        title: `${intl.formatMessage({ defaultMessage: 'Recado pubilicado', id: 'recadoSucess' })}`,
        description: `${intl.formatMessage({ defaultMessage: 'Seu recado foi enviado com sucesso 🚀', id: 'descriptionSucess' })}`,
        color: 'success',
        timeout: 5000,
      });
    },
    onError: (err) => {
      addToast({
        title: `${intl.formatMessage({ defaultMessage: 'Erro ao publicar', id: 'reacadoError' })}`,
        description: `Ops! ${err.message}`,
        color: 'danger',
        timeout: 5000,
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        setError(
          `${intl.formatMessage({ defaultMessage: 'Por favor, selecione apenas arquivos de imagem', id: 'erroFile' })}`
        );
        return;
      }

      // Verificar tamanho do arquivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(
          `${intl.formatMessage({ defaultMessage: 'A imagem deve ter no máximo 5MB!', id: 'erroSize' })}`
        );
        return;
      }

      setImage(file);
      setError('');

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!author.trim() || !content.trim()) {
      setError(
        `${intl.formatMessage({ defaultMessage: 'Preencha seu nome e a mensagem antes de publicar!', id: 'erroForm' })}`
      );
      return;
    }

    const formData: MessageFormData = {
      author: author.trim(),
      content: content.trim(),
      image: image || undefined,
    };

    mutation.mutate(formData);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCloseModal = () => {
    // Resetar tudo ao fechar o modal
    setAuthor('');
    setContent('');
    setImage(null);
    setImagePreview('');
    setError('');
    onOpenChange();
  };

  return (
    <>
      <Button
        className="text-xl w-auto my-6"
        color="primary"
        size="lg"
        variant="shadow"
        onPress={onOpen}
      >
        <Plus /> <FormattedMessage defaultMessage={'Criar recado'} id="buttonModal" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={handleCloseModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <FormattedMessage defaultMessage={'Crie o seu recado'} id="titleModal" />
          </ModalHeader>
          <ModalBody>
            <Form>
              <Input
                isRequired
                isDisabled={mutation.isPending}
                label={intl.formatMessage({ defaultMessage: 'Seu nome', id: 'labelNome' })}
                name="author"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Digite o seu nome',
                  description: 'Placeholder do nome',
                  id: 'nomePlaceholder',
                })}
                type="text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setError('');
                }}
              />

              <Textarea
                isRequired
                isDisabled={mutation.isPending}
                label={intl.formatMessage({ defaultMessage: 'Sua mensagem', id: 'labelMensagem' })}
                minRows={3}
                name="content"
                placeholder={intl.formatMessage({
                  defaultMessage: 'Digite sua mensagem',
                  description: 'Placeholder da mensagem',
                  id: 'mensagemPlaceholder',
                })}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError('');
                }}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {intl.formatMessage({
                    defaultMessage: 'Imagem (opcional)',
                    id: 'labelImagem',
                  })}
                </label>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => fileInputRef.current?.click()}
                    startContent={<Upload size={16} />}
                    className="w-full mt-2"
                  >
                    <FormattedMessage defaultMessage="Selecionar imagem" id="buttonSelectFile" />
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <p className="text-xs text-gray-500">
                    <FormattedMessage
                      defaultMessage="Formatos suportados: JPG, PNG, GIF. Máximo: 5MB"
                      id="fileInstructions"
                    />
                  </p>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-42 h-auto  rounded-lg border"
                    />
                    <Button
                      size="sm"
                      isIconOnly
                      color="danger"
                      variant="flat"
                      onPress={removeImage}
                      className="absolute top-2 right-2 min-w-6 h-6"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>

              <Button
                className="w-full mt-4"
                color="primary"
                isLoading={mutation.isPending}
                onPress={handleSubmit}
              >
                <FormattedMessage defaultMessage={'Publicar recado'} id="buttonPublicar" />
              </Button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              <FormattedMessage defaultMessage={'Fechar'} id="buttonClose" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
