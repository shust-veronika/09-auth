import { getMe } from "@/lib/api/serverApi";

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <div>
      <h1>Profile</h1>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}