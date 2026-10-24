/**
 * MOTOR DE TIENDA BDN & DISPONIBILIDAD ESTILO AUTOZONE
 * Embeds de Google Maps Detrás de cada Sucursal + Sistema de Cuentas B2C/B2B
 * Carrito Inteligente con Mínimo Automático de 6 piezas en Modo Mayoreo
 */

// WHATSAPP CENTRAL HOMOLOGADO (MATRIZ ALLENDE) PARA TODAS LAS TIENDAS
const CENTRAL_WHATSAPP_PHONE = '524442254705';
const CENTRAL_WHATSAPP_URL = `https://wa.me/${CENTRAL_WHATSAPP_PHONE}`;

// Base de datos de las 8 sucursales físicas en San Luis Potosí con Embeds de Google Maps exactos y enlaces verificados
const BDN_BRANCHES = [
  {
    id: 'matriz-allende',
    name: 'Matriz Allende',
    specialty: 'Bicicletas, Bicimotos & Refacciones',
    address: 'Calle Ignacio Allende #615, Col. Centro, SLP',
    mapsUrl: 'https://maps.app.goo.gl/JjpZadH6WZyd7UHw8', // Allende #615 (22.1558136, -100.9779587)
    embedMapUrl: 'https://maps.google.com/maps?q=22.1558136,-100.9779587+(Bicicletas+Don+Nabor+Matriz)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:00 - 19:30 | Dom: 10:00 - 14:00',
    isMatriz: true
  },
  {
    id: 'allende-motos',
    name: 'Sucursal Allende Motos',
    specialty: 'Especialidad Refacciones para Motos',
    address: 'Calle Ignacio Allende #710, Col. Centro, SLP',
    mapsUrl: 'https://maps.app.goo.gl/HYoYzmqKRBj8BALb8', // Allende #705-710 (22.1566048, -100.9781742)
    embedMapUrl: 'https://maps.google.com/maps?q=22.1566048,-100.9781742+(Don+Nabor+Allende+Motos)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:00 - 19:30',
    isMatriz: false
  },
  {
    id: 'guajardo',
    name: 'Sucursal Guajardo',
    specialty: 'Bicicletas Urbanas y Refacciones',
    address: 'Guajardo #525, Col. Centro, SLP',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bicicletas+Don+Nabor+Guajardo+525+San+Luis+Potosi', // Guajardo Centro Histórico SLP
    embedMapUrl: 'https://maps.google.com/maps?q=Guajardo+525+Centro+San+Luis+Potosi&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:30 - 19:00',
    isMatriz: false
  },
  {
    id: 'abastos',
    name: 'Sucursal Abastos',
    specialty: 'Centro Mayorista y Distribución',
    address: 'Cereales #235, Central de Abastos, SLP',
    mapsUrl: 'https://maps.app.goo.gl/DHJE34Vti5b1FJ4z5', // Cereales / Central de Abastos (22.1411549, -100.9208061)
    embedMapUrl: 'https://maps.google.com/maps?q=22.1411549,-100.9208061+(Don+Nabor+Central+de+Abastos)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 8:30 - 18:30',
    isMatriz: false
  },
  {
    id: 'galvez',
    name: 'Sucursal Gálvez',
    specialty: 'Zona Oriente de San Luis Potosí',
    address: 'Av. José de Gálvez #595, Col. La Forestal, SLP',
    mapsUrl: 'https://maps.app.goo.gl/Az24uZtGzaBV4x8W7', // Av. José de Gálvez #595 (22.1491856, -100.9214716)
    embedMapUrl: 'https://maps.google.com/maps?q=22.1491856,-100.9214716+(Don+Nabor+Galvez)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:00 - 19:00',
    isMatriz: false
  },
  {
    id: 'saucito',
    name: 'Sucursal Saucito',
    specialty: 'Zona Norte San Luis Potosí',
    address: 'Fray Diego de la Magdalena #2100, Col. Saucito, SLP',
    mapsUrl: 'https://maps.app.goo.gl/B6PyaX36PZoKWYha9', // Fray Diego de la Magdalena / Saucito (22.1835076, -101.0009661)
    embedMapUrl: 'https://maps.google.com/maps?q=22.1835076,-101.0009661+(Don+Nabor+Saucito)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:00 - 19:30',
    isMatriz: false
  },
  {
    id: 'periferico',
    name: 'Sucursal Periférico',
    specialty: 'Salida a Carretera Zacatecas',
    address: 'Periférico Nte #900-G, Carr. a Zacatecas, SLP',
    mapsUrl: 'https://maps.app.goo.gl/WdK2x7sdHMKq3GpD6', // Anillo Periférico Nte Los Salazares (22.1983680, -101.0179623)
    embedMapUrl: 'https://maps.google.com/maps?q=22.198368,-101.0179623+(Don+Nabor+Periferico+Norte)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:00 - 19:00',
    isMatriz: false
  },
  {
    id: 'salvador-nava',
    name: 'Sucursal Salvador Nava',
    specialty: 'Zona Sur Poniente',
    address: 'Av. Salvador Nava #1001, Col. Sta Fe 2da Secc, SLP',
    mapsUrl: 'https://maps.app.goo.gl/2krfNjpMHQuky6Za8', // Av. Salvador Nava #1001 (22.1330942, -100.9603837)
    embedMapUrl: 'https://maps.google.com/maps?q=22.1330942,-100.9603837+(Don+Nabor+Salvador+Nava)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    hours: 'Lun-Sáb: 9:00 - 19:30',
    isMatriz: false
  }
];

// 5. Catálogo 100% con archivos locales verificados (cero errores o imágenes rotas)
const PRODUCTS_DATA = [
  {
    id: 'PROD-001',
    sku: 'AL-E01-PRO',
    name: 'Bicimoto Eléctrica Alessia E01 PRO - Light Urban',
    brand: 'ALESSIA',
    category: 'bicimotos',
    vehicleType: 'moto',
    compatibility: 'Movilidad Eléctrica Urbana (Autonomía 45km / 32km/h)',
    priceRetail: 7500,
    priceWholesale: 6850,
    unit: 'pza',
    image: 'assets/images/slides/slide-bicimoto.jpg',
    badge: 'ESTRENO EXCLUSIVO',
    promoInfo: 'Incluye casco de regalo sin costo adicional',
    stockPerBranch: {
      'matriz-allende': 4, 'allende-motos': 3, 'guajardo': 2, 'abastos': 6,
      'galvez': 2, 'saucito': 3, 'periferico': 2, 'salvador-nava': 3
    }
  },
  {
    id: 'PROD-002',
    sku: 'CH-LL-27518',
    name: 'Llanta de Moto Reforzada 2.75-18 TT 6PR Uso Rudo',
    brand: 'CHOHO',
    category: 'refacciones-moto',
    vehicleType: 'moto',
    compatibility: 'Italika FT125, FT150, Vento Workman, Honda CGL125',
    priceRetail: 485,
    priceWholesale: 375,
    unit: 'pza',
    image: 'assets/images/products/llanta-choho.svg',
    badge: 'TOP VENTAS TALLER',
    promoInfo: 'Mayoreo desde 6 piezas para mecánicos',
    stockPerBranch: {
      'matriz-allende': 25, 'allende-motos': 30, 'guajardo': 14, 'abastos': 48,
      'galvez': 16, 'saucito': 20, 'periferico': 18, 'salvador-nava': 22
    }
  },
  {
    id: 'PROD-003',
    sku: 'NGK-D8EA',
    name: 'Bujía Estándar D8EA Alta Precisión y Encendido Rápido',
    brand: 'NGK SPARK PLUGS',
    category: 'refacciones-moto',
    vehicleType: 'moto',
    compatibility: 'Italika DM200, FT200, RT200, Vento Nitrox, Bajaj Pulsar',
    priceRetail: 65,
    priceWholesale: 42,
    unit: 'pza',
    image: 'assets/images/products/bujia-ngk.svg',
    badge: 'ORIGINAL JAPÓN',
    promoInfo: 'Caja x10 con precio especial de distribuidor',
    stockPerBranch: {
      'matriz-allende': 80, 'allende-motos': 120, 'guajardo': 45, 'abastos': 200,
      'galvez': 60, 'saucito': 75, 'periferico': 50, 'salvador-nava': 90
    }
  },
  {
    id: 'PROD-004',
    sku: 'KMC-428H-132',
    name: 'Cadena de Tracción Reforzada 428H x 132 Eslabones',
    brand: 'KMC',
    category: 'refacciones-moto',
    vehicleType: 'moto',
    compatibility: 'Motos de trabajo 125cc a 200cc todas las marcas',
    priceRetail: 295,
    priceWholesale: 220,
    unit: 'pza',
    image: 'assets/images/products/cadena-kmc.svg',
    badge: 'ACERO ALTO IMPACTO',
    promoInfo: 'Garantía de kilometraje extendido',
    stockPerBranch: {
      'matriz-allende': 18, 'allende-motos': 24, 'guajardo': 10, 'abastos': 35,
      'galvez': 12, 'saucito': 15, 'periferico': 14, 'salvador-nava': 16
    }
  },
  {
    id: 'PROD-005',
    sku: 'AK-4T-20W50',
    name: 'Aceite 4T Mineral Multigrado 20W-50 (Botella 946 ml)',
    brand: 'AKRON',
    category: 'refacciones-moto',
    vehicleType: 'moto',
    compatibility: 'Motor 4 Tiempos para Motos de Trabajo y Reparto',
    priceRetail: 135,
    priceWholesale: 98,
    unit: 'botella',
    image: 'assets/images/products/aceite-akron.svg',
    badge: 'LUBRICACIÓN TOTAL',
    promoInfo: 'Caja con 12 botellas precio de mayoreo',
    stockPerBranch: {
      'matriz-allende': 40, 'allende-motos': 60, 'guajardo': 20, 'abastos': 120,
      'galvez': 30, 'saucito': 35, 'periferico': 25, 'salvador-nava': 45
    }
  },
  {
    id: 'PROD-006',
    sku: 'WIN-R29-HYD',
    name: 'Bicicleta de Montaña Windsor R29 Cuadro Aluminio 21 Vel.',
    brand: 'WINDSOR',
    category: 'bicicletas',
    vehicleType: 'bici',
    compatibility: 'MTB, Cross Country, Urbana R29 con Frenos de Disco',
    priceRetail: 5490,
    priceWholesale: 4690,
    unit: 'pza',
    image: 'assets/images/slides/slide-bicicletas.jpg',
    badge: 'ALUMINIO PRO',
    promoInfo: 'Ajuste mecánico gratis en sucursal',
    stockPerBranch: {
      'matriz-allende': 6, 'allende-motos': 0, 'guajardo': 5, 'abastos': 8,
      'galvez': 3, 'saucito': 4, 'periferico': 3, 'salvador-nava': 5
    }
  },
  {
    id: 'PROD-007',
    sku: 'VIT-FRE-DIS',
    name: 'Kit de Balatas de Disco Delanteras Semimetálicas',
    brand: 'VITAL',
    category: 'refacciones-moto',
    vehicleType: 'moto',
    compatibility: 'Italika 150Z, 250Z, Vento Nitrox 200/250, Tornado',
    priceRetail: 110,
    priceWholesale: 75,
    unit: 'par',
    image: 'assets/images/products/balatas-vital.svg',
    badge: 'FRENADO SEGURO',
    promoInfo: 'Frenado silencioso y duradero',
    stockPerBranch: {
      'matriz-allende': 30, 'allende-motos': 45, 'guajardo': 15, 'abastos': 60,
      'galvez': 18, 'saucito': 22, 'periferico': 16, 'salvador-nava': 25
    }
  },
  {
    id: 'PROD-008',
    sku: 'GOR-CAM-29',
    name: 'Cámara Reforzada para Bicicleta R29 Válvula Americana',
    brand: 'GORILA BICYCLE PRODUCTS',
    category: 'refacciones-bici',
    vehicleType: 'bici',
    compatibility: 'Llantas de bicicleta rodada 29 x 1.95 a 2.35',
    priceRetail: 85,
    priceWholesale: 58,
    unit: 'pza',
    image: 'assets/images/products/camara-gorila.svg',
    badge: 'BUTILO PREMIUM',
    promoInfo: 'Paquete de 6 piezas para taller',
    stockPerBranch: {
      'matriz-allende': 50, 'allende-motos': 5, 'guajardo': 40, 'abastos': 100,
      'galvez': 25, 'saucito': 30, 'periferico': 20, 'salvador-nava': 35
    }
  },
  {
    id: 'PROD-009',
    sku: 'ALT-URB-R26',
    name: 'Bicicleta Urbana Clásica Altrego R26 con Canastilla',
    brand: 'ALTREGO',
    category: 'bicicletas',
    vehicleType: 'bici',
    compatibility: 'Paseo Urbano, Mandados, Cuadro de Acero Reforzado',
    priceRetail: 3250,
    priceWholesale: 2790,
    unit: 'pza',
    image: 'assets/images/slides/slide-bicicletas.jpg',
    badge: 'URBANA CLÁSICA',
    promoInfo: 'Canastilla delantera incluida',
    stockPerBranch: {
      'matriz-allende': 8, 'allende-motos': 0, 'guajardo': 6, 'abastos': 10,
      'galvez': 4, 'saucito': 5, 'periferico': 4, 'salvador-nava': 6
    }
  },
  {
    id: 'PROD-010',
    sku: 'KMC-Z7-BICI',
    name: 'Cadena para Bicicleta KMC Z7 para 6, 7 y 8 Velocidades',
    brand: 'KMC',
    category: 'refacciones-bici',
    vehicleType: 'bici',
    compatibility: 'Transmisiones Shimano, SRAM, Sunrace de 18, 21 y 24 vel.',
    priceRetail: 165,
    priceWholesale: 115,
    unit: 'pza',
    image: 'assets/images/products/cadena-kmc.svg',
    badge: 'ALTA DURABILIDAD',
    promoInfo: 'Eslabón rápido MissingLink incluido',
    stockPerBranch: {
      'matriz-allende': 35, 'allende-motos': 0, 'guajardo': 28, 'abastos': 55,
      'galvez': 15, 'saucito': 18, 'periferico': 12, 'salvador-nava': 20
    }
  }
];

/**
 * Normaliza texto eliminando acentos/diacríticos y convirtiendo a minúsculas
 * Ejemplo: "bujía" -> "bujia", "CÁMARA" -> "camara", "Eléctrica" -> "electrica"
 */
function normalizeText(text) {
  if (text === null || text === undefined) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const OFFICIAL_BRANDS = [
  { name: 'ITALIKA', file: 'italika.png', query: 'italika' },
  { name: 'WINDSOR', file: 'windsor.png', query: 'windsor' },
  { name: 'KMC', file: 'kmc.png', query: 'kmc' },
  { name: 'CHOHO', file: 'choho.png', query: 'choho' },
  { name: 'MOTUL', file: 'motul.png', query: 'motul' },
  { name: 'NGK SPARK PLUGS', file: 'ngk-spark-plugs.png', query: 'ngk' },
  { name: 'ALESSIA', file: 'alessia.png', query: 'alessia' },
  { name: 'VITAL', file: 'vital.png', query: 'vital' },
  { name: 'ALTREGO', file: 'altrego.png', query: 'altrego' },
  { name: 'GORILA BICYCLE', file: 'gorila-bicycle.png', query: 'gorila' },
  { name: 'RODA', file: 'roda.png', query: 'roda' },
  { name: 'AKRON', file: 'akron.png', query: 'akron' },
  { name: 'CHAMPION', file: 'champion.png', query: 'champion' },
  { name: 'HTR', file: 'htr.png', query: 'htr' },
  { name: 'HUNTER', file: 'hunter.png', query: 'hunter' },
  { name: 'NAHEL', file: 'nahel.png', query: 'nahel' },
  { name: 'GOLDKYLIN', file: 'goldkylin.png', query: 'goldkylin' },
  { name: 'EMYASA', file: 'emyasa.png', query: 'emyasa' },
  { name: 'VEE RUBBER', file: 'vee-rubber.png', query: 'vee rubber' },
  { name: 'PROMOTO', file: 'promoto.png', query: 'promoto' },
  { name: 'NSPRICK', file: 'nsprick.png', query: 'nsprick' },
  { name: 'GENERAL PAINT', file: 'general-paint.png', query: 'general paint' }
];

// ESTADO GLOBAL
let isWholesaleMode = false;
let cart = [];
let currentUser = JSON.parse(localStorage.getItem('bdn_user') || 'null');

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderBrandsGrid();
  renderBranchesGrid();
  setupWholesaleToggle();
  setupVehicleSelector();
  setupSearchEngine();
  setupCategorySelect();
  setupModalHandlers();
  setupCartDrawer();
  setupAccountModule();
  setupStickyHeader();

  // Si el usuario registrado es tipo "taller", activar automáticamente modo Mayoreo
  if (currentUser && currentUser.accountType === 'taller') {
    enableWholesaleMode();
  }
});

/**
 * Renderiza el Catálogo con fotos 100% locales y verificadas
 */
function renderProducts(filteredProducts = PRODUCTS_DATA) {
  const container = document.getElementById('products-catalog-grid');
  if (!container) return;

  container.innerHTML = '';

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 45px; background: #FFF; border-radius: 16px; border: 2px dashed #CBD5E1;">
        <h3 style="color: #0A1931; margin-bottom: 8px; font-size: 1.3rem;">No encontramos refacciones con ese criterio</h3>
        <p style="color: #64748B; font-size: 0.95rem; margin-bottom: 18px;">Prueba seleccionando otra categoría o marca de la lista.</p>
        <button onclick="resetFilters()" style="background:#FF5500;color:#FFF;border:none;padding:10px 22px;border-radius:8px;font-weight:700;cursor:pointer;">
          Ver Todo el Catálogo
        </button>
      </div>
    `;
    return;
  }

  filteredProducts.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const currentPrice = isWholesaleMode ? prod.priceWholesale : prod.priceRetail;
    const saving = prod.priceRetail - prod.priceWholesale;

    let branchesInStock = 0;
    let totalStockUnits = 0;
    for (const bId in prod.stockPerBranch) {
      if (prod.stockPerBranch[bId] > 0) {
        branchesInStock++;
        totalStockUnits += prod.stockPerBranch[bId];
      }
    }

    card.innerHTML = `
      <div class="product-badge-container">
        <span class="product-badge badge-mayoreo">${isWholesaleMode ? 'PRECIO MAYOREO (+6 PZAS)' : prod.badge}</span>
        <span class="product-badge badge-fast-ship">ENVÍO SLP & MÉXICO</span>
      </div>

      <div class="product-thumb-box">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
      </div>

      <div class="product-body">
        <div class="product-meta-row">
          <span class="product-brand">${prod.brand}</span>
          <span class="product-sku">SKU: ${prod.sku}</span>
        </div>

        <h3 class="product-title">${prod.name}</h3>
        <p class="product-compatibility">⚙️ ${prod.compatibility}</p>

        <!-- Indicador Multi-Sucursal AutoZone -->
        <div class="autozone-stock-preview" onclick="openBranchStockModal('${prod.id}')" title="Clic para consultar existencias en las 8 sucursales">
          <div class="stock-status-line">
            <span class="stock-status-green">Disponible en ${branchesInStock} de 8 sucursales</span>
            <span class="stock-view-all-link">Ver tiendas ➔</span>
          </div>
          <div style="font-size: 0.72rem; color: #64748B; margin-top: 3px;">
            ${totalStockUnits} piezas en piso SLP • Listo para Pick-up en 30 min
          </div>
        </div>

        <div class="product-price-section">
          <div class="price-main-row">
            <span class="current-price">$${currentPrice.toLocaleString('es-MX')} MXN</span>
            ${isWholesaleMode ? `<span style="font-size: 0.75rem; color: #15803D; font-weight: 700;">Ahorras $${saving} x pza</span>` : ''}
          </div>
          <div class="wholesale-price-notice">
            ${isWholesaleMode ? `📦 Tarifa Mayoreo activada (Agrega mín. 6 piezas)` : `Precio Mayoreo: $${prod.priceWholesale} (a partir de 6 pzas)`}
          </div>
        </div>

        <div class="product-action-row">
          <button class="btn-add-cart" onclick="addToCart('${prod.id}')">
            🛒 ${isWholesaleMode ? 'Agregar 6 pzas al Carrito' : 'Agregar al Carrito'}
          </button>
          <button class="btn-check-branches" onclick="openBranchStockModal('${prod.id}')" title="Ver disponibilidad en sucursales">
            📍
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * 3. Renderiza las 8 Sucursales con Embed de Google Maps Arriba/Detrás
 * Cuadro del mismo ancho que la ficha, con el efecto que está por detrás del cuadro blanco
 */
function renderBranchesGrid() {
  const grid = document.getElementById('branches-cards-grid');
  if (!grid) return;

  grid.innerHTML = '';
  BDN_BRANCHES.forEach(branch => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('branch-card-container');

    const branchWaText = encodeURIComponent(`Hola BDN Asistente Virtual, deseo consultar existencias en la sucursal ${branch.name} (${branch.address}).`);
    const waUrl = `${CENTRAL_WHATSAPP_URL}?text=${branchWaText}`;

    cardContainer.innerHTML = `
      <!-- 3. Cuadro del Embed de Google Maps (Detrás / Arriba de la ficha) -->
      <div class="branch-map-embed-box">
        <span class="map-overlay-badge">
          📍 ${branch.isMatriz ? 'MATRIZ ALLENDE' : branch.name}
        </span>
        <iframe 
          class="branch-map-iframe" 
          src="${branch.embedMapUrl}" 
          loading="lazy" 
          allowfullscreen 
          title="Mapa de ${branch.name}">
        </iframe>
      </div>

      <!-- 3. Ficha de Información Blanca (Al frente, pegada y solapada con el mapa) -->
      <div class="branch-info-front-card">
        <div class="branch-card-header">
          <div>
            <h4 class="branch-title">${branch.name}</h4>
            <span style="font-size: 0.72rem; color: #FF5500; font-weight: 800; text-transform: uppercase;">
              ${branch.specialty}
            </span>
          </div>
          ${branch.isMatriz ? '<span style="background:#FF5500;color:#FFF;font-size:0.68rem;padding:2px 8px;border-radius:999px;font-weight:800;">MATRIZ</span>' : ''}
        </div>

        <p class="branch-address">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${branch.address}
        </p>

        <div class="branch-status-row">
          <span>🟢 Abierto hoy</span>
          <span style="color:#64748B;font-weight:normal;">• ${branch.hours}</span>
        </div>

        <div class="branch-actions">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-branch-wa">
            WhatsApp Central
          </a>
          <a href="${branch.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-branch-map">
            Cómo llegar (GPS)
          </a>
        </div>
      </div>
    `;

    grid.appendChild(cardContainer);
  });
}

/**
 * 6. Carrito: Al hacer clic en mayoreo, agregar automáticamente 6 piezas
 */
window.addToCart = function(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  // Si está en modo mayoreo, agrega 6 piezas automáticamente
  const qtyToAdd = isWholesaleMode ? 6 : 1;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += qtyToAdd;
  } else {
    cart.push({ product: prod, quantity: qtyToAdd });
  }

  updateCartUI();
  const price = isWholesaleMode ? prod.priceWholesale : prod.priceRetail;

  if (isWholesaleMode) {
    showToast(`🔥 ¡Tarifa Mayoreo! Agregadas 6 piezas de "${prod.name}" ($${price} MXN c/u)`);
  } else {
    showToast(`✅ "${prod.name}" agregado al carrito ($${price} MXN)`);
  }
};

window.changeCartQty = function(index, delta) {
  if (!cart[index]) return;
  
  // En modo mayoreo, los saltos son de 6 piezas o mínimo 6
  const step = isWholesaleMode ? (delta * 6) : delta;
  cart[index].quantity += step;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
};

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCartUI();
  showToast('Producto eliminado del carrito');
};

function updateCartUI() {
  const badge = document.getElementById('cart-counter-badge');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) badge.textContent = totalCount;

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div style="font-size: 3rem; margin-bottom: 12px;">🛒</div>
        <h4 style="color: #0A1931; margin-bottom: 6px;">Tu carrito está vacío</h4>
        <p style="font-size: 0.85rem;">Explora nuestras refacciones y bicimotos para agregar productos.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0 MXN';
    return;
  }

  let subtotal = 0;
  let itemsHtml = '';

  cart.forEach((item, index) => {
    const p = item.product;
    const price = isWholesaleMode ? p.priceWholesale : p.priceRetail;
    const itemTotal = price * item.quantity;
    subtotal += itemTotal;

    itemsHtml += `
      <div class="cart-item-row">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img">
        <div>
          <div class="cart-item-title">${p.name}</div>
          <div class="cart-item-price">$${price.toLocaleString('es-MX')} MXN c/u</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeCartQty(${index}, -1)">-</button>
            <span class="cart-item-qty">${item.quantity} pzas</span>
            <button class="qty-btn" onclick="changeCartQty(${index}, 1)">+</button>
            ${isWholesaleMode ? '<span style="font-size:0.68rem;background:#FF5500;color:#FFF;padding:1px 5px;border-radius:4px;margin-left:4px;">MAYOREO</span>' : ''}
          </div>
        </div>
        <button class="btn-remove-item" onclick="removeFromCart(${index})" title="Eliminar">🗑️</button>
      </div>
    `;
  });

  itemsContainer.innerHTML = itemsHtml;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('es-MX')} MXN`;
}

function setupCartDrawer() {
  const cartBtn = document.querySelector('.cart-btn');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  const closeCartBtn = document.getElementById('btn-close-cart');
  const proceedBtn = document.getElementById('btn-proceed-checkout');

  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  }

  if (closeCartBtn && cartBackdrop) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCartDrawer();
    });
  }

  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      closeCartDrawer();
      openAccountModal();
    });
  }
}

function openCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (backdrop) {
    updateCartUI();
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * 1. SECCIÓN DE MI CUENTA / REGISTRO PROFESIONAL (B2C & B2B TALLERES)
 */
function setupAccountModule() {
  const userAccountBtn = document.getElementById('user-account-btn');
  const modalBackdrop = document.getElementById('account-modal-backdrop');
  const closeModalBtn = document.getElementById('btn-close-account-modal');
  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const profileView = document.getElementById('account-profile-view');
  const typeCards = document.querySelectorAll('.account-type-card');
  const workshopFields = document.getElementById('workshop-specific-fields');

  if (userAccountBtn) {
    userAccountBtn.addEventListener('click', openAccountModal);
  }

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', closeAccountModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeAccountModal();
    });
  }

  // Switch de Tabs
  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      switchAccountTab('login');
    });
    tabRegister.addEventListener('click', () => {
      switchAccountTab('register');
    });
  }

  // Selector Tipo de Cuenta (Particular vs Taller Mecánico)
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const type = card.dataset.type;
      if (workshopFields) {
        workshopFields.style.display = (type === 'taller') ? 'block' : 'none';
      }
    });
  });

  // Envío de Registro
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedType = document.querySelector('.account-type-card.selected')?.dataset.type || 'particular';
      const name = document.getElementById('reg-name').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const workshopName = document.getElementById('reg-workshop-name')?.value.trim() || '';
      const rfc = document.getElementById('reg-rfc')?.value.trim() || '';
      const address = document.getElementById('reg-address').value.trim();
      const city = document.getElementById('reg-city').value.trim();
      const zip = document.getElementById('reg-zip').value.trim();

      if (!name || !phone || !email || !address) {
        alert('Por favor completa todos los campos requeridos (*).');
        return;
      }

      currentUser = {
        name,
        phone,
        email,
        accountType: selectedType,
        workshopName,
        rfc,
        address,
        city,
        zip
      };

      localStorage.setItem('bdn_user', JSON.stringify(currentUser));
      updateUserButtonUI();
      renderProfileUI();

      if (selectedType === 'taller') {
        enableWholesaleMode();
        showToast(`🎉 ¡Bienvenido Taller ${workshopName || name}! Precios de Mayoreo activados.`);
      } else {
        showToast(`🎉 ¡Cuenta creada con éxito! Bienvenido, ${name.split(' ')[0]}.`);
      }

      switchAccountTab('profile');
    });
  }

  // Envío de Login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailOrPhone = document.getElementById('login-identifier').value.trim();
      
      // Simulación de login exitoso o recuperación de cuenta
      if (!currentUser) {
        currentUser = {
          name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Cliente BDN',
          phone: emailOrPhone,
          email: emailOrPhone,
          accountType: 'particular',
          address: 'Av. Salvador Nava #100, San Luis Potosí',
          city: 'San Luis Potosí',
          zip: '78000'
        };
        localStorage.setItem('bdn_user', JSON.stringify(currentUser));
      }

      updateUserButtonUI();
      renderProfileUI();
      showToast(`👋 ¡Sesión iniciada! Hola de nuevo, ${currentUser.name}.`);
      switchAccountTab('profile');
    });
  }

  updateUserButtonUI();
}

function openAccountModal() {
  const modal = document.getElementById('account-modal-backdrop');
  if (!modal) return;

  if (currentUser) {
    renderProfileUI();
    switchAccountTab('profile');
  } else {
    switchAccountTab('register');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAccountModal() {
  const modal = document.getElementById('account-modal-backdrop');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchAccountTab(tab) {
  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const profileView = document.getElementById('account-profile-view');

  if (tab === 'login') {
    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');
    if (formLogin) formLogin.style.display = 'block';
    if (formRegister) formRegister.style.display = 'none';
    if (profileView) profileView.style.display = 'none';
  } else if (tab === 'register') {
    tabRegister?.classList.add('active');
    tabLogin?.classList.remove('active');
    if (formLogin) formLogin.style.display = 'none';
    if (formRegister) formRegister.style.display = 'block';
    if (profileView) profileView.style.display = 'none';
  } else if (tab === 'profile') {
    tabLogin?.classList.remove('active');
    tabRegister?.classList.remove('active');
    if (formLogin) formLogin.style.display = 'none';
    if (formRegister) formRegister.style.display = 'none';
    if (profileView) profileView.style.display = 'block';
  }
}

function renderProfileUI() {
  const profileContainer = document.getElementById('account-profile-view');
  if (!profileContainer || !currentUser) return;

  const isTaller = currentUser.accountType === 'taller';

  profileContainer.innerHTML = `
    <div class="user-profile-panel">
      <div class="user-profile-header">
        <div class="user-avatar-circle">
          ${currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style="color:#0A1931;font-size:1.25rem;margin-bottom:4px;">${currentUser.name}</h3>
          <span style="background:${isTaller ? '#FF5500' : '#0A1931'};color:#FFF;font-size:0.75rem;padding:3px 10px;border-radius:999px;font-weight:700;">
            ${isTaller ? '🛠️ CUENTA TALLER / MAYORISTA' : '👤 COMPRADOR PARTICULAR'}
          </span>
          ${isTaller && currentUser.workshopName ? `<div style="font-size:0.85rem;color:#475569;margin-top:4px;"><strong>Taller:</strong> ${currentUser.workshopName}</div>` : ''}
        </div>
      </div>

      <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:16px;">
        <h4 style="color:#0A1931;font-size:0.95rem;margin-bottom:10px;">📍 Dirección de Envío Guardada:</h4>
        <p style="font-size:0.88rem;color:#475569;margin-bottom:4px;">${currentUser.address}, ${currentUser.city} (CP: ${currentUser.zip})</p>
        <p style="font-size:0.85rem;color:#64748B;">📱 WhatsApp: ${currentUser.phone} • ✉️ Email: ${currentUser.email}</p>
      </div>

      <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:16px;">
        <h4 style="color:#1E3A8A;font-size:0.95rem;margin-bottom:6px;">⚡ Beneficios Activos de tu Cuenta:</h4>
        <ul style="font-size:0.82rem;color:#1E40AF;padding-left:18px;line-height:1.6;">
          <li>${isTaller ? 'Precios de Mayoreo activados automáticamente (+6 piezas).' : 'Acceso a promociones y Pick-up en 30 minutos.'}</li>
          <li>Rastreo y confirmación de pedidos vía WhatsApp central con Bot IA.</li>
          <li>Facturación fiscal CFDI 4.0 inmediata en sucursal o en línea.</li>
        </ul>
      </div>

      <div style="display:flex;gap:12px;margin-top:10px;">
        <button class="btn-checkout-ml" style="margin:0;flex:1;" onclick="confirmCartOrder()">
          📦 ${cart.length > 0 ? 'Enviar Pedido Actual a WhatsApp' : 'Comenzar a Comprar'}
        </button>
        <button class="btn-logout" onclick="logoutUser()">
          Cerrar Sesión
        </button>
      </div>
    </div>
  `;
}

window.logoutUser = function() {
  localStorage.removeItem('bdn_user');
  currentUser = null;
  updateUserButtonUI();
  switchAccountTab('register');
  showToast('Has cerrado sesión correctamente');
};

function updateUserButtonUI() {
  const btn = document.getElementById('user-account-btn');
  if (!btn) return;

  if (currentUser) {
    const isTaller = currentUser.accountType === 'taller';
    btn.innerHTML = `<span>${isTaller ? '🛠️' : '👤'} ${currentUser.name.split(' ')[0]}</span>`;
    btn.style.borderColor = 'var(--accent-orange)';
  } else {
    btn.innerHTML = `<span>👤 Mi Cuenta</span>`;
    btn.style.borderColor = 'var(--gray-border)';
  }
}

/**
 * Confirmar y Enviar Pedido a WhatsApp
 */
window.confirmCartOrder = function() {
  if (cart.length === 0) {
    closeAccountModal();
    const catalogEl = document.getElementById('catalogo-section');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    showToast('Agrega productos al carrito para realizar tu pedido');
    return;
  }

  let itemsText = '';
  let totalOrder = 0;
  cart.forEach(item => {
    const price = isWholesaleMode ? item.product.priceWholesale : item.product.priceRetail;
    const t = price * item.quantity;
    totalOrder += t;
    itemsText += `• ${item.quantity}x ${item.product.name} (SKU: ${item.product.sku}) - $${t} MXN%0A`;
  });

  const orderMsg = encodeURIComponent(
    `*NUEVO PEDIDO TIENDA EN LÍNEA BDN*%0A` +
    `--------------------------------------%0A` +
    `👤 *Cliente:* ${currentUser ? currentUser.name : 'Cliente Web'}%0A` +
    `📱 *WhatsApp:* ${currentUser ? currentUser.phone : 'Sin teléfono'}%0A` +
    `📍 *Dirección:* ${currentUser ? currentUser.address + ', ' + currentUser.city : 'San Luis Potosí'}%0A` +
    `🏷️ *Modalidad:* ${isWholesaleMode ? 'Mayoreo (+6 pzas)' : 'Menudeo'}%0A` +
    `--------------------------------------%0A` +
    `📦 *Productos:*%0A${itemsText}%0A` +
    `💰 *TOTAL A PAGAR:* $${totalOrder.toLocaleString('es-MX')} MXN%0A` +
    `🚚 *Entrega:* Flotilla Propia SLP Mismo Día o Envío Nacional Paquetería`
  );

  closeAccountModal();
  cart = [];
  updateCartUI();
  window.open(`${CENTRAL_WHATSAPP_URL}?text=${orderMsg}`, '_blank');
  showToast('🎉 ¡Pedido generado! Redirigiendo a WhatsApp para confirmación inmediata.');
};

/**
 * Switch Mayoreo vs Menudeo
 */
function setupWholesaleToggle() {
  const btnMenudeo = document.getElementById('toggle-menudeo');
  const btnMayoreo = document.getElementById('toggle-mayoreo');

  if (!btnMenudeo || !btnMayoreo) return;

  btnMenudeo.addEventListener('click', () => {
    isWholesaleMode = false;
    btnMenudeo.classList.add('active');
    btnMayoreo.classList.remove('active');
    renderProducts();
    updateCartUI();
    showToast('Modo Menudeo activado');
  });

  btnMayoreo.addEventListener('click', () => {
    enableWholesaleMode();
  });
}

function enableWholesaleMode() {
  const btnMenudeo = document.getElementById('toggle-menudeo');
  const btnMayoreo = document.getElementById('toggle-mayoreo');
  isWholesaleMode = true;
  btnMayoreo?.classList.add('active');
  btnMenudeo?.classList.remove('active');

  // Si hay productos en el carrito con menos de 6 piezas, ajustarlos al mínimo de mayoreo
  cart.forEach(item => {
    if (item.quantity < 6) item.quantity = 6;
  });

  renderProducts();
  updateCartUI();
  showToast('🔥 Modo Mayoreo activado: Se agregan 6 piezas automáticamente al dar clic');
}

/**
 * Modal AutoZone: Despliega existencias en las 8 tiendas
 */
window.openBranchStockModal = function(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const modalBackdrop = document.getElementById('branch-stock-modal');
  const modalContent = document.getElementById('modal-stock-content');
  if (!modalBackdrop || !modalContent) return;

  let branchListHtml = '';

  BDN_BRANCHES.forEach(branch => {
    const stock = prod.stockPerBranch[branch.id] || 0;
    let badgeClass = 'stock-badge-available';
    let statusText = `${stock} disponibles`;

    if (stock === 0) {
      badgeClass = 'stock-badge-out';
      statusText = 'Agotado aquí (Disponible por envío)';
    } else if (stock < 5) {
      badgeClass = 'stock-badge-low';
      statusText = `Últimas ${stock} piezas`;
    }

    const itemWaText = encodeURIComponent(`Hola BDN Asistente Virtual, deseo apartar el producto "${prod.name}" (SKU: ${prod.sku}) para recoger en ${branch.name}.`);
    const waItemUrl = `${CENTRAL_WHATSAPP_URL}?text=${itemWaText}`;

    branchListHtml += `
      <div class="branch-stock-list-item">
        <div>
          <div style="font-weight: 700; color: #0A1931; font-size: 0.95rem;">
            ${branch.name} ${branch.isMatriz ? '<span style="background:#FF5500;color:#FFF;font-size:0.65rem;padding:2px 6px;border-radius:4px;margin-left:4px;">MATRIZ</span>' : ''}
          </div>
          <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;">
            ${branch.address}
          </div>
          <div style="font-size: 0.72rem; color: #0A1931; font-weight: 600; margin-top: 3px;">
            🕒 ${branch.hours}
          </div>
        </div>

        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <span class="stock-badge-pill ${badgeClass}">
            ${statusText}
          </span>
          <a href="${waItemUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; color: #25D366; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
            💬 Apartar con Bot IA
          </a>
        </div>
      </div>
    `;
  });

  modalContent.innerHTML = `
    <div class="modal-product-summary">
      <img src="${prod.image}" alt="${prod.name}">
      <div>
        <span style="font-size: 0.75rem; font-weight: 800; color: #FF5500; text-transform: uppercase;">${prod.brand} • SKU: ${prod.sku}</span>
        <h3 style="font-size: 1.15rem; color: #0A1931; margin: 4px 0;">${prod.name}</h3>
        <p style="font-size: 0.82rem; color: #64748B;">Precio Unitario: $${isWholesaleMode ? prod.priceWholesale : prod.priceRetail} MXN</p>
      </div>
    </div>

    <div style="background: #F1F5F9; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 0.82rem; color: #1E293B;">
      🚚 <strong>Modalidades de Entrega:</strong><br>
      • <strong>Pick-up Express:</strong> Listo en 30 minutos en cualquiera de nuestras 8 tiendas en SLP.<br>
      • <strong>Envío Mismo Día SLP:</strong> Flotilla propia de camionetas y motos Don Nabor entrega en tu taller.<br>
      • <strong>Envío a Todo México:</strong> Cobertura nacional con FedEx y Estafeta.
    </div>

    <h4 style="font-size: 0.95rem; color: #0A1931; margin-bottom: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
      Existencias en tiempo real en las 8 Sucursales:
    </h4>

    <div class="branch-stock-list">
      ${branchListHtml}
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function setupModalHandlers() {
  const modalBackdrop = document.getElementById('branch-stock-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

function setupVehicleSelector() {
  const btnFilter = document.getElementById('btn-apply-vehicle-filter');
  const vehicleTypeSelect = document.getElementById('vehicle-type-select');
  const brandSelect = document.getElementById('vehicle-brand-select');

  if (btnFilter && vehicleTypeSelect) {
    btnFilter.addEventListener('click', () => {
      const type = vehicleTypeSelect.value;
      const brand = brandSelect ? brandSelect.value : '';

      const filtered = PRODUCTS_DATA.filter(p => {
        const matchesType = (type === 'all') || (normalizeText(p.vehicleType) === normalizeText(type));
        const matchesBrand = (brand === 'all' || brand === '') || (normalizeText(p.brand).includes(normalizeText(brand)));
        return matchesType && matchesBrand;
      });

      renderProducts(filtered);
      showToast(`Mostrando ${filtered.length} refacciones compatibles`);
    });
  }
}

function setupSearchEngine() {
  const searchInput = document.getElementById('main-search-input');
  const searchForm = document.getElementById('main-search-form');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeSearch(searchInput.value);
    });

    searchInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === '') {
        renderProducts();
      }
    });
  }

  function executeSearch(query) {
    const q = normalizeText(query);
    if (!q) {
      renderProducts();
      return;
    }

    // Soporte para búsqueda multitermino sin acentos (ej. "bujia d8ea" o "llanta choho")
    const searchTokens = q.split(/\s+/).filter(token => token.length > 0);

    const results = PRODUCTS_DATA.filter(p => {
      const searchableContent = normalizeText(
        `${p.name} ${p.brand} ${p.sku} ${p.compatibility} ${p.category} ${p.badge || ''} ${p.promoInfo || ''}`
      );
      // Todos los términos de búsqueda deben coincidir sin importar acentos o mayúsculas
      return searchTokens.every(token => searchableContent.includes(token));
    });

    renderProducts(results);
    const catalogHeading = document.getElementById('catalogo-section');
    if (catalogHeading) {
      const targetPos = catalogHeading.getBoundingClientRect().top + window.pageYOffset - 70;
      smoothScrollTo(Math.max(0, targetPos), 1250);
    }
    showToast(`Resultados para "${query}": ${results.length} productos`);
  }
}

function setupCategorySelect() {
  const select = document.querySelector('.search-category-select');
  if (!select) return;

  select.innerHTML = `
    <option value="all">Todo el Catálogo</option>
    <option value="bicicletas">Catálogo de Bicicletas</option>
    <option value="refacciones-bici">Refacciones p/ Bicicleta</option>
    <option value="refacciones-moto">Refacciones p/ Motos</option>
    <option value="bicimotos">Bicimotos e-bike</option>
  `;

  select.addEventListener('change', () => {
    filterByCategory(select.value);
  });
}

function filterByCategory(cat) {
  // 1. Sincronizar estado visual activo en la barra de categorías
  document.querySelectorAll('.nav-link-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeLi = document.getElementById(`nav-item-${cat}`) || document.querySelector(`.nav-link-item a[onclick*="'${cat}'"]`)?.closest('.nav-link-item');
  if (activeLi) {
    activeLi.classList.add('active');
  } else if (cat === 'all') {
    document.getElementById('nav-item-all')?.classList.add('active');
  }

  // 2. Sincronizar selector dropdown del buscador
  const select = document.querySelector('.search-category-select');
  if (select && select.value !== cat) {
    select.value = cat;
  }

  // 3. Renderizar productos completos o filtrados
  if (cat === 'all') {
    renderProducts(PRODUCTS_DATA);
    showToast('Mostrando Todo el Catálogo');
  } else {
    const filtered = PRODUCTS_DATA.filter(p => normalizeText(p.category) === normalizeText(cat));
    renderProducts(filtered);
    showToast(`Filtrando: ${cat}`);
  }

  // 4. Desplazamiento suave al catálogo si se hace clic desde otra sección
  const catalogEl = document.getElementById('catalogo-section');
  if (catalogEl) {
    const headerH = document.querySelector('.main-header')?.offsetHeight || 75;
    const targetPos = catalogEl.getBoundingClientRect().top + window.pageYOffset - (headerH + 12);
    if (Math.abs(window.pageYOffset - targetPos) > 40) {
      smoothScrollTo(Math.max(0, targetPos), 1150);
    }
  }
}

window.resetFilters = function() {
  filterByCategory('all');
};

function renderBrandsGrid() {
  const grid = document.getElementById('brands-logo-grid');
  if (!grid) return;

  grid.innerHTML = '';
  OFFICIAL_BRANDS.forEach(brand => {
    const item = document.createElement('div');
    item.classList.add('brand-card-item');
    item.setAttribute('title', `Ver catálogo de refacciones ${brand.name}`);
    item.innerHTML = `
      <img src="assets/images/marcas/${brand.file}" alt="Logo oficial ${brand.name}" class="brand-logo-img-floating" loading="lazy">
    `;
    item.addEventListener('click', () => {
      const brandQuery = normalizeText(brand.query || brand.name);
      const filtered = PRODUCTS_DATA.filter(p => normalizeText(p.brand).includes(brandQuery));
      renderProducts(filtered.length > 0 ? filtered : PRODUCTS_DATA);
      const catalogEl = document.getElementById('catalogo-section');
      if (catalogEl) {
        const targetPos = catalogEl.getBoundingClientRect().top + window.pageYOffset - 70;
        smoothScrollTo(Math.max(0, targetPos), 1250);
      }
      showToast(`Filtrando refacciones de ${brand.name}`);
    });
    grid.appendChild(item);
  });
}

function showToast(message) {
  let toast = document.getElementById('bdn-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bdn-toast-notification';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #0A1931;
      color: #FFF;
      padding: 14px 22px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      border-left: 4px solid #FF5500;
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 999999;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(100px);
      opacity: 0;
      max-width: 380px;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3500);
}

/**
 * ============================================================================
 * SISTEMA DE SCROLL SUAVE Y DESPLAZAMIENTO LENTO PERSONALIZADO (SMOOTH SCROLL)
 * ============================================================================
 * Proporciona una transición cinematográfica suave y pausada (~1200ms a 1600ms)
 * con curva de aceleración y desaceleración natural (easeInOutCubic).
 */
function smoothScrollTo(targetY, duration = 1350) {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;

  // Si la distancia es muy grande (ej. desde el footer hasta el inicio), ajustar duración para mantener el efecto pausado
  const calculatedDuration = Math.min(1800, Math.max(1100, Math.abs(diff) * 0.45));
  const finalDuration = duration || calculatedDuration;
  let startTime = null;

  // Función de easing cúbico suave (acelera y frena con elegancia sin saltos)
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / finalDuration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + (diff * easeProgress));

    if (timeElapsed < finalDuration) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
}

// Inicializar interceptor de enlaces de desplazamiento suave (delegación de eventos para máxima compatibilidad)
function initSmoothScroll() {
  document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    if (href === '#top') {
      e.preventDefault();
      smoothScrollTo(0, 1450);
      return;
    }

    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      // Descontar altura dinámica del header sticky para que el título no quede tapado
      const headerH = document.querySelector('.main-header')?.offsetHeight || 75;
      const headerOffset = headerH + 10;
      const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      smoothScrollTo(Math.max(0, targetPosition), 1250);
    }
  });
}

/**
 * Motor de Header Sticky / Fijo Infalible
 * Combina CSS sticky con fallback dinámico fijo garantizado en todos los navegadores
 */
function setupStickyHeader() {
  const header = document.querySelector('.main-header');
  const topBar = document.querySelector('.top-bar');
  if (!header) return;

  // Espaciador para evitar saltos al fijar
  let spacer = document.getElementById('main-header-spacer');
  if (!spacer) {
    spacer = document.createElement('div');
    spacer.id = 'main-header-spacer';
    spacer.style.display = 'none';
    header.parentNode.insertBefore(spacer, header.nextSibling);
  }

  function updateSticky() {
    const topBarHeight = topBar ? topBar.offsetHeight : 36;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    if (scrollY > topBarHeight) {
      if (!header.classList.contains('is-fixed-top')) {
        spacer.style.height = header.offsetHeight + 'px';
        spacer.style.display = 'block';
        header.classList.add('is-fixed-top');
        header.classList.add('is-scrolled');
      }
    } else {
      if (header.classList.contains('is-fixed-top')) {
        header.classList.remove('is-fixed-top');
        header.classList.remove('is-scrolled');
        spacer.style.display = 'none';
      }
    }
  }

  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky, { passive: true });
  updateSticky();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScroll);
} else {
  initSmoothScroll();
}

