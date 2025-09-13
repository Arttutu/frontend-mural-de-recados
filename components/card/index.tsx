import { useMessagens } from "@/app/hook/useMessagens";

export default function CardMensagem() {
  const { data: mensagens = [], isLoading, error } = useMessagens();
  
  if (isLoading) return <div>Carregando</div>;
  if (error) return <div>Erro</div>;
  
  return (
    <div>
          <div className="flex gap-4">
        {mensagens.map((message) => ( 
          <div key={message.id} className="border p-4 my-2">
            <h1 className="text-xl font-bold">{message.author}</h1>
            <p className="text-gray-700">{message.content}</p>
            {message.image && (
              <img src={message.image} alt="Imagem" className="mt-2 max-w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}