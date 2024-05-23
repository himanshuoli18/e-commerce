import Image from 'next/image'
import React from 'react'
import data from '@/data/productDetails.json'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Link from 'next/link'
import { PurchaseButton } from '@/components/ProductCard'
import db from '@/database/dbConfig'

export default async function ProductDetailsPage({params : { id }} : {params : { id : string }}) {
  const product = await db.product.findUnique({ where: { id } })
  return (
    <>
      <div className="mx-auto md:px-8 pt-16 bg-white lg:px-16">
        <div className="pt-8">
          <div className="flex items-center">
            <ol className="flex w-full items-center overflow-hidden">
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link href="/">Home</Link>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link className="capitalize" href="/products">
                  products
                </Link>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link href="#">
                  {product?.name}
                </Link>
              </li>
            </ol>
          </div>
        </div>
        <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div className="col-span-5 grid grid-cols-1 gap-2.5">
            {data.details.map((item, i) => {
              if (item.keyName === product?.name) {
                return (
                  <Carousel key={id}>
                    <CarouselContent className="flex h-auto transition-transform duration-100 ease-in-out">
                      {item.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            width={664}
                            height={374}
                            priority
                            className='h-[450px] w-full object-cover'
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                    <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
                  </Carousel>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="col-span-4 pt-8 lg:pt-0">
            <div className="mb-7 border-b border-gray-300 pb-7">
              <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                {product?.name}
              </h2>
              <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                {product?.description}
              </p>
              <div className="mt-5 flex items-center ">
                <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                  {`$${(product?.priceInCents ? product.priceInCents / 100 : 0).toFixed(2)}`}
                </div>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-3  ">
              <div className="mb-4 ">
                <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                  color
                </h3>
                <ul className="colors -mr-3 flex flex-wrap">
                  {['bg-black', 'bg-white', 'bg-green-700', 'bg-red-500'].map((color) => (
                    <li
                      key={color}
                      className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                    >
                      <span className={`block h-full w-full rounded ${color}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
            </div>
            <PurchaseButton id={product?.id} />
          </div>
        </div>
      </div>
    </>
  )
}

