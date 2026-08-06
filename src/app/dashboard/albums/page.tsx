"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, PhotoItem, AlbumItem } from "@/lib/store";
import {
  Camera,
  FolderPlus,
  Plus,
  Star,
  Trash2,
  Heart,
  X,
  Sparkles,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoAlbumsPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [activeAlbumId, setActiveAlbumId] = useState<string | "ALL">("ALL");

  // Lightbox overlay state
  const [activeLightbox, setActiveLightbox] = useState<PhotoItem | null>(null);

  // Add Photo Form State
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [newPhotoAlbum, setNewPhotoAlbum] = useState<string>("album-1");

  // Create Album State
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumDesc, setNewAlbumDesc] = useState("");

  useEffect(() => {
    setPhotos(getStoredData("deardiary_photos", []));
    setAlbums(getStoredData("deardiary_albums", []));
  }, []);

  const toggleFavoritePhoto = (id: string) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    setPhotos(updated);
    setStoredData("deardiary_photos", updated);
  };

  const handleCreatePhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const item: PhotoItem = {
      id: `p-${Date.now()}`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || "Memory photo",
      albumId: newPhotoAlbum,
      isFavorite: false,
      date: new Date().toISOString()
    };
    const updated = [item, ...photos];
    setPhotos(updated);
    setStoredData("deardiary_photos", updated);
    setShowAddPhotoModal(false);
    setNewPhotoUrl("");
    setNewPhotoCaption("");
  };

  const handleCreateAlbum = () => {
    if (!newAlbumTitle.trim()) return;
    const album: AlbumItem = {
      id: `album-${Date.now()}`,
      title: newAlbumTitle.trim(),
      description: newAlbumDesc.trim() || "Private photo collection",
      coverUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      createdAt: new Date().toISOString()
    };
    const updated = [album, ...albums];
    setAlbums(updated);
    setStoredData("deardiary_albums", updated);
    setShowAddAlbumModal(false);
    setNewAlbumTitle("");
    setNewAlbumDesc("");
  };

  const filteredPhotos = activeAlbumId === "ALL" ? photos : photos.filter((p) => p.albumId === activeAlbumId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-rose-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" /> Private Image Vault
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Photo Albums & Memories
          </h1>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAddAlbumModal(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl glass-card text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
          >
            <FolderPlus className="w-4 h-4 text-purple-500" /> New Album
          </button>

          <button
            onClick={() => setShowAddPhotoModal(true)}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-200 dark:shadow-none flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </div>
      </div>

      {/* Album Selector Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Curated Albums</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveAlbumId("ALL")}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeAlbumId === "ALL"
                ? "bg-rose-50 dark:bg-rose-950/50 border-rose-400 font-bold"
                : "glass-card border-slate-200 dark:border-slate-800"
            }`}
          >
            <p className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100">All Photo Vault</p>
            <p className="text-xs text-slate-500 mt-1">{photos.length} Total Photos</p>
          </button>

          {albums.map((alb) => (
            <button
              key={alb.id}
              onClick={() => setActiveAlbumId(alb.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activeAlbumId === alb.id
                  ? "bg-rose-50 dark:bg-rose-950/50 border-rose-400 font-bold"
                  : "glass-card border-slate-200 dark:border-slate-800"
              }`}
            >
              <img src={alb.coverUrl} alt={alb.title} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="font-serif text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{alb.title}</p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{alb.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid Showcase */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Photos ({filteredPhotos.length})
        </h3>

        {filteredPhotos.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center space-y-2">
            <Camera className="w-8 h-8 text-rose-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No photos in this album yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-2xl overflow-hidden group glass-card border border-slate-200 dark:border-slate-800 cursor-pointer"
                onClick={() => setActiveLightbox(photo)}
              >
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoritePhoto(photo.id);
                      }}
                      className="p-1.5 rounded-full bg-black/40 hover:bg-black/60"
                    >
                      <Star className={`w-3.5 h-3.5 ${photo.isFavorite ? "fill-amber-400 text-amber-400" : "text-white"}`} />
                    </button>
                  </div>
                  <p className="text-xs font-medium line-clamp-2">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-800"
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={activeLightbox.url} alt={activeLightbox.caption} className="w-full max-h-[70vh] object-contain bg-black" />
              <div className="p-6 space-y-1 text-white">
                <p className="font-serif text-lg font-bold">{activeLightbox.caption}</p>
                <p className="text-xs text-slate-400">Preserved on {new Date(activeLightbox.date).toLocaleDateString()}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Photo Modal */}
      <AnimatePresence>
        {showAddPhotoModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-card bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Add Photo to Vault</h3>
                <button onClick={() => setShowAddPhotoModal(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>

              <input
                type="text"
                placeholder="Image URL (e.g. Unsplash URL)..."
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none border border-slate-200 dark:border-slate-700"
              />

              <input
                type="text"
                placeholder="Caption / Memory Note..."
                value={newPhotoCaption}
                onChange={(e) => setNewPhotoCaption(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none border border-slate-200 dark:border-slate-700"
              />

              <button
                onClick={handleCreatePhoto}
                className="w-full py-3 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md"
              >
                Save Photo to Album
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
