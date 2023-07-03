import Modal from "~/components/Modal";
import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import { FaWindowClose } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ptBR from "date-fns/locale/pt-BR";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updatePlanejamento } from "@/utils/aluno.server";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { treinos } from "@/utils/treinos.server";
import { Input } from "@/components/ui/input";

export const loader: LoaderFunction = async ({ request, params }) => {
  const grupos = treinos;
  return grupos;
};
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let values = Object.fromEntries(form);
  const planejado = await updatePlanejamento(values);

  return redirect(`..`);
};
export default function Maquina() {
  const { grupos } = useLoaderData();
  const { aluno } = useRouteLoaderData("routes/aluno/planejamento/$idaluno");

  const [open, setOpen] = useState(false);
  const [treino, setTreino] = useState("");

  const navigate = useNavigate();
  function closeHandler() {
    navigate(-1);
  }
  const [date, setDate] = useState();

  return (
    <Modal onClose={closeHandler}>
      <Form
        method="post"
        className="font-semibold grid space-x-2 space-y-4 grid-cols-1 md:grid-cols-2 ">
        <div className=" md:col-span-2 text-center mb-4">
          Planejamento de treino - {aluno.firstName}{" "}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[300px] text-stone-500 justify-between">
              {treino.toUpperCase()
                ? grupos.find(
                    (grupo: any) =>
                      grupo.value.toUpperCase() == treino.toUpperCase()
                  )?.label
                : "Selecione o Treino.."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Procurar Treino..." />
              <CommandEmpty>Treino não encontrado</CommandEmpty>
              <CommandGroup>
                {grupos.map((grupo: any) => (
                  <CommandItem
                    key={grupo.value}
                    onSelect={(currentValue) => {
                      setTreino(
                        currentValue == treino.toUpperCase()
                          ? ""
                          : currentValue.toUpperCase()
                      );
                      setOpen(false);
                    }}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        treino.toUpperCase() == grupo.value.toUpperCase()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {grupo.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className=" text-left">
          <input hidden required value={date} id="data" name="data" />
          <input hidden value={aluno.idMember} id="aluno" name="aluno" />
          <input hidden value={treino} name="treino" id="treino"></input>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start font-normal",
                  !date && "text-muted-foreground"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "ccc, dd/MM", { locale: ptBR })
                ) : (
                  <span>Selecione a data:</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Input
          className="md:col-span-2"
          type="text"
          id="treinolivre"
          name="treinolivre"
          placeholder="Treino"
        />

        <Button
          variant="secondary"
          className="bg-stone-400 md:col-span-2 text-black ">
          Salvar
        </Button>
      </Form>
      <div className=" flex place-content-end">
        <Link to=".." className="m-4 text-xl ">
          <FaWindowClose className=" font-semibold text-3xl text-stone-600 " />
        </Link>
      </div>
    </Modal>
  );
}
