import React from "react";
import Avatar from "./Avatar";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import { formatDateTime } from "@/app/lib/functions/formatDateTime";

type RespostaComentarioProps = {
  texto: string;
  fotoUsuario?: string;
  nomeUsuario: string;
  nome: string;
  sobrenome: string;
  data: Date;
  userLogged: IUser;
  setTextoInput: (texto: string) => void;
};

export default function RespostaComentario({
  fotoUsuario,
  nome,
  sobrenome,
  data,
  texto,
  setTextoInput,
  nomeUsuario,
  userLogged,
}: RespostaComentarioProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar foto={fotoUsuario} />
        <div className="flex flex-col gap-1 justify-center">
          <p className="font-medium text-xl capitalize">
            {nome} {sobrenome}{" "}
            <span className="font-bold">
              {nomeUsuario == userLogged.nomeUsuario && "(Eu)"}
            </span>
          </p>
          <small className="leading-none">
            {data.getDay() == new Date().getDay()
              ? `Hoje, ${data.getHours()}:${data.getMinutes()}`
              : formatDateTime(data)}
          </small>
        </div>
      </div>
      <p className="mt-2">{texto}</p>
      <div className="mt-4">
        <button
          className="mr-4 font-semibold hover:text-myblue"
          onClick={() => setTextoInput(`@${nomeUsuario}`)}
        >
          Responder
        </button>{" "}
      </div>
    </div>
  );
}
