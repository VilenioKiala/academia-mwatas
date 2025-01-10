"use client";

import React, { HTMLAttributes } from "react";
import ArrowDownIcon from "@/app/(frontend)/icons/ArrowDownIcon";
import Avatar from "@/app/(frontend)/components/Avatar";
import logojustlineblue from "@/app/(frontend)/images/logojustlineblue.png";
import logojustline from "@/app/(frontend)/images/logojustline.png";
import Image from "next/image";
import MenuToggleIcon from "@/app/(frontend)/icons/MenuToggleIcon";
import { Drawer } from "@material-tailwind/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import LayoutIcon from "@/app/(frontend)/icons/LayoutIcon";
import ThemeSwitcher from "@/app/(frontend)/components/ThemeSwitcher";
import { useTheme } from "next-themes";
import AppLink from "../(frontend)/components/AppLink";

type NavProps = {
  navProps: HTMLAttributes<HTMLDivElement>;
};

export default function Nav({ ...navProps }: NavProps) {
  const { theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4 w-fit fixed"
        overlayProps={{ className: "fixed" }}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div>Drawer</div>
        {/* <Sidebar
          userLogged={{ ...userLogged }}
          isDrawerOpen={open}
          className="flex h-screen z-50 top-0 left-0 fixed"
        /> */}
      </Drawer>
      <nav
        {...navProps.navProps}
        className={`grid grid-cols-12 py-4 lg:px-0 light:bg-white dark:bg-background z-30 ${navProps.navProps.className}`}
      >
        <div className="ml-3 lg:ml-12 col-span-3 flex gap-1 items-center">
          <button className="cursor-pointer lg:hidden" onClick={openDrawer}>
            <MenuToggleIcon className="fill-myblue dark:fill-white" />
          </button>
          {theme == "dark" ? (
            <Image
              src={logojustline}
              alt="Logo Mwata's"
              width={logojustlineblue.width}
              height={logojustlineblue.height}
              className="h-4/5"
            />
          ) : (
            <Image
              src={logojustlineblue}
              alt="Logo Mwata's"
              width={logojustlineblue.width}
              height={logojustlineblue.height}
              className="h-4/5"
            />
          )}
        </div>
        <div className="col-start-4 col-end-10 relative flex items-center justify-center">
          <AppLink href="#" className="flex-1 text-center">
            Início
          </AppLink>
          <AppLink href="#" className="flex-1 text-center">
            Quem Somos
          </AppLink>
          <Dropdown>
            <DropdownTrigger>
              <button className="flex gap-2 items-center cursor-pointer outline-none">
                <p>Categorias</p>
                <div className="flex items-center">
                  <div className="flex-col justify-center">
                    <ArrowDownIcon
                      width={"1em"}
                      height={"1em"}
                      className="dark:stroke-white"
                    />
                  </div>
                </div>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" showDivider href="#">
                <p>Categoria 1</p>
              </DropdownItem>
              <DropdownItem key="new" showDivider href="#">
                <p>Categoria 2</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <AppLink href="#" className="flex-1 text-center">
            Depoimentos
          </AppLink>
          <AppLink href="#" className="flex-1 text-center">
            Contactos
          </AppLink>
        </div>

        <div className="col-start-10 col-span-full mr-5 lg:mr-16 flex gap-3 items-center justify-end">
          <Dropdown>
            <DropdownTrigger>
              <button className="flex gap-2 items-center cursor-pointer">
                <Avatar />
                <div className="flex items-center">
                  <div className="flex-col justify-center">
                    <ArrowDownIcon
                      width={"1em"}
                      height={"1em"}
                      className="dark:stroke-white"
                    />
                  </div>
                </div>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="new"
                showDivider
                // onPress={() =>
                //   router.push(`/plataforma/usuarios/${userLogged?.id}`)
                // }
              >
                <div className="flex gap-12 justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Avatar />
                    <div className="flex flex-col gap-1"></div>
                  </div>
                  <Button
                  // onPress={() =>
                  //   router.push(`/plataforma/usuarios/${userLogged?.id}`)
                  // }
                  >
                    Ver Perfil
                  </Button>
                </div>
              </DropdownItem>
              <DropdownItem
                showDivider
                key="copy"
                onClick={() => router.push(`/plataforma/configuracoes`)}
              >
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col gap-1">
                    <p className="capitalize font-semibold text-myblue">
                      Minha Conta
                    </p>
                    <p className="text-xs">
                      Gerencie os seus dados pessoais e preferências
                    </p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                showDivider
                key="edit"
                onClick={() => router.push(`/plataforma/certificados`)}
              >
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col gap-1">
                    <p className="capitalize font-semibold text-myblue">
                      Certificados
                    </p>
                    <p className="text-xs">Veja os seus certificados</p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem showDivider key="layout">
                <div className="flex gap-2 items-center">
                  <LayoutIcon fill="#1F68B2" width={"1.7em"} height={"1.7em"} />
                  <div className="flex flex-col gap-1">
                    <p className="capitalize font-semibold text-danger">
                      <ThemeSwitcher />
                    </p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                showDivider
                key="delete"
                className="text-danger"
                color="danger"
                // onPress={}
              >
                <div className="flex gap-2 items-center fill-danger">
                  {/* <LogoutIcon fill="red" width={"1.7em"} height={"1.7em"} /> */}
                  <div className="flex flex-col gap-1">
                    <p className="capitalize font-semibold text-danger">Sair</p>
                  </div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
}
