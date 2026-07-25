# Airtable Setup

Airtable is the system of record for every lead submitted through the site
(the "Get Started" form and the Contact form both write here — see
`lib/airtable.ts` and `/app/api/lead/route.ts`).

## 1. Create the base and table

Create an Airtable base (any name), then add a table named exactly **`Leads`**
with the following fields:

| Field name                   | Field type                     | Notes                                                                 |
| ----------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Full Name                    | Single line text               |                                                                        |
| Email                         | Email                            |                                                                        |
| Phone                         | Phone number                    |                                                                        |
| Business Name                | Single line text               |                                                                        |
| Industry                     | Single select                   | Add these 8 options (see below). See note on "General Inquiry" below. |
| Message                      | Long text                       |                                                                        |
| Industry Specific Answers    | Long text                       | JSON-stringified object of the industry-specific question answers.    |
| Source                       | Single select                   | Options: `get-started-form`, `contact-form`                            |
| Submitted At                 | Created time                    | Automatic — do not set manually, Airtable populates it on record creation. |

### Industry select options

Add these 8 options to the **Industry** field (must match `lib/industries.ts` exactly):

1. Real Estate
2. Medical
3. Cleaning & Janitorial Services
4. Consultants
5. Food & Drinks
6. Hotels & Hospitality
7. Travel
8. High Security Websites

The Contact form isn't tied to a specific industry and submits an industry
value of **"General Inquiry"** instead. The integration creates records with
`typecast: true`, so Airtable will automatically add "General Inquiry" as a
9th select option the first time one comes through — no manual setup needed
for that one.

## 2. Get your API credentials

1. Create a [personal access token](https://airtable.com/create/tokens) with
   `data.records:write` scope, granted access to the base created above.
   This is the value for `AIRTABLE_API_KEY`.
2. Open the base and copy its Base ID from the URL (`airtable.com/appXXXXXXXXXXXXXX/...`)
   or via the [API documentation page](https://airtable.com/api) for the
   base. This is the value for `AIRTABLE_BASE_ID`.
3. Set both in `.env` (see `.env.example` — they're left empty until a real
   Airtable account/base exists).

## 3. Viewing leads

Once real credentials are added, every submission will be visible directly
in the Airtable base's grid view — filterable and sortable by any field
(e.g. Industry, Source, Submitted At) — with no separate admin panel needed
for now.

## Failure behavior

If `AIRTABLE_API_KEY` / `AIRTABLE_BASE_ID` are unset, or the Airtable API
call fails for any other reason, `lib/airtable.ts` logs the failure and
returns `null` instead of throwing. The GoHighLevel sync and confirmation
email steps in `/app/api/lead/route.ts` still run — an Airtable outage never
breaks the form for the person submitting it.
