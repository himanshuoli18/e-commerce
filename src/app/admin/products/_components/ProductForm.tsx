import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

export function ProductForm({ product }: { product?: Product | null }) {
  // Initialize priceInCents state with a valid number or 0
  const [priceInCents, setPriceInCents] = useState<number>(product?.priceInCents ?? 0)

  // Handle input change for priceInCents
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPriceInCents(value === '' ? 0 : Number(value))
  }

  // Use useFormState to manage form state and actions
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )

  // Define SubmitButton component
  function SubmitButton() {
    const { pending } = useFormStatus()

    return (
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
    )
  }

  return (
    <form className="space-y-6" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents.toString()} // Convert number to string for input value
          onChange={handlePriceChange}
        />
        <div className="text-muted-foreground">
          {formatCurrency(priceInCents / 100)} {/* Ensure priceInCents is a number */}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      {product && ( // Check if product is defined
        <>
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input type="file" id="file" name="file" required={product == null} />
            <div className="text-muted-foreground">{product.filePath}</div>
            {error.file && <div className="text-destructive">{error.file}</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required={product == null} />
            <Image
              src={product.imagePath}
              width={500}
              height={500}
              className="w-full h-auto"
              alt="Product Image"
            />
            {error.image && <div className="text-destructive">{error.image}</div>}
          </div>
        </>
      )}
      <div className="flex justify-center">
        <SubmitButton />
      </div>
    </form>
  )
}
