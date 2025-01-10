import { api } from "../../api/axios";

type UpdateUserType = {
  idUser: string;
  nome?: string;
  sobrenome?: string;
  nomeUsuario?: string;
  sobre?: string;
  email?: string;
  genero?: string;
  dataNascimento?: Date;
  numeroTelefone?: string;
  profilePic?: File | string;
  senha?: string;
  repetirSenha?: string;
};

export async function updateUser(params: UpdateUserType) {
  console.log("param de tudo", params);

  const form = new FormData();

  if (params.email) {
    form.append("email", params.email);
  }

  if (params.profilePic !== undefined) {
    console.log("tem profile pic");
    form.append("profilePic", params.profilePic);
  }

  if (params.genero) {
    form.append("genero", params.genero);
  }

  if (params.dataNascimento) {
    form.append("dataNascimento", params.dataNascimento.toLocaleDateString());
  }

  if (params.numeroTelefone) {
    form.append("numeroTelefone", params.numeroTelefone);
  }

  if (params.sobre) {
    form.append("sobre", params.sobre);
  }

  if (params.senha) {
    form.append("senha", params.senha);
  }

  if (params.repetirSenha) {
    form.append("repetirSenha", params.repetirSenha);
  }

  const res = await api.put(`/api/users/${params.idUser}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // revalidatePath("/plataforma");
  // revalidatePath("/plataforma/configuracoes/dados_acesso");

  return res;
}
