"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TailSpin } from "react-loading-icons";
import * as yup from "yup";
import { useToast } from "@/hooks/use-toast";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { updateUser } from "@/app/lib/actions/user/updateUser";
import { isPasswordCorrect } from "@/app/lib/actions/user/isPasswordCorrect";
import InputPassword from "@/app/(frontend)/components/InputPassword";

type EditarEmailModalButtonProps = {
  userLogged: IUser;
  children: React.ReactNode;
};

export default function EditarEmailModalButton({
  userLogged,
  children,
}: EditarEmailModalButtonProps) {
  // Route Hooks
  const router = useRouter();

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      senhaActual: "",
      senhaNova: "",
      confirmarSenhaNova: "",
    },

    validationSchema: yup.object().shape({
      senhaActual: yup.string().required("Qual o preço do curso?"),
      senhaNova: yup
        .string()
        .required("Qual o preço do curso?")
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
          "A senha deve ter no mínimo uma letra maiúscula, uma letra minúscula e pelo menos 1 número"
        ),
      confirmarSenhaNova: yup.string().required("Qual o preço do curso?"),
    }),

    onSubmit: (values, { setErrors }) => {
      if (!isPasswordCorrect(values.senhaActual, userLogged.senha)) {
        return setErrors({ senhaActual: "Senha incorrecta!" });
      }

      if (values.senhaNova !== values.confirmarSenhaNova) {
        return setErrors({
          confirmarSenhaNova: "Confirmação da senha",
        });
      }

      // if (!isAdminOrSuper(userLogged) && actualStep == 1) {
      //   return setActualStep(actualStep + 1);
      // }

      setLoading(true);

      updateUser({
        senha: values.senhaNova,
        repetirSenha: values.confirmarSenhaNova,
        idUser: userLogged.id,
      })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Senha actualizada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          onOpenChange();

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

  const { values, errors, touched, handleSubmit, handleChange, setValues } =
    formik;

  // States Hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [actualStep] = useState<number>(1);

  // Modal Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { toast } = useToast();

  return (
    <>
      <button onClick={onOpen} className="absolute right-4 top-6">
        {children}
      </button>
      <Modal
        size="3xl"
        className="bg-white rounded-xl py-6 drop-shadow-2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setValues({
            ...values,
            senhaActual: "",
            senhaNova: "",
            confirmarSenhaNova: "",
          });
        }}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl">Alterar Senha</ModalHeader>
              <form method="post" onSubmit={handleSubmit}>
                <ModalBody className="flex gap-y-6">
                  {actualStep == 1 && (
                    <>
                      <InputPassword
                        label="Senha Actual: *"
                        placeholder="Digite aqui a sua senha"
                        name="senhaActual"
                        value={values.senhaActual}
                        onChange={handleChange}
                        className={`${
                          touched.senhaActual &&
                          errors.senhaActual &&
                          "border-danger"
                        }`}
                        error={
                          touched.senhaActual &&
                          errors.senhaActual &&
                          errors.senhaActual
                        }
                      />

                      <InputPassword
                        label="Senha Nova: *"
                        placeholder="Digite aqui a sua senha"
                        name="senhaNova"
                        value={values.senhaNova}
                        onChange={handleChange}
                        className={`${
                          touched.senhaNova &&
                          errors.senhaNova &&
                          "border-danger"
                        }`}
                        error={
                          touched.senhaNova &&
                          errors.senhaNova &&
                          errors.senhaNova
                        }
                      />

                      <InputPassword
                        label="Confirme a Senha Nova: *"
                        placeholder="Digite aqui a sua senha"
                        name="confirmarSenhaNova"
                        value={values.confirmarSenhaNova}
                        onChange={handleChange}
                        className={`${
                          touched.confirmarSenhaNova &&
                          errors.confirmarSenhaNova &&
                          "border-danger"
                        }`}
                        error={
                          touched.confirmarSenhaNova &&
                          errors.confirmarSenhaNova &&
                          errors.confirmarSenhaNova
                        }
                      />
                    </>
                  )}
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

                  <PrimaryButton
                    type="submit"
                    disabled={
                      (loading ||
                        errors.confirmarSenhaNova ||
                        errors.senhaActual ||
                        errors.senhaNova) as boolean
                    }
                  >
                    {!loading ? (
                      "Alterar Senha"
                    ) : (
                      <TailSpin width={30} height={30} />
                    )}
                  </PrimaryButton>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
