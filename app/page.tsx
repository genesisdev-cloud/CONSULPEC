'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, ExternalLink,
  MapPin, Menu, Share2,
} from 'lucide-react';
import StickyScroll from '@/components/ui/sticky-scroll';

type Lang = 'es' | 'en' | 'pt';

const WHATSAPP_NUMBER = '595971164885';
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3607.584267240904!2d-57.61387632461522!3d-25.284566877654864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE3JzA0LjQiUyA1N8KwMzYnNDAuNyJX!5e0!3m2!1ses!2spy!4v1789385449760!5m2!1ses!2spy';
const MAP_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=-25.28455556,-57.61130556';

const requestCopy = {
  es: {
    kicker: 'Solicitud de servicio', title: 'Contanos qué necesita tu campo.',
    intro: 'Completá los datos y enviá tu solicitud por WhatsApp o correo para coordinar el siguiente paso.',
    name: 'Nombre y apellido', phone: 'Teléfono / WhatsApp', email: 'Correo electrónico',
    service: 'Servicio de interés', servicePlaceholder: 'Seleccioná un servicio', location: 'Departamento o localidad',
    message: '¿Qué necesitás resolver?', whatsappSubmit: 'Enviar por WhatsApp', emailSubmit: 'Enviar por correo',
    sending: 'Enviando solicitud…', success: 'Solicitud enviada correctamente. Te contactaremos pronto.',
    fallback: 'Se abrió tu aplicación de correo con la solicitud preparada.', error: 'No pudimos enviar la solicitud. Probá nuevamente o usá WhatsApp.',
    whatsappIntro: 'Hola Consulpec, quiero solicitar un servicio.', emailSubject: 'Solicitud de servicio',
  },
  en: {
    kicker: 'Service request', title: 'Tell us what your field needs.',
    intro: 'Complete the details and send your request by WhatsApp or email to arrange the next step.',
    name: 'Full name', phone: 'Phone / WhatsApp', email: 'Email address',
    service: 'Service of interest', servicePlaceholder: 'Select a service', location: 'Department or location',
    message: 'What do you need to solve?', whatsappSubmit: 'Send via WhatsApp', emailSubmit: 'Send via email',
    sending: 'Sending request…', success: 'Request sent successfully. We will contact you soon.',
    fallback: 'Your email app opened with the request ready to send.', error: 'We could not send the request. Please try again or use WhatsApp.',
    whatsappIntro: 'Hello Consulpec, I would like to request a service.', emailSubject: 'Service request',
  },
  pt: {
    kicker: 'Solicitação de serviço', title: 'Conte o que seu campo precisa.',
    intro: 'Preencha os dados e envie sua solicitação pelo WhatsApp ou e-mail para combinar o próximo passo.',
    name: 'Nome completo', phone: 'Telefone / WhatsApp', email: 'E-mail',
    service: 'Serviço de interesse', servicePlaceholder: 'Selecione um serviço', location: 'Departamento ou localidade',
    message: 'O que você precisa resolver?', whatsappSubmit: 'Enviar pelo WhatsApp', emailSubmit: 'Enviar por e-mail',
    sending: 'Enviando solicitação…', success: 'Solicitação enviada com sucesso. Entraremos em contato em breve.',
    fallback: 'Seu aplicativo de e-mail foi aberto com a solicitação pronta.', error: 'Não foi possível enviar a solicitação. Tente novamente ou use o WhatsApp.',
    whatsappIntro: 'Olá Consulpec, gostaria de solicitar um serviço.', emailSubject: 'Solicitação de serviço',
  },
} as const;

const articleImages = [
  { src: '/images/article-pastoreo.jpeg', position: '50% 58%' },
  { src: '/images/gallery/field-10.jpeg', position: '50% 55%' },
  { src: '/images/gallery/field-05.jpeg', position: '50% 43%' },
];

const copy = {
  es: {
    nav: ['Servicios', 'Galería', 'Contenido técnico'], quote: 'Coordinar una visita',
    menuLabel:'Menú', homeLabel:'Consulpec — Inicio', primaryNavLabel:'Navegación principal', languageLabel:'Idioma', footerNavLabel:'Navegación del pie', heroImageAlt:'Ganado de Consulpec en pastura', galleryImageAlt:'Trabajo de campo de Consulpec en Paraguay', galleryCountry:'Paraguay',
    stripWords:['RELEVAMIENTO','MAPEO','PRODUCCIÓN','INVERSIÓN','ACOMPAÑAMIENTO'], developedBy:'Desarrollado por', floatingMessage:'Hola Consulpec, visité su página web y quisiera recibir más información sobre sus servicios.',
    eyebrow: 'Inteligencia aplicada al campo', titleA: 'Decisiones de campo,', titleB: 'hechas visibles.',
    lead: 'Convertimos territorio, producción e inversión en un plan claro. Relevamos, mapeamos y acompañamos cada etapa para que el campo avance con datos.',
    how: 'Conocé cómo trabajamos', projectsLink: 'Recorrer la galería', active: 'Proyecto activo', parcel: 'Relevamiento de parcela', action: 'De la observación', concrete: 'a una acción concreta',
    metrics: ['Lectura del establecimiento', 'Acompañamiento técnico', 'Conocimiento local'],
    serviceKicker: 'Servicios', serviceTitle: 'Del terreno a una decisión que se puede ejecutar.', serviceIntro: 'Cada servicio combina visita de campo, lectura técnica y una entrega concreta. El cliente sabe qué se hará, cómo y con qué resultado documental.',
    services: [
      { n:'01', title:'Relevamiento y mapeo', desc:'Leemos el establecimiento en terreno y ordenamos la información espacial para detectar oportunidades y restricciones.', steps:['Visita y toma de datos','Georreferenciación y lectura de parcelas','Validación junto al productor'], deliver:'Mapa técnico + informe de hallazgos' },
      { n:'02', title:'Intensificación productiva', desc:'Diseñamos una hoja de ruta para aprovechar mejor pasturas, agua, infraestructura y manejo.', steps:['Diagnóstico productivo','Escenarios de mejora','Plan de implementación por etapas'], deliver:'Proyecto dimensionado + prioridades' },
      { n:'03', title:'Acompañamiento técnico', desc:'Seguimos la ejecución, medimos avances y ajustamos decisiones con el equipo del establecimiento.', steps:['Plan de trabajo','Visitas de seguimiento','Revisión de indicadores'], deliver:'Informe + recomendaciones accionables' },
      { n:'04', title:'Flujo de caja', desc:'Transformamos el proyecto técnico y financiero en una proyección clara de ingresos, egresos y necesidades de recursos a lo largo del tiempo.', steps:['Proyección de ingresos y egresos','Secuencia de desembolsos y cobros','Análisis de flujo de caja','Comparación de alternativas'], deliver:'Flujo de caja proyectado + escenario financiero recomendado' },
    ],
    process: 'Cómo trabajamos', processSteps: ['Escuchamos el objetivo', 'Medimos el campo', 'Diseñamos el proyecto', 'Acompañamos la ejecución'],
    galleryEyebrow:'Proyectos en campo', galleryTitle:'El campo cuenta su evolución.', galleryAccent:'Cada avance deja una huella.', galleryIntro:'Una mirada continua al campo, la infraestructura y las decisiones que convierten un establecimiento en un sistema productivo más claro.', galleryLocation:'Trabajo de campo · Paraguay',
    knowledgeKicker:'Contenido técnico', knowledgeTitle:'Ideas que siguen trabajando después de la visita.', knowledgeIntro:'Recomendaciones claras para guardar, compartir y llevar al campo.',
    articles:[
      {type:'Pastoreo', title:'Más pasto, más carne: por qué la cerca eléctrica mejora la eficiencia', time:'6 min'},
      {type:'Guía práctica', title:'Cómo dimensionar un sistema productivo sin sobredimensionar la inversión', time:'8 min'},
      {type:'Infraestructura', title:'Consulpec apunta a multiplicar la producción ganadera.', time:'4 min'},
    ],
    read:'Ver contenido', share:'Compartir', shareDone:'Enlace copiado',
    ctaTitle:'Nuestro catálogo', ctaText:'Conocé los componentes y accesorios disponibles para tu alambrado eléctrico.', ctaButton:'Ver catálogo',
    footer:'Consultoría de campo · Mapeo · Intensificación productiva', rights:'Consulpec Paraguay. Todos los derechos reservados.', mapTitle:'Encontranos en Asunción', mapAddress:'Asunción, Paraguay', mapDirections:'Cómo llegar', mapFrameTitle:'Ubicación de Consulpec E.A.S. en Google Maps',
  },
  en: {
    nav: ['Services', 'Gallery', 'Technical content'], quote: 'Arrange a field visit', eyebrow: 'Intelligence applied to the field', titleA: 'Field decisions,', titleB: 'made visible.', lead: 'We turn territory, production and investment into a clear plan. We survey, map and support each stage so your operation can move forward with data.', how: 'See how we work', projectsLink: 'Explore the gallery', active: 'Active project', parcel: 'Parcel survey', action: 'From observation', concrete: 'to concrete action', metrics: ['Whole-farm assessment', 'One-to-one technical support', 'Local expertise'],
    menuLabel:'Menu', homeLabel:'Consulpec — Home', primaryNavLabel:'Main navigation', languageLabel:'Language', footerNavLabel:'Footer navigation', heroImageAlt:'Consulpec cattle grazing', galleryImageAlt:'Consulpec field work in Paraguay', galleryCountry:'Paraguay',
    stripWords:['SURVEYING','MAPPING','PRODUCTION','INVESTMENT','TECHNICAL SUPPORT'], developedBy:'Developed by', floatingMessage:'Hello Consulpec, I visited your website and would like more information about your services.',
    serviceKicker:'Services', serviceTitle:'From the land to an executable decision.', serviceIntro:'Every service combines field work, technical analysis and a concrete deliverable. The client knows what will be done, how, and what documentation they will receive.',
    services:[
      {n:'01',title:'Surveying and mapping',desc:'We assess the property on site and organize spatial information to identify opportunities and constraints.',steps:['Field visit and data capture','Georeferencing and parcel analysis','Validation with the producer'],deliver:'Technical map + findings report'},
      {n:'02',title:'Production intensification',desc:'We design a roadmap to make better use of pasture, water, infrastructure and management.',steps:['Production diagnosis','Improvement scenarios','Phased implementation plan'],deliver:'Sized project + priorities'},
      {n:'03',title:'Technical support',desc:'We follow execution, measure progress and adjust decisions with the farm team.',steps:['Work plan','Follow-up visits','Indicator review'],deliver:'Report + actionable recommendations'},
      {n:'04',title:'Cash flow',desc:'We transform the technical and financial project into a clear projection of income, expenses and resource needs over time.',steps:['Income and expense projection','Disbursement and collection schedule','Cash flow analysis','Alternative comparison'],deliver:'Projected cash flow + recommended financial scenario'},
    ],
    process:'How we work',processSteps:['We understand the goal','We measure the field','We design the project','We support execution'],
    galleryEyebrow:'Projects in the field',galleryTitle:'The field tells the story of its evolution.',galleryAccent:'Every advance leaves a mark.',galleryIntro:'A continuous view of the field, infrastructure and the decisions that turn a property into a clearer production system.',galleryLocation:'Field work · Paraguay',
    knowledgeKicker:'Technical content',knowledgeTitle:'Ideas that keep working after the visit.',knowledgeIntro:'Clear recommendations to save, share and take into the field.',articles:[
      {type:'Grazing',title:'More pasture, more beef: why electric fencing improves efficiency',time:'6 min'},
      {type:'Practical guide',title:'How to size a production system without oversizing the investment',time:'8 min'},
      {type:'Infrastructure',title:'Consulpec aims to multiply livestock production.',time:'4 min'},
    ],
    read:'View content',share:'Share',shareDone:'Link copied',ctaTitle:'Our catalog',ctaText:'Explore the components and accessories available for your electric fencing.',ctaButton:'View catalog',footer:'Field consulting · Mapping · Production intensification',rights:'Consulpec Paraguay. All rights reserved.',mapTitle:'Find us in Asunción',mapAddress:'Asunción, Paraguay',mapDirections:'Get directions',mapFrameTitle:'Location of Consulpec E.A.S. on Google Maps',
  },
  pt: {
    nav:['Serviços','Galeria','Conteúdo técnico'],quote:'Agendar uma visita',eyebrow:'Inteligência aplicada ao campo',titleA:'Decisões de campo,',titleB:'tornadas visíveis.',lead:'Transformamos território, produção e investimento em um plano claro. Fazemos levantamentos, mapeamos e acompanhamos cada etapa para que o campo avance com dados.',how:'Conhecer nosso trabalho',projectsLink:'Explorar a galeria',active:'Projeto ativo',parcel:'Levantamento de parcela',action:'Da observação',concrete:'à ação concreta',metrics:['Leitura da propriedade','Acompanhamento técnico','Conhecimento local'],
    menuLabel:'Menu', homeLabel:'Consulpec — Início', primaryNavLabel:'Navegação principal', languageLabel:'Idioma', footerNavLabel:'Navegação do rodapé', heroImageAlt:'Gado da Consulpec em pastagem', galleryImageAlt:'Trabalho de campo da Consulpec no Paraguai', galleryCountry:'Paraguai',
    stripWords:['LEVANTAMENTO','MAPEAMENTO','PRODUÇÃO','INVESTIMENTO','ACOMPANHAMENTO'], developedBy:'Desenvolvido por', floatingMessage:'Olá Consulpec, visitei seu site e gostaria de receber mais informações sobre seus serviços.',
    serviceKicker:'Serviços',serviceTitle:'Do terreno a uma decisão executável.',serviceIntro:'Cada serviço combina visita de campo, leitura técnica e uma entrega concreta. O cliente sabe o que será feito, como e qual documentação receberá.',
    services:[
      {n:'01',title:'Levantamento e mapeamento',desc:'Avaliamos a propriedade no terreno e organizamos a informação espacial para detectar oportunidades e restrições.',steps:['Visita e coleta de dados','Georreferenciamento e leitura de parcelas','Validação com o produtor'],deliver:'Mapa técnico + relatório de achados'},
      {n:'02',title:'Intensificação produtiva',desc:'Desenhamos um roteiro para aproveitar melhor pastagens, água, infraestrutura e manejo.',steps:['Diagnóstico produtivo','Cenários de melhoria','Plano de implementação por etapas'],deliver:'Projeto dimensionado + prioridades'},
      {n:'03',title:'Acompanhamento técnico',desc:'Acompanhamos a execução, medimos avanços e ajustamos decisões com a equipe da propriedade.',steps:['Plano de trabalho','Visitas de acompanhamento','Revisão de indicadores'],deliver:'Relatório + recomendações práticas'},
      {n:'04',title:'Fluxo de caixa',desc:'Transformamos o projeto técnico e financeiro em uma projeção clara de receitas, despesas e necessidades de recursos ao longo do tempo.',steps:['Projeção de receitas e despesas','Sequência de desembolsos e recebimentos','Análise de fluxo de caixa','Comparação de alternativas'],deliver:'Fluxo de caixa projetado + cenário financeiro recomendado'},
    ],
    process:'Como trabalhamos',processSteps:['Entendemos o objetivo','Medimos o campo','Desenhamos o projeto','Acompanhamos a execução'],
    galleryEyebrow:'Projetos no campo',galleryTitle:'O campo conta a história da sua evolução.',galleryAccent:'Cada avanço deixa uma marca.',galleryIntro:'Um olhar contínuo sobre o campo, a infraestrutura e as decisões que transformam uma propriedade em um sistema produtivo mais claro.',galleryLocation:'Trabalho de campo · Paraguai',
    knowledgeKicker:'Conteúdo técnico',knowledgeTitle:'Ideias que continuam trabalhando após a visita.',knowledgeIntro:'Recomendações claras para salvar, compartilhar e levar ao campo.',articles:[
      {type:'Pastejo',title:'Mais pasto, mais carne: por que a cerca elétrica melhora a eficiência',time:'6 min'},
      {type:'Guia prático',title:'Como dimensionar um sistema produtivo sem superdimensionar o investimento',time:'8 min'},
      {type:'Infraestrutura',title:'A Consulpec busca multiplicar a produção pecuária.',time:'4 min'},
    ],
    read:'Ver conteúdo',share:'Compartilhar',shareDone:'Link copiado',ctaTitle:'Nosso catálogo',ctaText:'Conheça os componentes e acessórios disponíveis para sua cerca elétrica.',ctaButton:'Ver catálogo',footer:'Consultoria de campo · Mapeamento · Intensificação produtiva',rights:'Consulpec Paraguai. Todos os direitos reservados.',mapTitle:'Encontre-nos em Assunção',mapAddress:'Assunção, Paraguai',mapDirections:'Como chegar',mapFrameTitle:'Localização da Consulpec E.A.S. no Google Maps',
  },
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [shared, setShared] = useState<number | null>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const shareArticle = async (index: number, title: string) => {
    const url = `${window.location.origin}/#conocimiento`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await navigator.clipboard.writeText(url);
      setShared(index); setTimeout(() => setShared(null), 1800);
    } catch { /* sharing was cancelled */ }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand-logo" href="#inicio" aria-label={t.homeLabel}><img src="/logo-consulpec-mark.png" alt="Consulpec" /></a>
        <nav id="primary-navigation" className={menuOpen ? 'nav-open' : ''} aria-label={t.primaryNavLabel}>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
          <a href="#conocimiento" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" role="group" aria-label={t.languageLabel}>
            {(['es', 'en', 'pt'] as const).map((language) => <button className={lang === language ? 'active' : ''} type="button" key={language} onClick={() => setLang(language)} aria-pressed={lang === language}>{language.toUpperCase()}</button>)}
          </div>
          <button className="mobile-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menuLabel} aria-expanded={menuOpen} aria-controls="primary-navigation"><Menu size={21}/></button>
          <a className="quote-link" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{t.quote} <ArrowUpRight size={17} /></a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="hero-mark"><img src="/logo-consulpec-full.png" alt="Consulpec" /><span className="sr-only">{t.titleA} {t.titleB}</span></h1>
          <p className="hero-lead">{t.lead}</p>
          <div className="hero-cta"><a className="button-primary" href="#servicios">{t.how} <ArrowUpRight size={18} /></a></div>
        </div>
        <div className="hero-visual" aria-label={t.heroImageAlt}>
          <img src="/images/hero-cow.jpeg" alt={t.heroImageAlt} />
          <div className="map-card"><span className="map-pin"><MapPin size={17} /></span><div><small>{t.active}</small><strong>{t.parcel}</strong></div><span className="status-dot" /></div>
          <svg className="contour" viewBox="0 0 520 690" aria-hidden="true"><path d="M468 36C349 79 402 170 292 208C182 246 152 335 232 402C312 469 273 539 168 575C103 597 66 627 45 668" /><path d="M510 74C398 111 449 198 331 241C213 284 199 341 274 410C349 479 323 568 207 606C152 624 119 647 94 683" /></svg>
        </div>
      </section>

      <div className="field-strip" aria-hidden="true">{t.stripWords.map((word) => <span key={word}>{word}<i /></span>)}</div>

      <section className="section services" id="servicios">
        <div className="section-head section-head-single"><div><p className="section-kicker">{t.serviceKicker}</p><h2>{t.serviceTitle}</h2></div></div>
        <div className="service-grid">
          {t.services.map((service) => (
            <article className="service-card" key={service.n}>
              <h3>{service.title}</h3><p>{service.desc}</p>
              <ol>{service.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <div className="deliverable"><span><small>{service.n === '04' ? (lang === 'en' ? 'RESULT' : lang === 'pt' ? 'RESULTADO' : 'RESULTADO') : (lang === 'en' ? 'YOU RECEIVE' : lang === 'pt' ? 'VOCÊ RECEBE' : 'RECIBÍS')}</small>{service.deliver}</span></div>
            </article>
          ))}
        </div>
        <div className="process-row"><strong>{t.process}</strong>{t.processSteps.map((step, i) => <div className="process-step" key={step}><p>{step}</p>{i < 3 && <ArrowRight className="process-arrow" size={17}/>}</div>)}</div>
      </section>

      <div id="proyectos" className="gallery-anchor">
        <StickyScroll title={t.galleryTitle} accent={t.galleryAccent} intro={t.galleryIntro} request={requestCopy[lang]} services={t.services.map((service) => service.title)} whatsappNumber={WHATSAPP_NUMBER} galleryImageAlt={t.galleryImageAlt} galleryCountry={t.galleryCountry} />
      </div>

      <section className="section knowledge" id="conocimiento">
        <div className="section-head section-head-single"><div><p className="section-kicker">{t.knowledgeKicker}</p><h2>{t.knowledgeTitle}</h2></div></div>
        <div className="article-grid">{t.articles.map((article,index) => <article className="article-card" key={article.title}><div className="article-img"><img src={articleImages[index].src} style={{ objectPosition: articleImages[index].position }} alt={article.title}/><span>{article.type}</span></div><div className="article-body"><small>{article.time}</small><h3>{article.title}</h3><div><a href="https://www.instagram.com/consulpecpy/" target="_blank" rel="noreferrer">{t.read}<ExternalLink size={14}/></a><button type="button" onClick={() => shareArticle(index,article.title)}><Share2 size={14}/>{shared === index ? t.shareDone : t.share}</button></div></div></article>)}</div>
      </section>

      <section className="closing-cta catalog-cta" id="catalogo"><p className="section-kicker">Consulpec</p><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><Link href="/catalogo">{t.ctaButton}<ArrowUpRight size={18}/></Link></section>

      <footer>
        <div className="footer-left">
          <a className="brand-logo footer-logo" href="#inicio" aria-label={t.homeLabel}><img src="/logo-consulpec-mark.png" alt="Consulpec" /></a>
          <div className="footer-socials">
            <a className="social-button" href="https://www.instagram.com/consulpecpy/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><img className="social-logo" src="https://cdn.simpleicons.org/instagram/a8e84a" alt=""/></a>
            <a className="social-button whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><img className="social-logo" src="https://cdn.simpleicons.org/whatsapp/ffffff" alt=""/></a>
          </div>
          <span className="footer-rights">© 2026 {t.rights}</span>
        </div>
        <section className="footer-map" aria-labelledby="footer-map-title">
          <div className="footer-map-head">
            <span className="footer-map-pin" aria-hidden="true"><MapPin size={19}/></span>
            <div>
              <h2 id="footer-map-title">{t.mapTitle}</h2>
              <p>{t.mapAddress}</p>
            </div>
            <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noreferrer">{t.mapDirections}<ArrowUpRight size={15}/></a>
          </div>
          <iframe
            src={MAP_EMBED_URL}
            title={t.mapFrameTitle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
        <a className="genesis-credit" href="https://www.genesis.com.py/" target="_blank" rel="noreferrer">{t.developedBy} <strong>Génesis</strong><ArrowUpRight size={15}/></a>
      </footer>

      <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.floatingMessage)}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" /></a>
    </main>
  );
}
