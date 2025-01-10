import { api } from "../../api/axios";

type CreateUserType = {
  nome: string;
  sobrenome: string;
  nomeUsuario: string;
  senha: string;
  repetirSenha: string;
};

export async function createUser(params: CreateUserType) {
  const form = new FormData();

  form.append("nome", params.nome);
  form.append("sobrenome", params.sobrenome);
  form.append("nome_usuario", params.nomeUsuario);
  form.append("senha", params.senha);
  form.append("repetir_senha", params.repetirSenha);
  form.append("privilegio", "aluno");

  const userCreated = await api.post("/api/users", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return userCreated;
}
