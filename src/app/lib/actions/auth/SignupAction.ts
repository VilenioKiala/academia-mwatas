import { api } from "../../api/axios";

async function SignupAction(
  nome: string,
  sobrenome: string,
  email: string,
  nomeUsuario: string,
  senha: string,
  repetir_senha: string,
  privilegio: string
) {
  const form = new FormData();

  form.append("nome", nome);
  form.append("sobrenome", sobrenome);
  form.append("email", email);
  form.append("nomeUsuario", nomeUsuario);
  form.append("senha", senha);
  form.append("repetir_senha", repetir_senha);
  form.append("privilegio", privilegio);

  console.log(form);

  const response = await api.post("/api/users", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export { SignupAction };
