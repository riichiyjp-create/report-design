/* =====================================================================
 * Report Designer - common.js  (v1.2.0)
 * Shared rendering core used by BOTH config (preview) and desktop (print)
 * so output is guaranteed identical. Exposes window.RPTC.
 * All geometry in mm.
 * ===================================================================== */
(function () {
  'use strict';

  var RPTC = {};

  RPTC.PAPER_PRESETS = {
    A3: [297, 420], A4: [210, 297], A5: [148, 210],
    B4: [257, 364], B5: [182, 257], Letter: [215.9, 279.4]
  };

  RPTC.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  RPTC.paperDims = function (tpl) {
    var p = tpl.paper || {};
    var base = RPTC.PAPER_PRESETS[p.size] || [p.wmm || 210, p.hmm || 297];
    var w = base[0], h = base[1];
    if (p.orientation === 'landscape') { var tmp = w; w = h; h = tmp; }
    return { w: w, h: h };
  };

  /* ---------------- formatting ---------------- */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function warekiYear(dt) {
    var y = dt.getFullYear(), m = dt.getMonth() + 1, d = dt.getDate();
    var v = y * 10000 + m * 100 + d;
    if (v >= 20190501) return { era: '令和', y: y - 2018 };
    if (v >= 19890108) return { era: '平成', y: y - 1988 };
    if (v >= 19261225) return { era: '昭和', y: y - 1925 };
    return { era: '', y: y };
  }
  RPTC.fmtDate = function (value, pattern) {
    if (!value) return '';
    var dt = new Date(value);
    if (isNaN(dt.getTime())) return String(value);
    var Y = dt.getFullYear(), M = dt.getMonth() + 1, D = dt.getDate(),
      H = dt.getHours(), Mi = dt.getMinutes();
    switch (pattern) {
      case 'YYYY/MM/DD': return Y + '/' + pad2(M) + '/' + pad2(D);
      case 'YYYY-MM-DD': return Y + '-' + pad2(M) + '-' + pad2(D);
      case 'YYYY年M月D日': return Y + '年' + M + '月' + D + '日';
      case '和暦(令和n年M月D日)': {
        var w = warekiYear(dt);
        return w.era + (w.y === 1 ? '元' : String(w.y)) + '年' + M + '月' + D + '日';
      }
      case 'M/D': return M + '/' + D;
      case 'YYYY/MM/DD HH:mm': return Y + '/' + pad2(M) + '/' + pad2(D) + ' ' + pad2(H) + ':' + pad2(Mi);
    }
    if (pattern) return RPTC.fmtDateCustom(value, pattern);
    return Y + '/' + pad2(M) + '/' + pad2(D);
  };
  RPTC.fmtNumber = function (v, decimals, thousands) {
    if (v === '' || v == null) return '';
    var n = Number(v);
    if (isNaN(n)) return String(v);
    var d = (typeof decimals === 'number' && decimals >= 0) ? decimals : 0;
    if (thousands === false) return n.toFixed(d);
    return n.toLocaleString('ja-JP', { minimumFractionDigits: d, maximumFractionDigits: d });
  };
  RPTC.fmtTime = function (value, pattern) {
    if (!value) return '';
    var H, m;
    var mm = String(value).match(/^(\d{1,2}):(\d{2})/);
    if (mm) { H = Number(mm[1]); m = Number(mm[2]); }
    else {
      var dt = new Date(value);
      if (isNaN(dt.getTime())) return String(value);
      H = dt.getHours(); m = dt.getMinutes();
    }
    if (pattern === 'H時m分') return H + '時' + m + '分';
    return (H < 10 ? '0' : '') + H + ':' + (m < 10 ? '0' : '') + m;
  };
  // generic date pattern: YYYY YY MM M DD D HH H mm(minutes when after H)
  RPTC.fmtDateCustom = function (value, pattern) {
    if (!value) return '';
    var dt = new Date(value);
    if (isNaN(dt.getTime())) return String(value);
    function p2(n) { return (n < 10 ? '0' : '') + n; }
    return String(pattern)
      .replace(/YYYY/g, dt.getFullYear())
      .replace(/YY/g, String(dt.getFullYear()).slice(-2))
      .replace(/MM/g, p2(dt.getMonth() + 1))
      .replace(/M/g, dt.getMonth() + 1)
      .replace(/DD/g, p2(dt.getDate()))
      .replace(/D/g, dt.getDate())
      .replace(/HH/g, p2(dt.getHours()))
      .replace(/H(?!時)/g, dt.getHours())
      .replace(/mm/g, p2(dt.getMinutes()));
  };
  RPTC.rawValueToText = function (fv) {
    if (!fv) return '';
    var v = fv.value;
    if (v == null) return '';
    switch (fv.type) {
      case 'CHECK_BOX': case 'MULTI_SELECT': case 'CATEGORY':
        return (v || []).join('、');
      case 'USER_SELECT': case 'ORGANIZATION_SELECT': case 'GROUP_SELECT':
      case 'STATUS_ASSIGNEE':
        return (v || []).map(function (u) { return u.name || u.code; }).join('、');
      case 'CREATOR': case 'MODIFIER':
        return v.name || v.code || '';
      case 'RICH_TEXT': {
        var div = document.createElement('div');
        div.innerHTML = v;
        return div.textContent || '';
      }
      case 'FILE':
        return (v || []).map(function (f) { return f.name; }).join('、');
      default:
        return String(v);
    }
  };
  /* Normalize legacy props (format/decimals/dateFmt strings) OR new fmt object
   * into a fmt spec: {type, decimals, thousands, symbol, symbolPos, dateFmt,
   * timeFmt, x100, trueText, falseText, custom} */
  RPTC.normalizeFmt = function (holder) {
    if (!holder) return { type: 'general' };
    if (holder.fmt && holder.fmt.type) return holder.fmt;
    var legacy = holder.format;
    if (legacy === 'number') return { type: 'number', decimals: Number(holder.decimals) || 0, thousands: true };
    if (legacy === 'date') return { type: 'date', dateFmt: holder.dateFmt || 'YYYY/MM/DD' };
    return { type: 'general' };
  };
  RPTC.formatValue = function (fmt, fv) {
    if (!fv) return '';
    fmt = fmt || { type: 'general' };
    var raw = fv.value;
    switch (fmt.type) {
      case 'number':
        return RPTC.fmtNumber(raw, Number(fmt.decimals) || 0, fmt.thousands !== false);
      case 'currency': {
        var num = RPTC.fmtNumber(raw, Number(fmt.decimals) || 0, true);
        if (num === '') return '';
        var sym = (fmt.symbol == null ? '¥' : fmt.symbol);
        return fmt.symbolPos === 'after' ? num + sym : sym + num;
      }
      case 'date':
        return RPTC.fmtDate(raw, fmt.dateFmt || 'YYYY/MM/DD');
      case 'time':
        return RPTC.fmtTime(raw, fmt.timeFmt || 'HH:mm');
      case 'percent': {
        if (raw === '' || raw == null) return '';
        var n = Number(raw);
        if (isNaN(n)) return String(raw);
        if (fmt.x100 !== false) n = n * 100;
        return RPTC.fmtNumber(n, Number(fmt.decimals) || 0, true) + '%';
      }
      case 'bool': {
        var truthy = raw != null && raw !== '' && raw !== '0' && String(raw).toLowerCase() !== 'false';
        return truthy ? (fmt.trueText == null ? '✓' : fmt.trueText) : (fmt.falseText == null ? '' : fmt.falseText);
      }
      case 'custom': {
        var pat = fmt.custom || '';
        if (/[#0]/.test(pat)) {
          var dec = (pat.split('.')[1] || '').length;
          return RPTC.fmtNumber(raw, dec, pat.indexOf(',') >= 0);
        }
        if (pat) return RPTC.fmtDateCustom(raw, pat);
        return RPTC.rawValueToText(fv);
      }
    }
    return RPTC.rawValueToText(fv);
  };
  function formatToken(el, fv) {
    if (!fv) return '';
    return RPTC.formatValue(RPTC.normalizeFmt(el), fv);
  }
  // Replace {fieldCode} tokens with formatted record values.
  RPTC.evalExpr = function (expr, rec, el) {
    return String(expr == null ? '' : expr).replace(/\{([^{}]+)\}/g, function (_, code) {
      return formatToken(el, rec ? rec[code.trim()] : null);
    });
  };
  // Full field-element text (single field OR expression), with prefix/suffix/blank.
  RPTC.fieldText = function (el, rec) {
    var txt;
    if (el.expr) {
      txt = RPTC.evalExpr(el.expr, rec, el);
    } else {
      txt = formatToken(el, rec ? rec[el.fieldCode] : null);
    }
    if ((!txt || !txt.trim()) && el.blankText) txt = el.blankText;
    if (txt !== '') txt = (el.prefix || '') + txt + (el.suffix || '');
    return txt;
  };

  /* ---------------- Code128 (set B) SVG generator ---------------- */
  var C128 = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 ' +
    '221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 ' +
    '221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 ' +
    '212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 ' +
    '231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 ' +
    '231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 ' +
    '314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 ' +
    '112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 ' +
    '111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 ' +
    '214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 ' +
    '114131 311141 411131 211412 211214 211232').split(' ');
  var C128_STOP = '2331112';

  // Returns SVG string, or null if value has chars outside Code128-B range.
  RPTC.code128SVG = function (value) {
    var s = String(value == null ? '' : value);
    if (!s) return null;
    var codes = [104]; // Start B
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 32 || c > 126) return null;
      codes.push(c - 32);
    }
    var sum = 104;
    for (var j = 1; j < codes.length; j++) sum += codes[j] * j;
    codes.push(sum % 103);

    var widths = [];
    codes.forEach(function (ci) {
      String(C128[ci]).split('').forEach(function (w) { widths.push(Number(w)); });
    });
    C128_STOP.split('').forEach(function (w) { widths.push(Number(w)); });

    var total = widths.reduce(function (a, b) { return a + b; }, 0);
    var quiet = 10;
    var vb = total + quiet * 2;
    var x = quiet, bars = '';
    for (var k = 0; k < widths.length; k++) {
      if (k % 2 === 0) bars += '<rect x="' + x + '" y="0" width="' + widths[k] + '" height="100"/>';
      x += widths[k];
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + vb +
      ' 100" preserveAspectRatio="none" style="width:100%;height:100%;display:block;">' + bars + '</svg>';
  };

  /* ---------------- external lib bootstrap ----------------
   * Libs come from the manifest CDN entries, but if they failed to load
   * (network hiccup, stale packaging) we retry dynamically before rendering. */
  /* Libs are bundled locally in js/lib/ via the manifest. These CDN URLs are a
   * last-resort retry only. NOTE: qrcode's build/ path does NOT exist on npm CDNs
   * (that was the original QR bug) - use a real published browser bundle instead. */
  var QR_URL = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'; // note: different API, used only as existence hint
  var JB_URL = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js';
  var libPromises = {};
  RPTC.ensureLib = function (test, url) {
    if (test()) return Promise.resolve(true);
    if (!url) return Promise.resolve(false);
    if (libPromises[url]) return libPromises[url];
    libPromises[url] = new Promise(function (resolve) {
      var done = false;
      function finish(ok) { if (!done) { done = true; resolve(ok); } }
      var s = document.createElement('script');
      s.src = url;
      s.onload = function () { finish(test()); };
      s.onerror = function () { console.warn('[ReportDesigner] failed to load', url); finish(false); };
      document.head.appendChild(s);
      setTimeout(function () { finish(test()); }, 5000); // never hang rendering
    });
    return libPromises[url];
  };

  // QR code. Resolves dataURL or null.
  RPTC.qrDataURL = function (text) {
    if (!text) return Promise.resolve(null);
    return RPTC.ensureLib(function () { return typeof QRCode !== 'undefined' && !!QRCode.toDataURL; }, null)
      .then(function (ok) {
        if (!ok) {
          console.warn('[ReportDesigner] QRCode lib not loaded - is js/lib/qrcode.min.js in the manifest?');
          return null;
        }
        return new Promise(function (resolve) {
          QRCode.toDataURL(String(text), { margin: 1, width: 512 }, function (err, url) {
            resolve(err ? null : url);
          });
        });
      });
  };

  // Barcode symbologies via JsBarcode; pure-JS Code128 SVG as fallback.
  RPTC.BARCODE_FORMATS = [
    { v: 'CODE128', l: 'CODE128' },
    { v: 'EAN13', l: 'JAN-13 / EAN-13' },
    { v: 'EAN8', l: 'JAN-8 / EAN-8' },
    { v: 'UPC', l: 'UPC-A' },
    { v: 'CODE39', l: 'CODE39' },
    { v: 'ITF', l: 'ITF' },
    { v: 'ITF14', l: 'ITF-14' },
    { v: 'codabar', l: 'NW-7 (Codabar)' }
  ];
  RPTC.barcodeDataURL = function (value, format) {
    value = String(value == null ? '' : value);
    format = format || 'CODE128';
    if (!value) return Promise.resolve(null);
    return RPTC.ensureLib(function () { return typeof JsBarcode !== 'undefined'; }, JB_URL)
      .then(function (ok) {
        if (ok) {
          try {
            var c = document.createElement('canvas');
            JsBarcode(c, value, { format: format, displayValue: false, margin: 0, width: 2, height: 100 });
            return c.toDataURL('image/png');
          } catch (e) {
            console.warn('[ReportDesigner] barcode encode failed:', format, value, e && e.message);
            if (format !== 'CODE128') return null;
          }
        }
        var svg = RPTC.code128SVG(value);
        return svg ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg) : null;
      });
  };

  /* ---------------- file (image) fetch ---------------- */
  RPTC.fetchFileAsDataURL = function (fileKey) {
    var url = kintone.api.url('/k/v1/file', true) + '?fileKey=' + encodeURIComponent(fileKey);
    return fetch(url, {
      method: 'GET',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      credentials: 'same-origin'
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.blob();
    }).then(function (blob) {
      return new Promise(function (resolve, reject) {
        var r = new FileReader();
        r.onload = function () { resolve(r.result); };
        r.onerror = function () { reject(new Error('read failed')); };
        r.readAsDataURL(blob);
      });
    });
  };
  function isImageFile(f) {
    var ct = (f.contentType || '').toLowerCase();
    if (ct.indexOf('image/') === 0) return true;
    return /\.(png|jpe?g|gif|webp|bmp)$/i.test(f.name || '');
  }
  RPTC.resolveImageSrc = function (el, rec, images) {
    if (el.bindType === 'embed') return Promise.resolve((images && images[el.imageId]) || null);
    if (el.bindType === 'url') return Promise.resolve(el.url || null);
    var fv = rec ? rec[el.fieldCode] : null;
    var files = (fv && fv.value) || [];
    var img = files.filter(isImageFile)[0];
    if (!img) return Promise.resolve(null);
    return RPTC.fetchFileAsDataURL(img.fileKey).catch(function (e) {
      console.error('image fetch failed', e);
      return null;
    });
  };

  /* ---------------- CSS builders ---------------- */
  RPTC.textCss = function (el) {
    return 'font-family:' + (el.fontFamily || 'Noto Sans JP') + ',sans-serif;' +
      'font-size:' + (el.fontSize || 11) + 'pt;' +
      (el.bold ? 'font-weight:bold;' : '') +
      (el.italic ? 'font-style:italic;' : '') +
      ((el.underline || el.strike) ? ('text-decoration:' +
        (el.underline ? 'underline ' : '') + (el.strike ? 'line-through' : '') + ';') : '') +
      'color:' + (el.color || '#000') + ';' +
      (el.bg ? 'background:' + el.bg + ';' : '') +
      'display:flex;' +
      'justify-content:' + (el.align === 'center' ? 'center' : el.align === 'right' ? 'flex-end' : 'flex-start') + ';' +
      'align-items:' + (el.valign === 'top' ? 'flex-start' : el.valign === 'bottom' ? 'flex-end' : 'center') + ';' +
      (Number(el.pad) ? 'padding:0 ' + Number(el.pad) + 'mm;box-sizing:border-box;' : '') +
      'text-align:' + (el.align || 'left') + ';';
  };
  // simple element border (text/field) without drawing a separate rect
  RPTC.borderCss = function (el) {
    var w = Number(el.borderW);
    return (w > 0) ? ('border:' + w + 'mm solid ' + (el.borderColor || '#000000') + ';') : '';
  };
  RPTC.boxCss = function (el) {
    return 'position:absolute;box-sizing:border-box;overflow:hidden;' +
      'left:' + el.x + 'mm;top:' + el.y + 'mm;' +
      'width:' + Math.max(el.w, 0.2) + 'mm;height:' + Math.max(el.h, 0.2) + 'mm;';
  };

  /* ---------------- table renderer ---------------- */
  /* opts (all optional; absent = single-page behavior):
   *   start,end : data row slice indices
   *   y,h       : geometry override for continuation pages
   *   isLast    : footers + fill padding apply
   */
  /* ---------------- grouping ----------------
   * el.groups = [{ fieldCode,
   *   header:{show,expr,h,bg,bold,color,align}, repeatColHeader,
   *   footer:{show,label,h,bg,bold,aggs:{fieldCode:'sum'|'count'|'avg'}},
   *   newPage, keepTogether, repeatOnBreak }]
   * Grouping is CONSECUTIVE-RUN: adjacent rows with equal key values form a
   * group. The engine never re-sorts - source row order is authoritative. */
  RPTC.groupKeyFields = function (g) {
    var arr = (g && (g.fieldCodes || (g.fieldCode ? [g.fieldCode] : []))) || [];
    return arr.filter(function (c) { return !!c; });
  };
  RPTC.tableGroups = function (el) {
    return (el.groups || []).filter(function (g) { return RPTC.groupKeyFields(g).length; });
  };
  function rowKeyText(row, fieldCode) {
    return RPTC.rawValueToText(row && row.value ? row.value[fieldCode] : null);
  }
  function compositeKey(row, fields) {
    return fields.map(function (f) { return rowKeyText(row, f); }).join('\u0001');
  }
  function numOf(t) {
    if (t === '' || t == null) return NaN;
    return Number(String(t).replace(/,/g, ''));
  }
  // Numeric-aware comparison: numbers compare as numbers, otherwise ja locale text
  function cmpVals(a, b) {
    var na = numOf(a), nb = numOf(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return String(a).localeCompare(String(b), 'ja');
  }
  /* Sort spec: group levels with sort 'asc'/'desc' contribute their key fields
   * (in level order), then el.rowSort [{fieldCode,dir}] for detail rows.
   * Empty spec = source order preserved (the pre-v1.21 behavior). Stable. */
  RPTC.sortRowsForTable = function (el, rows) {
    var spec = [];
    RPTC.tableGroups(el).forEach(function (g) {
      if (g.sort === 'asc' || g.sort === 'desc') {
        RPTC.groupKeyFields(g).forEach(function (f) { spec.push({ f: f, d: g.sort === 'desc' ? -1 : 1 }); });
      }
    });
    (el.rowSort || []).forEach(function (s) {
      if (s && s.fieldCode) spec.push({ f: s.fieldCode, d: s.dir === 'desc' ? -1 : 1 });
    });
    if (!spec.length) return rows;
    return rows.slice().sort(function (a, b) {
      for (var i = 0; i < spec.length; i++) {
        var c = cmpVals(rowKeyText(a, spec[i].f), rowKeyText(b, spec[i].f));
        if (c) return c * spec[i].d;
      }
      return 0;
    });
  };

  RPTC.groupAgg = function (rows, fieldCode, fn) {
    if (fn === 'count') return rows.length;
    var sum = 0, n = 0;
    (rows || []).forEach(function (r) {
      var v = numOf(rowKeyText(r, fieldCode));
      if (!isNaN(v)) { sum += v; n++; }
    });
    return fn === 'avg' ? (n ? sum / n : 0) : sum;
  };

  /* Display-row stream: flat list the paginator packs by HEIGHT (mm).
   * kinds: 'gh' group header | 'ch' repeated column header | 'd' data | 'gf' group footer */
  RPTC.buildDisplayStream = function (el, rows) {
    var groups = RPTC.tableGroups(el);
    var rowH = (el.rowH || 7), headerH = (el.headerH || 8);
    var out = [];
    rows = RPTC.sortRowsForTable(el, rows || []);
    if (!groups.length) {
      rows.forEach(function (r) { out.push({ k: 'd', h: rowH, row: r }); });
      return out;
    }
    var L = groups.length;
    function emitLevel(lvl, slice, path) {
      var gdef = groups[lvl];
      var kf = RPTC.groupKeyFields(gdef);
      var i = 0;
      while (i < slice.length) {
        var key = compositeKey(slice[i], kf);
        var j = i + 1;
        while (j < slice.length && compositeKey(slice[j], kf) === key) j++;
        var grows = slice.slice(i, j);
        var keys = kf.map(function (f) { return { fieldCode: f, key: rowKeyText(grows[0], f) }; });
        var grp = { lvl: lvl, key: keys.map(function (p) { return p.key; }).join(' / '), rows: grows,
          path: path.concat([{ lvl: lvl, keys: keys }]) };
        var startIdx = out.length;
        var hdr = gdef.header || {};
        if (hdr.show !== false) {
          out.push({ k: 'gh', h: Number(hdr.h) || rowH, lvl: lvl, g: grp });
        }
        if (gdef.repeatColHeader) out.push({ k: 'ch', h: headerH, lvl: lvl, g: grp });
        if (lvl + 1 < L) emitLevel(lvl + 1, grows, grp.path);
        else grows.forEach(function (r) { out.push({ k: 'd', h: rowH, row: r, g: grp }); });
        var ftr = gdef.footer || {};
        if (ftr.show) out.push({ k: 'gf', h: Number(ftr.h) || rowH, lvl: lvl, g: grp });
        if (out.length > startIdx) {
          if (gdef.newPage && startIdx > 0) out[startIdx].newPageBefore = true;
          if (gdef.keepTogether) {
            var blockH = 0;
            for (var b = startIdx; b < out.length; b++) blockH += out[b].h;
            out[startIdx].ktBlockH = blockH;
          }
        }
        i = j;
      }
    }
    emitLevel(0, rows || [], []);
    return out;
  };

  // Group-context pseudo fields for free elements on a page:
  //   {GROUP.<fieldCode>} group key value  |  {GSUM.<fieldCode>} sum over the
  //   page's group  |  {GCOUNT} row count. Meaningful with newPage groups.
  RPTC.withGroupVars = function (rec, gctx) {
    if (!gctx || !gctx.path) return rec;
    var r = Object.assign({}, rec || {});
    gctx.path.forEach(function (lv) {
      (lv.keys || []).forEach(function (p) { r['GROUP.' + p.fieldCode] = { value: p.key }; });
    });
    var rows = gctx.rows || [];
    r.GCOUNT = { value: String(rows.length) };
    var sums = {};
    rows.forEach(function (row) {
      Object.keys(row.value || {}).forEach(function (k) {
        var v = numOf(RPTC.rawValueToText(row.value[k]));
        if (!isNaN(v)) sums[k] = (sums[k] || 0) + v;
      });
    });
    Object.keys(sums).forEach(function (k) {
      r['GSUM.' + k] = { value: String(Math.round(sums[k] * 1e6) / 1e6) };
    });
    return r;
  };

  /* ---------------- records-as-rows virtual data source ----------------
   * A table may set subtableCode = '$RECORDS': its rows are then whole
   * RECORDS (from the list view / a query) instead of subtable rows. Record
   * fields act as row fields, so columns, grouping, aggregates and pagination
   * all work unchanged. Extra pseudo fields on the report:
   *   {RCOUNT} total record count | {TSUM.<code>} sum over ALL records
   * (group-scoped {GROUP.*}/{GSUM.*}/{GCOUNT} still come from newPage groups) */
  RPTC.RECORDS_SOURCE = '$RECORDS';
  RPTC.usesRecordsSource = function (tpl) {
    return (tpl.elements || []).some(function (e) {
      return e.type === 'table' && e.subtableCode === RPTC.RECORDS_SOURCE;
    });
  };
  RPTC.recordsToRec = function (records) {
    records = records || [];
    var rec = {};
    rec[RPTC.RECORDS_SOURCE] = { value: records.map(function (r) { return { value: r }; }) };
    rec.RCOUNT = { value: String(records.length) };
    var sums = {};
    records.forEach(function (r) {
      Object.keys(r || {}).forEach(function (k) {
        var v = numOf(RPTC.rawValueToText(r[k]));
        if (!isNaN(v)) sums[k] = (sums[k] || 0) + v;
      });
    });
    Object.keys(sums).forEach(function (k) {
      rec['TSUM.' + k] = { value: String(Math.round(sums[k] * 1e6) / 1e6) };
    });
    return rec;
  };

  RPTC.renderTable = function (el, rec, opts) {
    var fv = rec ? rec[el.subtableCode] : null;
    var rows = (fv && fv.value) || [];
    var cols = el.columns || [];
    if (!cols.length) return '';
    cols = cols.filter(function (c) { return !!c; });
    if (!cols.length) return '';
    var groups = RPTC.tableGroups(el);
    var footers = (el.footers || []).filter(function (f) { return !!f; });
    var fs = (el.fontSize || 9);
    var bw = (el.strokeWidth || 0.2);
    var bc = (el.strokeColor || '#000');
    var headerH = (el.headerH || 8), rowH = (el.rowH || 7);
    var basePad = (el.cellPad == null || el.cellPad === '') ? 1 : Number(el.cellPad) || 0;
    var cellBase = 'border:' + bw + 'mm solid ' + bc + ';padding:0 ' + basePad + 'mm;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;';
    function colPad(c) { // per-column override; later inline declaration wins over cellBase
      return (c && c.pad != null && c.pad !== '') ? 'padding:0 ' + (Number(c.pad) || 0) + 'mm;' : '';
    }
    var totalW = cols.reduce(function (a, c) { return a + (Number(c.width) || 0); }, 0);

    var showHeader = el.showHeader !== false;
    var effHeaderH = showHeader ? headerH : 0;
    var geomY = opts && opts.y != null ? opts.y : el.y;
    var geomH = opts && opts.h != null ? opts.h : el.h;

    // box: overflow VISIBLE so collapsed outer borders (drawn half-outside) are not clipped
    var box = 'position:absolute;box-sizing:border-box;overflow:visible;' +
      'left:' + el.x + 'mm;top:' + geomY + 'mm;' +
      'width:' + Math.max(el.w, 0.2) + 'mm;height:' + Math.max(geomH, 0.2) + 'mm;';
    var h = '<div style="' + box + 'font-family:' + (el.fontFamily || 'Noto Sans JP') + ',sans-serif;font-size:' + fs + 'pt;">';
    h += '<table style="border-collapse:collapse;table-layout:fixed;width:' + totalW + 'mm;"><colgroup>';
    cols.forEach(function (c) { h += '<col style="width:' + c.width + 'mm;">'; });
    h += '</colgroup>';
    if (showHeader) {
      h += '<thead><tr style="height:' + headerH + 'mm;background:' + (el.headerBg || '#f0f0f0') + ';">';
      cols.forEach(function (c) {
        h += '<th style="' + cellBase + colPad(c) + 'text-align:' + (c.align || 'left') + ';font-weight:bold;">' +
          RPTC.esc(c.label || c.fieldCode) + '</th>';
      });
      h += '</tr></thead>';
    }
    h += '<tbody>';

    function dataRowHtml(row) {
      var s = '<tr style="height:' + rowH + 'mm;">';
      cols.forEach(function (c) {
        var txt;
        if (c.expr) {
          // expression column: row fields + record fields visible to the expression
          var mrec = Object.assign({}, rec || {}, row.value || {});
          txt = RPTC.evalExpr(c.expr, mrec, null);
        } else {
          var cellFv = row.value ? row.value[c.fieldCode] : null;
          txt = cellFv ? RPTC.formatValue(RPTC.normalizeFmt(c), cellFv) : '';
        }
        var extra = '';
        if (c.conds && c.conds.length) {
          var o = RPTC.applyConds(c, rec, row.value || {});
          if (!o.visible) txt = '';
          if (o.color) extra += 'color:' + o.color + ';';
          if (o.bg) extra += 'background:' + o.bg + ';';
          if (o.bold) extra += 'font-weight:bold;';
        }
        s += '<td style="' + cellBase + colPad(c) + extra + 'text-align:' + (c.align || 'left') + ';">' + RPTC.esc(txt) + '</td>';
      });
      return s + '</tr>';
    }
    function colHeaderRowHtml(hgt) {
      var s = '<tr style="height:' + hgt + 'mm;background:' + (el.headerBg || '#f0f0f0') + ';">';
      cols.forEach(function (c) {
        s += '<td style="' + cellBase + colPad(c) + 'text-align:' + (c.align || 'left') + ';font-weight:bold;">' +
          RPTC.esc(c.label || c.fieldCode) + '</td>';
      });
      return s + '</tr>';
    }
    function ghRowHtml(entry) {
      var gdef = groups[entry.lvl] || {};
      var hdr = gdef.header || {};
      var g = entry.g;
      // expressions see: record fields + first row of the group + {GROUP.*}
      var mrec = Object.assign({}, rec || {});
      var r0 = (g.rows && g.rows[0] && g.rows[0].value) || {};
      Object.keys(r0).forEach(function (k) { mrec[k] = r0[k]; });
      (g.path || []).forEach(function (lv) {
        (lv.keys || []).forEach(function (p) { mrec['GROUP.' + p.fieldCode] = { value: p.key }; });
      });
      var txt = hdr.expr ? RPTC.evalExpr(hdr.expr, mrec, null) : g.key;
      var st = cellBase + 'text-align:' + (hdr.align || 'left') + ';' +
        'background:' + (hdr.bg || '#f5f5f5') + ';' +
        (hdr.bold === false ? '' : 'font-weight:bold;') +
        (hdr.color ? 'color:' + hdr.color + ';' : '');
      return '<tr style="height:' + entry.h + 'mm;"><td colspan="' + cols.length + '" style="' + st + '">' +
        RPTC.esc(txt) + '</td></tr>';
    }
    function gfRowHtml(entry) {
      var gdef = groups[entry.lvl] || {};
      var ftr = gdef.footer || {};
      var aggs = ftr.aggs || {};
      var st = cellBase + 'background:' + (ftr.bg || '#fafafa') + ';' +
        (ftr.bold === false ? '' : 'font-weight:bold;') +
        (ftr.color ? 'color:' + ftr.color + ';' : '');
      var labelPlaced = !ftr.label;
      var s = '<tr style="height:' + entry.h + 'mm;">';
      cols.forEach(function (c, ci) {
        var a = aggs[c.fieldCode] || aggs['#' + ci];
        if (typeof a === 'string') a = { fn: a, src: c.fieldCode };
        if (a && a.fn) {
          var srcField = a.src || c.fieldCode;
          var v = RPTC.groupAgg(entry.g.rows, srcField, a.fn);
          var txt = (a.fn === 'count')
            ? RPTC.fmtNumber(v, 0, true)
            : RPTC.formatValue(RPTC.normalizeFmt(c), { value: String(v) });
          s += '<td style="' + st + colPad(c) + 'text-align:' + (c.align || 'right') + ';">' + RPTC.esc(txt) + '</td>';
        } else if (!labelPlaced) {
          s += '<td style="' + st + colPad(c) + 'text-align:right;">' + RPTC.esc(ftr.label) + '</td>';
          labelPlaced = true;
        } else {
          s += '<td style="' + st + colPad(c) + '">&nbsp;</td>';
        }
      });
      return s + '</tr>';
    }
    function entryHtml(e, idx) {
      if (e.k === 'd') return dataRowHtml(e.row);
      if (e.k === 'gh') return ghRowHtml(e);
      if (e.k === 'gf') return gfRowHtml(e);
      if (e.k === 'ch') return (idx === 0 && showHeader) ? '' : colHeaderRowHtml(e.h); // thead (when shown) already tops each slice
      return '';
    }

    var withFooters, usedH = 0, padTo = 0, padCount = 0;
    if (opts && opts.entries) {
      // paginated slice: pre-packed display rows
      withFooters = !!opts.isLast;
      opts.entries.forEach(function (e, idx) {
        var frag = entryHtml(e, idx);
        if (frag) { h += frag; usedH += e.h; }
      });
      if (withFooters && el.fillRows) {
        var capH = Math.max(0, geomH - effHeaderH - footers.length * rowH);
        padCount = Math.max(0, Math.floor((capH - usedH) / rowH));
      }
    } else {
      // single designed box: clip stream by height
      withFooters = true;
      var stream = RPTC.buildDisplayStream(el, rows);
      var availH = Math.max(0, geomH - effHeaderH - footers.length * rowH);
      var shownData = 0;
      for (var si = 0; si < stream.length; si++) {
        var e = stream[si];
        if (usedH + e.h > availH) break;
        var frag = entryHtml(e, si);
        if (frag) { h += frag; usedH += e.h; if (e.k === 'd') shownData++; }
        else if (e.k === 'ch' && si === 0) { /* skipped, no height consumed */ }
      }
      if (el.fillRows) {
        padCount = Math.max(0, Math.floor((availH - usedH) / rowH));
      } else if (!groups.length) {
        var minR = Number(el.minRows) || 0;
        padCount = Math.max(0, Math.min(Math.floor((availH - usedH) / rowH), minR - shownData));
      }
    }
    for (var pad = 0; pad < padCount; pad++) {
      h += '<tr style="height:' + rowH + 'mm;">';
      cols.forEach(function () { h += '<td style="' + cellBase + '">&nbsp;</td>'; });
      h += '</tr>';
    }

    // footer rows: label spans all but the last column, value sits in the last column
    if (!withFooters) footers = [];
    footers.forEach(function (f) {
      var val = (f.bind === 'text') ? (f.text || '')
        : RPTC.formatValue(RPTC.normalizeFmt(f), rec ? rec[f.fieldCode] : null);
      if (f.bind !== 'text') {
        if (val === '' || val == null) val = f.blankText || '';
        else val = (f.prefix || '') + val + (f.suffix || '');
      }
      var extra = (f.color ? 'color:' + f.color + ';' : '') +
        (f.bold ? 'font-weight:bold;' : '') +
        (f.italic ? 'font-style:italic;' : '') +
        (f.underline ? 'text-decoration:underline;' : '') +
        (Number(f.fontSize) ? 'font-size:' + Number(f.fontSize) + 'pt;' : '') +
        (f.bg ? 'background:' + f.bg + ';' : '');
      var valAlign = f.align || 'right';
      var fPad = (f.pad != null && f.pad !== '') ? 'padding:0 ' + (Number(f.pad) || 0) + 'mm;' : '';
      h += '<tr style="height:' + rowH + 'mm;">';
      if (cols.length > 1) {
        h += '<td colspan="' + (cols.length - 1) + '" style="' + cellBase + fPad + extra + 'text-align:right;">' + RPTC.esc(f.label || '') + '</td>';
        h += '<td style="' + cellBase + fPad + extra + 'text-align:' + valAlign + ';">' + RPTC.esc(val) + '</td>';
      } else {
        h += '<td style="' + cellBase + fPad + extra + 'text-align:' + valAlign + ';">' + RPTC.esc((f.label || '') + ' ' + val) + '</td>';
      }
      h += '</tr>';
    });
    h += '</tbody></table></div>';
    return h;
  };

  /* ---------------- pagination (continuation model, height-based) ----------------
   * One table per template may set paginate=true. The subtable becomes a
   * display-row STREAM (group headers/footers + data rows, each with a height
   * in mm) packed greedily into pages.
   *   - page 1 keeps the designed layout; overflow pages restart the table at
   *     contTop and flow to (pageH - contBottom), repeating only elements
   *     flagged repeatAllPages.
   *   - a group level with newPage forces a break BEFORE its header, and that
   *     page renders the FULL designed layout again (slice.full) with group
   *     context injected ({GROUP.*}/{GSUM.*}/{GCOUNT}) - "1 page per group".
   *   - keepTogether moves a whole group to the next page when it would split
   *     but fits on a fresh page (groups taller than a page still split).
   *   - group headers are never orphaned at a page bottom (header + at least
   *     one following row travel together).
   *   - repeatOnBreak re-emits active group headers atop continuation pages.
   * Grand-total footer rows render on the final page only. */
  RPTC.paginatePlan = function (tpl, pt, rec) {
    var rows = (rec && rec[pt.subtableCode] && rec[pt.subtableCode].value) || [];
    var stream = RPTC.buildDisplayStream(pt, rows);
    if (!stream.length) return null;
    var pageH = RPTC.paperDims(tpl).h;
    var headerH = (pt.headerH || 8), rowH = (pt.rowH || 7);
    var effHeaderH = (pt.showHeader === false) ? 0 : headerH;
    var groups = RPTC.tableGroups(pt);
    var F = ((pt.footers || []).filter(function (f) { return !!f; })).length;
    var footH = F * rowH;
    var avail1 = Math.max(rowH, pt.h - effHeaderH);
    var contTop = Number(pt.contTop) || 15;
    var contBottom = Number(pt.contBottom) || 10;
    var contH = Math.max(rowH * 2 + effHeaderH, pageH - contTop - contBottom);
    var availN = Math.max(rowH, contH - effHeaderH);

    var totalH = footH, anyBreak = false;
    stream.forEach(function (e) { totalH += e.h; if (e.newPageBefore) anyBreak = true; });
    if (!anyBreak && totalH <= avail1) return null; // fits on the designed page 1

    var slices = [];
    function mkSlice(full) {
      return full
        ? { entries: [], used: 0, cap: avail1, y: pt.y, h: pt.h, full: true, isLast: false, gctx: null }
        : { entries: [], used: 0, cap: availN, y: contTop, h: contH, full: false, isLast: false, gctx: null };
    }
    var cur = mkSlice(true); // page 1 is always the designed layout

    function breakTo(full, contEntry) {
      slices.push(cur);
      cur = mkSlice(full);
      if (!full && contEntry && contEntry.g) {
        // continuation mid-group: re-emit active headers flagged repeatOnBreak
        (contEntry.g.path || []).forEach(function (lv, li) {
          var gdef = groups[li];
          if (!gdef || !gdef.repeatOnBreak) return;
          var hdr = gdef.header || {};
          if (hdr.show !== false) {
            var gh = { k: 'gh', h: Number(hdr.h) || rowH, lvl: li, virtual: true,
              g: { lvl: li, key: (lv.keys || []).map(function (p) { return p.key; }).join(' / '),
                rows: contEntry.g.rows, path: contEntry.g.path.slice(0, li + 1) } };
            cur.entries.push(gh); cur.used += gh.h;
          }
          if (gdef.repeatColHeader) {
            cur.entries.push({ k: 'ch', h: headerH, lvl: li, virtual: true });
            cur.used += headerH;
          }
        });
      }
    }

    for (var i = 0; i < stream.length; i++) {
      var e = stream[i];
      // forced page-per-group break: new FULL page (designed layout, group context)
      if (e.newPageBefore && cur.entries.length) breakTo(true, null);
      // keep-together: group would split here but fits on a fresh page
      if (e.ktBlockH && cur.entries.length &&
          e.ktBlockH > (cur.cap - cur.used) && e.ktBlockH <= availN) {
        breakTo(false, e);
      }
      // orphan control: a header run must reach its first following row
      var req = e.h;
      if (e.k === 'gh' || e.k === 'ch') {
        req = 0;
        var j = i;
        while (j < stream.length && (stream[j].k === 'gh' || stream[j].k === 'ch')) { req += stream[j].h; j++; }
        if (j < stream.length) req += stream[j].h;
      }
      if (cur.used + req > cur.cap && cur.entries.length) breakTo(false, e);
      cur.entries.push(e);
      cur.used += e.h;
      if (!cur.gctx && e.g) cur.gctx = e.g; // page's group context = first (outermost-opened) group
    }
    // grand-total footers need room on the final page
    if (footH > cur.cap - cur.used && cur.entries.length) breakTo(false, null);
    slices.push(cur);
    slices[slices.length - 1].isLast = true;
    return slices;
  };

  /* ---------------- page renderer ----------------
   * Returns Promise<{html, images:[{slot,src,fit}]}>.
   * "images" includes qr codes; caller injects them into [data-imgslot] divs. */
  var SLOT_SEQ = 0; // slots must be unique across pages injected into one document
  RPTC.renderPage = function (tpl, rec, images, _pg) {
    var parts = [];
    var imagePromises = [];
    var esc = RPTC.esc;
    var seq = ++SLOT_SEQ;

    (tpl.elements || []).forEach(function (el) {
      if (_pg) {
        if (el.id === _pg.ptId) {
          var condT = (el.conds && el.conds.length) ? RPTC.applyConds(el, rec, null) : null;
          if (!condT || condT.visible) parts.push(RPTC.renderTable(el, rec, _pg.slice));
          return;
        }
        if (_pg.index > 0 && !(_pg.slice && _pg.slice.full) && !el.repeatAllPages) return; // page-1-only element (full group pages re-render everything)
      }
      var condOut = (el.conds && el.conds.length) ? RPTC.applyConds(el, rec, null) : null;
      if (condOut && !condOut.visible) return; // conditionally hidden
      var eff = condOut ? Object.assign({}, el, { color: condOut.color, bg: condOut.bg, bold: condOut.bold }) : el;
      if (el.type === 'text') {
        var txt = RPTC.evalExpr(el.text, rec, null);
        var spanA = el.autoFit ? '<span data-autofit style="white-space:nowrap;">' : '<span style="white-space:pre-wrap;">';
        parts.push('<div style="' + RPTC.boxCss(el) + RPTC.textCss(eff) + RPTC.borderCss(el) + '">' + spanA + esc(txt) + '</span></div>');
      } else if (el.type === 'field') {
        var spanB = el.autoFit ? '<span data-autofit style="white-space:nowrap;">' : '<span style="white-space:pre-wrap;">';
        parts.push('<div style="' + RPTC.boxCss(el) + RPTC.textCss(eff) + RPTC.borderCss(el) + '">' + spanB + esc(RPTC.fieldText(el, rec)) + '</span></div>');
      } else if (el.type === 'rect' || el.type === 'ellipse') {
        parts.push('<div style="' + RPTC.boxCss(el) +
          'border:' + (el.strokeWidth || 0.3) + 'mm solid ' + (el.strokeColor || '#000') + ';' +
          (el.fill ? 'background:' + el.fill + ';' : '') +
          (el.type === 'ellipse' ? 'border-radius:50%;' :
            (el.radius ? 'border-radius:' + el.radius + 'mm;' : '')) + '"></div>');
      } else if (el.type === 'line') {
        var lw = (el.strokeWidth || 0.3);
        if (el.dir === 'vertical') {
          parts.push('<div style="' + RPTC.boxCss(el) + '"><div style="border-left:' + lw + 'mm solid ' +
            (el.strokeColor || '#000') + ';width:0;height:100%;margin:0 auto;"></div></div>');
        } else {
          parts.push('<div style="' + RPTC.boxCss(el) + 'display:flex;align-items:center;"><div style="border-top:' + lw + 'mm solid ' +
            (el.strokeColor || '#000') + ';height:0;width:100%;"></div></div>');
        }
      } else if (el.type === 'image') {
        var slot = 'img_' + el.id + '_' + seq;
        parts.push('<div style="' + RPTC.boxCss(el) + '" data-imgslot="' + slot + '"></div>');
        imagePromises.push(RPTC.resolveImageSrc(el, rec, images).then(function (src) {
          return { slot: slot, src: src, fit: el.fit || 'contain' };
        }));
      } else if (el.type === 'barcode') {
        var bval = el.bindType === 'text' ? (el.text || '') : RPTC.rawValueToText(rec ? rec[el.fieldCode] : null);
        var showText = el.showText !== false;
        var bslot = 'bc_' + el.id + '_' + seq;
        parts.push('<div style="' + RPTC.boxCss(el) + 'background:#fff;">' +
          '<div style="height:' + (showText ? '75%' : '100%') + ';" data-imgslot="' + bslot + '"></div>' +
          (showText ? '<div style="height:25%;display:flex;align-items:center;justify-content:center;' +
            'font-family:monospace;font-size:' + (el.fontSize || 8) + 'pt;">' + esc(bval) + '</div>' : '') + '</div>');
        imagePromises.push(RPTC.barcodeDataURL(bval, el.symbology).then(function (src) {
          return { slot: bslot, src: src, fit: 'stretch' };
        }));
      } else if (el.type === 'qr') {
        var qval = el.bindType === 'text' ? (el.text || '') : RPTC.rawValueToText(rec ? rec[el.fieldCode] : null);
        var qslot = 'qr_' + el.id + '_' + seq;
        parts.push('<div style="' + RPTC.boxCss(el) + '" data-imgslot="' + qslot + '"></div>');
        imagePromises.push(RPTC.qrDataURL(qval).then(function (src) {
          return { slot: qslot, src: src, fit: 'contain' };
        }));
      } else if (el.type === 'table') {
        parts.push(RPTC.renderTable(el, rec));
      }
    });

    return Promise.all(imagePromises).then(function (imgs) {
      return { html: parts.join(''), images: imgs };
    });
  };

  /* ---------------- conditional formatting ---------------- */
  RPTC.COND_OPS = ['eq', 'ne', 'contains', 'gt', 'gte', 'lt', 'lte', 'empty', 'notempty'];
  RPTC.evalCond = function (cond, rec, rowValue) {
    if (!cond || !cond.fieldCode) return false;
    var fv = rowValue && (cond.fieldCode in rowValue) ? rowValue[cond.fieldCode]
      : (rec ? rec[cond.fieldCode] : null);
    var val = fv ? RPTC.rawValueToText(fv) : '';
    var cmp = cond.value == null ? '' : String(cond.value);
    switch (cond.op) {
      case 'empty': return val === '';
      case 'notempty': return val !== '';
    }
    var bothNum = val !== '' && cmp !== '' && !isNaN(Number(val)) && !isNaN(Number(cmp));
    var a = bothNum ? Number(val) : val;
    var b = bothNum ? Number(cmp) : cmp;
    switch (cond.op) {
      case 'eq': return a === b || String(val) === cmp;
      case 'ne': return !(a === b || String(val) === cmp);
      case 'contains': return String(val).indexOf(cmp) >= 0;
      case 'gt': return a > b;
      case 'gte': return a >= b;
      case 'lt': return a < b;
      case 'lte': return a <= b;
    }
    return false;
  };
  // Effective style after conditions. Matching conditions apply in order (later wins).
  RPTC.applyConds = function (holder, rec, rowValue) {
    var out = { color: holder.color, bg: holder.bg, bold: holder.bold, visible: true };
    (holder.conds || []).forEach(function (c) {
      if (!c) return;
      if (RPTC.evalCond(c, rec, rowValue)) {
        if (c.color) out.color = c.color;
        if (c.bg) out.bg = c.bg;
        if (c.bold) out.bold = true;
        if (c.hide) out.visible = false;
      }
    });
    return out;
  };

  // Which field codes does a template reference that the record does NOT contain?
  RPTC.missingFieldCodes = function (tpl, rec) {
    rec = rec || {};
    var used = {};
    function addExprCodes(s) {
      String(s || '').replace(/\{([^{}]+)\}/g, function (_, c) { used[c.trim()] = 1; return _; });
    }
    (tpl.elements || []).forEach(function (el) {
      if (el.type === 'field') { if (el.expr) addExprCodes(el.expr); else if (el.fieldCode) used[el.fieldCode] = 1; }
      if (el.type === 'text') addExprCodes(el.text);
      if ((el.type === 'image' || el.type === 'barcode' || el.type === 'qr') && el.bindType === 'field' && el.fieldCode) used[el.fieldCode] = 1;
      if (el.type === 'table') {
        if (el.subtableCode) used[el.subtableCode] = 1;
        (el.footers || []).forEach(function (f) { if (f.fieldCode) used[f.fieldCode] = 1; });
      }
    });
    var rowFields = {};
    if (tpl.outputUnit === 'row' && tpl.rowSubtable && rec[tpl.rowSubtable]) {
      var r0 = (rec[tpl.rowSubtable].value || [])[0];
      if (r0 && r0.value) Object.keys(r0.value).forEach(function (k) { rowFields[k] = 1; });
    }
    return Object.keys(used).filter(function (c) {
      return !(c in rec) && !(c in rowFields) && c !== '$id' && c !== 'PAGE' && c !== 'PAGES' &&
        c !== 'GCOUNT' && c !== 'RCOUNT' &&
        c.indexOf('GROUP.') !== 0 && c.indexOf('GSUM.') !== 0 && c.indexOf('TSUM.') !== 0;
    });
  };

  /* ---------------- sheet imposition (面付け) ----------------
   * The label template is untouched; the sheet is a projection at output time.
   * Returns null when disabled or when a paginating table makes sheets meaningless. */
  RPTC.sheetLayout = function (tpl) {
    var s = tpl.sheet;
    if (!s || !s.enabled) return null;
    if ((tpl.elements || []).some(function (e) { return e.type === 'table' && e.paginate; })) return null;
    var lab = RPTC.paperDims(tpl);
    var sp = RPTC.paperDims({ paper: { size: s.paper || 'A4', orientation: s.orientation || 'portrait', wmm: s.wmm, hmm: s.hmm } });
    var mT = Number(s.marginTop); if (isNaN(mT)) mT = 10;
    var mL = Number(s.marginLeft); if (isNaN(mL)) mL = 10;
    var gX = Number(s.gapX) || 0, gY = Number(s.gapY) || 0;
    var cols = Math.max(1, Math.floor((sp.w - mL * 2 + gX) / (lab.w + gX)));
    var rows = Math.max(1, Math.floor((sp.h - mT * 2 + gY) / (lab.h + gY)));
    var positions = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        positions.push({ x: mL + c * (lab.w + gX), y: mT + r * (lab.h + gY) });
      }
    }
    return { paperW: sp.w, paperH: sp.h, cols: cols, rows: rows, perSheet: cols * rows,
      positions: positions, labelW: lab.w, labelH: lab.h };
  };
  // Paper size the OUTPUT uses: the sheet when imposition is active, else the template paper.
  RPTC.effectivePaperDims = function (tpl) {
    var lay = RPTC.sheetLayout(tpl);
    return lay ? { w: lay.paperW, h: lay.paperH } : RPTC.paperDims(tpl);
  };
  // labelPages -> sheet pages (slot wrappers create the containing block for the label's absolute elements)
  function cutlineHtml(tpl, lay) {
    if (!tpl.sheet.cutlines) return '';
    var s = tpl.sheet;
    var mL = Number(s.marginLeft); if (isNaN(mL)) mL = 10;
    var mT = Number(s.marginTop); if (isNaN(mT)) mT = 10;
    var gX = Number(s.gapX) || 0, gY = Number(s.gapY) || 0;
    var x1 = mL + lay.cols * lay.labelW + (lay.cols - 1) * gX;
    var y1 = mT + lay.rows * lay.labelH + (lay.rows - 1) * gY;
    var line = '0.2mm dashed #999';
    var h = '';
    for (var c = 0; c <= lay.cols; c++) {
      var x = (c === 0) ? mL : (c === lay.cols) ? x1 : mL + c * lay.labelW + (c - 0.5) * gX;
      h += '<div style="position:absolute;left:' + x + 'mm;top:' + mT + 'mm;height:' + (y1 - mT) +
        'mm;width:0;border-left:' + line + ';"></div>';
    }
    for (var r = 0; r <= lay.rows; r++) {
      var y = (r === 0) ? mT : (r === lay.rows) ? y1 : mT + r * lay.labelH + (r - 0.5) * gY;
      h += '<div style="position:absolute;top:' + y + 'mm;left:' + mL + 'mm;width:' + (x1 - mL) +
        'mm;height:0;border-top:' + line + ';"></div>';
    }
    return h;
  }
  function imposeSheets(tpl, labelPages) {
    var lay = RPTC.sheetLayout(tpl);
    if (!lay) return labelPages;
    var guides = cutlineHtml(tpl, lay);
    var startPos = Math.min(Math.max(Number(tpl.sheet.startPos) || 1, 1), lay.perSheet) - 1;
    var sheets = [];
    var slotIdx = startPos; // blanks before the first label on sheet 1
    var cur = { html: guides, images: [] };
    labelPages.forEach(function (p) {
      if (slotIdx >= lay.perSheet) { sheets.push(cur); cur = { html: guides, images: [] }; slotIdx = 0; }
      var pos = lay.positions[slotIdx];
      cur.html += '<div style="position:absolute;overflow:hidden;' +
        'left:' + pos.x + 'mm;top:' + pos.y + 'mm;' +
        'width:' + lay.labelW + 'mm;height:' + lay.labelH + 'mm;">' + p.html + '</div>';
      cur.images = cur.images.concat(p.images || []);
      slotIdx++;
    });
    if (cur.html !== guides || sheets.length === 0) sheets.push(cur);
    return sheets;
  }

  function recWithPageVars(rec, page, pages) {
    var r = Object.assign({}, rec || {});
    r.PAGE = { value: String(page) };
    r.PAGES = { value: String(pages) };
    return r;
  }
  // Multi-page render. Returns Promise<Array<{html, images}>>.
  RPTC.renderPages = function (tpl, rec, images) {
    return renderPagesRaw(tpl, rec, images).then(function (pages) {
      return imposeSheets(tpl, pages);
    });
  };
  function renderPagesRaw(tpl, rec, images) {
    // per-subtable-row output (labels): one page per row, row fields promoted to top level
    if (tpl.outputUnit === 'row' && tpl.rowSubtable) {
      var sfv = rec ? rec[tpl.rowSubtable] : null;
      var srows = (sfv && sfv.value) || [];
      if (!srows.length) {
        return RPTC.renderPage(tpl, recWithPageVars(rec, 1, 1), images).then(function (p) { return [p]; });
      }
      return Promise.all(srows.map(function (row, i) {
        var merged = Object.assign({}, rec || {}, row.value || {});
        return RPTC.renderPage(tpl, recWithPageVars(merged, i + 1, srows.length), images);
      }));
    }
    // choose the paginating table defensively: prefer one whose data source
    // actually has rows (guards against leftover/abandoned table elements)
    var cands = (tpl.elements || []).filter(function (e) {
      return e.type === 'table' && e.paginate && e.subtableCode;
    });
    var pt = cands.find(function (e) {
      var fv = rec ? rec[e.subtableCode] : null;
      return fv && fv.value && fv.value.length;
    }) || cands[0];
    var plan = pt ? RPTC.paginatePlan(tpl, pt, rec) : null;
    try {
      if (pt) {
      var nRows = pt && rec && rec[pt.subtableCode] ? ((rec[pt.subtableCode].value || []).length) : 0;
      console.info('[ReportDesigner] paginate: table=' + (pt ? (pt.id + '/' + pt.subtableCode) : 'none') +
        ' rows=' + nRows + ' pages=' + (plan ? plan.length : 1) +
        (cands.length > 1 ? ' (WARN: ' + cands.length + ' paginate tables in template)' : ''));
      }
    } catch (e) { }
    if (!plan) {
      return RPTC.renderPage(tpl, recWithPageVars(rec, 1, 1), images).then(function (p) { return [p]; });
    }
    var total = plan.length;
    return Promise.all(plan.map(function (slice, i) {
      var r2 = RPTC.withGroupVars(recWithPageVars(rec, i + 1, total), slice.gctx);
      return RPTC.renderPage(tpl, r2, images,
        { index: i, ptId: pt.id, slice: slice });
    }));
  };

  // Inject resolved images into a rendered container (document or element).
  // Shrink data-autofit spans until they fit their box width (min 4pt).
  RPTC.autofitText = function (root) {
    var list = root.querySelectorAll ? root.querySelectorAll('[data-autofit]') : [];
    Array.prototype.forEach.call(list, function (span) {
      var box = span.parentElement;
      if (!box) return;
      var availW = box.clientWidth, availH = box.clientHeight;
      if (!availW || !availH) return;
      function ratio() {
        var r = Math.min(availW / Math.max(span.scrollWidth, 1),
                         availH / Math.max(span.scrollHeight, 1));
        return r;
      }
      var r = ratio();
      if (r >= 1) return;
      var cur = parseFloat(box.style.fontSize) || 11;
      var size = Math.max(4, Math.floor(cur * r * 10) / 10);
      span.style.fontSize = size + 'pt';
      r = ratio(); // fonts don't scale perfectly linearly - one correction pass
      if (r < 1) {
        size = Math.max(4, Math.floor(size * r * 10) / 10);
        span.style.fontSize = size + 'pt';
      }
    });
  };

  RPTC.injectImages = function (root, images, asBackground) {
    (images || []).forEach(function (im) {
      if (!im.src) return;
      var slot = root.querySelector('[data-imgslot="' + im.slot + '"]');
      if (!slot) return;
      if (asBackground) {
        // html2canvas path: it has no object-fit support on <img>, but renders
        // background-size contain/cover correctly
        slot.style.backgroundImage = 'url("' + im.src + '")';
        slot.style.backgroundSize = im.fit === 'cover' ? 'cover'
          : im.fit === 'stretch' ? '100% 100%' : 'contain';
        slot.style.backgroundPosition = 'center';
        slot.style.backgroundRepeat = 'no-repeat';
        return;
      }
      var img = (root.ownerDocument || root).createElement('img');
      img.src = im.src;
      var fit = im.fit === 'cover' ? 'cover' : im.fit === 'stretch' ? 'fill' : 'contain';
      img.style.cssText = 'width:100%;height:100%;object-fit:' + fit + ';display:block;';
      slot.appendChild(img);
    });
  };

  /* ---------------- embedded image chunking (config storage) ----------------
   * Kintone limits: 65,535 chars per config value, and 256KB TOTAL per plugin
   * (kintone.plugin.app.setConfig). We budget conservatively below that. */
  /* The 256KB total limit's internal encoding is undocumented. We budget for
   * the WORST CASE of UTF-8 vs UTF-16 (2 bytes/char) so base64-heavy configs
   * can never trip kintone's check even if it counts UTF-16 units. */
  RPTC.CONFIG_TOTAL_BUDGET = 250000;  // assumed hard total in bytes w/ margin
  RPTC.IMG_TARGET_CHARS = 40000;      // per-image dataURL budget (chars)
  RPTC.byteSize = function (s) {
    s = String(s == null ? '' : s);
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(s).length;
    var b = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      b += c < 0x80 ? 1 : c < 0x800 ? 2 : (c >= 0xD800 && c < 0xDC00) ? 4 : 3;
      if (c >= 0xD800 && c < 0xDC00) i++;
    }
    return b;
  };
  // Worst-case size of one string under either encoding interpretation.
  RPTC.worstSize = function (s) {
    s = String(s == null ? '' : s);
    return Math.max(RPTC.byteSize(s), s.length * 2);
  };
  RPTC.configTotalBytes = function (conf) {
    var total = 0;
    Object.keys(conf).forEach(function (k) {
      total += RPTC.worstSize(k) + RPTC.worstSize(conf[k]);
    });
    return total;
  };
  // Per-key size breakdown, largest first: [{key, kb}]
  RPTC.configBreakdown = function (conf) {
    return Object.keys(conf).map(function (k) {
      return { key: k, kb: Math.ceil(RPTC.worstSize(conf[k]) / 1024) };
    }).sort(function (a, b) { return b.kb - a.kb; });
  };
  var CHUNK = 60000; // below Kintone's 65535/key
  RPTC.chunkImages = function (images) {
    var meta = {}, keys = {};
    Object.keys(images || {}).forEach(function (id) {
      var data = images[id] || '';
      var n = Math.ceil(data.length / CHUNK);
      meta[id] = n;
      for (var i = 0; i < n; i++) keys['img_' + id + '_' + i] = data.slice(i * CHUNK, (i + 1) * CHUNK);
    });
    return { meta: meta, keys: keys };
  };
  RPTC.reassembleImages = function (conf) {
    var images = {};
    var meta = {};
    try { meta = conf.imagesMeta ? JSON.parse(conf.imagesMeta) : {}; } catch (e) { }
    Object.keys(meta).forEach(function (id) {
      var n = Number(meta[id]) || 0, parts = [];
      for (var i = 0; i < n; i++) parts.push(conf['img_' + id + '_' + i] || '');
      images[id] = parts.join('');
    });
    return images;
  };

  window.RPTC = RPTC;
})();
