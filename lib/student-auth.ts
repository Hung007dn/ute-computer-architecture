import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { getDb } from "@/db";
import { sessions, users } from "@/db/schema";

export const SESSION_COOKIE = "ute_ca_session";
export const DEFAULT_STUDENT_PASSWORD = "hcmute123";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

const encoder = new TextEncoder();

function toBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export function normalizeStudentEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isStudentEmail(value: string) {
  return /^[a-z0-9]+@student\.hcmute\.edu\.vn$/i.test(normalizeStudentEmail(value));
}

export async function hashPassword(password: string, saltValue?: string) {
  const salt = saltValue ? fromBase64(saltValue) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" }, key, 256);
  return { hash: toBase64(new Uint8Array(bits)), salt: toBase64(salt) };
}

export async function verifyPassword(password: string, salt: string, expectedHash: string) {
  const { hash } = await hashPassword(password, salt);
  if (hash.length !== expectedHash.length) return false;
  let difference = 0;
  for (let index = 0; index < hash.length; index += 1) difference |= hash.charCodeAt(index) ^ expectedHash.charCodeAt(index);
  return difference === 0;
}

async function hashSessionToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(token));
  return toBase64(new Uint8Array(digest));
}

export async function createSession(userId: string) {
  const token = toBase64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g, "");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  await getDb().insert(sessions).values({ id: await hashSessionToken(token), userId, expiresAt });
  return { token, expiresAt };
}

export async function deleteSession(token: string | undefined) {
  if (!token) return;
  await getDb().delete(sessions).where(eq(sessions.id, await hashSessionToken(token)));
}

export async function getCurrentUser() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [row] = await getDb().select({ id: users.id, email: users.email, name: users.name, role: users.role, status: users.status, mustChangePassword: users.mustChangePassword }).from(sessions).innerJoin(users, eq(sessions.userId, users.id)).where(and(eq(sessions.id, await hashSessionToken(token)), gt(sessions.expiresAt, new Date()))).limit(1);
  return row?.status === "ACTIVE" ? row : null;
}
