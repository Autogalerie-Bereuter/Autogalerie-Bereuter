import { motion } from 'motion/react';

export default function Impressum() {
  return (
    <div className="pt-48 pb-24 bg-[#050505] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16">
          <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Rechtliches</span>
          <h1 className="text-[30px] md:text-[32px] lg:text-[40px] font-bold tracking-tighter uppercase leading-[0.95]">Impressum</h1>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12 text-gray-400 leading-relaxed"
        >
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Angaben gemäß Offenlegungspflicht</h2>
            <p>
              <strong className="text-white block mb-1">Firmenname:</strong>
              Autogalerie Bereuter
            </p>
            <p>
              <strong className="text-white block mb-1">Inhaber:</strong>
              Florian Bereuter
            </p>
            <p>
              <strong className="text-white block mb-1">Adresse:</strong>
              Gschwend 178<br />
              6932 Langen bei Bregenz<br />
              Österreich
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Kontakt</h2>
            <p>
              <strong className="text-white block mb-1">Telefon:</strong>
              +43 664 35 26 991
            </p>
            <p>
              <strong className="text-white block mb-1">E-Mail:</strong>
              info@autogalerie-bereuter.at
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Unternehmensdaten</h2>
            <p>
              <strong className="text-white block mb-1">UID-Nummer:</strong>
              [ATUXXXXXXXX]
            </p>
            <p>
              <strong className="text-white block mb-1">Aufsichtsbehörde:</strong>
              Bezirkshauptmannschaft Bregenz
            </p>
            <p>
              <strong className="text-white block mb-1">Kammerzugehörigkeit:</strong>
              Wirtschaftskammer Vorarlberg
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
              Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. 
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
