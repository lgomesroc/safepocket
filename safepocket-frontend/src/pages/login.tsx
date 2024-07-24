import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";

interface ILoginForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
}).required();

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
    resolver: yupResolver(schema)
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const response = await axios.post("/api/login", data);
      // Handle successful login (e.g., save token, redirect)
      router.push("/dashboard");
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Password</label>
          <input
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
