import AdicionarModuloModalButton from "./AdicionarModuloModalButton";
import Link from "next/link";
import H1 from "@/app/(frontend)/components/H1";
import Separator from "@/app/(frontend)/components/Separator";
import H3 from "@/app/(frontend)/components/H3";
import ContentOverview from "@/app/(frontend)/components/ContentOverview";
import { appURL } from "@/app/lib/api/axios";
import VideoAulasPorModulo from "./VideoAulasPorModulo";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { IModulo } from "@/app/(backend)/interfaces/objects/IModule";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserId } from "@/app/lib/actions/user/getOneUserId";
import { auth } from "@/app/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin", RedirectType.replace);
  }

  const userLogged = await getOneUserId(session?.user?.id);

  if (!userLogged) {
    redirect("/signin", RedirectType.replace);
  }

  async function getData() {
    const id = (await params).id;

    const data = await (await fetch(`${appURL}/api/cursos/${id}`)).json();

    return data;
  }

  const curso: ICurso = await getData();

  const coverURL = URL.parse(
    `${appURL}/storage/images/cover_curso/${curso.coverCurso}`
  );

  return (
    <div className="grid grid-cols-12 gap xl:px-0 lg:ml-12">
      <div
        className={`col-start-1 col-span-full lg:col-end-5 relative min-h-[28rem] bg-none order-1 lg:order-none bg-cover bg-center text-white lg:text-black flex justify-center flex-col py-8 pr-8`}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover z-[3] block lg:hidden brightness-50"
          style={{
            backgroundImage: `url(${coverURL})`,
          }}
        />
        <Link
          href="/plataforma/conteudos"
          className="relative z-10 dark:text-white"
        >
          Voltar
        </Link>
        <div className="flex flex-col mt-8 relative z-10 dark:text-white">
          <p>{"Curso"}</p>
          <H1 className="text-6xl text-center lg:text-left">{curso.titulo}</H1>
        </div>
        <p className="mt-4 relative z-10 text-center lg:text-left dark:text-white">
          {curso.fraseDestaque}
        </p>
      </div>
      <div className="col-start-1 lg:col-start-6 col-span-full hidden lg:block">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverURL})`,
          }}
        ></div>
      </div>

      <div
        style={{
          background: `"#FDFDFD"`,
          border: "0.5px solid rgba(0, 0, 0, 0.20)",
          borderRadius: "16px",
        }}
        className="col-start-1 col-span-full md:col-span-6 lg:col-end-6 mt-24 px-9 py-11 order-3 lg:order-3 dark:bg-gray-900"
      >
        <H3>Sobre o Curso</H3>
        <Separator className="mt-4 mb-6" />
        <hr />
        {curso.sobreOCurso ? (
          <p>{curso.sobreOCurso}</p>
        ) : (
          <p className="text-2xl font-semibold text-center">
            Não há informações detalhadas sobre o curso
          </p>
        )}
      </div>

      <div className="col-start-1 lg:col-start-6 col-end-13 md:mr-8 lg:mr-16 lg:ml-24 mt-24 order-last lg:order-4">
        <ContentOverview curso={{ ...curso }} userLogged={{ ...userLogged }} />
      </div>

      <div
        style={{
          border: "0.5px solid rgba(0, 0, 0, 0.20)",
          borderRadius: "16px",
        }}
        className="col-start-1 bg-[#FDFDFD] dark:bg-gray-900 col-span-full md:col-start-7 lg:col-end-6 lg:col-start-1 sm:ml-8 md:ml-0 mt-10 px-9 py-11 order-5 lg:order-5"
      >
        <div className="flex justify-between w-full dark:text-white">
          <H3>Módulos</H3>
          {userLogged.privilegio.toLowerCase() == "admin" ||
            (userLogged.privilegio.toLowerCase() == "superadmin" && (
              <AdicionarModuloModalButton
                nomeCurso={curso.titulo}
                cursoId={curso.id}
              />
            ))}
        </div>
        <div className="mt-12">
          {curso.modulos.length == 0 && (
            <div className="flex items-center justify-center">
              <p className="text-xl font-semibold text-center">
                Não foi registado nenhum módulo ainda!
              </p>
            </div>
          )}
          {curso.modulos.map((modulo: IModulo) => {
            return (
              <VideoAulasPorModulo
                key={modulo.id}
                curso={{ ...curso }}
                modulo={{ ...modulo }}
                userLogged={{ ...userLogged }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
