import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import {Form} from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "@/app/service/messagemService";
import {addToast} from "@heroui/toast";

interface MessageFormData{
    author:string;
    content: string;
    image?: string
}

export default function FormMensagem() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
        title: "Recado publicado!",
        description: "Seu recado foi enviado com sucesso 🚀",
        color: "success",
        timeout: 5000,
    });
       
     },
     onError: (err) =>{  
      addToast({
      title: "Erro ao publicar",
      description: `Ops! ${err}`,
      color: "danger",
      timeout: 5000,
    
    });}
   });
  
    const handleSubmit = () => {    
        const formData: MessageFormData = { author, content, image: image || undefined };
        if (!author.trim() || !content.trim()) {
        setError("Preencha seu nome e a mensagem antes de publicar!");
        return;
        }
        mutation.mutate(formData);
    };

  return (    
    <>
        <Button 
            size="lg" 
            variant="shadow" 
            color="primary"
            className="text-xl w-auto mb-8" 
            onPress={() => { onOpen(); }}
        >
            Criar recado
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Crie o seu recado!</ModalHeader>
            <ModalBody>
       
                <Form>
                <Input
                    label="Seu nome"
                    name="author"
                    placeholder="Digite o seu nome"
                    onChange={(e) => setAuthor(e.target.value)}
                    type="text"
                    isRequired
                    isDisabled={mutation.isPending}
                />
                <Textarea
                    label="Sua mensagem"
                    placeholder="Digite sua mensagem"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    isRequired
                    minRows={3}
                    isDisabled={mutation.isPending}
                />
                <Input
                    label="URL da imagem (opcional)"
                    placeholder="Link da sua imagem aqui"
                    onChange={(e) => setImage(e.target.value)}
                    name="image"
                    isDisabled={mutation.isPending}
                />
                <Button 
                    type="submit" 
                    color="primary" 
                    onPress={handleSubmit}
                    isLoading={mutation.isPending}
                    className="w-full"
                >
                    Publicar Recado
                </Button>
                {error ? <p className="text-red-500">{error}</p> :""}
            
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
