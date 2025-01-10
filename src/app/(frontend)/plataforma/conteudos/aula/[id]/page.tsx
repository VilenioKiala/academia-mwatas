import React from "react";
import pattern from "@/app/(frontend)/images/pattern.png";
import Link from "next/link";
import { apiUrl } from "@/app/lib/api/axios";
import { IVideoAula } from "@/app/(backend)/interfaces/objects/IVideoAula";
import PauseIcon from "@/app/(frontend)/icons/PauseIcon";
import PlayIcon from "@/app/(frontend)/icons/PlayIcon";
import H3 from "@/app/(frontend)/components/H3";
import Comentarios from "./Comentarios";
import VideoAulaInfo from "./VideoAulaInfo";
import { getOneVideoAula } from "@/app/lib/actions/videoaula/getOneVideoAula";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@/app/auth";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  console.log(userLogged);

  const videoaula = await getOneVideoAula(id);

  console.log("videoaula aqui", videoaula);

  console.log(videoaula.duracao);

  return (
    <div className="grid grid-cols-12 gap-4 xl:px-0 lg:ml-12">
      <div className="col-start-1 col-span-full xl:col-end-9 2xl:col-end-10">
        <div className="flex flex-col mt-3">
          <div>
            <video controls className="w-full h-[30rem]">
              <source src={`${apiUrl}/storage/videoaulas/${videoaula.video}`} />
            </video>
            <VideoAulaInfo
              videoaula={{ ...videoaula }}
              userLogged={{ ...userLogged }}
            />
            <Comentarios userLogged={{ ...userLogged }} videoAula={videoaula} />
          </div>
        </div>
      </div>
      <div className="col-start-1 xl:col-start-9 2xl:col-start-10 col-span-full lg:mr-10 mx-4 border-l-1 border-black border-opacity-10 p-4">
        <H3 className="3xl">Módulo: {videoaula.modulo.titulo}</H3>
        <div className="w-full flex flex-col gap-4 overflow-y-auto">
          {videoaula.modulo.videoAulas.map((videoaula: IVideoAula) => {
            return (
              <>
                {videoaula.id == id ? (
                  <div
                    className="w-full flex items-center overflow-hidden"
                    key={videoaula.id}
                    style={{
                      border: "0.5px solid rgba(0, 0, 0, 0.26)",
                      borderRadius: "16px",
                    }}
                  >
                    <div
                      className={`ml-2 my-2 rounded-full p-5 flex items-center justify-center
                      bg-[#1F68B2]
                    `}
                      style={{
                        border: "0.5px solid rgba(0, 0, 0, 0.26)",
                        borderRadius: "100%",
                      }}
                    >
                      <PauseIcon />
                    </div>

                    <div className="flex-1 flex flex-col ml-2 text-sm gap-y-1">
                      <p className="font-semibold">{videoaula.titulo}</p>
                      <p>
                        {videoaula.duracao < 60
                          ? `${Math.floor(videoaula.duracao)} segundos`
                          : `${Math.floor(videoaula.duracao / 60)} minutos e ${
                              Math.floor(videoaula.duracao) -
                              Math.floor(videoaula.duracao / 60) * 60
                            } segundos`}{" "}
                      </p>
                    </div>

                    <div
                      className=" flex-col w-7 h-full bg-cover bg-center"
                      style={{ background: `url(${pattern.src})` }}
                    ></div>
                  </div>
                ) : (
                  <Link
                    href={`/plataforma/conteudos/aula/${videoaula.id}?sidebar_small=true`}
                    className="w-full flex items-center overflow-hidden hover:bg-[#e8eff3] transition-all"
                    key={videoaula.id}
                    style={{
                      border: "0.5px solid rgba(0, 0, 0, 0.26)",
                      borderRadius: "16px",
                    }}
                  >
                    <div
                      className={`ml-2 my-2 rounded-full p-5 flex items-center justify-center`}
                      style={{
                        border: "0.5px solid rgba(0, 0, 0, 0.26)",
                        borderRadius: "100%",
                      }}
                    >
                      <PlayIcon />
                    </div>

                    <div className="flex-1 flex flex-col ml-2 text-sm gap-y-1">
                      <p className="font-semibold">{videoaula.titulo}</p>
                      <p>
                        {videoaula.duracao < 60
                          ? `${Math.floor(videoaula.duracao)} segundos`
                          : `${Math.floor(videoaula.duracao / 60)} minutos e ${
                              Math.floor(videoaula.duracao) -
                              Math.floor(videoaula.duracao / 60) * 60
                            } segundos`}{" "}
                      </p>
                    </div>

                    <div
                      className=" flex-col w-7 h-full bg-cover bg-center"
                      style={{ background: `url(${pattern.src})` }}
                    ></div>
                  </Link>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
