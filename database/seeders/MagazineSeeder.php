<?php

namespace Database\Seeders;

use App\Models\Edition;
use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MagazineSeeder extends Seeder
{
    public function run(): void
    {
        // -------------------------------------------------------------
        // EDICIÓN N° 1: VERANO 2026 (Borgoña / Tierra)
        // -------------------------------------------------------------
        $ed1 = Edition::updateOrCreate(
            ['number' => 1],
            [
                'title' => 'Fanzine Club Social y Federal: El territorio de la ruralidad y las subterraneidades',
                'season' => 'Verano',
                'year' => 2026,
                'color_primary' => '#7C1D28',
                'color_secondary' => '#FBF8F2',
                'quote_author' => 'Ana Primavesi',
                'quote_text' => 'Ou todos, ou ninguém. A terra é um organismo vivo. Quando destruímos o solo, destruímos a base que sustenta a vida humana.',
                'pdf_path' => 'ediciones/N°1 Verano 2026 Club Social y Federal.pdf',
                'published_at' => '2026-01-15',
                'is_published' => true,
            ]
        );

        $articlesEd1 = [
            [
                'title' => 'Ou Todos, Ou Ninguém: Manifiesto Editorial',
                'slug' => 'editorial-numero-1-ou-todos-ou-ninguem',
                'section' => 'Editorial',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'El territorio de la ruralidad y las subterraneidades en los montes misioneros.',
                'content' => "Esta revista, escrita, editada y producida por el Club Social y Federal, busca difundir información, armar lazos, proponer espacios de diálogo e interlocución entre territorios rurales marcados por la cultura agroecológica.\n\nEn un tiempo de desarraigo y monocultivos, nos reunimos a pensar la tierra no como recurso extractivo, sino como casa común y organismo vivo.",
                'order' => 1,
            ],
            [
                'title' => 'Ipahaitépe / Finalmente',
                'slug' => 'ipahaitepe-finalmente-poesia',
                'section' => 'Poesía',
                'author_name' => 'Verónica Gómez',
                'excerpt' => 'Poema bilingüe en guaraní y castellano sobre el monte y la espera.',
                'content' => "Poesía del monte que dialoga entre dos lenguas vivas del territorio misionero, nombrando lo que resiste en la espesura.",
                'order' => 2,
            ],
            [
                'title' => '¿Agroecología? Recorriendo la pregunta',
                'slug' => 'agroecologia-recorriendo-la-pregunta',
                'section' => 'Agroecología',
                'author_name' => 'Redacción',
                'excerpt' => 'Reflexiones a partir de Vandana Shiva, Eduardo Sevilla Guzmán y Javier Souza Casadinho.',
                'content' => "La agroecología no es un conjunto de recetas técnicas para sustituir insumos químicos por orgánicos: es una propuesta política, ética y cultural de reconfiguración del vínculo humano con el ecosistema.",
                'order' => 3,
            ],
            [
                'title' => 'Matico: Saberes y Medicina del Monte',
                'slug' => 'matico-saberes-medicinales',
                'section' => 'Saberes Medicinales',
                'author_name' => 'Saberes Populares',
                'excerpt' => 'Propiedades respiratorias, cicatrizantes y memoria botánica.',
                'content' => "El matico forma parte de la botánica cotidiana de las chacras. Rescatar sus usos tradicionales es un acto de soberanía sanitaria.",
                'order' => 4,
            ],
            [
                'title' => 'Entrevista a Jazmín y Juan Carlos Furlán',
                'slug' => 'entrevista-jazmin-juan-carlos-furlan',
                'section' => 'Entrevista Central',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'Desde Cerro Corá: soberanía alimentaria, chacra viva y resistencia campesina.',
                'content' => "Conversamos con la familia Furlán sobre los desafíos cotidianos de producir alimentos sanos en Misiones y sostener la vida comunitaria.",
                'order' => 5,
            ],
            [
                'title' => 'La Argentina ya no toma mate',
                'slug' => 'la-argentina-ya-no-toma-mate-rodolfo-walsh',
                'section' => 'Historia & Memoria',
                'author_name' => 'Rodolfo Walsh (1966)',
                'excerpt' => 'El texto histórico de Walsh sobre los tareferos y las contradicciones de la yerba mate.',
                'content' => "Crónica fundamental de 1966 que retrata las condiciones de trabajo de los tareferos en los yerbales misioneros, cuya vigencia nos interpela hasta hoy.",
                'order' => 6,
            ],
        ];

        foreach ($articlesEd1 as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], array_merge($art, ['edition_id' => $ed1->id]));
        }

        // -------------------------------------------------------------
        // EDICIÓN N° 2: OTOÑO 2026 (Azul Petróleo / Selva y Río)
        // -------------------------------------------------------------
        $ed2 = Edition::updateOrCreate(
            ['number' => 2],
            [
                'title' => 'Fanzine Club Social y Federal: El territorio de la ruralidad y las subterraneidades',
                'season' => 'Otoño',
                'year' => 2026,
                'color_primary' => '#245870',
                'color_secondary' => '#EAE6DF',
                'quote_author' => 'EZLN, Chiapas: la treceava estela (2003)',
                'quote_text' => 'Los zapatistas son muy otros, así que imaginan cosas antes de que esas cosas estén y piensan que, nombrándolas, esas cosas empiezan a tener vida, a caminar… y sí, a dar problemas. Así que seguro ya imaginaron algo y van a empezar a hacer como si ese algo ya existiera y nadie va a entender nada hasta que pase un tiempo porque, en efecto, ya nombradas, las cosas empiezan a tener cuerpo, vida y mañana.',
                'pdf_path' => 'ediciones/N°2 Otoño 2026 Club Social y Federal.pdf',
                'published_at' => '2026-04-21',
                'is_published' => true,
            ]
        );

        $articlesEd2 = [
            [
                'title' => 'Capuera',
                'slug' => 'capuera-poesia-lujan-sanauma',
                'section' => 'Poesía',
                'author_name' => 'Lujan Sanauma',
                'excerpt' => 'Por la comisura de nuestras patas de gallo, el paso del tiempo...',
                'content' => "Por la comisura de nuestras patas de gallo, el paso del tiempo\nEncontrarnos más una vez sin mucho más que encontrarnos\nDar tiempo, soltar el tiempo, pasar el tiempo...\nSi somos bosque de pino, no hay vuelta atrás: seremos incendio.\nPero ai, si somos yerba lucero, ai, si somos chirka...\n¿Acaso no sobreviviremos? Quizá tampoco.\nPero nos habremos dado la chance de entrelazarnos, entremezclarnos, de ser también monte nativo.",
                'order' => 1,
            ],
            [
                'title' => 'Fordlandia',
                'slug' => 'fordlandia-segunda-naturaleza-y-monocultivo',
                'section' => 'Ensayo',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'El sueño hegemónico de Henry Ford en 1927 de crear una segunda naturaleza en el Amazonas.',
                'content' => "Héctor Alimonda nos cuenta el sueño de Henry Ford de crear una segunda naturaleza: proyecto de desmonte de los ecosistemas tropicales y domesticación de las relaciones sociales a partir de la producción industrial llamado FORDLANDIA...\n\nComo dice Cecilia Gárgano: este intento fordista de gerenciamiento de la naturaleza dialoga con la crisis ecológica actual. Frente a esta experiencia arrogante y arrasadora, nos preguntamos: ¿está lejos de nuestro presente?",
                'order' => 2,
            ],
            [
                'title' => 'La vida secreta de (los nombres de) las plantas',
                'slug' => 'la-vida-secreta-de-los-nombres-de-las-plantas',
                'section' => 'Botánica & Lingüística',
                'author_name' => 'Estefanía Baranger',
                'excerpt' => 'Etimologías, mitos guaraníes sobre la mandioca y el maíz, y Stevie Wonder.',
                'content' => "Entre los mbyá guaraní se cuenta que la mandioca toma su nombre de Manji, la hija de un cacique que pidió ser enterrada donde había caído un rayo durante una tormenta. Tiempo después brotó allí una pequeña planta cuyas raíces sus siervos desenterraron...\n\nBasta escarbar un poco para que emerjan estas vidas secretas, imperceptibles a simple vista.",
                'order' => 3,
            ],
            [
                'title' => 'Homeopatía: Producción y Salud',
                'slug' => 'homeopatia-produccion-y-salud-agropecuaria',
                'section' => 'Agroecología',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'Soberanía sanitaria a través de ganadería regenerativa y medicina integrativa.',
                'content' => "En un escenario de presión ejercida por los paquetes tecnológicos de los agronegocios, trabajar en la chacra es cada vez más difícil. En este contexto, la homeopatía integrativa aparece como una herramienta válida para la atención de la salud en los animales, los cultivos y las personas, reduciendo la dependencia de insumos químicos externos.",
                'order' => 4,
            ],
            [
                'title' => 'Entrevista a Susy Shock (Parte I)',
                'slug' => 'entrevista-susy-shock-parte-1',
                'section' => 'Entrevista Central',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'Artista trans sudaca, performer y referente: "Acercarse a quienes nos exigen profundidad".',
                'content' => "Entrevistamos a Susy Shock. Hablamos de la urgencia de bajarse del artificio de la vida moderna, de la defensa del agua y la ley de glaciares, del ecocidio y de la necesidad de primerear nuevas discusiones colectivas e insurgentes desde el afecto y la presencia comunitaria.",
                'order' => 5,
            ],
            [
                'title' => 'Cabichuí: Espantando la muerte',
                'slug' => 'cabichui-periodico-de-trinchera',
                'section' => 'Historia de la Prensa',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'El periódico de trinchera grabado en xilografía durante la Guerra de la Triple Alianza.',
                'content' => "CABICHU'I fue un periódico de trinchera impreso en papel de caraguatá con tintes vegetales y culatas de fusiles en pleno frente de batalla. Como dice Roberto Amigo, Cabichuí es una avispa combativa cuyo aguijón es como la bayoneta del fusil. Una muestra viva de la risa y la resistencia popular frente al imperio.",
                'order' => 6,
            ],
            [
                'title' => 'Receta Tradicional: Cheong (청)',
                'slug' => 'receta-cheong-fermento-citricos',
                'section' => 'Recetas Vivas',
                'author_name' => 'Antonella, Monte Araticú',
                'excerpt' => 'Jarabe fermentado coreano de cítricos de estación con azúcar integral o miel.',
                'content' => "El cheong es una preparación tradicional coreana que aprovecha los excedentes cítricos de la estación mediante una fermentación viva sin cocción. Ideal para tónicos digestivos y cocina estacional.",
                'order' => 7,
            ],
        ];

        foreach ($articlesEd2 as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], array_merge($art, ['edition_id' => $ed2->id]));
        }

        // -------------------------------------------------------------
        // EDICIÓN N° 3: INVIERNO 2026 (Violeta / Memoria y Territorio)
        // -------------------------------------------------------------
        $ed3 = Edition::updateOrCreate(
            ['number' => 3],
            [
                'title' => 'Fanzine Club Social y Federal: El territorio de la ruralidad y las subterraneidades',
                'season' => 'Invierno',
                'year' => 2026,
                'color_primary' => '#4D2D5E',
                'color_secondary' => '#F5F0EB',
                'quote_author' => 'Étienne de La Boétie (1576)',
                'quote_text' => 'Siempre existen aquellos que sienten el peso del yugo y no pueden dejar de sacudirlo. Son aquellos que así la libertad estuviera por entero perdida y totalmente fuera del mundo, la imaginan y sienten en su espíritu y además la saborean y que no pueden tolerar la servidumbre por mucho que la adornen.',
                'pdf_path' => 'ediciones/N°3 Invierno 2026 Club Social y Federal.pdf',
                'published_at' => '2026-07-20',
                'is_published' => true,
            ]
        );

        $articlesEd3 = [
            [
                'title' => 'Tempo de folha',
                'slug' => 'tempo-de-folha-vanessa-valentim',
                'section' => 'Poesía',
                'author_name' => 'Vanessa Valentim',
                'excerpt' => 'Aprendi a medir o tempo pelas plantas. Não pelos calendários, nem pelas horas...',
                'content' => "Aprendi a medir o tempo pelas plantas.\nNão pelos calendários, nem pelas horas, mas pelo instante em que a erva-baleeira deixa de ser folha e começa a ser cuidado.\nO capim-limão não conhece a pressa. Mesmo quando o vento o atravessa, ele devolve perfume.\nAs plantas jamais adiantam a estação. Aceitam o frio, a seca, a chuva tardia, como quem guarda um pacto antigo com a terra.",
                'order' => 1,
            ],
            [
                'title' => 'Lo útil y lo bello: Oficio ceramista',
                'slug' => 'lo-util-y-lo-bello-ceramica',
                'section' => 'Oficios & Resistencia',
                'author_name' => 'Adriana Martínez (@adrianamartinezceramica)',
                'excerpt' => 'La cerámica como tecnología milenaria, soberanía del trabajo y resistencia al apuro.',
                'content' => "La cerámica es una de las tecnologías más antiguas creadas por la humanidad. En un tiempo marcado por lo virtual y lo efímero, resistir desde el oficio de ceramista es recuperar la soberanía sobre nuestro trabajo y nuestros tiempos cotidianos.",
                'order' => 2,
            ],
            [
                'title' => 'Somos las Fuerzas del Suelo',
                'slug' => 'somos-las-fuerzas-del-suelo-compostaje',
                'section' => 'Agroecología',
                'author_name' => 'Simón Ingouville',
                'excerpt' => 'Somos humanos de humus. Desexistir la basura y devolver la vida a la tierra.',
                'content' => "Somos humildes y somos humanos, de humus (tierra). Salvo las plantas, todos somos comensales y comida en el ciclo de eterno retorno al suelo.\nLa basura no existe: la mitad es vida y la otra mitad tecnología. Compostar no es solo una obligación, es una práctica constitutiva de nuestra identidad.",
                'order' => 3,
            ],
            [
                'title' => 'Irundí yvytu (Cuatro Vientos)',
                'slug' => 'irundi-yvytu-cuatro-vientos-cosmovision',
                'section' => 'Cosmovisión Mbya',
                'author_name' => 'Karaí Tataendy',
                'excerpt' => 'Relato tradicional en guaraní y castellano sobre los espíritus del viento creados por Ñande Ru.',
                'content' => "Cuentan los ancianos que cuando Ñande Ru todavía estaba ordenando la tierra, el aire era pesado y quieto. Así nacieron los Yvytu, los espíritus del viento que viajan llevando canciones y mensajes por toda la tierra.",
                'order' => 4,
            ],
            [
                'title' => 'Entrevista a Keila Zaya (Yva): Administrar el conflicto',
                'slug' => 'entrevista-keila-zaya-administrar-el-conflicto',
                'section' => 'Entrevista Central',
                'author_name' => 'Club Social y Federal',
                'excerpt' => 'Comunidad Tekoa Arandú: espiritualidad, idioma guaraní y la defensa territorial de Puente Quemado II.',
                'content' => "Conversación profunda con Keila Zaya sobre el significado de su nombre espiritual Yva (cielo y fruto), su paso por la ONU denunciando la contaminación de las aguas, y la resistencia comunitaria en defensa del territorio ancestral.",
                'order' => 5,
            ],
            [
                'title' => 'Bitácoras sobre el oficio de hacer memoria',
                'slug' => 'bitacoras-sobre-el-oficio-de-hacer-memoria',
                'section' => 'Memoria Colectiva',
                'author_name' => 'El Soberbio tiene memoria',
                'excerpt' => 'Reflexiones sobre investigación comunitaria, disciplinamiento y dictadura en El Soberbio.',
                'content' => "Hacer memoria es un trabajo deliberado que requiere técnica, paciencia y un 'otro'. La memoria colectiva es la herramienta necesaria para disputar los sentidos del presente y pensar un futuro consciente de sus raíces.",
                'order' => 6,
            ],
            [
                'title' => 'Antidomesticación y familiarización',
                'slug' => 'antidomesticacion-y-familiarizacion-humanos-plantas',
                'section' => 'Antropología & Territorio',
                'author_name' => 'Gabriela Schiavone (CONICET - UNaM)',
                'excerpt' => 'Hacia una nueva relación entre humanos y plantas más allá de la lógica de dominación.',
                'content' => "Los grupos indígenas sudamericanos conciben la selva como cultivada por diferentes seres. La agroecología constituye una invitación a relacionarse de otro modo con las especies vegetales, fundando parentescos y proximidades de cuidado.",
                'order' => 7,
            ],
            [
                'title' => 'Crónica estacional & Tarta silvestre de invierno',
                'slug' => 'receta-tarta-silvestre-de-invierno-panc',
                'section' => 'Cocina Estacional',
                'author_name' => 'Agustina E. Navarro (@agus.e.navarro)',
                'excerpt' => 'Plantas Alimenticias No Convencionales (PANC), limón mandarina y masa silvestre.',
                'content' => "El invierno no duerme: ofrece hojas tiernas de diente de león, llantén y limones criollos. Receta paso a paso para honrar los frutos y hojas que el monte regala en los meses fríos.",
                'order' => 8,
            ],
        ];

        foreach ($articlesEd3 as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], array_merge($art, ['edition_id' => $ed3->id]));
        }
    }
}
