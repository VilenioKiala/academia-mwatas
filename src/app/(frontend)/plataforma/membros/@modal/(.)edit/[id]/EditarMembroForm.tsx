"use client";

import { IUser } from "@/app/(backend)/interfaces/objects/IUser";
import InputPassword from "@/app/(frontend)/components/InputPassword";
import InputText from "@/app/(frontend)/components/InputText";
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
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";

type EditarMembroFormProps = {
  user: IUser;
};

export default function EditarMembroForm({ user }: EditarMembroFormProps) {
  const router = useRouter();

  const { toast } = useToast();

  const [profilePic, setProfilePic] = React.useState({
    loading: false,
    progress: 0,
    totalBytes: 0,
    file: undefined,
    error: "",
  });

  const [loading, setLoading] = React.useState(false);

  // Formik hooks and functions
  const formik = useFormik({
    initialValues: {
      nome: user.nome,
      sobrenome: user.sobrenome,
      nomeUsuario: user.nomeUsuario,
      email: user.email,
      senha: "",
      repetirSenha: "",
      privilegio: user.privilegio.toLowerCase(),
    },

    validationSchema: yup.object().shape({
      nome: yup
        .string()
        .min(2, "O nome deve ter no mínimo 2 caracteres")
        .max(30, "O nome não pode ter mais de 30 caracteres"),
      sobrenome: yup
        .string()
        .min(2, "O sobrenome deve ter no mínimo 2 caracteres")
        .max(30, "O sobrenome não pode ter mais de 30 caracteres"),
      nomeUsuario: yup
        .string()
        .matches(
          /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
          "O nome de usuário só pode conter letras, números, . e _"
        ),
      email: yup.string().email("Email inválido!"),
      senha: yup
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
          "A senha deve ter no mínimo uma letra maiúscula, uma letra minúscula e pelo menos 1 número"
        ),
      repetirSenha: yup.string(),
      privilegio: yup
        .string()
        .oneOf(
          ["admin", "aluno", "professor"],
          "O privilégio só pode ser Admin, Aluno ou Professor"
        ),
    }),

    onSubmit: (values, { setErrors }) => {
      if (values.senha !== values.repetirSenha) {
        return setErrors({ repetirSenha: "As senhas não correspondem!" });
      }

      setLoading(true);

      const form = new FormData();

      form.append("profilePic", profilePic.file);
      form.append("nome", values.nome);
      form.append("sobrenome", values.sobrenome);

      form.append("nomeUsuario", values.nomeUsuario);
      form.append("email", values.email);
      form.append("senha", values.senha);
      form.append("repetirSenha", values.repetirSenha);
      form.append("privilegio", values.privilegio);
      // form.append("categoriaId", categoriaId);

      api
        .put(`/api/users/${user.id}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast({
            variant: "default",
            title: "Operação bem sucedida!",
            description: "Usuário Actualizado com sucesso!",
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

  const { handleSubmit, setValues, values, handleChange, errors, touched } =
    formik;

  console.log("valores da edição:", values);

  return (
    <>
      <div>
        <Dropzone
          onDrop={(acceptedFiles) => {
            const acceptedMimetypes = ["image/jpeg", "image/png"];

            if (!acceptedMimetypes.includes(acceptedFiles[0].type)) {
              return setProfilePic({
                ...profilePic,
                error: "O ficheiro deve ser uma foto, do tipo jpg ou png",
              });
            }
            const reader = new FileReader();

            reader.onloadstart = (e: ProgressEvent<FileReader>) => {
              console.log(e.total);
              setProfilePic({
                ...profilePic,
                progress: 0,
                loading: true,
                totalBytes: e.total,
                error: "",
              });
            };

            reader.onprogress = (e: ProgressEvent<FileReader>) => {
              console.log(e.loaded);
              setProfilePic({
                ...profilePic,
                totalBytes: e.total,
                loading: true,
                progress: e.loaded,
              });
            };

            reader.onloadend = () => {
              setProfilePic({
                ...profilePic,
                loading: false,
                file: acceptedFiles[0],
              });
            };

            reader.readAsArrayBuffer(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section
              className={`w-full h-52 flex items-center justify-center rounded-full ${
                profilePic.error && "border-danger"
              }`}
            >
              <div
                {...getRootProps({
                  className: `dropzone border-1 w-52 h-52 rounded-full flex items-center justify-center bg-cover bg-center ${
                    profilePic.error && "border-danger"
                  }`,
                  style: {
                    backgroundImage:
                      profilePic.file &&
                      `url(${URL.createObjectURL(profilePic.file)})`,
                  },
                })}
              >
                <input {...getInputProps()} />
                <p className="text-center">
                  Solte aqui ou clique para seleccionar a foto de perfil
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <small className="text-red-500">
          {profilePic.error && profilePic.error}
        </small>
      </div>
      <div className="text-center mt-2">
        <p className="text-xl font-bold capitalize">
          {values.nome} {values.sobrenome}
        </p>
        <p className="text-lg font-semibold capitalize">
          {values.nomeUsuario && `@${values.nomeUsuario}`}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col gap-3 mt-8"
      >
        <div className="flex gap-2">
          <div className="flex-1">
            <InputText
              label="Nome:"
              type="text"
              className="w-full"
              name="nome"
              placeholder="Digite o nome"
              value={values.nome}
              onChange={handleChange}
              error={touched.nome && errors.nome}
            />
          </div>
          <div className="flex-1">
            <InputText
              label="Sobrenome:"
              type="text"
              className="w-full"
              name="sobrenome"
              placeholder="Digite o sobrenome"
              value={values.sobrenome}
              onChange={handleChange}
              error={touched.sobrenome && errors.sobrenome}
            />
          </div>
        </div>
        <div>
          <InputText
            label="Nome de usuário:"
            type="text"
            value={values.nomeUsuario}
            name="nomeUsuario"
            placeholder="Digite o nome de usuário. ex: brunoandre, pedro.jose"
            onChange={handleChange}
            leftIcon={<span>@</span>}
            error={touched.nomeUsuario && errors.nomeUsuario}
          />
        </div>
        <div>
          <InputText
            label="Email:"
            type="text"
            name="email"
            placeholder="Digite o email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
          />
        </div>
        <div>
          <InputPassword
            label="Nova Senha:"
            name="senha"
            placeholder="Digite a senha"
            onChange={handleChange}
            error={touched.senha && errors.senha}
          />
        </div>
        <div>
          <InputPassword
            label="Confirme a nova senha:"
            name="repetirSenha"
            placeholder="Confirme a sua senha"
            onChange={handleChange}
            error={touched.repetirSenha && errors.repetirSenha}
          />
        </div>
        {user.privilegio !== "superadmin" && (
          <label className="flex flex-col gap-1">
            <p>Privilégio:</p>
            <Select
              onValueChange={(value) => {
                setValues({ ...values, privilegio: value });
              }}
              value={values.privilegio}
            >
              <SelectTrigger className="py-6">
                <SelectValue placeholder="Selecione o Privilégio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="professor">Professor</SelectItem>
                <SelectItem value="aluno">Aluno</SelectItem>
              </SelectContent>
            </Select>
            <small className="text-red-500">
              {touched.privilegio && errors.privilegio}
            </small>
          </label>
        )}

        <div className="flex items-center gap-4 justify-end">
          <Button
            onClick={() => router.back()}
            variant="light"
            color="danger"
            type="button"
          >
            Cancelar
          </Button>
          <PrimaryButton type="submit" disabled={loading}>
            Editar Usuário
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
