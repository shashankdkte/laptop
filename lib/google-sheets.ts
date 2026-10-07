import { google } from "googleapis";

import { formatAnswerForSheet, QUESTION_IDS, type Answers } from "@/lib/questions";

function getPrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY");
  }
  return key.replace(/\\n/g, "\n");
}

export function getSheetHeaders(): string[] {
  return ["timestamp", "name", "email", ...QUESTION_IDS.map((id) => `q${id}`)];
}

export async function appendSubmissionRow(input: {
  name: string;
  email: string;
  answers: Answers;
}) {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !sheetId) {
    throw new Error("Missing Google Sheets environment variables");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: getPrivateKey(),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toISOString(),
    input.name,
    input.email,
    ...QUESTION_IDS.map((id) => formatAnswerForSheet(input.answers[String(id)])),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:AQ",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}
