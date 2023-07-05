import { prettyObject } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import clientPromise from "../../lib/mongodb";

async function handle(req: NextRequest) {
  const authResult = auth(req, true);
  if (authResult.error) {
    return NextResponse.json(authResult, {
      status: 401,
    });
  }

  try {
    const data = await req.json();

    // 添加身份信息
    data.user_code = authResult.code;
    data.ip = authResult.ip;
    data.token = authResult.token;

    // 写入数据库
    const client = await clientPromise;
    const database = client.db("chat");

    const collectionName = "chat_history";
    const collections = await database
      .listCollections({ name: collectionName })
      .toArray();
    let collection;
    if (collections.length) {
      collection = database.collection(collectionName);
    } else {
      collection = await database.createCollection(collectionName);
    }

    await collection.insertOne(data);

    return NextResponse.json("");
  } catch (e) {
    console.error("[Save OpenAI Message] ", e);
    return NextResponse.json(prettyObject(e));
  }
}

export const GET = handle;
export const POST = handle;

// export const runtime = "edge";
