import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ArticleShow({ article, edition, relatedArticles }) {
    const primaryColor = edition?.color_primary || '#7C1D28';

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825] flex flex-col font-sans selection:bg-[#EAE2D5]">
            <Head title={`${article.title} - Club Social y Federal`} />

            {/* Cabecera compacta */}
            <header className="border-b border-[#E5DFD5] bg-[#FAF7F2]/90 backdrop-blur sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link 
                        href={`/?numero=${edition?.number}`}
                        className="text-xs font-semibold flex items-center gap-2 hover:opacity-80 transition"
                        style={{ color: primaryColor }}
                    >
                        <span>← Volver a la Edición N° {edition?.number} ({edition?.season})</span>
                    </Link>

                    <Link href="/" className="font-serif tracking-widest text-sm font-bold uppercase hidden sm:inline">
                        Club Social y Federal
                    </Link>
                </div>
            </header>

            {/* Cuerpo del Artículo */}
            <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
                {/* Metadatos */}
                <div className="mb-8 text-center">
                    {article.section && (
                        <span 
                            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                            style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                        >
                            {article.section}
                        </span>
                    )}
                    <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1F1B18] leading-tight mb-4">
                        {article.title}
                    </h1>
                    {article.author_name && (
                        <p className="text-sm sm:text-base text-[#6B635B] italic font-serif">
                            Por {article.author_name}
                        </p>
                    )}
                </div>

                {/* Bajada / Excerpt destacada */}
                {article.excerpt && (
                    <div 
                        className="p-6 rounded-xl border-l-4 bg-[#F5F0E8] mb-10 text-base sm:text-lg italic text-[#4A433D] leading-relaxed"
                        style={{ borderColor: primaryColor }}
                    >
                        "{article.excerpt}"
                    </div>
                )}

                {/* Contenido Completo del Artículo */}
                <div className="prose prose-lg max-w-none text-[#2C2825] leading-relaxed whitespace-pre-line font-serif text-lg">
                    {article.content}
                </div>

                {/* Acciones al pie del artículo */}
                <div className="mt-16 pt-8 border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href={`/?numero=${edition?.number}`}
                        className="text-xs font-semibold px-4 py-2 rounded-lg border border-[#DDD6CC] bg-white hover:bg-[#F5F0E8] transition"
                    >
                        ← Volver al índice del número
                    </Link>

                    {edition?.pdf_path && (
                        <a
                            href={`/${edition.pdf_path}`}
                            download
                            className="text-xs font-semibold text-white px-5 py-2.5 rounded-lg shadow transition hover:opacity-95"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Descargar Edición N° {edition.number} en PDF
                        </a>
                    )}
                </div>

                {/* Otros artículos de esta edición */}
                {relatedArticles?.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-[#E5DFD5]">
                        <h3 className="font-serif text-xl font-bold mb-6">
                            Más lecturas de la Edición N° {edition?.number}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/articulo/${rel.slug}`}
                                    className="p-4 rounded-xl border border-[#E5DFD5] bg-white hover:shadow-sm transition flex flex-col justify-between group"
                                >
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-[#8C8277]">
                                            {rel.section}
                                        </span>
                                        <h4 className="font-serif text-sm font-bold mt-1 group-hover:underline">
                                            {rel.title}
                                        </h4>
                                    </div>
                                    <span 
                                        className="text-[11px] font-semibold mt-3 flex items-center gap-1"
                                        style={{ color: primaryColor }}
                                    >
                                        Leer nota →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Pie de página */}
            <footer className="border-t border-[#E5DFD5] bg-[#F3EFE8] py-8 text-center text-xs text-[#6B635B]">
                <p className="font-serif font-bold text-sm tracking-widest uppercase text-[#2C2825] mb-1">
                    Club Social y Federal
                </p>
                <p>Misiones, Argentina — Territorios de la ruralidad y las subterraneidades.</p>
            </footer>
        </div>
    );
}