import {
  deleteTreinoPlanejado,
  getAluno,
  getHistorico,
  updateFicha,
} from "@/utils/aluno.server";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect, type LoaderFunction } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import _ from "lodash";
import { AiFillCloseCircle } from "react-icons/ai";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const loader: LoaderFunction = async ({ request, params }) => {
  const aluno = await getAluno(Number(params.idaluno));
  const historico = await getHistorico(Number(params.idaluno));

  return json({ aluno, historico });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let values = Object.fromEntries(form);
  const _action = form.get("_action");
  if (_action === "delete") {
    await deleteTreinoPlanejado(values);
  }
  if (_action === "salvar") {
    await updateFicha(values);
  }

  return redirect(`.`);
};

export default function Idaluno() {
  const { aluno, historico } = useLoaderData();
  const transition = useTransition();

  // const PlaneTreino = _.mapValues(
  //   _.orderBy(historico.planejados, ["data", "asc"]),
  //   function (o) {
  //     const dt = o.data;
  //     const data = format(new Date(o.data), "EEEEEE - dd/MM", {
  //       locale: ptBR,
  //     });
  //     return { treino: o.treinoP, data, dt };
  //   }
  // );

  const PlaneTreino = _.mapValues(
    _.orderBy(historico?.planejados, ["data", "asc"]),
    function (o) {
      const dt = o.data;
      const feito = o.feito;
      const data = format(new Date(o.data), "EEEEEE - dd/MM", {
        locale: ptBR,
      });
      return { treino: o.treinoP, data, dt, feito };
    }
  );

  // const grupotreino = _.map(
  //   _.groupBy(PlaneTreino, "data"),
  //   (data, idx, teste) => {
  //     return { data: idx, treino: data, dt: teste };
  //   }
  // );

  const grupotreino = _.map(
    _.groupBy(PlaneTreino, "data"),
    (data, idx, dt, feito) => {
      return { data: idx, treino: data, dt: dt, feito: feito };
    }
  );

  const ultimos = _.takeRight(grupotreino, 7);

  return (
    <div>
      <Outlet />
      <Form method="post">
        <input
          hidden
          type="number"
          name="aluno"
          readOnly
          defaultValue={aluno.idMember}
        />
        <Card className="w-full md:w-11/12 mt-2 mx-auto  ">
          <CardContent className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 items-center justify-between ">
              <div className="flex items-center space-x-2 mt-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={aluno.photo ? aluno.photo : `/user.png`} />
                  <AvatarFallback>Foto</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className=" font-medium  text-lg leading-none">
                    {aluno.firstName}
                  </p>
                  <p className="text-sm text-stone-400 text-muted-foreground">
                    {_.filter(aluno.memberships, {
                      membershipStatus: "active",
                    }).map((n) => n.name)}
                  </p>
                </div>
              </div>
              {/* <div className="font-medium flex justify-self-end   text-green-600"> */}
              <div
                className={
                  historico?.nivel === "iniciante"
                    ? " bg-red-600 text-white rounded-md font-medium flex justify-self-end"
                    : historico?.nivel === "intermediario"
                    ? "bg-orange-500 text-white rounded-md font-medium flex justify-self-end"
                    : "bg-green-500 text-white rounded-md font-medium flex justify-self-end"
                }>
                <Select name="nivel" defaultValue={historico?.nivel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Nível do Aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* <input
                className="font-medium text-right text-green-600 border-b p-2"
                type="text"
                name="nivel"
                defaultValue={historico?.nivel}
                placeholder="Nível"
              /> */}
            </div>
            <div className="grid grid-cols-1  ">
              <div className="">
                <div className="">
                  <p className="font-medium text-stone-500">Histórico</p>
                  <textarea
                    className=" block p-1 w-full text-gray-900 bg-stone-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // type="text"
                    name="historico"
                    defaultValue={historico?.historico}
                    rows={4}
                  />
                </div>
              </div>
              <div className="">
                <p className="font-medium text-stone-500">Patologias</p>
                <textarea
                  className=" block p-1 w-full   text-gray-900 bg-stone-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  // type="text"
                  name="patologias"
                  defaultValue={historico?.patologias}
                  rows={4}
                />
              </div>
            </div>
            <button
              name="_action"
              value="salvar"
              // variant="secondary"
              className="bg-stone-300  text-black py-2 px-1 rounded-md">
              {transition.state === "submitting"
                ? "Atualizando..."
                : "Atualizar"}
            </button>
          </CardContent>
        </Card>
      </Form>
      <div className="w-full  ">
        <div className="">
          {ultimos && (
            <>
              <h2 className="   text-stone-600 rounded-md font-semibold  text-center text-lg m-4">
                Treinos Planejados
              </h2>
              <div className="text-stone-600 place-content-center gap-2 container mx-auto grid grid-cols-2 md:gap-2 md:grid-cols-4 lg:grid-cols-7 lg:container-2xl">
                {ultimos.map((u: any, index) => (
                  <div key={index} className="border rounded-md">
                    <div className=" text-center">
                      <div className="bg-stone-200">{u.data}</div>
                      <div className="  py-1 text-stone-600 text-center">
                        {u.treino.map((t: any, index: any) => (
                          <Form
                            method="post"
                            className="flex items-center place-content-between m-2"
                            key={index}>
                            {t.treino}

                            <input
                              type="text"
                              value={t.treino}
                              hidden
                              name="treino"
                              readOnly
                            />
                            <input
                              type="text"
                              value={t.dt}
                              hidden
                              name="data"
                              readOnly
                            />
                            <input
                              hidden
                              type="number"
                              name="aluno"
                              readOnly
                              defaultValue={aluno.idMember}
                            />
                            {t.feito ? (
                              <span className="inline-flex items-center justify-center px-1.5 py-1 mr-2 text-xs leading-none text-white  bg-green-500 rounded-full">
                                ok
                              </span>
                            ) : (
                              <Button
                                name="_action"
                                value="delete"
                                variant="outline"
                                size="icon">
                                <AiFillCloseCircle className="w-5 h-5  text-red-500" />
                              </Button>
                            )}
                          </Form>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Link
        className="bg-green-400 mt-3 w-1/2 container md:w-1/4 rounded-lg text-center block mb-24 p-2"
        to={"novo"}>
        Novo Treino
      </Link>
    </div>
  );
}
