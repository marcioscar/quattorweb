import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getExercicios } from "~/utils/treinos.server";
export const loader: LoaderFunction = async ({ request, params }) => {
  const exercicio = await getExercicios(params.exe);
  return exercicio;
};

export default function Treino() {
  const { exercicios } = useLoaderData<typeof loader>();
  const grupo = useLoaderData<typeof loader>();

  return (
    <>
      <div className="w-full container text-center mx-auto bg-white  rounded-sm border border-gray-500">
        <header className="px-5 py-4 border-b border-gray-500">
          <div className=" flex place-content-between items-center font-extrabold text-3xl print:text-xl">
            <img src="/logo_alto.svg" className=" w-32" alt="logo" />
            {grupo.grupo}
            {/* <img src="/logo_preto.svg" className="w-[108px] " alt="logo" /> */}
            <img className=" w-20 " alt="qr" src="/qr1.svg" />
          </div>
        </header>
        <table className="table-auto w-full text-left">
          <tbody className="text-sm divide-y divide-gray-500">
            {exercicios.map((exec: any, index: any) => (
              <tr key={exec.execid}>
                <td>
                  <div className=" font-extrabold text-2xl">
                    {index + 1} - {exec.nome}
                  </div>
                  <div className="pl-8 space-y-1">
                    {/* <div className="items-center flex">
                      <GiWeightLiftingUp className=" h-4 w-4 text-gray-400 mr-3" />
                      {exec.carga}
                    </div> */}
                    <div className="items-center flex">
                      <img
                        src="/ponto.svg"
                        alt="bolas"
                        className="w-2.5  mr-3"
                      />
                      {exec.carga}
                    </div>
                    <div className="items-center flex">
                      {/* <ImSortNumbericDesc className=" h-4 w-4 text-gray-400 mr-3" /> */}
                      <img
                        src="/ponto.svg"
                        alt="bolas"
                        className="w-2.5 mr-3 "
                      />
                      {exec.Repeticoes}
                    </div>
                    <div className="items-center flex ">
                      {/* <GiNotebook className="h-4 w-4 text-gray-400 mr-3" /> */}
                      <img
                        src="/ponto.svg"
                        alt="bolas"
                        className="w-2.5 mr-3 "
                      />
                      {exec.obs}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <footer>
        <img
          className=" h-[100px] pt-1 mx-auto items-center"
          alt="footer"
          src="/link_jpg.jpg"
        />
      </footer> */}
    </>
  );
}
