import { PageHeader } from "../../_components/PageHeader"
import { ProductForm } from "../_components/ProductForm"

export default function NewProductPage() {
  return (
    <>
        <div className="pt-32 px-20">
            <PageHeader>Add Product</PageHeader>
            <ProductForm />
        </div>
    </>
  )
}