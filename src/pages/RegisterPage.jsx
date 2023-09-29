import { Button, Card, Container, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, errors: signupErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/home");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center flex-col">

<img src="Logo.png" alt="logo" className="w-[9rem] pb-10" />
      <Card>
      { signupErrors &&
        signupErrors.map((err) => (
          <p className="bg-red-500 text-white p-2 text-center" key={err}>
            {err}
          </p>
        ))}
         <h1 className="text-2xl my-2 text-center font-quicksand">Registro</h1>
         <div className="flex my-4 items-center justify-center">
            <p className="pr-2">Ya tiene una cuenta?</p>
            <Link to="/login" className="font-bold text-primary">
              Inicio de sesión
            </Link>
          </div>

        <form onSubmit={onSubmit}>
          <Label htmlFor="fullname">Nombre y Apellidos</Label>
          <Input
            placeholder="Nombre y Apellidos"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500">Nombres y Apellidos es requerido</p>}

          <Label htmlFor="email">Correo</Label>
          <Input
            type="email"
            placeholder="Correo"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Correo es requerido</p>}

          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-red-500">La contraseña debe tener al menos 6 caracteres</p>
          )}
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500">Contraseña es requerida</p>
          )}
         <div className="flex items-center justify-center py-4">
            
            <Button className="w-[100%] justify-center py-2">Registro</Button>
            </div>
          
        </form>
      </Card>
    </Container>
  );
}

export default RegisterPage;
