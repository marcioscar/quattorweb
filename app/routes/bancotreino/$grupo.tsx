import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { getExercicios, updateTreino } from "~/utils/treinos.server";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
export const loader: LoaderFunction = async ({ request, params }) => {
  const exercicio = await getExercicios(params.grupo);
  return exercicio;
};
export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  let values = Object.fromEntries(form);

  // await updateCadastroTreino(id, nome, repeticoes, carga, obs, execid, video);
  const treinos = await updateTreino(values);
  // return treinos;

  return redirect(`${treinos.id}`);
};

export default function Grupocadastrado() {
  const { exercicios } = useLoaderData();

  const [semana, setSemana] = useState("");
  const [grupo, setGrupo] = useState("");
  return (
    <>
      <div className="flex">
        <select
          onChange={(event) => setSemana(event.target.value)}
          id="semana"
          name="semana"
          className="rounded-md col-span-2 border-2 form-control block
                          w-full ">
          <option value="">Selecione a semana</option>
          <option value="01">01 - (01/01 a 07/01)</option>
          <option value="02">02 - (08/01 a 14/01)</option>
          <option value="03">03 - (15/01 a 21/01)</option>
          <option value="04">04 - (22/01 a 28/01)</option>
          <option value="05">05 - (29/01 a 04/02)</option>
          <option value="06">06 - (05/02 a 11/02)</option>
          <option value="07">07 - (12/02 a 18/02)</option>
          <option value="08">08 - (19/02 a 25/02)</option>
          <option value="09">09 - (26/02 a 04/03)</option>
          <option value="10">10 - (05/02 a 11/03)</option>
          <option value="11">11 - (12/03 a 18/03)</option>
          <option value="12">12 - (19/03 a 25/03)</option>
          <option value="13">13 - (26/03 a 01/04)</option>
          <option value="14">14 - (02/04 a 08/04)</option>
          <option value="15">15 - (09/04 a 15/04)</option>
          <option value="16">16 - (16/04 a 22/04)</option>
          <option value="17">17 - (23/04 a 29/04)</option>
          <option value="18">18 - (30/04 a 06/05)</option>
          <option value="19">19 - (30/04 a 06/05)</option>
          <option value="20">20 - (07/05 a 13/05)</option>
          <option value="21">21 - (14/05 a 20/05)</option>
          <option value="22">22 - (21/05 a 27/05)</option>
          <option value="23">23 - (28/05 a 03/06)</option>
          <option value="24">24 - (04/06 a 10/06)</option>
          <option value="25">25 - (11/06 a 17/06)</option>
          <option value="26">26 - (18/06 a 24/06)</option>
          <option value="27">27 - (25/06 a 01/07)</option>
          <option value="28">28 - (02/07 a 08/07)</option>
          <option value="29">29 - (09/07 a 15/07)</option>
          <option value="30">30 - (16/07 a 22/07)</option>
          <option value="31">31 - (23/07 a 29/07)</option>
          <option value="32">32 - (30/07 a 05/08)</option>
        </select>
        <select
          onChange={(event) => setGrupo(event.target.value)}
          id="grupo"
          name="grupo"
          className="rounded-md border-2 form-control block
                          w-full col-span-2 bg-transparent  ">
          <option value="">Selecione o grupo</option>
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
          <option value="2X SEMANA - TREINO A">2X SEMANA - TREINO A</option>
          <option value="2X SEMANA - TREINO B">2X SEMANA - TREINO B</option>
          <option value="3X SEMANA - TREINO A">3X SEMANA - TREINO A</option>
          <option value="3X SEMANA - TREINO B">3X SEMANA - TREINO B</option>
          <option value="3X SEMANA - TREINO C">3X SEMANA - TREINO C</option>
        </select>
      </div>
      <ul>
        <div className="grid grid-cols-12 py-2 gap-2">
          <div className="col-span-3 font-light text-sm text-sky-500">
            Número
          </div>
          <div className="col-span-8 font-light text-sm text-sky-500">Nome</div>
        </div>
        {exercicios.map((exec: any, index: any) => (
          <li key={index} className="py-1  ">
            <Form method="post">
              <input
                type="text"
                defaultValue={semana}
                hidden
                name="semana"
                id="semana"
              />
              <input
                type="text"
                defaultValue={grupo}
                hidden
                name="grupo"
                id="grupo"
              />
              <div className="grid grid-cols-12  gap-2">
                <input
                  className="col-span-2 bg-transparent"
                  type="text"
                  id="index"
                  readOnly
                  disabled
                  defaultValue={index + 1}
                />
                <input
                  hidden
                  type="text"
                  id="execid"
                  name="execid"
                  defaultValue={exec.execid}
                />

                <input
                  type="text"
                  id="nome"
                  name="nome"
                  readOnly
                  defaultValue={exec.nome}
                  className="col-span-5 bg-transparent  "
                />

                <input
                  type="text"
                  id="carga"
                  name="carga"
                  hidden
                  defaultValue={exec.carga}
                  className="col-span-2 bg-stone-50 border-b-2 "
                />

                <input
                  type="text"
                  id="repeticoes"
                  name="repeticoes"
                  hidden
                  defaultValue={exec.Repeticoes}
                  className="col-span-2 bg-stone-50 border-b-2"
                />

                <input
                  type="text"
                  id="obs"
                  name="obs"
                  hidden
                  defaultValue={exec.obs}
                  className="col-span-3 text-sm bg-stone-50 border-b-2"
                />
                <input
                  type="text"
                  id="video"
                  name="video"
                  hidden
                  defaultValue={exec.video}
                  className="col-span-3 text-sm bg-stone-50 border-b-2"
                />

                <div className="grid justify-items-center grid-cols-1 gap2">
                  <button
                    className="flex content-center text-green-500 bg-stone-100 "
                    type="submit"
                    name="_action"
                    value="save">
                    <FaSave />
                  </button>
                </div>
              </div>
            </Form>
          </li>
        ))}
      </ul>

      <div className="text-center  font-semibold text-red-600 mt-6">
        {grupo + "  "} {semana}
      </div>
      <Outlet />
    </>
  );
}
