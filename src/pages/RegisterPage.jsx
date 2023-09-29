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
      navigate("/profile");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">

     
      <Card>
      { signupErrors &&
        signupErrors.map((err) => (
          <p className="bg-red-500 text-white p-2 text-center" key={err}>
            {err}
          </p>
        ))}
        <h3 className="text-2xl font-bold">Register</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            placeholder="Enter your fullname"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-red-500">Min-length is 6</p>
          )}
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          <Button>Register</Button>
          <div className="flex justify-between my-4">
            <p>Already have an account? </p>
            <Link to="/login" className="font-bold">
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default RegisterPage;
