import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/database/dbConfig"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import Image1 from "@/../public/homePage/Image1.jpeg";
import Image2 from "@/../public/homePage/Image2.jpeg";
import Image3 from "@/../public/homePage/Image3.jpeg";
import Image4 from "@/../public/homePage/Image4.jpeg";
import Image5 from "@/../public/homePage/Image5.jpeg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const getPopularProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
}, ["/", "getNewestProducts"])

export default function HomePage() {
  const images = [Image1, Image2, Image3, Image4, Image5];
  return (
    <div className="carousel-container relative overflow-hidden w-full">
      <Carousel
          className="w-full"
          opts={{
              align: "start",
              loop: true
          }}
      >
          <CarouselContent className="flex transition-transform duration-200 ease-in-out">
              {images.map((image, index) => (
                  <CarouselItem key={index}>
                      <Image src={image} alt={`Image ${index + 1}`} priority />
                  </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
      </Carousel>
      <div className="container pt-10">
        <ProductGridSection title="Most Popular" productsFetcher={getPopularProducts} />
        <hr className="w-1/2 h-1 mx-auto my-10 bg-gray-100 border-0 rounded dark:bg-gray-700"/>
        <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
      </div>
    </div>
  )
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl text-white font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2 font-bold">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />
  ))
}