"use client";
import UserNfts from "@/components/views/nfts";
import { AuthProvider } from "@/hooks/use-auth";

export default function Page() {
  return (
    <AuthProvider>
      <div>
        <UserNfts />
      </div>
    </AuthProvider>
  );
}
