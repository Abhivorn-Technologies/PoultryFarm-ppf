"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Link2, X } from "lucide-react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: "square" | "wide";
}

export default function ImageUploadField({
  value,
  onChange,
  label = "Product Image",
  helperText = "Upload directly from your phone/computer (JPG, PNG, WebP) or enter an asset URL.",
  aspectRatio = "square",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
    // Reset file input value so user can upload the same file again if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file: File) => {
    // Basic file size check: 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image is too large. Please select an image under 10MB.");
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        onChange(data.url);
        setUploadSuccess("Photo uploaded & linked successfully!");
        setTimeout(() => setUploadSuccess(null), 4000);
      } else {
        setUploadError(data.error || "Failed to upload file");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err?.message || "Network error while uploading");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-brand-darkGray flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-brand-freshGreen" />
          {label} *
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-bold text-brand-darkGreen hover:underline flex items-center gap-1"
        >
          <Link2 className="w-3 h-3" />
          {showUrlInput ? "Hide URL Box" : "Edit / Enter Custom URL"}
        </button>
      </div>

      {helperText && (
        <p className="text-[11px] text-brand-gray leading-tight">
          {helperText}
        </p>
      )}

      {/* Main Upload / Preview Area */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Box */}
        <div className="sm:col-span-4">
          <div
            className={`relative rounded-2xl overflow-hidden border border-brand-softGreen/80 bg-brand-cardCream shadow-xs flex items-center justify-center ${
              aspectRatio === "wide" ? "h-28" : "h-32"
            }`}
          >
            {value ? (
              <img
                src={value}
                alt="Selected preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/products/chicks/broiler-chicks.jpg";
                }}
              />
            ) : (
              <div className="text-center p-3 text-brand-gray">
                <ImageIcon className="w-8 h-8 mx-auto text-brand-softGreen mb-1" />
                <span className="text-[10px] font-medium">No Image Selected</span>
              </div>
            )}

            {/* Change button overlay */}
            {value && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 text-white font-bold text-[10px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[2px]"
              >
                Click to Replace
              </button>
            )}
          </div>
        </div>

        {/* Drag & Drop Upload Trigger Box */}
        <div className="sm:col-span-8">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all bg-white hover:bg-brand-cardCream/60 flex flex-col items-center justify-center cursor-pointer ${
              uploading
                ? "border-brand-freshGreen bg-brand-lightGreen/40"
                : "border-brand-softGreen hover:border-brand-freshGreen"
            }`}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploading ? (
              <div className="py-2 flex flex-col items-center gap-1.5">
                <Loader2 className="w-6 h-6 text-brand-darkGreen animate-spin" />
                <span className="text-xs font-bold text-brand-darkGreen">
                  Uploading image to server...
                </span>
                <span className="text-[10px] text-brand-gray">Saving to assets storage</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-brand-lightGreen flex items-center justify-center text-brand-darkGreen mb-1.5 shadow-xs">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-brand-darkGray">
                  Click to Upload or Drag & Drop
                </div>
                <div className="text-[10px] text-brand-gray mt-0.5">
                  Direct upload from phone/PC (PNG, JPG, WebP up to 10MB)
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-2.5 px-3.5 py-1 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white text-[11px] font-bold shadow-xs transition"
                >
                  Choose File from Device
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Error Notification */}
      {uploadError && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Manual URL Input (collapsible or toggled) */}
      {showUrlInput && (
        <div className="pt-1.5 animate-in fade-in">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. /assets/products/chicks/broiler-chicks.jpg or https://..."
              className="w-full pl-8 pr-8 py-2 text-xs rounded-xl border border-brand-softGreen font-mono bg-brand-cardCream focus:ring-2 focus:ring-brand-freshGreen outline-none text-brand-darkGray"
            />
            <Link2 className="w-3.5 h-3.5 text-brand-gray absolute left-2.5 top-2.5" />
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-2.5 top-2.5 text-brand-gray hover:text-red-500"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-[10px] text-brand-gray mt-1 block">
            Current path: <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">{value || "none"}</code>
          </span>
        </div>
      )}
    </div>
  );
}
