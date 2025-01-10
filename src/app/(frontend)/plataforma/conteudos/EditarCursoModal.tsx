// "use client";

// import InputText from "@/app/(frontend)/components/InputText";
// import PrimaryButton from "@/app/(frontend)/components/PrimaryButton";
// import { api, appURL } from "@/app/lib/api/axios";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";
// import { useFormik } from "formik";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import * as yup from "yup";
// import { Button } from "@nextui-org/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Dropzone from "react-dropzone";
// import { Input } from "@nextui-org/input";
// import { Progress } from "@nextui-org/progress";
// import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
// import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";

// type EditarCursoModalProps = {
//   categorias: ICategoria[];
//   curso: ICurso;
//   children: React.ReactNode;
// };

// export default function EditarCursoModal({
//   categorias,
//   curso,
//   children,
// }: EditarCursoModalProps) {
//   // Route Hooks
//   const router = useRouter();

//   // Formik hooks and functions
//   const formik = useFormik({
//     initialValues: {
//       titulo: curso.titulo,
//       fraseDestaque: curso.fraseDestaque,
//       sobreOCurso: curso.sobreOCurso,
//       preco: curso.preco.toString(),
//       categoriaId: curso.categoriaId,
//     },

//     validationSchema: yup.object().shape({
//       titulo: yup.string().required("O título do Curso é obrigatório"),
//       fraseDestaque: yup.string(),
//       sobreOCurso: yup.string(),
//       preco: yup.number().required("Qual o preço do curso?"),
//       categoriaId: yup.string().required("A categoria é obrigatória"),
//     }),

//     onSubmit: (values) => {
//       console.log("clicked");
//       setLoading(true);

//       const form = new FormData();

//       if (coverCurso.file) {
//         console.log("colocou");
//         form.append("coverCurso", coverCurso.file);
//       }
//       form.append("titulo", values.titulo);
//       form.append("fraseDestaque", values.fraseDestaque);
//       form.append("sobreOCurso", values.sobreOCurso);
//       form.append("preco", values.preco);
//       form.append("categoriaId", values.categoriaId);

//       api
//         .put(`/api/cursos/${curso.id}`, form, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         .then((categoriaCreated) => {
//           console.log(categoriaCreated);

//           toast({
//             variant: "default",
//             title: "Operação bem sucedida!",
//             description: "Curso actualizado com sucesso!",
//             className: "bg-green-500 text-white border-1 border-green-800",
//           });

//           router.refresh();
//         })
//         .catch((e) => {
//           console.log(e);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     },
//   });
//   const { values, errors, touched, handleSubmit, handleChange, setValues } =
//     formik;

//   // States Hooks
//   const [coverCurso, setCoverCurso] = useState({
//     loading: false,
//     progress: 0,
//     totalBytes: 0,
//     file: undefined,
//     error: "",
//   });
//   const [loading, setLoading] = useState<boolean>(false);

//   const { toast } = useToast();

//   return (
//     <div>
//       {" "}
//       <Dialog >
//         <DialogTrigger asChild>{children}</DialogTrigger>
//         <DialogContent className="sm:max-w-4xl">
//           <DialogHeader>
//             <DialogTitle className="font-semibold text-2xl">
//               Editar Curso &quot;{curso.titulo}&quot;
//             </DialogTitle>
//             <DialogDescription>
//               <form method="post" onSubmit={handleSubmit}>
//                 <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
//                   <div
//                     className={`bg-cover bg-center w-full h-80 flex flex-col items-center justify-center`}
//                     style={{
//                       backgroundImage: coverCurso.file
//                         ? `url(${URL.createObjectURL(coverCurso.file)})`
//                         : `url(${appURL}/storage/images/cover_curso/${curso.coverCurso})`,
//                     }}
//                   >
//                     {!coverCurso.loading ? (
//                       <>
//                         <Dropzone
//                           onDrop={(acceptedFiles) => {
//                             const acceptedMimetypes = [
//                               "image/jpeg",
//                               "image/png",
//                             ];

//                             if (
//                               !acceptedMimetypes.includes(acceptedFiles[0].type)
//                             ) {
//                               return setCoverCurso({
//                                 ...coverCurso,
//                                 error:
//                                   "O ficheiro deve ser uma foto, do tipo jpg ou png",
//                               });
//                             }
//                             const reader = new FileReader();

//                             reader.onloadstart = (
//                               e: ProgressEvent<FileReader>
//                             ) => {
//                               console.log(e.total);
//                               setCoverCurso({
//                                 ...coverCurso,
//                                 progress: 0,
//                                 loading: true,
//                                 totalBytes: e.total,
//                                 error: "",
//                               });
//                             };

//                             reader.onprogress = (
//                               e: ProgressEvent<FileReader>
//                             ) => {
//                               console.log(e.loaded);
//                               setCoverCurso({
//                                 ...coverCurso,
//                                 totalBytes: e.total,
//                                 loading: true,
//                                 progress: e.loaded,
//                               });
//                             };

//                             reader.onloadend = () => {
//                               setCoverCurso({
//                                 ...coverCurso,
//                                 loading: false,
//                                 file: acceptedFiles[0],
//                               });
//                             };

//                             reader.readAsArrayBuffer(acceptedFiles[0]);
//                           }}
//                         >
//                           {({ getRootProps, getInputProps }) => (
//                             <section
//                               className={`w-full h-full ${
//                                 coverCurso.error && "border-danger"
//                               }`}
//                             >
//                               <div
//                                 {...getRootProps({
//                                   className: `dropzone border-1 h-full flex items-center justify-center ${
//                                     coverCurso.error && "border-danger"
//                                   }`,
//                                 })}
//                               >
//                                 <input {...getInputProps()} />
//                                 <p>
//                                   Solte aqui ou clique para seleccionar a imagem
//                                   do curso
//                                 </p>
//                               </div>
//                             </section>
//                           )}
//                         </Dropzone>
//                       </>
//                     ) : (
//                       <Progress
//                         aria-label="Loading..."
//                         maxValue={coverCurso.totalBytes}
//                         value={coverCurso.progress}
//                         showValueLabel
//                         className="max-w-lg"
//                       />
//                     )}
//                     <p className="text-danger mt-2">
//                       {coverCurso.error && coverCurso.error}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-5">
//                     <div>
//                       <InputText
//                         label="Título: *"
//                         placeholder="Digite aqui o titulo do curso"
//                         type="text"
//                         name="titulo"
//                         value={values.titulo}
//                         onChange={handleChange}
//                         className={`${
//                           touched.titulo && errors.titulo && "border-danger"
//                         }`}
//                       />
//                       <small className="text-danger">
//                         {touched.titulo && errors.titulo && errors.titulo}
//                       </small>
//                     </div>

//                     <label htmlFor="fraseDestaque" className="flex flex-col">
//                       <p>Frase de Destaque:</p>
//                       <textarea
//                         name="fraseDestaque"
//                         value={values.fraseDestaque}
//                         onChange={handleChange}
//                         className={`flex-1 border-1 p-3 border-black border-opacity-25 rounded-xl resize-none h-28 ${
//                           touched.fraseDestaque &&
//                           errors.fraseDestaque &&
//                           "border-danger"
//                         }`}
//                       ></textarea>
//                       <small className="text-danger">
//                         {touched.fraseDestaque &&
//                           errors.fraseDestaque &&
//                           errors.fraseDestaque}
//                       </small>
//                     </label>

//                     <label htmlFor="sobreOCurso" className="flex flex-col">
//                       <p>Sobre o Curso:</p>
//                       <textarea
//                         name="sobreOCurso"
//                         value={values.sobreOCurso}
//                         onChange={handleChange}
//                         className={`flex-1 border-1 p-3 border-black border-opacity-25 rounded-xl resize-none h-28 ${
//                           touched.sobreOCurso &&
//                           errors.sobreOCurso &&
//                           "border-danger"
//                         }`}
//                       ></textarea>
//                       <small className="text-danger">
//                         {touched.sobreOCurso &&
//                           errors.sobreOCurso &&
//                           errors.sobreOCurso}
//                       </small>
//                     </label>
//                     <div>
//                       <Input
//                         label="Preço"
//                         type="number"
//                         name="preco"
//                         labelPlacement="outside"
//                         className={`${
//                           touched.preco && errors.preco && "border-danger"
//                         }`}
//                         endContent={
//                           <div className="pointer-events-none flex items-center">
//                             <span>AOA</span>
//                           </div>
//                         }
//                         onValueChange={(preco) => {
//                           setValues({ ...values, preco: preco.toString() });
//                         }}
//                         value={values.preco.toString()}
//                       />
//                       <small className="text-danger">
//                         {touched.preco && errors.preco && errors.preco}
//                       </small>
//                     </div>
//                     <div>
//                       <label className="flex flex-col gap-1">
//                         <p>Categoria:</p>
//                         <Select
//                           onValueChange={(value) => {
//                             setValues({ ...values, categoriaId: value });
//                           }}
//                           value={values.categoriaId}
//                         >
//                           <SelectTrigger className="py-6">
//                             <SelectValue placeholder="Selecione a Categoria" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {categorias.map((categoria) => {
//                               return (
//                                 <SelectItem
//                                   key={categoria.id}
//                                   value={categoria.id}
//                                 >
//                                   <span className="capitalize">
//                                     {categoria.titulo}
//                                   </span>
//                                 </SelectItem>
//                               );
//                             })}
//                           </SelectContent>
//                         </Select>

//                         <small className="text-red-500">
//                           {touched.categoriaId && errors.categoriaId}
//                         </small>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end mt-4">
//                   <Button
//                     variant="light"
//                     color="danger"
//                     onPress={() => router.back()}
//                     type="button"
//                   >
//                     <span>Cancelar</span>
//                   </Button>

//                   <PrimaryButton
//                     loading={loading}
//                     type="submit"
//                     disabled={
//                       (coverCurso.loading ||
//                         loading ||
//                         errors.preco ||
//                         errors.titulo ||
//                         errors.sobreOCurso ||
//                         errors.fraseDestaque) as boolean
//                     }
//                   >
//                     Actualizar Curso
//                   </PrimaryButton>
//                 </div>
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

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
import { api, appURL } from "@/app/lib/api/axios";
import { useToast } from "@/hooks/use-toast";
import { ICategoria } from "@/app/(backend)/interfaces/objects/ICategoria";
import { ICurso } from "@/app/(backend)/interfaces/objects/ICurso";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Textarea from "../../components/Textarea";

type EditarCursoModalProps = {
  categorias: ICategoria[];
  curso: ICurso;
  children: React.ReactNode;
};

export default function EditarCursoModal({
  curso,
  categorias,
  children,
}: EditarCursoModalProps) {
  // Route Hooks
  const router = useRouter();

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      titulo: curso.titulo,
      fraseDestaque: curso.fraseDestaque,
      sobreOCurso: curso.sobreOCurso,
      preco: curso.preco.toString(),
      categoriaId: curso.categoriaId,
    },

    validationSchema: yup.object().shape({
      titulo: yup.string().required("O título do Curso é obrigatório"),
      fraseDestaque: yup.string(),
      sobreOCurso: yup.string(),
      preco: yup.number().required("Qual o preço do curso?"),
      categoriaId: yup.string().required("A categoria é obrigatória"),
    }),

    onSubmit: (values) => {
      console.log("clicked");
      setLoading(true);

      const form = new FormData();

      if (coverCurso.file) {
        console.log("colocou");
        form.append("coverCurso", coverCurso.file);
      }
      form.append("titulo", values.titulo);
      form.append("fraseDestaque", values.fraseDestaque);
      form.append("sobreOCurso", values.sobreOCurso);
      form.append("preco", values.preco);
      form.append("categoriaId", values.categoriaId);

      api
        .put(`/api/cursos/${curso.id}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((categoriaCreated) => {
          console.log(categoriaCreated);

          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Curso actualizado com sucesso!",
            className: "bg-green-500 text-white border-1 border-green-800",
          });

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

  const { toast } = useToast();

  // Modal Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <button onClick={onOpen}>{children}</button>
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
                Editar Curso &quot;{curso.titulo}&quot;
              </ModalHeader>
              <form method="post" onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    <div
                      className={`bg-cover bg-center w-full h-80 flex flex-col items-center justify-center`}
                      style={{
                        backgroundImage: coverCurso.file
                          ? `url(${URL.createObjectURL(coverCurso.file)})`
                          : `url(${appURL}/storage/images/cover_curso/${curso.coverCurso})`,
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
                                !acceptedMimetypes.includes(
                                  acceptedFiles[0].type
                                )
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
                                    Solte aqui ou clique para seleccionar a
                                    imagem do curso
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
                    <div className="flex flex-col gap-5">
                      <div>
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
                      </div>

                      <Textarea
                        label="Frase de Destaque:"
                        placeholder="Digite a frase de destaque"
                        name="fraseDestaque"
                        value={values.fraseDestaque}
                        onChange={handleChange}
                        error={
                          touched.fraseDestaque &&
                          errors.fraseDestaque &&
                          errors.fraseDestaque
                        }
                      />
                      <Textarea
                        label="Sobre o Curso:"
                        name="sobreOCurso"
                        value={values.sobreOCurso}
                        onChange={handleChange}
                        error={
                          touched.sobreOCurso &&
                          errors.sobreOCurso &&
                          errors.sobreOCurso
                        }
                        placeholder="Fale mais sobre este curso, mais informações"
                      />
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
                      <div>
                        <label className="flex flex-col gap-1">
                          <p>Categoria:</p>
                          <Select
                            onValueChange={(value) => {
                              setValues({ ...values, categoriaId: value });
                            }}
                            value={values.categoriaId}
                          >
                            <SelectTrigger className="py-6">
                              <SelectValue placeholder="Selecione a Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categorias.map((categoria) => {
                                return (
                                  <SelectItem
                                    key={categoria.id}
                                    value={categoria.id}
                                  >
                                    <span className="capitalize">
                                      {categoria.titulo}
                                    </span>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>

                          <small className="text-red-500">
                            {touched.categoriaId && errors.categoriaId}
                          </small>
                        </label>
                      </div>
                    </div>
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
