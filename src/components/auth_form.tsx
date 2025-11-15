import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export type AuthFormType = "login" | "register"

const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
})

export function AuthForm({ type }: { type: AuthFormType }) {
  const schema = type === "register" ? registerSchema : loginSchema

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    console.log("Submitted:", data)
    // call your API here
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 bg-card p-8 rounded-xl shadow-lg w-full max-w-md"
    >
      <h1 className="text-3xl font-extrabold text-center">
        {type === "login" ? "Login" : "Create Account"}
      </h1>

      {type === "register" && (
        <div>
          <Label>Name</Label>
          <Input {...form.register("name")} placeholder="John Doe" />
          <p className="text-red-500 text-sm">{form.formState.errors.name?.message}</p>
        </div>
      )}

      <div>
        <Label>Email</Label>
        <Input {...form.register("email")} placeholder="you@example.com" />
        <p className="text-red-500 text-sm">{form.formState.errors.email?.message}</p>
      </div>

      <div>
        <Label>Password</Label>
        <Input type="password" {...form.register("password")} />
        <p className="text-red-500 text-sm">{form.formState.errors.password?.message}</p>
      </div>

      <Button type="submit" className="w-full">
        {type === "login" ? "Login" : "Register"}
      </Button>
    </form>
  )
}
