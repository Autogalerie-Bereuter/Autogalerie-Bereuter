import { motion } from 'motion/react';

export default function Datenschutz() {
  return (
    <div className="pt-48 pb-24 bg-[#050505] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-16">
          <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Rechtliches</span>
          <h1 className="text-[30px] md:text-[32px] lg:text-[40px] font-bold tracking-tighter uppercase leading-[0.95]">Datenschutz</h1>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12 text-gray-400 leading-relaxed"
        >
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Datenschutzerklärung</h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Kontakt mit uns</h2>
            <p>
              Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Datenspeicherung</h2>
            <p>
              Wir weisen darauf hin, dass zum Zweck des einfacheren Einkaufsvorganges und zur späteren Vertragsabwicklung vom Webshop-Betreiber im Rahmen von Cookies die IP-Daten des Anschlussinhabers gespeichert werden, ebenso wie Name, Anschrift und Kreditkartennummer des Einkäufers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Cookies</h2>
            <p>
              Unsere Website verwendet so genannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Ihre Rechte</h2>
            <p>
              Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Österreich ist dies die Datenschutzbehörde.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Sie erreichen uns unter folgenden Kontaktdaten:</h2>
            <p>
              Autogalerie Bereuter<br />
              Platz 332<br />
              6952 Hittisau<br />
              Österreich<br />
              E-Mail: info@autogalerie-bereuter.at
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
