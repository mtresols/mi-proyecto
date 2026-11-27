import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ currentEdition, editions }) {
    const primaryColor = currentEdition?.color_primary || '#7C1D28';

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825] flex flex-col font-sans selection:bg-[#EAE2D5]">
            <Head title={`N° ${currentEdition?.number} (${currentEdition?.season}) - Club Social y Federal`} />

            {/* Cabecera / Navegación */}
            <header className="border-b border-[#E5DFD5] bg-[#FAF7F2]/90 backdrop-blur sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <Link href="/" className="inline-block group">
                            <h1 className="font-serif tracking-widest text-xl sm:text-2xl font-bold uppercase hover:opacity-80 transition">
                                Club Social y Federal
                            </h1>
                            <p className="text-xs sm:text-sm italic text-[#6B635B] tracking-wider">
                                El territorio de la ruralidad y las subterraneidades
                            </p>
                        </Link>
                    </div>

                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/"
                            className="transition pb-1 border-b-2"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                            Revista
                        </Link>
                        <Link
                            href="/quienes-somos"
                            className="text-[#6B635B] hover:text-[#2C2825] transition"
                        >
                            Manifiesto & Quiénes Somos
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Selector de Ediciones (Pestañas Dinámicas) */}
            <section className="border-b border-[#E5DFD5] bg-[#F3EFE8]/70">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center sm:justify-start gap-2 overflow-x-auto">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#8C8277] mr-2 hidden sm:inline">
                        Ediciones:
                    </span>
                    {editions.map((ed) => {
                        const isSelected = ed.number === currentEdition?.number;
                        return (
                            <Link
                                key={ed.id}
                                href={`/?numero=${ed.number}`}
                                preserveScroll
                                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 border ${
                                    isSelected
                                        ? 'text-white shadow-sm'
                                        : 'bg-white/80 text-[#59524A] hover:bg-white border-[#DDD6CC]'
                                }`}
                                style={
                                    isSelected
                                        ? { backgroundColor: ed.color_primary, borderColor: ed.color_primary }
                                        : {}
                                }
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: isSelected ? '#FFFFFF' : ed.color_primary }}
                                />
                                N° {ed.number} · {ed.season} {ed.year}
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Sección Destacada de la Edición Actual */}
            <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
                <div
                    className="p-8 sm:p-12 rounded-2xl border transition-all mb-12 shadow-sm"
                    style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="max-w-2xl">
                            <span
                                className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full mb-3"
                                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                            >
                                Edición N° {currentEdition?.number} — {currentEdition?.season} {currentEdition?.year}
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                                Fanzine Club Social y Federal
                            </h2>
                            <p className="text-base text-[#59524A] leading-relaxed mb-6 italic">
                                "{currentEdition?.quote_text}"
                            </p>
                            {currentEdition?.quote_author && (
                                <p
                                    className="text-xs uppercase tracking-wider font-bold mb-4"
                                    style={{ color: primaryColor }}
                                >
                                    — {currentEdition?.quote_author}
                                </p>
                            )}
                        </div>

                        {/* Botón de Descarga del PDF */}
                        {currentEdition?.pdf_path && (
                            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
                                <a
                                    href={`/${currentEdition.pdf_path}`}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full md:w-auto px-6 py-4 rounded-xl text-white font-medium flex items-center justify-center gap-3 shadow hover:opacity-95 transition transform active:scale-95"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 3a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 00-1-1z" />
                                        <path d="M4 14a1 1 0 00-1 1v2a2 2 0 002 2h10a2 2 0 002-2v-2a1 1 0 10-2 0v2H5v-2a1 1 0 00-1-1z" />
                                    </svg>
                                    <span>Descargar PDF Completo</span>
                                </a>
                                <span className="text-[11px] text-[#8C8277]">
                                    Versión editorial facsimilar
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Grilla Editorial de Artículos */}
                <div className="mb-6 flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                    <h3 className="font-serif text-2xl font-bold tracking-tight">
                        Índice de la Edición
                    </h3>
                    <span className="text-xs uppercase tracking-wider text-[#8C8277]">
                        {currentEdition?.articles?.length || 0} Artículos
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentEdition?.articles?.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-xl border border-[#E5DFD5] p-6 hover:shadow-md transition flex flex-col justify-between group"
                        >
                            <div>
                                {article.section && (
                                    <span
                                        className="inline-block text-[11px] font-bold uppercase tracking-wider mb-2"
                                        style={{ color: primaryColor }}
                                    >
                                        {article.section}
                                    </span>
                                )}
                                <h4 className="font-serif text-lg font-bold mb-2 group-hover:underline">
                                    <Link href={`/articulo/${article.slug}`}>
                                        {article.title}
                                    </Link>
                                </h4>
                                {article.author_name && (
                                    <p className="text-xs text-[#8C8277] mb-3">
                                        Por {article.author_name}
                                    </p>
                                )}
                                <p className="text-xs text-[#59524A] leading-relaxed line-clamp-3">
                                    {article.excerpt}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                                <Link
                                    href={`/articulo/${article.slug}`}
                                    className="text-xs font-semibold flex items-center gap-1 transition"
                                    style={{ color: primaryColor }}
                                >
                                    <span>Leer artículo</span>
                                    <span>→</span>
                                </Link>
                                <span className="text-[10px] text-[#A69C90] font-mono">
                                    #{article.order}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            {/* Pie de Página */}
            <footer className="border-t border-[#E5DFD5] bg-[#F3EFE8] py-8 text-center text-xs text-[#6B635B] mt-16">
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
                    <p className="font-serif font-bold text-sm tracking-widest uppercase text-[#2C2825]">
                        Club Social y Federal
                    </p>
                    <p>Misiones, Argentina — Territorios marcados por la cultura agroecológica.</p>
                    <p className="text-[11px] text-[#8C8277]">
                        Contacto: <a href="mailto:clubsocialyfederal@gmail.com" className="underline hover:text-[#2C2825]">clubsocialyfederal@gmail.com</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
