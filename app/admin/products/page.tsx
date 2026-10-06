"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  ExternalLink,
  Layers,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

interface ProductItem {
  _id?: string;
  id?: number;
  itemNumber: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  image: string;
  price: number | null;
  priceDisplay: string;
  unit?: string;
  available: boolean;
  shortDescription?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New product form fields
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: CATEGORIES[0].name,
    categorySlug: CATEGORIES[0].slug,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
    price: "",
    priceDisplay: "Price on Enquiry",
    unit: "per bird",
    shortDescription: "",
    available: true,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.data) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    const found = CATEGORIES.find((c) => c.name === categoryName);
    setNewProduct((prev) => ({
      ...prev,
      category: categoryName,
      categorySlug: found ? found.slug : "chicks-young-birds",
    }));
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: newProduct.price ? Number(newProduct.price) : null,
          priceDisplay: newProduct.price
            ? `₹${newProduct.price} / ${newProduct.unit}`
            : "Price on Enquiry",
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setIsModalOpen(false);
        setNewProduct({
          name: "",
          category: CATEGORIES[0].name,
          categorySlug: CATEGORIES[0].slug,
          image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
          price: "",
          priceDisplay: "Price on Enquiry",
          unit: "per bird",
          shortDescription: "",
          available: true,
        });
        fetchProducts();
      } else {
        alert(resData.error || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving product to database");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id?: string) => {
    if (!id) {
      alert("This is a static initial product. To delete, please create dynamic products in MongoDB.");
      return;
    }
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "all" || p.categorySlug === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-darkGray">Product Catalogue Manager</h1>
          <p className="text-xs text-brand-gray mt-1">
            View, add, and manage your commercial breeds, chicks, feeds, and equipment in MongoDB.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-softGreen/60 shadow-xs flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray"
          />
          <Search className="w-4 h-4 text-brand-gray absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-brand-gray shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream px-3 py-2 text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen font-medium"
          >
            <option value="all">All Categories ({products.length})</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-brand-softGreen/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-brand-gray">Loading products from MongoDB...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-brand-gray">
              <div className="text-3xl mb-2">🔍</div>
              <div className="font-bold text-sm text-brand-darkGray">No products match your search</div>
              <p className="text-xs mt-1">Try another keyword or category filter.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] text-brand-gray font-bold border-b border-brand-softGreen/30 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Product Info</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price Display</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-softGreen/20">
                {filteredProducts.map((p) => (
                  <tr key={p._id || p.itemNumber} className="hover:bg-[#FAFBF9] transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-gray">
                      #{p.itemNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-brand-softGreen shrink-0"
                        />
                        <div>
                          <div className="font-bold text-brand-darkGray text-xs sm:text-sm">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-brand-gray line-clamp-1">
                            {p.shortDescription || p.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-softGreen/60 text-brand-darkGreen">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand-darkGray">
                      {p.priceDisplay}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.available ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/product/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-brand-gray hover:text-brand-darkGreen hover:bg-brand-softGreen/40 transition"
                          title="View on Live Store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        {p._id && (
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-black text-brand-darkGray">Add New Poultry Product</h2>
            <p className="text-xs text-brand-gray mt-1">
              Save new breeding stock or equipment directly to MongoDB.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Product / Breed Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Aseel Gamecock Pair"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Category *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Unit (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. per chick, per tray"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Price (Leave empty for &quot;Price on Enquiry&quot;)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Key breed traits, vaccination status, delivery details..."
                  value={newProduct.shortDescription}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, shortDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-brand-softGreen text-xs font-bold text-brand-gray hover:bg-brand-cardCream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow transition"
                >
                  {submitting ? "Saving to MongoDB..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
