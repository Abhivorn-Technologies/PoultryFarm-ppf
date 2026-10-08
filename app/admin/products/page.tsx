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
  Edit2,
  LayoutGrid,
  Table as TableIcon,
  Tag,
  Check,
  Star,
  Flame,
  FileText,
  DollarSign,
  Package,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useCart } from "@/context/CartContext";

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
  featured?: boolean;
  isPopular?: boolean;
  shortDescription?: string;
  description?: string;
  details?: string[];
  tags?: string[];
}

export default function AdminProductsPage() {
  const { showToast } = useCart();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id?: string; slug?: string; itemNum?: number; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Simplified product form fields matching website UI: Title, Category, Image, Description
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: CATEGORIES[0].name,
    categorySlug: CATEGORIES[0].slug,
    image: "/assets/products/chicks/broiler-chicks.jpg",
    description: "",
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
      const desc = newProduct.description.trim();
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name.trim(),
          category: newProduct.category,
          categorySlug: newProduct.categorySlug,
          image: newProduct.image.trim(),
          description: desc,
          shortDescription: desc,
          available: true,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setIsModalOpen(false);
        setNewProduct({
          name: "",
          category: CATEGORIES[0].name,
          categorySlug: CATEGORIES[0].slug,
          image: "/assets/products/chicks/broiler-chicks.jpg",
          description: "",
        });
        showToast("Product created successfully", "success");
        fetchProducts();
      } else {
        showToast(resData.error || "Failed to create product", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving product to database", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct({
      ...product,
      description: product.description || product.shortDescription || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const targetId =
      editingProduct._id || editingProduct.slug || String(editingProduct.itemNumber);
    if (!targetId) {
      showToast("Product identifier is missing. Please refresh and try again.", "error");
      return;
    }

    try {
      setSubmitting(true);
      const desc = (editingProduct.description || "").trim();
      const res = await fetch(`/api/products/${targetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingProduct.name.trim(),
          category: editingProduct.category,
          categorySlug: editingProduct.categorySlug,
          image: editingProduct.image.trim(),
          description: desc,
          shortDescription: desc,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setProducts((prev) =>
          prev.map((p) => {
            const isMatch =
              (p._id && p._id === targetId) ||
              (p.slug && p.slug === targetId) ||
              p.itemNumber === editingProduct.itemNumber;
            return isMatch ? { ...p, ...resData.data } : p;
          })
        );
        setIsEditModalOpen(false);
        setEditingProduct(null);
        showToast("Product updated successfully", "success");
      } else {
        showToast(resData.error || "Failed to update product", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating product in database", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const executeDeleteProduct = async () => {
    if (!productToDelete) return;
    const targetId =
      productToDelete.id ||
      productToDelete.slug ||
      (productToDelete.itemNum ? String(productToDelete.itemNum) : "");
    if (!targetId) {
      showToast("Product identifier is missing.", "error");
      setProductToDelete(null);
      return;
    }

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/products/${targetId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.filter(
            (p) =>
              p._id !== targetId &&
              p.slug !== targetId &&
              String(p.itemNumber) !== targetId
          )
        );
        showToast("Product deleted successfully", "success");
        setProductToDelete(null);
      } else {
        showToast(data.error || "Failed to delete product", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting product from database", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCat =
      selectedCategory === "all" || p.categorySlug === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Reset pagination on search, category or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const valid = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(valid);
  };

  return (
    <div className="space-y-6">
      {/* Sticky Compact Header & Controls Bar */}
      <div className="sticky top-0 z-30 bg-[#F5F8F5]/95 backdrop-blur-md py-3 border-b border-brand-softGreen/50 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-brand-darkGray flex items-center gap-2">
              <span>Product Catalogue</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightGreen text-brand-darkGreen">
                {products.length} Items
              </span>
            </h1>
            <p className="text-[11px] text-brand-gray mt-0.5 hidden sm:block">
              Direct upload photos and maintain stock, specifications, and pricing.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-brand-softGreen/80 shadow-xs">
              <button
                onClick={() => setViewMode("cards")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  viewMode === "cards"
                    ? "bg-brand-darkGreen text-white shadow-xs"
                    : "text-brand-gray hover:text-brand-darkGray"
                }`}
                title="Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  viewMode === "table"
                    ? "bg-brand-darkGreen text-white shadow-xs"
                    : "text-brand-gray hover:text-brand-darkGray"
                }`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Table</span>
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs shadow-md transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Compact Search & Category Filter Bar */}
        <div className="bg-white px-3.5 py-2 rounded-2xl border border-brand-softGreen/60 shadow-xs flex flex-col sm:flex-row items-center gap-2.5 justify-between">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search products by name, tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray"
            />
            <Search className="w-3.5 h-3.5 text-brand-gray absolute left-2.5 top-2" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-[11px] font-bold text-brand-gray shrink-0 flex items-center gap-1">
              <Layers className="w-3 h-3 text-brand-freshGreen" /> Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream px-2.5 py-1 text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen font-medium cursor-pointer"
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
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="bg-white p-16 rounded-3xl border border-brand-softGreen/60 text-center text-brand-gray">
          <RotateCw className="w-8 h-8 animate-spin mx-auto text-brand-freshGreen mb-2" />
          <div className="font-bold text-sm text-brand-darkGray">Loading catalogue products...</div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-brand-softGreen/60 text-center text-brand-gray">
          <div className="text-4xl mb-2">🔍</div>
          <div className="font-bold text-sm text-brand-darkGray">No products match your search</div>
          <p className="text-xs mt-1">Try another keyword or category filter.</p>
        </div>
      ) : viewMode === "cards" ? (
        /* ================= CARDS VIEW (Neat UI with internal scrolling fields) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedProducts.map((p) => (
            <div
              key={p._id || p.itemNumber}
              className="bg-white rounded-3xl border border-brand-softGreen/70 shadow-xs hover:border-brand-freshGreen hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Card Top: Image + Badges */}
              <div className="relative h-44 w-full bg-brand-cardCream overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "/assets/products/chicks/broiler-chicks.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 text-brand-darkGray shadow-xs backdrop-blur-xs">
                    #{p.itemNumber}
                  </span>
                </div>

                {/* Category Overlay at bottom of image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <span className="text-[10px] font-bold bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs line-clamp-1">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Card Middle: Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-brand-darkGray leading-tight line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-brand-gray leading-relaxed line-clamp-3">
                    {p.description || p.shortDescription || "No description provided."}
                  </p>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-brand-softGreen/40 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-lightGreen hover:bg-brand-softGreen text-brand-darkGreen font-bold text-xs transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Product</span>
                  </button>

                  <a
                    href={`/product/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-brand-gray hover:text-brand-darkGreen hover:bg-brand-cardCream border border-transparent hover:border-brand-softGreen transition"
                    title="View Live Store Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setProductToDelete({ id: p._id, slug: p.slug, itemNum: p.itemNumber, name: p.name })}
                    className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= TABLE VIEW ================= */
        <div className="bg-white rounded-3xl border border-brand-softGreen/60 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] text-brand-gray font-bold border-b border-brand-softGreen/30 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Product Info</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-softGreen/20">
                {paginatedProducts.map((p) => (
                  <tr key={p._id || p.itemNumber} className="hover:bg-[#FAFBF9] transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-gray">
                      #{p.itemNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-11 h-11 rounded-xl object-cover border border-brand-softGreen shrink-0"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "/assets/products/chicks/broiler-chicks.jpg";
                          }}
                        />
                        <div className="font-bold text-brand-darkGray text-xs sm:text-sm">
                          {p.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-softGreen/60 text-brand-darkGreen">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <p className="text-xs text-brand-gray line-clamp-2">
                        {p.description || p.shortDescription || "—"}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-brand-darkGreen hover:bg-brand-softGreen/50 transition cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`/product/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-brand-gray hover:text-brand-darkGreen hover:bg-brand-cardCream transition"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setProductToDelete({ id: p._id, slug: p.slug, itemNum: p.itemNumber, name: p.name })}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls Bar for Admin */}
      {!loading && filteredProducts.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-brand-softGreen/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-brand-gray flex items-center gap-2">
            <span>
              Showing <strong className="text-brand-darkGray font-bold">{startIndex + 1}–{endIndex}</strong> of{" "}
              <strong className="text-brand-darkGreen font-bold">{filteredProducts.length}</strong> items
            </span>
            <span className="text-brand-softGreen">|</span>
            <span className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-brand-cardCream border border-brand-softGreen rounded-lg px-2 py-0.5 text-xs font-bold text-brand-darkGray focus:outline-none focus:ring-1 focus:ring-brand-freshGreen cursor-pointer"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-xl border border-brand-softGreen text-brand-darkGray hover:bg-brand-softGreen/30 disabled:opacity-30 disabled:pointer-events-none transition"
                title="First Page"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1 rounded-xl border border-brand-softGreen font-bold text-brand-darkGray hover:bg-brand-softGreen/30 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;

                  return (
                    <React.Fragment key={p}>
                      {showEllipsis && <span className="px-1 text-brand-gray font-bold">...</span>}
                      <button
                        onClick={() => handlePageChange(p)}
                        className={`w-7 h-7 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                          currentPage === p
                            ? "bg-brand-darkGreen text-white shadow-xs font-black"
                            : "border border-brand-softGreen text-brand-darkGray hover:bg-brand-softGreen/30"
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 rounded-xl border border-brand-softGreen font-bold text-brand-darkGray hover:bg-brand-softGreen/30 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-xl border border-brand-softGreen text-brand-darkGray hover:bg-brand-softGreen/30 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Last Page"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= ADD PRODUCT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:px-7 border-b border-brand-softGreen/60 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-brand-darkGray">Add New Product</h2>
                <p className="text-xs text-brand-gray mt-0.5">
                  Specify product details to display on your catalogue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateProduct} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 thin-scrollbar">
              {/* 1. Title / Breed Name */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Product Title / Breed Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Aseel Gamecock Pair"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                />
              </div>

              {/* 2. Category */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Category *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Image Upload Field */}
              <div>
                <ImageUploadField
                  label="Product Photo *"
                  helperText="Upload a product photo directly or specify an asset link."
                  value={newProduct.image}
                  onChange={(url) => setNewProduct({ ...newProduct, image: url })}
                />
              </div>

              {/* 4. Description */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter full product description as displayed on the website..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white leading-relaxed"
                />
              </div>

              {/* Footer Buttons */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs py-3 border-t border-brand-softGreen/50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-brand-softGreen text-xs font-bold text-brand-gray hover:bg-brand-cardCream cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow-md transition disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Saving Product..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT PRODUCT MODAL ================= */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:px-7 border-b border-brand-softGreen/60 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-brand-darkGray">
                  Edit Product #{editingProduct.itemNumber}
                </h2>
                <p className="text-xs text-brand-gray mt-0.5">
                  Update title, category, photo, or description.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateProduct} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 thin-scrollbar">
              {/* 1. Title / Breed Name */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Product Title / Breed Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                />
              </div>

              {/* 2. Category */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Category *
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => {
                    const found = CATEGORIES.find((c) => c.name === e.target.value);
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                      categorySlug: found ? found.slug : editingProduct.categorySlug,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Image Upload Field */}
              <div>
                <ImageUploadField
                  label="Product Photo *"
                  helperText="Upload a new photo or keep the existing image."
                  value={editingProduct.image}
                  onChange={(url) => setEditingProduct({ ...editingProduct, image: url })}
                />
              </div>

              {/* 4. Description */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingProduct.description || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white leading-relaxed"
                />
              </div>

              {/* Footer Buttons */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs py-3 border-t border-brand-softGreen/50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-full border border-brand-softGreen text-xs font-bold text-brand-gray hover:bg-brand-cardCream cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow-md transition disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Saving Changes..." : "Save Product Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* In-app Confirmation Modal for Deleting Products (No Browser Confirm Alerts) */}
      <ConfirmModal
        isOpen={!!productToDelete}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Yes, Delete Product"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={executeDeleteProduct}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}
