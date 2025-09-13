import { Card, CardHeader, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';

import SkeletoCard from '../Skeleton';

import { useMessagens } from '@/app/hook/useMessagens';

export default function CardMensagem() {
  const { data: mensagens = [], isLoading, error } = useMessagens();

  if (isLoading) return <SkeletoCard />;
  if (error) return <div>Erro ao carregar mensagens</div>;

  return (
    <div className="grid grids-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {mensagens.map((message) => (
        <Card
          key={message.id}
          className="w-full shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200"
        >
          <CardHeader className="flex items-center gap-3 px-4 pt-4">
            <h4 className="font-semibold text-lg">{message.author}</h4>
          </CardHeader>

          <CardBody className="px-4 pb-4 flex flex-col gap-3">
            <p className=" text-base">{message.content}</p>
            {message.image && (
              <Image
                alt="Imagem da mensagem"
                className="object-cover rounded-xl"
                height={200}
                src={message.image}
                width={350}
              />
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
