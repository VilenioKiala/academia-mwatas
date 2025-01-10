"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { TailSpin } from "react-loading-icons";
import * as yup from "yup";
import PrimaryButton from "../../components/PrimaryButton";
import InputText from "../../components/InputText";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";

type AdicionarCursoModalButtonProps = {
  nomeCategoria: string;
  categoriaId: string;
};

export default function AdicionarCursoModalButton({
  nomeCategoria,
  categoriaId,
}: AdicionarCursoModalButtonProps) {
  // Route Hooks
  const router = useRouter();

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      titulo: "",
      fraseDestaque: "",
      sobreOCurso: "",
      preco: "0",
    },

    validationSchema: yup.object().shape({
      titulo: yup.string().required("O título do Curso é obrigatório"),
      fraseDestaque: yup.string(),
      sobreOCurso: yup.string(),
      preco: yup.number().required("Qual o preço do curso?"),
    }),

    onSubmit: (values) => {
      setLoading(true);

      const form = new FormData();

      form.append("coverCurso", coverCurso.file);
      form.append("titulo", values.titulo);
      form.append("fraseDestaque", values.fraseDestaque);
      form.append("sobreOCurso", values.sobreOCurso);
      form.append("preco", values.preco);
      form.append("categoriaId", categoriaId);

      api
        .post("/api/cursos", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((categoriaCreated) => {
          console.log(categoriaCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Curso criado com sucesso!",
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
  const [coverCurso, setCoverCurso] = useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Modal Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { toast } = useToast();

  return (
    <div>
      <PrimaryButton onClick={onOpen}>Adicionar Curso</PrimaryButton>
      <Modal
        size="3xl"
        className="bg-white rounded-xl py-6 drop-shadow-2xl relative z-[150]"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setValues({
            ...values,
            titulo: "",
            fraseDestaque: "",
            preco: "0",
            sobreOCurso: "",
          });
        }}
        scrollBehavior="outside"
      >
        <ModalContent className="z-[150] relative">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl">
                Adicionar Curso para a categoria {`\"${nomeCategoria}\"`}
              </ModalHeader>
              <form method="post" onSubmit={handleSubmit}>
                <ModalBody>
                  <div
                    className={`bg-cover bg-center w-full h-48 flex flex-col items-center justify-center`}
                    style={{
                      backgroundImage:
                        coverCurso.file &&
                        `url(${URL.createObjectURL(coverCurso.file)})`,
                    }}
                  >
                    {!coverCurso.loading ? (
                      <>
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            const acceptedMimetypes = [
                              "image/jpeg",
                              "image/png",
                            ];

                            if (
                              !acceptedMimetypes.includes(acceptedFiles[0].type)
                            ) {
                              return setCoverCurso({
                                ...coverCurso,
                                error:
                                  "O ficheiro deve ser uma foto, do tipo jpg ou png",
                              });
                            }
                            const reader = new FileReader();

                            reader.onloadstart = (
                              e: ProgressEvent<FileReader>
                            ) => {
                              console.log(e.total);
                              setCoverCurso({
                                ...coverCurso,
                                progress: 0,
                                loading: true,
                                totalBytes: e.total,
                                error: "",
                              });
                            };

                            reader.onprogress = (
                              e: ProgressEvent<FileReader>
                            ) => {
                              console.log(e.loaded);
                              setCoverCurso({
                                ...coverCurso,
                                totalBytes: e.total,
                                loading: true,
                                progress: e.loaded,
                              });
                            };

                            reader.onloadend = () => {
                              setCoverCurso({
                                ...coverCurso,
                                loading: false,
                                file: acceptedFiles[0],
                              });
                            };

                            reader.readAsArrayBuffer(acceptedFiles[0]);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section
                              className={`w-full h-full ${
                                coverCurso.error && "border-danger"
                              }`}
                            >
                              <div
                                {...getRootProps({
                                  className: `dropzone border-1 h-full flex items-center justify-center ${
                                    coverCurso.error && "border-danger"
                                  }`,
                                })}
                              >
                                <input {...getInputProps()} />
                                <p>
                                  Solte aqui ou clique para seleccionar a imagem
                                  do curso
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </>
                    ) : (
                      <Progress
                        aria-label="Loading..."
                        maxValue={coverCurso.totalBytes}
                        value={coverCurso.progress}
                        showValueLabel
                        className="max-w-lg"
                      />
                    )}
                    <p className="text-danger mt-2">
                      {coverCurso.error && coverCurso.error}
                    </p>
                  </div>
                  <InputText
                    label="Título: *"
                    placeholder="Digite aqui o titulo do curso"
                    type="text"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                    className={`${
                      touched.titulo && errors.titulo && "border-danger"
                    }`}
                  />
                  <small className="text-danger">
                    {touched.titulo && errors.titulo && errors.titulo}
                  </small>

                  <label htmlFor="fraseDestaque" className="flex flex-col">
                    <p>Frase de Destaque:</p>
                    <textarea
                      name="fraseDestaque"
                      value={values.fraseDestaque}
                      onChange={handleChange}
                      placeholder="Digite a frase de destaque"
                      className={`outline-none mt-1 p-3 resize-none border-1 border-opacity-15 border-black focus:border-opacity-50 focus:border-myblue rounded-lg ${
                        touched.fraseDestaque &&
                        errors.fraseDestaque &&
                        "border-danger"
                      }`}
                    ></textarea>
                    <small className="text-danger">
                      {touched.fraseDestaque &&
                        errors.fraseDestaque &&
                        errors.fraseDestaque}
                    </small>
                  </label>

                  <label htmlFor="sobreOCurso" className="flex flex-col">
                    <p>Sobre o Curso:</p>
                    <textarea
                      name="sobreOCurso"
                      value={values.sobreOCurso}
                      onChange={handleChange}
                      className={`outline-none mt-1 p-3 resize-none border-1 border-opacity-15 border-black focus:border-opacity-50 focus:border-myblue rounded-lg ${
                        touched.sobreOCurso &&
                        errors.sobreOCurso &&
                        "border-danger"
                      }`}
                      placeholder="Fale mais sobre este curso, mais informações"
                    ></textarea>
                    <small className="text-danger">
                      {touched.sobreOCurso &&
                        errors.sobreOCurso &&
                        errors.sobreOCurso}
                    </small>
                  </label>
                  <div>
                    <Input
                      label="Preço"
                      type="number"
                      name="preco"
                      labelPlacement="outside"
                      className={`${
                        touched.preco && errors.preco && "border-danger"
                      }`}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span>AOA</span>
                        </div>
                      }
                      onValueChange={(preco) => {
                        setValues({ ...values, preco: preco.toString() });
                      }}
                      value={values.preco.toString()}
                    />
                    <small className="text-danger">
                      {touched.preco && errors.preco && errors.preco}
                    </small>
                  </div>
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
                      (coverCurso.loading ||
                        loading ||
                        errors.preco ||
                        errors.titulo ||
                        errors.sobreOCurso ||
                        errors.fraseDestaque ||
                        !coverCurso.file) as boolean
                    }
                  >
                    {!loading ? (
                      "Adicionar Curso"
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
