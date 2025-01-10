"use client";

import { HTMLAttributes } from "react";
import mwataslogowhite from "../images/logomwataswhite.png";
import Image from "next/image";
import Link from "next/link";
import ContentIcon from "../icons/ContentIcon";
import CertificateIcon from "../icons/CertificateIcon";
import MembersIcon from "../icons/MembersIcon";
import InviteIcon from "../icons/InviteIcon";
import ComunityIcon from "../icons/ComunityIcon";
import ConfigIcon from "../icons/ConfigIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { aquawaxLight } from "../styles/fonts";
import { usePathname, useSearchParams } from "next/navigation";
import logojustline from "../images/logojustline.png";
import HomeIcon from "../icons/HomeIcon";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { useTheme } from "next-themes";
import {
  isAdminOrSuper,
  isAluno,
  isProfessor,
} from "@/app/lib/functions/isAdminOrSuper";

type SidebarProps = {
  isDrawerOpen?: boolean;
  userLogged: IUser;
} & HTMLAttributes<HTMLDivElement>;

export default function Sidebar({
  userLogged,
  isDrawerOpen,
  ...props
}: SidebarProps) {
  const { theme } = useTheme();

  const searchParams = useSearchParams();

  const sidebarSmall = searchParams.get("sidebar_small");

  const pathname = usePathname();

  function isPaginaHome(pathname: string) {
    return pathname == "/plataforma";
  }

  function isPaginaConteudo(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaConteudo =
      pathElements.includes("plataforma") &&
      (pathElements.includes("conteudos") ||
        pathElements.includes("categorias"));

    return paginaConteudo;
  }

  function isPaginaMembros(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaMembros =
      pathElements.includes("plataforma") && pathElements.includes("membros");

    return paginaMembros;
  }

  function isPaginaCertificados(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaCertificados =
      pathElements.includes("plataforma") &&
      pathElements.includes("certificados");

    return paginaCertificados;
  }

  function isPaginaConvites(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaConvites =
      pathElements.includes("plataforma") && pathElements.includes("invites");

    return paginaConvites;
  }

  function isPaginaUsuario(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaConvites =
      pathElements.includes("plataforma") && pathElements.includes("usuarios");

    return paginaConvites;
  }

  function isPaginaAula(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaConvites =
      pathElements.includes("plataforma") && pathElements.includes("aula");

    return paginaConvites;
  }

  function isPaginaComunidade(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaComunidade =
      pathElements.includes("plataforma") &&
      pathElements.includes("comunidade");

    return paginaComunidade;
  }

  function isPaginaConfiguracoes(pathname: string) {
    const pathElements = pathname.split("/");

    const paginaComunidade =
      pathElements.includes("plataforma") &&
      pathElements.includes("configuracoes");

    return paginaComunidade;
  }

  return (
    <>
      {isDrawerOpen ? (
        <div
          {...props}
          style={{
            background: "linear-gradient(177.03deg, #3751A3 0%, #1F68B2 100%)",
            ...props.style,
          }}
          className={`pl-4 lg:pl-0 py-8 h-full fixed top-0 left-0 z-10 overflow-y-scroll ${props.className}`}
        >
          <div className="h-full flex-1 flex flex-col pl-4">
            <div className="flex-[0.1]">
              <Image
                className="w-full block"
                src={mwataslogowhite.src}
                width={mwataslogowhite.width}
                height={mwataslogowhite.height}
                alt="Academia Mwata's logo branca"
              />
            </div>

            <div
              className={`flex-[0.7] mt-8 flex flex-col text-white gap-y-5 ${aquawaxLight.className}`}
            >
              {isProfessor(userLogged) ||
                (isAluno(userLogged) && (
                  <Link
                    href="/plataforma/"
                    className={`flex items-center ${
                      isPaginaHome(pathname)
                        ? "bg-white dark:bg-blue-gray-900 rounded-l-2xl p-2"
                        : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                    }`}
                  >
                    <div className="">
                      <HomeIcon
                        fill={`${
                          isPaginaHome(pathname) ? "#1F68B2" : "#ffffff"
                        }`}
                      />
                    </div>
                    <div
                      className={`ml-2 ${
                        isPaginaHome(pathname)
                          ? "text-myblue font-semibold"
                          : "text-white"
                      }`}
                    >
                      <div className={`ml-2 block`}>Home</div>
                    </div>
                  </Link>
                ))}

              <Link
                href="/plataforma/conteudos"
                className={`flex items-center ${
                  isPaginaConteudo(pathname)
                    ? "bg-white dark:bg-blue-gray-900 rounded-l-2xl p-2"
                    : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                }`}
              >
                <div className="">
                  <ContentIcon
                    fill={`${
                      isPaginaConteudo(pathname) ? "#1F68B2" : "#ffffff"
                    }`}
                  />
                </div>
                <div
                  className={`ml-2 ${
                    isPaginaConteudo(pathname)
                      ? "text-myblue font-semibold"
                      : "text-white"
                  }`}
                >
                  <div className={`ml-2 block dark:text-foreground`}>
                    Conteúdos
                  </div>
                </div>
              </Link>

              <Link
                href="/plataforma/certificados"
                className={`flex items-center transition-all ${
                  isPaginaCertificados(pathname)
                    ? "bg-white dark:bg-blue-gray-900 rounded-l-2xl p-2"
                    : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                }`}
              >
                <div>
                  <CertificateIcon
                    fill={`${
                      isPaginaCertificados(pathname) ? "#1F68B2" : "#ffffff"
                    }`}
                  />
                </div>
                <div
                  className={`ml-2 block ${
                    isPaginaCertificados(pathname)
                      ? "text-myblue font-semibold"
                      : "text-white"
                  }`}
                >
                  Certificados
                </div>
              </Link>
              {isAdminOrSuper(userLogged) && (
                <>
                  <Link
                    href="/plataforma/membros"
                    className={`flex items-center ${
                      isPaginaMembros(pathname)
                        ? "bg-white dark:bg-blue-gray-900 rounded-l-2xl p-2"
                        : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                    }`}
                  >
                    <div>
                      <MembersIcon
                        fill={isPaginaMembros(pathname) ? "#1F68B2" : "#ffffff"}
                      />
                    </div>
                    <div
                      className={`ml-2 block ${
                        isPaginaMembros(pathname)
                          ? "text-myblue font-semibold"
                          : "text-white"
                      }`}
                    >
                      Membros
                    </div>
                  </Link>
                  <Link
                    href="/plataforma/invites"
                    className={`flex items-center hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all ${
                      isPaginaConvites(pathname)
                        ? "bg-white dark:bg-blue-gray-900 rounded-l-2xl p-2"
                        : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                    }`}
                  >
                    <div>
                      <InviteIcon
                        fill={
                          isPaginaConvites(pathname) ? "#1F68B2" : "#ffffff"
                        }
                      />
                    </div>
                    <div
                      className={`ml-2 block
                      ${
                        isPaginaConvites(pathname)
                          ? "text-myblue font-semibold"
                          : "text-white"
                      }`}
                    >
                      Convites
                    </div>
                  </Link>
                  <Link
                    href="/plataforma/comunidade"
                    className="flex items-center hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                  >
                    <div>
                      <ComunityIcon
                        fill={
                          isPaginaComunidade(pathname) ? "#1F68B2" : "#ffffff"
                        }
                      />
                    </div>
                    <div
                      className={`ml-2 block ${
                        isPaginaComunidade(pathname)
                          ? "text-myblue font-semibold"
                          : "text-white"
                      }`}
                    >
                      Comunidade
                    </div>
                  </Link>
                </>
              )}
            </div>

            <div
              className={`flex-[0.2] flex flex-col text-white justify-end gap-5 ${aquawaxLight.className}`}
            >
              <hr className="mr-4" />
              <Link
                href={"/plataforma/configuracoes"}
                className={`flex items-center ${
                  isPaginaConfiguracoes(pathname)
                    ? "bg-white rounded-l-2xl p-2"
                    : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                }`}
              >
                <div>
                  <ConfigIcon
                    fill={
                      isPaginaConfiguracoes(pathname) ? "#1F68B2" : "#ffffff"
                    }
                  />
                </div>
                <div
                  className={`ml-2 block ${
                    isPaginaConfiguracoes(pathname)
                      ? "text-myblue font-semibold"
                      : "text-white"
                  }`}
                >
                  Configurações
                </div>
              </Link>
              <button
                // onClick={logout}
                className="flex items-center hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
              >
                <div>
                  <LogoutIcon />
                </div>
                <div className={`ml-2 block`}>Sair</div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          {...props}
          style={{
            background:
              theme !== "dark" &&
              "linear-gradient(177.03deg, #3751A3 0%, #1F68B2 100%)",
            ...props.style,
          }}
          className={`dark:bg-[#1a1b23] pl-4 py-8 h-full hidden relative z-40 ${
            !isPaginaUsuario(pathname) &&
            !isPaginaAula(pathname) &&
            `lg:flex ${sidebarSmall == "true" ? "mr-12" : "mr-24"}`
          } top-0 left-0 z-20 ${props.className}`}
        >
          <div className="h-full flex-1 flex flex-col">
            <div className="flex-[0.1]">
              {sidebarSmall !== "true" ? (
                <>
                  <Image
                    className="w-full hidden xl:block"
                    src={mwataslogowhite.src}
                    width={mwataslogowhite.width}
                    height={mwataslogowhite.height}
                    alt="Academia Mwata's logo branca"
                  />
                  <Image
                    className="w-full sm:block xl:hidden"
                    src={logojustline.src}
                    width={logojustline.width}
                    height={logojustline.height}
                    alt="Academia Mwata's logo branca"
                  />
                </>
              ) : (
                <Image
                  className="w-20"
                  src={logojustline.src}
                  width={logojustline.width}
                  height={logojustline.height}
                  alt="Academia Mwata's logo branca"
                />
              )}
            </div>

            <div
              className={`flex-[0.7] mt-8 flex flex-col text-white gap-y-5 ${aquawaxLight.className}`}
            >
              {((userLogged && isProfessor(userLogged)) ||
                isAluno(userLogged)) && (
                <Link
                  href="/plataforma/"
                  className={`flex items-center ${
                    isPaginaHome(pathname)
                      ? "bg-white dark:bg-myblue rounded-l-2xl p-2"
                      : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                  }`}
                >
                  <div>
                    <HomeIcon
                      fill={`${
                        isPaginaHome(pathname)
                          ? theme == "dark"
                            ? "#ffffff"
                            : "#1F68B2"
                          : "#ffffff"
                      }`}
                    />
                  </div>
                  <div
                    className={`ml-2 ${
                      isPaginaHome(pathname) && "text-myblue font-semibold"
                    }`}
                  >
                    {sidebarSmall !== "true" && (
                      <div
                        className={`ml-2 hidden xl:block  dark:text-foreground ${
                          isPaginaHome(pathname)
                            ? "text-myblue dark:text-white font-semibold"
                            : "text-white"
                        }`}
                      >
                        Home
                      </div>
                    )}
                  </div>
                </Link>
              )}

              <Link
                href="/plataforma/conteudos"
                className={`flex items-center ${
                  isPaginaConteudo(pathname)
                    ? "bg-white dark:bg-myblue rounded-l-2xl p-2"
                    : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                }`}
              >
                <div className="">
                  <ContentIcon
                    fill={`${
                      isPaginaConteudo(pathname)
                        ? theme == "dark"
                          ? "#ffffff"
                          : "#1F68B2"
                        : "#ffffff"
                    }`}
                  />
                </div>
                <div
                  className={`ml-2 text-white dark:text-foreground ${
                    isPaginaConteudo(pathname) && "text-myblue font-semibold"
                  }`}
                >
                  {sidebarSmall !== "true" && (
                    <div
                      className={`ml-2 hidden xl:block dark:text-foreground ${
                        isPaginaConteudo(pathname) &&
                        "text-myblue dark:text-white font-semibold"
                      }`}
                    >
                      Conteúdos
                    </div>
                  )}
                </div>
              </Link>

              <Link
                href="/plataforma/certificados"
                className={`flex items-center transition-all ${
                  isPaginaCertificados(pathname)
                    ? "bg-white dark:bg-myblue rounded-l-2xl p-2"
                    : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                }`}
              >
                <div>
                  <CertificateIcon
                    fill={`${
                      isPaginaCertificados(pathname)
                        ? theme == "dark"
                          ? "#ffffff"
                          : "#1F68B2"
                        : "#ffffff"
                    }`}
                  />
                </div>
                {sidebarSmall !== "true" && (
                  <div
                    className={`ml-2 hidden xl:block dark:text-foreground ${
                      isPaginaCertificados(pathname)
                        ? "text-myblue dark:text-white font-semibold"
                        : "text-white"
                    }`}
                  >
                    Certificados
                  </div>
                )}
              </Link>

              {userLogged && isAdminOrSuper(userLogged) && (
                <>
                  <Link
                    href="/plataforma/membros"
                    className={`lg:flex items-center hidden ${
                      isPaginaMembros(pathname)
                        ? "bg-white dark:bg-myblue rounded-l-2xl p-2"
                        : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                    }`}
                  >
                    <div>
                      <MembersIcon
                        fill={
                          isPaginaMembros(pathname)
                            ? theme == "dark"
                              ? "#ffffff"
                              : "#1F68B2"
                            : "#ffffff"
                        }
                      />
                    </div>
                    {sidebarSmall !== "true" && (
                      <div
                        className={`ml-2 hidden xl:block dark:text-foreground ${
                          isPaginaMembros(pathname)
                            ? "text-myblue dark:text-white font-semibold"
                            : "text-white"
                        }`}
                      >
                        Membros
                      </div>
                    )}
                  </Link>
                  <Link
                    href="/plataforma/invites"
                    className={`flex items-center ${
                      isPaginaConvites(pathname)
                        ? "bg-white rounded-l-2xl p-2"
                        : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                    }`}
                  >
                    <div>
                      <InviteIcon
                        fill={
                          isPaginaConvites(pathname)
                            ? theme == "dark"
                              ? "#ffffff"
                              : "#1F68B2"
                            : "#ffffff"
                        }
                      />
                    </div>
                    {sidebarSmall !== "true" && (
                      <div
                        className={`ml-2 hidden xl:block ${
                          isPaginaConvites(pathname)
                            ? "text-myblue dark:text-white font-semibold"
                            : "text-white"
                        }`}
                      >
                        Convites
                      </div>
                    )}
                  </Link>
                  <Link
                    href="/plataforma/comunidade"
                    className={`flex items-center ${
                      isPaginaComunidade(pathname)
                        ? "bg-white dark:bg-myblue rounded-l-2xl p-2"
                        : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                    }`}
                  >
                    <div>
                      <ComunityIcon
                        fill={
                          isPaginaComunidade(pathname)
                            ? theme == "dark"
                              ? "#ffffff"
                              : "#1F68B2"
                            : "#ffffff"
                        }
                      />
                    </div>
                    {sidebarSmall !== "true" && (
                      <div
                        className={`ml-2 
                      hidden xl:block ${
                        isPaginaComunidade(pathname)
                          ? "text-myblue dark:text-white font-semibold"
                          : "text-white"
                      }
                      `}
                      >
                        Comunidade
                      </div>
                    )}
                  </Link>
                </>
              )}
            </div>

            <div
              className={`flex-[0.2] flex flex-col text-white justify-end gap-5 ${aquawaxLight.className}`}
            >
              <hr className="mr-4" />
              <Link
                href={"/plataforma/configuracoes"}
                className={`flex items-center ${
                  isPaginaConfiguracoes(pathname)
                    ? "bg-white dark:bg-myblue rounded-l-2xl p-2"
                    : "hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
                }`}
              >
                <div>
                  <ConfigIcon
                    fill={
                      isPaginaConfiguracoes(pathname)
                        ? theme == "dark"
                          ? "#ffffff"
                          : "#1F68B2"
                        : "#ffffff"
                    }
                  />
                </div>
                {sidebarSmall !== "true" && (
                  <div
                    className={`ml-2 hidden xl:block ${
                      isPaginaConfiguracoes(pathname)
                        ? "text-myblue dark:text-white font-semibold"
                        : "text-white"
                    }
                    `}
                  >
                    Configurações
                  </div>
                )}
              </Link>
              <button
                // onClick={logout}
                className="flex items-center hover:bg-white hover:rounded-l-2xl hover:p-2 hover:bg-opacity-30 transition-all"
              >
                <div>
                  <LogoutIcon />
                </div>
                {sidebarSmall !== "true" && (
                  <div className={`ml-2 hidden xl:block`}>Sair</div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
