import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getGrupos, getHistoricoSemana } from "@/utils/aluno.server";
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getWeek } from "date-fns";
import _ from "lodash";

export const loader: LoaderFunction = async ({ request, params }) => {
  const grupos = await getGrupos();
  const historicoTreinos = await getHistoricoSemana();

  return json({ grupos, historicoTreinos });
};
export default function Especial() {
  const { grupos, historicoTreinos } = useLoaderData();

  function treinosFeitos(aluno: any) {
    const treinos = _.filter(historicoTreinos, { aluno: aluno });
    const treinosFiltered = _.flatten(treinos.map((t) => t.treinos));
    const treinosAluno = _.filter(treinosFiltered, {
      semana: getWeek(new Date()),
    }).length;
    return treinosAluno;
  }

  function somaTreinosGrupo(nome: string) {
    const grupo = _.filter(grupos, { nome: nome });
    const treinos = grupo.map((a) =>
      a.alunos.map((b: any) => treinosFeitos(b.idMember))
    );
    return _.sum(_.flatten(treinos));
  }

  return (
    <>
      <div className=" mt-4 p-2 md:container grid gap-3 grid-cols-1 md:grid-cols-3">
        {grupos.map((g: any, index: any) => (
          <Card key={g.id} className="overflow-hidden shadow-md">
            <CardTitle className=" mb-3 p-2 font-normal items-center place-content-between flex ">
              <div className="flex items-center ">{g.nome}</div>
              <div className="flex gap-2">
                Treinos - {somaTreinosGrupo(g.nome)}{" "}
                <div>
                  <Separator
                    orientation="vertical"
                    className="   border border-stone-300 "
                  />
                </div>{" "}
                {g.alunos.length * 3}
                {/* Membros - {g.alunos.length} / {g.numero} */}
              </div>
            </CardTitle>
            <CardContent className="grid gap-6">
              {g.alunos.map((a: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className=" w-14 h-14">
                      <AvatarImage
                        className="object-cover"
                        src={a.photo}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        <img src="/user.png" alt="avatar" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {a.nome.split(" ")[0]}
                      </p>
                      <p className="text-sm font-extralight text-muted-foreground">
                        {a.nome.substr(a.nome.indexOf(" ") + 1)}
                      </p>
                    </div>
                  </div>
                  <div className="w-12 bg-gray-200  rounded-full">
                    <div
                      className={`${
                        treinosFeitos(a.idMember) >= 3
                          ? "bg-green-400"
                          : treinosFeitos(a.idMember) === 2
                          ? "bg-amber-400"
                          : treinosFeitos(a.idMember) === 0
                          ? "bg-slate-200"
                          : "bg-red-400"
                      }  rounded-full p-0.5 text-center text-xs font-medium leading-none text-primary-100`}
                      style={{
                        width:
                          treinosFeitos(a.idMember) > 3
                            ? "100%"
                            : treinosFeitos(a.idMember) === 0
                            ? "100%"
                            : treinosFeitos(a.idMember) * 33.333 + "%",
                      }}>
                      {treinosFeitos(a.idMember) > 0
                        ? treinosFeitos(a.idMember)
                        : ""}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div className=" mt-4 container grid gap-3 grid-cols-1 md:grid-cols-3">
        {grupos.map((g: any, index: any) => (
          <Card className="overflow-hidden shadow-md" key={index}>
            <CardHeader>
              <CardTitle className=" mb-3 font-normal items-center place-content-between flex ">
                <div className="flex items-center ">{g.nome}</div>
                <div className="flex gap-2">
                  Treinos - {somaTreinosGrupo(g.nome)}{" "}
                  <div>
                    <Separator
                      orientation="vertical"
                      className="   border border-stone-300 "
                    />
                  </div>{" "}
                  {g.alunos.length * 3}
                  
                </div>
              </CardTitle>
              <div
                className="grid grid-cols-3 gap-2 place-items-center  gap-y-4"
                key={index}>
                {g.alunos.map((a: any, index: any) => (
                  <div
                    className="relative flex  flex-col items-center	 "
                    key={index}>
                    <Avatar className=" w-14 h-14">
                      <AvatarImage
                        className="object-cover"
                        src={a.photo}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        <img src="/user.png" alt="avatar" />
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute -top-2 -right-2 inline-flex items-center  border-2 border-white justify-center w-6 h-6 text-xs font-bold ${
                        treinosFeitos(a.idMember) >= 3
                          ? "bg-green-500"
                          : treinosFeitos(a.idMember) === 2
                          ? "bg-amber-400"
                          : "bg-red-500"
                      }  rounded-full`}>
                      <div className="text-center -mt-0.5 text-white font-semibold ">
                        {treinosFeitos(a.idMember)}
                      </div>
                    </span>

                    <div className=" font-light text-sm text-stone-400">
                      {a.nome.split(" ")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div> */}
    </>
  );
}
