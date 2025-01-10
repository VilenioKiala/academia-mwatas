"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableColumn,
  TableCell,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import CursoCover from "../components/CursoCover";
import { calcDuracaoCurso } from "@/app/lib/functions/calcDuracaoCurso";
import { useRouter } from "next/navigation";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { parseAbsoluteToLocal } from "@internationalized/date";
import H3 from "../components/H3";
import { countAulas } from "@/app/lib/functions/countAulas";
import { countAulasAssistidas } from "@/app/lib/functions/countAulasAssistidas";

type TabelaMembrosProps = {
  userLogged: IUser;
};

export default function TabelaCursosAFazer({ userLogged }: TabelaMembrosProps) {
  const router = useRouter();

  function getCursosAFazer(user: IUser) {
    const cursos = [];

    user.matriculas.map((matricula) => {
      if (
        !matricula.dataExpiracao ||
        parseAbsoluteToLocal(
          new Date(matricula.dataExpiracao).toISOString()
        ).compare(parseAbsoluteToLocal(new Date().toISOString())) > 0
      ) {
        cursos.push({ ...matricula.curso });
      }
    });

    return cursos;
  }

  const renderCell = React.useCallback(
    (curso: ICurso, columnKey: React.Key) => {
      // const cellValue = user[columnKey];

      switch (columnKey) {
        case "nomeCurso":
          return (
            <div className="flex gap-2 justify-start items-center">
              <CursoCover className="w-24 h-14" foto={curso.coverCurso} />
              <h2 className="text-xl">{curso.titulo}</h2>
            </div>
          );
        case "aulasCompletas":
          return (
            <div className="flex flex-col">
              <p className="text-lg">
                {countAulasAssistidas(curso, userLogged)}/
                <span className="font-semibold">{countAulas(curso)} (</span>
                {(countAulasAssistidas(curso, userLogged) / countAulas(curso)) *
                  100}
                %)
              </p>
            </div>
          );
        case "duracao":
          return (
            <div className="flex items-center justify-end gap-3">
              <p>
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
              </p>
              <div>
                <ArrowRightIcon />
              </div>
            </div>
          );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Table
        aria-label="Example table with client side sorting"
        isHeaderSticky
        classNames={{
          base: "max-h-[520px] overflow-scroll",
        }}
      >
        <TableHeader className="text-center">
          <TableColumn
            key="nomeCurso"
            className="bg-white dark:bg-gray-900 text-start border-b-1 border-opacity-30 border-myblue"
          >
            Nome do Curso
          </TableColumn>
          <TableColumn
            key="aulasCompletas"
            className="bg-white dark:bg-gray-900 border-b-1 border-opacity-30 border-myblue"
          >
            Aulas Completas
          </TableColumn>
          <TableColumn
            key="duracao"
            className="bg-white dark:bg-gray-900 text-end border-b-1 border-opacity-30 border-myblue"
          >
            Duração
          </TableColumn>
        </TableHeader>
        <TableBody items={[...getCursosAFazer(userLogged)]}>
          {(item) => (
            <TableRow
              key={item.id}
              className="border-1 border-black border-opacity-15 cursor-pointer bg-white dark:bg-gray-900 hover:bg-blue-50 transition-all"
              onClick={() => router.push(`/plataforma/conteudos/${item.id}`)}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {getCursosAFazer(userLogged).length == 0 && (
        <H3 className="text-center">
          Não está matriculado em nenhum curso no momento
        </H3>
      )}
    </>
  );
}
