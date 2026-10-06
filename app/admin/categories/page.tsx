"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  ExternalLink,
  Package,
  Plus,
  X,
  Edit2,
  Trash2,
  Sparkles,
  Tag,
  Link2,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function AdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState<any[]>(CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setCategoriesList(data.data);
      }
    } catch (err) {
      console.error("Failed to load categories from database:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  // New Category Form state
  const [newCat, setNewCat] = useState({
    name: "",
    badge: "Specialized Sector",
    description: "",
    image: "/assets/catgories/Chicks & Young Birds.png",
  });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name) return;

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCat),
      });
      const data = await res.json();
      if (data.success) {
        setCategoriesList((prev) => [data.data, ...prev]);
        setIsModalOpen(false);
        setNewCat({
          name: "",
          badge: "Specialized Sector",
          description: "",
          image: "/assets/catgories/Chicks & Young Birds.png",
        });
      } else {
        alert(data.error || "Failed to create category");
      }
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  const handleOpenEditCategory = (cat: any) => {
    setEditingCategory({ ...cat });
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const idToUpdate = editingCategory._id || editingCategory.slug;
      const res = await fetch(`/api/categories/${idToUpdate}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });
      const data = await res.json();
      if (data.success) {
        setCategoriesList((prev) =>
          prev.map((c) =>
            (c._id && c._id === editingCategory._id) || c.slug === editingCategory.slug
              ? data.data
              : c
          )
        );
        setIsEditModalOpen(false);
        setEditingCategory(null);
      } else {
        alert(data.error || "Failed to update category");
      }
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove the category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCategoriesList((prev) => prev.filter((c) => (c._id || c.slug) !== id));
      } else {
        alert(data.error || "Failed to delete category");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const filteredCategories = categoriesList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.badge.toLowerCase().includes(search.toLowerCase())
  );

  // Reset page when search or itemsPerPage changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredCategories.length);
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const valid = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(valid);
  };

  return (
    <div className="space-y-6">
      {/* Sticky Compact Header & Search Bar */}
      <div className="sticky top-0 z-30 bg-[#F5F8F5]/95 backdrop-blur-md py-3 border-b border-brand-softGreen/50 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-brand-darkGray flex items-center gap-2">
              <span>Farm Categories</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightGreen text-brand-darkGreen">
                {categoriesList.length} Sectors
              </span>
            </h1>
            <p className="text-[11px] text-brand-gray mt-0.5 hidden sm:block">
              Organize commercial sectors with direct banner image upload & internal scrolling cards.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs shadow-md transition self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Sector</span>
          </button>
        </div>

        {/* Compact Search Bar */}
        <div className="bg-white px-3.5 py-2 rounded-2xl border border-brand-softGreen/60 shadow-xs flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search categories by name, badge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray"
            />
            <Search className="w-3.5 h-3.5 text-brand-gray absolute left-2.5 top-2" />
          </div>

          <span className="text-[11px] font-bold text-brand-gray shrink-0 hidden sm:inline">
            Showing: <strong className="text-brand-darkGray font-bold">{filteredCategories.length}</strong> of {categoriesList.length}
          </span>
        </div>
      </div>

      {/* Categories Cards Grid with Internal Scrolling Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedCategories.map((cat, idx) => {
          // Calculate active products count
          const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length || cat.itemCount;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-brand-softGreen/60 shadow-xs overflow-hidden flex flex-col justify-between hover:border-brand-freshGreen hover:shadow-md transition-all group"
            >
              {/* Category Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-brand-cardCream">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/catgories/Chicks & Young Birds.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-brand-darkGreen shadow-xs backdrop-blur-xs">
                    Sector #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-freshGreen/90 uppercase tracking-wider mb-1">
                    {cat.badge}
                  </span>
                  <h3 className="font-extrabold text-base leading-tight drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Middle Section: Internal Scrolling Fields */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                {/* Scrollable details container */}
                <div className="bg-[#FAFBF9] border border-brand-softGreen/50 rounded-2xl p-3 max-h-32 overflow-y-auto thin-scrollbar space-y-2 text-left">
                  <div className="text-[11px] leading-relaxed text-brand-darkGray">
                    <span className="font-bold text-brand-darkGreen">Sector Scope: </span>
                    <span className="text-brand-gray">{cat.description}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-brand-softGreen/30 text-[10px] text-brand-gray">
                    <Tag className="w-3 h-3 text-brand-freshGreen" />
                    <span>Badge: <strong className="text-brand-darkGray">{cat.badge}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-brand-gray font-mono">
                    <Link2 className="w-3 h-3 text-brand-freshGreen" />
                    <span>Slug: /{cat.slug}</span>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-brand-softGreen/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-darkGray">
                    <Package className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>{count} Products</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditCategory(cat)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-brand-lightGreen hover:bg-brand-softGreen text-brand-darkGreen flex items-center gap-1 transition"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <Link
                      href={`/admin/products`}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-brand-cardCream hover:bg-brand-softGreen/40 border border-brand-softGreen/60 text-brand-darkGray transition"
                    >
                      Catalog
                    </Link>

                    <Link
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-xl text-brand-gray hover:text-brand-darkGreen hover:bg-brand-softGreen/40 transition border border-transparent hover:border-brand-softGreen"
                      title="View on Live Store"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {cat.id.startsWith("cat-") && (
                      <button
                        onClick={() => handleDeleteCategory(cat.id, cat.name)}
                        className="p-1.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition border border-transparent hover:border-red-100"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls Bar for Categories */}
      {filteredCategories.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-brand-softGreen/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-brand-gray flex items-center gap-2">
            <span>
              Showing <strong className="text-brand-darkGray font-bold">{startIndex + 1}–{endIndex}</strong> of{" "}
              <strong className="text-brand-darkGreen font-bold">{filteredCategories.length}</strong> sectors
            </span>
            <span className="text-brand-softGreen">|</span>
            <span className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-brand-cardCream border border-brand-softGreen rounded-lg px-2 py-0.5 text-xs font-bold text-brand-darkGray focus:outline-none focus:ring-1 focus:ring-brand-freshGreen cursor-pointer"
              >
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-7 h-7 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                    currentPage === p
                      ? "bg-brand-darkGreen text-white shadow-xs font-black"
                      : "border border-brand-softGreen text-brand-darkGray hover:bg-brand-softGreen/30"
                  }`}
                >
                  {p}
                </button>
              ))}

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

      {/* ================= ADD CATEGORY MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:px-7 border-b border-brand-softGreen/60 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-brand-darkGray">Add New Farm Sector</h2>
                <p className="text-xs text-brand-gray mt-0.5">
                  Create a new category in your poultry farm catalog.
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
            <form onSubmit={handleAddCategory} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 thin-scrollbar">
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> 1. Sector Identification
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Turkey & Game Birds"
                    value={newCat.name}
                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Sector Tag / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Specialized Sector, Commercial Layers"
                    value={newCat.badge}
                    onChange={(e) => setNewCat({ ...newCat, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* Direct Banner Image Upload */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60">
                <ImageUploadField
                  label="Sector Banner Image (Direct Upload)"
                  helperText="Upload banner directly from computer/phone or enter an asset URL."
                  aspectRatio="wide"
                  value={newCat.image}
                  onChange={(url) => setNewCat({ ...newCat, image: url })}
                />
              </div>

              {/* Description Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> 2. Sector Description
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Scope Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Summary of breeds, equipment, or feeds in this sector..."
                    value={newCat.description}
                    onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* Sticky Footer */}
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
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow-md transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT CATEGORY MODAL ================= */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:px-7 border-b border-brand-softGreen/60 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-black text-brand-darkGray">
                  Edit Sector: {editingCategory.name}
                </h2>
                <p className="text-xs text-brand-gray mt-0.5">
                  Modify sector title, badge, banner photo, or description.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Internal Scrolling Body */}
            <form onSubmit={handleUpdateCategory} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 thin-scrollbar">
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> 1. Sector Identification
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Sector Tag / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Specialized Sector, Commercial Layers"
                    value={editingCategory.badge || ""}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, badge: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* Direct Banner Image Upload */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60">
                <ImageUploadField
                  label="Sector Banner Image (Direct Upload)"
                  helperText="Upload a new photo directly from phone/laptop or keep existing link."
                  aspectRatio="wide"
                  value={editingCategory.image || ""}
                  onChange={(url) => setEditingCategory({ ...editingCategory, image: url })}
                />
              </div>

              {/* Description Card */}
              <div className="bg-brand-cardCream/60 p-4 rounded-2xl border border-brand-softGreen/60 space-y-3">
                <h3 className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> 2. Sector Description
                </h3>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Scope Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingCategory.description || ""}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none bg-white"
                  />
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-xs py-3 border-t border-brand-softGreen/50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 rounded-full border border-brand-softGreen text-xs font-bold text-brand-gray hover:bg-brand-cardCream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
