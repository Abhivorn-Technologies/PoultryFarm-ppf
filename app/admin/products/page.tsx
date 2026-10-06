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
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // New product form fields
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: CATEGORIES[0].name,
    categorySlug: CATEGORIES[0].slug,
    image: "/assets/products/chicks/broiler-chicks.jpg",
    price: "",
    priceDisplay: "Price on Enquiry",
    unit: "per bird",
    shortDescription: "",
    description: "",
    available: true,
    featured: false,
    isPopular: false,
  });
  const [newDetailsText, setNewDetailsText] = useState("");
  const [newTagsText, setNewTagsText] = useState("");

  // Edit product helper fields
  const [editDetailsText, setEditDetailsText] = useState("");
  const [editTagsText, setEditTagsText] = useState("");

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

  const handleToggleAvailability = async (product: ProductItem) => {
    if (!product._id) {
      alert("This item is from initial data. Please save to database to toggle status.");
      return;
    }
    const newStatus = !product.available;
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((item) => (item._id === product._id ? { ...item, available: newStatus } : item))
    );

    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: newStatus }),
      });
      const data = await res.json();
      if (!data.success) {
        // revert on failure
        setProducts((prev) =>
          prev.map((item) => (item._id === product._id ? { ...item, available: !newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
      // revert on error
      setProducts((prev) =>
        prev.map((item) => (item._id === product._id ? { ...item, available: !newStatus } : item))
      );
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category) return;

    try {
      setSubmitting(true);
      const parsedDetails = newDetailsText
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const parsedTags = newTagsText
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: newProduct.price ? Number(newProduct.price) : null,
          priceDisplay: newProduct.price
            ? `₹${newProduct.price} / ${newProduct.unit || "unit"}`
            : "Price on Enquiry",
          details: parsedDetails,
          tags: parsedTags,
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
          price: "",
          priceDisplay: "Price on Enquiry",
          unit: "per bird",
          shortDescription: "",
          description: "",
          available: true,
          featured: false,
          isPopular: false,
        });
        setNewDetailsText("");
        setNewTagsText("");
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

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct({
      ...product,
      price: product.price !== null && product.price !== undefined ? (product.price as any) : "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      details: product.details || [],
      tags: product.tags || [],
      featured: product.featured ?? false,
      isPopular: product.isPopular ?? false,
    });
    setEditDetailsText((product.details || []).join("\n"));
    setEditTagsText((product.tags || []).join(", "));
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct._id) {
      alert("This default product cannot be edited directly. Please create new items to customize.");
      return;
    }

    try {
      setSubmitting(true);
      const parsedDetails = editDetailsText
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const parsedTags = editTagsText
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const res = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingProduct,
          price: editingProduct.price ? Number(editingProduct.price) : null,
          priceDisplay: editingProduct.price
            ? `₹${editingProduct.price} / ${editingProduct.unit || "unit"}`
            : "Price on Enquiry",
          shortDescription: editingProduct.shortDescription || "",
          description: editingProduct.description || "",
          details: parsedDetails,
          tags: parsedTags,
          featured: !!editingProduct.featured,
          isPopular: !!editingProduct.isPopular,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? resData.data : p))
        );
        setIsEditModalOpen(false);
        setEditingProduct(null);
      } else {
        alert(resData.error || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating product in database");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id?: string) => {
    if (!id) {
      alert("This default product cannot be deleted. Custom products can be deleted at any time.");
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
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/products/chicks/broiler-chicks.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/95 text-brand-darkGray shadow-xs backdrop-blur-xs">
                    #{p.itemNumber}
                  </span>
                  {p.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> Featured
                    </span>
                  )}
                  {p.isPopular && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-xs flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-current" /> Popular
                    </span>
                  )}
                </div>

                {/* Stock Toggle Button directly on Card */}
                <button
                  onClick={() => handleToggleAvailability(p)}
                  className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1 backdrop-blur-sm ${
                    p.available
                      ? "bg-emerald-600/90 hover:bg-emerald-700 text-white"
                      : "bg-red-600/90 hover:bg-red-700 text-white"
                  }`}
                  title="Click to toggle Stock Status"
                >
                  {p.available ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" /> Out of Stock
                    </>
                  )}
                </button>

                {/* Category & Price Overlay at bottom of image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <span className="text-[10px] font-bold bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs line-clamp-1 max-w-[140px]">
                    {p.category}
                  </span>
                  <span className="text-xs font-black bg-brand-darkGreen/90 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                    {p.priceDisplay}
                  </span>
                </div>
              </div>

              {/* Card Middle: Content & Internal Scrolling Fields */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-brand-darkGray leading-tight line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="text-[11px] text-brand-gray mt-0.5 line-clamp-1">
                    {p.shortDescription || p.category}
                  </div>
                </div>

                {/* Internal Scrolling Fields Container */}
                <div className="bg-[#FAFBF9] border border-brand-softGreen/50 rounded-2xl p-2.5 max-h-32 overflow-y-auto thin-scrollbar space-y-2 text-left">
                  {/* Overview */}
                  {p.shortDescription && (
                    <div className="text-[11px] leading-relaxed text-brand-darkGray">
                      <span className="font-bold text-brand-darkGreen">Overview: </span>
                      <span className="text-brand-gray">{p.shortDescription}</span>
                    </div>
                  )}

                  {/* Full Description snippet */}
                  {p.description && (
                    <div className="text-[11px] leading-relaxed text-brand-darkGray">
                      <span className="font-bold text-brand-darkGreen">Details: </span>
                      <span className="text-brand-gray">{p.description}</span>
                    </div>
                  )}

                  {/* Bullet Specs */}
                  {p.details && p.details.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-brand-softGreen/30">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-darkGreen">
                        Key Specs ({p.details.length}):
                      </div>
                      <div className="space-y-0.5">
                        {p.details.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-1 text-[10px] text-brand-darkGray">
                            <Check className="w-2.5 h-2.5 text-brand-freshGreen shrink-0 mt-0.5" />
                            <span className="leading-tight">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-brand-softGreen/30">
                      {p.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-brand-softGreen/50 text-brand-darkGreen"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="pt-2 border-t border-brand-softGreen/40 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-brand-lightGreen hover:bg-brand-softGreen text-brand-darkGreen font-bold text-xs transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Product</span>
                  </button>

                  <a
                    href={`/product/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-xl text-brand-gray hover:text-brand-darkGreen hover:bg-brand-cardCream border border-transparent hover:border-brand-softGreen transition"
                    title="View Live Store Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {p._id && (
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="p-1.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
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
                  <th className="py-3 px-4">Price Display</th>
                  <th className="py-3 px-4">Stock Status</th>
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
                          className="w-10 h-10 rounded-xl object-cover border border-brand-softGreen shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/assets/products/chicks/broiler-chicks.jpg";
                          }}
                        />
                        <div>
                          <div className="font-bold text-brand-darkGray text-xs sm:text-sm flex items-center gap-1.5 flex-wrap">
                            <span>{p.name}</span>
                            {p.featured && (
                              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white shadow-2xs flex items-center gap-0.5">
                                <Star className="w-2 h-2 fill-current" /> Featured
                              </span>
                            )}
                            {p.isPopular && (
                              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-500 text-white shadow-2xs flex items-center gap-0.5">
                                <Flame className="w-2 h-2 fill-current" /> Popular
                              </span>
                            )}
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
                      <button
                        onClick={() => handleToggleAvailability(p)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition ${
                          p.available
                            ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                            : "text-red-600 bg-red-50 hover:bg-red-100"
                        }`}
                        title="Click to toggle"
                      >
                        {p.available ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Available
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Out of Stock
                          </>
                        )}
                      </button>
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
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-brand-darkGreen hover:text-brand-green hover:bg-brand-softGreen/50 transition"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
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
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:px-7 border-b border-brand-softGreen/60 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-brand-darkGray">Add New Poultry Product</h2>
                <p className="text-xs text-brand-gray mt-0.5">
                  Direct upload images and specify commercial attributes for your catalogue.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Internal Scrolling Body */}
            <form onSubmit={handleCreateProduct} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 thin-scrollbar">
              {/* 1. Core Info Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> 1. Core Product Details
                </h3>

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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white cursor-pointer"
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
                      Stock Availability
                    </label>
                    <select
                      value={newProduct.available ? "yes" : "no"}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, available: e.target.value === "yes" })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white cursor-pointer"
                    >
                      <option value="yes">In Stock / Available</option>
                      <option value="no">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Direct Image Upload Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60">
                <ImageUploadField
                  label="Product Photo (Direct Upload)"
                  helperText="Upload photo directly from phone/laptop or specify an asset link."
                  value={newProduct.image}
                  onChange={(url) => setNewProduct({ ...newProduct, image: url })}
                />
              </div>

              {/* 3. Pricing & Marketing Badges Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> 3. Pricing & Badges
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Price (₹) (Leave empty for &quot;Price on Enquiry&quot;)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 150"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Denomination Unit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. per bird, per chick, per bag"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-brand-darkGray cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProduct.featured}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-darkGreen focus:ring-brand-freshGreen"
                    />
                    <span>⭐ Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-brand-darkGray cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProduct.isPopular}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, isPopular: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-darkGreen focus:ring-brand-freshGreen"
                    />
                    <span>🔥 Best Seller / Popular Badge</span>
                  </label>
                </div>
              </div>

              {/* 4. Descriptions Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> 4. Overview & Descriptions
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Short Overview (Card Summary)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short 1-2 sentence overview for cards and product overview box..."
                    value={newProduct.shortDescription}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, shortDescription: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Full In-Depth Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Comprehensive description of background, health standards, or specs..."
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* 5. Specifications & Tags Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> 5. Bullet Specifications & Tags
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Official Specifications (1 point per line)
                  </label>
                  <textarea
                    rows={4}
                    placeholder={"Disease resistance certified by hatchery\nAverage weight gain: 50-60g/day\nMinimum Order: 100 birds\nBio-secure transport packaging"}
                    value={newDetailsText}
                    onChange={(e) => setNewDetailsText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs font-mono focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Search Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="chicks, asil, breeding, day-old, vaccinated"
                    value={newTagsText}
                    onChange={(e) => setNewTagsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* Fixed Footer Buttons */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs py-3 border-t border-brand-softGreen/50 flex justify-end gap-2.5">
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
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow-md transition disabled:opacity-60"
                >
                  {submitting ? "Saving Product..." : "Save Product to Catalogue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT PRODUCT MODAL ================= */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:px-7 border-b border-brand-softGreen/60 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-brand-darkGray">
                  Edit Product #{editingProduct.itemNumber}
                </h2>
                <p className="text-xs text-brand-gray mt-0.5">
                  Update details, upload new photos, or adjust pricing & specifications.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Internal Scrolling Body */}
            <form onSubmit={handleUpdateProduct} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 thin-scrollbar">
              {/* 1. Core Info Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> 1. Core Product Details
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Product / Breed Name *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Stock Availability
                    </label>
                    <select
                      value={editingProduct.available ? "yes" : "no"}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          available: e.target.value === "yes",
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white cursor-pointer"
                    >
                      <option value="yes">In Stock / Available</option>
                      <option value="no">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Direct Image Upload Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60">
                <ImageUploadField
                  label="Product Photo (Direct Upload)"
                  helperText="Upload a new photo directly from your device or keep existing URL."
                  value={editingProduct.image}
                  onChange={(url) => setEditingProduct({ ...editingProduct, image: url })}
                />
              </div>

              {/* 3. Pricing & Marketing Badges Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> 3. Pricing & Badges
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Price (₹) (Empty for &quot;Price on Enquiry&quot;)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.price ?? ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: e.target.value as any })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Denomination Unit
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. per bird, per chick, per bag"
                      value={editingProduct.unit || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, unit: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-brand-darkGray cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.featured}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-darkGreen focus:ring-brand-freshGreen"
                    />
                    <span>⭐ Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-brand-darkGray cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProduct.isPopular}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, isPopular: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-brand-darkGreen focus:ring-brand-freshGreen"
                    />
                    <span>🔥 Best Seller / Popular Badge</span>
                  </label>
                </div>
              </div>

              {/* 4. Descriptions Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> 4. Overview & Descriptions
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Short Overview (Card Summary)
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDescription || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Full In-Depth Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* 5. Specifications & Tags Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> 5. Bullet Specifications & Tags
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Official Specifications (1 point per line)
                  </label>
                  <textarea
                    rows={4}
                    value={editDetailsText}
                    onChange={(e) => setEditDetailsText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs font-mono focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Search Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editTagsText}
                    onChange={(e) => setEditTagsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs py-3 border-t border-brand-softGreen/50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-full border border-brand-softGreen text-xs font-bold text-brand-gray hover:bg-brand-cardCream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow-md transition disabled:opacity-60"
                >
                  {submitting ? "Saving Changes..." : "Save Product Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
