export function FeatureSection() {
  return (
    <section className="py-12 lg:py-20 bg-[#8b7b6a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1638382874010-aa4e76fe267d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwc2hvd2Nhc2UlMjBkaXNwbGF5fGVufDF8fHx8MTc2NTIyMzgxMXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Jewelry Collection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">
              Hər Bir Əsər Özünəməxsus Hekayədir
            </h2>
            <p className="text-gray-200 mb-8 text-lg">
              Əl işi ilə hazırlanmış zərgərlik məhsullarımız ən yüksək keyfiyyətli materiallardan və
              ən incə sənətkarlıqla yaradılır. Hər bir əsər unikaldır və özünəməxsus bir hekayə danışır.
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition-colors">
              Kolleksiyanı Kəşf Et
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
