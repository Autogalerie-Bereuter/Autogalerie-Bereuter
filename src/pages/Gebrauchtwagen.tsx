import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Fuel, Gauge, Settings2, Loader2, AlertCircle, X, Check, Info, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { fetchCarcuroCars, type CarcuroCar } from '../lib/carcuro';

export default function Gebrauchtwagen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState<CarcuroCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarcuroCar | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const location = useLocation();
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailContainerRef.current.children[activeImageIndex] as HTMLElement;
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeImageIndex]);

  useEffect(() => {
    const loadCars = async () => {
      const token = import.meta.env.VITE_CARCURO_COMPANY_TOKEN;
      
      if (!token || token === 'YOUR_CARCURO_TOKEN') {
        setError('Carcuro API Token fehlt. Bitte konfigurieren Sie VITE_CARCURO_COMPANY_TOKEN.');
        setLoading(false);
        return;
      }

      try {
        const fetchedCars = await fetchCarcuroCars(token);
        setCars(fetchedCars);
        setError(null);
      } catch (err) {
        setError('Fehler beim Laden der Fahrzeuge. Bitte versuchen Sie es später erneut.');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    if (!loading && cars.length > 0) {
      const params = new URLSearchParams(location.search);
      const carId = params.get('carId');
      if (carId) {
        const car = cars.find(c => c.id.toString() === carId);
        if (car) {
          // Small delay to ensure the page is rendered before scrolling
          setTimeout(() => {
            const element = document.getElementById(`car-${carId}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            openDetails(car);
          }, 100);
        }
      }
    }
  }, [loading, cars, location.search]);

  const filteredCars = cars.filter(car => 
    `${car.make} ${car.model} ${car.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDetails = (car: CarcuroCar) => {
    setSelectedCar(car);
    setActiveImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setSelectedCar(null);
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedCar) {
      setActiveImageIndex((prev) => (prev + 1) % selectedCar.images.length);
    }
  };

  const prevImage = () => {
    if (selectedCar) {
      setActiveImageIndex((prev) => (prev - 1 + selectedCar.images.length) % selectedCar.images.length);
    }
  };

  return (
    <div className="pt-48 pb-24 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Bestand</span>
          <h1 className="text-[30px] md:text-[32px] lg:text-[40px] font-bold tracking-tighter uppercase mb-8 leading-[0.95]">Unsere <span className="text-brand">Fahrzeuge</span></h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Suchen nach Marke oder Modell..." 
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold tracking-widest hover:bg-white/10 transition-colors uppercase">
              <Filter size={18} /> Filter
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="text-brand animate-spin" size={48} />
            <p className="text-gray-500 tracking-widest uppercase">Lade Fahrzeuge...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <AlertCircle className="text-red-500" size={48} />
            <p className="text-gray-400 max-w-md">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  id={`car-${car.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-brand/50 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={car.images[1] || car.images[0] || 'https://images.unsplash.com/photo-1542362567-b055002b91f4?q=80&w=1000&auto=format&fit=crop'} 
                      alt={car.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-brand text-white px-3 py-1 text-xs font-bold tracking-widest">
                      {car.initial_registration_formatted}
                    </div>
                    {car.description?.includes('AKTION') && (
                      <div className="absolute bottom-0 left-0 bg-brand text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
                        Aktion!
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-brand text-[10px] font-bold tracking-widest uppercase block mb-1">{car.make}</span>
                        <h3 className="text-xl font-bold tracking-tighter uppercase line-clamp-1">{car.model}</h3>
                      </div>
                      <p className="text-xl font-bold text-white whitespace-nowrap">€ {car.price.toLocaleString()}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
                        <Gauge size={14} className="text-brand" />
                        {car.mileage.toLocaleString()} KM
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
                        <Fuel size={14} className="text-brand" />
                        {car.fuel_type}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
                        <Settings2 size={14} className="text-brand" />
                        {car.gear_type}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider">
                        <Gauge size={14} className="text-brand" />
                        {car.power_ps} PS
                      </div>
                    </div>

                    <button 
                      onClick={() => openDetails(car)}
                      className="w-full py-4 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand hover:border-brand transition-all"
                    >
                      Details ansehen
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-24">
                <p className="text-gray-500 tracking-widest uppercase">Keine Fahrzeuge gefunden.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={closeDetails}></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row landscape:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeDetails}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 flex items-center justify-center text-white hover:bg-brand transition-colors rounded-full"
              >
                <X size={24} />
              </button>

              {/* Left: Images */}
              <div className="w-full md:w-3/5 landscape:w-1/2 md:landscape:w-3/5 h-[300px] md:h-auto landscape:h-auto bg-black relative flex flex-col group/gallery">
                <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      src={selectedCar.images[activeImageIndex]} 
                      alt={selectedCar.name}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedCar.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-brand transition-all opacity-0 group-hover/gallery:opacity-100 z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-brand transition-all opacity-0 group-hover/gallery:opacity-100 z-10"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Zoom Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(true); }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-brand transition-all opacity-0 group-hover/gallery:opacity-100 z-10"
                    title="Vergrößern"
                  >
                    <ZoomIn size={24} />
                  </button>
                </div>
                
                {/* Thumbnails */}
                <div 
                  ref={thumbnailContainerRef}
                  className="h-24 landscape:h-16 md:landscape:h-24 bg-black/50 p-2 flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                >
                  {selectedCar.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 landscape:w-16 md:landscape:w-20 h-full border-2 transition-all ${activeImageIndex === idx ? 'border-brand' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-2/5 landscape:w-1/2 md:landscape:w-2/5 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 block">{selectedCar.make}</span>
                  <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">{selectedCar.model}</h2>
                  <p className="text-gray-400 text-sm font-light mb-4">{selectedCar.name}</p>
                  <p className="text-3xl font-bold text-white">€ {selectedCar.price.toLocaleString()}</p>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/5 py-8">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Kilometerstand</span>
                    <p className="text-sm font-bold text-white uppercase">{selectedCar.mileage.toLocaleString()} KM</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Erstzulassung</span>
                    <p className="text-sm font-bold text-white uppercase">{selectedCar.initial_registration_formatted}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Leistung</span>
                    <p className="text-sm font-bold text-white uppercase">{selectedCar.power_ps} PS / {selectedCar.power_kw} KW</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Kraftstoff</span>
                    <p className="text-sm font-bold text-white uppercase">{selectedCar.fuel_type}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Getriebe</span>
                    <p className="text-sm font-bold text-white uppercase">{selectedCar.gear_type}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Farbe</span>
                    <p className="text-sm font-bold text-white uppercase">{selectedCar.color_name}</p>
                  </div>
                </div>

                {/* Highlights / Description */}
                {(selectedCar.highlights || selectedCar.description) && (
                  <div className="mb-8">
                    <h4 className="text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                      <Info size={14} className="text-brand" />
                      Beschreibung
                    </h4>
                    <div className="text-gray-400 text-sm leading-relaxed space-y-4">
                      {selectedCar.highlights && <p className="text-white font-medium">{selectedCar.highlights}</p>}
                      <p className="whitespace-pre-line">
                        {selectedCar.description
                          ?.replace(/\*{5,}/g, '')
                          ?.replace(/\bAKTION\b/g, '')
                          ?.trim()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Equipment */}
                {selectedCar.equipments && selectedCar.equipments.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                      <Settings2 size={14} className="text-brand" />
                      Ausstattung
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedCar.equipments.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-400 text-xs">
                          <Check size={12} className="text-brand flex-shrink-0" />
                          {eq}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="sticky bottom-0 pt-4 bg-[#0a0a0a]">
                  <a 
                    href={`mailto:info@autogalerie-bereuter.com?subject=Anfrage zu ${selectedCar.make} ${selectedCar.model} (${selectedCar.id})`}
                    className="block w-full py-4 bg-brand text-white text-center text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-hover transition-all"
                  >
                    Jetzt Anfragen
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox (Full-screen Zoom) */}
      <AnimatePresence>
        {isLightboxOpen && selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 p-4 md:p-12"
          >
            <div className="absolute inset-0" onClick={() => setIsLightboxOpen(false)}></div>
            
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 z-[210] w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-brand transition-colors rounded-full"
            >
              <X size={32} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center group/lightbox">
              <motion.img 
                key={activeImageIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={selectedCar.images[activeImageIndex]} 
                alt={selectedCar.name}
                className="max-w-full max-h-full object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Lightbox Navigation */}
              {selectedCar.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 flex items-center justify-center text-white hover:bg-brand transition-all opacity-0 group-hover/lightbox:opacity-100"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 flex items-center justify-center text-white hover:bg-brand transition-all opacity-0 group-hover/lightbox:opacity-100"
                  >
                    <ChevronRight size={40} />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold tracking-widest uppercase py-4">
                Bild {activeImageIndex + 1} von {selectedCar.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
