import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ButtonSignOut } from "./ButtonSignOut";

export default async function NavbarPage() {
  const { isAuthenticated, sessionClaims } = await auth();

  const user = await currentUser();

  if (!isAuthenticated) {
    return;
  }

  console.log(user);

  return (
    <nav className="w-full bg-gray-300 mb-6">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex gap-4 font-bold">
          <Link href={"/"} className="text-gray-950 hover:text-red-600">
            Home
          </Link>
          <Link
            href={"/ruta-privada"}
            className="text-gray-950 hover:text-red-600"
          >
            Ruta Privada
          </Link>
          {sessionClaims?.metadata?.role == "admin" && (
            <Link
              href={"/ruta-admin"}
              className="text-gray-950 hover:text-red-600"
            >
              Ruta Admin
            </Link>
          )}
        </div>
        <ButtonSignOut />
      </div>
    </nav>
  );
}
