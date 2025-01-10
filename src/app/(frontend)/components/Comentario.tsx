"use client";

import React, { SyntheticEvent, useState } from "react";
import Avatar from "./Avatar";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "./PrimaryButton";
import { IRespostaComentario } from "@/app/(backend)/interfaces/objects/IRespostaComentario";
import { api } from "@/app/lib/api/axios";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import RespostaComentario from "./RespostaComentario";
import { useToast } from "@/hooks/use-toast";
import { createRespostaComentario } from "@/app/lib/actions/respostaComentario/createRespostaComentario";
import { formatDateTime } from "@/app/lib/functions/formatDateTime";

type ComentarioProps = {
  texto: string;
  fotoUsuario?: string;
  nomeUsuario: string;
  nome: string;
  sobrenome: string;
  data: Date;
  userLogged: IUser;
  comentarioId: string;
  reprovado: boolean;
};

export default function Comentario({
  nome,
  sobrenome,
  data,
  texto,
  fotoUsuario,
  userLogged,
  comentarioId,
  reprovado,
}: ComentarioProps) {
  const [inputLoading, setInputLoading] = useState<boolean>(false);
  const [responsesLoading, setResponsesLoading] = useState<boolean>(false);
  const [textoInput, setTextoInput] = useState("");
  const [showResponderInput, setShowResponderInput] = useState<boolean>(false);
  const [showRespostas, setShowRespostas] = useState<boolean>(false);
  const [respostas, setRespostas] = useState<IRespostaComentario[]>([]);

  const { toast } = useToast();

  async function getRespostas() {
    setResponsesLoading(true);
    const respostasFromDB = (
      await api.get<IRespostaComentario[]>(
        `/api/respostascomentario?comentarioId=${comentarioId}`
      )
    ).data;

    setRespostas([...respostasFromDB]);
    setResponsesLoading(false);
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    setInputLoading(true);

    await createRespostaComentario(textoInput, userLogged.id, comentarioId);

    toast({
      variant: "default",
      title: "Operação bem sucedida!",
      description: "Resposta enviada com sucesso!",
      className: "bg-green-500 text-white border-1 border-green-800",
    });

    setTextoInput("");
    setInputLoading(false);
  }

  return (
    <div className={`relative`}>
      {reprovado && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-end font-medium">
          Comentário Reprovado
        </div>
      )}
      <div className={`flex items-center gap-2 ${reprovado && "opacity-40"}`}>
        <Avatar foto={fotoUsuario} />
        <div className="flex flex-col gap-1 justify-center">
          <p className="font-medium text-xl capitalize">
            {nome} {sobrenome}
          </p>
          <small className="leading-none">
            {data.getDay() == new Date().getDay()
              ? `Hoje, ${data.getHours()}:${data.getMinutes()}`
              : formatDateTime(data)}
          </small>
        </div>
      </div>
      <p className="mt-2">{texto}</p>
      <div className="mt-4 text-foreground">
        <button
          className="mr-4 font-semibold hover:text-myblue"
          onClick={() => {
            setShowResponderInput(!showResponderInput);
          }}
          disabled={reprovado}
        >
          <p>Responder</p>
        </button>{" "}
        <span>| </span>
        <button
          className="ml-4 font-semibold hover:text-myblue transition-all"
          onClick={async () => {
            setShowRespostas(!showRespostas);
            if (respostas.length == 0) {
              await getRespostas();
            }
          }}
          disabled={reprovado}
        >
          <p>
            {!showRespostas ? <>Mostrar Respostas</> : <>Ocultar Respostas</>}
          </p>
        </button>
      </div>
      <div className="pl-14 mt-2">
        {showRespostas &&
          (responsesLoading ? (
            <TailSpin
              className="mt-6"
              stroke="#4C78CA"
              width={50}
              height={50}
            />
          ) : (
            respostas.map((resposta) => {
              return (
                <div key={resposta.id} className="my-6">
                  <RespostaComentario
                    data={new Date(resposta.createdAt)}
                    nome={resposta.usuario.nome}
                    sobrenome={resposta.usuario.sobrenome}
                    texto={resposta.texto}
                    userLogged={userLogged}
                    fotoUsuario={resposta.usuario.profilePic as string}
                    nomeUsuario={resposta.usuario.nomeUsuario}
                    setTextoInput={setTextoInput}
                  />
                </div>
              );
            })
          ))}

        {(showResponderInput || showRespostas) && (
          <form onSubmit={handleSubmit} method="POST">
            <div className="flex gap-2 mt-2">
              <Avatar foto={userLogged.profilePic as string} />
              <textarea
                maxLength={500}
                name="comentar"
                placeholder="Digite a resposta"
                value={textoInput}
                id=""
                className="flex-1 border-1 p-3 border-black border-opacity-25 rounded-xl resize-none h-28"
                onChange={(e) => setTextoInput(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full flex justify-end items-center gap-4">
              <p>{textoInput.length}/500</p>
              <PrimaryButton loading={inputLoading || textoInput.length == 0}>
                Adicionar Resposta
              </PrimaryButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
