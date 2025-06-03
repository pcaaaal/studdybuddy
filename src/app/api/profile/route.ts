import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export async function GET() {
  try {
    // Cookies on REQUESTS
    const cookieString = NextResponse.next().headers.get("cookie") || "";
    pb.authStore.loadFromCookie(cookieString);

    // Validate Authentication
    if (!pb.authStore.isValid) {
      return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
    }

    // Update Authentication
    await pb.collection("_pb_users_auth_").authRefresh();
    const user = pb.authStore.record;

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Getting StudyGroups of user 
    const groups = await pb.collection("user_studygroup").getFullList({
      filter: `user="${user.id}"`,
      expand: "studygroup",
    });

    // Get StudyBuddies of user
    const buddies = await pb.collection("studybuddy").getFullList({
      filter: `user_a="${user.id}" || user_b="${user.id}"`,
      expand: "user_a,user_b",
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      studyGroups: groups.map((g) => g.expand?.studygroup).filter(Boolean),
      studyBuddies: buddies
        .map((b) =>
          b.expand?.user_a?.id === user.id ? b.expand?.user_b : b.expand?.user_a
        )
        .filter(Boolean),
    });
  } catch (error) {
    console.error("Error in profile API:", error);
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
  }
}