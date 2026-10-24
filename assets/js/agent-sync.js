/**
 * ============================================================================
 * BICICLETAS DON NABOR (BDN) — ARQUITECTURA MULTI-AGENTE ERP (8 SUCURSALES)
 * Módulo 1 (Pilar B): Sincronizador Edge 8 Tiendas + Buffer Anti-Desabasto +
 *                     Agente IA de Catalogación & Editor en Vivo
 * ============================================================================
 * NOTA DE DESPLIEGUE:
 * Por indicación comercial, el botón del sincronizador permanece OCULTO en la
 * vista pública de la tienda (SHOW_SYNC_CONSOLE_BUTTON = false).
 * Para abrir la consola en modo demostración privada o auditoría:
 *   1. Agrega ?sync=1 o ?admin=1 a la URL, o
 *   2. Presiona la combinación de teclas Alt + S, o
 *   3. Cambia SHOW_SYNC_CONSOLE_BUTTON = true.
 */

const SHOW_SYNC_CONSOLE_BUTTON = false;

(function initBdnMultiAgentArchitecture() {
  let stagedApprovedCatalog = null;
  let lastAuditReport = null;
  let antiShortageBuffer = 1; // Reserva 1 pieza en mostrador por sucursal por defecto

  document.addEventListener('DOMContentLoaded', () => {
    injectSyncConsoleDOM();

    const params = new URLSearchParams(window.location.search);
    const shouldShowBtn = SHOW_SYNC_CONSOLE_BUTTON || params.get('sync') === '1' || params.get('admin') === '1';

    if (shouldShowBtn) {
      const triggerBtn = document.getElementById('bdn-sync-console-trigger');
      if (triggerBtn) triggerBtn.style.display = 'inline-flex';
    }

    // Atajo privado para consultor: Alt + S abre la Consola Multi-Agente sin ensuciar la UI pública
    document.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        window.openBdnAgentConsole();
      }
    });
  });

  function injectSyncConsoleDOM() {
    // 1. Botón en Top Bar (Oculto por defecto salvo ?sync=1 o SHOW_SYNC_CONSOLE_BUTTON = true)
    const topBarRight = document.querySelector('.top-bar-right');
    if (topBarRight && !document.getElementById('bdn-sync-console-trigger')) {
      const btn = document.createElement('button');
      btn.id = 'bdn-sync-console-trigger';
      btn.type = 'button';
      btn.onclick = () => window.openBdnAgentConsole();
      btn.style.cssText = `
        display: none;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #FF5500 0%, #E04B00 100%);
        color: #FFFFFF;
        border: 1px solid rgba(255,255,255,0.25);
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 0.74rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(255, 85, 0, 0.35);
      `;
      btn.innerHTML = `🤖 Sincronizador ERP (8 Sucursales)`;
      topBarRight.appendChild(btn);
    }

    // 2. Modal de Consola Multi-Agente BDN
    if (document.getElementById('bdn-agent-sync-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'bdn-agent-sync-modal';
    modal.className = 'spec-modal-backdrop';
    modal.innerHTML = `
      <div class="spec-modal-box" style="max-width: 1080px; padding: 26px 30px;">
        <button type="button" class="modal-close-btn" onclick="closeBdnAgentConsole()">&times;</button>

        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-bottom:16px;border-bottom:2px solid #E2E8F0;margin-bottom:18px;">
          <div>
            <span style="background:#0A1931;color:#FF5500;font-size:0.7rem;font-weight:800;padding:3px 10px;border-radius:999px;letter-spacing:0.6px;text-transform:uppercase;">
              MÓDULO 1 • PILAR B: INGENIERÍA DE SINCRONIZACIÓN & AGENTES IA
            </span>
            <h2 style="font-family:var(--font-heading);font-size:1.45rem;font-weight:800;color:#0A1931;margin-top:6px;">
              Consola Multi-Agente ERP — Red de 8 Sucursales Don Nabor
            </h2>
          </div>

          <div style="display:flex;gap:8px;">
            <button type="button" id="tab-sync-audit" onclick="switchBdnSyncTab('audit')" style="background:#0A1931;color:#FFF;border:none;padding:9px 16px;border-radius:8px;font-size:0.8rem;font-weight:800;cursor:pointer;">
              📥 1. Sincronizador CSV & Auditoría (2 Pasos)
            </button>
            <button type="button" id="tab-sync-editor" onclick="switchBdnSyncTab('editor')" style="background:#F1F5F9;color:#0A1931;border:1px solid #CBD5E1;padding:9px 16px;border-radius:8px;font-size:0.8rem;font-weight:800;cursor:pointer;">
              ✏️ 2. Editor en Vivo (8 Sucursales)
            </button>
          </div>
        </div>

        <!-- PESTAÑA 1: AUDITORÍA DE CSV EN 2 PASOS + BUFFER ANTI-DESABASTO -->
        <div id="bdn-sync-panel-audit">
          <div style="display:grid;grid-template-columns: 1.2fr 1fr;gap:18px;margin-bottom:18px;">
            <div style="background:#F8FAFC;border:1.5px dashed #94A3B8;border-radius:12px;padding:18px;">
              <div style="font-size:0.85rem;font-weight:800;color:#0A1931;margin-bottom:6px;">
                📂 Paso A: Seleccionar Corte de Inventario ERP / CSV (8 Tiendas SLP)
              </div>
              <p style="font-size:0.78rem;color:#64748B;margin-bottom:12px;">
                Sube el archivo CSV exportado del punto de venta con las columnas de las 8 sucursales o carga el corte de muestra con anomalías reales de almacén.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
                <input type="file" id="bdn-erp-csv-input" accept=".csv" style="font-size:0.78rem;max-width:250px;">
                <button type="button" onclick="loadSampleBdnErpCsv()" style="background:#EFF6FF;border:1px solid #93C5FD;color:#1D4ED8;padding:7px 12px;border-radius:8px;font-size:0.76rem;font-weight:800;cursor:pointer;">
                  📄 Cargar CSV Muestra (16 SKUs con Errores)
                </button>
              </div>
              <div id="bdn-csv-loaded-status" style="margin-top:10px;font-size:0.78rem;font-weight:700;color:#15803D;"></div>
            </div>

            <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:12px;padding:18px;">
              <div style="font-size:0.85rem;font-weight:800;color:#9A3412;margin-bottom:6px;">
                🛡️ Regla de Negocio: Buffer Anti-Desabasto en Mostrador
              </div>
              <p style="font-size:0.76rem;color:#7C2D12;margin-bottom:10px;line-height:1.4;">
                Unidades reservadas por sucursal para venta física de mostrador (no se exponen en carrito web para evitar sobreventa):
              </p>
              <select id="bdn-buffer-select" onchange="updateBdnBufferSetting(this.value)" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #FDBA74;font-size:0.8rem;font-weight:700;color:#0A1931;background:#FFF;">
                <option value="0">Sin Buffer (Publicar 100% del stock físico)</option>
                <option value="1" selected>Buffer Estándar: Reservar 1 pza en piso por sucursal (Recomendado)</option>
                <option value="2">Buffer Alto Tráfico: Reservar 2 pzas en piso por sucursal</option>
              </select>
            </div>
          </div>

          <!-- BOTONES DE LOS 2 PASOS EJECUTIVOS -->
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
            <button type="button" id="btn-bdn-step1-report" onclick="generateBdnAuditReport()" style="flex:1;background:#0A1931;color:#FFF;border:none;padding:13px 18px;border-radius:10px;font-size:0.88rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
              ⚡ 1. Generar Reporte de Depuración (8 Sucursales)
            </button>
            <button type="button" id="btn-bdn-step2-publish" onclick="publishApprovedBdnInventory()" disabled style="flex:1;background:#94A3B8;color:#FFF;border:none;padding:13px 18px;border-radius:10px;font-size:0.88rem;font-weight:800;cursor:not-allowed;display:flex;align-items:center;justify-content:center;gap:8px;">
              🚀 2. Subir Inventario Aprobado a Tienda Web
            </button>
          </div>

          <!-- CONTENEDOR DEL REPORTE DE AUDITORÍA -->
          <div id="bdn-audit-report-output" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:18px;min-height:140px;">
            <div style="text-align:center;color:#64748B;font-size:0.85rem;padding:24px 0;">
              Selecciona un archivo CSV o haz clic en <strong>"📄 Cargar CSV Muestra"</strong> y luego presiona <strong>"⚡ 1. Generar Reporte de Depuración"</strong>.
            </div>
          </div>
        </div>

        <!-- PESTAÑA 2: EDITOR EN VIVO DE CATÁLOGO Y 8 SUCURSALES -->
        <div id="bdn-sync-panel-editor" style="display:none;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
            <p style="font-size:0.82rem;color:#475569;">
              Edita en tiempo real nombres, fotografías, precios Menudeo/Mayoreo (+6 pzas) y existencias en cada una de las 8 tiendas de SLP:
            </p>
            <button type="button" onclick="resetBdnCatalogToFactory()" style="background:#FEE2E2;color:#B91C1C;border:1px solid #FECACA;padding:6px 12px;border-radius:8px;font-size:0.75rem;font-weight:800;cursor:pointer;">
              🔄 Restaurar Catálogo Original
            </button>
          </div>
          <div id="bdn-live-editor-list" style="display:flex;flex-direction:column;gap:12px;max-height:58vh;overflow-y:auto;padding-right:6px;"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const fileInput = document.getElementById('bdn-erp-csv-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          window._rawBdnCsvContent = ev.target.result;
          const st = document.getElementById('bdn-csv-loaded-status');
          if (st) st.textContent = `✅ Archivo cargado: ${file.name} (${Math.round(file.size / 1024)} KB). Listo para Paso 1.`;
        };
        reader.readAsText(file, 'UTF-8');
      });
    }
  }

  window.openBdnAgentConsole = function() {
    const modal = document.getElementById('bdn-agent-sync-modal');
    if (!modal) return;
    modal.classList.add('active');
    window.syncModalScrollLock?.();
    renderBdnLiveEditor();
  };

  window.closeBdnAgentConsole = function() {
    const modal = document.getElementById('bdn-agent-sync-modal');
    if (modal) {
      modal.classList.remove('active');
      window.syncModalScrollLock?.();
    }
  };

  window.switchBdnSyncTab = function(tab) {
    const pAudit = document.getElementById('bdn-sync-panel-audit');
    const pEditor = document.getElementById('bdn-sync-panel-editor');
    const bAudit = document.getElementById('tab-sync-audit');
    const bEditor = document.getElementById('tab-sync-editor');

    if (tab === 'audit') {
      if (pAudit) pAudit.style.display = 'block';
      if (pEditor) pEditor.style.display = 'none';
      if (bAudit) { bAudit.style.background = '#0A1931'; bAudit.style.color = '#FFF'; }
      if (bEditor) { bEditor.style.background = '#F1F5F9'; bEditor.style.color = '#0A1931'; }
    } else {
      if (pAudit) pAudit.style.display = 'none';
      if (pEditor) pEditor.style.display = 'block';
      if (bEditor) { bEditor.style.background = '#0A1931'; bEditor.style.color = '#FFF'; }
      if (bAudit) { bAudit.style.background = '#F1F5F9'; bAudit.style.color = '#0A1931'; }
      renderBdnLiveEditor();
    }
  };

  window.updateBdnBufferSetting = function(val) {
    antiShortageBuffer = Math.max(0, parseInt(val, 10) || 0);
    if (window._rawBdnCsvContent) {
      generateBdnAuditReport();
    }
  };

  window.loadSampleBdnErpCsv = function() {
    fetch('assets/data/erp-8-sucursales-bdn-muestra.csv')
      .then(r => r.text())
      .then(txt => {
        window._rawBdnCsvContent = txt;
        const st = document.getElementById('bdn-csv-loaded-status');
        if (st) st.textContent = '✅ Cargado: erp-8-sucursales-bdn-muestra.csv (16 registros de las 8 sucursales SLP). Ahora haz clic en el Botón 1.';
        window.showToast?.('📄 CSV de muestra cargado. Haz clic en "1. Generar Reporte de Depuración"');
      })
      .catch(() => {
        window.showToast?.('⚠️ No se pudo leer el CSV de muestra');
      });
  };

  function mapImageBySkuOrName(sku, name, currentProducts) {
    const existing = (currentProducts || []).find(p => p.sku.toLowerCase() === sku.toLowerCase());
    if (existing) return existing.image;
    const n = (sku + ' ' + name).toLowerCase();
    if (n.includes('choho') && n.includes('llanta')) return 'assets/images/products/llanta-choho-real.jpg';
    if (n.includes('ngk') || n.includes('bujia')) return 'assets/images/products/bujia-ngk-real.jpg';
    if (n.includes('kmc') || n.includes('cadena')) return 'assets/images/products/cadena-kmc-real.jpg';
    if (n.includes('akron')) return 'assets/images/products/aceite-akron-real.jpg';
    if (n.includes('vital') || n.includes('balata')) return 'assets/images/products/balatas-vital-real.jpg';
    if (n.includes('gorila') || n.includes('camara')) return 'assets/images/products/camara-gorila-real.jpg';
    if (n.includes('bicimoto') || n.includes('alessia e01')) return 'assets/images/products/bicimoto-alessia-real.jpg';
    if (n.includes('windsor')) return 'assets/images/products/bici-windsor-r29-real.jpg';
    if (n.includes('altrego')) return 'assets/images/products/bici-altrego-r26-real.jpg';
    if (n.includes('motul')) return 'assets/images/products/aceite-motul-real.jpg';
    if (n.includes('casco')) return 'assets/images/products/casco-dot-real.jpg';
    if (n.includes('arrastre') || n.includes('sprock')) return 'assets/images/products/kit-arrastre-real.jpg';
    return 'assets/images/products/llanta-choho-real.jpg';
  }

  /**
   * PASO 1: Generar Reporte de Depuración de las 8 Sucursales + Buffer Anti-Desabasto
   */
  window.generateBdnAuditReport = function() {
    if (!window._rawBdnCsvContent) {
      window.showToast?.('⚠️ Primero selecciona un archivo CSV o carga el CSV de muestra');
      return;
    }

    const lines = window._rawBdnCsvContent.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2) return;

    const approved = [];
    const quarantined = [];
    let totalRawUnits = 0;
    let totalBufferedWebUnits = 0;
    let totalRetailValue = 0;

    const branchKeys = [
      'matriz-allende', 'allende-motos', 'guajardo', 'abastos',
      'galvez', 'saucito', 'periferico', 'salvador-nava'
    ];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      if (cols.length < 16) continue;

      const sku = cols[0];
      const name = cols[1];
      const brand = cols[2];
      const category = cols[3];
      const vehicleType = cols[4];
      const priceRetail = parseFloat(cols[5]) || 0;
      const priceWholesale = parseFloat(cols[6]) || 0;
      const compatibility = cols[7];
      const rawStocks = cols.slice(8, 16).map(n => parseInt(n, 10) || 0);

      const hasNegative = rawStocks.some(n => n < 0);
      const rawSum = rawStocks.reduce((a, b) => a + b, 0);
      const isInternal = /taller interno|no vender|garantia/i.test(name + ' ' + compatibility + ' ' + brand);

      if (hasNegative) {
        quarantined.push({ sku, name, reason: 'Stock Negativo en Sucursal (Descuadre de Caja/Almacén)', rawSum });
        continue;
      }
      if (priceRetail <= 0 || priceWholesale <= 0) {
        quarantined.push({ sku, name, reason: 'Sin Precio Menudeo o Mayoreo Asignado ($0 MXN)', rawSum });
        continue;
      }
      if (isInternal) {
        quarantined.push({ sku, name, reason: 'Insumo de Uso Interno Taller (Bloqueado para E-Commerce)', rawSum });
        continue;
      }
      if (rawSum <= 0) {
        quarantined.push({ sku, name, reason: 'Agotado en las 8 Sucursales (0 existencias)', rawSum });
        continue;
      }

      // Aplicar Buffer Anti-Desabasto por sucursal
      const stockPerBranch = {};
      let webSum = 0;
      branchKeys.forEach((bKey, idx) => {
        const floorQty = rawStocks[idx] || 0;
        totalRawUnits += floorQty;
        const webQty = floorQty > antiShortageBuffer ? (floorQty - antiShortageBuffer) : 0;
        stockPerBranch[bKey] = webQty;
        webSum += webQty;
      });

      totalBufferedWebUnits += webSum;
      totalRetailValue += (webSum * priceRetail);

      const existingMatch = (window.DEFAULT_PRODUCTS_DATA || []).find(
        p => p.sku.toLowerCase() === sku.toLowerCase() || p.name.toLowerCase().includes(name.toLowerCase().slice(0, 14))
      );

      approved.push({
        id: existingMatch ? existingMatch.id : `PROD-CSV-${i}`,
        sku,
        name,
        brand: brand.toUpperCase(),
        category,
        vehicleType,
        compatibility,
        priceRetail,
        priceWholesale,
        unit: existingMatch?.unit || 'pza',
        image: mapImageBySkuOrName(sku, name, window.PRODUCTS_DATA),
        badge: existingMatch?.badge || 'STOCK SINCRONIZADO',
        promoInfo: existingMatch?.promoInfo || 'Existencias auditadas en las 8 sucursales de SLP',
        specs: existingMatch?.specs || [],
        fitmentModels: existingMatch?.fitmentModels || compatibility.split('/').map(s => s.trim()),
        stockPerBranch
      });
    }

    stagedApprovedCatalog = approved;
    lastAuditReport = { approved, quarantined, totalRawUnits, totalBufferedWebUnits, totalRetailValue };

    const out = document.getElementById('bdn-audit-report-output');
    if (out) {
      out.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;">
          <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:1.35rem;font-weight:900;color:#047857;">${approved.length} SKUs</div>
            <div style="font-size:0.7rem;font-weight:800;color:#065F46;text-transform:uppercase;">Aprobados para Web</div>
          </div>
          <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:1.35rem;font-weight:900;color:#B91C1C;">${quarantined.length} SKUs</div>
            <div style="font-size:0.7rem;font-weight:800;color:#991B1B;text-transform:uppercase;">En Cuarentena (Lista Roja)</div>
          </div>
          <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:1.35rem;font-weight:900;color:#1D4ED8;">${totalBufferedWebUnits.toLocaleString('es-MX')} pzas</div>
            <div style="font-size:0.7rem;font-weight:800;color:#1E40AF;text-transform:uppercase;">Stock Web (Buffer -${antiShortageBuffer}/suc)</div>
          </div>
          <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:10px;text-align:center;">
            <div style="font-size:1.35rem;font-weight:900;color:#C2410C;">$${totalRetailValue.toLocaleString('es-MX')}</div>
            <div style="font-size:0.7rem;font-weight:800;color:#9A3412;text-transform:uppercase;">Valor Inventario Listo</div>
          </div>
        </div>

        <div style="background:#FFFFFF;border:1px solid #FECACA;border-radius:8px;padding:12px;">
          <div style="font-size:0.78rem;font-weight:800;color:#B91C1C;text-transform:uppercase;margin-bottom:6px;">
            🚨 Lista Roja de Almacén (SKUs Bloqueados por el Agente Auditor):
          </div>
          ${quarantined.map(q => `
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;padding:5px 0;border-bottom:1px dashed #F1F5F9;">
              <span><strong>${q.sku}</strong> — ${q.name}</span>
              <span style="color:#B91C1C;font-weight:700;">❌ ${q.reason}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    const btnPublish = document.getElementById('btn-bdn-step2-publish');
    if (btnPublish) {
      btnPublish.disabled = false;
      btnPublish.style.background = '#10B981';
      btnPublish.style.cursor = 'pointer';
    }

    window.showToast?.(`⚡ Reporte generado: ${approved.length} SKUs aprobados y ${quarantined.length} enviados a Lista Roja.`);
  };

  /**
   * PASO 2: Publicar el Inventario Aprobado en la Tienda en Línea
   */
  window.publishApprovedBdnInventory = function() {
    if (!stagedApprovedCatalog || stagedApprovedCatalog.length === 0) {
      window.showToast?.('⚠️ Primero genera el reporte de auditoría (Paso 1)');
      return;
    }

    window.PRODUCTS_DATA.length = 0;
    stagedApprovedCatalog.forEach(item => window.PRODUCTS_DATA.push(item));
    localStorage.setItem('bdn_catalog_v2', JSON.stringify(window.PRODUCTS_DATA));

    window.renderProducts?.(window.PRODUCTS_DATA);
    closeBdnAgentConsole();
    window.showToast?.(`🚀 ¡Inventario sincronizado! ${stagedApprovedCatalog.length} productos publicados en las 8 sucursales.`);
  };

  /**
   * Editor en Vivo de Catálogo y Existencias por Sucursal
   */
  function renderBdnLiveEditor() {
    const container = document.getElementById('bdn-live-editor-list');
    if (!container || !window.PRODUCTS_DATA) return;

    container.innerHTML = window.PRODUCTS_DATA.map((p, idx) => `
      <div style="background:#F8FAFC;border:1px solid #CBD5E1;border-radius:10px;padding:14px;">
        <div style="display:grid;grid-template-columns:70px 1.4fr 1fr 1fr auto;gap:10px;align-items:center;">
          <img src="${p.image}" alt="${p.name}" style="width:64px;height:64px;object-fit:contain;background:#FFF;border-radius:8px;border:1px solid #E2E8F0;padding:4px;">
          <div>
            <input type="text" value="${p.name}" onchange="updateBdnProductField(${idx}, 'name', this.value)" style="width:100%;font-weight:800;font-size:0.84rem;padding:5px 8px;border:1px solid #CBD5E1;border-radius:6px;margin-bottom:4px;">
            <div style="font-size:0.72rem;color:#64748B;">SKU: <strong>${p.sku}</strong> • Marca: <strong>${p.brand}</strong></div>
          </div>
          <div>
            <label style="font-size:0.68rem;font-weight:800;color:#64748B;display:block;">MENUDEO ($ MXN)</label>
            <input type="number" value="${p.priceRetail}" onchange="updateBdnProductField(${idx}, 'priceRetail', this.value)" style="width:100%;font-weight:800;font-size:0.84rem;padding:5px 8px;border:1px solid #CBD5E1;border-radius:6px;">
          </div>
          <div>
            <label style="font-size:0.68rem;font-weight:800;color:#FF5500;display:block;">MAYOREO +6 ($ MXN)</label>
            <input type="number" value="${p.priceWholesale}" onchange="updateBdnProductField(${idx}, 'priceWholesale', this.value)" style="width:100%;font-weight:800;font-size:0.84rem;padding:5px 8px;border:1px solid #FDBA74;border-radius:6px;background:#FFF7ED;">
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.75rem;font-weight:800;color:#15803D;display:block;">Total: ${window.getTotalProductStock ? window.getTotalProductStock(p) : 0} pzas</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.updateBdnProductField = function(index, field, value) {
    const prod = window.PRODUCTS_DATA?.[index];
    if (!prod) return;
    if (field === 'priceRetail' || field === 'priceWholesale') {
      prod[field] = Math.max(1, parseFloat(value) || 0);
    } else {
      prod[field] = value;
    }
    localStorage.setItem('bdn_catalog_v2', JSON.stringify(window.PRODUCTS_DATA));
    window.renderProducts?.(window.PRODUCTS_DATA);
    window.showToast?.(`✏️ Actualizado: ${prod.name}`);
  };

  window.resetBdnCatalogToFactory = function() {
    localStorage.removeItem('bdn_catalog_v2');
    window.PRODUCTS_DATA.length = 0;
    (window.DEFAULT_PRODUCTS_DATA || []).forEach(p => window.PRODUCTS_DATA.push(JSON.parse(JSON.stringify(p))));
    window.renderProducts?.(window.PRODUCTS_DATA);
    renderBdnLiveEditor();
    window.showToast?.('🔄 Catálogo original restaurado');
  };
})();
