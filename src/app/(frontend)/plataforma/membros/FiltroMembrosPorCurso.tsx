"use client";

import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { appURL } from "@/app/lib/api/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type FiltroMembrosPorCursoProps = {
  cursos: ICurso[];
};

export default function FiltroMembrosPorCurso({
  cursos,
}: FiltroMembrosPorCursoProps) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  return (
    <label className="flex flex-col">
      <p>Filtro de Curso:</p>
      <Select
        defaultValue={searchParams.get("cursoId") || "todos"}
        name="cursoId"
        onValueChange={(value) => {
          const search = new URLSearchParams(searchParams);

          if (value == "todos") {
            search.delete("cursoId");
            router.replace(`${appURL}${path}?${search.toString()}`);
            return;
          }

          search.set("cursoId", value);

          router.replace(`${appURL}${path}?${search.toString()}`);
        }}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue
            placeholder="Filtro do Curso"
            className="placeholder:text-white"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Selecione o curso</SelectLabel>
            <SelectItem value="todos" className="capitalize">
              Todos
            </SelectItem>
            {cursos.map((curso) => {
              return (
                <>
                  <SelectItem
                    key={curso.id}
                    value={curso.id}
                    className="capitalize"
                  >
                    {curso.titulo}
                  </SelectItem>
                </>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  );
}
