"use client";

import React from "react";
import H3 from "./H3";
import PrimaryButton from "./PrimaryButton";
import Separator from "./Separator";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { Progress } from "@nextui-org/progress";
import { IMatricula } from "@/app/(backend)/interfaces/objects/IMatricula";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { countAulas } from "@/app/lib/functions/countAulas";
import { createMatricula } from "@/app/lib/actions/matricula/createMatricula";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { isAdminOrSuper } from "@/app/lib/functions/isAdminOrSuper";
import { isMatriculadoOrMatriculaNotExpired } from "@/app/lib/functions/isMatriculadoOrMatriculaNotExpired.ts";
import { countAulasAssistidas } from "@/app/lib/functions/countAulasAssistidas";
import { calcDuracaoCurso } from "@/app/lib/functions/calcDuracaoCurso";
import { countMateriaisComplementaresCurso } from "@/app/lib/functions/countMateriaisComplementaresCurso";

type ContentOverviewProps = {
  curso: ICurso;
  userLogged: IUser;
};

export default function ContentOverview({
  curso,
  userLogged,
}: ContentOverviewProps) {
  const { toast } = useToast();
  const router = useRouter();

  function handleMatricular() {
    if (curso.preco == 0 && !isAdminOrSuper(userLogged)) {
      createMatricula({ cursoId: curso.id, userId: userLogged.id })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Matrícula criada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <>
      {isAdminOrSuper(userLogged) ? (
        <div
          className="flex flex-col rounded-t-3xl rounded-b-xl pb-8 dark:bg-gray-900"
          style={{
            border: "0.5px solid rgba(0, 0, 0, 0.26)",
          }}
        >
          <div className="w-full h-16 bg-[#2561AD;] flex items-center justify-center text-white rounded-t-3xl">
            Acesso Mensal
          </div>
          <div className="flex-1 px-8 mt-4">
            <div>
              <p className="font-medium">Curso</p>
              <H3 className="text-2xl">{curso.titulo}</H3>
              <div className="flex flex-col gap-y-2 mt-6">
                <p>
                  <span className="font-semibold">{countAulas(curso)}</span>{" "}
                  {countAulas(curso) > 1 || countAulas(curso) == 0
                    ? "Aulas"
                    : "Aula"}
                </p>
                <p>
                  <span className="font-semibold">{curso.modulos.length}</span>{" "}
                  {curso.modulos.length > 1 || curso.modulos.length == 0
                    ? "Módulos"
                    : "Módulo"}
                </p>
                {/* <p>8 horas e 15 minutos de conteúdo</p> */}
                <p>
                  <span className="font-semibold">
                    {countMateriaisComplementaresCurso(curso)}
                  </span>{" "}
                  {countMateriaisComplementaresCurso(curso) > 1 ||
                  countMateriaisComplementaresCurso(curso) == 0
                    ? "Materiais Complementares"
                    : "Material Complementar"}
                </p>
                <p className="font-semibold">
                  + de{" "}
                  {calcDuracaoCurso(curso) >= 3600 &&
                    `${Math.floor(calcDuracaoCurso(curso) / 3600)} ${
                      Math.floor(calcDuracaoCurso(curso) / 3600) == 0 ||
                      Math.floor(calcDuracaoCurso(curso) / 3600) > 1
                        ? "horas "
                        : "hora"
                    } `}
                  {calcDuracaoCurso(curso) >= 60 &&
                    `${Math.floor(calcDuracaoCurso(curso) / 60)} ${
                      Math.floor(calcDuracaoCurso(curso) / 60) == 0 ||
                      Math.floor(calcDuracaoCurso(curso) / 60) > 1
                        ? "minutos"
                        : "minuto"
                    } `}
                  {calcDuracaoCurso(curso) < 60 &&
                    `${Math.floor(calcDuracaoCurso(curso))} ${
                      Math.floor(calcDuracaoCurso(curso)) == 0 ||
                      Math.floor(calcDuracaoCurso(curso)) > 1
                        ? "segundos"
                        : "segundo"
                    } `}
                  de Conteúdo
                </p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-end">
                <H3 className={`text-2xl font-bold text-[#2363AF] my-4`}>
                  {new Intl.NumberFormat("ao", {
                    style: "currency",
                    currency: "AOA",
                  }).format(curso.preco)}
                </H3>
              </div>
              <PrimaryButton className="w-full py-5">
                Assinar Agora
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : isMatriculadoOrMatriculaNotExpired(curso, userLogged) ? (
        <div
          className="flex flex-col rounded-t-3xl rounded-b-xl pb-8 dark:bg-gray-900"
          style={{
            border: "0.5px solid rgba(0, 0, 0, 0.26)",
          }}
        >
          <div className="flex-1 px-8 pt-12 mt-4">
            <div>
              <p className="font-medium">Curso</p>
              <H3 className="text-2xl">{curso.titulo}</H3>
              <Progress
                className="mt-4 w-full"
                classNames={{
                  indicator: "bg-myblue",
                }}
                maxValue={countAulas(curso)}
                label={`${countAulasAssistidas(
                  curso,
                  userLogged
                )}/${countAulas(curso)}`}
                radius="sm"
                size="sm"
                value={countAulasAssistidas(curso, userLogged)}
              />
              <div className="flex flex-col gap-y-2 mt-6">
                <p>
                  <span className="font-semibold">Matriculado desde: </span>
                  {new Date(
                    curso.matriculas.filter((matricula: IMatricula) => {
                      return matricula.userId == userLogged.id;
                    })[0].updatedAt
                  ).toLocaleDateString()}
                </p>
                {curso.matriculas.filter((matricula: IMatricula) => {
                  return matricula.userId == userLogged.id;
                })[0].dataExpiracao && (
                  <p>
                    <span className="font-semibold">Prazo:</span>{" "}
                    {new Date(
                      curso.matriculas.filter((matricula: IMatricula) => {
                        return matricula.userId == userLogged.id;
                      })[0].dataExpiracao
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
              <PrimaryButton
                className="w-full py-5 mt-8"
                onClick={() => {
                  if (countAulas(curso) > 0) {
                    router.push(
                      `/plataforma/conteudos/aula/${curso.modulos[0].videoAulas[0].id}`
                    );
                  }
                }}
              >
                Continuar as Aulas
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col rounded-t-3xl rounded-b-xl pb-8 dark:bg-gray-900"
          style={{
            border: "0.5px solid rgba(0, 0, 0, 0.26)",
          }}
        >
          <div className="w-full h-16 bg-[#2561AD;] flex items-center justify-center text-white rounded-t-3xl">
            Acesso Mensal
          </div>
          <div className="flex-1 px-8 mt-4">
            <div>
              <p className="font-medium">Curso</p>
              <H3 className="text-2xl">{curso.titulo}</H3>
              <div className="flex flex-col gap-y-2 mt-6">
                <p>
                  <span className="font-semibold">{countAulas(curso)}</span>{" "}
                  {countAulas(curso) > 1 || countAulas(curso) == 0
                    ? "Aulas"
                    : "Aula"}
                </p>
                <p>
                  <span className="font-semibold">{curso.modulos.length}</span>{" "}
                  {curso.modulos.length > 1 || curso.modulos.length == 0
                    ? "Módulos"
                    : "Módulo"}
                </p>
                {/* <p>8 horas e 15 minutos de conteúdo</p> */}
                <p>
                  <span className="font-semibold">
                    {countMateriaisComplementaresCurso(curso)}
                  </span>{" "}
                  {countMateriaisComplementaresCurso(curso) > 1 ||
                  countMateriaisComplementaresCurso(curso) == 0
                    ? "Materiais Complementares"
                    : "Material Complementar"}
                </p>
                <p className="font-semibold">
                  + de{" "}
                  {calcDuracaoCurso(curso) >= 3600 &&
                    `${Math.floor(calcDuracaoCurso(curso) / 3600)} ${
                      Math.floor(calcDuracaoCurso(curso) / 3600) == 0 ||
                      Math.floor(calcDuracaoCurso(curso) / 3600) > 1
                        ? "horas "
                        : "hora"
                    } `}
                  {calcDuracaoCurso(curso) >= 60 &&
                    `${Math.floor(calcDuracaoCurso(curso) / 60)} ${
                      Math.floor(calcDuracaoCurso(curso) / 60) == 0 ||
                      Math.floor(calcDuracaoCurso(curso) / 60) > 1
                        ? "minutos"
                        : "minuto"
                    } `}
                  {calcDuracaoCurso(curso) < 60 &&
                    `${Math.floor(calcDuracaoCurso(curso))} ${
                      Math.floor(calcDuracaoCurso(curso)) == 0 ||
                      Math.floor(calcDuracaoCurso(curso)) > 1
                        ? "segundos"
                        : "segundo"
                    } `}
                  de Conteúdo
                </p>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-end">
                <H3
                  className={`text-2xl font-bold text-[#2363AF] dark:text-[#57a3ff] my-4`}
                >
                  {new Intl.NumberFormat("ao", {
                    style: "currency",
                    currency: "AOA",
                  }).format(curso.preco)}
                </H3>
              </div>
              <PrimaryButton className="w-full py-5" onClick={handleMatricular}>
                Assinar Agora
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
