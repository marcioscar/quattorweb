import { prisma } from "./prisma.server";
import { v4 as uuidv4 } from "uuid";
export const getExercicios = async (id: any) => {
  return prisma.treinos.findUnique({
    where: {
      id,
    },
  });
};
export const getTreinos = async (semana: any) => {
  return prisma.treinos.findMany({
    where: {
      semana: semana,
    },
  });
};

export const deleteExercicio = async (id: any, execid: any) => {
  return prisma.treinos.update({
    where: {
      id: id,
    },
    data: {
      exercicios: {
        deleteMany: {
          where: {
            execid: execid,
          },
        },
      },
    },
  });
};

export const updateCadastroTreino = async (
  id: any,
  nome: any,
  repeticoes: any,
  carga: any,
  obs: any,
  execid: any,
  video: any
) => {
  return prisma.treinos.update({
    where: {
      id: id,
    },
    data: {
      exercicios: {
        updateMany: {
          where: {
            execid: execid,
          },
          data: {
            nome: nome,
            carga: carga,
            obs: obs,
            Repeticoes: repeticoes,
            video: video,
          },
        },
      },
    },
  });
};

export const updateTreino = async (treino: any) => {
  const existe = await prisma.treinos.findFirst({
    where: {
      grupo: treino.grupo,
      semana: +treino.semana,
    },
    select: {
      id: true,
    },
  });
  const idTreino = existe
    ? Object.values(existe).toString()
    : "000000000000000000000000";

  return prisma.treinos.upsert({
    where: {
      id: idTreino,
    },
    update: {
      exercicios: {
        push: {
          nome: treino.nome,
          Repeticoes: treino.repeticoes,
          carga: treino.carga,
          obs: treino.obs,
          video: treino.video,
          execid: uuidv4(),
        },
      },
    },
    create: {
      grupo: treino.grupo,
      semana: +treino.semana,
      exercicios: {
        nome: treino.nome,
        Repeticoes: treino.repeticoes,
        carga: treino.carga,
        obs: treino.obs,
        video: treino.video,
        execid: uuidv4(),
      },
    },
  });
};

export const treinos = {
  grupos: [
    {
      value: "PANTURRILHA",
      label: "Panturrilha",
    },
  ],
};
