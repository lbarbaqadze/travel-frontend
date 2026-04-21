import AdminSidebar from "@/components/adminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar /> 
      
      <main className="flex-1 lg:pl-72 w-full transition-all">
        <div className="p-4 md:p-10 max-w-350 mx-auto pt-20 lg:pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}