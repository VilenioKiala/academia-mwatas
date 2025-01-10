"use client";

import { IMatricula } from "@/app/(backend)/interfaces/objects/IMatricula";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import Avatar from "@/app/(frontend)/components/Avatar";
import DeleteIcon from "@/app/(frontend)/icons/DeleteIcon";
import { api, apiUrl } from "@/app/lib/api/axios";
import { formatDateTime } from "@/app/lib/functions/formatDateTime";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@material-tailwind/react";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React from "react";

type TabelaMatriculaProps = {
  user: IUser;
};

export default function TabelaMatricula({ user }: TabelaMatriculaProps) {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const { toast } = useToast();
  const router = useRouter();

  async function deleteAction(id: string) {
    const response = await api.delete(`/api/matriculas/${id}`);

    console.log(response);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Matrícula Deletada com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });
  }

  React.useEffect(() => {
    // const ac = new AbortController();
    async function fetchData() {
      setIsLoading(true);

      const res = await (
        await fetch(`${apiUrl}/api/matriculas?page=${page}&userId=${user.id}`)
      ).json();

      setTotalPages(res.totalPages);

      setItems([...items, ...res.results]);

      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log(items);

  const renderCell = React.useCallback(
    (matricula: IMatricula, columnKey: React.Key) => {
      switch (columnKey) {
        case "user":
          return (
            <div className="flex gap-2 items-center">
              <Avatar foto={matricula.usuario.profilePic} />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {matricula.usuario.nome} {matricula.usuario.sobrenome}{" "}
                </p>
                <p>@{matricula.usuario.nomeUsuario}</p>
              </div>
            </div>
          );
        case "curso":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                <span className="font-semibold">{matricula.curso.titulo}</span>{" "}
                - {matricula.curso.preco} AOA
              </p>
            </div>
          );
        case "dataExpiracao":
          return (
            <div className="capitalize">
              {formatDateTime(new Date(matricula.dataExpiracao))}
            </div>
          );
        case "operacoes":
          return (
            <div className="relative flex items-center gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await deleteAction(matricula.id);
                    router.back();
                  }}
                >
                  <Tooltip color="danger" content="Delete user">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </button>
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
        bottomContent={
          !isLoading && page < totalPages ? (
            <div className="flex w-full justify-center">
              <Button
                isDisabled={isLoading}
                variant="flat"
                onPress={() => setPage(page + 1)}
              >
                {isLoading && (
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                )}
                Load More
              </Button>
            </div>
          ) : null
        }
        // sortDescriptor={list.sortDescriptor}
        // onSortChange={list.sort}
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          // table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="user">Usuário</TableColumn>
          <TableColumn key="curso">Curso</TableColumn>
          <TableColumn key="dataExpiracao">Prazo</TableColumn>
          <TableColumn key="operacoes">Operações</TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={
            <Spinner
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          }
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
