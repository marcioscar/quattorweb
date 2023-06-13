import { prisma } from "./prisma.server";
import fetch from "@remix-run/web-fetch";

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

export const getHistorico = async (historico: any) => {
  // if (!historico) {
  //   return null;
  // }

  return prisma.historico.findUnique({
    where: {
      aluno: parseInt(historico),
    },
  });
};
