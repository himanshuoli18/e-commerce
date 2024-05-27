import { NextRequest, NextResponse } from "next/server"
import db from "@/database/dbConfig"

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { name: true } } }, // Select only the name of the product
  })

  if (data == null) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url))
  }

  const filename = `${data.product.name}.extension`

  return new NextResponse(null, {
    status: 200, // Or any other appropriate status code
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
