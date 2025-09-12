


import { title, subtitle } from "@/components/primitives";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center text-center   gap-2">
        <div className="flex items-center justify-center gap-2">    
           <span className={title()}>Mural de </span>
           <span className={title({ color: "violet" })}>Recados&nbsp;</span>
        </div>
   
        <br />
        <span className={title()}>
         Site para deixar seus recados!
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Site para deixar seus recados!
        </div>
      </div>


    </section>
  );
}
