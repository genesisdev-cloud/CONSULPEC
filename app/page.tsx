'use client';

import { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, ClipboardCheck,
  ExternalLink, Layers3, Map, MapPin, Menu, MessageCircle, PackageCheck,
  ScanLine, Share2, Tractor,
} from 'lucide-react';
import StickyScroll from '@/components/ui/sticky-scroll';

type Lang = 'es' | 'en' | 'pt';

const articleImages = [
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&auto=format&fit=crop&q=84',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=84',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&auto=format&fit=crop&q=84',
];

const copy = {
  es: {
    nav: ['Servicios', 'Galería', 'Contenido técnico'], quote: 'Coordinar una visita',
    eyebrow: 'Inteligencia aplicada al campo', titleA: 'Decisiones de campo,', titleB: 'hechas visibles.',
    lead: 'Convertimos territorio, producción e inversión en un plan claro. Relevamos, mapeamos y acompañamos cada etapa para que el campo avance con datos.',
    how: 'Conocer cómo trabajamos', projectsLink: 'Recorrer la galería', active: 'Proyecto activo', parcel: 'Relevamiento de parcela', action: 'De la observación', concrete: 'a una acción concreta',
    metrics: ['Lectura del establecimiento', 'Acompañamiento técnico', 'Conocimiento local'],
    serviceKicker: 'Servicios', serviceTitle: 'Del terreno a una decisión que se puede ejecutar.', serviceIntro: 'Cada servicio combina visita de campo, lectura técnica y una entrega concreta. El cliente sabe qué se hará, cómo y con qué resultado documental.',
    services: [
      { n:'01', title:'Relevamiento y mapeo', desc:'Leemos el establecimiento en terreno y ordenamos la información espacial para detectar oportunidades y restricciones.', steps:['Visita y toma de datos','Georreferenciación y lectura de parcelas','Validación junto al productor'], deliver:'Mapa técnico + informe de hallazgos' },
      { n:'02', title:'Intensificación productiva', desc:'Diseñamos una hoja de ruta para aprovechar mejor pasturas, agua, infraestructura y manejo.', steps:['Diagnóstico productivo','Escenarios de mejora','Plan de implementación por etapas'], deliver:'Proyecto dimensionado + prioridades' },
      { n:'03', title:'Acompañamiento técnico', desc:'Seguimos la ejecución, medimos avances y ajustamos decisiones con el equipo del establecimiento.', steps:['Plan de trabajo','Visitas de seguimiento','Revisión de indicadores'], deliver:'Bitácora + recomendaciones accionables' },
      { n:'04', title:'Flujos de inversión', desc:'Traducimos el proyecto técnico a necesidades de inversión para ordenar tiempos y recursos.', steps:['Presupuesto por componentes','Secuencia de desembolsos','Comparación de alternativas'], deliver:'Flujo de inversión + escenario recomendado' },
    ],
    process: 'Cómo trabajamos', processSteps: ['Escuchamos el objetivo', 'Medimos el campo', 'Diseñamos el proyecto', 'Acompañamos la ejecución'],
    galleryEyebrow:'Proyectos en campo', galleryTitle:'El trabajo se mide.', galleryAccent:'También se puede ver.', galleryIntro:'Una mirada continua al territorio, la infraestructura y las decisiones que convierten un establecimiento en un sistema productivo más claro.', galleryLocation:'Trabajo de campo · Paraguay',
    knowledgeKicker:'Contenido técnico', knowledgeTitle:'Ideas que siguen trabajando después de la visita.', knowledgeIntro:'Recomendaciones claras para guardar, compartir y llevar al campo.',
    articles:[
      {type:'Pastoreo', title:'Más pasto, más carne: por qué la cerca eléctrica mejora la eficiencia', time:'6 min'},
      {type:'Guía práctica', title:'Cómo dimensionar un sistema productivo sin sobredimensionar la inversión', time:'8 min'},
      {type:'Infraestructura', title:'Cinco puntos de control antes de habilitar una nueva parcela', time:'4 min'},
    ],
    read:'Ver contenido', share:'Compartir', shareDone:'Enlace copiado',
    ctaTitle:'Tu campo ya tiene información. Hagamos que trabaje a tu favor.', ctaText:'Contanos qué querés mejorar y coordinamos una primera conversación.', ctaButton:'Hablar con Consulpec',
    footer:'Consultoría de campo · Mapeo · Intensificación productiva', rights:'Consulpec Paraguay. Todos los derechos reservados.',
  },
  en: {
    nav: ['Services', 'Gallery', 'Technical content'], quote: 'Arrange a field visit', eyebrow: 'Intelligence applied to the field', titleA: 'Field decisions,', titleB: 'made visible.', lead: 'We turn territory, production and investment into a clear plan. We survey, map and support each stage so your operation can move forward with data.', how: 'See how we work', projectsLink: 'Explore the gallery', active: 'Active project', parcel: 'Parcel survey', action: 'From observation', concrete: 'to concrete action', metrics: ['Whole-farm assessment', 'One-to-one technical support', 'Local expertise'],
    serviceKicker:'Services', serviceTitle:'From the land to an executable decision.', serviceIntro:'Every service combines field work, technical analysis and a concrete deliverable. The client knows what will be done, how, and what documentation they will receive.',
    services:[
      {n:'01',title:'Surveying and mapping',desc:'We assess the property on site and organize spatial information to identify opportunities and constraints.',steps:['Field visit and data capture','Georeferencing and parcel analysis','Validation with the producer'],deliver:'Technical map + findings report'},
      {n:'02',title:'Production intensification',desc:'We design a roadmap to make better use of pasture, water, infrastructure and management.',steps:['Production diagnosis','Improvement scenarios','Phased implementation plan'],deliver:'Sized project + priorities'},
      {n:'03',title:'Technical support',desc:'We follow execution, measure progress and adjust decisions with the farm team.',steps:['Work plan','Follow-up visits','Indicator review'],deliver:'Project log + actionable recommendations'},
      {n:'04',title:'Investment flows',desc:'We translate the technical project into investment needs to organize timing and resources.',steps:['Component-based budget','Disbursement sequence','Alternative comparison'],deliver:'Investment flow + recommended scenario'},
    ],
    process:'How we work',processSteps:['We understand the goal','We measure the field','We design the project','We support execution'],
    galleryEyebrow:'Projects in the field',galleryTitle:'The work is measured.',galleryAccent:'It can also be seen.',galleryIntro:'A continuous view of territory, infrastructure and the decisions that turn a property into a clearer production system.',galleryLocation:'Field work · Paraguay',
    knowledgeKicker:'Technical content',knowledgeTitle:'Ideas that keep working after the visit.',knowledgeIntro:'Clear recommendations to save, share and take into the field.',articles:[
      {type:'Grazing',title:'More pasture, more beef: why electric fencing improves efficiency',time:'6 min'},
      {type:'Practical guide',title:'How to size a production system without oversizing the investment',time:'8 min'},
      {type:'Infrastructure',title:'Five checkpoints before opening a new parcel',time:'4 min'},
    ],
    read:'View content',share:'Share',shareDone:'Link copied',ctaTitle:'Your field already has information. Let’s put it to work.',ctaText:'Tell us what you want to improve and we will arrange a first conversation.',ctaButton:'Talk to Consulpec',footer:'Field consulting · Mapping · Production intensification',rights:'Consulpec Paraguay. All rights reserved.',
  },
  pt: {
    nav:['Serviços','Galeria','Conteúdo técnico'],quote:'Agendar uma visita',eyebrow:'Inteligência aplicada ao campo',titleA:'Decisões de campo,',titleB:'tornadas visíveis.',lead:'Transformamos território, produção e investimento em um plano claro. Fazemos levantamentos, mapeamos e acompanhamos cada etapa para que o campo avance com dados.',how:'Conhecer nosso trabalho',projectsLink:'Explorar a galeria',active:'Projeto ativo',parcel:'Levantamento de parcela',action:'Da observação',concrete:'à ação concreta',metrics:['Leitura da propriedade','Acompanhamento técnico','Conhecimento local'],
    serviceKicker:'Serviços',serviceTitle:'Do terreno a uma decisão executável.',serviceIntro:'Cada serviço combina visita de campo, leitura técnica e uma entrega concreta. O cliente sabe o que será feito, como e qual documentação receberá.',
    services:[
      {n:'01',title:'Levantamento e mapeamento',desc:'Avaliamos a propriedade no terreno e organizamos a informação espacial para detectar oportunidades e restrições.',steps:['Visita e coleta de dados','Georreferenciamento e leitura de parcelas','Validação com o produtor'],deliver:'Mapa técnico + relatório de achados'},
      {n:'02',title:'Intensificação produtiva',desc:'Desenhamos um roteiro para aproveitar melhor pastagens, água, infraestrutura e manejo.',steps:['Diagnóstico produtivo','Cenários de melhoria','Plano de implementação por etapas'],deliver:'Projeto dimensionado + prioridades'},
      {n:'03',title:'Acompanhamento técnico',desc:'Acompanhamos a execução, medimos avanços e ajustamos decisões com a equipe da propriedade.',steps:['Plano de trabalho','Visitas de acompanhamento','Revisão de indicadores'],deliver:'Registro + recomendações práticas'},
      {n:'04',title:'Fluxos de investimento',desc:'Traduzimos o projeto técnico em necessidades de investimento para organizar prazos e recursos.',steps:['Orçamento por componentes','Sequência de desembolsos','Comparação de alternativas'],deliver:'Fluxo de investimento + cenário recomendado'},
    ],
    process:'Como trabalhamos',processSteps:['Entendemos o objetivo','Medimos o campo','Desenhamos o projeto','Acompanhamos a execução'],
    galleryEyebrow:'Projetos no campo',galleryTitle:'O trabalho é medido.',galleryAccent:'E também pode ser visto.',galleryIntro:'Um olhar contínuo sobre território, infraestrutura e decisões que transformam uma propriedade em um sistema produtivo mais claro.',galleryLocation:'Trabalho de campo · Paraguai',
    knowledgeKicker:'Conteúdo técnico',knowledgeTitle:'Ideias que continuam trabalhando após a visita.',knowledgeIntro:'Recomendações claras para salvar, compartilhar e levar ao campo.',articles:[
      {type:'Pastejo',title:'Mais pasto, mais carne: por que a cerca elétrica melhora a eficiência',time:'6 min'},
      {type:'Guia prático',title:'Como dimensionar um sistema produtivo sem superdimensionar o investimento',time:'8 min'},
      {type:'Infraestrutura',title:'Cinco pontos de controle antes de habilitar uma nova parcela',time:'4 min'},
    ],
    read:'Ver conteúdo',share:'Compartilhar',shareDone:'Link copiado',ctaTitle:'Seu campo já tem informação. Vamos colocá-la para trabalhar.',ctaText:'Conte o que deseja melhorar e marcaremos uma primeira conversa.',ctaButton:'Falar com a Consulpec',footer:'Consultoria de campo · Mapeamento · Intensificação produtiva',rights:'Consulpec Paraguai. Todos os direitos reservados.',
  },
} as const;

const stripWords = ['RELEVAMIENTO', 'MAPEO', 'PRODUCCIÓN', 'INVERSIÓN', 'ACOMPAÑAMIENTO'];

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [shared, setShared] = useState<number | null>(null);
  const t = copy[lang];

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
        <a className="brand" href="#inicio" aria-label="Consulpec — Inicio"><span className="brand-mark"><ScanLine size={23} strokeWidth={2.4} /></span><span>CONSULPEC</span></a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
          <a href="#conocimiento" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
        </nav>
        <div className="header-actions">
          <label className="language"><span className="sr-only">Language</span><select value={lang} onChange={(e) => setLang(e.target.value as Lang)}><option value="es">ES</option><option value="en">EN</option><option value="pt">PT</option></select><ChevronDown size={14} /></label>
          <button className="mobile-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={21}/></button>
          <a className="quote-link" href="https://wa.me/595981413587" target="_blank" rel="noreferrer">{t.quote} <ArrowUpRight size={17} /></a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span /> {t.eyebrow}</div>
          <h1>{t.titleA} <em>{t.titleB}</em></h1>
          <p className="hero-lead">{t.lead}</p>
          <div className="hero-cta"><a className="button-primary" href="#servicios">{t.how} <ArrowUpRight size={18} /></a><a className="text-link" href="#proyectos">{t.projectsLink}</a></div>
          <div className="hero-metrics" aria-label="Indicadores destacados"><div><strong>360°</strong><span>{t.metrics[0]}</span></div><div><strong>1:1</strong><span>{t.metrics[1]}</span></div><div><strong>PY</strong><span>{t.metrics[2]}</span></div></div>
        </div>
        <div className="hero-visual" aria-label="Trabajo de campo y alambrado eléctrico">
          <img src="/campo-consulpec.jpg" alt="Instalación rural de alambrado eléctrico en Paraguay" />
          <div className="map-card"><span className="map-pin"><MapPin size={17} /></span><div><small>{t.active}</small><strong>{t.parcel}</strong></div><span className="status-dot" /></div>
          <svg className="contour" viewBox="0 0 520 690" aria-hidden="true"><path d="M468 36C349 79 402 170 292 208C182 246 152 335 232 402C312 469 273 539 168 575C103 597 66 627 45 668" /><path d="M510 74C398 111 449 198 331 241C213 284 199 341 274 410C349 479 323 568 207 606C152 624 119 647 94 683" /></svg>
          <div className="floating-note"><MessageCircle size={18} /><span>{t.action}<br/><strong>{t.concrete}</strong></span></div>
        </div>
      </section>

      <div className="field-strip" aria-hidden="true">{stripWords.map((word) => <span key={word}>{word}<i /></span>)}</div>

      <section className="section services" id="servicios">
        <div className="section-head"><div><p className="section-kicker">{t.serviceKicker}</p><h2>{t.serviceTitle}</h2></div><p>{t.serviceIntro}</p></div>
        <div className="service-grid">
          {t.services.map((service, index) => (
            <article className="service-card" key={service.n}>
              <div className="service-icon">{[<Map key="a"/>,<Tractor key="b"/>,<ClipboardCheck key="c"/>,<BarChart3 key="d"/>][index]}</div>
              <span className="service-number">{service.n}</span><h3>{service.title}</h3><p>{service.desc}</p>
              <ol>{service.steps.map((step) => <li key={step}><Check size={13}/>{step}</li>)}</ol>
              <div className="deliverable"><PackageCheck size={17}/><span><small>{lang === 'en' ? 'YOU RECEIVE' : lang === 'pt' ? 'VOCÊ RECEBE' : 'RECIBÍS'}</small>{service.deliver}</span></div>
            </article>
          ))}
        </div>
        <div className="process-row"><strong>{t.process}</strong>{t.processSteps.map((step, i) => <div key={step}><span>0{i+1}</span><p>{step}</p>{i < 3 && <ArrowRight size={16}/>}</div>)}</div>
      </section>

      <div id="proyectos" className="gallery-anchor">
        <StickyScroll eyebrow={t.galleryEyebrow} title={t.galleryTitle} accent={t.galleryAccent} intro={t.galleryIntro} locationLabel={t.galleryLocation} />
      </div>

      <section className="section knowledge" id="conocimiento">
        <div className="section-head"><div><p className="section-kicker">{t.knowledgeKicker}</p><h2>{t.knowledgeTitle}</h2></div><p>{t.knowledgeIntro}</p></div>
        <div className="article-grid">{t.articles.map((article,index) => <article className="article-card" key={article.title}><div className="article-img"><img src={articleImages[index]} alt="Trabajo de campo"/><span>{article.type}</span></div><div className="article-body"><small>{article.time}</small><h3>{article.title}</h3><div><a href="https://www.instagram.com/consulpecpy/" target="_blank" rel="noreferrer">{t.read}<ExternalLink size={14}/></a><button type="button" onClick={() => shareArticle(index,article.title)}><Share2 size={14}/>{shared === index ? t.shareDone : t.share}</button></div></div></article>)}</div>
      </section>

      <section className="closing-cta" id="contacto"><div className="cta-orbit"><Layers3 size={35}/></div><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><a href="https://wa.me/595981413587" target="_blank" rel="noreferrer">{t.ctaButton}<ArrowUpRight size={18}/></a></section>

      <footer><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><ScanLine size={23}/></span><span>CONSULPEC</span></a><p>{t.footer}</p><div><a href="https://www.instagram.com/consulpecpy/" target="_blank" rel="noreferrer">Instagram</a><a href="#proyectos">{t.nav[1]}</a><span>© 2026 {t.rights}</span></div></footer>
    </main>
  );
}
