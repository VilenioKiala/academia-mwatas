"use client";

import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import React from "react";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { api, appURL } from "@/app/lib/api/axios";
import { Checkbox } from "@nextui-org/checkbox";
import H3 from "../../components/H3";
import Link from "next/link";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import LockedIcon from "../../icons/LockedIcon";
import { IMaterialComplementar } from "@/app/(backend)/interfaces/objects/IMaterialComplementar";
import fileDownload from "js-file-download";
import fileImage from "@/app/(frontend)/images/fileImage.png";

type RightSidebarProps = {
  videoAulas: IVideoAula[];
  materiaisComplementares: IMaterialComplementar[];
  userLogged: IUser;
};

export default function RightSidebar({
  materiaisComplementares,
  userLogged,
  videoAulas,
}: RightSidebarProps) {
  function isMatriculadoToVideoAula(videoAula: IVideoAula) {
    return videoAula.modulo.curso.matriculas.map((matricula) => {
      return matricula.userId == userLogged.id;
    }).length == 0
      ? false
      : true;
  }

  function isMatriculadoToMaterialComplementar(
    materialComplementar: IMaterialComplementar
  ) {
    return materialComplementar.videoaula.modulo.curso.matriculas.map(
      (matricula) => {
        return matricula.userId == userLogged.id;
      }
    ).length == 0
      ? false
      : true;
  }

  return (
    <div className="hidden flex-col xl:flex xl:col-start-13 xl:col-span-full gap-5 border-l-1 border-myblue border-opacity-10">
      <div className="w-full min-h-[26rem] rounded-xl pl-3 py-10">
        <div className="flex justify-between">
          <H3 className="font-medium text-xl">Novas Aulas</H3>
          <Checkbox>
            <small className="text-sm">Meus cursos</small>
          </Checkbox>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex flex-col gap-6">
            {videoAulas.length == 0 && (
              <p className="text-center w-full">Nenhuma aula nova</p>
            )}

            {videoAulas.map((videoAula) => {
              return isMatriculadoToVideoAula(videoAula) ? (
                <Link
                  href={`/plataforma/conteudos/aula/${videoAula.id}`}
                  className="text-left flex gap-4 w-full bg-white hover:bg-black hover:bg-opacity-5 pr-2 transition-all rounded-xl"
                  key={videoAula.id}
                >
                  <div className="flex-1 flex gap-2">
                    <div
                      className="flex-[0.3] h-full bg-cover bg-center rounded-xl"
                      style={{
                        backgroundImage: `url(${appURL}/storage/images/cover_curso/${videoAula.modulo.curso.coverCurso})`,
                      }}
                    />
                    <div className="flex-[0.7] py-2 flex flex-col">
                      <p className="text-md font-semibold">
                        {videoAula.titulo}
                      </p>
                      <Link
                        href={`/plataforma/conteudos/${videoAula.modulo.cursoId}`}
                        className="text-left flex gap-4 w-full hover:text-myblue"
                        key={videoAula.id}
                      >
                        <small>{videoAula.modulo.curso.titulo}</small>
                      </Link>
                    </div>
                  </div>
                  <div className="self-center">
                    <ArrowRightIcon />
                  </div>
                </Link>
              ) : (
                <div
                  className="opacity-60 text-left flex gap-4 w-full bg-white hover:bg-black hover:bg-opacity-5 pr-2 transition-all rounded-xl"
                  key={videoAula.id}
                >
                  <div className="flex-1 flex gap-1">
                    <div
                      className="flex-[0.3] h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${appURL}/storage/images/cover_curso/${videoAula.modulo.curso.coverCurso})`,
                      }}
                    />
                    <div className="flex-[0.7] py-2 flex flex-col">
                      <p className="text-md font-semibold">
                        {videoAula.titulo}
                      </p>
                      <Link
                        href={`/plataforma/conteudos/${videoAula.modulo.cursoId}`}
                        className="text-left flex gap-4 w-full hover:text-myblue"
                        key={videoAula.id}
                      >
                        <small>{videoAula.modulo.curso.titulo}</small>
                      </Link>
                    </div>
                  </div>
                  <div className="self-center">
                    <LockedIcon />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full min-h-[26rem] pl-4 py-10">
        <div className="flex justify-between">
          <H3 className="font-medium text-xl">Novos Materiais</H3>
          <Checkbox>
            <small className="text-sm">Meus cursos</small>
          </Checkbox>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex flex-col gap-6">
            {materiaisComplementares.length == 0 && (
              <p className="text-center w-full">Nenhum material novo</p>
            )}

            {materiaisComplementares.map((materiaComplementar) => {
              return isMatriculadoToMaterialComplementar(
                materiaComplementar
              ) ? (
                <button
                  className="text-left flex gap-4 w-full bg-white hover:bg-black hover:bg-opacity-5 pr-2 transition-all rounded-xl"
                  key={materiaComplementar.id}
                  onClick={async () => {
                    await api
                      .get(
                        `/storage/materiais_complementares/${materiaComplementar.ficheiro}`,
                        { responseType: "blob" }
                      )
                      .then((response) => {
                        fileDownload(
                          response.data,
                          materiaComplementar.ficheiro
                        );
                      });
                  }}
                >
                  <div className="flex-1 flex gap-1">
                    <div
                      className="flex-[0.3] h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${fileImage.src})`,
                      }}
                    />
                    <div className="flex-[0.7] py-2 flex flex-col">
                      <p className="text-md font-semibold">
                        {materiaComplementar.titulo}
                      </p>
                      <Link
                        href={`/plataforma/conteudos/aula/${materiaComplementar.videoaula.id}`}
                        className="text-left flex gap-4 w-full hover:text-myblue"
                        key={materiaComplementar.id}
                      >
                        <small>
                          {materiaComplementar.videoaula.modulo.curso.titulo}
                        </small>
                      </Link>
                    </div>
                  </div>
                  <div className="self-center">
                    <ArrowRightIcon />
                  </div>
                </button>
              ) : (
                <div
                  className="opacity-60 text-left flex gap-4 w-full bg-white hover:bg-black hover:bg-opacity-5 pr-2 transition-all rounded-xl"
                  key={materiaComplementar.id}
                >
                  <div className="flex-1 flex gap-1">
                    <div
                      className="flex-[0.3] h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${fileImage.src})`,
                      }}
                    />
                    <div className="flex-[0.7] py-2 flex flex-col">
                      <p className="text-md font-semibold">
                        {materiaComplementar.titulo}
                      </p>
                      <Link
                        href={`/plataforma/conteudos/aula/${materiaComplementar.videoaula.id}`}
                        className="text-left flex gap-4 w-full hover:text-myblue"
                        key={materiaComplementar.id}
                      >
                        <small>
                          {materiaComplementar.videoaula.modulo.curso.titulo}
                        </small>
                      </Link>
                    </div>
                  </div>
                  <div className="self-center">
                    <LockedIcon />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
