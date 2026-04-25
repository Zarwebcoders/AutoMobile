import { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  ExternalLink,
  Package,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    originalPrice: '',
    badge: '',
    description: '',
    image: '',
    isFeatured: true,
    isBestDeal: true,
    isMoreToLove: true,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct._id}`, formData);
        setProducts(products.map(p => p._id === editingProduct._id ? res.data.data : p));
      } else {
        const res = await api.post('/products', formData);
        setProducts([res.data.data, ...products]);
      }
      setIsFormOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      brand: '',
      price: '',
      originalPrice: '',
      badge: '',
      description: '',
      image: '',
      isFeatured: true,
      isBestDeal: true,
      isMoreToLove: true,
    });
    setEditingProduct(null);
  };

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        sku: editingProduct.sku || '',
        category: editingProduct.category || '',
        brand: editingProduct.brand || '',
        price: editingProduct.price || '',
        originalPrice: editingProduct.originalPrice || '',
        badge: editingProduct.badge || '',
        description: editingProduct.description || '',
        image: editingProduct.image || '',
        isFeatured: editingProduct.isFeatured ?? true,
        isBestDeal: editingProduct.isBestDeal ?? true,
        isMoreToLove: editingProduct.isMoreToLove ?? true,
      });
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black text-dark-blue italic font-oswald uppercase tracking-tighter leading-none">
            Product <span className="text-accent underline decoration-4 underline-offset-8">Catalog</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Manage your inventory and product details</p>
        </div>
        
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }}
          className="admin-btn-accent h-14 px-8 flex items-center gap-3"
        >
          <Plus size={20} strokeWidth={3} />
          Add New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search by name, SKU or brand..."
            className="w-full h-12 bg-slate-50 rounded-xl pl-12 pr-6 outline-none border border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button className="h-12 px-6 bg-slate-50 rounded-xl flex items-center gap-3 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all">
            <Filter size={16} /> Filter
          </button>
          <button className="h-12 px-6 bg-slate-50 rounded-xl flex items-center gap-3 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all">
             Sort: Latest
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="admin-card">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">SKU</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Price</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 flex items-center justify-center shrink-0">
                            <img src={p.image} alt="" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <h4 className="font-black text-dark-blue text-sm uppercase tracking-tight">{p.name}</h4>
                            <p className="text-slate-400 text-xs font-bold uppercase">{p.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-slate-500 font-mono tracking-tight">{p.sku}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">{p.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-black text-dark-blue italic font-oswald">${p.price}</div>
                        {p.originalPrice && <div className="text-[10px] text-slate-300 line-through font-bold">${p.originalPrice}</div>}
                      </td>
                      <td className="px-8 py-6">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                           p.badge === 'Sale' ? 'bg-orange-50 text-orange-500' : 
                           p.badge === 'New' ? 'bg-green-50 text-green-500' :
                           p.badge === 'Popular' ? 'bg-blue-50 text-blue-500' :
                           'bg-slate-50 text-slate-400'
                         }`}>
                           {p.badge || 'Standard'}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setEditingProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-dark-blue hover:text-white hover:border-dark-blue transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p._id)}
                            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center gap-3 text-slate-300">
                         <Package size={48} strokeWidth={1} />
                         <p className="font-bold uppercase text-[10px] tracking-widest">No products found</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredProducts.length} entries</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-30" disabled>
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-xl bg-dark-blue text-white font-black text-sm">1</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-accent">2</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:border-accent">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-blue/80 backdrop-blur-sm"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col"
            >
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                  <h2 className="text-3xl font-black text-dark-blue uppercase italic font-oswald">
                    {editingProduct ? 'Edit' : 'Add New'} <span className="text-accent">Product</span>
                  </h2>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all">
                    <ChevronLeft className="rotate-180" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Product Name *</label>
                      <input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="admin-input" 
                        placeholder="e.g. RIDEX 295W0003 Wiper Motor" 
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">SKU / Part Number *</label>
                      <input 
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="admin-input" 
                        placeholder="e.g. 295W0003" 
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Category *</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="admin-input appearance-none"
                        required
                      >
                         <option value="">Select Category</option>
                         {categories.map(c => (
                           <option key={c._id} value={c.name}>{c.name}</option>
                         ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Brand *</label>
                      <input 
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="admin-input" 
                        placeholder="e.g. RIDEX" 
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Price ($) *</label>
                      <input 
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="admin-input" 
                        placeholder="0.00" 
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Badge / Status</label>
                      <select 
                        name="badge"
                        value={formData.badge}
                        onChange={handleInputChange}
                        className="admin-input appearance-none"
                      >
                         <option value="">Standard</option>
                         <option value="Sale">Sale</option>
                         <option value="New">New</option>
                         <option value="Popular">Popular</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Product Description</label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 rounded-2xl p-6 min-h-[150px] outline-none border border-transparent focus:border-accent focus:bg-white transition-all text-sm font-bold" 
                      placeholder="Enter detailed product description..." 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Product Image URL</label>
                    <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-200">
                           {formData.image ? <img src={formData.image} className="w-10 h-10 object-contain" /> : <ImageIcon size={24} />}
                        </div>
                        <input 
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="flex-1 admin-input" 
                          placeholder="https://example.com/image.webp" 
                        />
                    </div>
                  </div>
                </div>

                <div className="p-10 border-t border-slate-50 bg-slate-50/50 flex items-center justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-8 h-14 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-dark-blue transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary h-14 px-12 flex items-center gap-3">
                    {editingProduct ? 'Update Product' : 'Add Product'} <Plus size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
