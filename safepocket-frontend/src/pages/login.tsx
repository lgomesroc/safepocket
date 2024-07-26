import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useState } from 'react';

// Definindo o esquema de validação com Yup
const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
}).required();

// Interface para os dados do formulário de login
interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  // Função para lidar com o envio do formulário
  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.status === 200) {
        // Sucesso no login, redirecionar para o dashboard
        router.push("/dashboard");
      } else {
        // Lidar com erros de login
        console.error("Erro no login:", response.statusText);
        setServerError("Invalid email or password.");
      }
    } catch (error) {
      // Lidar com erros de requisição
      console.error("Falha no login:", error);
      setServerError("An error occurred during login.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {serverError && <Typography color="error">{serverError}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
