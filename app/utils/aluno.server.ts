import { parse } from "date-fns";
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
  console.log(Date.parse(historico.data));

  console.log(new Date(Date.parse(historico.data)));

  return prisma.historico.upsert({
    where: {
      aluno: parseInt(historico.aluno),
    },
    update: {
      planejados: {
        push: {
          treinoP: historico.treino,
          data: new Date(Date.parse(historico.data)),
        },
      },
    },
    create: {
      aluno: parseInt(historico.aluno),
      planejados: {
        treinoP: historico.treino,
        data: new Date(Date.parse(historico.data)),
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
  console.log(historico);

  return prisma.historico.findUnique({
    where: {
      aluno: parseInt(historico),
    },
  });
};
