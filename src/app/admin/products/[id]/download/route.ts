import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import db from "@/database/dbConfig";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { name: true }, // Assuming filePath is not needed anymore
  });

  if (product == null) return notFound();
  const extension = "pdf";
  const fileName = `${product.name}.${extension}`;

  return new NextResponse(null, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
