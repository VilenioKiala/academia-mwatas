import { AuthenticationError } from "../../helpers/errors/AuthenticationError";
import { loginService } from "../../services/auth/Login";

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  try {
    const data = await loginService.execute({
      email,
      senha,
    });

    console.log(data);
    return Response.json(data);
  } catch (e: unknown) {
    if (e instanceof AuthenticationError) {
      return Response.json(
        {
          error: {
            message: e.message,
            logged: false,
          },
        },
        { status: 400 }
      );
    }
    return Response.json({ error: e }, { status: 400 });
  }
}
