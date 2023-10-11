import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Ballet() {
  return (
    <>
      <div className="flex flex-col items-center ">
        <img
          src="/belaweb.jpg"
          alt="capa ballet"
          className="w-full md:w-[600px] "
        />
      </div>
      <div className="md:container  flex place-content-center">
        <Tabs defaultValue="historia" className="w-full md:w-[600px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="historia">História</TabsTrigger>
            <TabsTrigger value="personagens">Personagens</TabsTrigger>
            <TabsTrigger value="elenco">Elenco</TabsTrigger>
          </TabsList>
          <div className="container">
            <TabsContent value="historia">
              <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
                A Bela e a Fera
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-4">
                Once upon a time, in a far-off land, there was a very lazy king
                who spent all day lounging on his throne. One day, his advisors
                came to him with a problem: the kingdom was running out of
                money.
              </p>
              <h2 className="scroll-m-20 border-b pb-1 text-lg font-semibold tracking-tight  transition-colors mt-3">
                Prólogo
              </h2>
              <p className=" pl-2 mt-2 ">
                "After all," he said, "everyone enjoys a good joke, so it's only
                fair that they should pay for the privilege."
              </p>
              <h2 className="scroll-m-20 border-b pb-1 text-lg font-semibold tracking-tight transition-colors mt-3">
                Ato I - Vilarejo
              </h2>
              <p className=" pl-2 mt-2 ">
                "After all," he said, "everyone enjoys a good joke, so it's only
                fair that they should pay for the privilege."
              </p>
              <h2 className="scroll-m-20 border-b pb-1 text-lg font-semibold tracking-tight transition-colors mt-3">
                Ato II - Floresta
              </h2>
              <p className=" pl-2 mt-2 ">
                "After all," he said, "everyone enjoys a good joke, so it's only
                fair that they should pay for the privilege."
              </p>
              <h2 className="scroll-m-20 border-b pb-1 text-lg font-semibold tracking-tight transition-colors mt-3">
                Ato III- Castelo
              </h2>
              <p className=" pl-2 mt-2 ">
                "After all," he said, "everyone enjoys a good joke, so it's only
                fair that they should pay for the privilege."
              </p>
            </TabsContent>
            <TabsContent value="personagens">
              <div>Personagens</div>
            </TabsContent>
            <TabsContent value="elenco">
              <div>Elenco</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
