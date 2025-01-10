"use client";

import { IMatricula } from "@/app/(backend)/interfaces/objects/IMatricula";
import Avatar from "@/app/(frontend)/components/Avatar";
import DeleteIcon from "@/app/(frontend)/icons/DeleteIcon";
import EditIcon from "@/app/(frontend)/icons/EditIcon";
import EyeIcon from "@/app/(frontend)/icons/EyeIcon";
import { PlusIcon } from "@/app/(frontend)/icons/PlusIcon";
import { apiUrl } from "@/app/lib/api/axios";
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
import Link from "next/link";
import React from "react";

export default function TabelaMatricula() {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const ac = new AbortController();
    ac.abort();
    async function fetchData() {
      setIsLoading(true);

      const res = await (
        await fetch(`${apiUrl}/api/matriculas?page=${page}`)
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
      // const cellValue = matricula[columnKey];

      switch (columnKey) {
        case "user":
          return (
            <div className="flex gap-2 items-center">
              <Avatar foto={matricula.user.profilePic} />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {matricula.user.nome} {matricula.user.sobrenome}{" "}
                </p>
                <p>@{matricula.user.nomeUsuario}</p>
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
              {new Date(matricula.dataExpiracao).getDay()}/
              {new Date(matricula.dataExpiracao).getMonth()}/
              {new Date(matricula.dataExpiracao).getFullYear()}
            </div>
          );
        case "operacoes":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <div className="flex items-center gap-2">
                <Link
                  href={`/plataforma/membros/matriculas/${matricula.user.id}`}
                >
                  <Tooltip content="Matricular a um curso">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <PlusIcon width={undefined} height={undefined} />
                    </span>
                  </Tooltip>
                </Link>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </div>
          );
        // default:
        //   return cellValue;
      }
    },
    []
  );

  return (
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
  );
}
