import { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  ExternalLink,
  Loader2,
  User,
  Phone,
  Mail
} from 'lucide-react';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await api.get('/inquiries');
      setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.delete(`/inquiries/${id}`);
        setInquiries(inquiries.filter(i => i._id !== id));
      } catch (err) {
        alert('Error deleting inquiry');
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/inquiries/${id}`, { status });
      setInquiries(inquiries.map(i => i._id === id ? { ...i, status } : i));
    } catch (err) {
      alert('Error updating status');
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black text-dark-blue italic font-oswald uppercase tracking-tighter leading-none">
          Product <span className="text-accent underline decoration-4 underline-offset-8">Inquiries</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Manage customer requests and WhatsApp leads</p>
      </div>

      <div className="admin-card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search inquiries..."
            className="w-full h-12 bg-slate-50 rounded-xl pl-12 pr-6 outline-none border border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Inquiries...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product & Customer</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Quantity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((i) => (
                    <tr key={i._id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-dark-blue text-sm uppercase tracking-tight">{i.productName}</span>
                          <span className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1 mt-1">
                            <User size={10} /> {i.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-black text-slate-600">
                               <Phone size={12} className="text-accent" /> {i.mobile}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                               <Mail size={12} /> {i.email}
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-dark-blue">{i.quantity}</td>
                      <td className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(i.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          value={i.status}
                          onChange={(e) => updateStatus(i._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider outline-none ${
                            i.status === 'Pending' ? 'bg-orange-50 text-orange-500' : 
                            i.status === 'Contacted' ? 'bg-blue-50 text-blue-500' :
                            i.status === 'Resolved' ? 'bg-green-50 text-green-500' :
                            'bg-red-50 text-red-500'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <a 
                            href={`https://wa.me/${i.mobile.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all"
                          >
                            <ExternalLink size={16} />
                          </a>
                          <button 
                            onClick={() => handleDelete(i._id)}
                            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest">
                       No inquiries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
