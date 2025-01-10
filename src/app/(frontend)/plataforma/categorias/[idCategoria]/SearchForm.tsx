"use client";

import InputText from "@/app/(frontend)/components/InputText";
import SearchIcon from "@/app/(frontend)/icons/SearchIcon";
import { useFormik } from "formik";
import React from "react";

type SearchFormProps = {
  initialValue?: string;
};

export default function SearchForm({ initialValue }: SearchFormProps) {
  const formik = useFormik({
    initialValues: {
      search: initialValue || "",
    },
    onSubmit: () => {},
  });

  const { handleChange, values } = formik;

  return (
    <form action="" method="GET" className="flex">
      <InputText
        onChange={handleChange}
        type="text"
        name="search"
        value={values.search}
        leftIcon={
          <>
            <SearchIcon />
          </>
        }
        placeholder="Pesquisar Curso"
      />
    </form>
  );
}
