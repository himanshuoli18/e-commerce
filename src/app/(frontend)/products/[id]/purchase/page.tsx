export default function Testimonial() {
  return (
    <section className="px-2 py-40 md:px-0 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-96 flex-shrink-0 group text-center flex transform flex-col transition-all duration-200">
            <h1 className="text-2xl font-extrabold">Purchase Page</h1>
            <br /><hr /><br />
            <p>In compliance with Indian regulations, individual accounts cannot accept international payments via Stripe. Consequently, we have removed Stripe as our payment gateway. We regret any inconvenience this may cause and are working diligently to implement alternative payment solutions. Thank you for your understanding and continued support.</p>
          </div>
        </div>
      </div>
    </section>
  )
}