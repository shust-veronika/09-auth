"use client";

import { useEffect, useState } from "react";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getMe();
        setUsername(user.username);
        setEmail(user.email);
        setAvatar(user.avatar || null);
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleAction = async (formData: FormData) => {
    const updatedUsername = formData.get("username") as string;

    try {
      const updatedUser = await updateMe({ username: updatedUsername });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (loading) return <p>Loading...</p>;

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
          className="bg-gray-100"
        />
      </label>

      <label>
        Username
        <input
          type="text"
          name="username"
          key={username}
          defaultValue={username}
        />
      </label>

      <button type="submit">Save</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}