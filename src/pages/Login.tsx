import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/Auth_Context";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../components/ui/use-toast";
import { Navbar } from "../components/Navbar";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const redirectTo = location.state?.from?.pathname || "/";

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const fakeUser = {
        user_id: 1,
        username: "John Doe",
        email: data.email,
      };

      login(fakeUser);
      toast({ title: "Logged in!", description: "Welcome back." });

      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast({ title: "Login failed", description: "Invalid credentials." });
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4 bg-card"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <div>
          <Label>Email</Label>
          <Input type="email" {...form.register("email")} />
          <p className="text-red-500">{form.formState.errors.email?.message}</p>
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...form.register("password")} />
          <p className="text-red-500">{form.formState.errors.password?.message}</p>
        </div>

        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
    </>
  );
}
