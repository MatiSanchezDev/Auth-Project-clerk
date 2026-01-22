import { SignedOut, SignUpButton } from "@clerk/nextjs";

export default function UnloggedHeroPage() {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto w-full h-auto text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Repo para manejo de rutas publicas y privadas. Usando Clerk.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Un repo para practicar manejo de rutas para una posible Saas,
          utilizando clerk como auth para facilitar protección.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <SignedOut>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-2xl font-medium text-md sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Login
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </section>
  );
}
