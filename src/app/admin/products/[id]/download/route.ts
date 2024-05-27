import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import db from "@/database/dbConfig"

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { name: true },
  })

  if (product == null) return notFound()

  // Replace 'product.name' and 'product.extension' with actual values
  const filename = `${product.name}.extension`

  return new NextResponse(null, {
    status: 200, // Or any other appropriate status code
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
