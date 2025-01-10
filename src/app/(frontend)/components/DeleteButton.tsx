import React from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { Button, ButtonProps } from "@nextui-org/button";

type DeleteButtonProps = ButtonProps;

export default function DeleteButton({ ...props }: DeleteButtonProps) {
  return (
    <Button color="danger" {...props}>
      <DeleteIcon className="w-full" width="2em" height="2em" />
    </Button>
  );
}
