import type {
  LoaderArgs,
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import { getAluno } from "~/utils/aluno.server";
import _ from "lodash";
import { ImEnter } from "react-icons/im";
import { commitSession, getSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const motivo = session.get("aluno")?.motivo;
  const url = session.get("aluno")?.red;

  if (motivo) {
    return motivo;
  }
  if (url) {
    return url;
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const matricula = form.get("matricula");
  const redi = form.get("redirectTo") || "..";

  // @ts-ignore
  const aluno = await getAluno(matricula);

  const plano = _.filter(aluno.memberships, { membershipStatus: "active" }).map(
    (n) => n.name
  );

  // const spinning = plano.filter(
  //   (s) =>
  //     s.includes("FITNESS") || s.includes("SPINNING") || s.includes("TOTAL")
  // ).length;

  // if (aluno.idMember) {
  //   return aluno;
  // }
  if (!aluno.idMember) {
    return {
      message: "Aluno não encontrado",
    };
  }
  if (aluno.membershipStatus === "Inactive") {
    return {
      message: "Seu plano está Inativo Favor procurar recepção",
    };
  }

  // if (spinning === 0) {
  //   return {
  //     message: "Plano do Aluno não inclui Spinning",
  //   };
  // }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("aluno", {
    id: aluno.idMember,
    plano: plano,
    status: aluno.membershipStatus,
  });

  return redirect(redi as string, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Index() {
  const transition = useTransition();
  const data = useActionData();
  const motivo = useLoaderData();

  return (
    <div className="h-screen w-full bg-stone-100 font-Roboto ">
      <div className="bg-stone-400">
        <div className="text-gray-600 body-font  min-h-screen ">
          <div className="h-full  pt-20 items-center flex flex-col gap-y-4">
            <Form
              method="post"
              className="rounded-2xl bg-white bg-opacity-80  p-6 md:w-1/2 lg:w1/4 w-10/12">
              <input
                type="hidden"
                value={motivo ? motivo : ""}
                name="redirectTo"
              />

              <label htmlFor="matricula" className=" font-semibold mb-9 ">
                Número de Matricula
              </label>
              <div className="relative  my-4 flex w-full flex-wrap items-stretch mb-3">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded-xl text-base items-center justify-center w-8 pl-3 py-3">
                  <ImEnter />
                </span>
                <input
                  type="number"
                  name="matricula"
                  required
                  autoFocus
                  placeholder="Pegue seu número na recepção"
                  className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded-xl text-sm border shadow outline-none border-slate-200 focus:outline-none focus:ring w-full pl-10"
                />
              </div>

              <div className="w-full text-center">
                <button
                  disabled={
                    transition.state === "submitting" ||
                    transition.state === "loading"
                  }
                  type="submit"
                  name="Entrar"
                  className={
                    "" + transition.state === "loading"
                      ? "rounded-xl mt-2  bg-blue-600 px-3 py-2 text-white font-semibold"
                      : "rounded-xl mt-2  bg-green-400 px-3 py-2  font-semibold hover:bg-orange-400 hover:-translate-y-1"
                  }>
                  {transition.state === "submitting"
                    ? "Localizando..."
                    : transition.state === "loading"
                    ? "Carregando Aulas"
                    : "Entrar"}
                </button>
              </div>
            </Form>

            {motivo?.motivo && (
              <p className="  text-center text-md text-white font-medium px-4 py-3 bg-red-600 rounded-lg">
                {motivo ? motivo : ""}
              </p>
            )}

            {data && (
              <p className="  text-center text-md text-white font-medium px-4 py-3 bg-red-600 rounded-lg">
                {data.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
