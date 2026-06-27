let currentFilter = 'todos';
let manuals = [];
let projects = [];
let contacts = [];
const DEFAULT_PROJECT_MANUALS = ['configuracion-dispositivos','tarjetas-citisend'];
const DEFAULT_CONTACT = {id:'luis-hinojosa', nombre:'Luis Hinojosa', cargo:'Project Manager', rol:'Project Manager', telefono:'621157471', email:'', empresa:'Citisend', tipo:'Interno', proyectos:['todos'], visible:true};
let currentGalleryIndex = 0;

const fallbackManuals = [
  {id:'gestion-proyectos',titulo:'Manual de Gestión de Proyectos',categoria:'Planner',icono:'📋',tipo:'HTML',version:'v1.7',proyecto:'General / Granada',actualizado:'27/06/2026',tiempo:'8 min',autor:'Project Management',descripcion:'Guía interna para gestionar proyectos con Planner, Teams y seguimiento por fases.',archivo:'manuales/gestion-proyectos.html',destacado:true,keywords:'manual gestion proyectos planner teams fases seguimiento project management implantacion granada'},
  {id:'configuracion-dispositivos',titulo:'Manual de Configuración de Dispositivos',categoria:'Software',icono:'📱',tipo:'HTML',version:'v1.7',proyecto:'Granada',actualizado:'27/06/2026',tiempo:'10 min',autor:'Operaciones',descripcion:'Procedimiento de configuración, Bluetooth, aplicación Citiservice y validación de dispositivos.',archivo:'manuales/configuracion-dispositivos.html',destacado:true,keywords:'manual configuracion dispositivos citiservice bluetooth instalacion app dispositivos campo granada'},
  {id:'mantenimiento-citisend',titulo:'Manual de Mantenimiento Citisend',categoria:'Mantenimiento',icono:'🛠️',tipo:'HTML',version:'v1.7',proyecto:'Granada',actualizado:'27/06/2026',tiempo:'7 min',autor:'Operaciones',descripcion:'Guía operativa para preventivos, correctivos, revisiones, incidencias e informes de servicio.',archivo:'manuales/mantenimiento-citisend.html',destacado:true,keywords:'manual mantenimiento citisend preventivo correctivo incidencias servicio auditorias calidad granada'},
  {id:'tarjetas-citisend',titulo:'Manual Tarjetas Citisend',categoria:'Tarjetas',icono:'💳',tipo:'HTML',version:'v1.7',proyecto:'Operación',actualizado:'27/06/2026',tiempo:'6 min',autor:'Operaciones',descripcion:'Guía de operación para el uso, gestión y explicación de tarjetas ciudadanas.',archivo:'manuales/tarjetas-citisend.html',destacado:false,keywords:'manual tarjetas ciudadanas citisend guia operacion usuarios tarjetas'},
  {id:'generador-cae',titulo:'CitiDocs · Generador CAE',categoria:'CAE',icono:'🦺',tipo:'HTML',version:'v1.7',proyecto:'CAE',actualizado:'27/06/2026',tiempo:'Herramienta',autor:'Project Management',descripcion:'Herramienta HTML para generar documentación CAE de forma guiada.',archivo:'manuales/generador-cae.html',destacado:true,keywords:'generador cae citidocs coordinacion actividades empresariales subcontratas documento'}
];

const fallbackProjects = [
  {
    "id": "miranda-ebro",
    "nombre": "Miranda de Ebro",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/miranda-ebro/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "cuervo",
    "nombre": "Cuervo",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/cuervo/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "coruna",
    "nombre": "Coruña",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/coruna/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "olesa",
    "nombre": "Olesa",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/olesa/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "alcala-guadaira",
    "nombre": "Alcalá de Guadaira",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 199,
    "instalados": 199,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/alcala-guadaira/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "cordoba",
    "nombre": "Córdoba",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/cordoba/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "ontinyent",
    "nombre": "Ontinyent",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/ontinyent/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "granada",
    "nombre": "Granada",
    "cliente": "FCC Medio Ambiente",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 3500,
    "instalados": 2485,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/granada/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "sanlucar-barrameda",
    "nombre": "Sanlúcar de Barrameda",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 30,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/sanlucar-barrameda/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "tudela",
    "nombre": "Tudela",
    "cliente": "FCC Tudela",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 3381,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/tudela/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "illescas",
    "nombre": "Illescas",
    "cliente": "Agriman",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 10,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/illescas/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "bajo-martin",
    "nombre": "Bajo Martín",
    "cliente": "Pendiente de definir",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 0,
    "planner": "#",
    "galeria": "proyectos/bajo-martin/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": []
  },
  {
    "id": "copate",
    "nombre": "Copate",
    "cliente": "COPATE",
    "estado": "En ejecución",
    "estadoIcono": "🟢",
    "responsable": "Luis Hinojosa",
    "dispositivos": 0,
    "instalados": 0,
    "manuales": [
      "configuracion-dispositivos",
      "mantenimiento-citisend",
      "tarjetas-citisend"
    ],
    "fotografias": 6,
    "planner": "#",
    "galeria": "proyectos/copate/galeria/",
    "contactos": [
      {
        "nombre": "Luis Hinojosa",
        "rol": "Project Manager",
        "telefono": "621157471",
        "empresa": "Citisend",
        "tipo": "Interno"
      }
    ],
    "software": [
      "Planner"
    ],
    "galeriaFotos": [
      {
        "archivo": "copate-envases-vidrio-papel.jpg",
        "titulo": "Contenedores instalados · 1",
        "categoria": "Instalación",
        "descripcion": "Vista frontal de contenedores con dispositivos instalados."
      },
      {
        "archivo": "copate-envases-vidrio-papel2.jpg",
        "titulo": "Contenedores instalados · 2",
        "categoria": "Instalación",
        "descripcion": "Vista general de los contenedores en campo."
      },
      {
        "archivo": "copate-campa.jpeg",
        "titulo": "Campa COPATE",
        "categoria": "Instalación",
        "descripcion": "Vista de campa y contenedores del proyecto."
      },
      {
        "archivo": "copate-campa-2.jpeg",
        "titulo": "Campa COPATE · 2",
        "categoria": "Instalación",
        "descripcion": "Detalle adicional de la instalación."
      },
      {
        "archivo": "copate-pals.jpeg",
        "titulo": "Detalle instalación",
        "categoria": "Instalación",
        "descripcion": "Fotografía de referencia recibida."
      },
      {
        "archivo": "copate-pals-2.jpeg",
        "titulo": "Detalle instalación · 2",
        "categoria": "Instalación",
        "descripcion": "Fotografía de referencia recibida."
      }
    ]
  }
];

async function loadJson(path, fallback){
  try{
    const response = await fetch(`${path}?v=1.8`, {cache:'no-store'});
    if(!response.ok) throw new Error(`No se pudo cargar ${path}`);
    return await response.json();
  }catch(error){
    return fallback;
  }
}

async function init(){
  manuals = await loadJson('data/manuales.json', fallbackManuals);
  projects = await loadJson('data/proyectos.json', fallbackProjects);
  contacts = await loadJson('data/contactos.json', [DEFAULT_CONTACT]);

  if(document.getElementById('manualesGrid')) initLibrary();
  if(document.getElementById('projectsGrid')) renderProjects();
  if(document.getElementById('projectPage')) renderProjectPage();
  if(document.getElementById('contactsGrid')) renderContactsDirectory();
}

function initLibrary(){
  renderFilters();
  renderFeatured();
  renderManuals();
  updateStats();
  attachEvents();
  applyUrlFilters();
}

function normalize(value){
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function categories(){
  return [...new Set(manuals.map(item => item.categoria))];
}

function renderFilters(){
  const row = document.getElementById('filterRow');
  if(!row) return;
  const buttons = ['todos', ...categories()].map(category => {
    const label = category === 'todos' ? 'Todos' : category;
    return `<button class="filter-btn ${category === 'todos' ? 'active' : ''}" data-filter="${category}" type="button">${label}</button>`;
  }).join('');
  row.innerHTML = buttons;
}

function renderFeatured(){
  const list = document.getElementById('featuredList');
  if(!list) return;
  const featured = manuals.filter(item => item.destacado).slice(0,4);
  list.innerHTML = featured.map(item => `
    <a class="featured-chip" href="${item.archivo}">
      <span>${item.icono || '📄'}</span>
      <b>${item.titulo}</b>
    </a>
  `).join('');
}

function renderManuals(){
  const grid = document.getElementById('manualesGrid');
  if(!grid) return;
  grid.innerHTML = manuals.map(item => `
    <article class="manual-card" data-category="${item.categoria}" data-project="${escapeHtml(item.proyecto)}" data-search="${escapeHtml([item.titulo,item.categoria,item.proyecto,item.descripcion,item.keywords,item.autor].join(' '))}">
      <div class="manual-top">
        <span class="category-pill">${item.categoria}</span>
        <span class="manual-type">${item.tipo}</span>
      </div>
      <div class="manual-card-icon">${item.icono || '📄'}</div>
      <h3>${item.titulo}</h3>
      <p>${item.descripcion}</p>
      <div class="manual-details">
        <div><small>Versión</small><strong>${item.version}</strong></div>
        <div><small>Proyecto</small><strong>${item.proyecto}</strong></div>
        <div><small>Actualizado</small><strong>${item.actualizado}</strong></div>
        <div><small>Lectura</small><strong>${item.tiempo}</strong></div>
      </div>
      <div class="manual-actions">
        <a href="${item.archivo}" class="open-btn">Abrir manual →</a>
      </div>
    </article>
  `).join('');
  filterLibrary();
}

function updateStats(){
  const total = document.getElementById('statTotal');
  const cats = document.getElementById('statCategories');
  if(total) total.textContent = manuals.length;
  if(cats) cats.textContent = categories().length;
}

function attachEvents(){
  const searchInput = document.getElementById('searchInput');
  if(searchInput) searchInput.addEventListener('input', filterLibrary);

  const filterRow = document.getElementById('filterRow');
  if(filterRow){
    filterRow.addEventListener('click', event => {
      const btn = event.target.closest('.filter-btn');
      if(!btn) return;
      setFilter(btn.dataset.filter);
    });
  }
}

function applyUrlFilters(){
  const params = new URLSearchParams(window.location.search);
  const project = params.get('proyecto');
  const category = params.get('categoria');
  const q = params.get('q');
  const search = document.getElementById('searchInput');
  if(category) setFilter(category);
  if(project && search) search.value = project;
  if(q && search) search.value = q;
  filterLibrary();
}

function setFilter(category){
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === category));
  filterLibrary();
}

function filterLibrary(){
  const query = normalize(document.getElementById('searchInput')?.value || '').trim();
  const cards = document.querySelectorAll('.manual-card');
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const text = normalize(card.innerText + ' ' + (card.dataset.search || ''));
    const matchesFilter = currentFilter === 'todos' || category === currentFilter;
    const matchesSearch = !query || text.includes(query);
    const show = matchesFilter && matchesSearch;
    card.style.display = show ? 'flex' : 'none';
    if(show) visible++;
  });

  const empty = document.getElementById('emptyState');
  if(empty) empty.hidden = visible !== 0;
  const counter = document.getElementById('resultCounter');
  if(counter) counter.textContent = `${visible} manual${visible === 1 ? '' : 'es'} visible${visible === 1 ? '' : 's'}`;
}

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;

  const active = projects.filter(project => normalize(project.estado).includes('ejecucion')).length;
  const total = document.getElementById('statProjects');
  const activeStat = document.getElementById('statActiveProjects');
  if(total) total.textContent = projects.length;
  if(activeStat) activeStat.textContent = active;

  populateProjectSelector();
  renderProjectCards();
  attachProjectControls();
}

function populateProjectSelector(){
  const select = document.getElementById('projectSelect');
  if(!select || select.dataset.loaded === 'true') return;
  const options = ['<option value="todos">Todos los proyectos</option>'].concat(
    projects.map(project => `<option value="${escapeHtml(project.id)}">${escapeHtml(project.nombre)}</option>`)
  );
  select.innerHTML = options.join('');
  select.dataset.loaded = 'true';
}

function attachProjectControls(){
  const select = document.getElementById('projectSelect');
  const search = document.getElementById('projectSearch');
  if(select && select.dataset.bound !== 'true'){
    select.addEventListener('change', renderProjectCards);
    select.dataset.bound = 'true';
  }
  if(search && search.dataset.bound !== 'true'){
    search.addEventListener('input', renderProjectCards);
    search.dataset.bound = 'true';
  }
}

function renderProjectCards(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  const selected = document.getElementById('projectSelect')?.value || 'todos';
  const query = normalize(document.getElementById('projectSearch')?.value || '').trim();

  let filtered = projects.filter(project => {
    const selectedOk = selected === 'todos' || project.id === selected;
    const searchText = normalize([project.nombre, project.cliente, project.estado, project.responsable, (project.software || []).join(' ')].join(' '));
    const queryOk = !query || searchText.includes(query);
    return selectedOk && queryOk;
  });

  let heading = '';
  if(selected === 'todos' && !query){
    filtered = projects.filter(project => project.destacado).slice(0,3);
    if(filtered.length < 3){
      const extra = projects.filter(project => !filtered.find(item => item.id === project.id)).slice(0, 3 - filtered.length);
      filtered = filtered.concat(extra);
    }
    heading = `<div class="project-featured-note"><strong>Proyectos destacados</strong><span>Mostrando 3 proyectos principales. Usa el desplegable o el buscador para abrir cualquier otro proyecto.</span></div>`;
  }

  if(!filtered.length){
    grid.innerHTML = `<div class="empty-state project-empty">No se han encontrado proyectos con ese filtro.</div>`;
    return;
  }

  grid.innerHTML = heading + filtered.map(project => {
    const percent = project.dispositivos ? Math.round((project.instalados / project.dispositivos) * 100) : 0;
    return `
      <a class="project-card-link" href="proyecto.html?id=${encodeURIComponent(project.id)}">
        <article class="project-card-premium">
          <div class="project-cover"><span>📦</span><b>${project.estadoIcono || '🟢'} ${project.estado}</b></div>
          <div class="project-card-body">
            <h3>${project.nombre}</h3>
            <p>${project.cliente}</p>
            <span class="responsible">Responsable: ${project.responsable}</span>
            <div class="project-mini-kpis">
              <div><strong>${formatNumber(project.dispositivos)}</strong><small>Dispositivos</small></div>
              <div><strong>${formatNumber(project.instalados)}</strong><small>Instalados</small></div>
              <div><strong>${(project.manuales || DEFAULT_PROJECT_MANUALS).filter(id => DEFAULT_PROJECT_MANUALS.includes(id)).length}</strong><small>Manuales</small></div>
            </div>
            <div class="bar project-progress"><i style="width:${Math.min(percent,100)}%"></i></div>
            <span class="open-project">Abrir proyecto →</span>
          </div>
        </article>
      </a>
    `;
  }).join('');
}
function renderProjectPage(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'granada';
  const project = projects.find(item => item.id === id) || projects[0];
  if(!project) return;

  document.title = `Citisend HUB · ${project.nombre}`;
  const percent = project.dispositivos ? Math.round((project.instalados / project.dispositivos) * 100) : 0;
  const projectManualIds = (project.manuales && project.manuales.length ? project.manuales : DEFAULT_PROJECT_MANUALS).filter(id => DEFAULT_PROJECT_MANUALS.includes(id));
  const relatedManuals = manuals.filter(manual => projectManualIds.includes(manual.id));

  setText('projectName', project.nombre);
  setText('projectClient', project.cliente);
  setText('projectStatus', `${project.estadoIcono || ''} ${project.estado}`.trim());
  setText('projectResponsible', `Responsable: ${project.responsable}`);
  setText('kpiDevices', formatNumber(project.dispositivos));
  setText('kpiInstalled', formatNumber(project.instalados));
  setText('kpiManuals', relatedManuals.length);
  setText('kpiPhotos', (project.galeriaFotos && project.galeriaFotos.length) ? project.galeriaFotos.length : (project.fotografias || 0));

  const progress = document.getElementById('projectProgress');
  if(progress) progress.style.width = `${Math.min(percent,100)}%`;
  setText('projectPercent', `${percent}% instalado`);

  const planner = document.getElementById('plannerLink');
  if(planner) planner.href = project.planner || '#';
  const library = document.getElementById('libraryLink');
  if(library) library.href = `index.html?proyecto=${encodeURIComponent(project.nombre)}#biblioteca`;
  const gallery = document.getElementById('galleryLink');
  if(gallery) gallery.href = '#galeria';

  renderRelatedManuals(relatedManuals, project);
  renderContacts(getProjectContacts(project));
  renderSoftware(project.software || []);
  renderGallery(project);
  setupProjectSwitcher(project);
}

function setupProjectSwitcher(project){
  const select = document.getElementById('projectJump');
  if(select){
    select.innerHTML = projects.map(item => `<option value="${escapeHtml(item.id)}" ${item.id === project.id ? 'selected' : ''}>${escapeHtml(item.nombre)}</option>`).join('');
    if(select.dataset.bound !== 'true'){
      select.addEventListener('change', () => {
        if(select.value) window.location.href = `proyecto.html?id=${encodeURIComponent(select.value)}`;
      });
      select.dataset.bound = 'true';
    }
  }

  const index = projects.findIndex(item => item.id === project.id);
  const prev = document.getElementById('prevProject');
  const next = document.getElementById('nextProject');
  if(prev && projects.length){
    const target = projects[(index - 1 + projects.length) % projects.length];
    prev.href = `proyecto.html?id=${encodeURIComponent(target.id)}`;
    prev.textContent = `← ${target.nombre}`;
  }
  if(next && projects.length){
    const target = projects[(index + 1) % projects.length];
    next.href = `proyecto.html?id=${encodeURIComponent(target.id)}`;
    next.textContent = `${target.nombre} →`;
  }
}

function renderRelatedManuals(relatedManuals, project){
  const box = document.getElementById('relatedManuals');
  if(!box) return;
  box.innerHTML = relatedManuals.map(item => `
    <a class="module-row" href="${item.archivo}">
      <span>${item.icono || '📄'}</span>
      <div><strong>${item.titulo}</strong><small>${item.categoria} · ${item.version}</small></div>
      <b>→</b>
    </a>
  `).join('') || `<p class="muted-text">No hay manuales asociados todavía.</p>`;

  const all = document.getElementById('allProjectManuals');
  if(all) all.href = `index.html?proyecto=${encodeURIComponent(project.nombre)}#biblioteca`;
}


function getProjectContacts(project){
  const fromData = (contacts || []).filter(contact => contact.visible !== false && contactApplies(contact, project.id));
  if(fromData.length) return fromData;
  if(Array.isArray(project.contactos) && project.contactos.length) return project.contactos;
  return [DEFAULT_CONTACT];
}

function renderContacts(projectContacts){
  const box = document.getElementById('projectContacts');
  if(!box) return;
  const list = (Array.isArray(projectContacts) && projectContacts.length ? projectContacts : [DEFAULT_CONTACT]).map(contact => ({...contact, rol: contact.rol || contact.cargo || 'Contacto interno'}));
  box.innerHTML = list.map(contact => {
    const phone = contact.telefono ? `<small>📞 ${contact.telefono}</small>` : '';
    const email = contact.email ? `<small>✉️ ${contact.email}</small>` : '';
    return `
      <article class="contact-card">
        <div class="contact-initials">${initials(contact.nombre)}</div>
        <div><strong>${contact.nombre}</strong><span>${contact.rol || contact.cargo || ''}</span>${phone}${email}<small>${contact.empresa} · ${contact.tipo}</small></div>
      </article>
    `;
  }).join('');
}

function contactApplies(contact, projectId){
  const linked = contact.proyectos || [];
  return linked.includes('todos') || linked.includes(projectId);
}

function renderContactsDirectory(){
  const grid = document.getElementById('contactsGrid');
  if(!grid) return;
  const search = document.getElementById('contactSearch');
  const stat = document.getElementById('statContacts');
  const render = () => {
    const query = normalize(search?.value || '');
    const visibleContacts = (contacts.length ? contacts : [DEFAULT_CONTACT]).filter(contact => contact.visible !== false).filter(contact => {
      const text = normalize([contact.nombre, contact.cargo || contact.rol, contact.telefono, contact.email, contact.empresa, contact.tipo, (contact.proyectos || []).join(' ')].join(' '));
      return !query || text.includes(query);
    });
    if(stat) stat.textContent = visibleContacts.length;
    grid.innerHTML = visibleContacts.map(contact => {
      const linkedProjects = (contact.proyectos || ['todos']).includes('todos') ? 'Todos los proyectos' : (contact.proyectos || []).map(id => projects.find(p => p.id === id)?.nombre || id).join(', ');
      return `
        <article class="contact-directory-card">
          <div class="contact-initials large">${initials(contact.nombre)}</div>
          <div class="contact-directory-body">
            <strong>${escapeHtml(contact.nombre)}</strong>
            <span>${escapeHtml(contact.cargo || contact.rol || '')}</span>
            ${contact.telefono ? `<small>📞 ${escapeHtml(contact.telefono)}</small>` : ''}
            ${contact.email ? `<small>✉️ ${escapeHtml(contact.email)}</small>` : ''}
            <small>${escapeHtml(contact.empresa || 'Citisend')} · ${escapeHtml(contact.tipo || 'Interno')}</small>
            <em>Proyectos: ${escapeHtml(linkedProjects)}</em>
          </div>
        </article>
      `;
    }).join('') || '<div class="empty-state">No se han encontrado contactos.</div>';
  };
  if(search && search.dataset.bound !== 'true'){
    search.addEventListener('input', render);
    search.dataset.bound = 'true';
  }
  render();
}

function renderSoftware(software){
  const box = document.getElementById('projectSoftware');
  if(!box) return;
  const project = projects.find(item => item.id === new URLSearchParams(window.location.search).get('id')) || {};
  box.innerHTML = software.map(item => {
    if(String(item).toLowerCase() === 'planner' && project.planner && project.planner !== '#'){
      return `<a class="software-chip software-link" href="${project.planner}" target="_blank" rel="noopener">📋 Planner ↗</a>`;
    }
    return `<span class="software-chip">💻 ${item}</span>`;
  }).join('') || `<p class="muted-text">No hay software asociado.</p>`;
}

function renderGallery(project){
  const box = document.getElementById('projectGallery');
  if(!box) return;
  const basePath = project.galeria || `proyectos/${project.id}/galeria/`;
  const photos = Array.isArray(project.galeriaFotos) ? project.galeriaFotos : [];

  if(!photos.length){
    box.innerHTML = `
      <div class="gallery-placeholder">
        <div>📷</div>
        <h3>Galería preparada</h3>
        <p>Sube tus imágenes a <strong>${basePath}</strong> y añade los nombres de archivo en <strong>data/proyectos.json</strong>. GitHub Pages no puede leer carpetas automáticamente, pero esta estructura deja la galería lista para cualquier proyecto.</p>
        <a href="admin.html" class="btn secondary">Abrir administración</a>
      </div>
    `;
    return;
  }

  box.innerHTML = `
    <div class="gallery-grid gallery-grid-premium">
      ${photos.map((photo, index) => {
        const file = photo.archivo || photo;
        const title = photo.titulo || file;
        const category = photo.categoria || 'Instalación';
        const description = photo.descripcion || '';
        const full = `${basePath}${file}`;
        return `
          <button class="gallery-card gallery-zoom-card" type="button" data-full="${escapeHtml(full)}" data-title="${escapeHtml(title)}" data-index="${index}">
            <img src="${full}" alt="${escapeHtml(title)}" loading="lazy" />
            <div>
              <span>${category}</span>
              <strong>${title}</strong>
              ${description ? `<small>${description}</small>` : ''}
            </div>
          </button>
        `;
      }).join('')}
    </div>
    <div class="gallery-tip">Pasa el cursor por encima para ampliar ligeramente la imagen. Haz clic para verla en grande.</div>
  `;
  attachGalleryLightbox();
}

function attachGalleryLightbox(){
  let lightbox = document.getElementById('galleryLightbox');
  if(!lightbox){
    lightbox = document.createElement('div');
    lightbox.id = 'galleryLightbox';
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
      <button type="button" class="gallery-lightbox-close" aria-label="Cerrar imagen">×</button>
      <button type="button" class="gallery-lightbox-nav gallery-lightbox-prev" aria-label="Imagen anterior">‹</button>
      <img src="" alt="" />
      <button type="button" class="gallery-lightbox-nav gallery-lightbox-next" aria-label="Imagen siguiente">›</button>
      <strong></strong>
    `;
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', event => {
      if(event.target === lightbox || event.target.closest('.gallery-lightbox-close')){
        lightbox.classList.remove('open');
      }
      if(event.target.closest('.gallery-lightbox-prev')) showGalleryImage(currentGalleryIndex - 1);
      if(event.target.closest('.gallery-lightbox-next')) showGalleryImage(currentGalleryIndex + 1);
    });
    document.addEventListener('keydown', event => {
      if(!lightbox.classList.contains('open')) return;
      if(event.key === 'Escape') lightbox.classList.remove('open');
      if(event.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1);
      if(event.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1);
    });
  }

  document.querySelectorAll('.gallery-zoom-card').forEach((card, index) => {
    card.dataset.index = index;
    if(card.dataset.bound === 'true') return;
    card.addEventListener('click', () => showGalleryImage(Number(card.dataset.index || 0)));
    card.dataset.bound = 'true';
  });
}

function showGalleryImage(index){
  const cards = [...document.querySelectorAll('.gallery-zoom-card')];
  const lightbox = document.getElementById('galleryLightbox');
  if(!cards.length || !lightbox) return;
  currentGalleryIndex = (index + cards.length) % cards.length;
  const card = cards[currentGalleryIndex];
  const img = lightbox.querySelector('img');
  const title = lightbox.querySelector('strong');
  img.src = card.dataset.full;
  img.alt = card.dataset.title || 'Imagen de galería';
  title.textContent = `${currentGalleryIndex + 1}/${cards.length} · ${card.dataset.title || ''}`;
  lightbox.classList.add('open');
}
function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function formatNumber(value){
  return Number(value || 0).toLocaleString('es-ES');
}

function initials(name){
  return String(name || '').split(' ').filter(Boolean).slice(0,2).map(part => part[0]).join('').toUpperCase() || 'CT';
}

function escapeHtml(value){
  return String(value || '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

document.addEventListener('DOMContentLoaded', init);
