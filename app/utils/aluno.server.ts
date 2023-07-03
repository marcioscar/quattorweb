// @ts-ignore
import { endOfDay, format, parse } from "date-fns";
import { prisma } from "./prisma.server";
import fetch from "@remix-run/web-fetch";
import ptBR from "date-fns/locale/pt-BR";

const EVO_AUTH = process.env.NEXT_PUBLIC_EVO_AUTH;

export const getAluno = async (matricula: number) => {
  if (!matricula) {
    return null;
  }
  try {
    const aluno = await fetch(
      `https://evo-integracao.w12app.com.br/api/v1/members/${matricula}`,

      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(EVO_AUTH as string),
        },
      }
    );
    // if (aluno.status === 400) {
    //   throw "Aluno não Encontrado";
    // }
    return aluno.json();
  } catch (error) {
    throw error;
  }
};

export const getAlunoNome = async (nome: string) => {
  if (!nome) {
    return null;
  }
  try {
    const aluno = await fetch(
      `https://evo-integracao.w12app.com.br/api/v1/members?name=${nome}&status=1&take=50&skip=0&onlyPersonal=false`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(EVO_AUTH as string),
        },
      }
    );
    // if (aluno.status === 400) {
    //   throw "Aluno não Encontrado";
    // }
    return aluno.json();
  } catch (error) {
    throw error;
  }
};

export const getTreinos = async (semana: number) => {
  return prisma.treinos.findMany({
    where: {
      semana: semana,
    },
  });
};
export const getTreinosSemanal = async (semana: number) => {
  return prisma.treinos.findMany({
    where: {
      AND: [
        { semana: semana },
        {
          grupo: {
            contains: "SEMANA",
          },
        },
      ],
    },
  });
};

export const updateHistorico = async (historico: any) => {
  return prisma.historico.upsert({
    where: {
      aluno: parseInt(historico.aluno),
    },
    update: {
      treinos: {
        push: {
          treino: historico.treino,
          data: new Date(),
        },
      },
    },
    create: {
      aluno: parseInt(historico.aluno),
      treinos: {
        treino: historico.treino,
        data: new Date(),
      },
    },
  });
};

export const updatePlanejamento = async (historico: any) => {
  const treino = historico.treinolivre
    ? historico.treinolivre.toUpperCase()
    : historico.treino.toUpperCase();

  return prisma.historico.upsert({
    where: {
      aluno: parseInt(historico.aluno),
    },
    update: {
      planejados: {
        push: {
          treinoP: treino,
          data: new Date(Date.parse(historico.data)),
          feito: false,
        },
      },
    },
    create: {
      aluno: parseInt(historico.aluno),
      planejados: {
        treinoP: treino,
        data: new Date(Date.parse(historico.data)),
        feito: false,
      },
    },
  });
};

export const TreinoPlanejadoFeito = async (treino: any) => {
  let dataformatada = "";
  treino.data
    ? (dataformatada = format(
        endOfDay(new Date(treino.data)),
        "yyyy-MM-dd'T'03:00:00.000+00:00"
      ))
    : (dataformatada = dataformatada =
        format(endOfDay(new Date()), "yyyy-MM-dd'T'03:00:00.000+00:00"));

  const temtreino = prisma.historico.findMany({
    where: {
      AND: [
        { aluno: parseInt(treino.aluno) },
        {
          planejados: {
            some: { treinoP: treino.treino, data: dataformatada },
          },
        },
      ],
    },
  });
  if ((await temtreino).length !== 0) {
    const tre = prisma.historico.update({
      where: {
        aluno: parseInt(treino.aluno),
      },
      data: {
        planejados: {
          updateMany: {
            where: {
              treinoP: treino.treino,
              data: dataformatada,
            },
            data: { feito: true },
          },
        },
      },
    });

    return tre;
  } else {
    return prisma.historico.upsert({
      where: {
        aluno: parseInt(treino.aluno),
      },
      update: {
        planejados: {
          push: {
            treinoP: treino.treino,
            data: dataformatada,
            feito: true,
          },
        },
      },
      create: {
        aluno: parseInt(treino.aluno),
        planejados: {
          treinoP: treino.treino,
          data: dataformatada,
          feito: true,
        },
      },
    });
  }
};
export const updatePlanejamentoTreino1 = async (historico: any) => {
  const dataformatada = format(
    endOfDay(new Date()),
    "yyyy-MM-dd'T'03:00:00.000+00:00"
  );
  console.log(dataformatada);
  const his = prisma.historico.updateMany({
    where: {
      AND: [
        { aluno: parseInt(historico.aluno) },
        {
          planejados: {
            some: { treinoP: historico.treino, data: dataformatada },
          },
        },
      ],
    },
    data: {
      planejados: {
        set: {
          feito: true,
          treinoP: historico.treino,
          data: dataformatada,
        },
      },
    },
  });

  return his;
};

export const updatePlanejamentoTreino = async (historico: any) => {
  console.log(historico);
  const treino = historico.treinolivre
    ? historico.treinolivre.toUpperCase()
    : historico.treino.toUpperCase();

  return prisma.historico.upsert({
    select: {
      planejados: {
        select: {
          treinoP: treino,
          data: new Date(),
        },
      },
    },

    where: {
      aluno: parseInt(historico.aluno),
    },
    // where: {
    //   aluno_treino: {
    //     aluno: historico.aluno,
    //     planejados: {
    //       treinoP: treino,
    //       data: new Date(),
    //     },
    //   },
    // },

    update: {
      planejados: {
        set: {
          feito: true,
          data: new Date(),
        },
      },
    },
    create: {
      aluno: parseInt(historico.aluno),
      planejados: {
        treinoP: treino,
        data: new Date(),
        feito: true,
      },
    },
  });
};
export const updateFicha = async (ficha: any) => {
  return prisma.historico.upsert({
    where: {
      aluno: parseInt(ficha.aluno),
    },
    update: {
      historico: ficha.historico,
      nivel: ficha.nivel,
      patologias: ficha.patologias,
    },
    create: {
      aluno: parseInt(ficha.aluno),
      historico: ficha.historico,
      nivel: ficha.nivel,
      patologias: ficha.patologias,
    },
  });
};
export const getHistorico = async (historico: any) => {
  if (!historico) {
    return null;
  }

  return prisma.historico.findUnique({
    where: {
      aluno: parseInt(historico),
    },
  });
};

export const deleteTreinoPlanejado = async (treino: any) => {
  return prisma.historico.update({
    where: {
      aluno: parseInt(treino.aluno),
    },
    data: {
      planejados: {
        deleteMany: {
          where: {
            treinoP: treino.treino,
            data: new Date(Date.parse(treino.data)),
          },
        },
      },
    },
  });
};
