import { ProductCard } from "@/components/ProductCard"
import db from "@/database/dbConfig"
import { cache } from "@/lib/cache"

const getProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    })
}, ["/products", "getProducts"])

export default async function ProductsPage() {
    const products = await getProducts()
    return (
        <>
            <div className="min-h-screen bg-black">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 container pt-28 pb-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </>
    )
}