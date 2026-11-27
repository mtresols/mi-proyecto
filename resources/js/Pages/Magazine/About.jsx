import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function About({ edition }) {
    const primaryColor = edition?.color_primary || '#7C1D28';

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825] flex flex-col font-sans selection:bg-[#EAE2D5]">
            <Head title="Manifiesto & Quiénes Somos - Club Social y Federal" />

            {/* Cabecera */}
            <header className="border-b border-[#E5DFD5] bg-[#FAF7F2]/90 backdrop-blur sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="group">
                        <h1 className="font-serif tracking-widest text-lg font-bold uppercase">
                            Club Social y Federal
                        </h1>
                        <p className="text-xs italic text-[#6B635B]">
                            El territorio de la ruralidad y las subterraneidades
                        </p>
                    </Link>

                    <Link 
                        href="/"
                        className="text-xs font-semibold px-4 py-1.5 rounded-full border border-[#DDD6CC] bg-white hover:bg-[#F3EFE8] transition"
                    >
                        ← Volver a la Revista
                    </Link>
                </div>
            </header>

            {/* Contenido Institucional */}
            <main className="flex-1 max-w-3xl mx-auto px-4 py-14 w-full">
                <div className="text-center mb-12">
                    <span 
                        className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                        style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                    >
                        Declaración y Principios
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1F1B18] mb-4">
                        ¿Quiénes Somos?
                    </h2>
                    <p className="font-serif text-lg italic text-[#6B635B]">
                        Un espacio de encuentro, pensamiento crítico y soberanía en el territorio misionero.
                    </p>
                </div>

                {/* Manifiesto */}
                <div className="bg-white rounded-2xl border border-[#E5DFD5] p-8 sm:p-12 shadow-sm space-y-6 text-[#3A342F] leading-relaxed text-base sm:text-lg">
                    <p className="font-serif text-xl sm:text-2xl font-bold text-[#1F1B18] border-b border-[#E5DFD5] pb-4">
                        El Manifiesto del Club
                    </p>

                    <p>
                        Esta revista, escrita, editada y producida por el <strong>Club Social y Federal</strong>, 
                        busca difundir información, armar lazos, proponer espacios de diálogo e 
                        interlocución entre territorios rurales marcados por la cultura agroecológica.
                    </p>

                    <p>
                        Frente a la lógica dominante de maximizar rendimientos a costa de la devastación 
                        ambiental, la concentración de tierras y el desierto verde de los monocultivos, 
                        proponemos una política de la diversidad que sostenga las experiencias de producción 
                        agroecológicas, alternativas y autogestivas.
                    </p>

                    <div 
                        className="p-6 rounded-xl border-l-4 italic font-serif text-lg text-[#2C2825]"
                        style={{ backgroundColor: `${primaryColor}08`, borderColor: primaryColor }}
                    >
                        "La tierra es de quien la trabaja, pero ¿de quién es el tiempo? 
                        Reconciliarnos con el esfuerzo consciente, el cuidado del detalle y la ética 
                        por la vida comunitaria."
                    </div>

                    <p>
                        Nuestras ediciones nacen en formato fanzine impreso facsimilar, con xilografías originales, 
                        grabados populares, diálogos en guaraní y portuñol de frontera, crónicas de saberes medicinales 
                        y voces de nuestras comunidades originarias y campesinas.
                    </p>

                    <div className="pt-6 border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#8C8277] font-bold">Contacto Directo</p>
                            <a 
                                href="mailto:clubsocialyfederal@gmail.com" 
                                className="font-medium underline hover:text-[#1F1B18] text-sm"
                            >
                                clubsocialyfederal@gmail.com
                            </a>
                        </div>
                        <Link
                            href="/"
                            className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold shadow hover:opacity-95 transition"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Explorar las 3 Ediciones
                        </Link>
                    </div>
                </div>
            </main>

            {/* Pie */}
            <footer className="border-t border-[#E5DFD5] bg-[#F3EFE8] py-8 text-center text-xs text-[#6B635B]">
                <p className="font-serif font-bold text-sm tracking-widest uppercase text-[#2C2825] mb-1">
                    Club Social y Federal
                </p>
                <p>Misiones, Argentina — 2026</p>
            </footer>
        </div>
    );
}