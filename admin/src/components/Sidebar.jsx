import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Settings, 
  Users,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: FileText, label: 'Blogs', path: '/blogs' },
  { icon: HelpCircle, label: 'FAQs', path: '/faqs' },
  { icon: MessageSquare, label: 'Inquiries', path: '/inquiries' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <aside className="w-72 h-screen sticky top-0 bg-dark-blue flex flex-col border-r border-white/5">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="MOBEX" className="h-10 w-auto object-contain" />
          <span className="text-sm font-black italic tracking-tighter leading-none font-oswald text-white uppercase opacity-50">ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl transition-all group",
                isActive 
                  ? "bg-accent text-dark-blue shadow-lg shadow-accent/10" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className="text-sm font-black uppercase tracking-wider">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} strokeWidth={3} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-white/5 rounded-3xl p-4 flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-black text-dark-blue">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-white text-sm font-black truncate">{user?.name}</h4>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-red-400 transition-colors font-black uppercase text-xs tracking-widest"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
