"use client";

import { useEffect, useState } from "react";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMe();

      setUsername(user.username || "");
      setEmail(user.email);
      setAvatar(user.avatar || null);
    };

    loadUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = await updateMe({ username });

    setAuth(updatedUser);

    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* avatar */}
      {avatar && (
        <Image
          src={avatar}
          alt="Avatar"
          width={100}
          height={100}
        />
      )}

      {}
      <input value={email} readOnly />

      {}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">Save</button>

      {}
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}