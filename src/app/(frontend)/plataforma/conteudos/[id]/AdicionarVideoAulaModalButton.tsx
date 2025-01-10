"use client";

import InputText from "@/app/(frontend)/components/InputText";
import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
import { api } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import {
  DateValue,
  parseAbsoluteToLocal,
  ZonedDateTime,
} from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import Dropzone from "react-dropzone";
import { TailSpin } from "react-loading-icons";
import * as yup from "yup";

type AdicionarVideoAulaModalButtonProps = {
  nomeModulo: string;
  moduloId: string;
};

export default function AdicionarVideoAulaModalButton({
  nomeModulo,
  moduloId,
}: AdicionarVideoAulaModalButtonProps) {
  const abortController = React.useRef<AbortController | null>(null);

  // Router hooks
  const router = useRouter();

  const [requestLoading, setRequestLoading] = React.useState<boolean>(false);
  const [requestProgress, setRequestProgress] = React.useState({
    total: 0,
    loaded: 0,
  });
  const [duracao, setDuracao] = React.useState<number>(0);

  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      titulo: "",
      descricao: "",
      agendamento: "agora",
    },

    validationSchema: yup.object().shape({
      titulo: yup.string().required("O título da aula é obrigatório."),
      descricao: yup.string(),
    }),

    onSubmit: (values) => {
      if (values.agendamento !== "agora") {
        if (
          dataAgendamento.compare(
            parseAbsoluteToLocal(new Date().toISOString())
          ) <= 0
        ) {
          setErrors({
            ...errors,
            agendamento: "Data inválida, selecione uma data futura",
          });
          return;
        }
      }

      setLoading(true);
      abortController.current = new AbortController();

      const form = new FormData();

      form.append("video", video.file);
      form.append("titulo", values.titulo);
      form.append("descricao", values.descricao);
      form.append("duracao", duracao.toString());
      form.append("dataAgendamento", dataAgendamento.toDate().toISOString());
      form.append("moduloId", moduloId);

      setRequestLoading(true);

      api
        .post("/api/videoaulas", form, {
          signal: abortController.current.signal,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress(progressEvent) {
            setRequestProgress({
              loaded: progressEvent.loaded,
              total: progressEvent.total,
            });
          },
        })
        .then((videoAulaCreated) => {
          console.log(videoAulaCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Vídeo aula criada com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

          onOpenChange();

          router.refresh();
        })
        .catch((e) => {
          if (e.name == "AbortError") {
            setLoading(false);
            setRequestLoading(false);
            abortController.current = null;
          }

          console.log(e);
        })
        .finally(() => {
          setLoading(false);
          setRequestLoading(false);
        });
    },
  });

  // State hooks
  const [video, setVideo] = useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: null,
    error: "",
  });
  const [dataAgendamento, setDataAgendamento] = useState(
    parseAbsoluteToLocal(new Date().toISOString())
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Modal Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
    touched,
    setErrors,
  } = formik;

  const cancelRequest = () =>
    abortController.current && abortController.current.abort();

  return (
    <div>
      <PrimaryButton onClick={onOpen}>Criar Vídeo Aula</PrimaryButton>
      <Modal
        size="3xl"
        className="bg-white rounded-xl py-6 drop-shadow-2xl relative"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={() => {
          if (abortController.current) {
            return cancelRequest();
          }
          onOpenChange();
          setValues({ ...values, titulo: "", descricao: "" });
          setVideo({
            loading: false,
            progress: 0,
            totalBytes: 0,
            file: null,
            error: "",
          });
        }}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {requestLoading && (
                <div className="fixed w-full h-full top-0 left-0 bg-white bg-opacity-45">
                  <Progress
                    aria-label="Loading..."
                    className="max-w-md"
                    color="success"
                    size="sm"
                    maxValue={requestProgress.total}
                    value={requestProgress.loaded}
                  />
                </div>
              )}
              <ModalHeader className="text-xl">
                Adicionar Vídeo Aula para o módulo {`\"${nomeModulo}\"`}
              </ModalHeader>
              <form method="POST" onSubmit={handleSubmit}>
                <ModalBody>
                  <div
                    className={`bg-cover bg-center w-full h-48 flex items-center justify-center gap-x-2`}
                  >
                    {video.file && !video.loading && (
                      <div className="flex-1">
                        <video
                          controls
                          width={500}
                          height={500}
                          className="aspect-video"
                          onLoadedMetadata={(
                            e: SyntheticEvent<HTMLVideoElement> & {
                              target: { duration: number };
                            }
                          ) => {
                            setDuracao(e.target?.duration);
                          }}
                          autoPlay
                        >
                          <source src={URL.createObjectURL(video.file)} />
                        </video>
                      </div>
                    )}
                    {!video.loading ? (
                      <div className="flex-1 flex flex-col h-full">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            const acceptedMimetypes = ["video/mp4"];

                            if (
                              !acceptedMimetypes.includes(acceptedFiles[0].type)
                            ) {
                              return setVideo({
                                ...video,
                                error: "O ficheiro deve ser um, do tipo mp4",
                              });
                            }

                            const reader = new FileReader();

                            reader.onloadstart = (
                              e: ProgressEvent<FileReader>
                            ) => {
                              console.log(e.total);
                              setVideo({
                                ...video,
                                progress: 0,
                                loading: true,
                                totalBytes: e.total,
                              });
                            };

                            reader.onprogress = (
                              e: ProgressEvent<FileReader>
                            ) => {
                              console.log(e.loaded);
                              setVideo({
                                ...video,
                                totalBytes: e.total,
                                loading: true,
                                progress: e.loaded,
                              });
                            };

                            reader.onloadend = () => {
                              setVideo({
                                ...video,
                                loading: false,
                                file: acceptedFiles[0],
                                error: "",
                              });
                            };

                            reader.readAsArrayBuffer(acceptedFiles[0]);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section
                              className={`border-1 w-full h-full flex-1 cursor-pointer ${
                                video.error && "border-danger"
                              }`}
                            >
                              <div
                                {...getRootProps({
                                  className: `dropzone h-full flex items-center justify-center w-full ${
                                    video.error && "border-danger"
                                  }`,
                                })}
                              >
                                <input {...getInputProps()} />

                                <p>
                                  Solte aqui ou clique para seleccionar a Vídeo
                                  aula do módulo
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                        <p className="text-danger mt-2">
                          {video.error && video.error}
                        </p>
                      </div>
                    ) : (
                      <Progress
                        aria-label="Loading..."
                        maxValue={video.totalBytes}
                        value={video.progress}
                        showValueLabel
                        className="max-w-lg"
                      />
                    )}
                  </div>
                  <InputText
                    label="Título: *"
                    placeholder="Digite aqui o titulo da Aula"
                    type="text"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                  />
                  <small className="text-danger">
                    {touched.titulo && errors.titulo && errors.titulo}
                  </small>

                  <label htmlFor="sobreOCurso" className="flex flex-col">
                    <p>Descrição da Vídeo Aula:</p>
                    <textarea
                      name="descricao"
                      value={values.descricao}
                      onChange={handleChange}
                    ></textarea>
                    <small className="text-danger">
                      {touched.descricao &&
                        errors.descricao &&
                        errors.descricao}
                    </small>
                  </label>

                  <RadioGroup label="Agendamento">
                    <Radio
                      value="agora"
                      name="agendamento"
                      checked={values.agendamento === "agora"}
                      onChange={() => {
                        setValues({ ...values, agendamento: "agora" });
                      }}
                    >
                      Postar Agora
                    </Radio>

                    <Radio
                      value="agendar"
                      name="agendamento"
                      onChange={() => {
                        setValues({ ...values, agendamento: "agendar" });
                      }}
                    >
                      Agendar para depois
                    </Radio>
                  </RadioGroup>

                  {values.agendamento !== "agora" && (
                    <div>
                      <DateInput
                        granularity="second"
                        label="Agendar Para:"
                        onChange={(data: DateValue) =>
                          setDataAgendamento(data as ZonedDateTime)
                        }
                        labelPlacement="outside"
                        className="text-2xl"
                        onBlur={() => setErrors({ ...errors, agendamento: "" })}
                      />
                      <small className="text-danger">
                        {touched.agendamento &&
                          errors.agendamento &&
                          errors.agendamento}
                      </small>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="light"
                    color="danger"
                    onPress={() => {
                      if (abortController.current) {
                        return cancelRequest();
                      }
                      onClose();
                    }}
                    type="button"
                  >
                    <span>Cancelar</span>
                  </Button>

                  <PrimaryButton
                    type="submit"
                    disabled={
                      (loading ||
                        video.loading ||
                        errors.titulo ||
                        errors.descricao ||
                        errors.agendamento ||
                        !video.file) as boolean
                    }
                    loading={loading}
                  >
                    {!loading ? (
                      "Adicionar Video Aula"
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
