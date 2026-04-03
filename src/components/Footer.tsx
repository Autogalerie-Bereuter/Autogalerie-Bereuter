import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative bg-white/80 backdrop-blur-md border-t border-black/5 pt-20 pb-10 overflow-hidden">
      {/* Hard-edged shadow from top-left (light from top-right) - moved slightly left as requested */}
      <div 
        className="absolute top-0 left-0 h-full bg-black/[0.07] pointer-events-none z-0" 
        style={{ 
          width: 'max(400px, calc(50vw - 640px + 400px))',
          clipPath: 'polygon(0 0, 100% 0, calc(100% - 540px) 100%, 0 100%)'
        }}
      />
      
      {/* Subtle automotive pattern (diagonal speed lines) - matching Navbar */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 1px, transparent 1px, transparent 8px)' 
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
        <div>
          <div className="mb-8 translate-y-2 w-[300px] md:w-[200px] lg:w-[300px]">
            <Logo width="100%" className="!items-start" variant="light" />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            Ihr Partner für Automobile, Handel und Gebrauchtwagen.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-bold tracking-widest mb-6 text-brand uppercase">Kontakt</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-600 text-sm">
              <Phone size={16} className="text-brand" />
              +43 664 35 26 991
            </li>
            <li className="flex items-center gap-3 text-gray-600 text-sm">
              <Mail size={16} className="text-brand" />
              info@autogalerie-bereuter.at
            </li>
            <li className="flex items-center gap-3 text-gray-600 text-sm">
              <MapPin size={16} className="text-brand" />
              Gschwend 178, 6932 Langen bei Bregenz
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-widest mb-6 text-brand uppercase">Folgen Sie uns</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/autogalerie_bereuter?igsh=Nm9qZDAydXBxYjY2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all text-gray-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all text-gray-600">
              <Facebook size={20} />
            </a>
            <a href="https://www.tiktok.com/@autogaleriebereut?_r=1&_t=ZN-95B9E2SFKeE" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all text-gray-600">
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                fill="currentColor"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.98-1.03 1.64-.13.47-.1.99.04 1.45.11.41.34.77.64 1.05.61.54 1.42.73 2.21.6.85-.13 1.56-.76 1.83-1.57.13-.31.17-.64.17-.97-.02-4.69-.01-9.39-.02-14.09z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-gray-600 uppercase relative z-10">
        <p>© 2026 AUTOGALERIE BEREUTER. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link to="/impressum" className="hover:text-brand transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-brand transition-colors">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
