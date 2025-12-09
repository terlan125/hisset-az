import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductFilters } from './components/ProductFilters';
import { ProductGridSection } from './components/ProductGridSection';

function ProductsPage() {
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    diamonds: string[];
    priceRange: [number, number];
    sizes: string[];
  }>({
    categories: [],
    diamonds: [],
    priceRange: [0, 2000],
    sizes: []
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-sm">
          <a href="/" className="hover:text-gray-600 transition-colors">
            ANA SƏHİFƏ
          </a>
          <span>{'>'}</span>
          <span>MAĞAZA</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-[300px] flex-shrink-0">
            <ProductFilters 
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            <ProductGridSection 
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
              selectedFilters={selectedFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Filtrlər</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2"
                >
                  ✕
                </button>
              </div>
              <ProductFilters 
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductsPage;