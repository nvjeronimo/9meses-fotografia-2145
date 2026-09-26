/**
 * PT/EN site dictionary. These are the defaults shipped with the site —
 * the admin panel can override any key (stored in `content_entries`).
 */

export type Language = "pt" | "en";

export const translations = {
  pt: {
    // Navigation
    "nav.home": "INÍCIO",
    "nav.about": "SOBRE",
    "nav.studio": "ESTÚDIO",
    "nav.sessions": "SESSÕES",
    "nav.packages": "PACOTES",
    "nav.gallery": "GALERIA",
    "nav.faq": "FAQ",
    "nav.contact": "CONTACTO",

    // Session types
    "session.maternity": "Maternidade",
    "session.newborn": "Newborn",
    "session.baby": "Bebé",
    "session.family": "Família",
    "session.smash": "Smash the Cake",

    // Home page
    "home.hero.eyebrow": "ESTÚDIO FOTOGRAFIA, ALGARVE",
    "home.hero.title": "Escrevemos com luz a vossa história",
    "home.hero.subtitle":
      "Fotografia de maternidade, newborn, bebé e família em Portugal",
    "home.hero.cta": "CONHECER SESSÕES",
    "home.welcome.label": "BEM-VINDOS",
    "home.welcome.text":
      "Cada sessão é uma história única, contada através da luz e da emoção. Capturo os momentos mais preciosos da vossa vida, transformando-os em memórias eternas.",
    "home.about.label": "A MINHA HISTÓRIA",
    "home.about.title": "Olá, sou a Tânia",
    "home.about.text":
      "Fotógrafa desde 2012, apaixonada por capturar a essência de cada momento. Antiga enfermeira, dedico-me a tempo inteiro à fotografia desde 2017.",
    "home.about.cta": "CONHECER-ME MELHOR",
    "home.sessions.label": "DESCUBRA OS NOSSOS SERVIÇOS",
    "home.sessions.title": "Sessões",
    "home.cta.eyebrow": "VAMOS COMEÇAR",
    "home.cta.title": "Vamos criar memórias juntos?",
    "home.cta.subtitle":
      "Conte-nos o que gostaria de fotografar e a data que tem em mente. Respondemos com as datas disponíveis e todos os detalhes da sessão.",
    "home.cta.button": "MARCAR SESSÃO",
    "home.cta.whatsapp": "FALAR POR WHATSAPP",
    "home.cta.note": "ESTÚDIO FOTOGRAFIA, ALGARVE",
    "home.gallery.label": "GALERIA",
    "home.gallery.title": "Momentos Capturados",
    "home.gallery.loadMore": "CARREGAR MAIS",
    "home.gallery.viewAll": "VER GALERIA COMPLETA",
    "home.testimonials.label": "TESTEMUNHOS",
    "home.testimonials.title": "O que dizem de nós",

    // About page
    "about.hero.label": "A MINHA HISTÓRIA",
    "about.hero.title": "Sobre Mim",
    "about.intro": "Sou a Tânia, e registo as vossas memórias desde 2012.",
    "about.p1":
      "O gosto pela fotografia está desde sempre enraizado na nossa família, mas tudo realmente começou com o nascimento da minha filha mais velha.",
    "about.p2":
      "Fui enfermeira durante vários anos, mas em 2017 decidi abraçar esta minha paixão a tempo inteiro e foi a melhor decisão que tomei até hoje!",
    "about.p3":
      "Amo os meus filhos e a minha família, adoro viajar e um dia gostava de percorrer o Mundo.",
    "about.philosophy.title": "A minha filosofia",
    "about.philosophy.text":
      "Adoro a espontaneidade, a simplicidade do momento e a emoção no seu estado mais puro! Para mim, o menos é mais e tudo se resume ao vosso amor!",
    "about.quote":
      "Por vezes as pequenas coisas são as que ocupam mais espaço no nosso coração",
    "about.signature": "com amor, Tânia",
    "about.gallery.label": "NÓS, EM 2022",
    "about.gallery.title": "A Minha Família",
    "about.studioCta.label": "FERREIRAS, ALBUFEIRA",
    "about.studioCta.title": "Conheça o Nosso Estúdio",
    "about.studioCta.description":
      "Venha conhecer o espaço onde criamos memórias. Um ambiente acolhedor e pensado para vos receber com todo o conforto.",
    "about.studioCta.button": "VISITAR ESTÚDIO",
    "about.sessionsCta.label": "O QUE FOTOGRAFAMOS",
    "about.sessionsCta.title": "Explore as Nossas Sessões",
    "about.sessionsCta.description":
      "Descubra os diferentes tipos de sessões que oferecemos. Cada uma pensada para capturar os momentos mais especiais da sua vida.",
    "about.sessionsCta.button": "VER SESSÕES",

    // Studio page
    "studio.hero.label": "LOCALIZADO NAS FERREIRAS, PORTUGAL",
    "studio.hero.title": "O Estúdio",
    "studio.intro.title": "Um espaço pensado para vos receber",
    "studio.intro.text":
      "O meu estúdio está localizado nas Ferreiras. De fácil acesso e estacionamento, onde tenho todas as condições para vos receber de forma confortável.",
    "studio.amenities.title": "Comodidades",
    "studio.amenity1": "Café, água e snacks",
    "studio.amenity2": "TV e internet",
    "studio.amenity3": "Brinquedos para as crianças",
    "studio.amenity4": "Guarda-roupa para futuras mamãs",
    "studio.amenity5": "Mantas, caixas, roupas e bandoletes",
    "studio.quote":
      "Sejam bem-vindos à casa da 9 Meses, espero que se sintam bem neste meu cantinho.",
    "studio.aboutCta.label": "A FOTÓGRAFA",
    "studio.aboutCta.title": "Conheça a Minha História",
    "studio.aboutCta.description":
      "Descubra mais sobre mim, minha paixão pela fotografia e a filosofia por trás de cada sessão.",
    "studio.aboutCta.button": "SOBRE MIM",
    "studio.sessionsCta.label": "O QUE FOTOGRAFAMOS",
    "studio.sessionsCta.title": "Explore as Nossas Sessões",
    "studio.sessionsCta.description":
      "Descubra os diferentes tipos de sessões que oferecemos. Cada uma pensada para capturar os momentos mais especiais da sua vida.",
    "studio.sessionsCta.button": "VER SESSÕES",

    // Sessions overview
    "sessions.hero.label": "OS NOSSOS SERVIÇOS",
    "sessions.hero.title": "Sessões",
    "sessions.hero.subtitle":
      "Cada fase merece ser lembrada. Escolha a sessão que conta a vossa história.",
    "sessions.viewSession": "VER SESSÃO",
    "sessions.viewAll": "VER TODAS AS SESSÕES",
    "sessions.others": "Outras sessões",
    "sessions.prepareLink": "Como preparar esta sessão",

    "sessions.maternity.title": "Fotografia de Maternidade",
    "sessions.maternity.timing": "29-35 semanas",
    "sessions.maternity.desc":
      "Celebre este momento único da sua vida. Sessões realizadas entre as 29 e 35 semanas de gestação, em estúdio ou exterior, capturando a beleza e a emoção desta fase especial.",
    "sessions.maternity.body1":
      "Celebre este momento único da sua vida. As sessões de maternidade são realizadas entre as 29 e 35 semanas de gestação, quando a barriga está no seu auge e ainda se sente confortável para a sessão.",
    "sessions.maternity.body2":
      "Pode escolher realizar a sessão em estúdio, onde temos um ambiente controlado e acolhedor, ou ao ar livre, aproveitando a luz natural e cenários únicos. Tenho um guarda-roupa disponível com vestidos e tecidos elegantes para a sessão.",

    "sessions.newborn.title": "Fotografia Newborn",
    "sessions.newborn.timing": "Primeiras 2 semanas",
    "sessions.newborn.desc":
      "Sessões delicadas e tranquilas, realizadas nos primeiros 14 dias de vida do bebé. Sessões baby-led, respeitando o ritmo do bebé, com duração de 3-4 horas.",
    "sessions.newborn.body1":
      "As sessões newborn são realizadas idealmente nos primeiros 14 dias de vida do bebé, quando ainda mantêm a flexibilidade e o sono profundo característicos dos recém-nascidos.",
    "sessions.newborn.body2":
      "São sessões baby-led, ou seja, respeitamos completamente o ritmo do bebé. Com duração de 3 a 4 horas, temos tempo para pausas para alimentação, mudança de fralda e conforto. O estúdio é mantido aquecido para o conforto do bebé, e tenho uma vasta coleção de adereços, mantas e acessórios delicados.",

    "sessions.baby.title": "Fotografia de Bebé",
    "sessions.baby.timing": "Fases de crescimento",
    "sessions.baby.desc":
      "Acompanhe o crescimento do seu bebé através de sessões fotográficas que capturam cada marco importante do primeiro ano de vida.",
    "sessions.baby.body1":
      "As sessões de bebé são perfeitas para registar os marcos importantes do crescimento do seu filho. Desde o primeiro mês até ao primeiro ano, cada fase é especial e merece ser capturada.",
    "sessions.baby.body2":
      "Esta sessão é feita em estúdio, numa hora que não colida com a sesta do vosso bebé, e dura aproximadamente 1 hora. Fotografo o bebé e também a família, e no estúdio há roupinhas de vários tamanhos que podem ser usadas.",

    "sessions.family.title": "Fotografia de Família",
    "sessions.family.timing":
      "Exterior, ao pôr do sol",
    "sessions.family.desc":
      "Sessões ao ar livre, a começar 1 hora antes do pôr do sol — praia, campo ou cidade — para captar a ligação e o amor da vossa família.",
    "sessions.family.body1":
      "As sessões de família são uma excelente forma de registar os momentos especiais com as pessoas que mais amamos: os sorrisos, os abraços, os olhares marotos.",
    "sessions.family.body2":
      "A sessão começa 1 hora antes do pôr do sol, quando a luz é mais suave e dourada. Pode ser na praia, no campo, na cidade ou um pouco de tudo, e ajudo-vos a escolher o local e o que vestir.",

    "sessions.smash.title": "Smash the Cake",
    "sessions.smash.timing": "Primeiro aniversário",
    "sessions.smash.desc":
      "Celebre o primeiro aniversário com uma sessão divertida e memorável. Bolo incluído no pacote.",
    "sessions.smash.body1":
      "O Smash the Cake é uma sessão divertida e memorável para celebrar o primeiro aniversário do seu bebé. É uma oportunidade perfeita para capturar a personalidade e a alegria do seu filho enquanto ele explora e brinca com o bolo.",
    "sessions.smash.body2":
      "O bolo está incluído em todos os pacotes. A sessão dura aproximadamente 1 hora: primeiro fotografo toda a família, depois só o bebé, e no fim vem o bolo. Pode ser em estúdio ou no exterior, ao pôr do sol.",

    // Packages
    "packages.title": "Pacotes",
    "packages.subtitle": "Escolha o pacote ideal para a sua sessão",
    "packages.maternity.title": "Maternidade",
    "packages.newborn.title": "Newborn",
    "packages.baby.title": "Bebé",
    "packages.family.title": "Família",
    "packages.smash.title": "Smash the Cake",
    "packages.from": "Desde",
    "packages.cta": "RESERVAR",
    "packages.extras":
      "Extras disponíveis: impressões, telas, imagens adicionais",
    "packages.package": "Pacote",
    "packages.extras.link": "Ver extras, impressões, telas e condições de pagamento",
    "packages.note.studioOutdoor":
      "Sessão em estúdio + exterior: acresce 50€ a qualquer um dos pacotes.",
    "packages.note.bundle":
      "Na reserva de uma sessão de maternidade e newborn, têm um desconto de 50€ sobre o valor total.",
    "packages.note.balloons":
      "Em qualquer um dos pacotes, é possível adicionar uma grinalda de balões por mais 50€.",
    "packages.extras.title": "Extras",
    "packages.extras.photos": "Fotografia digital extra em alta resolução",
    "packages.extras.prints": "Impressões",
    "packages.extras.canvas": "Telas",
    "packages.extras.each": "cada",
    "packages.extras.print": "Impressão",
    "packages.extras.canvasOne": "Tela",
    "packages.terms.title": "Reserva e pagamento",
    "packages.terms.1":
      "O pagamento é feito em duas vezes: 50% na reserva e 50% no dia da sessão.",
    "packages.terms.2": "Numerário, transferência bancária ou MB WAY (sem multibanco).",
    "packages.terms.3":
      "Depois de verem o slideshow, podem fazer upgrade de pacote ou juntar imagens e produtos extra.",
    "packages.terms.4":
      "Galeria em 3 dias úteis, mediante taxa de urgência de 100€ (sujeito a disponibilidade).",
    "packages.terms.5": "O valor da reserva não é reembolsável em caso de desistência.",

    // Brochure
    "brochure.label": "CATÁLOGO",
    "brochure.title": "Brochura 9 Meses",
    "brochure.text":
      "Todos os pacotes, preços, condições e exemplos de trabalho num só documento. Consulte online ou guarde no seu dispositivo.",
    "brochure.view": "VER BROCHURA",
    "brochure.download": "DESCARREGAR PDF",
    "brochure.meta": "PDF · 55 páginas",

    // Gallery
    "gallery.hero.label": "PORTFÓLIO",
    "gallery.hero.title": "Galeria",
    "gallery.hero.subtitle":
      "Uma seleção de momentos captados no estúdio e ao ar livre.",
    "gallery.filter.all": "TODAS",
    "gallery.empty": "Novas imagens em breve.",

    // FAQ
    "faq.title": "Perguntas Frequentes",
    "faq.subtitle": "Tudo o que precisa saber",
    "faq.q1": "Como funciona o pagamento?",
    "faq.a1":
      "O pagamento é feito em duas vezes: 50% na reserva e 50% no dia da sessão. Aceitamos numerário, transferência bancária ou MB WAY.",
    "faq.q2": "Qual a validade dos vouchers?",
    "faq.a2": "Os vouchers têm validade de 6 meses após a sua aquisição.",
    "faq.q3": "E se precisar remarcar a sessão?",
    "faq.a3":
      "Se por motivo de doença ou acidente for necessário remarcar, não há qualquer custo extra; o mesmo acontece se uma sessão no exterior tiver de ser adiada pelo tempo. A nova data é acordada conforme a disponibilidade da agenda. Faltar sem aviso prévio implica uma nova reserva.",
    "faq.q4": "Posso usar as imagens comercialmente?",
    "faq.a4":
      "Todas as imagens estão protegidas por direitos de autor e destinam-se a uso pessoal; o uso comercial ou publicitário precisa da aprovação da fotógrafa. A publicação das vossas imagens pelo estúdio depende sempre do vosso consentimento.",
    "faq.q5": "Qual o prazo de entrega?",
    "faq.a5":
      "O prazo de entrega da galeria é de 2 meses (se houver alterações, serão avisados). Antes disso marcamos uma reunião online para verem o slideshow e escolherem as imagens. Existe também entrega em 3 dias úteis, com taxa de urgência de 100€.",
    "faq.q6": "O valor da reserva é reembolsável?",
    "faq.a6":
      "O valor da reserva (50% do pacote) não é reembolsável em caso de desistência. Em caso de doença, acidente ou mau tempo, a sessão é remarcada sem custos.",

    // Contact
    "contact.title": "Contacto",
    "a11y.skip": "Saltar para o conteúdo",
    "gallery.open": "Ampliar fotografia",
    "contact.package.chosen": "Pacote escolhido",
    "contact.package.remove": "Remover pacote",
    "contact.dueDate.maternity": "Data prevista do parto",
    "contact.dueDate.newborn": "Data de nascimento (ou prevista)",
    "contact.dueDate.maternity.help": "O ideal é fotografar entre as 29 e as 35 semanas.",
    "contact.dueDate.newborn.help":
      "As sessões newborn fazem-se nas primeiras 2 semanas de vida.",
    "contact.optional": "opcional",
    "contact.form.promise": "Sem compromisso. Respondo pessoalmente a cada mensagem.",
    "contact.error.whatsapp": "Ou fale comigo diretamente pelo WhatsApp",
    "contact.whatsapp.withPackage": "Olá! Gostaria de saber mais sobre a sessão {session}.",
    "contact.subtitle": "Vamos conversar sobre a vossa sessão",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.phone": "Telefone",
    "contact.session": "Sessão de Interesse",
    "contact.familyMembers": "Número de Membros da Família",
    "contact.message": "Mensagem",
    "contact.send": "ENVIAR MENSAGEM",
    "contact.sending": "A ENVIAR...",
    "contact.success": "Mensagem enviada! Responderei o mais rápido possível.",
    "contact.error":
      "Não foi possível enviar a mensagem. Tente novamente ou escreva-me por email.",
    "contact.info": "Informações",
    "contact.address": "Morada",
    "contact.address.full":
      "Avenida 25 de Abril, Edif. Space Beautiful, Loja G, 8200-559 Ferreiras, Albufeira",
    "contact.instagram": "Instagram",
    "contact.select": "Selecione uma opção",

    // Footer
    "footer.tagline": "Fotografia de maternidade, newborn, bebé e família",
    "footer.nav": "NAVEGAÇÃO",
    "footer.sessions": "SESSÕES",
    "footer.contact": "CONTACTO",
    "footer.rights":
      "© {year} 9 Meses Fotografia. Todos os direitos reservados.",

    // Not found
    "notfound.title": "Página não encontrada",
    "notfound.text": "A página que procura não existe ou foi movida.",
    "notfound.cta": "VOLTAR AO INÍCIO",

    // Brand + a11y labels
    "brand.name": "9 Meses Fotografia",
    "nav.language": "Idioma",
    "nav.menu.toggle": "Abrir menu",
    "nav.menu.close": "Fechar menu",
    "nav.theme.toggle": "Alternar tema",
    "nav.contact.cta": "MARCAR SESSÃO",

    // Hero slideshow
    "hero.previous": "Imagem anterior",
    "hero.next": "Imagem seguinte",
    "hero.goTo": "Ir para a imagem",

    // Lightbox
    "lightbox.close": "Fechar",
    "lightbox.previous": "Anterior",
    "lightbox.next": "Seguinte",
    "lightbox.loading": "A carregar imagem...",
    "lightbox.hint": "Use as setas do teclado para navegar. ESC para fechar.",
    "lightbox.preloadFallback": "Pré-visualização indisponível",

    // Gallery filters
    "gallery.filter.label": "Filtrar por",
    "gallery.filter.maternity": "MATERNIDADE",
    "gallery.filter.newborn": "NEWBORN",
    "gallery.filter.baby": "BEBÉ",
    "gallery.filter.family": "FAMÍLIA",
    "gallery.filter.smash": "SMASH THE CAKE",
    "gallery.filter.studio": "ESTÚDIO",
    "gallery.filter.empty": "Ainda não há fotografias nesta categoria.",
    "gallery.filter.processing": "A carregar fotografias...",

    // Package tiers
    "packages.gold": "Gold",
    "packages.diamond": "Diamond",
    "packages.simple": "Simples",
    "packages.complete": "Completo",
    "packages.xs": "XS",
    "packages.l": "L",
    "sessions.smashTheCake": "Smash the Cake",

    // Contact details
    "contact.email.address": "info@9mesesfotografia.pt",
    "contact.social": "Redes sociais",
    "contact.instagram.handle": "@9mesesfotografia",
    "contact.instagram.url": "https://www.instagram.com/9mesesfotografia/",
    "contact.facebook": "Facebook",
    "contact.facebook.handle": "9 Meses Fotografia",
    "contact.facebook.url": "https://www.facebook.com/9mesesfotografia/",
    "contact.linkedin": "LinkedIn",
    "contact.linkedin.handle": "",
    "contact.linkedin.url": "",
    "contact.hours.label": "Horário",
    "contact.hours.value": "Segunda a Sexta, 10h — 19h (por marcação)",
    "contact.maps.cta": "VER DIREÇÕES",
    "contact.maps.destination": "Ferreiras, Albufeira, Portugal",
    "home.about.intro":
      "Registo memórias desde 2012, com luz natural e muito tempo para cada família.",
    // Navigation additions
    "nav.prepare": "PREPARAR",
    "nav.journal": "DIÁRIO",
    "nav.privacy": "Política de Privacidade",
    "nav.group.about": "ESTÚDIO",
    "nav.group.sessions": "SESSÕES",
    "nav.sessions.all": "TODAS AS SESSÕES",
    "nav.group.about.desc": "Quem somos e onde trabalhamos",
    "nav.group.sessions.desc": "Tipos de sessão, pacotes e preparação",
    "footer.complaints": "Livro de Reclamações",

    // Phone / WhatsApp
    "contact.phone.label": "Telefone",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsapp.aria": "Falar connosco pelo WhatsApp",
    "contact.whatsapp.cta": "ENVIAR MENSAGEM NO WHATSAPP",
    "contact.call.cta": "LIGAR AGORA",

    // Form additions
    "contact.form.date": "Data preferida",
    "contact.form.date.help":
      "Indicativa — confirmamos a disponibilidade por email.",
    "contact.form.consent":
      "Li e aceito a Política de Privacidade e autorizo o tratamento dos meus dados para responder a este pedido.",
    "contact.form.consent.link": "Política de Privacidade",
    "contact.form.consent.error":
      "É necessário aceitar a Política de Privacidade.",
    "contact.form.autoreply":
      "Enviámos-lhe um email de confirmação. Verifique também a pasta de spam.",
    "contact.form.ratelimit":
      "Recebemos já vários pedidos deste dispositivo. Tente novamente mais tarde ou escreva-nos diretamente por email.",

    // SEO
    "seo.home.title":
      "Fotografia de Maternidade, Recém-Nascido e Família em Albufeira",
    "seo.home.desc":
      "Estúdio de fotografia em Ferreiras, Albufeira. Sessões de maternidade, recém-nascido, bebé, família e smash the cake no Algarve. Marque a sua sessão.",
    "seo.about.title": "Sobre a Tânia",
    "seo.about.desc":
      "Conheça a fotógrafa por trás do 9 Meses Fotografia: mais de uma década a registar maternidade, recém-nascidos e famílias no Algarve.",
    "seo.studio.title": "O Estúdio em Ferreiras, Albufeira",
    "seo.studio.desc":
      "Um estúdio preparado para bebés e famílias, com luz natural, aquecimento, props e todo o conforto para sessões tranquilas.",
    "seo.sessions.title": "Sessões de Fotografia",
    "seo.sessions.desc":
      "Maternidade, recém-nascido, bebé, família e smash the cake. Saiba o que inclui cada sessão, a melhor altura e como se prepara.",
    "seo.packages.title": "Pacotes e Preços",
    "seo.packages.desc":
      "Pacotes de fotografia de maternidade, recém-nascido, bebé e família em Albufeira. Veja o que inclui cada pacote e peça orçamento.",
    "seo.gallery.title": "Galeria",
    "seo.gallery.desc":
      "Portfólio de fotografia de maternidade, recém-nascido, bebé e família realizado no estúdio em Ferreiras, Albufeira.",
    "seo.prepare.title": "Como Preparar a Sua Sessão",
    "seo.prepare.desc":
      "Tudo o que precisa de saber antes da sessão: o que vestir, o que trazer, a melhor hora do dia e como correm as sessões de recém-nascido.",
    "seo.journal.title": "Diário",
    "seo.journal.desc":
      "Histórias de sessões, dicas e novidades do estúdio 9 Meses Fotografia, em Albufeira.",
    "seo.faq.title": "Perguntas Frequentes",
    "seo.faq.desc":
      "Respostas às dúvidas mais comuns sobre marcações, duração das sessões, entrega das fotografias e pagamentos.",
    "seo.contact.title": "Contacto e Marcações",
    "seo.contact.desc":
      "Marque a sua sessão de fotografia em Ferreiras, Albufeira. Telefone, WhatsApp, email e formulário de marcação.",
    "seo.privacy.title": "Política de Privacidade",
    "seo.privacy.desc":
      "Como recolhemos, usamos e protegemos os seus dados pessoais, ao abrigo do RGPD.",

    // Prepare page
    "prepare.label": "ANTES DA SESSÃO",
    "prepare.title": "Como se prepara para a sessão",
    "prepare.subtitle":
      "Umas notas simples para que chegue ao estúdio descansada e o dia corra sem pressas.",
    "prepare.general.title": "Para todas as sessões",
    "prepare.general.1.title": "Chegue sem pressa",
    "prepare.general.1.text":
      "Reserve uns minutos extra para o estacionamento e para se instalar. Uma chegada calma nota-se nas fotografias.",
    "prepare.general.2.title": "Roupa simples e tons neutros",
    "prepare.general.2.text":
      "Bege, branco, cinza, tons de terra e verdes suaves fotografam sempre bem. Evite estampados fortes, logótipos e listas finas.",
    "prepare.general.3.title": "Traga o essencial",
    "prepare.general.3.text": "Fraldas, uma muda de roupa, a chupeta e algo de que o bebé goste. No estúdio há café, água e alguns snacks, TV e internet, e brinquedos para os mais pequenos.",
    "prepare.general.4.title": "Diga-nos o que quer",
    "prepare.general.4.text":
      "Se tem uma fotografia em mente, um objeto com valor sentimental ou alguém que deve aparecer, avise antes da sessão.",
    "prepare.maternity.title": "Sessão de maternidade",
    "prepare.newborn.title": "Sessão newborn",
    "prepare.baby.title": "Sessão de bebé",
    "prepare.family.title": "Sessão de família",
    "prepare.after.title": "Depois da sessão",
    "prepare.after.text":
      "Recebe uma galeria privada online para escolher as suas fotografias favoritas. A edição das imagens escolhidas é entregue em alta resolução, pronta para imprimir, e ficam guardadas em arquivo para futuras encomendas.",
    "prepare.sessions.title": "Sessão a sessão",
    "prepare.before": "Antes da sessão",
    "prepare.session": "A sessão",
    "prepare.day": "O dia da sessão",
    "prepare.maternity.before": "Recomendo fazer a sessão entre as 29 e as 35 semanas, quando a barriga já está proeminente e linda, mas a mamã ainda não se sente muito desconfortável ou cansada. A sessão gira em torno da mamã, mas o papá e os irmãos também estão convidados!\n\nNo exterior, a sessão começa 1 hora antes do pôr do sol, para captarmos a luz tão bonita do final do dia: praia, campo, cidade ou um pouco de tudo — ajudo-vos a escolher. Também pode ser em estúdio, num ambiente mais intimista, ou podem ter o melhor dos dois mundos e fazer exterior e estúdio.\n\nQuanto ao que vestir, aconselho o mais adequado para cada ambiente, e no estúdio há guarda-roupa de grávida com peças que podem usar.",
    "prepare.maternity.day": "Hoje é o dia da sessão! Procurem relaxar e fazer de conta que não estou ali. Se é a primeira vez que fazem uma sessão fotográfica, não se preocupem: ajudo-vos a posicionar e digo-vos o que fazer. A intenção é que se divirtam e que juntos possamos criar memórias!",
    "prepare.newborn.before": "A sessão newborn faz-se preferencialmente nas duas primeiras semanas do bebé, quando está mais sonolento e “maleável”, o que permite aquelas poses deliciosas.\n\nComo o tempo ideal é curto, é muito importante marcarem ainda durante a gravidez, para garantirem a vossa vaga — depois do nascimento, muitas vezes já não há espaço na agenda. Normalmente marco para a data provável do parto e, como a maioria dos bebés não nasce nesse dia, contactam-me assim que o bebé nascer para marcarmos a data definitiva.\n\nDepois da marcação recebem um questionário, para eu adequar a sessão ao máximo às vossas expectativas.",
    "prepare.newborn.day": "Antes da data marcada recebem por email as indicações para a sessão: o que fazer antes, o que levar e a localização do estúdio.\n\nA sessão dura aproximadamente 3 a 4 horas, independentemente do pacote. Quem “comanda” é o bebé — sigo literalmente o ritmo dele. Preparo os sets e os acessórios com antecedência, de acordo com as respostas ao questionário, mas se virem no estúdio algo de que gostem, posso trocar ou acrescentar.",
    "prepare.baby.before": "Todas as fases do bebé são dignas de ser registadas. Cada uma é única e há pequenas coisas que não voltam atrás: aquele beicinho, o sorriso desdentado, o cabelo desgrenhado, o abraço sentido aos papás, aquele beijinho…\n\nEsta sessão é feita em estúdio, e marco para uma hora que não colida com a sesta do vosso bebé.",
    "prepare.baby.day": "A sessão dura aproximadamente 1 hora, independentemente do pacote. Fotografo o bebé e também a vossa família!\n\nNo estúdio há roupinhas de diferentes tamanhos que podem ser usadas. Para os pais e irmãos aconselho tons neutros, branco ou jeans. Para as fotos do bebé sozinho, decidimos juntos que tons usar.",
    "prepare.family.before": "Nesta sessão quero captar os vossos sorrisos, os abraços, os olhares marotos… a ligação especial que existe entre vocês.\n\nA sessão começa 1 hora antes do pôr do sol, para captarmos a luz bonita do final do dia. Pode ser na praia, no campo, na cidade ou um pouco de tudo — ajudo-vos a escolher. Também vos dou a minha opinião sobre o que vestir e as cores que funcionam melhor em cada ambiente.",
    "prepare.family.day": "Hoje é o dia da sessão! Procurem relaxar e fazer de conta que não estou ali. Se é a primeira vez que fazem uma sessão fotográfica, não se preocupem: ajudo-vos a posicionar e digo-vos o que fazer. A intenção é que se divirtam e que juntos possamos criar memórias!",
    "prepare.smash.title": "Sessão Smash the Cake",
    "prepare.smash.before": "Passou 1 ano e é tempo de comemorar! Com esta idade o bebé é curioso e gosta de explorar tudo à sua volta, e o bolo é a melhor ferramenta para que fique no set. Uns comem o bolo, outros nem por isso, uns ficam todos sujos e outros só experimentam com a colher… Será certamente uma forma original de comemorar o primeiro aninho!\n\nPode ser no exterior ou em estúdio, conforme a vossa escolha e o tempo. Em estúdio marco para uma hora que não colida com a sesta; no exterior, a sessão começa 1 hora antes do pôr do sol.",
    "prepare.smash.day": "A sessão dura aproximadamente 1 hora, independentemente do pacote. Primeiro fotografo toda a família, depois só o bebé, e no fim vem o “Smash the Cake”.\n\nNo estúdio há roupinhas de diferentes tamanhos. Para os pais e irmãos aconselho tons neutros, branco ou jeans; para as fotos do bebé sozinho, decidimos juntos que tons usar.",
    "prepare.after.1": "A galeria é entregue em 2 meses. Se o prazo mudar, serão avisados com antecedência.",
    "prepare.after.2": "Com pressa? Há entrega em 3 dias úteis, mediante uma taxa de urgência.",
    "prepare.after.3": "Marcamos uma reunião online (Zoom) em que vos mostro um slideshow com a história da vossa sessão, e escolhem as imagens em digital ou impressão, de acordo com o pacote.",
    "prepare.after.4": "Logo a seguir recebem acesso à galeria online; as impressões e produtos são entregues em data a combinar.",
    "prepare.cta.title": "Alguma dúvida?",
    "prepare.cta.text":
      "Responda a este email ou mande-nos uma mensagem no WhatsApp — respondemos sempre antes da sessão.",

    // Journal
    "journal.label": "DIÁRIO",
    "journal.title": "Histórias do estúdio",
    "journal.subtitle":
      "Sessões, bastidores e algumas notas sobre fotografar famílias no Algarve.",
    "journal.empty": "Ainda não há artigos publicados. Volte em breve.",
    "journal.readmore": "LER ARTIGO",
    "journal.back": "VOLTAR AO DIÁRIO",
    "journal.notfound": "Artigo não encontrado.",

    // Privacy
    "privacy.label": "RGPD",
    "privacy.title": "Política de Privacidade",
    "privacy.updated": "Última atualização",
    "privacy.controller.title": "Responsável pelo tratamento",
    "privacy.controller.text":
      "[NOME LEGAL / EMPRESA], NIF [NIF], com sede em Avenida 25 de Abril, Edif. Space Beautiful, Loja G, 8200-559 Ferreiras, Albufeira, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste site. Para qualquer questão sobre os seus dados, contacte-nos por email.",
    "privacy.data.title": "Que dados recolhemos",
    "privacy.data.text":
      "Através do formulário de marcação recolhemos o seu nome, email, telefone (opcional), tipo de sessão pretendido, data preferida (opcional) e a mensagem que escrever. Não recolhemos dados que não nos dê voluntariamente.",
    "privacy.purpose.title": "Para que usamos os dados",
    "privacy.purpose.text":
      "Usamos os seus dados exclusivamente para responder ao seu pedido, organizar a marcação e comunicar consigo sobre a sessão. Não usamos os seus dados para marketing sem o seu consentimento expresso, e nunca os vendemos nem partilhamos com terceiros para fins publicitários.",
    "privacy.legal.title": "Fundamento legal",
    "privacy.legal.text":
      "O tratamento baseia-se no seu consentimento, dado ao submeter o formulário, e no interesse legítimo em responder a um pedido de informação comercial. Pode retirar o consentimento a qualquer momento.",
    "privacy.retention.title": "Quanto tempo guardamos",
    "privacy.retention.text":
      "Os pedidos de informação são conservados até 24 meses. Quando a sessão se concretiza, os dados de faturação são conservados pelo prazo legal exigido em Portugal (10 anos). As fotografias são arquivadas para que possa fazer encomendas futuras, e são eliminadas a seu pedido.",
    "privacy.images.title": "Uso das fotografias",
    "privacy.images.text":
      "As fotografias da sua sessão nunca são publicadas no site, redes sociais ou material promocional sem a sua autorização escrita. Essa autorização é separada e opcional — recusá-la não afeta em nada a sua sessão, e pode revogá-la mais tarde.",
    "privacy.processors.title": "Serviços que utilizamos",
    "privacy.processors.text":
      "Este site usa um serviço de envio de email para nos entregar as suas mensagens, alojamento em servidores na União Europeia e uma ferramenta de estatísticas sem cookies, que não recolhe dados pessoais nem o identifica individualmente.",
    "privacy.cookies.title": "Cookies",
    "privacy.cookies.text":
      "Não usamos cookies de publicidade nem de rastreio. O site guarda apenas a sua preferência de idioma e de tema no seu próprio navegador, o que é estritamente funcional e não exige consentimento.",
    "privacy.rights.title": "Os seus direitos",
    "privacy.rights.text":
      "Tem o direito de acesso, retificação, apagamento, limitação, oposição e portabilidade dos seus dados. Basta pedir-nos por email e respondemos no prazo de 30 dias. Se entender que os seus direitos não foram respeitados, pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).",
    "privacy.complaints.title": "Livro de Reclamações",
    "privacy.complaints.text":
      "Nos termos da lei portuguesa, está disponível o Livro de Reclamações Eletrónico em www.livroreclamacoes.pt.",
  },
  en: {
    // Navigation
    "nav.home": "HOME",
    "nav.about": "ABOUT",
    "nav.studio": "STUDIO",
    "nav.sessions": "SESSIONS",
    "nav.packages": "PACKAGES",
    "nav.gallery": "GALLERY",
    "nav.faq": "FAQ",
    "nav.contact": "CONTACT",

    // Session types
    "session.maternity": "Maternity",
    "session.newborn": "Newborn",
    "session.baby": "Baby",
    "session.family": "Family",
    "session.smash": "Smash the Cake",

    // Home page
    "home.hero.eyebrow": "PHOTOGRAPHY STUDIO, ALGARVE",
    "home.hero.title": "We write your story with light",
    "home.hero.subtitle":
      "Maternity, newborn, baby and family photography in Portugal",
    "home.hero.cta": "EXPLORE SESSIONS",
    "home.welcome.label": "WELCOME",
    "home.welcome.text":
      "Each session is a unique story, told through light and emotion. I capture the most precious moments of your life, transforming them into eternal memories.",
    "home.about.label": "MY STORY",
    "home.about.title": "Hello, I'm Tânia",
    "home.about.text":
      "Photographer since 2012, passionate about capturing the essence of each moment. Former nurse, I have dedicated myself full-time to photography since 2017.",
    "home.about.cta": "LEARN MORE ABOUT ME",
    "home.sessions.label": "DISCOVER OUR SERVICES",
    "home.sessions.title": "Sessions",
    "home.cta.eyebrow": "LET'S BEGIN",
    "home.cta.title": "Shall we make memories together?",
    "home.cta.subtitle": "Get in touch to schedule your session",
    "home.cta.button": "BOOK SESSION",
    "home.cta.whatsapp": "CHAT ON WHATSAPP",
    "home.cta.note": "PHOTOGRAPHY STUDIO, ALGARVE",
    "home.gallery.label": "GALLERY",
    "home.gallery.title": "Captured Moments",
    "home.gallery.loadMore": "LOAD MORE",
    "home.gallery.viewAll": "VIEW FULL GALLERY",
    "home.testimonials.label": "TESTIMONIALS",
    "home.testimonials.title": "What families say",

    // About page
    "about.hero.label": "MY STORY",
    "about.hero.title": "About Me",
    "about.intro":
      "I'm Tânia, and I've been capturing your memories since 2012.",
    "about.p1":
      "The love for photography has always been rooted in our family, but it all really started with the birth of my eldest daughter.",
    "about.p2":
      "I was a nurse for several years, but in 2017 I decided to embrace this passion full-time and it was the best decision I've made to date!",
    "about.p3":
      "I love my children and my family, I love to travel and one day I would like to travel the world.",
    "about.philosophy.title": "My philosophy",
    "about.philosophy.text":
      "I love spontaneity, the simplicity of the moment and emotion in its purest state! For me, less is more and it all comes down to your love!",
    "about.quote":
      "Sometimes the little things take up the most space in our hearts",
    "about.signature": "with love, Tânia",
    "about.gallery.label": "US, IN 2022",
    "about.gallery.title": "My Family",
    "about.studioCta.label": "FERREIRAS, ALBUFEIRA",
    "about.studioCta.title": "Discover Our Studio",
    "about.studioCta.description":
      "Come visit the space where we create memories. A welcoming environment designed to receive you with complete comfort.",
    "about.studioCta.button": "VISIT STUDIO",
    "about.sessionsCta.label": "WHAT WE PHOTOGRAPH",
    "about.sessionsCta.title": "Explore Our Sessions",
    "about.sessionsCta.description":
      "Discover the different types of sessions we offer. Each one designed to capture the most special moments of your life.",
    "about.sessionsCta.button": "VIEW SESSIONS",

    // Studio page
    "studio.hero.label": "LOCATED IN FERREIRAS, PORTUGAL",
    "studio.hero.title": "The Studio",
    "studio.intro.title": "A space designed to welcome you",
    "studio.intro.text":
      "My studio is located in Ferreiras. Easy access and parking, where I have all the conditions to welcome you comfortably.",
    "studio.amenities.title": "Amenities",
    "studio.amenity1": "Coffee, water and snacks",
    "studio.amenity2": "TV and internet",
    "studio.amenity3": "Toys for children",
    "studio.amenity4": "Wardrobe for expectant mothers",
    "studio.amenity5": "Blankets, boxes, clothes and headbands",
    "studio.quote":
      "Welcome to the 9 Meses home, I hope you feel comfortable in my little corner.",
    "studio.aboutCta.label": "THE PHOTOGRAPHER",
    "studio.aboutCta.title": "Learn My Story",
    "studio.aboutCta.description":
      "Discover more about me, my passion for photography and the philosophy behind each session.",
    "studio.aboutCta.button": "ABOUT ME",
    "studio.sessionsCta.label": "WHAT WE PHOTOGRAPH",
    "studio.sessionsCta.title": "Explore Our Sessions",
    "studio.sessionsCta.description":
      "Discover the different types of sessions we offer. Each one designed to capture the most special moments of your life.",
    "studio.sessionsCta.button": "VIEW SESSIONS",

    // Sessions overview
    "sessions.hero.label": "OUR SERVICES",
    "sessions.hero.title": "Sessions",
    "sessions.hero.subtitle":
      "Every stage deserves to be remembered. Choose the session that tells your story.",
    "sessions.viewSession": "VIEW SESSION",
    "sessions.viewAll": "VIEW ALL SESSIONS",
    "sessions.others": "Other sessions",
    "sessions.prepareLink": "How to prepare for this session",

    "sessions.maternity.title": "Maternity Photography",
    "sessions.maternity.timing": "29-35 weeks",
    "sessions.maternity.desc":
      "Celebrate this unique moment in your life. Sessions held between 29 and 35 weeks of pregnancy, in studio or outdoors, capturing the beauty and emotion of this special phase.",
    "sessions.maternity.body1":
      "Celebrate this unique moment in your life. Maternity sessions are held between 29 and 35 weeks of pregnancy, when the bump is at its most beautiful and you still feel comfortable for the session.",
    "sessions.maternity.body2":
      "You can choose to have the session in the studio, where we have a controlled and welcoming environment, or outdoors, making the most of natural light and unique settings. I have a wardrobe available with elegant dresses and fabrics for the session.",

    "sessions.newborn.title": "Newborn Photography",
    "sessions.newborn.timing": "First 2 weeks",
    "sessions.newborn.desc":
      "Delicate and peaceful sessions, held in the first 14 days of the baby's life. Baby-led sessions, respecting the baby's rhythm, lasting 3-4 hours.",
    "sessions.newborn.body1":
      "Newborn sessions are ideally held in the baby's first 14 days of life, while they still keep the flexibility and deep sleep so characteristic of newborns.",
    "sessions.newborn.body2":
      "These are baby-led sessions — we follow the baby's rhythm completely. Lasting 3 to 4 hours, there is time for feeding breaks, nappy changes and comfort. The studio is kept warm for the baby, and I have a wide collection of delicate props, blankets and accessories.",

    "sessions.baby.title": "Baby Photography",
    "sessions.baby.timing": "Growth stages",
    "sessions.baby.desc":
      "Follow your baby's growth through photo sessions that capture each important milestone of the first year of life.",
    "sessions.baby.body1":
      "Baby sessions are perfect for recording the important milestones of your child's growth. From the first month to the first year, every stage is special and deserves to be captured.",
    "sessions.baby.body2":
      "This session takes place in the studio, at a time that doesn't clash with your baby's nap, and lasts about 1 hour. I photograph your baby and the family too, and the studio has little outfits in several sizes you can use.",

    "sessions.family.title": "Family Photography",
    "sessions.family.timing":
      "Outdoors, at sunset",
    "sessions.family.desc":
      "Outdoor sessions starting 1 hour before sunset — beach, countryside or town — capturing your family's connection and love.",
    "sessions.family.body1":
      "Family sessions are a wonderful way to remember special moments with the people we love most: the smiles, the hugs, the cheeky glances.",
    "sessions.family.body2":
      "We start 1 hour before sunset, when the light is soft and golden. It can be at the beach, in the countryside, in town or a bit of each, and I'll help you choose the place and what to wear.",

    "sessions.smash.title": "Smash the Cake",
    "sessions.smash.timing": "First birthday",
    "sessions.smash.desc":
      "Celebrate the first birthday with a fun and memorable session. Cake included in the package.",
    "sessions.smash.body1":
      "Smash the Cake is a fun and memorable session to celebrate your baby's first birthday. It is the perfect opportunity to capture your child's personality and joy as they explore and play with the cake.",
    "sessions.smash.body2":
      "The cake is included in every package. The session takes about 1 hour: first the whole family, then just the baby, and the cake comes last. It can be in the studio or outdoors at sunset.",

    // Packages
    "packages.title": "Packages",
    "packages.subtitle": "Choose the ideal package for your session",
    "packages.maternity.title": "Maternity",
    "packages.newborn.title": "Newborn",
    "packages.baby.title": "Baby",
    "packages.family.title": "Family",
    "packages.smash.title": "Smash the Cake",
    "packages.from": "From",
    "packages.cta": "BOOK NOW",
    "packages.extras": "Extras available: prints, canvases, additional images",
    "packages.package": "Package",
    "packages.extras.link": "See extras, prints, canvases and payment terms",
    "packages.note.studioOutdoor":
      "Studio + outdoor session: add €50 to any package.",
    "packages.note.bundle":
      "Book a maternity and a newborn session together and get €50 off the total.",
    "packages.note.balloons": "Add a balloon garland to any package for €50.",
    "packages.extras.title": "Extras",
    "packages.extras.photos": "Extra high-resolution digital image",
    "packages.extras.prints": "Prints",
    "packages.extras.canvas": "Canvases",
    "packages.extras.each": "each",
    "packages.extras.print": "Print",
    "packages.extras.canvasOne": "Canvas",
    "packages.terms.title": "Booking and payment",
    "packages.terms.1": "Payment is made in two parts: 50% when booking and 50% on the day.",
    "packages.terms.2": "Cash, bank transfer or MB WAY (no Multibanco card payments).",
    "packages.terms.3":
      "After the slideshow you can upgrade your package or add extra images and products.",
    "packages.terms.4":
      "Gallery within 3 working days for a €100 rush fee (subject to availability).",
    "packages.terms.5": "The booking deposit is non-refundable if you cancel.",

    // Brochure
    "brochure.label": "CATALOGUE",
    "brochure.title": "9 Meses Brochure",
    "brochure.text":
      "Every package, price, condition and work sample in a single document. Read it online or save it to your device.",
    "brochure.view": "VIEW BROCHURE",
    "brochure.download": "DOWNLOAD PDF",
    "brochure.meta": "PDF · 55 pages",

    // Gallery
    "gallery.hero.label": "PORTFOLIO",
    "gallery.hero.title": "Gallery",
    "gallery.hero.subtitle":
      "A selection of moments captured in the studio and outdoors.",
    "gallery.filter.all": "ALL",
    "gallery.empty": "New images coming soon.",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know",
    "faq.q1": "How does payment work?",
    "faq.a1":
      "Payment is made in two installments: 50% upon booking and 50% on the session day. We accept cash, bank transfer or MB WAY.",
    "faq.q2": "What is the validity of vouchers?",
    "faq.a2": "Vouchers are valid for 6 months after purchase.",
    "faq.q3": "What if I need to reschedule the session?",
    "faq.a3":
      "If you need to reschedule because of illness or an accident, there is no extra cost; the same applies if an outdoor session has to move because of the weather. The new date is agreed according to availability. Missing the session without notice requires a new booking.",
    "faq.q4": "Can I use the images commercially?",
    "faq.a4":
      "All images are protected by copyright and are for personal use; commercial or advertising use needs the photographer's approval. The studio only publishes your images with your consent.",
    "faq.q5": "What is the delivery time?",
    "faq.a5":
      "The gallery is delivered within 2 months (you will be told in advance if that changes). Before that we meet online so you can watch the slideshow and choose your images. Delivery within 3 working days is also possible for a €100 rush fee.",
    "faq.q6": "Is the booking fee refundable?",
    "faq.a6":
      "The booking deposit (50% of the package) is non-refundable if you cancel. Illness, accidents or bad weather mean a free reschedule instead.",

    // Contact
    "contact.title": "Contact",
    "a11y.skip": "Skip to content",
    "gallery.open": "Open photo",
    "contact.package.chosen": "Chosen package",
    "contact.package.remove": "Remove package",
    "contact.dueDate.maternity": "Due date",
    "contact.dueDate.newborn": "Baby's birth date (or due date)",
    "contact.dueDate.maternity.help": "The ideal time is between 29 and 35 weeks.",
    "contact.dueDate.newborn.help":
      "Newborn sessions take place in the first 2 weeks of life.",
    "contact.optional": "optional",
    "contact.form.promise": "No commitment. I reply personally to every message.",
    "contact.error.whatsapp": "Or message me directly on WhatsApp",
    "contact.whatsapp.withPackage": "Hello! I would like to know more about the {session} session.",
    "contact.subtitle": "Let's talk about your session",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.session": "Session of Interest",
    "contact.familyMembers": "Number of Family Members",
    "contact.message": "Message",
    "contact.send": "SEND MESSAGE",
    "contact.sending": "SENDING...",
    "contact.success":
      "Message sent! I'll get back to you as soon as possible.",
    "contact.error":
      "The message could not be sent. Please try again or email me directly.",
    "contact.info": "Information",
    "contact.address": "Address",
    "contact.address.full":
      "Avenida 25 de Abril, Edif. Space Beautiful, Loja G, 8200-559 Ferreiras, Albufeira",
    "contact.instagram": "Instagram",
    "contact.select": "Select an option",

    // Footer
    "footer.tagline": "Maternity, newborn, baby and family photography",
    "footer.nav": "NAVIGATION",
    "footer.sessions": "SESSIONS",
    "footer.contact": "CONTACT",
    "footer.rights": "© {year} 9 Meses Fotografia. All rights reserved.",

    // Not found
    "notfound.title": "Page not found",
    "notfound.text": "The page you are looking for doesn't exist or has moved.",
    "notfound.cta": "BACK TO HOME",

    // Brand + a11y labels
    "brand.name": "9 Meses Fotografia",
    "nav.language": "Language",
    "nav.menu.toggle": "Open menu",
    "nav.menu.close": "Close menu",
    "nav.theme.toggle": "Toggle theme",
    "nav.contact.cta": "BOOK A SESSION",

    // Hero slideshow
    "hero.previous": "Previous image",
    "hero.next": "Next image",
    "hero.goTo": "Go to image",

    // Lightbox
    "lightbox.close": "Close",
    "lightbox.previous": "Previous",
    "lightbox.next": "Next",
    "lightbox.loading": "Loading image...",
    "lightbox.hint": "Use the arrow keys to navigate. ESC to close.",
    "lightbox.preloadFallback": "Preview unavailable",

    // Gallery filters
    "gallery.filter.label": "Filter by",
    "gallery.filter.maternity": "MATERNITY",
    "gallery.filter.newborn": "NEWBORN",
    "gallery.filter.baby": "BABY",
    "gallery.filter.family": "FAMILY",
    "gallery.filter.smash": "SMASH THE CAKE",
    "gallery.filter.studio": "STUDIO",
    "gallery.filter.empty": "There are no photographs in this category yet.",
    "gallery.filter.processing": "Loading photographs...",

    // Package tiers
    "packages.gold": "Gold",
    "packages.diamond": "Diamond",
    "packages.simple": "Simple",
    "packages.complete": "Complete",
    "packages.xs": "XS",
    "packages.l": "L",
    "sessions.smashTheCake": "Smash the Cake",

    // Contact details
    "contact.email.address": "info@9mesesfotografia.pt",
    "contact.social": "Social media",
    "contact.instagram.handle": "@9mesesfotografia",
    "contact.instagram.url": "https://www.instagram.com/9mesesfotografia/",
    "contact.facebook": "Facebook",
    "contact.facebook.handle": "9 Meses Fotografia",
    "contact.facebook.url": "https://www.facebook.com/9mesesfotografia/",
    "contact.linkedin": "LinkedIn",
    "contact.linkedin.handle": "",
    "contact.linkedin.url": "",
    "contact.hours.label": "Opening hours",
    "contact.hours.value": "Monday to Friday, 10am — 7pm (by appointment)",
    "contact.maps.cta": "GET DIRECTIONS",
    "contact.maps.destination": "Ferreiras, Albufeira, Portugal",
    "home.about.intro":
      "I have been recording memories since 2012, with natural light and plenty of time for every family.",
    // Navigation additions
    "nav.prepare": "PREPARE",
    "nav.journal": "JOURNAL",
    "nav.privacy": "Privacy Policy",
    "nav.group.about": "STUDIO",
    "nav.group.sessions": "SESSIONS",
    "nav.sessions.all": "ALL SESSIONS",
    "nav.group.about.desc": "Who we are and where we work",
    "nav.group.sessions.desc": "Session types, packages and preparation",
    "footer.complaints": "Complaints Book",

    // Phone / WhatsApp
    "contact.phone.label": "Phone",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsapp.aria": "Message us on WhatsApp",
    "contact.whatsapp.cta": "MESSAGE US ON WHATSAPP",
    "contact.call.cta": "CALL NOW",

    // Form additions
    "contact.form.date": "Preferred date",
    "contact.form.date.help":
      "Indicative only — we will confirm availability by email.",
    "contact.form.consent":
      "I have read and accept the Privacy Policy and consent to my data being processed in order to answer this enquiry.",
    "contact.form.consent.link": "Privacy Policy",
    "contact.form.consent.error": "You need to accept the Privacy Policy.",
    "contact.form.autoreply":
      "We have sent you a confirmation email. Please check your spam folder too.",
    "contact.form.ratelimit":
      "We have already received several enquiries from this device. Please try again later or email us directly.",

    // SEO
    "seo.home.title": "Maternity, Newborn and Family Photography in Albufeira",
    "seo.home.desc":
      "Photography studio in Ferreiras, Albufeira. Maternity, newborn, baby, family and smash the cake sessions in the Algarve. Book your session.",
    "seo.about.title": "About Tânia",
    "seo.about.desc":
      "Meet the photographer behind 9 Meses Fotografia: over a decade photographing maternity, newborns and families in the Algarve.",
    "seo.studio.title": "The Studio in Ferreiras, Albufeira",
    "seo.studio.desc":
      "A studio built for babies and families, with natural light, heating, props and everything needed for calm, unhurried sessions.",
    "seo.sessions.title": "Photography Sessions",
    "seo.sessions.desc":
      "Maternity, newborn, baby, family and smash the cake. See what each session includes, the best timing and how to prepare.",
    "seo.packages.title": "Packages and Pricing",
    "seo.packages.desc":
      "Maternity, newborn, baby and family photography packages in Albufeira. See what each package includes and request a quote.",
    "seo.gallery.title": "Gallery",
    "seo.gallery.desc":
      "Portfolio of maternity, newborn, baby and family photography shot at the studio in Ferreiras, Albufeira.",
    "seo.prepare.title": "How to Prepare for Your Session",
    "seo.prepare.desc":
      "Everything to know before your session: what to wear, what to bring, the best time of day, and how newborn sessions run.",
    "seo.journal.title": "Journal",
    "seo.journal.desc":
      "Session stories, tips and news from the 9 Meses Fotografia studio in Albufeira.",
    "seo.faq.title": "Frequently Asked Questions",
    "seo.faq.desc":
      "Answers to the most common questions about booking, session length, photo delivery and payment.",
    "seo.contact.title": "Contact and Booking",
    "seo.contact.desc":
      "Book your photography session in Ferreiras, Albufeira. Phone, WhatsApp, email and booking form.",
    "seo.privacy.title": "Privacy Policy",
    "seo.privacy.desc":
      "How we collect, use and protect your personal data under the GDPR.",

    // Prepare page
    "prepare.label": "BEFORE YOUR SESSION",
    "prepare.title": "How to prepare for your session",
    "prepare.subtitle":
      "A few simple notes so you arrive relaxed and the day runs without rushing.",
    "prepare.general.title": "For every session",
    "prepare.general.1.title": "Arrive unhurried",
    "prepare.general.1.text":
      "Allow a few extra minutes for parking and settling in. A calm arrival always shows in the photographs.",
    "prepare.general.2.title": "Simple clothes, neutral tones",
    "prepare.general.2.text":
      "Beige, white, grey, earth tones and soft greens always photograph well. Avoid bold prints, logos and thin stripes.",
    "prepare.general.3.title": "Bring the essentials",
    "prepare.general.3.text": "Nappies, a change of clothes, the dummy and something your baby loves. At the studio there is coffee, water and a few snacks, TV and Wi-Fi, and toys for the little ones.",
    "prepare.general.4.title": "Tell us what you want",
    "prepare.general.4.text":
      "If you have a photograph in mind, a keepsake to include or someone who must be in the frame, let us know before the session.",
    "prepare.maternity.title": "Maternity session",
    "prepare.newborn.title": "Newborn session",
    "prepare.baby.title": "Baby session",
    "prepare.family.title": "Family session",
    "prepare.after.title": "After the session",
    "prepare.after.text":
      "You receive a private online gallery to choose your favourite photographs. The images you select are retouched and delivered in high resolution, ready to print, and kept on file for future orders.",
    "prepare.sessions.title": "Session by session",
    "prepare.before": "Before the session",
    "prepare.session": "The session",
    "prepare.day": "On the day",
    "prepare.maternity.before": "I recommend the session between 29 and 35 weeks, when the bump is round and beautiful but mum is not yet too uncomfortable or tired. The session is all about mum, but dad and siblings are welcome too!\n\nOutdoors, we start 1 hour before sunset to catch that lovely end-of-day light: beach, countryside, town or a bit of each — I'll help you choose. It can also be in the studio, for something more intimate, or you can have the best of both and do outdoor and studio.\n\nAs for what to wear, I'll advise on what suits each setting, and the studio has a maternity wardrobe with pieces you can use.",
    "prepare.maternity.day": "Today is the day! Try to relax and pretend I'm not there. If it's your first photo session, don't worry: I'll help you with poses and tell you what to do. The idea is to have fun and make memories together!",
    "prepare.newborn.before": "Newborn sessions are best in the baby's first two weeks, when they are sleepier and more “curl-up-able”, which allows those delicious poses.\n\nBecause that window is short, it's really important to book during pregnancy to secure your spot — after the birth there is often no room left in the diary. I usually book for the due date and, since most babies don't arrive on that day, you let me know as soon as your baby is born and we set the final date.\n\nOnce you book you'll receive a questionnaire, so I can shape the session around what you hope for.",
    "prepare.newborn.day": "Before the date you'll receive an email with everything for the session: what to do beforehand, what to bring and the studio's location.\n\nThe session takes about 3 to 4 hours, whatever the package. The baby is in charge — I follow their rhythm, literally. I prepare the sets and props in advance from your questionnaire, but if you see something in the studio you'd like, I can swap or add it.",
    "prepare.baby.before": "Every stage of your baby deserves to be remembered. Each one is unique, and some little things never come back: that pout, the toothless smile, the messy hair, the heartfelt hug for mum and dad, that little kiss…\n\nThis session takes place in the studio, at a time that doesn't clash with your baby's nap.",
    "prepare.baby.day": "The session takes about 1 hour, whatever the package. I photograph your baby and your family too!\n\nThe studio has little outfits in different sizes you can use. For parents and siblings I suggest neutral tones, white or denim. For the baby's solo photos, we choose the colours together.",
    "prepare.family.before": "In this session I want to capture your smiles, hugs and cheeky glances… the special connection between you.\n\nWe start 1 hour before sunset to catch the lovely end-of-day light. It can be at the beach, in the countryside, in town or a bit of each — I'll help you choose. I'm also happy to advise on what to wear and which colours work best in each setting.",
    "prepare.family.day": "Today is the day! Try to relax and pretend I'm not there. If it's your first photo session, don't worry: I'll help you with poses and tell you what to do. The idea is to have fun and make memories together!",
    "prepare.smash.title": "Smash the Cake session",
    "prepare.smash.before": "A whole year has gone by and it's time to celebrate! At this age babies are curious and love exploring, and the cake is the best way to keep them on set. Some eat it, some don't, some get covered head to toe and some only try it with a spoon… It's a lovely, original way to celebrate the first birthday!\n\nIt can be outdoors or in the studio, depending on your choice and the weather. In the studio I book a time that doesn't clash with nap time; outdoors, we start 1 hour before sunset.",
    "prepare.smash.day": "The session takes about 1 hour, whatever the package. First I photograph the whole family, then just the baby, and at the end comes the “Smash the Cake”.\n\nThe studio has little outfits in different sizes. For parents and siblings I suggest neutral tones, white or denim; for the baby's solo photos, we choose the colours together.",
    "prepare.after.1": "Your gallery is delivered within 2 months. If that changes, you'll be told in advance.",
    "prepare.after.2": "In a hurry? Delivery within 3 working days is available for a rush fee.",
    "prepare.after.3": "We meet online (Zoom), I show you a slideshow telling the story of your session, and you choose your images, digital or printed, according to your package.",
    "prepare.after.4": "Straight after, you get access to the online gallery; prints and products are delivered on a date we agree.",
    "prepare.cta.title": "Any questions?",
    "prepare.cta.text":
      "Reply to your email or send us a WhatsApp message — we always answer before the session.",

    // Journal
    "journal.label": "JOURNAL",
    "journal.title": "Stories from the studio",
    "journal.subtitle":
      "Sessions, behind the scenes and a few notes on photographing families in the Algarve.",
    "journal.empty": "No posts published yet. Please come back soon.",
    "journal.readmore": "READ ARTICLE",
    "journal.back": "BACK TO THE JOURNAL",
    "journal.notfound": "Article not found.",

    // Privacy
    "privacy.label": "GDPR",
    "privacy.title": "Privacy Policy",
    "privacy.updated": "Last updated",
    "privacy.controller.title": "Data controller",
    "privacy.controller.text":
      "[LEGAL NAME / COMPANY], VAT [VAT NUMBER], registered at Avenida 25 de Abril, Edif. Space Beautiful, Loja G, 8200-559 Ferreiras, Albufeira, Portugal, is the controller of the personal data collected through this website. For any question about your data, please email us.",
    "privacy.data.title": "What data we collect",
    "privacy.data.text":
      "Through the booking form we collect your name, email, phone (optional), the session type you are interested in, your preferred date (optional) and the message you write. We do not collect data you do not give us voluntarily.",
    "privacy.purpose.title": "What we use it for",
    "privacy.purpose.text":
      "We use your data solely to answer your enquiry, arrange the booking and communicate with you about the session. We do not use your data for marketing without your express consent, and we never sell or share it with third parties for advertising.",
    "privacy.legal.title": "Legal basis",
    "privacy.legal.text":
      "Processing is based on your consent, given when you submit the form, and on our legitimate interest in answering a commercial enquiry. You may withdraw consent at any time.",
    "privacy.retention.title": "How long we keep it",
    "privacy.retention.text":
      "Enquiries are kept for up to 24 months. Where a session goes ahead, invoicing data is kept for the period required by Portuguese law (10 years). Photographs are archived so you can place future orders, and are deleted on your request.",
    "privacy.images.title": "Use of photographs",
    "privacy.images.text":
      "Photographs from your session are never published on this website, social media or promotional material without your written permission. That permission is separate and optional — declining it does not affect your session in any way, and you may withdraw it later.",
    "privacy.processors.title": "Services we use",
    "privacy.processors.text":
      "This site uses an email delivery service to pass your messages to us, hosting on servers within the European Union, and a cookieless statistics tool that collects no personal data and does not identify you individually.",
    "privacy.cookies.title": "Cookies",
    "privacy.cookies.text":
      "We use no advertising or tracking cookies. The site stores only your language and theme preference in your own browser, which is strictly functional and requires no consent.",
    "privacy.rights.title": "Your rights",
    "privacy.rights.text":
      "You have the right of access, rectification, erasure, restriction, objection and portability of your data. Simply ask us by email and we will respond within 30 days. If you believe your rights have not been respected, you may complain to the Portuguese data protection authority (CNPD).",
    "privacy.complaints.title": "Complaints Book",
    "privacy.complaints.text":
      "As required by Portuguese law, the electronic Complaints Book is available at www.livroreclamacoes.pt.",
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

// Fails the typecheck when a PT key has no EN counterpart, so a missing
// translation can never ship as a raw key again.
type MissingInEnglish = Exclude<TranslationKey, keyof typeof translations.en>;
const englishIsComplete: [MissingInEnglish] extends [never]
  ? true
  : MissingInEnglish = true;
void englishIsComplete;

/** Every key, for the admin content editor. */
export const translationKeys = Object.keys(translations.pt) as TranslationKey[];

/** Groups keys by their prefix, so the admin editor can show sections. */
export function groupedTranslationKeys() {
  const groups = new Map<string, TranslationKey[]>();
  for (const key of translationKeys) {
    const group = key.split(".")[0] ?? "other";
    const list = groups.get(group) ?? [];
    list.push(key);
    groups.set(group, list);
  }
  return [...groups.entries()];
}
