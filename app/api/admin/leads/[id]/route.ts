import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/apiAuth";
import { LEAD_STATUSES } from "@/lib/leadStatus";

export const runtime = "nodejs";

const statusSchema = z.object({
  status: z.enum(LEAD_STATUSES),
});

type Params = { params: { id: string } };

// PATCH /api/admin/leads/:id — update a lead's follow-up status, admin-only.
// This is the only mutation the admin Leads panel performs; leads themselves
// are created by the public intake API (app/api/lead/route.ts).
export async function PATCH(request: Request, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please choose a valid status.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
      select: { id: true, status: true },
    });
    return NextResponse.json({ lead });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    throw error;
  }
}
