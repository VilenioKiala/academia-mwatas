"use client";

import React from "react";
import DeleteIcon from "@/app/(frontend)/icons/DeleteIcon";
import EyeIcon from "@/app/(frontend)/icons/EyeIcon";
import EditIcon from "@/app/(frontend)/icons/EditIcon";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Table,
  TableBody,
  TableColumn,
  TableCell,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Avatar from "../../components/Avatar";
import { IconButton, Spinner } from "@material-tailwind/react";
import { Button } from "@nextui-org/button";
import { api, appURL } from "@/app/lib/api/axios";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import AddMatriculaModal from "./AddMatriculaModal";
import EditarMembroModal from "./EditarMembroModal";
import { isAdmin, isSuperAdmin } from "@/app/lib/functions/isAdminOrSuper";
import DangerConfirmationDialog from "../../components/DangerConfirmationDialog";
import { useDisclosure } from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/app/lib/functions/formatDateTime";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import H3 from "../../components/H3";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";

type TabelaMembrosProps = {
  userLogged: IUser;
  cursos: ICurso[];
  users: IUser[];
  page: number;
  totalPages: number;
};

export default function TabelaMembros({
  userLogged,
  cursos,
  users,
  page,
  totalPages,
}: TabelaMembrosProps) {
  const path = usePathname();

  const searchParams = useSearchParams();

  const { toast } = useToast();
  const router = useRouter();
  const [userClicked, setUserClicked] = React.useState<IUser | undefined>(
    undefined
  );
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const getItemProps = (index: number) =>
    ({
      className: page === index && "bg-myblue",
      variant: page === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        const search = new URLSearchParams(searchParams);

        search.set("page", index.toString());

        router.push(`${appURL}${path}?${search.toString()}`);
      },
    } as any);

  const next = () => {
    if (page === totalPages) return;

    const search = new URLSearchParams(searchParams);

    search.set("page", (Number(page) + 1).toString());

    router.push(`${appURL}${path}?${search.toString()}`);
  };

  const prev = () => {
    if (page === 1) return;

    const search = new URLSearchParams(searchParams);

    search.set("page", (Number(page) - 1).toString());

    router.push(`${appURL}${path}?${search.toString()}`);
  };

  function displayIconButtons() {
    const array = [];
    let i = 1;

    for (i = 1; i <= totalPages; i++) {
      array.push(i);
    }

    return (
      <>
        {array.map((i) => {
          return (
            <IconButton
              key={i}
              className="bg-myblue"
              {...getItemProps(i)}
              onPointerEnterCapture={undefined}
            >
              {i}
            </IconButton>
          );
        })}
      </>
    );
  }

  async function deleteAction() {
    const response = await api.delete(`/api/users/${userClicked.id}`);

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Usuário Deletado com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    router.refresh();
  }

  const renderCell = React.useCallback(
    (user: IUser, columnKey: React.Key) => {
      // const cellValue = user[columnKey];

      switch (columnKey) {
        case "nome":
          return (
            <div className="flex gap-2 items-center">
              <Avatar foto={user.profilePic} />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {user.nome} {user.sobrenome}{" "}
                  {userLogged.id == user.id && "(eu)"}
                </p>
                <p>@{user.nomeUsuario}</p>
              </div>
            </div>
          );
        case "privilegio":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user.privilegio}</p>
            </div>
          );
        // case "estado":
        //   return <div className="capitalize">{cellValue}</div>;
        case "createdAt":
          return (
            <div>
              <p>{formatDate(new Date(user.createdAt))}</p>
            </div>
          );

        case "email":
          return (
            <div>
              <p>{user.email}</p>
            </div>
          );

        case "operacoes":
          return (
            <>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <Link href={`/plataforma/usuarios/${user.id}`}>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Link>
                </Tooltip>
                <EditarMembroModal user={user}>
                  <button>
                    <Tooltip content="Edit user">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                  </button>
                </EditarMembroModal>
                {(userLogged.id !== user.id || !isAdmin(user)) && (
                  <div className="flex items-center gap-2">
                    <AddMatriculaModal
                      // open={modalOpen}
                      // setOpen={setModalOpen}
                      user={{ ...user }}
                      cursos={cursos}
                    >
                      <button>
                        <Tooltip content="Matricular a um curso">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <PlusIcon />
                          </span>
                        </Tooltip>
                      </button>
                    </AddMatriculaModal>
                    <Link
                      href={`/plataforma/membros/matriculas/${user.id}`}
                    ></Link>
                    {!isSuperAdmin(user) &&
                      (isAdmin(userLogged) || isSuperAdmin(userLogged)) && (
                        <button
                          onClick={() => {
                            setUserClicked({ ...user });
                            onOpen();
                          }}
                        >
                          <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                              <DeleteIcon />
                            </span>
                          </Tooltip>
                        </button>
                      )}
                  </div>
                )}
              </div>
            </>
          );
        // default:
        //   return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <DangerConfirmationDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        titulo="Aviso!"
        descricao={`Tem certeza que quer apagar o usuário @"${userClicked?.nomeUsuario}"`}
        confirmationAction={deleteAction}
        // eslint-disable-next-line react/no-children-prop
        children={undefined}
      />
      <Table
        aria-label="Example table with client side sorting"
        isHeaderSticky
        classNames={{
          base: "max-h-[520px] overflow-scroll",
        }}
      >
        <TableHeader className="text-center">
          <TableColumn key="nome" className="bg-white text-center">
            Nome
          </TableColumn>
          <TableColumn key="email" className="bg-white text-center">
            Email
          </TableColumn>
          <TableColumn key="privilegio" className="bg-white text-center">
            Privilégio
          </TableColumn>
          <TableColumn key="createdAt" className="bg-white text-center">
            Data de Inscrição
          </TableColumn>
          <TableColumn key="operacoes" className="bg-white text-center">
            Operações
          </TableColumn>
        </TableHeader>
        <TableBody
          items={[
            ...users.map((user) => {
              return { ...user };
            }),
          ]}
          loadingContent={
            <Spinner
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          }
        >
          {(item) => (
            <TableRow key={item.nome}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {users.length == 0 && (
        <H3 className="text-center">Nenhum usuário encontrado</H3>
      )}

      {users.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="light"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={page === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">{displayIconButtons()}</div>
          <Button
            variant="light"
            className="flex items-center gap-2"
            onClick={next}
            disabled={page === 5}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
