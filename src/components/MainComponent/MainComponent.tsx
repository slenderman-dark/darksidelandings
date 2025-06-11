'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { ProductsComponent } from '../ProductsCompont.tsx/ProductsComponent';

export default function MainComponent() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className='px-4 py-8'>
            {!isMobile ? (
                <main className="max-w-4xl mx-auto">
                    <section>
                        <h1 className="text-3xl font-bold text-center pb-6">EXPOSIÇÃO 🐇❤️ ALICE NO PAÍS DAS MARAVILHAS</h1>
                        <div>
                            <div className="flex gap-8">
                                <div className="w-1/3">
                                    <Image
                                        src="https://darkside.vtexassets.com/assets/vtex.file-manager-graphql/images/72541eac-bdb7-4fad-a74c-062a0a5a0445___b949680d10d6c51d40b944511e9dbaac.jpg"
                                        alt="Lewis Carroll"
                                        width={918}
                                        height={1080}
                                        className="w-[100%] h-[100%]"
                                    />
                                </div>
                                <div className="flex flex-col w-2/3 gap-4 text-lg">
                                    <p>Sir John Tenniel eternizou Alice. Com traço preciso e imaginação vívida, o artista britânico deu rosto e corpo ao universo de fantasia criado por Lewis Carroll, materializando palavras e mudando para sempre a forma como lemos com os olhos. Suas ilustrações para Alice no País das Maravilhas (1865) e Alice Através do Espelho (1871) moldaram o imaginário coletivo, e dessa parceria criativa nasceu um fenômeno cultural que fundiu texto e imagem em uma unidade inseparável.</p>
                                    <p>Conhecido por seu trabalho satírico na revista Punch e por suas ilustrações do poema “O Corvo”, de Edgar Allan Poe, e das fábulas de Esopo, Tenniel foi o ilustrador escolhido pelo autor para dar vida às suas obras-primas. Tenniel construiu o reino de Alice com ilustrações que, de maneira consistente, deram carne e osso, textura e expressão aos personagens.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 text-lg mt-4">
                                <p>Foi ele quem moldou, de forma definitiva, os rostos e os gestos do Coelho Branco de olhar aflito, da severa Rainha de Copas, do Gato de Cheshire se esgueirando entre o visível e o invisível, da Lagarta altiva sobre o cogumelo, do Chapeleiro Maluco no auge do nonsense. Seu traço deu corpo às surpresas, aos encantos e aos terrores daquele mundo subterrâneo, tornando-os ainda mais vibrantes, irônicos e inesquecíveis.</p>
                                <p>A força de sua arte reside na coerência visual com a lógica onírica e caprichosa do texto. Suas imagens convidam o leitor a adentrar o mundo invertido de Carroll com um pé na realidade vitoriana e outro na fábula mais delirante. Suas gravuras refinadas e de extraordinária precisão técnica criaram uma iconografia duradoura, capaz de atravessar séculos e permanecer viva na memória afetiva de gerações de leitores.</p>
                                <p>Ilustrar, para Tenniel, era entrar em um diálogo íntimo com o autor por meio de uma via colaborativa. Era interpretar códigos, decifrar atmosferas, captar o ritmo interno da narrativa e oferecer ao leitor uma lente visual poderosa pela qual a história se revelava ainda mais vívida, estranha e encantadora.</p>
                                <p>Tenniel permanece, assim, um dos grandes nomes da história da ilustração literária, e seu trabalho em Alice é um lembrete contundente de que ilustradores não são artífices do texto, mas parceiros criativos indispensáveis na construção de universos imaginários. Quando uma obra literária também ganha um rosto, um contorno, uma sombra precisa, ela deixa de ser apenas lida. Passa a ser vista, lembrada, sonhada. E, por isso, eterna.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <ProductsComponent />
                    </section>
                </main>

            ) : (

                <main className="px-4 py-8">
                    <section className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-center pb-6">EXPOSIÇÃO 🐇❤️ ALICE NO PAÍS DAS MARAVILHAS</h1>
                        <div>
                            <div className="flex flex-col gap-8">
                                <div>
                                    <Image
                                        src="https://darkside.vtexassets.com/assets/vtex.file-manager-graphql/images/72541eac-bdb7-4fad-a74c-062a0a5a0445___b949680d10d6c51d40b944511e9dbaac.jpg"
                                        alt="Lewis Carroll"
                                        width={918}
                                        height={1080}
                                        className="w-[100%] h-[100%]"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 text-lg">
                                    <p>Sir John Tenniel eternizou Alice. Com traço preciso e imaginação vívida, o artista britânico deu rosto e corpo ao universo de fantasia criado por Lewis Carroll, materializando palavras e mudando para sempre a forma como lemos com os olhos. Suas ilustrações para Alice no País das Maravilhas (1865) e Alice Através do Espelho (1871) moldaram o imaginário coletivo, e dessa parceria criativa nasceu um fenômeno cultural que fundiu texto e imagem em uma unidade inseparável.</p>
                                    <p>Conhecido por seu trabalho satírico na revista Punch e por suas ilustrações do poema “O Corvo”, de Edgar Allan Poe, e das fábulas de Esopo, Tenniel foi o ilustrador escolhido pelo autor para dar vida às suas obras-primas. Tenniel construiu o reino de Alice com ilustrações que, de maneira consistente, deram carne e osso, textura e expressão aos personagens. Foi ele quem moldou, de forma definitiva, os rostos e os gestos do Coelho Branco de olhar aflito, da severa Rainha de Copas, do Gato de Cheshire se esgueirando entre o visível e o invisível, da Lagarta altiva sobre o cogumelo, do Chapeleiro Maluco no auge do nonsense. Seu traço deu corpo às surpresas, aos encantos e aos terrores daquele mundo subterrâneo, tornando-os ainda mais vibrantes, irônicos e inesquecíveis.</p>
                                    <p>A força de sua arte reside na coerência visual com a lógica onírica e caprichosa do texto. Suas imagens convidam o leitor a adentrar o mundo invertido de Carroll com um pé na realidade vitoriana e outro na fábula mais delirante. Suas gravuras refinadas e de extraordinária precisão técnica criaram uma iconografia duradoura, capaz de atravessar séculos e permanecer viva na memória afetiva de gerações de leitores.</p>
                                    <p>Ilustrar, para Tenniel, era entrar em um diálogo íntimo com o autor por meio de uma via colaborativa. Era interpretar códigos, decifrar atmosferas, captar o ritmo interno da narrativa e oferecer ao leitor uma lente visual poderosa pela qual a história se revelava ainda mais vívida, estranha e encantadora.</p>
                                    <p>Tenniel permanece, assim, um dos grandes nomes da história da ilustração literária, e seu trabalho em Alice é um lembrete contundente de que ilustradores não são artífices do texto, mas parceiros criativos indispensáveis na construção de universos imaginários. Quando uma obra literária também ganha um rosto, um contorno, uma sombra precisa, ela deixa de ser apenas lida. Passa a ser vista, lembrada, sonhada. E, por isso, eterna.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <ProductsComponent />
                    </section>
                </main>
            )}
        </div>
    );
}