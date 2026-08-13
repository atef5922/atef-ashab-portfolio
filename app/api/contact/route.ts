import { NextResponse } from "next/server";
import { validateContactInput, sendContactEmail, type ContactInput } from "@/controllers/contact.controller";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<ContactInput> | null;

  if (!body) {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const validation = validateContactInput(body);
  if (!validation.valid) {
    return NextResponse.json({ success: false, message: validation.error }, { status: 400 });
  }

  try {
    await sendContactEmail(body as ContactInput);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send message.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
