"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, PhotoItem } from "@/lib/store";
import { Camera, Plus, Star, Heart, Upload, X, CheckCircle2, Trash2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";

export default function AlbumsPage() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [albumId, setAlbumId] = useState("Private Vault");
  const [photoUrl, setPhotoUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    setPhotos(getStoredData("deardiary_photos", [], user?.id));
  }, [user]);

  // Handle local file selection via FileReader (base64)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save uploaded photo to store
  const handleSavePhoto = () => {
    const finalUrl = photoUrl.trim() || previewUrl;
    if (!finalUrl) {
      alert("Please select a local photo file or enter an image URL.");
      return;
    }
    if (!caption.trim()) {
      alert("Please add a title or caption for your photo memory.");
      return;
    }

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      url: finalUrl,
      caption: caption.trim(),
      albumId: albumId.trim() || "Private Vault",
      isFavorite: false,
      date: new Date().toISOString().split("T")[0]
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    setStoredData("deardiary_photos", updated, user?.id);

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setCaption("");
      setPhotoUrl("");
      setPreviewUrl(null);
    }, 1200);
  };

  // Toggle favorite on photo
  const toggleFavorite = (id: string) => {
    const updated = photos.map((p) =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    setPhotos(updated);
    setStoredData("deardiary_photos", updated, user?.id);
  };

  // Delete photo
  const handleDeletePhoto = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    setStoredData("deardiary_photos", updated, user?.id);
  };

  return (
    <div className="space-y-8 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE6D8]">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-pink-500" /> Private Photo Vault
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Photo Albums & Memories
          </h1>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md border border-pink-300 flex items-center gap-1.5 btn-shimmer"
        >
          <Plus className="w-4 h-4 text-black" /> Upload Photo
        </button>
      </div>

      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-[#EFE6D8] bg-[#FAF5F0]">
          <Camera className="w-10 h-10 text-pink-500 mx-auto" />
          <h3 className="font-serif text-xl font-extrabold text-black">Your Photo Vault is Empty</h3>
          <p className="text-xs text-black font-semibold max-w-sm mx-auto">
            Click &ldquo;Upload Photo&rdquo; above to select photos from your device or paste image links!
          </p>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-black font-extrabold text-xs border border-pink-300 btn-shimmer"
          >
            Upload Your First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-[#EFE6D8] bg-[#FAF5F0] relative group">
              <div className="aspect-video relative overflow-hidden bg-[#F5EFE6]">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                
                {/* Actions overlay */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-90">
                  <button
                    onClick={() => toggleFavorite(photo.id)}
                    className="p-1.5 rounded-lg bg-[#FAF5F0]/90 border border-[#EFE6D8] hover:bg-white text-black transition-colors"
                  >
                    <Star className={`w-4 h-4 ${photo.isFavorite ? "text-amber-500 fill-amber-500" : "text-black"}`} />
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-1.5 rounded-lg bg-[#FAF5F0]/90 border border-[#EFE6D8] hover:bg-red-50 text-black hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-serif text-lg font-extrabold text-black">{photo.caption}</h3>
                <div className="flex justify-between text-xs text-black font-extrabold pt-2 border-t border-[#EFE6D8]">
                  <span className="text-pink-600">📁 {photo.albumId || "Private Vault"}</span>
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Photo Modal with Smooth Scrollable Container */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/30 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#FAF5F0] rounded-3xl p-6 border border-[#EFE6D8] shadow-2xl my-auto max-h-[90vh] flex flex-col justify-between"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#EFE6D8] pb-3 mb-4 flex-shrink-0">
                <h3 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
                  <Upload className="w-5 h-5 text-pink-500" /> Upload Memory Photo
                </h3>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1.5 rounded-xl bg-[#F5EFE6] text-black border border-[#EFE6D8]"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="overflow-y-auto space-y-4 pr-1 flex-1">
                {/* File Upload Drop Zone */}
                <div>
                  <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1.5">
                    1. Select Local Photo File
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-[#EFE6D8] bg-[#F5EFE6] hover:bg-pink-50 cursor-pointer transition-colors text-center">
                    <ImageIcon className="w-7 h-7 text-pink-500 mb-1.5" />
                    <span className="text-xs font-extrabold text-black">Click to Choose Photo File</span>
                    <span className="text-[10px] text-black font-semibold mt-0.5">PNG, JPG, WEBP formats supported</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                {/* OR Image URL Input */}
                <div>
                  <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                    OR Paste Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={photoUrl}
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
                  />
                </div>

                {/* Compact Photo Preview */}
                {previewUrl && (
                  <div className="relative max-h-48 rounded-2xl overflow-hidden border border-[#EFE6D8] bg-black/5 flex items-center justify-center">
                    <img src={previewUrl} alt="Preview" className="max-h-48 w-full object-cover" />
                  </div>
                )}

                {/* Caption Input */}
                <div>
                  <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                    2. Photo Title / Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset Stroll Along the Rose Coast"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
                  />
                </div>

                {/* Album Category */}
                <div>
                  <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                    3. Album Category
                  </label>
                  <select
                    value={albumId}
                    onChange={(e) => setAlbumId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs font-extrabold text-black focus:outline-none"
                  >
                    <option value="Private Vault">Private Vault</option>
                    <option value="Kyoto Memories">Kyoto Memories</option>
                    <option value="Rainy Mornings">Rainy Mornings</option>
                    <option value="Family Moments">Family Moments</option>
                  </select>
                </div>
              </div>

              {/* Submit Button (Sticky at Modal Bottom) */}
              <div className="pt-4 mt-2 border-t border-[#EFE6D8] flex-shrink-0">
                <button
                  onClick={handleSavePhoto}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md border border-pink-300 flex items-center justify-center gap-2 btn-shimmer"
                >
                  {uploadSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black" /> Photo Saved to Vault!
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-black" /> Save Photo to Vault
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
