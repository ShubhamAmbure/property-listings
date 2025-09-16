import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/properties";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    location: "",
    description: "",
    image: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  useEffect(() => {
    let data = [...properties];
    if (typeFilter) data = data.filter((p) => p.type === typeFilter);
    if (search)
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(data);
  }, [properties, typeFilter, search]);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProperty(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL, {
        ...form,
        price: Number(form.price),
        lat: form.lat ? Number(form.lat) : undefined,
        lng: form.lng ? Number(form.lng) : undefined,
      })
      .then(() => {
        axios.get(API_URL).then((res) => setProperties(res.data));
        setForm({
          name: "",
          type: "",
          price: "",
          location: "",
          description: "",
          image: "",
          lat: "",
          lng: "",
        });
      })
      .catch(() => alert("Error adding property"));
  };

  const propertyTypes = [...new Set(properties.map((p) => p.type))];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Property Listings
      </h2>

      {/* Add Property Form */}
      <motion.form
        onSubmit={handleFormSubmit}
        className="mb-8 p-6 rounded-3xl shadow-lg backdrop-blur-md bg-white/30 max-w-3xl mx-auto border border-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add Property
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name","type","price","location","image","lat","lng"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleFormChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field === "lat" || field === "lng" ? " (optional)" : "")}
              type={field === "price" ? "number" : "text"}
              className="border px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm bg-white/50"
            />
          ))}
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleFormChange}
          placeholder="Description"
          required
          className="border px-3 py-2 rounded-xl w-full mt-4 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm bg-white/50"
        />
        <button className="mt-4 w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold rounded-xl hover:scale-105 transition transform shadow-lg">
          Add Property
        </button>
      </motion.form>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-xl w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/60"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/60"
        >
          <option value="">All Types</option>
          {propertyTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((property, index) => (
          <motion.div
            key={property.id}
            className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-md bg-white/40 border border-white/30 hover:shadow-2xl hover:scale-105 transition transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
          >
            <img
              src={property.image || "https://via.placeholder.com/400x250"}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1 text-gray-800">{property.name}</h3>
              <p className="text-gray-600 mb-1">📍 {property.location}</p>
              <p className="font-semibold mb-2 text-pink-600">₹{property.price}</p>
              <button
                onClick={() => handleViewDetails(property)}
                className="w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold rounded-xl hover:scale-105 transition"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
      >
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl max-w-2xl mx-auto mt-20 p-6 shadow-2xl backdrop-blur-md bg-white/40 border border-white/30"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedProperty.name}</h2>
            <img
              src={selectedProperty.image || "https://via.placeholder.com/400x250"}
              alt={selectedProperty.name}
              className="mb-2 w-full h-48 object-cover rounded-xl"
            />
            <p className="mb-1 font-semibold">Type: {selectedProperty.type}</p>
            <p className="mb-1 font-semibold">Location: {selectedProperty.location}</p>
            <p className="mb-1 font-semibold text-pink-600">Price: ₹{selectedProperty.price}</p>
            <p className="mb-2">{selectedProperty.description}</p>
            {selectedProperty.lat && selectedProperty.lng && (
              <iframe
                title="Google Maps"
                width="100%"
                height="250"
                style={{ border: 0, marginTop: "1rem", borderRadius: "12px" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${selectedProperty.lat},${selectedProperty.lng}&hl=es;z=14&output=embed`}
              />
            )}
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold rounded-xl hover:scale-105 transition"
            >
              Close
            </button>
          </motion.div>
        )}
      </Modal>
    </div>
  );
};

export default PropertyList;
