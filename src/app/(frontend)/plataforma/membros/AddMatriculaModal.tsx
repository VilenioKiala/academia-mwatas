"use client";

import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from "yup";
import TabelaMatricula from "./TabelaMatricula";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { parseAbsoluteToLocal } from "@internationalized/date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateInput } from "@nextui-org/date-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import { createMatricula } from "@/app/lib/actions/matricula/createMatricula";

type AddMatriculaModalProps = {
  cursos: ICurso[];
  user: IUser;
  children: React.ReactNode;
};

export default function AddMatriculaModal({
  cursos,
  user,
  children,
}: AddMatriculaModalProps) {
  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      cursoId: "",
      dataExpiracao: parseAbsoluteToLocal(new Date().toISOString()),
    },

    validationSchema: yup.object().shape({
      cursoId: yup.string().required("O curso é obrigatório!"),
      dataExpiracao: yup.string().required("A data de Expiração é obrigatória"),
    }),

    onSubmit: (values, { setErrors }) => {
      if (
        values.dataExpiracao.compare(
          parseAbsoluteToLocal(new Date().toISOString())
        ) <= 0
      ) {
        setErrors({
          ...errors,
          dataExpiracao: "Data inválida, selecione uma data futura",
        });
        return;
      }
      setLoading(true);

      const { cursoId, dataExpiracao } = values;

      createMatricula({
        cursoId: cursoId,
        dataExpiracao: dataExpiracao.toDate(),
        userId: user.id,
      })
        .then((matriculaCreated) => {
          console.log(matriculaCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Matrícula criada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          router.back();

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

  const { handleSubmit, setValues, values, errors, touched, setErrors } =
    formik;

  console.log(values);

  // const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl">
              Controle de Matricula
            </DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleSubmit}
                method="POST"
                className="flex flex-col gap-3 relative z-[2000] my-4"
              >
                <div className="w-full max-w-xl flex flex-col">
                  <DateInput
                    granularity="second"
                    label="Data de Expiração:"
                    onChange={(value) =>
                      setValues({
                        ...values,
                        dataExpiracao: parseAbsoluteToLocal(
                          value.toDate().toISOString()
                        ),
                      })
                    }
                    labelPlacement="outside"
                    value={values.dataExpiracao}
                    className="text-2xl"
                    onBlur={() => setErrors({ ...errors })}
                  />
                  <small className="text-red-500">
                    <p>
                      {touched.dataExpiracao &&
                        (errors.dataExpiracao as string)}
                    </p>
                  </small>
                </div>
                <label className="flex flex-col gap-1">
                  <p>Curso:</p>
                  <Select
                    onValueChange={(value) => {
                      setValues({ ...values, cursoId: value });
                    }}
                  >
                    <SelectTrigger className="py-6">
                      <SelectValue placeholder="Selecione o Curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {cursos.map((curso) => {
                        return (
                          <SelectItem key={curso.id} value={curso.id}>
                            <span className="font-semibold">
                              {curso.titulo}
                            </span>{" "}
                            - {curso.preco} AOA
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <small className="text-red-500">
                    {touched.cursoId && errors.cursoId}
                  </small>
                </label>

                <div className="flex items-center gap-4 justify-end">
                  <Button
                    onClick={() => router.back()}
                    variant="light"
                    color="danger"
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <PrimaryButton type="submit" disabled={loading}>
                    Adicionar Matrícula
                  </PrimaryButton>
                </div>
              </form>
              <TabelaMatricula user={user} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <div>
        <button onClick={onOpen}>{children}</button>
        <Modal
          size="3xl"
          className="bg-white rounded-xl py-6 drop-shadow-2xl relative"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={() => {
            onOpenChange();
            setValues({ ...values, cursoId: "", dataExpiracao: undefined });
          }}
          scrollBehavior="outside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <H1 className="mt-5">Controle de Matrículas</H1>
                </ModalHeader>
                <ModalBody className="relative z-50">
                  

                  <TabelaMatricula user={user} />
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="light"
                    color="danger"
                    onPress={onClose}
                    type="button"
                  >
                    <span>Cancelar</span>
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div> */}
    </>
  );
}
