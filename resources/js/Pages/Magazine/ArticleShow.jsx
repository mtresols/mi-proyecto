import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MagazineHeader from '@/Components/MagazineHeader';

export default function ArticleShow({ article, edition, relatedArticles }) {
    const primaryColor = edition?.color_primary || '#7C1D28';

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1C1815] flex flex-col font-sans selection:bg-[#EAE2D5]">
            <Head title={`${article.title} - Club Social y Federal`} />

            {/* Header común superior idéntico */}
            <MagazineHeader currentEdition={edition} />

            {/* Barra de retorno a la edición */}
            <div className="border-b border-[#E3DCD1] bg-[#F2EDE4]/70 py-2.5 px-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
                    <Link
                        href={`/?numero=${edition?.number}`}
                        className="font-bold flex items-center gap-1.5 hover:opacity-80 transition"
                        style={{ color: primaryColor }}
                    >
                        <span>← Volver a notas de Edición N° {edition?.number} ({edition?.season})</span>
                    </Link>
                    <span className="text-[#8C8072] font-semibold uppercase tracking-wider text-[11px] hidden sm:inline">
                        {edition?.title}
                    </span>
                </div>
            </div>

            {/* Cuerpo del Artículo */}
            <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
                {/* Cabecera del Artículo estilo Anfibia */}
                <div className="mb-10 text-center sm:text-left">
                    {article.section && (
                        <span
                            className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider text-white mb-4"
                            style={{ backgroundColor: primaryColor }}
                        >
                            {article.section}
                        </span>
                    )}
                    <h1 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1C1815] leading-tight mb-4">
                        {article.title}
                    </h1>
                    {article.author_name && (
                        <p className="text-sm sm:text-base text-[#6E6458] italic font-serif">
                            Por: <span className="font-semibold text-[#1C1815]">{article.author_name}</span>
                        </p>
                    )}
                </div>

                {/* Bajada / Excerpt destacada */}
                {article.excerpt && (
                    <div
                        className="p-6 rounded-lg border-l-4 bg-[#F2EDE4] mb-10 text-base sm:text-lg italic text-[#3E3831] leading-relaxed font-serif"
                        style={{ borderColor: primaryColor }}
                    >
                        "{article.excerpt}"
                    </div>
                )}

                {/* Contenido Completo del Artículo */}
                <div className="prose prose-lg max-w-none text-[#2C2825] leading-relaxed whitespace-pre-line font-serif text-lg">
                    {article.content}
                </div>

                {/* Acciones al pie */}
                <div className="mt-14 pt-8 border-t border-[#E3DCD1] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href={`/?numero=${edition?.number}`}
                        className="text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded border border-[#DDD5C7] bg-white hover:bg-[#F2EDE4] transition"
                    >
                        ← Volver a Edición N° {edition?.number}
                    </Link>

                    {edition?.pdf_path && (
                        <a
                            href={`/${edition.pdf_path}`}
                            download
                            className="text-xs font-bold uppercase tracking-wider text-white px-5 py-2.5 rounded shadow transition hover:opacity-95"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Descargar Edición Completa en PDF
                        </a>
                    )}
                </div>

                {/* Otras notas de esta edición */}
                {relatedArticles?.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-[#E3DCD1]">
                        <h3 className="font-serif text-xl font-black uppercase tracking-tight mb-6">
                            Más notas de la Edición N° {edition?.number}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/articulo/${rel.slug}`}
                                    className="p-4 rounded-lg border border-[#E3DCD1] bg-white hover:shadow-sm transition flex flex-col justify-between group"
                                >
                                    <div>
                                        <span className="text-[10px] uppercase font-black tracking-wider text-[#8C8072]">
                                            {rel.section}
                                        </span>
                                        <h4 className="font-serif text-sm font-bold mt-1 group-hover:underline text-[#1C1815]">
                                            {rel.title}
                                        </h4>
                                    </div>
                                    <span
                                        className="text-[11px] font-bold mt-3 flex items-center gap-1"
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

            {/* Footer */}
            <footer className="border-t border-[#E3DCD1] bg-[#1C1815] text-[#FAF7F2] py-8 text-center text-xs">
                <p className="font-serif font-black tracking-widest uppercase mb-1">Club Social y Federal</p>
                <p className="text-[#8C8072] text-[11px]">Territorios rurales de Misiones — 2026</p>
            </footer>
        </div>
    );
}
