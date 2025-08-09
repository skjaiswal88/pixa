"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn /> {/* ✅ No need to pass redirect here now */}
    </div>
  );
}
