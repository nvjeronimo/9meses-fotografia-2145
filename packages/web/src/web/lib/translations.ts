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
    "home.hero.eyebrow": "ESTÚDIO EM FERREIRAS, ALBUFEIRA",
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
    "home.cta.note": "ESTÚDIO EM FERREIRAS, ALBUFEIRA",
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
      "Estas sessões podem ser realizadas em estúdio ou ao ar livre, dependendo das suas preferências. Gosto de capturar momentos naturais e espontâneos, mostrando a personalidade única do seu bebé em cada etapa do desenvolvimento.",

    "sessions.family.title": "Fotografia de Família",
    "sessions.family.timing": "Estúdio ou exterior",
    "sessions.family.desc":
      "Sessões em estúdio ou ao ar livre, preferencialmente durante a golden hour, capturando a conexão e o amor da vossa família.",
    "sessions.family.body1":
      "As sessões de família são uma excelente forma de registar os momentos especiais com as pessoas que mais amamos. Quer seja em estúdio ou ao ar livre, criamos memórias que durarão para sempre.",
    "sessions.family.body2":
      "Prefiro realizar estas sessões durante a golden hour, quando a luz é mais suave e dourada, criando uma atmosfera mágica e acolhedora. Capturo momentos naturais de conexão, risos genuínos e abraços calorosos que refletem o amor da vossa família.",

    "sessions.smash.title": "Smash the Cake",
    "sessions.smash.timing": "Primeiro aniversário",
    "sessions.smash.desc":
      "Celebre o primeiro aniversário com uma sessão divertida e memorável. Bolo incluído no pacote.",
    "sessions.smash.body1":
      "O Smash the Cake é uma sessão divertida e memorável para celebrar o primeiro aniversário do seu bebé. É uma oportunidade perfeita para capturar a personalidade e a alegria do seu filho enquanto ele explora e brinca com o bolo.",
    "sessions.smash.body2":
      "A sessão inclui um bolo delicioso (que pode ser personalizado de acordo com as suas preferências), e capturo todos os momentos de diversão, sujidade e sorrisos. É uma forma única de marcar este marco importante na vida do seu filho.",

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
      "Se por motivo de doença for necessária a remarcação, não haverá qualquer custo extra. A nova data será acordada conforme a disponibilidade da agenda.",
    "faq.q4": "Posso usar as imagens comercialmente?",
    "faq.a4":
      "Todas as imagens estão protegidas por direitos de autor. Para uso pessoal não há restrições, mas qualquer utilização comercial requer aprovação prévia.",
    "faq.q5": "Qual o prazo de entrega?",
    "faq.a5":
      "O prazo de entrega das imagens editadas é de aproximadamente 3-4 semanas após a sessão.",
    "faq.q6": "O valor da reserva é reembolsável?",
    "faq.a6":
      "O valor da reserva não é reembolsável, mas pode ser transferido para uma nova data em caso de necessidade.",

    // Contact
    "contact.title": "Contacto",
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
    "prepare.general.3.text":
      "Fraldas, uma muda de roupa, a chupeta e algo de que o bebé goste. No estúdio há água, chá e espaço para amamentar.",
    "prepare.general.4.title": "Diga-nos o que quer",
    "prepare.general.4.text":
      "Se tem uma fotografia em mente, um objeto com valor sentimental ou alguém que deve aparecer, avise antes da sessão.",
    "prepare.maternity.title": "Sessão de maternidade",
    "prepare.maternity.text":
      "A melhor altura é entre as 28 e as 34 semanas — a barriga já está redonda e ainda se move com conforto. Traga dois ou três conjuntos; temos também vestidos de estúdio em vários tamanhos. Hidrate a pele nos dias anteriores e evite roupa apertada nas horas antes da sessão, para não marcar a pele.",
    "prepare.newborn.title": "Sessão de recém-nascido",
    "prepare.newborn.text":
      "O ideal são os primeiros 14 dias, quando o bebé ainda dorme profundamente e se enrola com facilidade. A sessão é conduzida pelo bebé e dura 3 a 4 horas, com pausas para mamar, trocar a fralda e acalmar. O estúdio é mantido quente. Dê banho ao bebé em casa e, se possível, mantenha-o acordado na hora anterior — ajuda a que adormeça aqui.",
    "prepare.baby.title": "Sessão de bebé e smash the cake",
    "prepare.baby.text":
      "Marque a sessão para a hora do dia em que o bebé está mais bem-humorado, normalmente depois da sesta da manhã. Traga um brinquedo com som e um snack. No smash the cake, traga roupa de muda e uma toalha — o bolo vai para todo o lado, e é isso que a torna divertida.",
    "prepare.family.title": "Sessão de família",
    "prepare.family.text":
      "Combinem as cores entre todos sem ficarem iguais: escolham dois ou três tons e distribuam-nos. Com crianças pequenas, a primeira meia hora é para brincar e ganhar confiança — as melhores fotografias aparecem quase sempre depois disso.",
    "prepare.after.title": "Depois da sessão",
    "prepare.after.text":
      "Recebe uma galeria privada online para escolher as suas fotografias favoritas. A edição das imagens escolhidas é entregue em alta resolução, pronta para imprimir, e ficam guardadas em arquivo para futuras encomendas.",
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
    "home.hero.eyebrow": "STUDIO IN FERREIRAS, ALBUFEIRA",
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
    "home.cta.note": "STUDIO IN FERREIRAS, ALBUFEIRA",
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
      "These sessions can be held in the studio or outdoors, depending on your preference. I love capturing natural, spontaneous moments that show your baby's unique personality at each stage of development.",

    "sessions.family.title": "Family Photography",
    "sessions.family.timing": "Studio or outdoor",
    "sessions.family.desc":
      "Studio or outdoor sessions, preferably during golden hour, capturing the connection and love of your family.",
    "sessions.family.body1":
      "Family sessions are a wonderful way to record special moments with the people we love most. Whether in the studio or outdoors, we create memories that last forever.",
    "sessions.family.body2":
      "I prefer to photograph these sessions during golden hour, when the light is softer and golden, creating a magical and welcoming atmosphere. I capture natural moments of connection, genuine laughter and warm hugs that reflect your family's love.",

    "sessions.smash.title": "Smash the Cake",
    "sessions.smash.timing": "First birthday",
    "sessions.smash.desc":
      "Celebrate the first birthday with a fun and memorable session. Cake included in the package.",
    "sessions.smash.body1":
      "Smash the Cake is a fun and memorable session to celebrate your baby's first birthday. It is the perfect opportunity to capture your child's personality and joy as they explore and play with the cake.",
    "sessions.smash.body2":
      "The session includes a delicious cake (which can be customised to your preferences), and I capture every moment of fun, mess and smiles. It is a unique way to mark this important milestone in your child's life.",

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
      "If rescheduling is necessary due to illness, there will be no extra cost. The new date will be agreed according to schedule availability.",
    "faq.q4": "Can I use the images commercially?",
    "faq.a4":
      "All images are protected by copyright. For personal use there are no restrictions, but any commercial use requires prior approval.",
    "faq.q5": "What is the delivery time?",
    "faq.a5":
      "The delivery time for edited images is approximately 3-4 weeks after the session.",
    "faq.q6": "Is the booking fee refundable?",
    "faq.a6":
      "The booking fee is non-refundable, but can be transferred to a new date if necessary.",

    // Contact
    "contact.title": "Contact",
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
    "prepare.general.3.text":
      "Nappies, a change of clothes, the dummy and something your baby loves. The studio has water, tea and space to breastfeed.",
    "prepare.general.4.title": "Tell us what you want",
    "prepare.general.4.text":
      "If you have a photograph in mind, a keepsake to include or someone who must be in the frame, let us know before the session.",
    "prepare.maternity.title": "Maternity session",
    "prepare.maternity.text":
      "The best window is between 28 and 34 weeks — the bump is beautifully round and you still move comfortably. Bring two or three outfits; we also have studio gowns in a range of sizes. Moisturise your skin in the days before, and avoid tight clothing in the hours before the session so it does not mark your skin.",
    "prepare.newborn.title": "Newborn session",
    "prepare.newborn.text":
      "The first 14 days are ideal, while your baby still sleeps deeply and curls easily. The session is baby-led and lasts 3 to 4 hours, with breaks for feeding, changing and soothing. The studio is kept warm. Bathe your baby at home and, if you can, keep them awake for the hour before — it helps them settle here.",
    "prepare.baby.title": "Baby and smash the cake sessions",
    "prepare.baby.text":
      "Book the time of day when your baby is at their happiest, usually after the morning nap. Bring a noisy toy and a snack. For smash the cake, bring a change of clothes and a towel — the cake goes everywhere, and that is exactly what makes it fun.",
    "prepare.family.title": "Family session",
    "prepare.family.text":
      "Coordinate colours without matching exactly: pick two or three tones and spread them across the family. With small children, the first half hour is for playing and building trust — the best photographs almost always come after that.",
    "prepare.after.title": "After the session",
    "prepare.after.text":
      "You receive a private online gallery to choose your favourite photographs. The images you select are retouched and delivered in high resolution, ready to print, and kept on file for future orders.",
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
