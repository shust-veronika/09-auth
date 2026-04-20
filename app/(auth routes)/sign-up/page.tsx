"use client";

import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    await register({ email, password });

    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" />
      <button type="submit">Register</button>
    </form>
  );
}