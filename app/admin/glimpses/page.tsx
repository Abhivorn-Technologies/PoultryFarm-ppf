"use client";

import React, { useState, useEffect } from "react";
import {
  Images,
  Plus,
  Search,
  Trash2,
  Edit2,
  X,
  Loader2,
  Eye,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useCart } from "@/context/CartContext";

interface GlimpseData {
  _id?: string;
  title: string;
  image: string;
  tag: string;
  order: number;
  createdAt?: string;
}

export default function AdminGlimpsesPage() {
  const { showToast } = useCart();

  const [glimpses, setGlimpses] = useState<GlimpseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create / Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formImage, setFormImage] = useState("/assets/products/chicks/broiler-chicks.jpg");
  const [formTag, setFormTag] = useState("Active Stock");
  const [formOrder, setFormOrder] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal state
  const [glimpseToDelete, setGlimpseToDelete] = useState<GlimpseData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Big preview state
  const [previewImage, setPreviewImage] = useState<GlimpseData | null>(null);

  const fetchGlimpses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/glimpses");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setGlimpses(json.data);
      }
    } catch (err) {
      console.error("Failed to load glimpses:", err);
      showToast("Failed to load glimpses from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlimpses();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setSelectedId(null);
    setFormTitle("");
    setFormImage("/assets/products/chicks/broiler-chicks.jpg");
    setFormTag("Active Stock");
    setFormOrder(glimpses.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (item: GlimpseData) => {
    setIsEditing(true);
    setSelectedId(item._id || null);
    setFormTitle(item.title);
    setFormImage(item.image);
    setFormTag(item.tag || "Active Stock");
    setFormOrder(item.order || 0);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formImage.trim()) {
      showToast("Please provide both a Title and an Image", "error");
      return;
    }

    try {
      setIsSaving(true);
      if (isEditing && selectedId) {
        // Update
        const res = await fetch("/api/glimpses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedId,
            title: formTitle.trim(),
            image: formImage.trim(),
            tag: formTag.trim(),
            order: Number(formOrder) || 0,
          }),
        });
        const json = await res.json();
        if (json.success) {
          showToast("Glimpse updated successfully", "success");
          setIsModalOpen(false);
          fetchGlimpses();
        } else {
          showToast(json.error || "Failed to update glimpse", "error");
        }
      } else {
        // Create
        const res = await fetch("/api/glimpses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle.trim(),
            image: formImage.trim(),
            tag: formTag.trim(),
            order: Number(formOrder) || 0,
          }),
        });
        const json = await res.json();
        if (json.success) {
          showToast("New glimpse added! It will automatically appear in the scroller.", "success");
          setIsModalOpen(false);
          fetchGlimpses();
        } else {
          showToast(json.error || "Failed to create glimpse", "error");
        }
      }
    } catch (err) {
      console.error("Save glimpse error:", err);
      showToast("Network error saving glimpse", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!glimpseToDelete?._id) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/glimpses?id=${glimpseToDelete._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showToast("Glimpse removed", "success");
        setGlimpseToDelete(null);
        fetchGlimpses();
      } else {
        showToast(json.error || "Failed to delete glimpse", "error");
      }
    } catch (err) {
      console.error("Delete glimpse error:", err);
      showToast("Error deleting glimpse", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredGlimpses = glimpses.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      (g.tag && g.tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-softGreen/60 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-softGreen/60 text-brand-darkGreen">
              <Images className="w-5 h-5 text-brand-darkGreen" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-brand-freshGreen">
              Homepage Scroller
            </span>
          </div>
          <h1 className="text-2xl font-black text-brand-darkGray mt-1">
            Glimpses of Our Product Range
          </h1>
          <p className="text-xs text-brand-gray mt-1 max-w-2xl leading-relaxed">
            Manage the photos displayed in the homepage gallery scroller. When you add photos, they automatically cycle continuously in the infinite loop scroller, and visitors can click any photo to view it full size.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-brand-darkGreen/25 hover:shadow-lg active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-brand-yellow" />
          <span>Add New Glimpse</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & COUNTER BAR                                                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or badge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-brand-softGreen bg-white focus:outline-none focus:ring-2 focus:ring-brand-freshGreen/50 text-brand-darkGray"
          />
        </div>

        <div className="text-xs font-bold text-brand-gray flex items-center gap-2">
          <span>Total Snapshots:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-brand-softGreen text-brand-darkGreen font-black">
            {glimpses.length}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. GLIMPSES GRID                                                          */}
      {/* ========================================================================= */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-brand-softGreen/60">
          <Loader2 className="w-8 h-8 text-brand-darkGreen animate-spin mx-auto mb-2" />
          <p className="text-xs font-bold text-brand-gray">Loading glimpses...</p>
        </div>
      ) : filteredGlimpses.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-brand-softGreen/60 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-cardCream text-brand-gray mx-auto flex items-center justify-center">
            <Images className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-brand-darkGray">No glimpses found</h3>
            <p className="text-xs text-brand-gray mt-1">
              {search ? "No snapshots matched your search criteria." : "Start by adding your first product glimpse snapshot."}
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-full bg-brand-darkGreen text-white font-bold text-xs shadow-md"
          >
            Add Glimpse
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGlimpses.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white rounded-3xl overflow-hidden border border-brand-softGreen/70 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Image Preview with Hover Controls */}
              <div className="relative aspect-video sm:aspect-square bg-brand-darkGray overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Tag Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-yellow font-black text-[10px] uppercase tracking-wider shadow-sm">
                  {item.tag || "Active Stock"}
                </span>

                {/* Big Preview Trigger */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(item)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition opacity-0 group-hover:opacity-100 shadow-sm cursor-pointer"
                  title="View full size"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-brand-gray mb-1">
                    <span>Order: #{item.order ?? idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-black text-brand-darkGray leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-brand-softGreen/50 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-brand-cardCream hover:bg-brand-softGreen/60 text-brand-darkGreen font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-brand-softGreen/60"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGlimpseToDelete(item)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                    title="Delete snapshot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ADD / EDIT MODAL                                                       */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-brand-softGreen/80 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-brand-gray hover:text-brand-darkGray hover:bg-brand-cardCream transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-brand-softGreen text-brand-darkGreen">
                <Images className="w-5 h-5 text-brand-darkGreen" />
              </span>
              <div>
                <h3 className="text-xl font-black text-brand-darkGray">
                  {isEditing ? "Edit Product Glimpse" : "Add Product Glimpse"}
                </h3>
                <p className="text-xs text-brand-gray">
                  This image will be displayed in the infinite auto-scrolling gallery.
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-brand-darkGray mb-1">
                  Snapshot Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Day-Old Kadaknath Chicks"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen outline-none text-brand-darkGray"
                />
              </div>

              {/* Tag / Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Active Stock, Formulated Feed"
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen outline-none text-brand-darkGray"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="1, 2, 3..."
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen outline-none text-brand-darkGray"
                  />
                </div>
              </div>

              {/* Image Upload Component */}
              <div>
                <ImageUploadField
                  value={formImage}
                  onChange={(url) => setFormImage(url)}
                  label="Glimpse Image *"
                  helperText="Upload image from computer or enter URL. Recommended ratio 16:9 or 4:3."
                  aspectRatio="wide"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-softGreen/50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-brand-softGreen text-brand-darkGray font-bold text-xs hover:bg-brand-cardCream transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-60 flex items-center gap-2 cursor-pointer"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add to Scroller"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CONFIRM DELETE DIALOG                                                  */}
      {/* ========================================================================= */}
      <ConfirmModal
        isOpen={Boolean(glimpseToDelete)}
        title="Delete Product Glimpse?"
        message={`Are you sure you want to remove "${glimpseToDelete?.title}"? It will no longer appear in the homepage scroller.`}
        confirmText="Yes, Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setGlimpseToDelete(null)}
      />

      {/* ========================================================================= */}
      {/* 6. BIG IMAGE LIGHTBOX PREVIEW (FOR ADMIN)                                 */}
      {/* ========================================================================= */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-brand-darkGray rounded-3xl overflow-hidden p-6 border border-white/20 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-brand-yellow px-2 py-0.5 rounded-full bg-white/10">
                  {previewImage.tag}
                </span>
                <h4 className="text-base font-bold text-white mt-1">{previewImage.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={previewImage.image}
                alt={previewImage.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
