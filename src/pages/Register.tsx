import { AuthForm } from "../components/auth_form";
import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/theme_toggle";

export default function Register() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="absolute top-4 right-4" >
            <ThemeToggle/>
        </div>
      <AuthForm type="register" />
    </div>
    </>
  )
}