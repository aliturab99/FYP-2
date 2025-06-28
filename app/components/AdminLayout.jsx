"use client"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }) => {
  const { user } = useUser();
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/categories", label: "Categories", icon: "🏷️" },
    { href: "/store/add-product", label: "Add Product", icon: "➕" },
    { href: "/admin/products", label: "Manage Products", icon: "📦" },
    { href: "/admin/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a]">
      {/* Admin Sidebar */}
      <div className="fixed left-0 top-16 h-full w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 z-40 transform transition-transform duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">👑</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">Admin Panel</h3>
              <p className="text-gray-400 text-sm">{user?.firstName}</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Quick Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Status:</span>
                <span className="text-emerald-400">Online</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Role:</span>
                <span className="text-purple-400">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
