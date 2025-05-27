import { Calendar, Home, Inbox } from "lucide-react"
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";


import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useState } from "react";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: Inbox,
  },
  {
    title: "Incomes",
    url: "/incomes",
    icon: Calendar,
  }
]

export function AppSidebar() {

  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const userEmail = localStorage.getItem("userEmail") || "";
  const userName = localStorage.getItem("userName") || "";
  const initial = userName ? userName[0].toUpperCase() : "";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    localStorage.setItem("userName", name);
    if (password) localStorage.setItem("userPassword", password); 
    localStorage.setItem("email",email);
    setIsFormOpen(false);
    alert("Profile updated!");
    window.location.reload(); 
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Budget Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="border-1 bg-blue-300 rounded-3xl flex gap-2 mb-4 ml-2 p-1 h-[7vh]">
        <div className="rounded-full px-5 text-xl py-1 bg-blue-400 flex items-center">
          {initial}
        </div>
        <div className="w-[160px]">
          <div>{userEmail}</div>
          <div>{userName}</div>
        </div>

        <div onClick={() => setIsOpen(!isOpen)} className="mt-[10px] text-3xl cursor-pointer relative">
          <IoMdMore />
          {isOpen && (
            <div className="absolute bottom-15 left-0 text-xl p-4 rounded-2xl bg-blue-200 w-[270px] shadow-md">
              <button onClick={() => setIsFormOpen(true)} className="block mb-2">Update</button>
              <hr />
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
            <h2 className="text-2xl mb-4">Update Profile</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-2 py-1 rounded" />
              </div>
              <div>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border px-2 py-1 rounded" />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Sidebar>
  );
}