'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, ClipboardCheck,
  Download, ExternalLink, FileText, Layers3, Map, MapPin, Menu, MessageCircle,
  Minus, PackageCheck, Plus, ScanLine, Share2, ShoppingBag, Tractor, X,
} from 'lucide-react';

type Lang = 'es' | 'en' | 'pt';

const copy = {
  es: {
    nav: ['Servicios', 'Proyectos', 'Insumos', 'Contenido técnico'], quote: 'Solicitar cotización',
    eyebrow: 'Inteligencia aplicada al campo', titleA: 'Decisiones de campo,', titleB: 'hechas visibles.',
    lead: 'Convertimos territorio, producción e inversión en un plan claro. Relevamos, mapeamos y acompañamos cada etapa para que el campo avance con datos.',
    how: 'Conocer cómo trabajamos', projectsLink: 'Ver proyectos documentados', active: 'Proyecto activo', parcel: 'Relevamiento de parcela', action: 'De la observación', concrete: 'a una acción concreta',
    metrics: ['Lectura del establecimiento', 'Acompañamiento técnico', 'Conocimiento local'],
    serviceKicker: 'Servicios', serviceTitle: 'Del terreno a una decisión que se puede ejecutar.', serviceIntro: 'Cada servicio combina visita de campo, lectura técnica y una entrega concreta. El cliente sabe qué se hará, cómo y con qué resultado documental.',
    services: [
      { n:'01', title:'Relevamiento y mapeo', desc:'Leemos el establecimiento en terreno y ordenamos la información espacial para detectar oportunidades y restricciones.', steps:['Visita y toma de datos','Georreferenciación y lectura de parcelas','Validación junto al productor'], deliver:'Mapa técnico + informe de hallazgos' },
      { n:'02', title:'Intensificación productiva', desc:'Diseñamos una hoja de ruta para aprovechar mejor pasturas, agua, infraestructura y manejo.', steps:['Diagnóstico productivo','Escenarios de mejora','Plan de implementación por etapas'], deliver:'Proyecto dimensionado + prioridades' },
      { n:'03', title:'Acompañamiento técnico', desc:'Seguimos la ejecución, medimos avances y ajustamos decisiones con el equipo del establecimiento.', steps:['Plan de trabajo','Visitas de seguimiento','Revisión de indicadores'], deliver:'Bitácora + recomendaciones accionables' },
      { n:'04', title:'Flujos de inversión', desc:'Traducimos el proyecto técnico a necesidades de inversión para ordenar tiempos y recursos.', steps:['Presupuesto por componentes','Secuencia de desembolsos','Comparación de alternativas'], deliver:'Flujo de inversión + escenario recomendado' },
    ],
    process: 'Cómo trabajamos', processSteps: ['Escuchamos el objetivo', 'Medimos el campo', 'Diseñamos el proyecto', 'Acompañamos la ejecución'],
    projectKicker:'Proyectos', projectTitle:'Trabajo documentado, no promesas.', projectIntro:'Mapas, registros y resultados se publican únicamente con autorización. Estos casos muestran el tipo de evidencia que recibe el cliente.',
    projectCards: [
      { tag:'Producción', title:'Intensificación ovina', result:'Planificación e infraestructura para una ganadería más eficiente.', deliver:'Diagnóstico · diseño · acompañamiento', img:'/instagram-intensificacion.jpg' },
      { tag:'Infraestructura', title:'Dimensionamiento de cercas', result:'Sectorización del pastoreo y presupuesto adaptado al establecimiento.', deliver:'Plano · materiales · etapas', img:'/campo-consulpec.jpg' },
      { tag:'Alianza técnica', title:'Soluciones integrales Campo Fe', result:'Capacidades complementarias orientadas a eficiencia e intensificación.', deliver:'Plan conjunto · ejecución coordinada', img:'/instagram-proyecto.jpg' },
    ],
    authorized: 'Publicado con autorización', openCase: 'Ver ficha del proyecto', mapLabel:'Mapa del proyecto',
    catalogKicker:'Catálogo de insumos', catalogTitle:'Elegí todo lo que necesitás. Consultá una sola vez.', catalogIntro:'Sumá varios productos, ajustá cantidades y enviá una consulta comercial consolidada por WhatsApp.', download:'Abrir catálogo completo', add:'Agregar', added:'Agregado', unit:'unid.',
    products: [
      { id:'kit40', name:'Kit solar 40 km', category:'Electrificadores', spec:'Hasta 500 ha · batería 12V 7Ah · panel 5W', image:'/catalogo-electrificadores.jpg' },
      { id:'kit60', name:'Kit solar 60 km', category:'Electrificadores', spec:'Hasta 1.000 ha · batería 12V 12Ah · panel 10W', image:'/catalogo-electrificadores.jpg' },
      { id:'kit120', name:'Kit solar 120 km', category:'Electrificadores', spec:'10.000 V · más de 4 joules reales', image:'/catalogo-electrificadores.jpg' },
      { id:'hilo', name:'Hilo electroplástico', category:'Conductores', spec:'500 o 700 m · 9 hebras · resistencia UV', image:'/catalogo-accesorios.jpg' },
      { id:'varilla', name:'Varilla de fibra de vidrio', category:'Accesorios', spec:'1,20 o 1,60 m · líneas móviles', image:'/catalogo-accesorios.jpg' },
      { id:'voltimetro', name:'Voltímetro digital Peón', category:'Medición', spec:'Control rápido del sistema eléctrico', image:'/catalogo-baterias.jpg' },
    ],
    knowledgeKicker:'Contenido técnico', knowledgeTitle:'Ideas que siguen trabajando después de la visita.', knowledgeIntro:'Recomendaciones claras para guardar, compartir y llevar al campo.',
    articles:[
      {type:'Pastoreo', title:'Más pasto, más carne: por qué la cerca eléctrica mejora la eficiencia', time:'6 min', img:'/instagram-articulo.jpg'},
      {type:'Guía práctica', title:'Cómo dimensionar un sistema de cerca eléctrica sin sobredimensionar la inversión', time:'8 min', img:'/campo-consulpec.jpg'},
      {type:'Infraestructura', title:'Cinco puntos de control antes de energizar una nueva parcela', time:'4 min', img:'/instagram-intensificacion.jpg'},
    ],
    read:'Leer recomendación', share:'Compartir', shareDone:'Enlace copiado',
    ctaTitle:'Tu campo ya tiene información. Hagamos que trabaje a tu favor.', ctaText:'Contanos qué querés mejorar y coordinamos una primera conversación.', ctaButton:'Hablar con Consulpec',
    cartTitle:'Consulta de insumos', cartEmpty:'Todavía no agregaste productos.', cartHint:'Elegí uno o varios insumos del catálogo.', send:'Enviar consulta por WhatsApp', clear:'Limpiar selección', items:'productos',
    whatsappIntro:'Hola Consulpec, quisiera consultar por estos insumos:', footer:'Consultoría de campo · Mapeo · Intensificación · Insumos', rights:'Consulpec Paraguay. Todos los derechos reservados.',
  },
  en: {
    nav: ['Services', 'Projects', 'Supplies', 'Technical content'], quote: 'Request a quote', eyebrow: 'Intelligence applied to the field', titleA: 'Field decisions,', titleB: 'made visible.', lead: 'We turn territory, production and investment into a clear plan. We survey, map and support each stage so your operation can move forward with data.', how: 'See how we work', projectsLink: 'View documented projects', active: 'Active project', parcel: 'Parcel survey', action: 'From observation', concrete: 'to concrete action', metrics: ['Whole-farm assessment', 'One-to-one technical support', 'Local expertise'],
    serviceKicker:'Services', serviceTitle:'From the land to an executable decision.', serviceIntro:'Every service combines field work, technical analysis and a concrete deliverable. The client knows what will be done, how, and what documentation they will receive.',
    services:[
      {n:'01',title:'Surveying and mapping',desc:'We assess the property on site and organize spatial information to identify opportunities and constraints.',steps:['Field visit and data capture','Georeferencing and parcel analysis','Validation with the producer'],deliver:'Technical map + findings report'},
      {n:'02',title:'Production intensification',desc:'We design a roadmap to make better use of pasture, water, infrastructure and management.',steps:['Production diagnosis','Improvement scenarios','Phased implementation plan'],deliver:'Sized project + priorities'},
      {n:'03',title:'Technical support',desc:'We follow execution, measure progress and adjust decisions with the farm team.',steps:['Work plan','Follow-up visits','Indicator review'],deliver:'Project log + actionable recommendations'},
      {n:'04',title:'Investment flows',desc:'We translate the technical project into investment needs to organize timing and resources.',steps:['Component-based budget','Disbursement sequence','Alternative comparison'],deliver:'Investment flow + recommended scenario'},
    ],
    process:'How we work',processSteps:['We understand the goal','We measure the field','We design the project','We support execution'], projectKicker:'Projects',projectTitle:'Documented work, not promises.',projectIntro:'Maps, records and results are published only with authorization. These cases show the kind of evidence the client receives.',
    projectCards:[
      {tag:'Production',title:'Sheep intensification',result:'Planning and infrastructure for more efficient livestock production.',deliver:'Diagnosis · design · support',img:'/instagram-intensificacion.jpg'},
      {tag:'Infrastructure',title:'Electric fence sizing',result:'Grazing segmentation and a budget adapted to the property.',deliver:'Plan · materials · phases',img:'/campo-consulpec.jpg'},
      {tag:'Technical alliance',title:'Integrated Campo Fe solutions',result:'Complementary capabilities focused on efficiency and intensification.',deliver:'Joint plan · coordinated execution',img:'/instagram-proyecto.jpg'},
    ],
    authorized:'Published with authorization',openCase:'View project sheet',mapLabel:'Project map', catalogKicker:'Supply catalog',catalogTitle:'Choose everything you need. Ask once.',catalogIntro:'Add several products, adjust quantities and send one consolidated commercial inquiry through WhatsApp.',download:'Open full catalog',add:'Add',added:'Added',unit:'units',
    products:[
      {id:'kit40',name:'40 km solar kit',category:'Energizers',spec:'Up to 500 ha · 12V 7Ah battery · 5W panel',image:'/catalogo-electrificadores.jpg'},
      {id:'kit60',name:'60 km solar kit',category:'Energizers',spec:'Up to 1,000 ha · 12V 12Ah battery · 10W panel',image:'/catalogo-electrificadores.jpg'},
      {id:'kit120',name:'120 km solar kit',category:'Energizers',spec:'10,000 V · more than 4 real joules',image:'/catalogo-electrificadores.jpg'},
      {id:'hilo',name:'Electric polywire',category:'Conductors',spec:'500 or 700 m · 9 strands · UV resistant',image:'/catalogo-accesorios.jpg'},
      {id:'varilla',name:'Fiberglass post',category:'Accessories',spec:'1.20 or 1.60 m · mobile lines',image:'/catalogo-accesorios.jpg'},
      {id:'voltimetro',name:'Peón digital voltmeter',category:'Measurement',spec:'Fast electric-system testing',image:'/catalogo-baterias.jpg'},
    ],
    knowledgeKicker:'Technical content',knowledgeTitle:'Ideas that keep working after the visit.',knowledgeIntro:'Clear recommendations to save, share and take into the field.',articles:[
      {type:'Grazing',title:'More pasture, more beef: why electric fencing improves efficiency',time:'6 min',img:'/instagram-articulo.jpg'},
      {type:'Practical guide',title:'How to size an electric fence without oversizing the investment',time:'8 min',img:'/campo-consulpec.jpg'},
      {type:'Infrastructure',title:'Five checkpoints before energizing a new parcel',time:'4 min',img:'/instagram-intensificacion.jpg'},
    ],
    read:'Read recommendation',share:'Share',shareDone:'Link copied',ctaTitle:'Your field already has information. Let’s put it to work.',ctaText:'Tell us what you want to improve and we will arrange a first conversation.',ctaButton:'Talk to Consulpec',cartTitle:'Supply inquiry',cartEmpty:'You have not added products yet.',cartHint:'Choose one or more supplies from the catalog.',send:'Send inquiry via WhatsApp',clear:'Clear selection',items:'products',whatsappIntro:'Hello Consulpec, I would like to inquire about these supplies:',footer:'Field consulting · Mapping · Intensification · Supplies',rights:'Consulpec Paraguay. All rights reserved.',
  },
  pt: {
    nav:['Serviços','Projetos','Insumos','Conteúdo técnico'],quote:'Solicitar orçamento',eyebrow:'Inteligência aplicada ao campo',titleA:'Decisões de campo,',titleB:'tornadas visíveis.',lead:'Transformamos território, produção e investimento em um plano claro. Fazemos levantamentos, mapeamos e acompanhamos cada etapa para que o campo avance com dados.',how:'Conhecer nosso trabalho',projectsLink:'Ver projetos documentados',active:'Projeto ativo',parcel:'Levantamento de parcela',action:'Da observação',concrete:'à ação concreta',metrics:['Leitura da propriedade','Acompanhamento técnico','Conhecimento local'],
    serviceKicker:'Serviços',serviceTitle:'Do terreno a uma decisão executável.',serviceIntro:'Cada serviço combina visita de campo, leitura técnica e uma entrega concreta. O cliente sabe o que será feito, como e qual documentação receberá.',
    services:[
      {n:'01',title:'Levantamento e mapeamento',desc:'Avaliamos a propriedade no terreno e organizamos a informação espacial para detectar oportunidades e restrições.',steps:['Visita e coleta de dados','Georreferenciamento e leitura de parcelas','Validação com o produtor'],deliver:'Mapa técnico + relatório de achados'},
      {n:'02',title:'Intensificação produtiva',desc:'Desenhamos um roteiro para aproveitar melhor pastagens, água, infraestrutura e manejo.',steps:['Diagnóstico produtivo','Cenários de melhoria','Plano de implementação por etapas'],deliver:'Projeto dimensionado + prioridades'},
      {n:'03',title:'Acompanhamento técnico',desc:'Acompanhamos a execução, medimos avanços e ajustamos decisões com a equipe da propriedade.',steps:['Plano de trabalho','Visitas de acompanhamento','Revisão de indicadores'],deliver:'Registro + recomendações práticas'},
      {n:'04',title:'Fluxos de investimento',desc:'Traduzimos o projeto técnico em necessidades de investimento para organizar prazos e recursos.',steps:['Orçamento por componentes','Sequência de desembolsos','Comparação de alternativas'],deliver:'Fluxo de investimento + cenário recomendado'},
    ],
    process:'Como trabalhamos',processSteps:['Entendemos o objetivo','Medimos o campo','Desenhamos o projeto','Acompanhamos a execução'],projectKicker:'Projetos',projectTitle:'Trabalho documentado, não promessas.',projectIntro:'Mapas, registros e resultados são publicados somente com autorização. Estes casos mostram o tipo de evidência que o cliente recebe.',
    projectCards:[
      {tag:'Produção',title:'Intensificação ovina',result:'Planejamento e infraestrutura para uma pecuária mais eficiente.',deliver:'Diagnóstico · desenho · acompanhamento',img:'/instagram-intensificacion.jpg'},
      {tag:'Infraestrutura',title:'Dimensionamento de cercas',result:'Setorização do pastejo e orçamento adaptado à propriedade.',deliver:'Planta · materiais · etapas',img:'/campo-consulpec.jpg'},
      {tag:'Aliança técnica',title:'Soluções integrais Campo Fe',result:'Capacidades complementares voltadas à eficiência e intensificação.',deliver:'Plano conjunto · execução coordenada',img:'/instagram-proyecto.jpg'},
    ],
    authorized:'Publicado com autorização',openCase:'Ver ficha do projeto',mapLabel:'Mapa do projeto',catalogKicker:'Catálogo de insumos',catalogTitle:'Escolha tudo o que precisa. Consulte uma vez.',catalogIntro:'Adicione vários produtos, ajuste quantidades e envie uma única consulta comercial pelo WhatsApp.',download:'Abrir catálogo completo',add:'Adicionar',added:'Adicionado',unit:'unid.',
    products:[
      {id:'kit40',name:'Kit solar 40 km',category:'Eletrificadores',spec:'Até 500 ha · bateria 12V 7Ah · painel 5W',image:'/catalogo-electrificadores.jpg'},
      {id:'kit60',name:'Kit solar 60 km',category:'Eletrificadores',spec:'Até 1.000 ha · bateria 12V 12Ah · painel 10W',image:'/catalogo-electrificadores.jpg'},
      {id:'kit120',name:'Kit solar 120 km',category:'Eletrificadores',spec:'10.000 V · mais de 4 joules reais',image:'/catalogo-electrificadores.jpg'},
      {id:'hilo',name:'Fio eletroplástico',category:'Condutores',spec:'500 ou 700 m · 9 fios · resistência UV',image:'/catalogo-accesorios.jpg'},
      {id:'varilla',name:'Haste de fibra de vidro',category:'Acessórios',spec:'1,20 ou 1,60 m · linhas móveis',image:'/catalogo-accesorios.jpg'},
      {id:'voltimetro',name:'Voltímetro digital Peón',category:'Medição',spec:'Controle rápido do sistema elétrico',image:'/catalogo-baterias.jpg'},
    ],
    knowledgeKicker:'Conteúdo técnico',knowledgeTitle:'Ideias que continuam trabalhando após a visita.',knowledgeIntro:'Recomendações claras para salvar, compartilhar e levar ao campo.',articles:[
      {type:'Pastejo',title:'Mais pasto, mais carne: por que a cerca elétrica melhora a eficiência',time:'6 min',img:'/instagram-articulo.jpg'},
      {type:'Guia prático',title:'Como dimensionar uma cerca elétrica sem superdimensionar o investimento',time:'8 min',img:'/campo-consulpec.jpg'},
      {type:'Infraestrutura',title:'Cinco pontos de controle antes de energizar uma nova parcela',time:'4 min',img:'/instagram-intensificacion.jpg'},
    ],
    read:'Ler recomendação',share:'Compartilhar',shareDone:'Link copiado',ctaTitle:'Seu campo já tem informação. Vamos colocá-la para trabalhar.',ctaText:'Conte o que deseja melhorar e marcaremos uma primeira conversa.',ctaButton:'Falar com a Consulpec',cartTitle:'Consulta de insumos',cartEmpty:'Você ainda não adicionou produtos.',cartHint:'Escolha um ou mais insumos do catálogo.',send:'Enviar consulta pelo WhatsApp',clear:'Limpar seleção',items:'produtos',whatsappIntro:'Olá Consulpec, gostaria de consultar estes insumos:',footer:'Consultoria de campo · Mapeamento · Intensificação · Insumos',rights:'Consulpec Paraguai. Todos os direitos reservados.',
  },
} as const;

const stripWords = ['RELEVAMIENTO', 'MAPEO', 'PRODUCCIÓN', 'INVERSIÓN', 'INSUMOS'];

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shared, setShared] = useState<number | null>(null);
  const t = copy[lang];
  const selected = useMemo(() => t.products.filter((p) => cart[p.id]), [cart, t.products]);
  const totalItems = Object.values(cart).reduce((sum, value) => sum + value, 0);

  const changeQty = (id: string, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      const updated = { ...current };
      if (next === 0) delete updated[id]; else updated[id] = next;
      return updated;
    });
  };

  const whatsappHref = useMemo(() => {
    const lines = selected.map((p) => `• ${p.name} — ${cart[p.id]} ${t.unit}`);
    return `https://wa.me/595983397555?text=${encodeURIComponent([t.whatsappIntro, ...lines].join('\n'))}`;
  }, [selected, cart, t]);

  const shareArticle = async (index: number, title: string) => {
    const url = `${window.location.origin}/#conocimiento`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else await navigator.clipboard.writeText(url);
      setShared(index); setTimeout(() => setShared(null), 1800);
    } catch { /* user cancelled */ }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Consulpec — Inicio">
          <span className="brand-mark"><ScanLine size={23} strokeWidth={2.4} /></span><span>CONSULPEC</span>
        </a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
          <a href="#insumos" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
          <a href="#conocimiento" onClick={() => setMenuOpen(false)}>{t.nav[3]}</a>
        </nav>
        <div className="header-actions">
          <label className="language"><span className="sr-only">Language</span><select value={lang} onChange={(e) => setLang(e.target.value as Lang)}><option value="es">ES</option><option value="en">EN</option><option value="pt">PT</option></select><ChevronDown size={14} /></label>
          <button className="mobile-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><Menu size={21}/></button>
          <a className="quote-link" href="#insumos">{t.quote} <ArrowUpRight size={17} /></a>
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

      <section className="section projects" id="proyectos">
        <div className="section-head inverse"><div><p className="section-kicker">{t.projectKicker}</p><h2>{t.projectTitle}</h2></div><p>{t.projectIntro}</p></div>
        <div className="project-grid">
          {t.projectCards.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image"><img src={project.img} alt={project.title}/><span className="project-tag">{project.tag}</span>{index === 1 && <div className="mini-map"><MapPin size={18}/><span>{t.mapLabel}</span><svg viewBox="0 0 140 64"><path d="M3 51C23 17 48 63 66 31S102 9 138 24"/></svg></div>}</div>
              <div className="project-body"><span className="authorized"><Check size={13}/>{t.authorized}</span><h3>{project.title}</h3><p>{project.result}</p><div className="project-deliver">{project.deliver}</div><button type="button">{t.openCase}<ArrowUpRight size={16}/></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section catalog" id="insumos">
        <div className="section-head"><div><p className="section-kicker">{t.catalogKicker}</p><h2>{t.catalogTitle}</h2></div><div><p>{t.catalogIntro}</p><a className="catalog-download" href="/catalogo-consulpec.pdf" target="_blank" rel="noreferrer"><Download size={17}/>{t.download}</a></div></div>
        <div className="product-grid">
          {t.products.map((product) => {
            const qty = cart[product.id] || 0;
            return <article className={`product-card ${qty ? 'is-selected' : ''}`} key={product.id}>
              <div className="product-photo"><img src={product.image} alt={product.name}/><span>{product.category}</span></div>
              <div className="product-info"><h3>{product.name}</h3><p>{product.spec}</p>{qty === 0 ? <button type="button" className="add-product" onClick={() => changeQty(product.id, 1)}><Plus size={16}/>{t.add}</button> : <div className="qty"><button type="button" onClick={() => changeQty(product.id,-1)} aria-label="Restar"><Minus size={15}/></button><strong>{qty}</strong><button type="button" onClick={() => changeQty(product.id,1)} aria-label="Sumar"><Plus size={15}/></button><span>{t.added}</span></div>}</div>
            </article>;
          })}
        </div>
      </section>

      <section className="section knowledge" id="conocimiento">
        <div className="section-head"><div><p className="section-kicker">{t.knowledgeKicker}</p><h2>{t.knowledgeTitle}</h2></div><p>{t.knowledgeIntro}</p></div>
        <div className="article-grid">{t.articles.map((article,index) => <article className="article-card" key={article.title}><div className="article-img"><img src={article.img} alt=""/><span>{article.type}</span></div><div className="article-body"><small>{article.time}</small><h3>{article.title}</h3><div><a href="https://www.instagram.com/consulpecpy/" target="_blank" rel="noreferrer">{t.read}<ExternalLink size={14}/></a><button type="button" onClick={() => shareArticle(index,article.title)}><Share2 size={14}/>{shared === index ? t.shareDone : t.share}</button></div></div></article>)}</div>
      </section>

      <section className="closing-cta"><div className="cta-orbit"><Layers3 size={35}/></div><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><a href="https://wa.me/595981413587" target="_blank" rel="noreferrer">{t.ctaButton}<ArrowUpRight size={18}/></a></section>

      <footer><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><ScanLine size={23}/></span><span>CONSULPEC</span></a><p>{t.footer}</p><div><a href="https://www.instagram.com/consulpecpy/" target="_blank" rel="noreferrer">Instagram</a><a href="/catalogo-consulpec.pdf" target="_blank">Catálogo</a><span>© 2026 {t.rights}</span></div></footer>

      {totalItems > 0 && <button className="cart-fab" type="button" onClick={() => setCartOpen(true)}><ShoppingBag size={19}/><span>{totalItems}</span><strong>{t.quote}</strong></button>}
      <div className={`cart-overlay ${cartOpen ? 'show' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-panel ${cartOpen ? 'show' : ''}`} aria-hidden={!cartOpen}>
        <div className="cart-head"><div><span>{t.catalogKicker}</span><h2>{t.cartTitle}</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar"><X/></button></div>
        {selected.length === 0 ? <div className="cart-empty"><ShoppingBag/><h3>{t.cartEmpty}</h3><p>{t.cartHint}</p></div> : <><div className="cart-lines">{selected.map((product) => <div className="cart-line" key={product.id}><div><strong>{product.name}</strong><small>{product.category}</small></div><div className="qty small"><button type="button" onClick={() => changeQty(product.id,-1)}><Minus size={14}/></button><strong>{cart[product.id]}</strong><button type="button" onClick={() => changeQty(product.id,1)}><Plus size={14}/></button></div></div>)}</div><div className="cart-summary"><span>{selected.length} {t.items}</span><span>{totalItems} {t.unit}</span></div><a className="whatsapp-send" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19}/>{t.send}<ArrowUpRight size={17}/></a><button className="clear-cart" type="button" onClick={() => setCart({})}>{t.clear}</button></>}
      </aside>
    </main>
  );
}
