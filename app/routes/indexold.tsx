import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";
import { getAluno } from "../utils/aluno.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const matricula = form.get("matricula");
  console.log(matricula);
  // @ts-ignore
  const aluno = await getAluno(matricula);

  if (!aluno.firstName) {
    console.log("nao existe nome");
    return redirect("/");
  }
  if (aluno.membershipStatus === "Inactive") {
    console.log("Aluno inativo");
    return redirect("/");
  }
  return redirect(`/aluno/${aluno.idMember}`);
};

export default function Index() {
  const transition = useTransition();
  return (
    <div className="h-screen w-full bg-stone-100 font-Roboto ">
      <Navbar />
      <div className="h-full mt-24 items-center flex flex-col gap-y-4">
        <Form method="post" className="rounded-2xl bg-stone-200 p-6 w-96">
          <label htmlFor="matricula" className="text-stone-600 font-semibold ">
            Número de Matricula
          </label>
          <input
            className="w-full p-2 rounded-xl my-2"
            type="number"
            name="matricula"
            required
          />
          <div className="w-full text-center">
            <button
              type="submit"
              name="Entrar"
              className="rounded-xl mt-2 bg-green-600 px-3 py-2 text-white 
              font-semibold hover:bg-orange-400 
               hover:-translate-y-1"
            >
              {transition.state === "submitting" ? "Localizando..." : "Entrar"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
