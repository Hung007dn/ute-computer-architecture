import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { lessonProgress, users } from "@/db/schema";

const payloadSchema=z.object({lessonId:z.number().int().positive(),status:z.enum(["NOT_STARTED","IN_PROGRESS","COMPLETED"])});
export async function POST(request:Request){const user=await getChatGPTUser();if(!user)return NextResponse.json({error:"UNAUTHORIZED"},{status:401});const parsed=payloadSchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"INVALID_INPUT",details:parsed.error.flatten()},{status:400});const db=getDb();await db.insert(users).values({id:user.userId,email:user.email,name:user.fullName}).onConflictDoUpdate({target:users.id,set:{email:user.email,name:user.fullName,updatedAt:new Date()}});await db.insert(lessonProgress).values({userId:user.userId,lessonId:parsed.data.lessonId,status:parsed.data.status,completedAt:parsed.data.status==="COMPLETED"?new Date():null}).onConflictDoUpdate({target:[lessonProgress.userId,lessonProgress.lessonId],set:{status:parsed.data.status,completedAt:parsed.data.status==="COMPLETED"?new Date():null,updatedAt:new Date()}});return NextResponse.json({ok:true});}
export async function GET(){const user=await getChatGPTUser();if(!user)return NextResponse.json({error:"UNAUTHORIZED"},{status:401});const db=getDb();const progress=await db.select().from(lessonProgress).where(eq(lessonProgress.userId,user.userId));return NextResponse.json({progress});}
