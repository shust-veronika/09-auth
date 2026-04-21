"use client";

import { useEffect, useState } from "react";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMe();

      setUserId(user.id);
      setEmail(user.email);
      setAvatar(user.avatar || null);
    };

    loadUser();
  }, []);

  const handleAction = async (formData: FormData) => {
    const username = formData.get("username") as string;

    const updatedUser = await updateMe({ username });

    setUser(updatedUser);

    router.push("/profile");
  };

  return (
    <form action={handleAction}>
      {avatar && (
        <Image
          src={avatar}
          alt="User avatar"
          width={100}
          height={100}
        />
      )}

      <label>
        Email (read-only)
        <input
          type="email"
          name="email"
          value={email}
          readOnly
        />
      </label>

      <label>
        Username
        <input
          type="text"
          name="username"
          defaultValue=""
        />
      </label>

      <button type="submit">Save</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}