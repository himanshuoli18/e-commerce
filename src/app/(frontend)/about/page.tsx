import React from 'react'
import profilephoto from '@/../public/aboutPage/profilephoto.jpeg'
import Image from 'next/image';

export default function Testimonial() {
  return (
    <section className="px-2 py-40 md:px-0 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-48 flex-shrink-0 group flex transform flex-col transition-all duration-200">
            <Image
              className="relative h-48 w-48 rounded-full object-cover transform transition-all duration-200 group-hover:scale-110"
              src={profilephoto}
              alt="Profile Photo"
            />
          </div>

          <div className="mt-10 md:mt-0">
            <blockquote>
              <p className="text-4xl text-black">
              Code is like humor. When you have to explain it, it&apos;s bad.
              </p>
            </blockquote>
            <p className="mt-7 text-xl font-semibold text-black">Himanshu Oli</p>
            <p className="mt-1 text-base text-gray-600">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
  )
}
