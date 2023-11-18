import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: NextResponse, res: NextResponse) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const message = body.messages;

    console.log("messages", message);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!message) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const userMessage = "Say this is a test";
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "gpt-3.5-turbo",
    });

    console.log("chatCompletion", chatCompletion.choices[0].message);

    // return NextResponse.json(response.data.choices[0].message);
    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.log("ERROR", error);

    return new NextResponse(`${error}`, { status: 500 });
  }
}
