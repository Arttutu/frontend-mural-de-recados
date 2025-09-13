import { useMessagens } from "@/app/hook/useMessagens";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

export default function CardMensagem() {
  const { data: mensagens = [], isLoading, error } = useMessagens();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar mensagens</div>;

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {mensagens.map((message) => (
        <Card
          key={message.id}
          className="w-[380px] shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200"
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
                src={message.image}
                width={350}
                height={200}
              />
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
