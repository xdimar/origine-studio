"use client";

import { useState, useEffect } from "react";

export default function AdminLayananPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    durationMinutes: "",
    description: "",
    maxPax: "",
    discount: "",
  });

  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    if (data.length > 0)
      setFormData((prev) => ({ ...prev, category: data[0].name }));
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const method = editId ? "PATCH" : "POST";
    const url = editId ? `/api/services/${editId}` : "/api/services";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage(`Layanan berhasil ${editId ? "diupdate" : "ditambahkan"}!`);
      setEditId(null);
      setFormData({
        name: "",
        category: categories[0]?.name || "",
        price: "",
        durationMinutes: "",
        description: "",
        maxPax: "",
        discount: "",
      });
      fetchServices();
    } else {
      setMessage("Gagal menyimpan layanan.");
    }
  };

  const handleEdit = (service) => {
    setEditId(service.id);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price,
      durationMinutes: service.durationMinutes,
      description: service.description,
      maxPax: service.maxPax,
      discount: service.discount, // <-- TAMBAHKAN INI
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus layanan ini?")) {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gold mb-2">Kelola Layanan</h1>
          <div className="w-24 h-1 bg-maroon mx-auto rounded-full mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Tambah/Edit Layanan */}
          <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gold mb-4">
              {editId ? "Edit Layanan" : "Tambah Layanan Baru"}
            </h2>

            {message && (
              <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-lg text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nama Paket
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Durasi (Menit)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMinutes: e.target.value,
                      })
                    }
                    className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Maksimal Orang
                </label>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Diskon (%) - Opsional
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                    placeholder="Misal: 20 untuk 20%"
                  />
                </div>
                <input
                  type="number"
                  value={formData.maxPax}
                  onChange={(e) =>
                    setFormData({ ...formData, maxPax: e.target.value })
                  }
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-dark py-3 rounded-full font-bold hover:bg-white transition-colors">
                {editId ? "Update Layanan" : "Simpan Layanan"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setFormData({
                      name: "",
                      category: categories[0]?.name || "",
                      price: "",
                      durationMinutes: "",
                      description: "",
                      maxPax: "",
                    });
                  }}
                  className="w-full text-gray-400 hover:text-white text-sm">
                  Batal Edit
                </button>
              )}
            </form>
          </div>

          {/* List Layanan */}
          <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gold mb-4">
              Daftar Layanan ({services.length})
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="bg-dark/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{s.name}</h3>
                      <p className="text-xs text-gold">{s.category}</p>
                    </div>
                    <span className="text-sm font-bold text-white">
                      Rp {s.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{s.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>{s.durationMinutes} Menit</span>
                      <span>{s.maxPax} Orang</span>
                      {s.discount > 0 && (
                        <span className="text-green-400">
                          | Diskon {s.discount}%
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded-md text-xs font-bold">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded-md text-xs font-bold">
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
