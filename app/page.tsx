import { auth, currentUser } from "@clerk/nextjs/server";
import UnloggedHeroPage from "../components/UnloggedHero";

export default async function HomePage() {
  const { isAuthenticated } = await auth();

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return <UnloggedHeroPage />;
  }

  // Get the Backend User object when you need access to the user's information
  const user = await currentUser();

  console.log("User: ", user);
  // Use `user` to render user details or create UI elements
  return (
    <>
      <div>Welcome, {user?.firstName}!</div>;
    </>
  );
}
