import { NextRequest, NextResponse } from "next/server";
import db from "@/database/dbConfig";

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { name: true } } },
  });

  if (data == null) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url));
  }

  const extension = "pdf"; 
  const fileName = `${data.product.name}.${extension}`;

  return new NextResponse(null, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
