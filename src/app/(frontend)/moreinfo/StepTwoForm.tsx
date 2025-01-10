"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "../components/PrimaryButton";
import { Button } from "@material-tailwind/react";
import H3 from "../components/H3";
import { updateUser } from "@/app/lib/actions/user/updateUser";

type StepTwoFormFormProps = {
  userLogged: IUser;
  setActualStep: Dispatch<SetStateAction<number>>;
  actualStep: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export default function StepTwoForm({
  loading,
  userLogged,
  setLoading,
  actualStep,
  setActualStep,
}: StepTwoFormFormProps) {
  const formik = useFormik({
    initialValues: {
      bio: userLogged.sobre || "",
    },
    validationSchema: yup.object().shape({
      bio: yup.string(),
    }),
    onSubmit: (values) => {
      setLoading(true);

      updateUser({
        idUser: userLogged.id,
        sobre: values.bio,
      })
        .then(() => {
          setActualStep(actualStep + 1);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <H3 className="mt-8 font-semibold">Fale mais sobre você</H3>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="w-full flex-1 flex flex-col"
      >
        <label htmlFor="fraseDestaque" className="flex flex-col mt-4">
          <p>Bio:</p>
          <textarea
            name="bio"
            value={values.bio}
            onChange={handleChange}
            placeholder="Quais são os seu interesses na academia, o que pretende aprender, os seus maiorers objectivos..."
            className={`outline-none mt-1 p-3 resize-none border-1 border-opacity-15 border-black focus:border-opacity-50 focus:border-myblue rounded-lg h-52 ${
              touched.bio && errors.bio && "border-danger"
            }`}
          ></textarea>
          <small className="text-danger">
            {touched.bio && errors.bio && errors.bio}
          </small>
        </label>
        <div className="py-6 flex justify-between items-center">
          <Button
            variant="text"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => setActualStep(actualStep + 1)}
          >
            Ignorar
          </Button>
          <PrimaryButton disabled={loading} type="submit">
            Próximo passo
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
