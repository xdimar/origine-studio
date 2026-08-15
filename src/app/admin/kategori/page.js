"use client";

import { useState, useEffect } from "react";

export default function AdminKategoriPage() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCat) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCat }),
    });
    if (res.ok) {
      setNewCat("");
      fetchCategories();
    }
  };

  const handleUpdate = async (id) => {
    await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    setEditId(null);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus kategori ini?")) {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gold mb-2">Kelola Kategori</h1>
          <div className="w-24 h-1 bg-maroon mx-auto rounded-full mb-4"></div>
        </div>

        {/* Form Tambah */}
        <form onSubmit={handleAdd} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Nama kategori baru (misal: Wedding)"
            className="flex-1 bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="bg-gold text-dark px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
            Tambah
          </button>
        </form>

        {/* List Kategori */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 space-y-4">
          {categories.length === 0 ? (
            <p className="text-center text-gray-400">Belum ada kategori.</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between bg-dark/50 border border-gray-700 rounded-lg p-3">
                {editId === cat.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 bg-dark border border-gold rounded-lg p-2 mr-4"
                  />
                ) : (
                  <span className="text-white font-medium">{cat.name}</span>
                )}

                <div className="flex gap-2">
                  {editId === cat.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        className="px-4 py-1 bg-green-700 hover:bg-green-600 rounded-md text-sm font-bold">
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="px-4 py-1 bg-gray-600 hover:bg-gray-500 rounded-md text-sm">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(cat.id);
                          setEditName(cat.name);
                        }}
                        className="px-4 py-1 bg-blue-700 hover:bg-blue-600 rounded-md text-sm font-bold">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="px-4 py-1 bg-red-700 hover:bg-red-600 rounded-md text-sm font-bold">
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
