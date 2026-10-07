# Laptop Needs Questionnaire

Simple Next.js site: collect name + email, ask 40 laptop questions, save one row per submission to Google Sheets. Built for Vercel.

## Local setup

```bash
npm install
cp .env.example .env.local
# Fill in the three Google env vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Sheet setup

1. Create a Google Cloud project.
2. Enable **Google Sheets API**.
3. Create a **Service account** → create a JSON key → download it.
4. Create a Google Sheet. Rename the first tab to `Sheet1` (default).
5. Put this header row in row 1 (paste into A1):

```
timestamp	name	email	q1	q2	q3	q4	q5	q6	q7	q8	q9	q10	q11	q12	q13	q14	q15	q16	q17	q18	q19	q20	q21	q22	q23	q24	q25	q26	q27	q28	q29	q30	q31	q32	q33	q34	q35	q36	q37	q38	q39	q40
```

6. Share the sheet with the service account email as **Editor**.
7. Copy the spreadsheet ID from the URL into `GOOGLE_SHEET_ID`.
8. Put the service account `client_email` into `GOOGLE_CLIENT_EMAIL`.
9. Put the `private_key` into `GOOGLE_PRIVATE_KEY` (keep `\n` escapes).

## Vercel deploy

1. Push this repo to GitHub (or import the folder in Vercel).
2. Create a Vercel project from the repo (Next.js is detected automatically).
3. Add the same three environment variables in Vercel Project Settings → Environment Variables.
4. Deploy.
5. Submit a test response and confirm a new row appears in the sheet.

## Notes

- No passwords or login - email is only used to identify the submission.
- Submitting again with the same email appends another row.
- Multi-select answers are stored as comma-separated text.
- Rank answers (Q40) look like: `Performance=1; Portability=2; ...`
