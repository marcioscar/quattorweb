import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Navbar } from "~/components/Navbar";
import { getTreinos } from "~/utils/treinos.server";
import { getWeek } from "date-fns";
import { useFetcher, useLoaderData, Outlet, Link } from "@remix-run/react";
import { FaListAlt, FaTasks } from "react-icons/fa";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const par = url.searchParams.get("semana_query");
  const parametro = par ? parseInt(par) : getWeek(new Date());
  // const treinos = await getTreinos(getWeek(new Date()));
  const treinos = await getTreinos(parametro);

  return json({ treinos });
};

export default function Treino() {
  const semana = useFetcher();
  const { treinos } = useLoaderData();
  const treinoSemana = semana.data?.treinos ? semana.data.treinos : treinos;
  return (
    <div className="w-full bg-stone-100 font-Roboto ">
      <Navbar />

      <div className="flex items-center flex-col space-x-4">
        <h2 className="text-2xl font-extrabold text-slate-700">
          Lista de Treinos
        </h2>

        <semana.Form method="get" action=".">
          <select
            name="semana_query"
            onChange={(event) => semana.submit(event.target.form)}
            className="rounded-md border-2 form-control block">
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
            <option value="10">11 - (12/03 a 18/03)</option>
            <option value="10">10 - (19/03 a 25/03)</option>
            <option value="10">10 - (26/03 a 01/04)</option>
            <option value="10">10 - (02/04 a 08/04)</option>
            <option value="10">10 - (09/04 a 15/04)</option>
            <option value="10">10 - (16/04 a 22/04)</option>
            <option value="10">10 - (23/04 a 29/04)</option>
            <option value="10">10 - (30/04 a 06/05)</option>
            <option value="10">10 - (30/04 a 06/05)</option>
            <option value="10">10 - (07/05 a 13/05)</option>
            <option value="10">10 - (14/05 a 20/05)</option>
            <option value="10">10 - (21/05 a 27/05)</option>
            <option value="10">10 - (28/05 a 03/06)</option>
            <option value="10">10 - (04/06 a 10/06)</option>
            <option value="10">10 - (11/06 a 17/06)</option>
            <option value="10">10 - (18/06 a 24/06)</option>
            <option value="10">10 - (25/06 a 01/07)</option>
            <option value="10">10 - (02/07 a 08/07)</option>
            <option value="10">10 - (09/07 a 15/07)</option>
            <option value="10">10 - (16/07 a 22/07)</option>
            <option value="10">10 - (23/07 a 29/07)</option>
            <option value="10">10 - (30/07 a 05/08)</option>
          </select>
        </semana.Form>
      </div>
      <div className="container mx-auto content-center  py-6 px-2 md:px-0 md:grid md:gap-x-6  md:gap-y-4 md:grid-cols-3">
        <div className="overflow-x-auto relative">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs  text-gray-700 uppercase bg-stone-100 dark:bg-gray-700 dark:text-gray-400">
              <tr className="rounded-lg">
                <th scope="col" className=" ">
                  Grupo
                </th>
                <th scope="col" className="text-center ">
                  Semana
                </th>

                {/* <th className="text-right px-2 text-green-600 text-lg ">
                  <FaTasks />
                </th> */}
              </tr>
            </thead>
            <tbody>
              {treinoSemana.map((treino: any) => (
                <tr key={treino.id} className=" dark:bg-gray-800">
                  <th className="py-1 flex gap-x-2 items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {treino.grupo}
                  </th>
                  <td className=" text-center">{treino.semana}</td>
                  <td className="  ">
                    <Link to={`${treino.id}`} className="text-sky-600 text-lg ">
                      {/* Exercícios */}
                      <FaListAlt />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-2">
          <h2 className=" font-semibold text-center text-slate-700">
            Lista de Exercícios
          </h2>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
