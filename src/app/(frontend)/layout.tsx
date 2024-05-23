import { Nav, NavLink } from "@/components/Nav"
import { Footer } from "@/components/ui/footer"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="block-small-screens">
        <div className="main-content">
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">Orders</NavLink>
            <NavLink href="/about">About</NavLink>
          </Nav>
          <div className="bg-black">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  )
}