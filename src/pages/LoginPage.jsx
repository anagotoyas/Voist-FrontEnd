import { Card, Input, Button, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const { signin, errors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user && user.role==2) {
      navigate("/home");
    } else if (user && user.role===1 ) {
      navigate("/admin");
    }
  });

  return (
    <Container className="h-[calc(100vh-5rem)] flex justify-center items-center flex-col">
      <Link to='/'>
        <img src="Logo.png" alt="logo" className="w-[9rem] pb-10" />
      </Link>
      <Card>
        {errors &&
          errors.map((err) => (
            <p
              className="bg-red-500 text-white p-2 text-center rounded-full mb-4"
              key={err}
            >
              {err}
            </p>
          ))}

        <h1 className="text-2xl my-2 text-center font-quicksand">
          Inicio de Sesión
        </h1>
        <div className="flex my-4 items-center justify-center flex-wrap text-left">
          <p className="md:pr-2">Aún no tiene una cuenta?</p>
          <Link to="/register" className="font-bold text-primary pt-2 md:pt-0">
            Cree una cuenta
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Correo</Label>
          <Input
            type="email"
            placeholder="Correo"
            {...register("email", {
              required: true,
            })}
          ></Input>

          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: true,
            })}
          ></Input>

          <div className="flex items-center justify-center py-4">
            <Button className="w-[100%] justify-center py-2">
              Inicio de sesión
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
