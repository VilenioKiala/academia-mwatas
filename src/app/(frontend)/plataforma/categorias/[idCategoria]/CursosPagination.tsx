"use client";

import { appURL } from "@/app/lib/api/axios";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type CursosPaginationProps = {
  page: number;
  totalPages: number;
};

export default function CursosPagination({
  page,
  totalPages,
}: CursosPaginationProps) {
  const router = useRouter();

  const path = usePathname();

  const searchParams = useSearchParams();

  const getItemProps = (index: number) => ({
    className: page === index && "bg-myblue",
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      const search = new URLSearchParams(searchParams);

      search.set("page", index.toString());

      router.push(`${appURL}${path}?${search.toString()}`);
    },
  });

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
              placeholder={undefined}
              onPointerLeaveCapture={undefined}
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

  return (
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
  );
}
