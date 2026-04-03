import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Home, Mail, X } from 'lucide-react';

import Logo from './Logo';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'HOME', path: '/', icon: Home },
    { name: 'GEBRAUCHTWAGEN', path: '/gebrauchtwagen', icon: Car },
    { name: 'KONTAKT', path: '/kontakt', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      {/* Hard-edged shadow from top-left roof (light from top-right) */}
      <div 
        className="absolute top-0 left-0 h-full bg-black/[0.07] pointer-events-none z-20" 
        style={{ 
          width: 'max(224px, calc(50vw - 640px + 224px))',
          clipPath: 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)'
        }}
      />
      
      {/* Subtle automotive pattern (diagonal speed lines) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 8px)' 
        }}
      />
      <div className="max-w-7xl mx-auto px-6 h-[114px] flex items-center justify-between text-[16px] not-italic font-normal no-underline relative z-10">
        <Link to="/" className="group flex items-center relative z-10">
          <Logo width={200} className="md:w-[200px] lg:w-[240px]" variant="light" />
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group py-2 flex items-center gap-2 lg:gap-3"
            >
              <div className={`w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center border transition-colors ${
                location.pathname === item.path 
                  ? 'bg-brand/10 border-brand/20' 
                  : 'bg-gray-500/20 border-transparent group-hover:border-brand/30 group-hover:bg-brand/5'
              }`}>
                <item.icon size={16} className={`lg:w-[18px] lg:h-[18px] transition-colors ${
                  location.pathname === item.path ? 'text-brand' : 'text-gray-500 group-hover:text-brand'
                }`} />
              </div>
              <span className={`transition-colors font-medium text-sm lg:text-base ${
                location.pathname === item.path ? 'text-brand' : 'text-black group-hover:text-brand'
              }`}>
                {item.name}
              </span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-brand"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          {/* Mobile menu button */}
          <button 
            className="text-black p-2 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <>
                <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                <div className="w-6 h-0.5 bg-black"></div>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg md:hidden overflow-hidden z-40 border-t border-black/5"
          >
            {/* Hard-edged shadow overlay for mobile menu - aligned with navbar shadow */}
            <div 
              className="absolute top-0 left-0 h-full bg-black/[0.05] pointer-events-none z-0" 
              style={{ 
                width: '64px',
                clipPath: 'polygon(0 0, 100% 0, 0 46px, 0 100%)'
              }}
            />
            
            {/* Speed lines pattern for mobile menu */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none" 
              style={{ 
                backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 8px)' 
              }}
            />

            <div className="flex flex-col px-6 py-8 gap-4 relative z-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 p-4 border transition-all ${
                    location.pathname === item.path 
                      ? 'bg-brand/10 border-brand/20 text-brand' 
                      : 'bg-white/50 border-black/5 text-black hover:border-brand/30'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center border ${
                    location.pathname === item.path ? 'bg-brand/10 border-brand/20' : 'bg-gray-100 border-transparent'
                  }`}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold tracking-widest uppercase text-sm">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
