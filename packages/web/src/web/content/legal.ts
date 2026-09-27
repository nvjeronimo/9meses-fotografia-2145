// Política de privacidade e política de cookies (PT/EN).
// Ao mudar o conteúdo, atualizar VERSION e IN_FORCE e rever as duas línguas.

export const VERSION = "2.0";
/** ISO date the current version took effect. */
export const IN_FORCE = "2026-09-27";

export type Block =
  | { p: string }
  | { ul: string[] }
  | { table: { head: string[]; rows: string[][] } };

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Policy {
  lead: string;
  facts: [string, string][];
  tocLabel: string;
  sections: Section[];
  crossLink: { text: string; link: string; page: "privacy" | "cookies" };
}

type Lang = "pt" | "en";

export const PRIVACY: Record<Lang, Policy> = {
  pt: {
    lead: "Que dados pessoais este site e o estúdio recolhem, para quê, durante quanto tempo e como pode pedir para os ver ou apagar.",
    facts: [
      ["Versão", VERSION],
      ["Em vigor", "27 set 2026"],
      ["Lei", "RGPD"],
    ],
    tocLabel: "Nesta página",
    sections: [
      {
        id: "quem-somos",
        title: "Quem somos",
        blocks: [
          {
            p: "O site 9mesesfotografia.com e o estúdio 9 Meses Fotografia pertencem à fotógrafa Tânia Pires, com estúdio na Avenida 25 de Abril, Edif. Space Beautiful, Loja G, 8200-559 Ferreiras, Albufeira. É a responsável pelo tratamento dos dados pessoais descritos nesta política.",
          },
          {
            p: "Não pedimos mais dados do que os necessários para responder e fazer a sua sessão, e nunca os vendemos nem cedemos para publicidade.",
          },
        ],
      },
      {
        id: "dados",
        title: "Que dados recolhemos e porquê",
        blocks: [
          {
            table: {
              head: ["Onde", "Que dados", "Para quê", "Base legal (RGPD)"],
              rows: [
                [
                  "Formulário de contacto",
                  "Nome, email, telefone (opcional), sessão e pacote escolhidos, data preferida, data prevista do parto ou de nascimento, número de pessoas da família e a mensagem que escrever.",
                  "Responder ao pedido, confirmar disponibilidade e marcar a sessão.",
                  "Diligências pré-contratuais a seu pedido e consentimento (caixa do formulário)",
                ],
                [
                  "WhatsApp, telefone e email",
                  "O seu número ou endereço e o que nos escrever ou disser.",
                  "Responder e combinar a sessão.",
                  "Diligências pré-contratuais a seu pedido",
                ],
                [
                  "Sessão e entrega",
                  "Contactos, respostas ao questionário da sessão (newborn), fotografias da sessão e dados de faturação.",
                  "Preparar e fazer a sessão, entregar a galeria e os produtos, e faturar.",
                  "Execução do contrato e obrigação legal (faturação)",
                ],
                [
                  "Registos do servidor",
                  "Endereço IP, página pedida, data e navegador, guardados automaticamente pelo alojamento.",
                  "Funcionamento e segurança do site.",
                  "Interesse legítimo (segurança)",
                ],
              ],
            },
          },
          {
            p: "O site não tem contas de utilizador, comentários, publicidade, estatísticas de visitas nem ferramentas de rastreio de terceiros, e não guarda os pedidos do formulário: estes seguem por email para o estúdio.",
          },
        ],
      },
      {
        id: "prazos",
        title: "Quanto tempo os guardamos",
        blocks: [
          {
            ul: [
              "Pedidos que não resultam em sessão: até 24 meses depois do último contacto.",
              "Clientes: os dados de faturação pelo prazo exigido pela lei portuguesa (10 anos); os restantes enquanto durar a relação e até 24 meses depois.",
              "Fotografias: guardadas em arquivo para permitir encomendas futuras e apagadas quando o pedir.",
              "Registo de envios do formulário no EmailJS: pelo prazo definido por esse serviço.",
              "Registos do servidor: pelo prazo definido pelo alojamento (DreamHost).",
            ],
          },
        ],
      },
      {
        id: "partilha",
        title: "Com quem os partilhamos",
        blocks: [
          {
            ul: [
              "Não vendemos nem cedemos os seus dados a ninguém.",
              "DreamHost: alojamento do site e do email do estúdio, em servidores na União Europeia (Amesterdão).",
              "EmailJS: serviço que entrega as mensagens do formulário na caixa de email do estúdio e guarda um registo de cada envio.",
              "Google (Gmail): recebe uma cópia dos pedidos na caixa de email do estúdio.",
              "Zoom e o serviço de galeria online: usados depois da sessão para a apresentação das fotografias e para a entrega da galeria.",
              "WhatsApp, Instagram, Facebook, Google Maps e Livro de Reclamações: os links só enviam dados para esses serviços quando carrega neles, e a partir daí aplicam-se as regras de cada um.",
            ],
          },
          {
            p: "Alguns destes serviços (Google, EmailJS, Zoom) podem tratar dados fora da União Europeia. Nesses casos aplicam-se as garantias previstas no RGPD, como as cláusulas contratuais-tipo aprovadas pela Comissão Europeia.",
          },
        ],
      },
      {
        id: "fotografias",
        title: "Fotografias e crianças",
        blocks: [
          {
            p: "As fotografias da sua sessão, incluindo as dos bebés e das crianças, nunca são publicadas no site, nas redes sociais ou em material promocional sem a sua autorização por escrito. Essa autorização é separada e opcional: recusá-la não muda nada na sua sessão, e pode retirá-la mais tarde, pedindo para retirarmos as imagens já publicadas.",
          },
          {
            p: "As imagens estão protegidas por direitos de autor e destinam-se a uso pessoal da família; o uso comercial ou publicitário precisa de aprovação da fotógrafa.",
          },
        ],
      },
      {
        id: "seguranca",
        title: "Segurança",
        blocks: [
          {
            p: "O site usa sempre ligação cifrada (HTTPS) e não tem base de dados: não guarda pedidos, contas nem palavras-passe. O acesso técnico ao servidor é feito com chave cifrada, e só a equipa do estúdio tem acesso às caixas de email onde chegam os pedidos.",
          },
        ],
      },
      {
        id: "direitos",
        title: "Os seus direitos",
        blocks: [
          {
            p: "Pode pedir-nos a qualquer momento para ver os seus dados, corrigi-los, apagá-los, limitar o seu uso, opor-se ao tratamento ou receber uma cópia. Quando o tratamento se baseia no seu consentimento, pode retirá-lo quando quiser, sem afetar o que foi feito antes. Respondemos no prazo de um mês.",
          },
          {
            p: "Se achar que os seus dados não foram bem tratados, pode apresentar queixa à Comissão Nacional de Proteção de Dados (www.cnpd.pt).",
          },
        ],
      },
      {
        id: "contacto",
        title: "Contacto",
        blocks: [
          {
            p: "Para qualquer pedido sobre os seus dados, incluindo retirar uma fotografia publicada: info@9mesesfotografia.com ou +351 967 716 894.",
          },
          {
            p: "Nos termos da lei portuguesa, está também disponível o Livro de Reclamações Eletrónico em www.livroreclamacoes.pt.",
          },
        ],
      },
    ],
    crossLink: {
      text: "Sobre o que fica guardado no seu navegador, leia a",
      link: "política de cookies",
      page: "cookies",
    },
  },
  en: {
    lead: "What personal data this website and the studio collect, what for, how long we keep it and how you can ask to see or delete it.",
    facts: [
      ["Version", VERSION],
      ["In force", "27 Sep 2026"],
      ["Law", "GDPR"],
    ],
    tocLabel: "On this page",
    sections: [
      {
        id: "who-we-are",
        title: "Who we are",
        blocks: [
          {
            p: "The website 9mesesfotografia.com and the studio 9 Meses Fotografia belong to photographer Tânia Pires, whose studio is at Avenida 25 de Abril, Edif. Space Beautiful, Loja G, 8200-559 Ferreiras, Albufeira, Portugal. She is the controller of the personal data described in this policy.",
          },
          {
            p: "We ask for no more data than we need to reply and to photograph your session, and we never sell it or pass it on for advertising.",
          },
        ],
      },
      {
        id: "data",
        title: "What we collect and why",
        blocks: [
          {
            table: {
              head: ["Where", "What data", "What for", "Legal basis (GDPR)"],
              rows: [
                [
                  "Contact form",
                  "Name, email, phone (optional), chosen session and package, preferred date, due date or birth date, number of family members and your message.",
                  "Replying, checking availability and booking the session.",
                  "Steps taken at your request before a contract, and consent (form checkbox)",
                ],
                [
                  "WhatsApp, phone and email",
                  "Your number or address and whatever you write or tell us.",
                  "Replying and arranging the session.",
                  "Steps taken at your request before a contract",
                ],
                [
                  "Session and delivery",
                  "Contact details, answers to the session questionnaire (newborn), session photographs and invoicing details.",
                  "Preparing and photographing the session, delivering the gallery and products, and invoicing.",
                  "Performance of the contract and legal obligation (invoicing)",
                ],
                [
                  "Server logs",
                  "IP address, page requested, date and browser, recorded automatically by the host.",
                  "Running the website securely.",
                  "Legitimate interest (security)",
                ],
              ],
            },
          },
          {
            p: "The website has no user accounts, comments, advertising, visitor statistics or third-party tracking, and it does not store form enquiries: they are sent by email to the studio.",
          },
        ],
      },
      {
        id: "retention",
        title: "How long we keep it",
        blocks: [
          {
            ul: [
              "Enquiries that do not lead to a session: up to 24 months after the last contact.",
              "Clients: invoicing details for the period required by Portuguese law (10 years); everything else for as long as we work together and up to 24 months afterwards.",
              "Photographs: archived so you can order prints later, and deleted when you ask.",
              "EmailJS log of form sends: for the period set by that service.",
              "Server logs: for the period set by the host (DreamHost).",
            ],
          },
        ],
      },
      {
        id: "sharing",
        title: "Who we share it with",
        blocks: [
          {
            ul: [
              "We never sell or give your data to anyone.",
              "DreamHost: hosting for the website and the studio email, on servers in the European Union (Amsterdam).",
              "EmailJS: delivers contact-form messages to the studio mailbox and keeps a log of each send.",
              "Google (Gmail): receives a copy of each enquiry in the studio mailbox.",
              "Zoom and the online gallery service: used after the session to present the photographs and deliver the gallery.",
              "WhatsApp, Instagram, Facebook, Google Maps and the Complaints Book: the links only send data to those services when you click them, and their own rules apply from then on.",
            ],
          },
          {
            p: "Some of these services (Google, EmailJS, Zoom) may process data outside the European Union. Where they do, the safeguards set out in the GDPR apply, such as the European Commission's standard contractual clauses.",
          },
        ],
      },
      {
        id: "photographs",
        title: "Photographs and children",
        blocks: [
          {
            p: "Photographs from your session, including those of babies and children, are never published on the website, on social media or in promotional material without your written permission. That permission is separate and optional: saying no changes nothing about your session, and you can withdraw it later and ask us to remove images already published.",
          },
          {
            p: "The images are protected by copyright and are for the family's personal use; commercial or advertising use needs the photographer's approval.",
          },
        ],
      },
      {
        id: "security",
        title: "Security",
        blocks: [
          {
            p: "The website always uses an encrypted connection (HTTPS) and has no database: it stores no enquiries, accounts or passwords. Technical access to the server uses an encryption key, and only the studio team can access the mailboxes that receive enquiries.",
          },
        ],
      },
      {
        id: "rights",
        title: "Your rights",
        blocks: [
          {
            p: "You can ask us at any time to see your data, correct it, delete it, restrict its use, object to it being processed or receive a copy. Where processing is based on your consent, you can withdraw it whenever you like, without affecting what was done before. We reply within one month.",
          },
          {
            p: "If you think your data has not been handled properly, you can complain to the Portuguese data protection authority, CNPD (www.cnpd.pt).",
          },
        ],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: [
          {
            p: "For any request about your data, including removing a published photograph: info@9mesesfotografia.com or +351 967 716 894.",
          },
          {
            p: "As required by Portuguese law, the electronic Complaints Book is available at www.livroreclamacoes.pt.",
          },
        ],
      },
    ],
    crossLink: {
      text: "For what is stored in your browser, read the",
      link: "cookie policy",
      page: "cookies",
    },
  },
};

export const COOKIES: Record<Lang, Policy> = {
  pt: {
    lead: "Este site não usa cookies. Guarda apenas, no seu próprio navegador, duas pequenas informações para as funções que usa.",
    facts: [
      ["Cookies", "nenhum"],
      ["Rastreio", "não"],
      ["Publicidade", "não"],
    ],
    tocLabel: "Nesta página",
    sections: [
      {
        id: "no-navegador",
        title: "O que fica guardado no seu navegador",
        blocks: [
          {
            table: {
              head: ["Nome", "Para quê", "Onde", "Duração"],
              rows: [
                [
                  "9meses.theme",
                  "Lembrar se escolheu o tema claro ou escuro.",
                  "Memória local do navegador (localStorage), só neste site",
                  "Até a apagar",
                ],
                [
                  "contact",
                  "Guardar a hora do último envio do formulário, para travar envios repetidos (proteção contra spam do EmailJS).",
                  "Memória local do navegador (localStorage), só neste site",
                  "Até a apagar",
                ],
              ],
            },
          },
          {
            p: "Nada disto é um cookie e nada sai do seu computador ou telemóvel. Só fica guardado se mudar o tema ou enviar o formulário. Como é estritamente necessário para as funções que pede, não é preciso pedir consentimento nem mostrar um aviso de cookies.",
          },
        ],
      },
      {
        id: "terceiros",
        title: "Serviços de terceiros",
        blocks: [
          {
            ul: [
              "Letras: estão alojadas no próprio site. Não é feito nenhum pedido à Google nem a outros serviços de letras.",
              "Fotografias e vídeos: estão alojados no próprio site.",
              "Formulário: o serviço EmailJS só é contactado quando carrega em enviar.",
              "WhatsApp, Instagram, Facebook e Google Maps: os links abrem esses serviços; nada é carregado deles enquanto não carregar no link.",
              "Estatísticas: não usamos nenhuma ferramenta de estatísticas nem de rastreio.",
            ],
          },
        ],
      },
      {
        id: "apagar",
        title: "Como apagar tudo",
        blocks: [
          {
            p: "Pode usar o botão abaixo, ou apagar os dados deste site nas definições do navegador (por exemplo, \"Limpar dados de navegação\" no Chrome ou \"Gerir dados de sites\" no Safari).",
          },
        ],
      },
    ],
    crossLink: {
      text: "Sobre os dados que nos envia pelo formulário, leia a",
      link: "política de privacidade",
      page: "privacy",
    },
  },
  en: {
    lead: "This website does not use cookies. It only keeps two small pieces of information in your own browser, for features you use.",
    facts: [
      ["Cookies", "none"],
      ["Tracking", "no"],
      ["Advertising", "no"],
    ],
    tocLabel: "On this page",
    sections: [
      {
        id: "in-your-browser",
        title: "What is stored in your browser",
        blocks: [
          {
            table: {
              head: ["Name", "What for", "Where", "Duration"],
              rows: [
                [
                  "9meses.theme",
                  "Remembering whether you chose the light or dark theme.",
                  "Browser local storage (localStorage), this site only",
                  "Until you delete it",
                ],
                [
                  "contact",
                  "Keeping the time of your last form submission, to stop repeated sends (EmailJS spam protection).",
                  "Browser local storage (localStorage), this site only",
                  "Until you delete it",
                ],
              ],
            },
          },
          {
            p: "None of this is a cookie and nothing leaves your computer or phone. It is only stored if you change the theme or send the form. Because it is strictly necessary for features you ask for, no consent or cookie banner is needed.",
          },
        ],
      },
      {
        id: "third-parties",
        title: "Third-party services",
        blocks: [
          {
            ul: [
              "Fonts: hosted on this website. No request is made to Google or any other font service.",
              "Photographs and videos: hosted on this website.",
              "Form: EmailJS is only contacted when you press send.",
              "WhatsApp, Instagram, Facebook and Google Maps: the links open those services; nothing is loaded from them until you click.",
              "Statistics: we use no analytics or tracking tools.",
            ],
          },
        ],
      },
      {
        id: "delete",
        title: "How to delete everything",
        blocks: [
          {
            p: "Use the button below, or clear this site's data in your browser settings (for example \"Clear browsing data\" in Chrome or \"Manage website data\" in Safari).",
          },
        ],
      },
    ],
    crossLink: {
      text: "For the data you send us through the form, read the",
      link: "privacy policy",
      page: "privacy",
    },
  },
};
