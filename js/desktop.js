/* =====================================================================
 * Report Designer - desktop.js  (v1.24.8)
 * Detail view: print current record. List view: batch-print current view.
 * Single template -> plain button; multiple -> dropdown menu.
 * Rendering via shared common.js (window.RPTC).
 * ===================================================================== */
(function (PLUGIN_ID) {
  'use strict';

  var RPTC = window.RPTC;
  var esc = RPTC.esc;

  var LANG = (kintone.getLoginUser && kintone.getLoginUser().language) === 'ja' ? 'ja' : 'en';
  function t(k) {
    var JA = { print: '帳票出力', cancel: 'キャンセル',
      pdfSave: 'PDF保存', pdfSaved: 'PDFを保存しました。ページを再読み込みします。',
      pdfNoLibs: 'PDFライブラリが読み込まれていません。プラグインを再アップロードしてください。',
      noTpl: 'テンプレートが設定されていません。プラグイン設定を確認してください。',
      popup: 'ポップアップがブロックされました。ブラウザの設定を確認してください。',
      confirmBatch: '{n}件のレコードを帳票出力します。よろしいですか？',
      capped: '※件数が多いため先頭{cap}件のみ出力します',
      noRecords: '出力対象のレコードがありません。', working: '出力中...',
      confirmRecords: 'ビューの全 {n} 件のレコードを1つの帳票に出力します。よろしいですか？',
      recordsCapped: '※件数が多いため先頭 {cap} 件のみ出力します',
      fetching: 'レコード取得中... {n}件',
      printShort: '印刷', printTitle: '帳票出力', printGo: '出力する',
      confirmRecordsBody: 'ビューの全 {n} 件のレコードを1つの帳票に出力します。' };
    var EN = { print: 'Print report', cancel: 'Cancel',
      pdfSave: 'Save PDF', pdfSaved: 'PDF saved. Reloading the page.',
      pdfNoLibs: 'PDF libraries not loaded. Please re-upload the plugin.',
      noTpl: 'No templates configured. Check the plugin settings.',
      popup: 'Popup was blocked. Please allow popups for this site.',
      confirmBatch: 'Print reports for {n} record(s)?',
      capped: 'Note: too many records - printing first {cap} only',
      noRecords: 'No records to print.', working: 'Printing...',
      confirmRecords: 'Print ONE combined report from all {n} records in this view?',
      recordsCapped: 'Note: too many records - using first {cap} only',
      fetching: 'Fetching records... {n}',
      printShort: 'Print', printTitle: 'Print report', printGo: 'Print',
      confirmRecordsBody: 'One combined report will be printed from all {n} records in this view.' };
    return (LANG === 'ja' ? JA : EN)[k] || k;
  }

  var BATCH_CAP = 100;        // per-record batch: each record is its own report (pages multiply)
  var RECORDS_CAP = 10000;    // records-as-rows: rows in ONE report; kintone offset ceiling

  function getConf() {
    var conf = kintone.plugin.app.getConfig(PLUGIN_ID) || {};
    var templates = [];
    try { templates = conf.templates ? JSON.parse(conf.templates) : []; } catch (e) { }
    var legacyHideList = conf.showListButton === 'false';
    templates.forEach(function (tp) {
      if (tp.showInList == null) tp.showInList = !legacyHideList;
    });
    var groups = [];
    try { groups = conf.templateGroups ? JSON.parse(conf.templateGroups) : []; } catch (e) { }
    var byId = {};
    templates.forEach(function (tp) { if (tp.id) byId[tp.id] = tp; });
    groups = groups.map(function (g) {
      return { name: g.name, members: (g.ids || []).map(function (id) { return byId[id]; }).filter(Boolean) };
    }).filter(function (g) { return g.name && g.members.length >= 2; });
    return { templates: templates, templateGroups: groups, buttonLabel: conf.buttonLabel || t('print'),
      images: RPTC.reassembleImages(conf) };
  }

  /* ---------------- print window (1..N pages) ---------------- */
  function openPrintWindow(tpl, pages) {
    var d = RPTC.effectivePaperDims(tpl);
    var w = window.open('', '_blank');
    if (!w) { alert(t('popup')); return; }
    var doc = w.document;
    var pageDivs = pages.map(function (p) {
      return '<div class="rpt-page" style="position:relative;width:' + d.w + 'mm;height:' + d.h +
        'mm;background:#fff;overflow:hidden;page-break-after:always;">' + p.html + '</div>';
    }).join('');
    doc.open();
    doc.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(tpl.name) + '</title>' +
      '<style>' +
      '@page{size:' + d.w + 'mm ' + d.h + 'mm;margin:0;}' +
      'html,body{margin:0;padding:0;}' +
      '@media screen{body{background:#888;padding:10mm 0;}.rpt-page{margin:0 auto 10mm;box-shadow:0 2px 10px rgba(0,0,0,.4);}' +
      '.rpt-print-bar{position:fixed;top:10px;right:14px;z-index:9999;display:flex;gap:8px;}' +
      '.rpt-print-bar button{padding:8px 20px;border-radius:6px;border:none;cursor:pointer;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,.35);}' +
      '.rpt-pb-print{background:#3498db;color:#fff;font-weight:bold;}' +
      '.rpt-pb-close{background:#fff;color:#555;}}' +
      '@media print{.rpt-print-bar{display:none;}}' +
      '</style></head><body>' +
      '<div class="rpt-print-bar">' +
      '<button type="button" class="rpt-pb-print" onclick="window.print()">🖨 ' + (LANG === 'ja' ? '印刷' : 'Print') + '</button>' +
      '<button type="button" class="rpt-pb-close" onclick="window.close()">✕ ' + (LANG === 'ja' ? '閉じる' : 'Close') + '</button>' +
      '</div>' + pageDivs + '</body></html>');
    doc.close();

    pages.forEach(function (p) { RPTC.injectImages(doc, p.images); });
    RPTC.autofitText(doc);

    var imgs = Array.prototype.slice.call(doc.images);
    var pending = imgs.filter(function (i) { return !i.complete; });
    var printed = false;
    function go() {
      if (printed) return; // guard: image-load path AND safety timeout both call go()
      printed = true;
      try { RPTC.autofitText(doc); } catch (e) { } // re-run after webfonts settle
      try { w.focus(); w.print(); } catch (e) { }
    }
    if (!pending.length) {
      setTimeout(go, 250);
    } else {
      var left = pending.length;
      var done = function () { left--; if (left <= 0) setTimeout(go, 250); };
      pending.forEach(function (i) { i.addEventListener('load', done); i.addEventListener('error', done); });
      setTimeout(go, 10000); // fallback only fires if images never settle
    }
  }

  /* ---------------- action-list control ----------------
   * actions: [{icon, label, run(btn)}]. One action -> plain button;
   * several -> dropdown menu. */
  var CONFIRM_THRESHOLD = 1000; // records-mode: print silently at or below this
  function showRecordsConfirm(n, capped) {
    return new Promise(function (resolve) {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(30,40,50,.45);z-index:100000;' +
        'display:flex;align-items:center;justify-content:center;';
      var card = document.createElement('div');
      card.style.cssText = 'background:#fff;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.28);' +
        'width:400px;max-width:92vw;padding:20px 24px;font-size:13px;color:#333;' +
        'font-family:"Noto Sans JP","Hiragino Kaku Gothic ProN",Meiryo,sans-serif;';
      var html = '<div style="font-size:15px;font-weight:bold;color:#2c3e50;margin-bottom:12px;">🖨 ' + t('printTitle') + '</div>';
      html += '<div style="line-height:1.7;margin-bottom:4px;">' +
        t('confirmRecordsBody').replace('{n}', '<b style="font-size:16px;color:#2980b9;">' + Number(n).toLocaleString() + '</b>') + '</div>';
      if (capped) html += '<div style="color:#c0392b;font-size:12px;margin-top:6px;">' + t('recordsCapped').replace('{cap}', capped.toLocaleString()) + '</div>';
      html += '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:18px;">' +
        '<button type="button" data-act="no" style="padding:7px 20px;border:1px solid #ccc;background:#fff;border-radius:18px;cursor:pointer;font-size:13px;">' + t('cancel') + '</button>' +
        '<button type="button" data-act="yes" style="padding:7px 24px;border:none;background:#2980ff;color:#fff;border-radius:18px;cursor:pointer;font-size:13px;font-weight:bold;">' + t('printGo') + '</button></div>';
      card.innerHTML = html;
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      function done(ok) {
        if (overlay.parentNode) document.body.removeChild(overlay);
        document.removeEventListener('keydown', onKey);
        resolve(ok);
      }
      function onKey(ev) { if (ev.key === 'Escape') done(false); }
      document.addEventListener('keydown', onKey);
      overlay.addEventListener('pointerdown', function (ev) { if (ev.target === overlay) done(false); });
      card.querySelector('[data-act="no"]').addEventListener('click', function () { done(false); });
      card.querySelector('[data-act="yes"]').addEventListener('click', function () { done(true); });
      card.querySelector('[data-act="yes"]').focus();
    });
  }

  function buildActionControl(space, buttonLabel, actions) {
    if (!space || space.querySelector('.rpt-print-btn')) return;
    var wrap = document.createElement('span');
    wrap.style.cssText = 'position:relative;display:inline-block;';

    var btn = document.createElement('button');
    btn.className = 'rpt-print-btn';
    var multi = actions.length > 1;
    btn.textContent = '🖨 ' + (multi ? t('printShort') : buttonLabel) + (multi ? ' ▾' : '');
    btn.style.cssText = 'margin:6px 8px;padding:6px 16px;border:1px solid #3498db;color:#3498db;background:#fff;border-radius:4px;cursor:pointer;font-size:13px;';
    wrap.appendChild(btn);

    var menu = null;
    function closeMenu() {
      if (menu && menu.parentNode) menu.parentNode.removeChild(menu);
      menu = null;
    }
    function openMenu() {
      closeMenu();
      menu = document.createElement('div');
      menu.style.cssText = 'position:absolute;top:100%;left:8px;z-index:10000;background:#fff;' +
        'border:1px solid #ccc;border-radius:6px;box-shadow:0 4px 18px rgba(0,0,0,.25);' +
        'min-width:220px;padding:4px 0;font-size:13px;';
      actions.forEach(function (a) {
        var row = document.createElement('div');
        row.className = 'rpt-menu-row';
        row.textContent = a.icon + ' ' + a.label;
        row.style.cssText = 'padding:7px 16px;cursor:pointer;white-space:nowrap;';
        row.addEventListener('mouseenter', function () { row.style.background = '#eef4ff'; });
        row.addEventListener('mouseleave', function () { row.style.background = ''; });
        row.addEventListener('click', function () { closeMenu(); a.run(btn); });
        menu.appendChild(row);
      });
      wrap.appendChild(menu);
      setTimeout(function () {
        document.addEventListener('pointerdown', function once(ev) {
          if (menu && menu.contains(ev.target)) return;
          document.removeEventListener('pointerdown', once);
          closeMenu();
        });
      }, 0);
    }

    btn.addEventListener('click', function () {
      if (!actions.length) { alert(t('noTpl')); return; }
      if (actions.length === 1) actions[0].run(btn);
      else (menu ? closeMenu() : openMenu());
    });
    space.appendChild(wrap);
  }

  /* ---------------- PDF generation (raster: html2canvas -> pdf-lib) ---------------- */
  function pdfLibsReady() {
    return typeof window.PDFLib !== 'undefined' && typeof window.html2canvas !== 'undefined';
  }
  function fileNameFor(tpl, rec) {
    var tmpl = tpl.pdfFileName || (tpl.name + '_{$id}');
    var name = RPTC.evalExpr(tmpl, rec, null) || tpl.name;
    name = name.replace(/[\\/:*?"<>|]/g, '_').trim() || 'report';
    if (!/\.pdf$/i.test(name)) name += '.pdf';
    return name;
  }
  // Render pages -> off-screen DOM -> canvas -> JPEG -> PDF bytes (sequential to bound memory)
  function pagesToPdfBytes(tpl, pages) {
    var d = RPTC.effectivePaperDims(tpl);
    var host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-30000px;top:0;z-index:-1;';
    document.body.appendChild(host);

    function renderOne(page) {
      var div = document.createElement('div');
      div.style.cssText = 'position:relative;width:' + d.w + 'mm;height:' + d.h +
        'mm;background:#fff;overflow:hidden;';
      div.innerHTML = page.html;
      host.appendChild(div);
      RPTC.injectImages(div, page.images, true); // background mode for html2canvas
      return (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
        .then(function () {
          RPTC.autofitText(div);
          return window.html2canvas(div, { scale: 2, backgroundColor: '#ffffff', logging: false });
        })
        .then(function (canvas) {
          host.removeChild(div);
          return canvas.toDataURL('image/jpeg', 0.92);
        });
    }

    var jpegs = [];
    var chain = Promise.resolve();
    pages.forEach(function (page) {
      chain = chain.then(function () {
        return renderOne(page).then(function (j) { jpegs.push(j); });
      });
    });

    return chain.then(function () {
      document.body.removeChild(host);
      return window.PDFLib.PDFDocument.create();
    }).then(function (doc) {
      var wpt = d.w * 72 / 25.4, hpt = d.h * 72 / 25.4;
      var chain2 = Promise.resolve();
      jpegs.forEach(function (j) {
        chain2 = chain2.then(function () {
          return doc.embedJpg(j).then(function (img) {
            var pg = doc.addPage([wpt, hpt]);
            pg.drawImage(img, { x: 0, y: 0, width: wpt, height: hpt });
          });
        });
      });
      return chain2.then(function () { return doc.save(); });
    });
  }
  function uploadPdf(bytes, filename) {
    var fd = new FormData();
    fd.append('__REQUEST_TOKEN__', kintone.getRequestToken());
    fd.append('file', new Blob([bytes], { type: 'application/pdf' }), filename);
    return fetch(kintone.api.url('/k/v1/file', true), {
      method: 'POST',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      body: fd
    }).then(function (resp) {
      if (!resp.ok) return resp.text().then(function (x) { throw new Error('file upload failed: ' + x); });
      return resp.json();
    }).then(function (j) { return j.fileKey; });
  }
  function printViaPdf(tpl, pages) {
    return pagesToPdfBytes(tpl, pages).then(function (bytes) {
      var blob = new Blob([bytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var w = window.open(url, '_blank');
      if (!w) { alert(t('popup')); }
      // revoke later; the viewer needs the URL while open
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    });
  }
  function printPages(tpl, pages) {
    if (tpl.printVia === 'pdf' && pdfLibsReady()) return printViaPdf(tpl, pages);
    openPrintWindow(tpl, pages);
    return Promise.resolve();
  }
  function savePdfToRecord(tpl, conf) {
    var appId = kintone.app.getId();
    var recordId = kintone.app.record.getId();
    var rec = kintone.app.record.get().record;
    return RPTC.renderPages(tpl, rec, conf.images).then(function (pages) {
      return pagesToPdfBytes(tpl, pages);
    }).then(function (bytes) {
      return uploadPdf(bytes, fileNameFor(tpl, rec));
    }).then(function (fileKey) {
      var files = [];
      if (tpl.pdfMode !== 'replace' && rec[tpl.pdfField] && rec[tpl.pdfField].value) {
        files = rec[tpl.pdfField].value.map(function (f) { return { fileKey: f.fileKey }; });
      }
      files.push({ fileKey: fileKey });
      var record = {};
      record[tpl.pdfField] = { value: files };
      return kintone.api(kintone.api.url('/k/v1/record', true), 'PUT',
        { app: appId, id: recordId, record: record });
    }).then(function () {
      alert(t('pdfSaved'));
      location.reload();
    });
  }

  function withBusy(btn, work) {
    var orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⏳ ' + t('working');
    return work().catch(function (e) {
      console.error('[ReportDesigner]', e);
      alert(String(e && e.message || e));
    }).then(function () {
      btn.disabled = false;
      btn.textContent = orig;
    });
  }

  function renderCombined(members, dataForTpl, images) {
    // render members in order, concatenating pages into one job
    var chain = Promise.resolve([]);
    members.forEach(function (tpl) {
      chain = chain.then(function (pages) {
        return dataForTpl(tpl).then(function (rec) {
          return RPTC.renderPages(tpl, rec, images).then(function (pp) { return pages.concat(pp); });
        });
      });
    });
    return chain;
  }

  /* ---------------- public JS API ----------------
   * window.ReportDesigner - call saved templates from other customizations.
   *
   *   ReportDesigner.templates()                        -> [names]
   *   ReportDesigner.print('A')                         -> print one (current record on detail view)
   *   ReportDesigner.print(['A','B'])                   -> print several as ONE combined job
   *   ReportDesigner.print('A', { recordId: 123 })      -> fetch record by id
   *   ReportDesigner.print('A', { record: recObj })     -> use a record object you already have
   *   ReportDesigner.print('L', { query: '...' })       -> records-source template with explicit query
   *   ReportDesigner.print('L', { records: [...] })     -> records-source with records you fetched
   *   ReportDesigner.render(nameOrNames, opts)          -> Promise<pages> (no printing)
   *   ReportDesigner.pdf(nameOrNames, opts)             -> Promise<Blob> (print-method independent)
   *
   * Data resolution per template: record templates use opts.record > opts.recordId >
   * the currently open detail record. Records-source templates use opts.records >
   * opts.query (paged fetch) > the current list view's query. Combined jobs use the
   * FIRST template's paper settings; mixing paper sizes is not supported. */
  function apiResolveTemplates(names) {
    var conf = getConf();
    var arr = Array.isArray(names) ? names : [names];
    var out = [];
    arr.forEach(function (n) {
      var tpl = typeof n === 'number' ? conf.templates[n]
        : conf.templates.find(function (tp) { return tp.name === n; });
      if (tpl) { out.push(tpl); return; }
      var grp = (conf.templateGroups || []).find(function (g) { return g.name === n; });
      if (grp) { grp.members.forEach(function (tp) { out.push(tp); }); return; }
      throw new Error('[ReportDesigner] template/group not found: "' + n + '". Available: ' +
        conf.templates.map(function (tp) { return tp.name; })
          .concat((conf.templateGroups || []).map(function (g) { return '📑' + g.name; })).join(', '));
    });
    return out;
  }
  function apiFetchRecordById(id) {
    return kintone.api(kintone.api.url('/k/v1/record', true), 'GET',
      { app: kintone.app.getId(), id: id }).then(function (r) { return r.record; });
  }
  function apiFetchByQuery(query) {
    // paged fetch with an explicit query (limit/offset stripped, we page ourselves)
    var base = String(query || '').replace(/\blimit\s+\d+/i, '').replace(/\boffset\s+\d+/i, '').trim();
    var PAGE = 500, all = [];
    function next(offset) {
      var q = base + (base ? ' ' : '') + 'limit ' + PAGE + ' offset ' + offset;
      return kintone.api(kintone.api.url('/k/v1/records', true), 'GET',
        { app: kintone.app.getId(), query: q }).then(function (resp) {
          var recs = resp.records || [];
          all = all.concat(recs);
          if (recs.length < PAGE || all.length >= RECORDS_CAP) return all.slice(0, RECORDS_CAP);
          return next(offset + PAGE);
        });
    }
    return next(0);
  }
  function apiDataFor(tpl, opts) {
    opts = opts || {};
    if (RPTC.usesRecordsSource(tpl)) {
      if (opts.records) return Promise.resolve(RPTC.recordsToRec(opts.records));
      if (opts.query) return apiFetchByQuery(opts.query).then(RPTC.recordsToRec);
      return fetchAllViewRecords(kintone.app.getId()).then(RPTC.recordsToRec);
    }
    if (opts.record) return Promise.resolve(opts.record);
    if (opts.recordId != null) return apiFetchRecordById(opts.recordId);
    var cur = null;
    try { cur = kintone.app.record.get(); } catch (e) { }
    if (cur && cur.record) return Promise.resolve(cur.record);
    return Promise.reject(new Error('[ReportDesigner] no record context: pass { record } or { recordId } for template "' + tpl.name + '"'));
  }
  function apiRender(names, opts) {
    var conf = getConf();
    var tpls = apiResolveTemplates(names);
    var chain = Promise.resolve([]);
    tpls.forEach(function (tpl) {
      chain = chain.then(function (pages) {
        return apiDataFor(tpl, opts).then(function (rec) {
          return RPTC.renderPages(tpl, rec, conf.images).then(function (pp) {
            return pages.concat(pp);
          });
        });
      });
    });
    return chain;
  }
  window.ReportDesigner = {
    templates: function () {
      return getConf().templates.map(function (tp) { return tp.name; });
    },
    render: apiRender,
    print: function (names, opts) {
      var tpls = apiResolveTemplates(names); // validate up front (throws with names list)
      return apiRender(names, opts).then(function (pages) {
        return printPages(tpls[0], pages);
      });
    },
    pdf: function (names, opts) {
      if (!pdfLibsReady()) return Promise.reject(new Error('[ReportDesigner] PDF libs not loaded'));
      var tpls = apiResolveTemplates(names);
      return apiRender(names, opts).then(function (pages) {
        return pagesToPdfBytes(tpls[0], pages);
      }).then(function (bytes) {
        return new Blob([bytes], { type: 'application/pdf' });
      });
    }
  };

  /* ---------------- record detail view ---------------- */
  kintone.events.on('app.record.detail.show', function (event) {
    var conf = getConf();
    var space = kintone.app.record.getHeaderMenuSpaceElement();
    var actions = [];
    (conf.templateGroups || []).forEach(function (g) {
      // a group prints here only if every member is a record-type template
      if (g.members.some(function (tp) { return RPTC.usesRecordsSource(tp); })) return;
      actions.push({ icon: '📑', label: g.name, run: function (btn) {
        var rec = kintone.app.record.get().record;
        withBusy(btn, function () {
          return renderCombined(g.members, function () { return Promise.resolve(rec); }, conf.images)
            .then(function (pages) { return printPages(g.members[0], pages); });
        });
      } });
    });
    conf.templates.forEach(function (tpl) {
      if (RPTC.usesRecordsSource(tpl)) return; // list-view report (rows = view records)
      actions.push({ icon: '🖨', label: tpl.name, run: function (btn) {
        var rec = kintone.app.record.get().record;
        var missing = RPTC.missingFieldCodes(tpl, rec);
        if (missing.length) console.warn('[ReportDesigner] template references field codes not present on this record:', missing);
        withBusy(btn, function () {
          return RPTC.renderPages(tpl, rec, conf.images).then(function (pages) {
            return printPages(tpl, pages);
          });
        });
      } });
      if (tpl.pdfField) {
        actions.push({ icon: '📄', label: tpl.name + ' → ' + t('pdfSave'), run: function (btn) {
          if (!pdfLibsReady()) { alert(t('pdfNoLibs')); return; }
          withBusy(btn, function () { return savePdfToRecord(tpl, conf); });
        } });
      }
    });
    buildActionControl(space, conf.buttonLabel, actions);
    return event;
  });

  /* ---------------- record list (index) view: batch print ---------------- */
  function viewBaseQuery() {
    // Respect the view's own filter AND sort order: getQuery() carries the
    // view's "order by"; we strip its limit/offset and page ourselves.
    var q = '';
    try { q = (kintone.app.getQuery && kintone.app.getQuery()) || ''; } catch (e) { }
    if (q) {
      q = q.replace(/\blimit\s+\d+/i, '').replace(/\boffset\s+\d+/i, '').trim();
    } else {
      var cond = '';
      try { cond = kintone.app.getQueryCondition() || ''; } catch (e) { }
      q = cond + (cond ? ' ' : '') + 'order by $id desc';
    }
    return q;
  }
  function fetchViewRecords(appId) {
    // per-record batch printing: capped, one bulk call
    var query = viewBaseQuery() + ' limit ' + BATCH_CAP;
    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', { app: appId, query: query })
      .then(function (resp) { return resp.records || []; });
  }
  function fetchAllViewRecords(appId, onProgress) {
    // records-as-rows: page through the ENTIRE view (500/request, view order
    // preserved) up to RECORDS_CAP. Never opens individual records.
    var base = viewBaseQuery();
    var PAGE = 500;
    var all = [];
    function next(offset) {
      var query = base + (base ? ' ' : '') + 'limit ' + PAGE + ' offset ' + offset;
      return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', { app: appId, query: query })
        .then(function (resp) {
          var recs = resp.records || [];
          all = all.concat(recs);
          if (onProgress) onProgress(all.length);
          if (recs.length < PAGE || all.length >= RECORDS_CAP) {
            return all.slice(0, RECORDS_CAP);
          }
          return next(offset + PAGE);
        });
    }
    return next(0);
  }

  kintone.events.on('app.record.index.show', function (event) {
    var conf = getConf();
    var listTemplates = conf.templates.filter(function (tp) { return tp.showInList; });
    var listGroups = (conf.templateGroups || []).filter(function (g) {
      return g.members.every(function (tp) { return RPTC.usesRecordsSource(tp); });
    });
    if (!listTemplates.length && !listGroups.length) return event;
    var space = kintone.app.getHeaderMenuSpaceElement();
    var actions = listGroups.map(function (g) {
      return { icon: '📑', label: g.name, run: function (btn) { runGroupBatch(g, btn); } };
    }).concat(listTemplates.map(function (tpl) {
      return { icon: '🖨', label: tpl.name, run: function (btn) { runBatch(tpl, btn); } };
    }));
    function runGroupBatch(g, btn) {
      withBusy(btn, function () {
        // one shared view fetch feeds every member
        return fetchAllViewRecords(kintone.app.getId(), function (n) {
          btn.textContent = '⏳ ' + t('fetching').replace('{n}', n);
        }).then(function (records) {
          if (!records.length) { alert(t('noRecords')); return; }
          var ask = records.length > CONFIRM_THRESHOLD
            ? showRecordsConfirm(records.length, records.length >= RECORDS_CAP ? RECORDS_CAP : 0)
            : Promise.resolve(true);
          return ask.then(function (go) {
            if (!go) return;
            btn.textContent = '⏳ ' + t('working');
            var rec = RPTC.recordsToRec(records);
            return renderCombined(g.members, function () { return Promise.resolve(rec); }, conf.images)
              .then(function (pages) { return printPages(g.members[0], pages); });
          });
        });
      });
    }
    buildActionControl(space, conf.buttonLabel, actions);
    function runBatch(tpl, btn) {
      withBusy(btn, function () {
        if (RPTC.usesRecordsSource(tpl)) {
          // records-as-rows: fetch the WHOLE view (paged), one combined report
          return fetchAllViewRecords(kintone.app.getId(), function (n) {
            btn.textContent = '⏳ ' + t('fetching').replace('{n}', n);
          }).then(function (records) {
            if (!records.length) { alert(t('noRecords')); return; }
            var ask = records.length > CONFIRM_THRESHOLD
              ? showRecordsConfirm(records.length, records.length >= RECORDS_CAP ? RECORDS_CAP : 0)
              : Promise.resolve(true);
            return ask.then(function (go) {
              if (!go) return;
              btn.textContent = '⏳ ' + t('working');
              var rec = RPTC.recordsToRec(records);
              var missing = RPTC.missingFieldCodes(tpl, rec);
              if (missing.length) console.warn('[ReportDesigner] template references field codes not present:', missing);
              return RPTC.renderPages(tpl, rec, conf.images).then(function (pages) {
                return printPages(tpl, pages);
              });
            });
          });
        }
        return fetchViewRecords(kintone.app.getId()).then(function (records) {
          if (!records.length) { alert(t('noRecords')); return; }
          var msg = t('confirmBatch').replace('{n}', records.length);
          if (records.length >= BATCH_CAP) msg += '\n' + t('capped').replace('{cap}', BATCH_CAP);
          if (!confirm(msg)) return;
          var missing = RPTC.missingFieldCodes(tpl, records[0]);
          if (missing.length) console.warn('[ReportDesigner] template references field codes not present:', missing);
          return Promise.all(records.map(function (rec) {
            return RPTC.renderPages(tpl, rec, conf.images);
          })).then(function (pageArrays) {
            var pages = [];
            pageArrays.forEach(function (pp) { pages = pages.concat(pp); });
            return printPages(tpl, pages);
          });
        });
      });
    }
    return event;
  });

})(kintone.$PLUGIN_ID);
