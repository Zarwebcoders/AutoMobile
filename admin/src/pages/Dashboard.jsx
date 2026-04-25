import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Package, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  ChevronRight
} from 'lucide-react';

const stats = [
  { label: 'Total Products', value: '1,284', icon: Package, change: '+12%', isPositive: true },
  { label: 'Active Leads', value: '48', icon: MessageSquare, change: '+5%', isPositive: true },
  { label: 'Total Users', value: '840', icon: Users, change: '-2%', isPositive: false },
  { label: 'Blog Posts', value: '156', icon: TrendingUp, change: '+18%', isPositive: true },
];

const Dashboard = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black text-dark-blue italic font-oswald uppercase tracking-tighter leading-none">
          Dashboard <span className="text-accent underline decoration-4 underline-offset-8">Overview</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Welcome back to Mobex Control Center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="admin-card p-8 group hover:border-accent transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-dark-blue group-hover:bg-accent transition-all duration-500">
                <stat.icon size={28} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-black uppercase px-3 py-1 rounded-full",
                stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</h3>
            <div className="text-4xl font-black text-dark-blue italic font-oswald">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-8 admin-card">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
             <h3 className="text-xl font-black text-dark-blue uppercase italic font-oswald flex items-center gap-3">
               <Clock className="text-accent" /> Recent Inquiries
             </h3>
             <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-accent transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-dark-blue">
                    JD
                  </div>
                  <div>
                    <h4 className="font-black text-dark-blue text-sm uppercase tracking-tight">John Doe</h4>
                    <p className="text-slate-400 text-xs font-bold">Technical support inquiry regarding SKU-295W</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <span className="text-[10px] font-black uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">New</span>
                   <ChevronRight className="text-slate-200 group-hover:text-accent transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="lg:col-span-4 space-y-8">
           <div className="admin-card p-8 bg-dark-blue text-white relative overflow-hidden group">
              <h3 className="text-2xl font-black italic font-oswald uppercase mb-2">System <span className="text-accent">Health</span></h3>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-8">All nodes operational</p>
              
              <div className="space-y-6">
                {[
                  { label: 'Database', status: 'Stable', percent: 98 },
                  { label: 'API Server', status: 'Optimal', percent: 94 },
                  { label: 'Media Storage', status: 'Running', percent: 62 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-white/60">{item.label}</span>
                      <span className="text-accent">{item.status}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <TrendingUp className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.03] group-hover:scale-110 transition-transform" />
           </div>

           <div className="admin-card p-8 border-dashed border-2 border-slate-200 bg-transparent flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-accent hover:bg-white transition-all">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-accent group-hover:text-dark-blue transition-all">
                <Package size={32} />
              </div>
              <div>
                <h4 className="font-black text-dark-blue uppercase italic font-oswald text-lg">Quick Action</h4>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Add New Product</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper function since I didn't import it in this file scope if it's not global
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default Dashboard;
