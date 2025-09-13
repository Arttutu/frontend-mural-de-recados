// pages/index.tsx
'use client';
import { title, subtitle } from '@/components/primitives';
import CardMensagem from '@/components/card';
import FormMensagem from '@/components/form';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 mx-auto md:py-10 px-4">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <h1 className={title({ size: 'lg', color: 'violet' })}>Mural de </h1>
          <h1 className={title({ size: 'lg', color: 'violet' })}>Recados&nbsp;</h1>
        </div>
        <br />
        <span className={title({ size: 'sm' })}>
          Deixe uma mensagem positiva para alegrar e inspirar o dia de algúem
        </span>
      </div>
      <FormMensagem />
      <div className="flex flex-col ">
        <span className={subtitle({ class: 'my-6 text-2xl text-left ' })}>
          Recados da comunidade{' '}
        </span>
        <CardMensagem />
      </div>
    </section>
  );
}
