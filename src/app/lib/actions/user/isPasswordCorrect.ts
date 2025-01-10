import bcrypt from "bcryptjs";

export const isPasswordCorrect = function (
  senha: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(senha, hashedPassword);
};
