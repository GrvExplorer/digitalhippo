import { currentUser } from "@/utils/auth.util";

async function IsSeller({ children }: { children: React.ReactNode }) {

  const user = await currentUser()

  if (!user || user.isSeller) return <></>

  return <>{children}</>;
}

export default IsSeller;
