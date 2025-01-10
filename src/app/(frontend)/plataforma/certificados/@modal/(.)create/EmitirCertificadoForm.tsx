"use client";

import { ICourse } from "@/app/(backend)/interfaces/objects/ICourse";
import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";
import { TailSpin } from "react-loading-icons";
import * as yup from "yup";

export default function EmitirCertificadoForm({
  cursos,
  users,
}: {
  cursos: ICourse[];
  users: IUser[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [imagem, setImagem] = React.useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      texto: "",
      cursoId: "",
      usuarioId: "",
    },

    validationSchema: yup.object().shape({
      texto: yup.string(),
      cursoId: yup.string().required("Qual o preço do curso?"),
      usuarioId: yup.string().required("Qual o preço do curso?"),
    }),

    onSubmit: (values) => {
      setLoading(true);

      const form = new FormData();

      form.append("imagem", imagem.file);
      form.append("texto", values.texto);
      form.append("cursoId", values.cursoId);
      form.append("usuarioId", values.usuarioId);

      api
        .post("/api/certificados", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((certificadoCreated) => {
          console.log(certificadoCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Certificado emitido com sucesso!",
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
  const { values, errors, touched, handleSubmit, setValues } = formik;

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div
        className={`bg-cover bg-center w-full h-48 flex flex-col items-center justify-center`}
        style={{
          backgroundImage:
            imagem.file && `url(${URL.createObjectURL(imagem.file)})`,
        }}
      >
        {!imagem.loading ? (
          <>
            <Dropzone
              onDrop={(acceptedFiles) => {
                const acceptedMimetypes = ["image/jpeg", "image/png"];

                if (!acceptedMimetypes.includes(acceptedFiles[0].type)) {
                  return setImagem({
                    ...imagem,
                    error: "O ficheiro deve ser uma foto, do tipo jpg ou png",
                  });
                }
                const reader = new FileReader();

                reader.onloadstart = (e: ProgressEvent<FileReader>) => {
                  console.log(e.total);
                  setImagem({
                    ...imagem,
                    progress: 0,
                    loading: true,
                    totalBytes: e.total,
                    error: "",
                  });
                };

                reader.onprogress = (e: ProgressEvent<FileReader>) => {
                  console.log(e.loaded);
                  setImagem({
                    ...imagem,
                    totalBytes: e.total,
                    loading: true,
                    progress: e.loaded,
                  });
                };

                reader.onloadend = () => {
                  setImagem({
                    ...imagem,
                    loading: false,
                    file: acceptedFiles[0],
                  });
                };

                reader.readAsArrayBuffer(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }: DropzoneState) => (
                <section
                  className={`w-full h-full ${imagem.error && "border-danger"}`}
                >
                  <div
                    {...getRootProps({
                      className: `dropzone border-1 h-full flex items-center justify-center ${
                        imagem.error && "border-danger"
                      }`,
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Solte aqui ou clique para seleccionar a imagem do curso
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </>
        ) : (
          <Progress
            aria-label="Loading..."
            maxValue={imagem.totalBytes}
            value={imagem.progress}
            showValueLabel
            className="max-w-lg"
          />
        )}
        <p className="text-danger mt-2">{imagem.error && imagem.error}</p>
      </div>
      <label htmlFor="">
        <p>Texto:</p>
        <textarea
          maxLength={500}
          name="comentar"
          placeholder="Digite a resposta"
          // value={textoInput}
          id=""
          className="flex-1 border-1 p-3 border-black border-opacity-25 rounded-xl resize-none h-fit w-full"
          // onChange={(e) => setTextoInput(e.target.value)}
        ></textarea>
      </label>

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
                  <span className="font-semibold">{curso.titulo}</span> -{" "}
                  {curso.preco} AOA
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <small className="text-red-500">
          {touched.cursoId && errors.cursoId}
        </small>
      </label>

      <label className="flex flex-col gap-1">
        <p>Usuário:</p>
        <Select
          onValueChange={(value) => {
            setValues({ ...values, usuarioId: value });
          }}
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="Selecione o Usuário" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => {
              return (
                <SelectItem key={user.id} value={user.id}>
                  @{user.nomeUsuario} -{" "}
                  <span className="capitalize">
                    {user.nome} {user.sobrenome}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <small className="text-red-500">
          {touched.usuarioId && errors.usuarioId}
        </small>
      </label>

      <div className="flex justify-end">
        <Button
          variant="light"
          color="danger"
          onPress={() => router.back()}
          type="button"
        >
          <span>Cancelar</span>
        </Button>

        <PrimaryButton
          type="submit"
          disabled={
            (imagem.loading ||
              loading ||
              errors.texto ||
              errors.cursoId ||
              errors.usuarioId ||
              !imagem.file) as boolean
          }
        >
          {!loading ? "Adicionar Curso" : <TailSpin width={30} height={30} />}
        </PrimaryButton>
      </div>
    </form>
  );
}
