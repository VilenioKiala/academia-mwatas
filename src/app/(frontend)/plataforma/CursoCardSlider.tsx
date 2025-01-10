"use client";

import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import ContentCard from "../components/ContentCard";
import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { countAulas } from "@/app/lib/functions/countAulas";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";

type CursoCardSliderProps = {
  cursos: ICurso[];
  categorias: ICategoria[];
  userLogged: IUser;
};

export default function CursoCardSlider({
  userLogged,
  cursos,
  categorias,
}: CursoCardSliderProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm md:max-w-fit"
    >
      <CarouselContent className="overflow-hidden">
        {cursos.map((curso) => {
          return (
            <>
              <CarouselItem
                key={curso.id}
                className="md:flex gap-1 md:basis-1/2 xl:basis-1/3"
              >
                <ContentCard
                  className="md:flex-1"
                  curso={curso}
                  categorias={categorias}
                  numeroAulas={countAulas(curso)}
                  userLogged={userLogged}
                  numeroModulos={curso.modulos.length}
                />
              </CarouselItem>
            </>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
