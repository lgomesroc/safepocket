import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required")
}).required();

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
    resolver: yupResolver(schema)
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      await axios.post("/api/register", {
        name: data.name,
        email: data.email,
        password: data.password
      });
      // Handle successful registration (e.g., redirect to login)
      router.push("/login");
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
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
        <div className="mb-4">
          <label className="block mb-1" htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="confirmPassword"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
