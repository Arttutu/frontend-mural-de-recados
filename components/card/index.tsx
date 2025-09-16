import { Card, CardHeader, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';

import SkeletoCard from '../Skeleton';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { useMessagens } from '@/app/hook/useMessagens';
import { MessageCircle } from 'lucide-react';

export default function CardMensagem() {
  const { data: mensagens = [], isLoading, error } = useMessagens();

  if (isLoading) return <SkeletoCard />;
  if (error) return <div>Erro ao carregar mensagens</div>;

  return (
    <div className="grid grids-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {mensagens.map((message) => (
        <Card
          key={message.id}
          className="w-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200"
        >
          <CardHeader className="flex items-center gap-3 px-4 pt-4">
            <h4 className="font-semibold text-lg">{message.author}</h4>
          </CardHeader>

          <CardBody className="px-4 pb-4 flex flex-col gap-3 min-h-[280px]">
            <ScrollShadow className=" h-[120px]">
              <p className="text-md max-h-[200px]">{message.content}</p>
            </ScrollShadow>
            <div className="mt-auto">
              {message.image}
              {message.image ? (
                <Image
                  alt="Imagem da mensagem"
                  className="object-cover rounded-xl"
                  height={200}
                  src={message.image}
                  width={350}
                />
              ) : (
                <div className="w-full h-[200px] rounded-xl bg-default-300 flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-gray-500" />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
