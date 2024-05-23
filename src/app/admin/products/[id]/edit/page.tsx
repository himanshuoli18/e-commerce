import db from "@/database/dbConfig"
import { PageHeader } from "../../../_components/PageHeader"
import { ProductForm } from "../../_components/ProductForm"

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await db.product.findUnique({ where: { id } })

  return (
    <>
      <div className="pt-32 px-20">
        <PageHeader>Edit Product</PageHeader>
        <ProductForm product={product} />
      </div>
    </>
  )
}