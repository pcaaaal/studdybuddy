import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export async function GET() {
  try {
    // Cookies aus der Anfrage laden
    const cookieString = NextResponse.next().headers.get("cookie") || "";
    pb.authStore.loadFromCookie(cookieString);

    // Authentifizierung prüfen
    if (!pb.authStore.isValid) {
      return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
    }

    // Authentifizierung aktualisieren
    await pb.collection("_pb_users_auth_").authRefresh();
    const user = pb.authStore.record;

    // Überprüfen, ob der Benutzer existiert
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }



    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error in profile API:", error);
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
  }
}