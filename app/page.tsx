// pages/index.tsx
'use client';
import { title, subtitle } from "@/components/primitives";
import CardMensagem from '@/components/card';
import FormMensagem from '@/components/form';



export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 mx-auto md:py-10 px-4">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex items-center justify-center gap-2">    
          <span className={title()}>Mural de </span>
          <span className={title({ color: "violet" })}>Recados&nbsp;</span>
        </div>
        <br />
        <span className={title({ size: 'sm' })}>
       Deixe uma mensagem positiva para alegrar e inspirar o dia de algúem
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Compartilhe suas mensagens com todos
        </div>
      </div>
      <FormMensagem />
      <CardMensagem />
    
    </section>
  );
}