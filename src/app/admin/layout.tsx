import { Nav, NavLink } from "@/components/Nav"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="block-small-screens">
        <div className="main-content">
          <Nav>
              <NavLink href="/admin">Dashboard</NavLink>
              <NavLink href="/admin/products">Products</NavLink>
              <NavLink href="/admin/users">Customers</NavLink>
              <NavLink href="/admin/orders">Sales</NavLink>
          </Nav>
          <div className="container">{children}</div>
        </div>
      </div>
    </>
  )
}