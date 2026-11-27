import React from 'react';
import { Head } from '@inertiajs/react';
import MagazineHeader from '@/Components/MagazineHeader';

export default function Downloads({ editions }) {
    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1C1815] flex flex-col font-sans selection:bg-[#EAE2D5]">
            <Head title="Descargar Ediciones Completas en PDF - Club Social y Federal" />

            {/* Header unificado */}
            <MagazineHeader editions={editions} />

            <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
                {/* Título de la sección */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-black uppercase tracking-widest text-[#8C8072] block mb-2">
                        Archivo Digital Facsimilar
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1A1613] mb-4">
                        Descargar Ediciones
                    </h2>
                    <p className="text-sm sm:text-base text-[#595045] leading-relaxed">
                        Accede a las versiones completas de cada fanzine para imprimir, leer o compartir en formato PDF con sus ilustraciones, poesías y xilografías originales.
                    </p>
                </div>

                {/* Grilla de Tarjetas de Descarga de cada Edición */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {editions.map((ed) => (
                        <div
                            key={ed.id}
                            className="bg-white rounded-xl border border-[#E3DCD1] p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                        >
                            <div>
                                {/* Cabecera de la tarjeta con color temático */}
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded text-white"
                                        style={{ backgroundColor: ed.color_primary }}
                                    >
                                        N° {ed.number}
                                    </span>
                                    <span className="text-xs font-bold text-[#8C8072] uppercase tracking-wider">
                                        {ed.season} {ed.year}
                                    </span>
                                </div>

                                {/* Simulación de Portada / Tapa */}
                                <div
                                    className="aspect-[3/4] rounded-lg border-2 mb-5 flex flex-col items-center justify-between p-6 text-center shadow-inner"
                                    style={{ borderColor: `${ed.color_primary}40`, backgroundColor: `${ed.color_primary}08` }}
                                >
                                    <span className="text-3xl">☀</span>
                                    <div>
                                        <h3 className="font-serif font-black text-lg uppercase tracking-wider text-[#1C1815] mb-1">
                                            Fanzine
                                        </h3>
                                        <p className="font-serif font-bold text-xs uppercase tracking-widest" style={{ color: ed.color_primary }}>
                                            Club Social y Federal
                                        </p>
                                        <p className="text-[10px] italic text-[#6E6458] mt-2">
                                            {ed.season} {ed.year}
                                        </p>
                                    </div>
                                    <span className="text-[11px] text-[#8C8072] font-semibold">
                                        {ed.articles_count || 'Varios'} artículos
                                    </span>
                                </div>

                                <p className="text-xs text-[#595045] italic mb-6 line-clamp-3 text-center">
                                    "{ed.quote_text}"
                                </p>
                            </div>

                            {/* Botón de Descarga Directa del PDF */}
                            <div>
                                <a
                                    href={`/${ed.pdf_path}`}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 px-4 rounded-lg text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow hover:opacity-95 transition transform active:scale-95"
                                    style={{ backgroundColor: ed.color_primary }}
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 3a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 00-1-1z" />
                                        <path d="M4 14a1 1 0 00-1 1v2a2 2 0 002 2h10a2 2 0 002-2v-2a1 1 0 10-2 0v2H5v-2a1 1 0 00-1-1z" />
                                    </svg>
                                    <span>Descargar N° {ed.number} (PDF)</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#E3DCD1] bg-[#1C1815] text-[#FAF7F2] py-8 text-center text-xs">
                <p className="font-serif font-black tracking-widest uppercase mb-1">Club Social y Federal</p>
                <p className="text-[#8C8072] text-[11px]">Territorios rurales de Misiones — 2026</p>
            </footer>
        </div>
    );
}
