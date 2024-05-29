import Image from "next/image";

export function FeatureCards() {
  return (
    <div className="container grid gap-10 pb-36 pt-20 lg:grid-cols-2 bg-white">
      <div>
        <div className="relative h-fit w-fit">
          <Image
            src="/home.jpg"
            alt="a picture of room"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-3xl">How it works</p>
        <p className="mb-1 font-semibold">Powered by GPT 4o</p>
        <p className="mb-4 text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni
          vel sed! Nulla porro necessitatibus autem quam doloremque ratione,
          aliquid dolorem consectetur velit nostrum tempora voluptatem Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Ipsum magni vel
          sed! Nulla porro necessitatibus autem quam doloremque ratione, aliquid
          dolorem consectetur velit nostrum tempora voluptatem.
        </p>
      </div>
    </div>
  );
}
