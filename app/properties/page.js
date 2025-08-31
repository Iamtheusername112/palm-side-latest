'use client'

import { useState, useEffect } from 'react'
import { MapPin, Bed, Bath, Square, Star, Heart, Eye, Share2, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [favorites, setFavorites] = useState(new Set())

  // Sample properties data - Will be replaced with database fetch later
  const properties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      type: "Luxury Homes",
      location: "Miami Beach, FL",
      price: 8500000,
      beds: 5,
      baths: 6,
      sqft: 8500,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9,
      featured: true,
      status: "For Sale",
      description: "Stunning oceanfront villa with panoramic views, private beach access, and world-class amenities.",
      features: ["Ocean View", "Private Pool", "Smart Home", "Wine Cellar", "Gym", "Helipad"]
    },
    {
      id: 2,
      title: "Modern Downtown Penthouse",
      type: "Luxury Homes",
      location: "Downtown Miami, FL",
      price: 3200000,
      beds: 3,
      baths: 3.5,
      sqft: 4200,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      rating: 4.8,
      featured: true,
      status: "For Sale",
      description: "Contemporary penthouse with city skyline views, rooftop terrace, and luxury finishes throughout.",
      features: ["City View", "Rooftop Terrace", "Concierge", "Fitness Center", "Valet Parking"]
    },
    {
      id: 3,
      title: "Investment Portfolio - 12 Units",
      type: "Investment Properties",
      location: "Coral Gables, FL",
      price: 4500000,
      beds: 24,
      baths: 24,
      sqft: 18000,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      rating: 4.7,
      featured: false,
      status: "For Sale",
      description: "Prime investment opportunity with 12 fully renovated units, excellent cash flow potential.",
      features: ["High ROI", "Fully Renovated", "Tenant Occupied", "Property Management", "Tax Benefits"]
    },
    {
      id: 4,
      title: "Waterfront Office Complex",
      type: "Commercial Real Estate",
      location: "Brickell, FL",
      price: 12500000,
      beds: 0,
      baths: 0,
      sqft: 25000,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.9,
      featured: true,
      status: "For Lease",
      description: "Class A office space with waterfront views, modern amenities, and premium tenant mix.",
      features: ["Waterfront", "Class A", "Modern Amenities", "Premium Location", "Flexible Leasing"]
    },
    {
      id: 5,
      title: "Tropical Paradise Estate",
      type: "Luxury Homes",
      location: "Key Largo, FL",
      price: 6800000,
      beds: 4,
      baths: 5,
      sqft: 7200,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      rating: 4.9,
      featured: false,
      status: "For Sale",
      description: "Private island estate with tropical gardens, infinity pool, and direct ocean access.",
      features: ["Private Island", "Tropical Gardens", "Infinity Pool", "Ocean Access", "Helipad"]
    },
    {
      id: 6,
      title: "Mixed-Use Development",
      type: "Property Development",
      location: "Wynwood, FL",
      price: 18500000,
      beds: 0,
      baths: 0,
      sqft: 45000,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      rating: 4.8,
      featured: true,
      status: "Pre-Construction",
      description: "Innovative mixed-use development combining residential, retail, and cultural spaces.",
      features: ["Mixed-Use", "Cultural Hub", "Retail Space", "Residential Units", "Art Galleries"]
    }
  ]

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
    } else {
      newFavorites.add(propertyId)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover Your Dream Property
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Explore our curated collection of premium properties across South Florida and beyond.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {properties.length} properties available
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
                <div className="bg-current rounded-sm h-1"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                viewMode="grid"
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                viewMode="list"
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

const PropertyCard = ({ property, viewMode, isFavorite, onToggleFavorite }) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/3 h-64 lg:h-auto">
            <div className="relative h-full">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.featured && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}
              <div className={`absolute ${property.featured ? 'top-16' : 'top-4'} left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold`}>
                {property.status}
              </div>
              <button
                onClick={onToggleFavorite}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:bg-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {formatPrice(property.price)}
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  {property.rating}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{property.description}</p>

            {/* Property Details */}
            <div className="flex items-center space-x-6 mb-4">
              {property.beds > 0 && (
                <div className="flex items-center text-gray-600">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.beds} beds</span>
                </div>
              )}
              {property.baths > 0 && (
                <div className="flex items-center text-gray-600">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.baths} baths</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.sqft.toLocaleString('en-US')} sq ft</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {property.features.slice(0, 4).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 transition-colors duration-200">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        <div className={`absolute ${property.featured ? 'top-16' : 'top-4'} left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold`}>
          {property.status}
        </div>
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-4 right-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(property.price)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
            {property.rating}
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {property.beds > 0 && (
              <div className="flex items-center text-gray-600 text-sm">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.beds}</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center text-gray-600 text-sm">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.baths}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600 text-sm">
              <Square className="h-4 w-4 mr-1" />
              <span>{property.sqft.toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1 transition-colors duration-200">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertiesPage
