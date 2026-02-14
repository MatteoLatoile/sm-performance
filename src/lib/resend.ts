import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY in .env.local");
}

export const resend = new Resend(apiKey);

export const RESEND_FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";

export const RESEND_CONTACT_TO =
  process.env.RESEND_CONTACT_TO ?? "smperformances.coaching@gmail.com";
