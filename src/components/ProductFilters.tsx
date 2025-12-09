import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import img201651 from "figma:asset/0d3cd5b42c34340dd612c78835ea1c2d3b0adb38.png";

interface ProductFiltersProps {
  selectedFilters: {
    categories: string[];
    diamonds: string[];
    priceRange: [number, number];
    sizes: string[];
  };
  onFilterChange: (filters: any) => void;
}

export function ProductFilters({ selectedFilters, onFilterChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    diamonds: true,
    price: true,
    size: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    { name: 'Nişan Üzükləri', count: 120 },
    { name: 'Üzüklər', count: 240 },
    { name: 'Boyunbağılar', count: 175 },
    { name: 'Qolbaqlar', count: 120 },
    { name: 'Sırğalar', count: 90 }
  ];

  const diamonds = [
    { name: 'Round', count: 80 },
    { name: 'Princess', count: 45 },
    { name: 'Emerald', count: 35 },
    { name: 'Pear', count: 20 },
    { name: 'Cushion', count: 60 },
    { name: 'Oval', count: 90 }
  ];

  const sizes = [
    { name: '4.0', count: 120 },
    { name: '4.5', count: 240 },
    { name: '5.0', count: 175 },
    { name: '6.0', count: 120 },
    { name: '6.5', count: 90 },
    { name: '7.0', count: 85 },
    { name: '7.5', count: 50 },
    { name: '8.0', count: 35 }
  ];

  const toggleFilter = (type: 'categories' | 'diamonds' | 'sizes', value: string) => {
    const current = selectedFilters[type];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    
    onFilterChange({
      ...selectedFilters,
      [type]: updated
    });
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg">Kateqoriyalar</h3>
          {expandedSections.categories ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {expandedSections.categories && (
          <div className="space-y-4">
            {categories.map((category) => (
              <label key={category.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.categories.includes(category.name)}
                    onChange={() => toggleFilter('categories', category.name)}
                    className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#c37076]"
                  />
                  <span className="group-hover:text-gray-600">{category.name}</span>
                </div>
                <span className="text-gray-400">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ring by Diamond */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('diamonds')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg">Brilyant Forması</h3>
          {expandedSections.diamonds ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {expandedSections.diamonds && (
          <div className="space-y-4">
            {diamonds.map((diamond) => (
              <label key={diamond.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.diamonds.includes(diamond.name)}
                    onChange={() => toggleFilter('diamonds', diamond.name)}
                    className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#c37076]"
                  />
                  <img src={img201651} alt="" className="w-6 h-6 object-contain" />
                  <span className="group-hover:text-gray-600">{diamond.name}</span>
                </div>
                <span className="text-gray-400">({diamond.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg">Qiymət Aralığı</h3>
          {expandedSections.price ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Qiymət: ${selectedFilters.priceRange[0]} - ${selectedFilters.priceRange[1]}
            </p>
            <div className="relative pt-6">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={selectedFilters.priceRange[1]}
                onChange={(e) => onFilterChange({
                  ...selectedFilters,
                  priceRange: [selectedFilters.priceRange[0], parseInt(e.target.value)]
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c37076]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Size */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-lg">Ölçü</h3>
          {expandedSections.size ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        {expandedSections.size && (
          <div className="space-y-4">
            {sizes.map((size) => (
              <label key={size.name} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.sizes.includes(size.name)}
                    onChange={() => toggleFilter('sizes', size.name)}
                    className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#c37076]"
                  />
                  <span className="group-hover:text-gray-600">{size.name}</span>
                </div>
                <span className="text-gray-400">({size.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}