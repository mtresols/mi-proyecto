import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MagazineHeader from '@/Components/MagazineHeader';

export default function Index({ currentEdition, editions }) {
    const primaryColor = currentEdition?.color_primary || '#7C1D28';

    // Generador de ilustraciones artísticas para tarjetas sin foto
    const renderArtPlaceholder = (section, index) => {
        const patterns = [
            'radial-gradient(circle at 30% 30%, #E3D9CC 0%, #CFC2B2 100%)',
            'radial-gradient(circle at 70% 60%, #E5DDD3 0%, #C8BCAC 100%)',
            'linear-gradient(135deg, #E6DDD1 0%, #D2C5B3 100%)',
        ];
        return (
            <div
                className="w-full h-full flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105"
                style={{ background: patterns[index % patterns.length] }}
            >
                <div className="text-center opacity-85">
                    <span className="text-3xl font-serif block mb-1">🌿</span>
                    <span className="text-[11px] uppercase tracking-widest font-serif font-bold text-[#5C5349]">
                        Club Social y Federal
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1C1815] flex flex-col font-sans selection:bg-[#EAE2D5]">
            <Head title={`Fanzine N° ${currentEdition?.number} (${currentEdition?.season}) - Club Social y Federal`} />

            {/* Header unificado */}
            <MagazineHeader editions={editions} currentEdition={currentEdition} />

            {/* Sub-barra de edición activa y cita editorial */}
            <section className="border-b border-[#E3DC handle D1] bg-[#F2EDE4]/80 py-3.5 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                    <div className="flex items-center gap-2.5">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <span className="font-serif font-black text-xs sm:text-sm uppercase tracking-widest text-[#2E2823]">
                            Edición N° {currentEdition?.number} · {currentEdition?.season} {currentEdition?.year}
                        </span>
                        <span className="text-xs text-[#8C8072] hidden sm:inline">—</span>
                        <span className="text-xs text-[#6E6458] italic hidden sm:inline">
                            "{currentEdition?.quote_text?.slice(0, 100)}..."
                        </span>
                    </div>

                    {/* Selector rápido de números */}
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                        <span className="text-[#8C8072] text-[11px] mr-1">Ver número:</span>
                        {editions.map((ed) => (
                            <Link
                                key={ed.id}
                                href={`/?numero=${ed.number}`}
                                preserveScroll
                                className={`px-2.5 py-1 rounded text-xs transition font-semibold ${
                                    ed.number === currentEdition?.number
                                        ? 'text-white'
                                        : 'bg-white/80 text-[#5C5349] hover:bg-white border border-[#DDD5C7]'
                                }`}
                                style={ed.number === currentEdition?.number ? { backgroundColor: ed.color_primary } : {}}
                            >
                                N° {ed.number}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grilla Principal de Notas (Estilo Revista Anfibia) */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {currentEdition?.articles?.map((article, idx) => (
                        <article
                            key={article.id}
                            className="group flex flex-col justify-between cursor-pointer"
                        >
                            <Link href={`/articulo/${article.slug}`} className="block">
                                {/* Contenedor de la Imagen con Pill de Sección estilo Anfibia */}
                                <div className="relative aspect-[16/10] overflow-hidden rounded bg-[#E8E0D5] mb-4 shadow-sm">
                                    {/* Tag / Pill de Sección */}
                                    {article.section && (
                                        <div className="absolute top-0 left-0 z-10">
                                            <span
                                                className="inline-block px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                {article.section}
                                            </span>
                                        </div>
                                    )}

                                    {/* Imagen o Arte */}
                                    {article.image ? (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        renderArtPlaceholder(article.section, idx)
                                    )}
                                </div>

                                {/* Volanta / Tema en mayúsculas estilo Anfibia */}
                                <p
                                    className="text-[11px] font-bold tracking-wider uppercase mb-1.5 line-clamp-1"
                                    style={{ color: primaryColor }}
                                >
                                    {article.section || 'Club Social y Federal'} · Misiones
                                </p>

                                {/* Título de Fuerte Impacto */}
                                <h3 className="font-serif text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1A1613] leading-snug mb-3 group-hover:underline decoration-2">
                                    {article.title}
                                </h3>

                                {/* Bajada / Excerpt */}
                                <p className="text-xs sm:text-sm text-[#595045] leading-relaxed line-clamp-2 mb-4 font-normal">
                                    {article.excerpt}
                                </p>
                            </Link>

                            {/* Línea de Autoría y Acción al pie */}
                            <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#7A7064]">
                                <span className="font-semibold italic">
                                    {article.author_name ? `Por: ${article.author_name}` : 'Redacción Club'}
                                </span>
                                <Link
                                    href={`/articulo/${article.slug}`}
                                    className="text-[11px] font-bold uppercase tracking-wider hover:opacity-80 flex items-center gap-1"
                                    style={{ color: primaryColor }}
                                >
                                    <span>Leer</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            {/* Pie de Página */}
            <footer className="border-t border-[#E3DCD1] bg-[#1C1815] text-[#FAF7F2] py-10 mt-16 text-center text-xs">
                <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3">
                    <p className="font-serif font-black text-base tracking-widest uppercase text-white">
                        Club Social y Federal
                    </p>
                    <p className="text-[#A89E92] max-w-md">
                        El territorio de la ruralidad y las subterraneidades. Publicación facsimilar agroecológica.
                    </p>
                    <p className="text-[11px] text-[#786E63]">
                        Contacto: <a href="mailto:clubsocialyfederal@gmail.com" className="underline hover:text-white">clubsocialyfederal@gmail.com</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
