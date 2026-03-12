"use server"

import { signIn, signOut } from "@/auth"

export async function handleGoogleSignIn() {
  await signIn("google")
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/login"})
}

// import bcrypt from "bcrypt"
// import { redirect } from "next/navigation"

// export async function loginAction(formData: FormData) {
//   const passwordInput = formData.get("password") as string
//   const secretHash = process.env.ENCRYPTED_PASSWORD
//   console.log('secretHash', secretHash)
//   console.log('passwordInput', passwordInput)

//   if (!secretHash) {
//     return { error: "Server configuration error." }
//   }

//   const isMatch = await bcrypt.compare(passwordInput, secretHash)

//   if (!isMatch) {
//     return { error: "Invalid password." }
//   }

//   // If match, redirect to dashboard or set a session/cookie
//   redirect("/dashboard")
// }