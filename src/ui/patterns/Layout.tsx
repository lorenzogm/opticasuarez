import { type ReactNode } from 'react'
import { Header, Footer } from '../sections'

interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <main className="main-content flex-1">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
