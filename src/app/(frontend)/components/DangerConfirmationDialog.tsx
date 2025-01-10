import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/modal";
import React from "react";
import DangerIcon from "../icons/DangerIcon";

type DangerConfirmationDialogProps = {
  confirmationAction: () => Promise<void>;
  isOpen: boolean;
  onOpenChange: () => void;
  titulo: string;
  descricao: string;
} & ModalProps;

export default function DangerConfirmationDialog({
  confirmationAction,
  isOpen,
  onOpenChange,
  descricao,
  titulo,
  ...props
}: DangerConfirmationDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      size="2xl"
      onOpenChange={onOpenChange}
      className="p-4 relative z-[2000]"
      {...props}
    >
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalHeader className="flex justify-center">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-50">
                  <DangerIcon />
                </div>
              </ModalHeader>
              <ModalBody className="text-center">
                <p className="font-bold">{titulo}</p>
                <p>{descricao}</p>
              </ModalBody>
              <ModalFooter className="items-center justify-center flex">
                <Button
                  variant="flat"
                  color="danger"
                  className="flex-1 py-8"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  color="success"
                  className="flex-1 py-8"
                  onPress={async () => {
                    onClose();
                    await confirmationAction();
                  }}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
}
