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
  Sparkles,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

export default function AdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Category Form state
  const [newCat, setNewCat] = useState({
    name: "",
    badge: "Specialized Sector",
    description: "",
    image: "/assets/catgories/Chicks & Young Birds.png",
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name) return;

    const slug = newCat.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newCategoryItem = {
      id: `cat-${slug}`,
      slug,
      name: newCat.name,
      badge: newCat.badge || "Specialized Sector",
      description: newCat.description || "Farm sector products and commercial breeding solutions.",
      image: newCat.image,
      icon: "Layers",
      itemCount: 0,
    };

    setCategoriesList((prev) => [newCategoryItem, ...prev]);
    setIsModalOpen(false);
    setNewCat({
      name: "",
      badge: "Specialized Sector",
      description: "",
      image: "/assets/catgories/Chicks & Young Birds.png",
    });
  };

  const filteredCategories = categoriesList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-darkGray">Farm Categories Manager</h1>
          <p className="text-xs text-brand-gray mt-1">
            Organize and manage your 12 specialized poultry sectors, badges, and catalog counts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-softGreen/60 shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray"
          />
          <Search className="w-4 h-4 text-brand-gray absolute left-3 top-2.5" />
        </div>

        <span className="text-xs font-bold text-brand-gray shrink-0">
          Total Categories: <strong className="text-brand-darkGray">{categoriesList.length}</strong>
        </span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat, idx) => {
          // Calculate active products count
          const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length || cat.itemCount;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-brand-softGreen/60 shadow-xs overflow-hidden flex flex-col justify-between hover:border-brand-freshGreen transition-all group"
            >
              {/* Category Image Header */}
              <div className="relative h-40 w-full overflow-hidden bg-brand-cardCream">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-brand-darkGreen shadow-xs backdrop-blur-xs">
                    Sector #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-freshGreen/90 uppercase tracking-wider mb-1">
                    {cat.badge}
                  </span>
                  <h3 className="font-extrabold text-base leading-tight drop-shadow-sm">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Description & Product Count */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-brand-gray line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-4 mt-4 border-t border-brand-softGreen/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-darkGray">
                    <Package className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>{count} Products Listed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products`}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-softGreen/50 hover:bg-brand-softGreen text-brand-darkGreen transition"
                    >
                      Manage
                    </Link>
                    <Link
                      href={`/category/${cat.slug}`}
                      target="_blank"
                      className="p-1 rounded-lg text-brand-gray hover:text-brand-darkGreen hover:bg-brand-softGreen/40 transition"
                      title="View on Live Store"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-brand-softGreen shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-brand-cardCream text-brand-gray hover:text-brand-darkGray"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-black text-brand-darkGray">Add New Farm Sector</h2>
            <p className="text-xs text-brand-gray mt-1">
              Create a new category in your poultry farm catalog.
            </p>

            <form onSubmit={handleAddCategory} className="space-y-4 mt-6">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Sector Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. Breeding Stock, Exotic Birds"
                  value={newCat.badge}
                  onChange={(e) => setNewCat({ ...newCat, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of breeds, equipment, or feeds in this sector..."
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  placeholder="/assets/catgories/... or https://..."
                  value={newCat.image}
                  onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen outline-none"
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
                  className="px-6 py-2 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-xs font-bold shadow transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
