"use client";

import React from "react";
import DeleteIcon from "@/app/(frontend)/icons/DeleteIcon";
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
import { Spinner } from "@material-tailwind/react";
import { Button } from "@nextui-org/button";
import { apiUrl, appURL } from "@/app/lib/api/axios";
import Link from "next/link";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { IConvite } from "@/app/(backend)/interfaces/objects/IConvite";
import H3 from "../../components/H3";
import { formatDate } from "@/app/lib/functions/formatDateTime";

// const statusColorMap = {
//   activo: "success",
//   bloqueado: "danger",
// };

type TabelaConvitesProps = {
  userLogged: IUser;
};

export default function TabelaConvites({}: TabelaConvitesProps) {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  console.log(items);

  React.useEffect(() => {
    const ac = new AbortController();
    ac.abort();
    async function fetchData() {
      setIsLoading(true);

      const res = await (
        await fetch(`${apiUrl}/api/convites?page=${page}`)
      ).json();

      setTotalPages(res.totalPages);

      setItems([...items, ...res.results]);

      setIsLoading(false);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderCell = React.useCallback(
    (convite: IConvite, columnKey: React.Key) => {
      // const cellValue = convite[columnKey];

      switch (columnKey) {
        case "textoChamada":
          return (
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{convite.textoDestaque}</p>
                <p>{`${convite.textoChamada.slice(0, 60)}...`}</p>
              </div>
            </div>
          );
        case "link":
          return (
            <div className="flex flex-col">
              <Link
                href={`${appURL}/invites/${convite.id}`}
                className="text-myblue"
              >
                {appURL}/invites/{convite.id}
              </Link>
            </div>
          );
        case "createdAt":
          return (
            <div className="capitalize">
              <p>{formatDate(new Date(convite.createdAt))}</p>
            </div>
          );
        case "operacoes":
          return (
            <div className="relative flex items-center gap-2">
              <Link href={`/plataforma/membros/edit/${convite.id}`}>
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
              </Link>
              <div className="flex items-center gap-2">
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </div>
          );
      }
    },
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
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          // table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="textoChamada">Texto de Chamada</TableColumn>
          <TableColumn key="link">Link de Página de Captura</TableColumn>
          <TableColumn key="createdAt">Data de Criação</TableColumn>
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
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isLoading && items.length == 0 && (
        <H3 className="text-center">Não há nenhum convite criado</H3>
      )}
    </>
  );
}
