import { Navbar } from "~/components/Navbar";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { Form, performMutation } from "remix-forms";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { updateTreino } from "~/utils/treinos.server";
import { Outlet, useTransition } from "@remix-run/react";
import { useEffect } from "react";

const schema = z.object({
  grupo: z
    .string()
    .min(4, { message: "Descrição do grupo com no mínimo 4 caracteres" }),
  semana: z.number().min(1, { message: "Informe o número da Semana" }),
  nome: z.string().min(1, { message: "Informe o nome do exercício" }),
  repeticoes: z.string().min(1, { message: "Repetições do exercício" }),
  carga: z.string().min(1, { message: "Informe as cargas do exercício " }),
  obs: z.string(),
  video: z.string(),
});
const mutation = makeDomainFunction(schema)(async (values) => {
  const treinos = await updateTreino(values);

  return treinos;
});

// export const action: ActionFunction = async ({ request }) =>
//   formAction({
//     request,
//     schema,
//     mutation,
//     successPath: `/cadastro/`,
//   });
export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({ request, schema, mutation });
  if (!result.success) return json(result, 400);

  // return json({ customName: result.data.id });

  return redirect(`/cadastro/${result.data.id}`);
};

export default function Cadastro() {
  let transition = useTransition();

  let adicionando = transition.state === "submitting";
  useEffect(() => {
    if (!adicionando) {
      console.log("limpando");
    }
  }, [adicionando]);

  return (
    <div className="w-full bg-stone-100 font-Roboto ">
      <Navbar />
      <div className="h-full mt-6 items-center flex flex-col gap-y-4">
        <h2 className="text-2xl font-extrabold text-slate-700">
          Cadastro de Exercício
        </h2>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-3/4 ">
          <Form schema={schema}>
            {({ Field, Errors, Button, register }) => (
              <div className="grid grid-cols-2 gap-4">
                <Field name="grupo" label="Grupo">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label
                          htmlFor="grupo"
                          className="form-label font-light inline-block  text-gray-400">
                          Grupo
                        </Label>

                        <select
                          // type="email"
                          {...register("grupo")}
                          className="rounded-md border-2 form-control block
                          w-full ">
                          <option value="PEITORAL">PEITORAL</option>
                          <option value="OMBROS">OMBROS</option>
                          <option value="MEMBROS SUPERIORES 1">
                            MEMBROS SUPERIORES 1
                          </option>
                          <option value="COSTAS">COSTAS</option>
                          <option value="MEMBROS SUPERIORES 2">
                            MEMBROS SUPERIORES 2
                          </option>
                          <option value="BICEPS">BICEPS</option>
                          <option value="TRICEPS">TRICEPS</option>
                          <option value="QUADS">QUADS</option>
                          <option value="POSTERIORES DE COXAS">
                            POSTERIORES DE COXAS
                          </option>
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
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="semana" label="Semana">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <select
                          // type="number"
                          {...register("semana")}
                          className="rounded-md border-2 form-control block
                          w-full ">
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
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="nome" label="Exercicio">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("nome")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="repeticoes" label="Repetições">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("repeticoes")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="carga" label="Carga">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("carga")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="obs" label="Observação">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group ">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <input
                          type="text"
                          {...register("obs")}
                          className="rounded-md border-2 form-control block
                          w-full "
                        />
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Field name="video" label="Video">
                  {({ Label, Errors }) => (
                    <>
                      <div className="form-group">
                        <Label className="form-label font-light inline-block  text-gray-400" />
                        <select
                          // type="number"
                          {...register("video")}
                          className="rounded-md border-2 form-control block
                          w-full ">
                          <option value="">Selecione a máquina</option>
                          <option value="abd_declinado.gif">
                            Abdominal Declinado
                          </option>
                          <option value="abd_maquina.gif">
                            Abdominal Máquina
                          </option>
                          <option value="agachamento.gif">Agachamento</option>
                          <option value="apoio.gif">Apoio</option>
                          <option value="apoio_pe_banco.gif">
                            Apoio Pé no banco
                          </option>
                          <option value="barra_graviton.gif">
                            Barra no Graviton
                          </option>
                          <option value="cadeira_extensora.gif">
                            Cadeira Extensora
                          </option>
                          <option value="crucifixo_reto_alteres.gif">
                            Crucifixo reto com halteres
                          </option>
                          <option value="desenvolvimento_militar_sentado.gif">
                            Crucifixo Cross Over
                          </option>
                          <option value="crucifixo_halteres.gif">
                            Crucifixo com Halteres
                          </option>
                          <option value="crucifixo_invertido_maquina.gif">
                            Crucifixo Invertido Máquina
                          </option>
                          <option value="crucifixo_cross_over.gif">
                            Desenvolvimento Militar Sentado
                          </option>
                          <option value="desenvolvimento_halteres.gif">
                            Desenvolvimento com Halteres
                          </option>
                          <option value="desenvolvimento_maquina.gif">
                            Desenvolvimento Máquina
                          </option>
                          <option value="elevacao_lateral_curvado.gif">
                            Elevação Lateral Curvado
                          </option>
                          <option value="elevacao_frontal_alternado_sentado.gif">
                            Elevação Frontal Alternado Sentado
                          </option>
                          <option value="elevacao_lateral.gif">
                            Elevação Lateral
                          </option>
                          <option value="flying_reto_alternado.gif">
                            Flying Reto Alternado
                          </option>
                          <option value="levantamento_terra.gif">
                            Levantamento Terra
                          </option>
                          <option value="leg_45.gif">Leg 45º</option>
                          <option value="leg_horizontal.gif">
                            Leg Horizontal
                          </option>
                          <option value="martelo_alternado.gif">
                            Martelo Alternado
                          </option>
                          <option value="paralela_maquina.gif">
                            Paralela Máquina
                          </option>
                          <option value="pulldown_articulado.gif">
                            Pull Down Articulado
                          </option>
                          <option value="pulldown_barra.gif">
                            Pull Down com Barra
                          </option>
                          <option value="puxador_frente.gif">
                            Puxador Frente
                          </option>
                          <option value="remada_alta_barra.gif">
                            Remada Alta com Barra{" "}
                          </option>
                          <option value="remada_sentada_triangulo.gif">
                            Remada Sentada com Triangulo
                          </option>
                          <option value="rosca_direta_w.gif">
                            Rosca Direta Barra 'W'
                          </option>
                          <option value="rosca_testa_halteres.gif">
                            Rosca Testa Halteres
                          </option>

                          <option value="rosca_francesa_halteres.gif">
                            Rosca Francesa Halteres
                          </option>
                          <option value="rosca_testa_barra.gif">
                            Rosca Testa com Barra
                          </option>

                          <option value="supino_maquina.gif">
                            Supino Máquina
                          </option>
                          <option value="supino_inclinado.gif">
                            Supino Inclinado
                          </option>
                          <option value="supino_reto.gif">Supino Reto</option>
                          <option value="triceps_pulley_barra.gif">
                            Triceps Pulley com Barra
                          </option>
                          <option value="triceps_pulley_corda.gif">
                            Triceps Pulley com Corda
                          </option>
                          <option value="triceps_pulley_unilateral.gif">
                            Triceps Pulley Unilateral
                          </option>
                        </select>
                        <Errors className="text-red-500" />
                      </div>
                    </>
                  )}
                </Field>
                <Errors />

                <Button
                  type="submit"
                  className="rounded-xl w-32 bg-green-600 px-3 py-2 text-white font-semibold hover:bg-green-800">
                  {transition.state === "submitting"
                    ? "Cadastrando..."
                    : "Cadastrar"}
                </Button>
                {/* <Button
                  type="submit"
                  className="rounded-xl w-32 bg-blue-600  px-3 py-2 text-white font-semibold hover:bg-blue-800"
                >
                  Pesquisar
                </Button> */}
              </div>
            )}
          </Form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
