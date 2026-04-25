"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  Filter,
  Package,
  MoreVertical,
  Loader2
} from 'lucide-react';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

import { ProductForm } from '@/components/admin/ProductForm';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.get('/products');
      setProducts(data.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {isFormOpen && (
        <ProductForm 
          editingProduct={selectedProduct}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedProduct(null);
          }} 
          onSuccess={fetchProducts} 
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Inventory</span>
          <h1 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Manage <span className="text-accent underline decoration-4 underline-offset-8">Products</span></h1>
        </div>
        <button 
          onClick={handleAdd}
          className="h-14 px-8 bg-dark-blue text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-accent hover:text-dark-blue transition-all shadow-xl shadow-dark-blue/10 transform hover:-translate-y-1"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 bg-slate-50 rounded-xl pl-12 pr-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
            />
          </div>
          <button className="h-12 px-6 bg-slate-50 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-100 transition-all">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-medium">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="text-slate-300" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-dark-blue italic font-oswald uppercase tracking-tight">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.sku || 'NO-SKU'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-black text-dark-blue italic font-oswald">${product.price}</div>
                      {product.oldPrice && <div className="text-[10px] text-slate-300 line-through font-bold italic">${product.oldPrice}</div>}
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-slate-600">45 Units</div>
                      <div className="w-20 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div className="w-3/4 h-full bg-green-500" />
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        product.isBestDeal ? "bg-accent/10 text-accent" : "bg-green-100 text-green-600"
                      )}>
                        {product.isBestDeal ? 'Deal' : 'Active'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-dark-blue hover:text-white transition-all">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(product)}
                          className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-dark-blue transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
