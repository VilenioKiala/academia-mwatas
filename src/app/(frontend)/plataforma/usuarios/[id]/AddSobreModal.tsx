"use client";

import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from "yup";

type AddSobreModalProps = {
  userLogged: IUser;
  children: React.ReactNode;
};

export default function AddSobreModal({
  userLogged,
  children,
}: AddSobreModalProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      bio: userLogged.sobre || "",
    },
    validationSchema: yup.object().shape({
      bio: yup.string().required(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const form = new FormData();

      form.append("sobre", values.bio);

      api
        .put(`/api/users/${userLogged.id}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Bio actualizada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Editar Bio
            </DialogTitle>
            <DialogDescription>
              <form method="POST" onSubmit={handleSubmit}>
                <textarea
                  name="bio"
                  value={values.bio}
                  onChange={handleChange}
                  className="w-full h-32 resize-none p-4 outline-none mt-4 border-1 border-black dark:border-white dark:border-opacity-15 border-opacity-20"
                  placeholder="Adicione a sua bio aqui!"
                />
                <div className="flex justify-end mt-3">
                  <PrimaryButton
                    type="submit"
                    disabled={loading || values.bio.length == 0}
                  >
                    Salvar
                  </PrimaryButton>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
