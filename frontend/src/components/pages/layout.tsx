import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Outlet } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="md:hidden block relative bottom-[38rem] text-white">
        <SidebarTrigger />
        {children}
        <Outlet/>
      </main>
    </SidebarProvider>
    
  )
}