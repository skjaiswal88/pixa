"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp /> {/* ✅ No need to pass redirect here now */}
    </div>
  );
}
