import { auth } from "@/auth"

async function SignedIn({children}: {children: React.ReactNode}) {
  const user = await auth()

  if (!user) return;

  return (
    <>
      {children}
    </>
  )
}

export default SignedIn