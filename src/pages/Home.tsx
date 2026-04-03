import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { ArrowRight, Car, Banknote, Handshake, Loader2, Fuel, Gauge, Settings2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCarcuroCars, type CarcuroCar } from '../lib/carcuro';
import Logo from '../components/Logo';

export default function Home() {
  const rotation = useMotionValue(0);
  const isHovered = useRef(false);
  const isPanning = useRef(false);
  const direction = useRef(-1);
  const [cars, setCars] = useState<CarcuroCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);

  const featuredCars = cars.filter(car => {
    // Robust search for 'AKTION' or '*****' in multiple fields
    const searchString = `${car.name} ${car.make} ${car.model} ${car.description} ${car.highlights}`.toUpperCase();
    return searchString.includes('AKTION') || searchString.includes('*****');
  });

  const maxSlide = Math.max(0, featuredCars.length - itemsVisible);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsVisible(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [maxSlide, currentSlide]);

  useEffect(() => {
    const loadCars = async () => {
      const token = import.meta.env.VITE_CARCURO_COMPANY_TOKEN;
      if (!token || token === 'YOUR_CARCURO_TOKEN') {
        setLoading(false);
        return;
      }

      try {
        const fetchedCars = await fetchCarcuroCars(token);
        setCars(fetchedCars);
      } catch (err) {
        console.error('Failed to load cars for home page:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  useAnimationFrame((t, delta) => {
    if (!isHovered.current && !isPanning.current) {
      rotation.set(rotation.get() + direction.current * 0.00514 * delta);
    }
  });

  // Prepare 12 items for the carousel (prioritize cars with '*****' in description, then newest first)
  const sortedCars = [...cars].sort((a, b) => {
    const aHasStars = a.description?.includes('*****');
    const bHasStars = b.description?.includes('*****');
    
    if (aHasStars && !bHasStars) return -1;
    if (!aHasStars && bHasStars) return 1;
    
    // Fallback to ID (newest first)
    return b.id - a.id;
  });
  const carouselItems = Array.from({ length: 12 }).map((_, index) => {
    if (index < sortedCars.length) {
      return { type: 'car' as const, data: sortedCars[index], id: `car-${sortedCars[index].id}` };
    }
    return { type: 'placeholder' as const, id: `placeholder-${index}` };
  });

  return (
    <div className="pt-20 bg-[#050505]">
      {/* Hero Section */}
      <section className="relative min-h-[1100px] md:min-h-[850px] lg:min-h-[1100px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#050505] flex flex-col">
          {/* Showroom Wall */}
          <div className="h-[42%] md:h-[48%] w-full relative overflow-hidden bg-zinc-900">
            {/* High-end Car Dealership Showroom background */}
            <div 
              className="absolute inset-0 bg-cover bg-[center_top_25%] opacity-100"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80")' }}
            />
            
            {/* Irregular Abstract Architectural Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.12] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(15deg, rgba(255,255,255,0.15) 0%, transparent 40%),
                  linear-gradient(165deg, rgba(255,255,255,0.1) 0%, transparent 40%),
                  linear-gradient(280deg, rgba(255,255,255,0.08) 0%, transparent 60%),
                  radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
                `
              }}
            ></div>
            
            {/* Professional Lighting: Subtle top-down wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40"></div>
            
            {/* Architectural spotlight effect */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white/10 to-transparent blur-3xl pointer-events-none"></div>

            {/* Floor transition */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black"></div>
          </div>
          {/* Showroom Floor */}
          <div className="h-[58%] md:h-[52%] w-full bg-gradient-to-b from-zinc-900 to-black relative border-t border-zinc-800/50">
            {/* Floor reflection */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-b from-zinc-700/20 to-transparent blur-2xl"></div>
          </div>
          
          {/* Side gradient - moved to lower z-index to not cover everything */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-0"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 h-[600px] md:h-[450px] lg:h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="-mt-[140px] flex flex-col items-center text-center"
          >
            <div className="-mt-[40px] flex flex-col items-center w-full z-10 relative">
              <h1 className="text-[30px] md:text-[32px] lg:text-[40px] font-bold tracking-tighter mb-6 leading-[0.95] mt-12 md:mt-20">
                <span className="block"><span className="text-brand">BERE</span>it deinen</span>
                <span className="block">A<span className="text-brand">UT</span>oTraum zu</span>
                <span className="block"><span className="text-brand">ER</span>leben</span>
              </h1>
              <p className="text-sm md:text-xl text-gray-400 max-w-xl mb-8 font-light leading-relaxed">
                Willkommen in der AUTOGALERIE BEREUTER.<br />
                Sie haben einen Traum, wir haben das passende Auto dazu.
              </p>
            </div>

            {/* 3D Image Carousel */}
            <style>
              {`
                .carousel-container {
                  perspective: 1200px;
                }
                .carousel-spinner {
                  transform-style: preserve-3d;
                }
                .carousel-item {
                  transform-style: preserve-3d;
                }
                @media (max-width: 639px) {
                  .carousel-item { --tz: 450px; }
                }
                @media (min-width: 640px) and (max-width: 1023px) {
                  .carousel-item { --tz: 300px; }
                }
                @media (min-width: 1024px) {
                  .carousel-item { --tz: 450px; }
                }
              `}
            </style>
            <div className="carousel-container relative w-full max-w-full h-[150px] sm:h-[100px] lg:h-[150px] mt-[80px] md:mt-[90px] mb-16 flex items-center justify-center">
              {loading ? (
                <Loader2 className="text-brand animate-spin" size={40} />
              ) : (
                <motion.div 
                  className="carousel-spinner relative w-[220px] sm:w-[150px] lg:w-[220px] h-full cursor-grab active:cursor-grabbing select-none"
                  style={{ rotateX: -8, rotateY: rotation }}
                  onHoverStart={() => isHovered.current = true}
                  onHoverEnd={() => isHovered.current = false}
                  onPanStart={() => isPanning.current = true}
                  onPan={(e, info) => {
                    rotation.set(rotation.get() + info.delta.x * 0.5);
                    if (info.delta.x > 0) direction.current = 1;
                    else if (info.delta.x < 0) direction.current = -1;
                  }}
                  onPanEnd={() => isPanning.current = false}
                >
                  {carouselItems.map((item, index) => {
                    const angle = index * (360 / 12);
                    const isCar = item.type === 'car';
                    const car = isCar ? item.data : null;
                    
                    return (
                      <div 
                        key={item.id} 
                        className="carousel-item absolute top-0 left-0 w-full h-full"
                        style={{ 
                          transform: `rotateY(${angle}deg) translateZ(var(--tz))`
                        }}
                      >
                        {/* Main Image or Logo (Rendered at 2x size and scaled down for Pixel-Reserven on mobile Retina displays) */}
                        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-[24px] overflow-hidden border-[2px] border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-black pointer-events-none flex items-center justify-center origin-center">
                          {isCar && car ? (
                            <img src={car.images[1] || car.images[0]} alt={car.name} draggable={false} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                          ) : (
                            <Logo width="80%" variant="dark" className="opacity-80" />
                          )}
                        </div>
                        
                        {/* 90-Degree Floor Reflection */}
                        <div 
                          className="absolute top-full left-1/2 w-[200%] h-[200%] origin-top pointer-events-none"
                          style={{ 
                            transform: 'translateX(-50%) scale(0.5) rotateX(90deg)',
                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 80%)',
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 80%)'
                          }}
                        >
                          {isCar && car ? (
                            <img 
                              src={car.images[1] || car.images[0]} 
                              alt="" 
                              draggable={false}
                              className="w-full h-full object-cover opacity-40 rounded-[24px]" 
                              style={{ transform: 'scaleY(-1)' }} 
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center opacity-20"
                              style={{ transform: 'scaleY(-1)' }}
                            >
                              <Logo width="80%" variant="dark" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-[260px] md:mt-[120px] lg:mt-[280px] relative z-10 w-full">
              <Link 
                to="/gebrauchtwagen" 
                className="bg-brand/80 backdrop-blur-md text-white px-8 py-4 font-bold tracking-widest hover:bg-brand transition-colors flex items-center gap-2 group"
              >
                BESTAND ANSEHEN
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/kontakt" 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-bold tracking-widest hover:bg-white/20 transition-all"
              >
                KONTAKT
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#141414] mt-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <Car className="text-brand" size={32} />
            </div>
            <h3 className="text-lg font-bold tracking-widest mb-4 uppercase">An- und Verkauf</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Wir kaufen Ihren Gebrauchten zu fairen Preisen oder finden für Sie das perfekte neue Fahrzeug aus unserem exklusiven Bestand.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <Banknote className="text-brand" size={32} />
            </div>
            <h3 className="text-lg font-bold tracking-widest mb-4 uppercase">Inzahlungnahme</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Geben Sie Ihr aktuelles Fahrzeug unkompliziert bei uns in Zahlung und profitieren Sie von attraktiven Konditionen für Ihren nächsten Traumwagen.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <Handshake className="text-brand" size={32} />
            </div>
            <h3 className="text-lg font-bold tracking-widest mb-4 uppercase">Vermittlung</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Nutzen Sie unser weitreichendes Netzwerk. Wir vermitteln Ihr Fahrzeug professionell an den richtigen Käufer – stressfrei und zum Bestpreis.</p>
          </div>
        </div>
      </section>

      {/* Featured Cars Preview */}
      <section className="py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Highlight</span>
              <h2 className="text-[30px] md:text-[32px] lg:text-[40px] font-bold tracking-tighter uppercase mb-2 leading-[0.95]">Aktuelle <span className="text-brand">Angebote</span></h2>
              <p className="text-gray-400 text-sm font-light tracking-wide">Ihr Partner für Automobile, Handel und Gebrauchtwagen.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
                  disabled={currentSlide >= maxSlide}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <Link to="/gebrauchtwagen" className="text-sm font-bold tracking-widest text-gray-400 hover:text-brand transition-colors uppercase flex items-center gap-2 ml-4">
                Alle Fahrzeuge <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative">
            {loading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="text-brand animate-spin" size={48} />
              </div>
            ) : featuredCars.length > 0 ? (
              <div className="overflow-hidden -mx-4 px-4">
                <motion.div 
                  className="flex"
                  animate={{ x: `-${currentSlide * (100 / itemsVisible)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {featuredCars.map((car) => (
                    <div 
                      key={car.id}
                      className="w-full md:w-1/3 flex-shrink-0 px-4"
                    >
                      <Link 
                        to={`/gebrauchtwagen?carId=${car.id}`} 
                        className="group block bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-brand/50 transition-colors h-full"
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
                          <div className="absolute bottom-0 left-0 bg-brand text-white px-3 py-1 text-xs font-bold tracking-widest uppercase">
                            Aktion!
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex flex-row md:flex-col lg:flex-row justify-between items-start mb-4 md:gap-2 lg:gap-0">
                            <div className="min-w-0">
                              <span className="text-brand text-[10px] font-bold tracking-widest uppercase block mb-1">{car.make}</span>
                              <h3 className="text-xl font-bold tracking-tighter uppercase line-clamp-1" title={car.model}>{car.model}</h3>
                            </div>
                            <p className="text-xl font-bold text-white whitespace-nowrap">€ {car.price.toLocaleString()}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
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

                          <div className="w-full py-4 border border-white/10 text-center text-xs font-bold tracking-[0.2em] uppercase group-hover:bg-brand group-hover:border-brand transition-all">
                            ZUM FAHRZEUG
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : (
              <div className="text-center py-24 text-gray-500 uppercase tracking-widest text-sm border border-white/5 bg-white/5">
                Keine aktuellen Angebote verfügbar.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
