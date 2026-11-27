import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function MagazineHeader({ editions = [], currentEdition = null }) {
    const [editionsOpen, setEditionsOpen] = useState(false);
    const primaryColor = currentEdition?.color_primary || '#7C1D28';

    return (
        <header className="bg-[#1C1815] text-[#FAF7F2] sticky top-0 z-50 border-b border-[#332D29] shadow-md">
            {/* Barra superior con logo y navegación principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                {/* Logo e identidad estilo revista */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="group flex items-center gap-3">
                        {/* Isotipo del sol */}
                        <div
                            className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-serif text-sm font-bold"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                            ☀
                        </div>
                        <div>
                            <h1 className="font-serif tracking-widest text-lg sm:text-xl font-black uppercase text-white group-hover:text-amber-100 transition">
                                Club Social y Federal
                            </h1>
                            <p className="text-[10px] sm:text-xs text-[#A89E92] tracking-wider uppercase hidden sm:block">
                                El territorio de la ruralidad y las subterraneidades
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Menú de Navegación */}
                <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                    <Link
                        href="/"
                        className="hover:text-amber-200 transition text-[#FAF7F2]"
                    >
                        Inicio
                    </Link>

                    {/* Desplegable de Ediciones */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setEditionsOpen(!editionsOpen)}
                            className="flex items-center gap-1.5 hover:text-amber-200 transition focus:outline-none"
                        >
                            <span>Ediciones</span>
                            <svg className="w-3.5 h-3.5 fill-current opacity-70" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </button>

                        {editionsOpen && (
                            <div
                                className="absolute right-0 mt-3 w-56 bg-[#26201B] border border-[#3E352F] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn"
                                onMouseLeave={() => setEditionsOpen(false)}
                            >
                                <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C8072] uppercase tracking-widest border-b border-[#3E352F] mb-1">
                                    Seleccionar Número
                                </div>
                                {editions.map((ed) => (
                                    <Link
                                        key={ed.id}
                                        href={`/?numero=${ed.number}`}
                                        onClick={() => setEditionsOpen(false)}
                                        className="px-3 py-2 text-xs flex items-center justify-between hover:bg-[#332A23] transition text-[#FAF7F2]"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: ed.color_primary }}
                                            />
                                            <span>N° {ed.number} · {ed.season} {ed.year}</span>
                                        </div>
                                        {currentEdition?.number === ed.number && (
                                            <span className="text-[10px] text-amber-300 font-bold">Activo</span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/descargar"
                        className="px-3 py-1.5 rounded-md font-bold text-xs tracking-wider transition shadow-sm text-white"
                        style={{ backgroundColor: primaryColor }}
                    >
                        Descargar
                    </Link>

                    <Link
                        href="/quienes-somos"
                        className="hover:text-amber-200 transition text-[#C7BCAD]"
                    >
                        Quiénes Somos
                    </Link>
                </nav>
            </div>
        </header>
    );
}
