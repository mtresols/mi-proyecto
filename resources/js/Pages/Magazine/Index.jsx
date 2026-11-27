import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ currentEdition, editions }) {
    const primaryColor = currentEdition?.color_primary || '#7C1D28';
    const containerRef = useRef(null);

    const canvasLeftRef = useRef(null);
    const canvasRightRef = useRef(null);
    const canvasSingleRef = useRef(null);

    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isTwoPageMode, setIsTwoPageMode] = useState(true);

    const pdfUrl = currentEdition?.pdf_path ? encodeURI(`/${currentEdition.pdf_path}`) : null;

    // ¿Mostrar una sola hoja (portada) o dos hojas abiertas?
    const isSingleView = !isTwoPageMode || pageNum === 1;

    // Cargar el documento PDF
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setPageNum(1);

        if (!pdfUrl || !window.pdfjsLib) return;

        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise
            .then((pdf) => {
                if (!isMounted) return;
                setPdfDoc(pdf);
                setNumPages(pdf.numPages);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar PDF:", err);
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [pdfUrl]);

    // Función auxiliar para renderizar una página en un canvas dado
    const renderPageToCanvas = (pageNumber, canvas) => {
        if (!pdfDoc || !canvas || !containerRef.current) return Promise.resolve();

        return pdfDoc.getPage(pageNumber).then((page) => {
            const containerHeight = containerRef.current.clientHeight - 40;
            const containerWidth = containerRef.current.clientWidth - 140; // Espacio para flechas
            const unscaledViewport = page.getViewport({ scale: 1 });

            // Calcular escala según si es vista simple o doble
            const targetWidth = isSingleView ? containerWidth : containerWidth / 2;
            const scaleHeight = containerHeight / unscaledViewport.height;
            const scaleWidth = targetWidth / unscaledViewport.width;
            const fitScale = Math.min(scaleHeight, scaleWidth);

            const dpr = window.devicePixelRatio || 1;
            const viewport = page.getViewport({ scale: fitScale * dpr });

            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            canvas.style.height = `${viewport.height / dpr}px`;
            canvas.style.width = `${viewport.width / dpr}px`;

            return page.render({
                canvasContext: context,
                viewport: viewport,
            }).promise;
        });
    };

    // Renderizar página(s) actual(es)
    useEffect(() => {
        if (!pdfDoc) return;

        if (isSingleView) {
            renderPageToCanvas(pageNum, canvasSingleRef.current);
        } else {
            // Página izquierda (actual)
            renderPageToCanvas(pageNum, canvasLeftRef.current);
            // Página derecha (siguiente) si existe
            if (pageNum + 1 <= numPages) {
                renderPageToCanvas(pageNum + 1, canvasRightRef.current);
            }
        }
    }, [pdfDoc, pageNum, isTwoPageMode]);

    // Navegación con teclado
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextPage();
            } else if (e.key === 'ArrowLeft') {
                prevPage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pageNum, numPages, isTwoPageMode]);

    const prevPage = () => {
        if (pageNum <= 1) return;
        if (!isTwoPageMode) {
            setPageNum(pageNum - 1);
        } else {
            if (pageNum === 2) {
                setPageNum(1); // Volver a la portada
            } else {
                setPageNum(Math.max(1, pageNum - 2));
            }
        }
    };

    const nextPage = () => {
        if (!isTwoPageMode) {
            if (pageNum < numPages) setPageNum(pageNum + 1);
        } else {
            if (pageNum === 1) {
                setPageNum(2); // De la portada a las páginas 2-3
            } else if (pageNum + 2 <= numPages) {
                setPageNum(pageNum + 2);
            } else if (pageNum + 1 <= numPages) {
                setPageNum(pageNum + 1);
            }
        }
    };

    const isLastPage = isTwoPageMode ? pageNum >= numPages - 1 : pageNum >= numPages;

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#181614] text-[#FAF7F2] flex flex-col font-sans select-none">
            <Head title={`Fanzine N° ${currentEdition?.number} (${currentEdition?.season}) - Club Social y Federal`} />

            {/* Header */}
            <header className="bg-[#12100E] border-b border-[#28231F] px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
                {/* Logo e Identidad */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: primaryColor }}
                    >
                        ☀
                    </div>
                    <div>
                        <h1 className="font-serif font-black tracking-wider text-sm sm:text-base uppercase text-white group-hover:text-amber-100 transition">
                            Club Social y Federal
                        </h1>
                        <p className="text-[9px] text-[#9E9488] uppercase tracking-widest hidden sm:block">
                            El territorio de la ruralidad y las subterraneidades
                        </p>
                    </div>
                </Link>

                {/* Selector de Ediciones */}
                <div className="flex items-center gap-1.5 bg-[#201C19] p-1 rounded-lg border border-[#302A25]">
                    {editions.map((ed) => {
                        const isSelected = ed.number === currentEdition?.number;
                        return (
                            <Link
                                key={ed.id}
                                href={`/?numero=${ed.number}`}
                                preserveScroll
                                className={`px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 ${
                                    isSelected
                                        ? 'bg-[#3A322C] text-white shadow-xs'
                                        : 'text-[#9E9488] hover:text-white hover:bg-[#28221D]'
                                }`}
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: ed.color_primary }}
                                />
                                <span>N° {ed.number}</span>
                                <span className="hidden md:inline font-normal text-[11px] text-[#7A7064]">
                                    · {ed.season}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Controles de Vista y Descarga */}
                <div className="flex items-center gap-2 text-xs font-bold">
                    {/* Botón cambiar entre 1 y 2 páginas */}
                    <button
                        type="button"
                        onClick={() => setIsTwoPageMode(!isTwoPageMode)}
                        className="px-2.5 py-1.5 rounded-md bg-[#231F1C] hover:bg-[#302A25] text-[#C7BCAD] transition border border-[#38312B] flex items-center gap-1.5"
                        title="Cambiar modo de vista"
                    >
                        <span>{isTwoPageMode ? '📖 Doble página' : '📄 1 página'}</span>
                    </button>

                    {currentEdition?.pdf_path && (
                        <a
                            href={`/${currentEdition.pdf_path}`}
                            download
                            className="px-3 py-1.5 rounded-md text-white font-semibold transition flex items-center gap-1.5 shadow hover:opacity-95 text-xs"
                            style={{ backgroundColor: primaryColor }}
                        >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                                <path d="M10 3a1 1 0 00-1 1v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 11.586V4a1 1 0 00-1-1z" />
                                <path d="M4 14a1 1 0 00-1 1v2a2 2 0 002 2h10a2 2 0 002-2v-2a1 1 0 10-2 0v2H5v-2a1 1 0 00-1-1z" />
                            </svg>
                            <span className="hidden sm:inline">Descargar PDF</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Escenario Central */}
            <main
                ref={containerRef}
                className="flex-1 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            >
                {/* Flecha Izquierda */}
                <button
                    type="button"
                    onClick={prevPage}
                    disabled={pageNum <= 1}
                    className={`absolute left-3 sm:left-6 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition backdrop-blur shadow-xl border border-white/10 ${
                        pageNum <= 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
                    }`}
                    title="Página anterior"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                </button>

                {/* Spinner de carga */}
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#181614] z-20 text-[#A89E92] gap-3">
                        <div className="w-8 h-8 border-3 border-amber-200 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs uppercase tracking-widest font-semibold">Abriendo revista...</span>
                    </div>
                )}

                {/* Contenedor de Hojas */}
                <div className="relative flex items-center justify-center shadow-2xl rounded-sm overflow-hidden bg-[#FAF7F2]">
                    {isSingleView ? (
                        /* Vista de 1 Hoja (Tapa o Modo 1 página) */
                        <canvas ref={canvasSingleRef} className="block shadow-lg" />
                    ) : (
                        /* Vista de Revista Abierta (Doble Página con Lomo Central) */
                        <div className="flex items-center shadow-2xl relative">
                            {/* Página Izquierda */}
                            <canvas ref={canvasLeftRef} className="block" />

                            {/* Sombra central del lomo / encuadernación */}
                            <div className="w-[2px] h-full bg-gradient-to-r from-black/25 via-black/10 to-transparent absolute left-1/2 -translate-x-1/2 pointer-events-none z-10" />

                            {/* Página Derecha */}
                            {pageNum + 1 <= numPages ? (
                                <canvas ref={canvasRightRef} className="block" />
                            ) : (
                                <div className="bg-[#FAF7F2] flex items-center justify-center text-neutral-400 text-xs italic">
                                    Fin de la edición
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Flecha Derecha */}
                <button
                    type="button"
                    onClick={nextPage}
                    disabled={isLastPage}
                    className={`absolute right-3 sm:right-6 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition backdrop-blur shadow-xl border border-white/10 ${
                        isLastPage ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
                    }`}
                    title="Página siguiente"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                </button>

                {/* Indicador de Páginas Abiertas al pie */}
                <div className="absolute bottom-3.5 z-30 px-4 py-1 rounded-full bg-black/75 backdrop-blur border border-white/10 text-xs font-semibold tracking-wider text-[#FAF7F2] shadow-lg flex items-center gap-2">
                    {isSingleView ? (
                        <span>Página {pageNum} de {numPages || '...'}</span>
                    ) : (
                        <span>Páginas {pageNum} - {Math.min(pageNum + 1, numPages)} de {numPages || '...'}</span>
                    )}
                    <span className="text-[10px] text-[#8C8072] hidden sm:inline">• Usa flechas ← →</span>
                </div>
            </main>
        </div>
    );
}
