import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';

export default function Kontakt() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // FormSubmit.co - Kostenlose & unbegrenzte Alternative zu Formspree
      // Dokumentation: https://formsubmit.co/ajax-documentation
      const response = await fetch('https://formsubmit.co/ajax/info@autogalerie-bereuter.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
          _subject: `Neue Kontaktanfrage von ${formData.firstName} ${formData.lastName}`,
          _template: 'table' // Schönes Tabellen-Layout für die E-Mail
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        // Log the specific error from Formspree
        console.error('Formspree Response Error:', data);
        throw new Error(data.error || 'Fehler beim Senden');
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      alert(`Es gab ein Problem beim Senden: ${errorMessage}. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.`);
      setStatus('idle');
    }
  };

  return (
    <div className="pt-48 pb-24 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Kontakt</span>
          <h1 className="text-[30px] md:text-[32px] lg:text-[40px] font-bold tracking-tighter uppercase leading-[0.95]">Treten Sie mit uns <br /><span className="text-brand">in Verbindung</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 border border-brand/30 p-12 text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <CheckCircle2 size={64} className="text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter">Nachricht gesendet!</h3>
                  <p className="text-gray-400">Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-xs font-bold tracking-[0.3em] uppercase text-brand hover:text-white transition-colors"
                  >
                    Weitere Nachricht senden
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Vorname</label>
                      <input 
                        required
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Nachname</label>
                      <input 
                        required
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">E-Mail Adresse</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Ihre Nachricht</label>
                    <textarea 
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-brand transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={status === 'sending'}
                    className="bg-brand text-white px-10 py-5 font-bold tracking-widest hover:bg-brand-hover transition-colors flex items-center gap-3 group uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
                    {status !== 'sending' && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h4 className="text-sm font-bold tracking-widest text-brand uppercase">Adresse</h4>
                <div className="flex gap-4 text-gray-400">
                  <MapPin className="text-white shrink-0" size={20} />
                  <p className="text-sm leading-relaxed">
                    Autogalerie Bereuter<br />
                    Platz 332<br />
                    6952 Hittisau, Österreich
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold tracking-widest text-brand uppercase">Öffnungszeiten</h4>
                <div className="flex gap-4 text-gray-400">
                  <Clock className="text-white shrink-0" size={20} />
                  <p className="text-sm leading-relaxed">
                    Telefonisch rund um<br />die Uhr erreichbar.<br />
                    Besichtigungstermin<br />nach Vereinbarung.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold tracking-widest text-brand uppercase">Kontakt Info</h4>
                <div className="space-y-3">
                  <div className="flex gap-4 text-gray-400 items-center">
                    <Phone className="text-white" size={20} />
                    <p className="text-sm">+43 664 35 26 991</p>
                  </div>
                  <div className="flex gap-4 text-gray-400 items-center">
                    <Mail className="text-white" size={20} />
                    <p className="text-sm">info@autogalerie-bereuter.at</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full aspect-video bg-white/5 border border-white/10 relative overflow-hidden group">
              <iframe 
                src="https://maps.google.com/maps?q=Platz%20332,%206952%20Hittisau,%20%C3%96sterreich&hl=de&z=14&output=embed" 
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
