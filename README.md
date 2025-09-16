Property Listings App
A modern, responsive React application for managing and viewing property listings. Users can add new properties, search/filter existing properties, and view property details with integrated Google Maps for location visualization.
Built with React, TailwindCSS, Axios, React Modal, and Framer Motion for smooth animations and a sleek, modern UI.
Features

Add new properties with details: Name, Type, Price, Location, Description, Image, Latitude & Longitude
Search properties by name or location
Filter properties by type
Responsive property cards with hover animations
Detailed modal view with Google Maps for properties with coordinates
Modern design with gradient backgrounds, glassmorphism cards, and gradient buttons
Smooth animations using Framer Motion

Tech Stack

React – Frontend library for building UI components
TailwindCSS – Utility-first CSS for rapid styling
Axios – HTTP requests to backend API
React Modal – Modal component for property details
Framer Motion – Animations for cards and modals

Installation

Clone the repository

bashgit clone https://github.com/yourusername/property-listings.git
cd property-listings

Install dependencies

bashnpm install

Run the app

bashnpm run dev

Open in browser

Visit http://localhost:5173 (Vite default)
Backend API
The app expects a backend API at:

GET /properties – Fetch all properties
POST /properties – Add a new property

Sample property object:
json{
  "id": 1,
  "name": "Luxury Villa",
  "type": "Villa",
  "price": 12000000,
  "location": "Bengaluru, India",
  "description": "A beautiful villa with garden.",
  "image": "https://example.com/image.jpg",
  "lat": 12.9716,
  "lng": 77.5946
}
Make sure your backend API runs on http://localhost:5000/properties.
Folder Structure
plaintextsrc/
 ├── components/
 │   └── PropertyList.jsx
 ├── App.jsx
 └── main.jsx
Usage

Add Properties: Use the form to input property details like name, type, price, location, description, image URL, and coordinates
Search & Filter: Search by name or location, and filter by property type using the dropdown
View Details: Click a property card to view details in a modal, including a Google Maps display for properties with coordinates

Contributing

Fork the repository
Create a feature branch (git checkout -b feature/your-feature)
Commit changes (git commit -m "Add your feature")
Push to the branch (git push origin feature/your-feature)
Open a pull request

License
MIT License. See LICENSE for details.