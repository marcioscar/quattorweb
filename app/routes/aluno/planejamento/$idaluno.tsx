import { getAluno, getHistorico, updateFicha } from "@/utils/aluno.server";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect, type LoaderFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import _ from "lodash";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

export const loader: LoaderFunction = async ({ request, params }) => {
  const aluno = await getAluno(Number(params.idaluno));
  const historico = await getHistorico(Number(params.idaluno));

  return json({ aluno, historico });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let values = Object.fromEntries(form);
  await updateFicha(values);
  return redirect(`.`);
};

export default function Idaluno() {
  const { aluno, historico } = useLoaderData();

  const PlaneTreino = _.mapValues(
    _.orderBy(historico.planejados, ["data", "asc"]),
    function (o) {
      const data = format(new Date(o.data), "EEEEEE - dd/MM", {
        locale: ptBR,
      });
      return { treino: o.treinoP, data };
    }
  );

  const grupotreino = _.map(_.groupBy(PlaneTreino, "data"), (data, idx) => {
    return { data: idx, treino: data };
  });

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
              <input
                className="font-medium text-right text-green-600 border-b p-2"
                type="text"
                name="nivel"
                defaultValue={historico?.nivel}
                placeholder="Nível"
              />
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
            <Button variant="secondary" className="bg-stone-300  text-black">
              Salvar
            </Button>
          </CardContent>
        </Card>
        <div className="">
          <div className="">
            {ultimos && (
              <>
                <h2 className="  text-stone-600 rounded-md font-semibold  text-center text-lg mt-4">
                  Treinos Planejados
                </h2>
                <div className="text-stone-500 place-content-center  container mx-auto grid grid-cols-2 md:gap-2 md:grid-cols-4 lg:grid-cols-5 lg:container-lg">
                  {ultimos.map((u: any, index) => (
                    <div key={index} className="">
                      <div className="mt-1 mb-4  py-2 px-2 rounded-md my-4 text-center">
                        <div>{u.data}</div>
                        <div className="font-semibold text-blue-600 text-center">
                          {u.treino.map((t: any, index: any) => (
                            <div key={index}>{t.treino}</div>
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
      </Form>
      <div className=" container text-center">
        <Link className="bg-stone-300 rounded-lg px-6 p-2 " to={"novo"}>
          Novo Treino
        </Link>
      </div>
    </div>
  );
}
