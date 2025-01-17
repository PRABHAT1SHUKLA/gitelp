import { notFound, redirect } from "next/navigation";

import { auth,clerkClient} from "@clerk/nextjs/server";

import { db } from "@/server/db";

export default async function SyncUser() {
  // Get the current user's session
  const { userId } = await auth(); // Fetches the logged-in user's ID

  if (!userId) {
    // If no user is logged in, redirect to the sign-in page
    redirect("/sign-in");
    return null;
  }

  // Fetch the user's data from Clerk using clerkClient
  const client = await clerkClient()

  const clerkUser = await client.users.getUser(userId);

  if (!clerkUser) {
    throw new Error("Failed to fetch user data from Clerk.");
  }

  // Extract necessary details
  const {
    id: clerkId,
    emailAddresses,
    firstName,
    lastName,
    imageUrl,
  } = clerkUser;

  const emailAddress = emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    return notFound()
  }

  
  // Sync user with your database
  await db.user.upsert({
    where: { emailAddress },
    create: {
      id: clerkId, // Use Clerk's ID as the unique ID
      emailAddress,
      firstName: firstName || null,
      lastName: lastName || null,
      imageUrl: imageUrl || null,
    },
    update: {
      firstName: firstName || null,
      lastName: lastName || null,
      imageUrl: imageUrl || null,
      updatedAt: new Date(),
    },
  });

  // Redirect to the dashboard page after syncing
  redirect("/dashboard");
}
