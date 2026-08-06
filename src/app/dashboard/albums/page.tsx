"use client";

import { useEffect, useState } from "react";
import { getStoredData, PhotoItem } from "@/lib/store";
import { Camera, Plus, Star, Heart } from "lucide-react";

export default function AlbumsPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  useEffect(() => {
    setPhotos(getStoredData("deardiary_photos", []));
  }, []);

  return (
    <div className="space-y-8 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-pink-500" /> Private Photo Vault
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Photo Albums & Memories
          </h1>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md border border-pink-300 flex items-center gap-1.5 btn-shimmer">
          <Plus className="w-4 h-4 text-black" /> Upload Photo
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-pink-200 bg-white">
            <div className="aspect-video relative overflow-hidden">
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif text-lg font-extrabold text-black">{photo.caption}</h3>
              <div className="flex justify-between text-xs text-black font-extrabold pt-2 border-t border-pink-100">
                <span>{photo.album}</span>
                <span>{photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
