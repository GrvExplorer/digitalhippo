import { auth } from "@/auth";


export default async function SignedOut({children}: {children: React.ReactNode}) {

  const user = await auth()

  if (user) return;

  return (
    <>
      {children}
    </>
  );
}