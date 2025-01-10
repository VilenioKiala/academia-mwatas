"use client";

import InputText from "@/app/(frontend)/components/InputText";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import SuccessMessage from "@/app/(frontend)/components/SuccessMessage";
import { createModulo } from "@/app/lib/actions/modulo/createModulo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { TailSpin } from "react-loading-icons";

type AdicionarModuloModalButtonProps = {
  nomeCurso: string;
  cursoId: string;
};

export default function AdicionarModuloModalButton({
  nomeCurso,
  cursoId,
}: AdicionarModuloModalButtonProps) {
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [moduloData, setModuloData] = useState({
    titulo: "",
  });

  const { toast } = useToast();

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setModuloData({
      ...moduloData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    createModulo({ titulo: moduloData.titulo, cursoId })
      .then((categoriaCreated) => {
        console.log(categoriaCreated);

        toast({
          variant: "default",
          title: "Operação bem sucedida!",
          description: "Módulo criado com sucesso!",
          className: "bg-green-500 text-white border-1 border-green-800",
        });

        onOpenChange();

        setSuccessMessage("");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <PrimaryButton onClick={onOpen}>Adicionar Módulo</PrimaryButton>
      <Modal
        size="3xl"
        className="bg-white rounded-xl py-6 drop-shadow-2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setModuloData({ ...moduloData, titulo: "" });
          setSuccessMessage("");
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl">
                Adicionar Módulo para o curso {`\"${nomeCurso}\"`}
              </ModalHeader>
              <form method="post" onSubmit={handleSubmit}>
                <ModalBody>
                  {successMessage && (
                    <SuccessMessage className="mx-5">
                      {successMessage}
                    </SuccessMessage>
                  )}

                  <InputText
                    label="Título: *"
                    placeholder="Digite aqui o titulo do módulo"
                    type="text"
                    name="titulo"
                    value={moduloData.titulo}
                    onChange={handleChange}
                  />
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

                  <PrimaryButton type="submit" disabled={loading}>
                    {!loading ? (
                      "Adicionar Módulo"
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
    </div>
  );
}
