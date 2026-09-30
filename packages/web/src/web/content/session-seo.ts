// Títulos para o Google e perguntas frequentes de cada página de sessão.
// Tudo o que aqui está vem da brochura "Pacotes e Informações 2024" e das
// páginas do site; os preços "desde" têm de acompanhar content/packages.ts.
// As perguntas aparecem na página (e em dados estruturados FAQPage), por isso
// são também o que os motores de pesquisa e as IAs citam.

import type { SessionType } from "./packages";

export interface Qa {
  q: string;
  a: string;
}

interface SessionSeoCopy {
  /** <title> sem a marca: serviço + sítio, que é o que as pessoas pesquisam. */
  title: string;
  description: string;
  faq: Qa[];
}

const PAYMENT_PT =
  "Na reserva paga-se 50% do pacote e os restantes 50% no dia da sessão, em numerário, transferência bancária ou MB WAY.";
const PAYMENT_EN =
  "You pay 50% of the package when booking and the other 50% on the day, by cash, bank transfer or MB WAY.";

export const SESSION_SEO: Record<SessionType, { pt: SessionSeoCopy; en: SessionSeoCopy }> = {
  maternity: {
    pt: {
      title: "Fotografia de Grávida em Albufeira, Algarve",
      description:
        "Sessão fotográfica de grávida no estúdio em Albufeira ou ao pôr do sol no Algarve, entre as 29 e as 35 semanas. Pacotes desde 150 €.",
      faq: [
        {
          q: "Quando devo fazer a sessão de grávida?",
          a: "Recomendo entre as 29 e as 35 semanas de gestação: a barriga já está proeminente e bonita, mas a mamã ainda não se sente muito desconfortável ou cansada.",
        },
        {
          q: "A sessão é em estúdio ou no exterior?",
          a: "Pode ser no estúdio em Ferreiras, Albufeira, num ambiente mais intimista, ou no exterior — praia, campo ou cidade no Algarve. Também podemos juntar os dois. No exterior a sessão começa 1 hora antes do pôr do sol, pela luz do final do dia.",
        },
        {
          q: "O pai e os irmãos podem participar?",
          a: "Sim. A sessão gira em torno da mamã, mas o papá e os irmãos estão convidados.",
        },
        {
          q: "O que devo vestir?",
          a: "Aconselho o que levar para cada ambiente e o estúdio tem um guarda-roupa de grávida com peças que pode usar na sessão.",
        },
        {
          q: "Quanto custa uma sessão de grávida?",
          a: `Os pacotes começam nos 150 € (Mini, 15 imagens editadas), seguem-se o Deluxe (250 €, 25 imagens e 10 impressões) e o VIP (300 €, todas as imagens editadas, slideshow e 15 impressões). ${PAYMENT_PT}`,
        },
        {
          q: "Posso juntar a sessão de grávida com a sessão newborn?",
          a: "Sim. Ao reservar as duas sessões em conjunto (Barriga + Bebé) têm 50 € de desconto sobre o valor total.",
        },
      ],
    },
    en: {
      title: "Maternity Photographer in Albufeira, Algarve",
      description:
        "Maternity photo session in the Albufeira studio or at sunset on the Algarve coast, between 29 and 35 weeks. Packages from €150.",
      faq: [
        {
          q: "When should I have my maternity session?",
          a: "I recommend between 29 and 35 weeks: the bump is already round and beautiful, but you are not yet too uncomfortable or tired.",
        },
        {
          q: "Is the session in the studio or outdoors?",
          a: "Either in the studio in Ferreiras, Albufeira, for a more intimate feel, or outdoors on an Algarve beach, in the countryside or in town. We can also do both. Outdoor sessions start 1 hour before sunset, for the evening light.",
        },
        {
          q: "Can my partner and children join?",
          a: "Yes. The session is centred on the mum-to-be, but partners and siblings are welcome.",
        },
        {
          q: "What should I wear?",
          a: "I will advise on what to bring for each setting, and the studio has a maternity wardrobe with pieces you can wear during the session.",
        },
        {
          q: "How much does a maternity session cost?",
          a: `Packages start at €150 (Mini, 15 edited images), then Deluxe (€250, 25 images and 10 prints) and VIP (€300, every edited image, a slideshow and 15 prints). ${PAYMENT_EN}`,
        },
        {
          q: "Can I combine the maternity and newborn sessions?",
          a: "Yes. Book both together (Bump + Baby) and get €50 off the total.",
        },
      ],
    },
  },

  newborn: {
    pt: {
      title: "Fotografia Newborn em Albufeira, Algarve",
      description:
        "Fotografia de recém-nascido nos primeiros 14 dias, num estúdio aquecido em Albufeira, com uma fotógrafa que foi enfermeira. Sessões baby-led, desde 180 €.",
      faq: [
        {
          q: "Quando se faz a sessão newborn?",
          a: "De preferência nas duas primeiras semanas de vida, quando o bebé está mais sonolento e se deixa aconchegar nas poses. Marquem ainda durante a gravidez: reservo para a data prevista do parto e acertamos o dia depois do nascimento.",
        },
        {
          q: "É seguro fotografar um recém-nascido?",
          a: "Fui enfermeira durante vários anos antes de me dedicar à fotografia a tempo inteiro. Na sessão quem comanda é o bebé: sigo o ritmo dele, com pausas para mamar, mudar a fralda e acalmar, num estúdio aquecido e preparado com antecedência.",
        },
        {
          q: "Quanto tempo dura a sessão?",
          a: "Cerca de 3 a 4 horas, seja qual for o pacote. Não há pressa: o tempo é o do bebé.",
        },
        {
          q: "Onde é feita a sessão e o que tenho de levar?",
          a: "No estúdio em Ferreiras, Albufeira, com estacionamento fácil. Tenho mantas, caixas, roupinhas e bandoletes em várias cores; antes da sessão recebem por email as indicações do que levar e um questionário para preparar os cenários.",
        },
        {
          q: "Quanto custa uma sessão newborn?",
          a: `Os pacotes começam nos 180 € (Prata, 8 imagens editadas), seguem-se o Ouro (250 €, 15 imagens e 10 impressões) e o Diamante (370 €, todas as imagens editadas, slideshow, 15 impressões e um vale de 20 € para a sessão de bebé). ${PAYMENT_PT}`,
        },
        {
          q: "Quando recebo as fotografias?",
          a: "Depois da sessão marcamos uma reunião online para verem o slideshow e escolherem as imagens. A galeria online é entregue em até 2 meses, ou em 3 dias úteis com a taxa de urgência de 100 €.",
        },
      ],
    },
    en: {
      title: "Newborn Photographer in Albufeira, Algarve",
      description:
        "Newborn photography in the first 14 days, in a warm studio in Albufeira, with a photographer who worked as a nurse. Baby-led sessions from €180.",
      faq: [
        {
          q: "When does the newborn session take place?",
          a: "Ideally in the first two weeks, when babies are sleepiest and settle easily into poses. Book during pregnancy: I reserve your due date and we set the day once your baby is born.",
        },
        {
          q: "Is newborn photography safe?",
          a: "I worked as a nurse for several years before turning to photography full time. The baby is in charge: I follow their rhythm, with breaks to feed, change and settle, in a warm studio prepared in advance.",
        },
        {
          q: "How long is the session?",
          a: "About 3 to 4 hours, whatever the package. There is no rush: we go at the baby's pace.",
        },
        {
          q: "Where is it and what do I need to bring?",
          a: "At the studio in Ferreiras, Albufeira, with easy parking. I have wraps, baskets, outfits and headbands in many colours; before the session you get an email with what to bring and a short questionnaire so I can prepare the sets.",
        },
        {
          q: "How much does a newborn session cost?",
          a: `Packages start at €180 (Prata, 8 edited images), then Ouro (€250, 15 images and 10 prints) and Diamante (€370, every edited image, a slideshow, 15 prints and a €20 voucher for the baby session). ${PAYMENT_EN}`,
        },
        {
          q: "When will I receive the photos?",
          a: "After the session we meet online to watch the slideshow and choose your images. The online gallery is delivered within 2 months, or within 3 working days for a €100 rush fee.",
        },
      ],
    },
  },

  baby: {
    pt: {
      title: "Fotografia de Bebé em Albufeira, Algarve",
      description:
        "Sessões de bebé no estúdio em Albufeira para registar cada fase do primeiro ano, com a família incluída. Cerca de 1 hora. Pacotes desde 150 €.",
      faq: [
        {
          q: "Com que idade devo fazer a sessão de bebé?",
          a: "Todas as fases do primeiro ano merecem ser registadas — o beicinho, o sorriso desdentado, os primeiros abraços. Muitas famílias fazem esta sessão entre os 7 e os 10 meses, entre a sessão newborn e o smash the cake.",
        },
        {
          q: "Quanto tempo dura e onde é?",
          a: "Cerca de 1 hora, no estúdio em Ferreiras, Albufeira, marcada para uma hora que não colida com a sesta do bebé.",
        },
        {
          q: "Os pais e os irmãos também ficam nas fotografias?",
          a: "Sim. Fotografo o bebé e também a vossa família.",
        },
        {
          q: "Que roupa devemos levar?",
          a: "O estúdio tem roupinhas de vários tamanhos para o bebé. Para pais e irmãos aconselho tons neutros, branco ou jeans; as cores das fotografias só do bebé escolhemos em conjunto.",
        },
        {
          q: "Quanto custa uma sessão de bebé?",
          a: `Os pacotes começam nos 150 € (Pacote 1, 10 imagens editadas), seguem-se o Pacote 2 (230 €, 20 imagens e 10 impressões) e o Pacote 3 (300 €, todas as imagens editadas, slideshow e 15 impressões). ${PAYMENT_PT}`,
        },
        {
          q: "Posso acompanhar todo o primeiro ano?",
          a: "Sim, é essa a ideia do 9 Meses: da barriga ao primeiro aninho, com a mesma fotógrafa. O pacote Diamante da sessão newborn já inclui um vale de 20 € para a sessão de bebé.",
        },
      ],
    },
    en: {
      title: "Baby Photographer in Albufeira, Algarve",
      description:
        "Baby photo sessions in the Albufeira studio to capture each stage of the first year, family included. About 1 hour. Packages from €150.",
      faq: [
        {
          q: "At what age should we book the baby session?",
          a: "Every stage of the first year is worth capturing: the pout, the gummy smile, the first real hugs. Many families book it between 7 and 10 months, between the newborn session and the cake smash.",
        },
        {
          q: "How long is it and where?",
          a: "About 1 hour, at the studio in Ferreiras, Albufeira, booked for a time that does not clash with your baby's nap.",
        },
        {
          q: "Can parents and siblings be in the photos?",
          a: "Yes. I photograph your baby and your family too.",
        },
        {
          q: "What should we wear?",
          a: "The studio has baby outfits in several sizes. For parents and siblings I suggest neutral tones, white or denim; we choose the colours for the baby's solo photos together.",
        },
        {
          q: "How much does a baby session cost?",
          a: `Packages start at €150 (Pacote 1, 10 edited images), then Pacote 2 (€230, 20 images and 10 prints) and Pacote 3 (€300, every edited image, a slideshow and 15 prints). ${PAYMENT_EN}`,
        },
        {
          q: "Can you follow our baby's whole first year?",
          a: "Yes, that is the idea behind 9 Meses: from the bump to the first birthday with the same photographer. The newborn Diamante package already includes a €20 voucher for the baby session.",
        },
      ],
    },
  },

  smash: {
    pt: {
      title: "Smash the Cake em Albufeira, Algarve",
      description:
        "Sessão smash the cake para o primeiro aniversário, com bolo incluído, em estúdio em Albufeira ou no exterior no Algarve. Cerca de 1 hora. Desde 150 €.",
      faq: [
        {
          q: "O que é uma sessão smash the cake?",
          a: "É a sessão do primeiro aniversário: com esta idade o bebé quer explorar tudo, e o bolo é a melhor forma de o manter no cenário. Começo por fotografar a família, depois só o bebé, e no fim vem o smash the cake.",
        },
        {
          q: "O bolo está incluído?",
          a: "Sim, o bolo está incluído em todos os pacotes de smash the cake.",
        },
        {
          q: "É em estúdio ou no exterior?",
          a: "Como preferirem, e conforme o tempo. Em estúdio marco para uma hora que não colida com a sesta do bebé; no exterior a sessão é 1 hora antes do pôr do sol.",
        },
        {
          q: "Quanto tempo dura?",
          a: "Cerca de 1 hora, seja qual for o pacote.",
        },
        {
          q: "Quanto custa uma sessão smash the cake?",
          a: `Os pacotes começam nos 150 € (XS, 10 imagens editadas e bolo), seguem-se o M (250 €, 20 imagens, bolo e 10 impressões) e o L (340 €, todas as imagens editadas, bolo, slideshow, 15 impressões e um vale de 20 € para uma sessão de família). ${PAYMENT_PT}`,
        },
        {
          q: "E se o bebé não quiser mexer no bolo?",
          a: "Acontece e faz parte: alguns comem o bolo, outros nem por isso, uns ficam todos sujos e outros provam só com a colher. Todas as reações dão boas fotografias.",
        },
      ],
    },
    en: {
      title: "Cake Smash Photographer in Albufeira, Algarve",
      description:
        "Cake smash session for the first birthday, cake included, in the Albufeira studio or outdoors in the Algarve. About 1 hour. From €150.",
      faq: [
        {
          q: "What is a cake smash session?",
          a: "It is the first-birthday session: at this age babies want to explore everything, and the cake is the best way to keep them on set. I start with the whole family, then the baby alone, and the cake smash comes last.",
        },
        {
          q: "Is the cake included?",
          a: "Yes, the cake is included in every cake smash package.",
        },
        {
          q: "Studio or outdoors?",
          a: "Whichever you prefer, weather permitting. In the studio I book around your baby's nap; outdoor sessions are 1 hour before sunset.",
        },
        {
          q: "How long does it last?",
          a: "About 1 hour, whatever the package.",
        },
        {
          q: "How much does a cake smash session cost?",
          a: `Packages start at €150 (XS, 10 edited images and the cake), then M (€250, 20 images, cake and 10 prints) and L (€340, every edited image, cake, a slideshow, 15 prints and a €20 voucher for a family session). ${PAYMENT_EN}`,
        },
        {
          q: "What if my baby won't touch the cake?",
          a: "It happens, and it is part of the fun: some eat it, some don't, some end up covered and some only try it with a spoon. Every reaction makes good photos.",
        },
      ],
    },
  },

  family: {
    pt: {
      title: "Fotografia de Família no Algarve, Albufeira",
      description:
        "Sessões fotográficas de família ao pôr do sol na praia, no campo ou na cidade, no Algarve, com uma fotógrafa de Albufeira que vos guia. Desde 150 €.",
      faq: [
        {
          q: "Onde é feita a sessão de família?",
          a: "No exterior, no Algarve: praia, campo, cidade ou um pouco de cada. Se precisarem, ajudo a escolher o sítio.",
        },
        {
          q: "A que horas começa a sessão?",
          a: "1 hora antes do pôr do sol, para aproveitarmos a luz bonita do final do dia.",
        },
        {
          q: "Nunca fizemos uma sessão. E se não soubermos posar?",
          a: "Não se preocupem: guio-vos em como se posicionarem e no que fazer. A ideia é divertirem-se e criarmos memórias juntos.",
        },
        {
          q: "O que devemos vestir?",
          a: "Dou-vos a minha opinião sobre o que vestir e as cores que funcionam melhor em cada ambiente.",
        },
        {
          q: "Estamos de férias no Algarve. Podemos marcar?",
          a: "Sim. Enviem as datas em que vão estar cá pelo formulário ou pelo WhatsApp e marcamos a sessão para uma dessas tardes.",
        },
        {
          q: "Quanto custa uma sessão de família?",
          a: `Os pacotes começam nos 150 € (Essencial, 15 imagens editadas), seguem-se o Medium (250 €, 25 imagens e 10 impressões) e o Completo (300 €, todas as imagens editadas, slideshow e 15 impressões). ${PAYMENT_PT}`,
        },
      ],
    },
    en: {
      title: "Family Photographer in Albufeira, Algarve",
      description:
        "Family photo sessions at sunset on the beach, in the countryside or in town in the Algarve, with an Albufeira photographer who guides you. From €150.",
      faq: [
        {
          q: "Where does the family session take place?",
          a: "Outdoors in the Algarve: a beach, the countryside, a town, or a bit of each. I am happy to help you choose the spot.",
        },
        {
          q: "What time does it start?",
          a: "1 hour before sunset, to make the most of the soft evening light.",
        },
        {
          q: "We have never had a photo session. What if we don't know how to pose?",
          a: "Don't worry: I will guide you on where to stand and what to do. The idea is to have fun and make memories together.",
        },
        {
          q: "What should we wear?",
          a: "I will give you my advice on what to wear and which colours work best in each setting.",
        },
        {
          q: "We are on holiday in the Algarve. Can we book?",
          a: "Yes. Send the dates you will be here through the form or WhatsApp and we will book the session for one of those evenings.",
        },
        {
          q: "How much does a family session cost?",
          a: `Packages start at €150 (Essencial, 15 edited images), then Medium (€250, 25 images and 10 prints) and Completo (€300, every edited image, a slideshow and 15 prints). ${PAYMENT_EN}`,
        },
      ],
    },
  },
};
