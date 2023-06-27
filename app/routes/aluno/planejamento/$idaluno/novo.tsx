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
import { json, redirect } from "@remix-run/node";
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

const grupos1 = [
  {
    value: "OMBROS",
    label: "Ombros",
  },
  {
    value: "PANTURRILHA",
    label: "Panturrilha",
  },
  {
    value: "COSTAS",
    label: "Costas",
  },
  {
    value: "costa",
    label: "Costa",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const loader: LoaderFunction = async ({ request, params }) => {
  const grupos = treinos;
  console.log(grupos);

  return grupos;
};
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let values = Object.fromEntries(form);
  const planejado = await updatePlanejamento(values);

  return redirect(`..`);
};
export default function Maquina() {
  const grupos = useLoaderData();
  console.log(grupos);
  console.log(grupos1);
  const { aluno } = useRouteLoaderData("routes/aluno/planejamento/$idaluno");
  // const aluno = useLoaderData();
  // console.log(aluno);
  const [open, setOpen] = useState(false);
  const [treino, setTreino] = useState("");

  const navigate = useNavigate();
  function closeHandler() {
    navigate(-1);
  }
  const [date, setDate] = useState();

  return (
    <Modal onClose={closeHandler}>
      <Form method="post" className="font-semibold ">
        <div className=" text-center">
          Planejamento de treino - {aluno.firstName}{" "}
        </div>
        <div className="mt-2 text-left">
          <input hidden required value={date} id="data" name="data" />
          <input hidden value={aluno.idMember} id="aluno" name="aluno" />
          <input hidden value={treino} name="treino" id="treino"></input>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start font-normal",
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between">
              {treino.toUpperCase()
                ? grupos.find(
                    (grupo) => grupo.value.toUpperCase() == treino.toUpperCase()
                  )?.label
                : "Selecione o Treino.."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Procurar Treino..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {grupos.map((grupo) => (
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
        {/* <div className="mt-3">
          <select
            className="rounded-md border-2 
                          w-3/4 h-8 mx-auto "
            name="treino"
            id="treino">
            <option value="">Selecione o Treino</option>
            <option value="PEITORAL">PEITORAL</option>
            <option value="OMBROS">OMBROS</option>
            <option value="MEMBROS SUPERIORES 1">MEMBROS SUPERIORES 1</option>
            <option value="COSTAS">COSTAS</option>
            <option value="MEMBROS SUPERIORES 2">MEMBROS SUPERIORES 2</option>
            <option value="BICEPS">BICEPS</option>
            <option value="TRICEPS">TRICEPS</option>
            <option value="QUADS">QUADS</option>
            <option value="POSTERIORES DE COXAS">POSTERIORES DE COXAS</option>
            <option value="GLUTEOS">GLUTEOS</option>
            <option value="PANTURRILHA">PANTURRILHA</option>
            <option value="ABDOME">ABDOME</option>
            <option value="MEMBROS INFERIORES GERAL">
              MEMBROS INFERIORES GERAL
            </option>
            <option value="MEMBROS SUPERIORES GERAL">
              MEMBROS SUPERIORES GERAL
            </option>
          </select>
        </div> */}
        <Button variant="secondary" className="bg-stone-400  text-black mt-3">
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
