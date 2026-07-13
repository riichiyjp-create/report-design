/* =====================================================================
 * Report Designer - config.js  (v1.0.0)
 * Free-layout report designer for Kintone.
 * Units: all element geometry is stored in mm. Pixels only at render.
 * ===================================================================== */
(function (PLUGIN_ID) {
  'use strict';

  var VERSION = '1.25.2';

  /* ---------------- i18n ---------------- */
  var LANG = (kintone.getLoginUser && kintone.getLoginUser().language) === 'ja' ? 'ja' : 'en';
  var I18N = {
    ja: {
      title: '帳票デザイナー', snap: 'スナップ', grid: 'グリッド',
      templates: 'テンプレート', addTemplate: 'テンプレート追加', fields: 'フィールド',
      properties: 'プロパティ', paper: '用紙設定', save: '保存', cancel: 'キャンセル',
      unsaved: '未保存の変更あり', saved: '保存しました', newTpl: '新規テンプレート',
      confirmDelTpl: 'テンプレートを削除しますか？', confirmDelEl: '要素を削除しますか？',
      noTpl: 'テンプレートを追加してください', text: 'テキスト', field: 'フィールド',
      rect: '四角形', line: '線', image: '画像', table: 'テーブル',
      tplName: 'テンプレート名', buttonLabel: 'ボタン名', paperSize: '用紙サイズ',
      orientation: '向き', portrait: '縦', landscape: '横',
      posSize: '位置・サイズ', style: 'スタイル', format: '書式', content: '内容',
      fontFamily: 'フォント', fontSize: 'サイズ(pt)', bold: '太字', italic: '斜体',
      align: '横位置', valign: '縦位置', color: '文字色', bg: '背景色', none: 'なし',
      left: '左', center: '中央', right: '右', top: '上', middle: '中', bottom: '下',
      strokeColor: '線色', strokeWidth: '線幅(mm)', fill: '塗り', radius: '角丸(mm)',
      lineDir: '方向', horizontal: '水平', vertical: '垂直',
      bindType: 'ソース', bindField: 'フィールド', bindUrl: 'URL', fit: 'フィット',
      contain: '収める', cover: '覆う', stretch: '伸縮',
      subtable: 'サブテーブル', columns: '列', addColumn: '列を追加', colWidth: '幅(mm)',
      headerH: 'ヘッダ高(mm)', rowH: '行高(mm)', label: 'ラベル', delete: '削除',
      duplicate: '複製', fmtType: '表示形式', decimals: '小数桁', prefix: '前置', suffix: '後置',
      blankText: '空欄時', fmtNone: 'そのまま', fmtNumber: '数値(3桁区切り)', fmtDate: '日付',
      dateFmt: '日付形式', sampleText: 'テキスト', fieldNotSet: '(未設定)',
      tooBig: '設定サイズが上限を超えました。要素・テンプレートを減らしてください。',
      ellipse: '楕円', barcode: 'バーコード', qr: 'QRコード', preview: 'プレビュー',
      dataSource: 'データソース', appFields: 'アプリフィールド', systemVars: 'システム',
      exprTitle: '式エディタ', exprHint: '{フィールドコード} で値を挿入。テキストと自由に組み合わせ可能。ダブルクリックで挿入。',
      showText: '文字表示', bindText: 'テキスト', noRecordSample: 'レコードが無いため空欄で表示しています',
      close: '閉じる', previewLoading: '読み込み中...',
      previewUsing: 'レコード #{id} のデータで表示中', missingCodes: 'このアプリに存在しないフィールドコード: ',
      fmtDialog: 'フォーマット', fmtGeneral: '一般', fmtNum: '数', fmtCur: '通貨',
      fmtDateCat: '日付', fmtTime: '時間', fmtPct: 'パーセンテージ', fmtBool: 'ブール', fmtCustom: 'カスタム',
      sample: 'サンプル', thousands: '3桁区切り', symbol: '記号', symbolPos: '記号位置',
      before: '前', after: '後', x100: '×100して表示', trueText: '真の表示', falseText: '偽の表示',
      customPtn: 'パターン', customHint: '数値: #,##0.00 / 日付: YYYY年M月D日 等',
      fillRows: '空行で埋める', embed: '埋め込み', dblclickImg: 'ダブルクリックで画像ファイルを選択',
      imgTooBig: '画像が大きすぎます。より小さい画像を使用してください。',
      exportTpl: '書出', importTpl: '取込', importFail: 'テンプレートの読み込みに失敗しました',
      cfgUsage: '設定使用量', cfgOver: 'kintoneのプラグイン設定上限(256KB)を超えています。\n現在: {cur}KB / 上限目安: {max}KB\n\n内訳(上位):\n{detail}\n\n・埋め込み画像を減らす、または小さい画像に差し替えてください\n・大きなロゴはURL指定または添付ファイルフィールド参照も利用できます',
      imgRecompressed: '画像を自動的に再圧縮しました', saving: '保存中...',
      moveUp: '上へ', moveDown: '下へ', renameHint: 'ダブルクリックで名前を変更',
      footers: 'フッター行(合計等)', addFooter: 'フッター行を追加', minRows: '最小行数',
      groups: 'グループ化', addGroup: 'グループレベルを追加', groupField: 'グループ項目',
      groupNote: '連続する同一値でグループ化（並び順は保持・自動ソートなし）。「グループ毎に改ページ」時は {GROUP.コード} {GSUM.コード} {GCOUNT} を自由要素の式で使用可能',
      gHeaderRow: 'ヘッダー行を表示', gHeaderExpr: 'ヘッダー式', gRowH: '行高(mm)',
      gRepeatColHeader: '列見出しを再表示', gFooterRow: 'フッター行(集計)を表示',
      gAggs: '列集計', aggNone: '—', aggSum: '合計', aggCount: '件数', aggAvg: '平均',
      gNewPage: 'グループ毎に改ページ', gKeepTogether: 'グループを分割しない(可能なら)',
      gRepeatOnBreak: 'ページまたぎ時ヘッダー再表示', gLevel: 'レベル',
      recordsSource: '★ 一覧のレコード(全件)',
      recordsNote: '行 = 一覧のレコード（表示中ビューの絞込・並び順を使用、一覧画面から印刷）。{RCOUNT}=総件数 {TSUM.コード}=全件合計 が使用可能',
      previewRecords: '{n} 件のレコードで表示中',
      aggRcount: '件数 (RCOUNT)',
      groupDialog: 'グループ化・並び替え', groupBtn: 'グループ化…', groupNone: 'なし',
      rowSort: 'データ行の並び替え', addSortKey: '並び替えキーを追加',
      sortNote: '未設定の場合は元の並び順（ビュー／サブテーブルの順）を保持',
      sortAsc: '昇順', sortDesc: '降順', sortNone: 'なし(元の順序)',
      gKeys: 'グループキー', addKeyField: 'キー項目を追加',
      gKeysNote: '複数キー = 複合グループ（例: 材質＋板厚で1グループ）。ネストする場合はレベルを追加',
      gSort: '並び替え', aggSrc: '集計元', showTableHeader: 'ヘッダー行を表示',
      colBind: 'バインド', colBindField: 'フィールド', colBindExpr: '式',
      exprBtn: '式…', levels: 'グループレベル', gOptions: 'オプション',
      tplGroups: '印刷グループ', tplGroupsBtn: '📑 印刷グループ…', addTplGroup: '印刷グループを追加',
      tplGroupName: 'グループ名', tplGroupMembers: '対象テンプレート',
      tplGroupsNote: '選択したテンプレートを1つの印刷ジョブとして連結出力します（テンプレート一覧の順）。用紙設定は先頭テンプレートを使用。印刷ボタンのメニューに 📑 付きで表示されます',
      tplGroupEmpty: 'テンプレートを2つ以上選択してください',
      searchPh: '検索...',
      elKind: '種別', textEl: 'テキスト', fieldEl: 'フィールド',
      pad: 'パディング(mm)', placeHint: 'クリックした位置に配置します (Escで取消)',
      cellPad: 'セル内余白(mm)',
      dupTpl: 'テンプレートを複製', copySuffix: 'のコピー',
      conds: '条件書式', addCond: '条件を追加', condValue: '値', condHide: '非表示',
      opEq: 'に等しい', opNe: 'に等しくない', opContains: 'を含む', opGt: 'より大きい',
      opGte: '以上', opLt: 'より小さい', opLte: '以下', opEmpty: '空', opNotempty: '空でない',
      condN: '条件', condIf: 'フィールド', condStyle: 'スタイル', condSample: 'サンプル',
      outputUnit: '出力単位', unitRecord: 'レコード毎', unitRow: 'サブテーブル行毎(ラベル)',
      rowSubtable: '対象サブテーブル', customSize: 'カスタム', paperW: '幅(mm)', paperH: '高さ(mm)',
      previewCapped: '(先頭{n}ページのみ表示。印刷時は全ページ出力されます)',
      showInList: '一覧画面に表示',
      pdfSection: 'PDF保存', pdfField: 'PDF保存先フィールド', pdfFileName: 'ファイル名',
      pdfMode: '保存方法', pdfAppend: '追記', pdfReplace: '置換',
      pdfFileNameHint: '例: 見積書_{Invoice_No}  ({フィールドコード}が使えます)', exprClear: 'クリア',
      printVia: '印刷方式', viaBrowser: 'ブラウザ印刷', viaPdf: 'PDF経由(用紙サイズ保持)',
      sheetSection: 'シート印刷(面付け)', sheetEnabled: 'シートに面付けする', sheetPaper: 'シート用紙',
      sheetMarginT: '余白 上下(mm)', sheetMarginL: '余白 左右(mm)', sheetGapX: '間隔 横(mm)', sheetGapY: '間隔 縦(mm)',
      sheetStart: '開始位置', sheetCount: '面数',
      sheetCutlines: '切り取り線を表示', sheetDivide: '均等分割', sheetDivideApply: '適用',
      sheetDivideDone: 'ラベルサイズを {w} × {h} mm に設定しました ({c}列 × {r}行)',
      autoFit: '自動縮小(はみ出し時)', multiSel: '{n}個選択中 - 変更は全てに適用されます',
      borderW: '枠線(mm)', borderColor: '枠線色', textStyle: 'スタイル',
      paginate: '改ページする(複数ページ)', contTop: '続き開始Y(mm)', contBottom: '下限マージン(mm)',
      repeatAllPages: '全ページ表示', pageVar: 'ページ番号', pagesVar: '総ページ数',
      previewPage: 'ページ',
      footerNote: 'レコードのフィールドを表の最終行に続けて表示します',
      symbology: '種別', ctxCopy: 'コピー', ctxCut: '切り取り', ctxPaste: '貼り付け',
      bringFront: '最前面へ', forward: '前面へ', backward: '背面へ', sendBack: '最背面へ'
    },
    en: {
      title: 'Report Designer', snap: 'Snap', grid: 'Grid',
      templates: 'Templates', addTemplate: 'Add template', fields: 'Fields',
      properties: 'Properties', paper: 'Paper', save: 'Save', cancel: 'Cancel',
      unsaved: 'Unsaved changes', saved: 'Saved', newTpl: 'New template',
      confirmDelTpl: 'Delete this template?', confirmDelEl: 'Delete this element?',
      noTpl: 'Add a template to start', text: 'Text', field: 'Field',
      rect: 'Rectangle', line: 'Line', image: 'Image', table: 'Table',
      tplName: 'Template name', buttonLabel: 'Button label', paperSize: 'Paper size',
      orientation: 'Orientation', portrait: 'Portrait', landscape: 'Landscape',
      posSize: 'Position / Size', style: 'Style', format: 'Format', content: 'Content',
      fontFamily: 'Font', fontSize: 'Size (pt)', bold: 'Bold', italic: 'Italic',
      align: 'Align', valign: 'V-Align', color: 'Color', bg: 'Background', none: 'None',
      left: 'Left', center: 'Center', right: 'Right', top: 'Top', middle: 'Middle', bottom: 'Bottom',
      strokeColor: 'Stroke', strokeWidth: 'Stroke (mm)', fill: 'Fill', radius: 'Radius (mm)',
      lineDir: 'Direction', horizontal: 'Horizontal', vertical: 'Vertical',
      bindType: 'Source', bindField: 'Field', bindUrl: 'URL', fit: 'Fit',
      contain: 'Contain', cover: 'Cover', stretch: 'Stretch',
      subtable: 'Subtable', columns: 'Columns', addColumn: 'Add column', colWidth: 'W (mm)',
      headerH: 'Header H (mm)', rowH: 'Row H (mm)', label: 'Label', delete: 'Delete',
      duplicate: 'Duplicate', fmtType: 'Format', decimals: 'Decimals', prefix: 'Prefix', suffix: 'Suffix',
      blankText: 'If blank', fmtNone: 'As-is', fmtNumber: 'Number (1,000)', fmtDate: 'Date',
      dateFmt: 'Date format', sampleText: 'Text', fieldNotSet: '(not set)',
      tooBig: 'Config exceeds the size limit. Reduce elements/templates.',
      ellipse: 'Ellipse', barcode: 'Barcode', qr: 'QR code', preview: 'Preview',
      dataSource: 'Data Source', appFields: 'App fields', systemVars: 'System',
      exprTitle: 'Expression editor', exprHint: 'Insert values with {fieldCode}. Mix freely with text. Double-click a field to insert.',
      showText: 'Show text', bindText: 'Text', noRecordSample: 'No records found; showing blank values',
      close: 'Close', previewLoading: 'Loading...',
      previewUsing: 'Showing data from record #{id}', missingCodes: 'Field codes not found in this app: ',
      fmtDialog: 'Format', fmtGeneral: 'General', fmtNum: 'Number', fmtCur: 'Currency',
      fmtDateCat: 'Date', fmtTime: 'Time', fmtPct: 'Percentage', fmtBool: 'Boolean', fmtCustom: 'Custom',
      sample: 'Sample', thousands: 'Thousands sep.', symbol: 'Symbol', symbolPos: 'Symbol position',
      before: 'Before', after: 'After', x100: 'Multiply by 100', trueText: 'True text', falseText: 'False text',
      customPtn: 'Pattern', customHint: 'Number: #,##0.00 / Date: YYYY-MM-DD etc.',
      fillRows: 'Fill empty rows', embed: 'Embedded', dblclickImg: 'Double-click to choose an image file',
      imgTooBig: 'Image too large. Please use a smaller image.',
      exportTpl: 'Export', importTpl: 'Import', importFail: 'Failed to import template',
      cfgUsage: 'Config usage', cfgOver: 'Exceeds kintone plugin config limit (256KB total).\nCurrent: {cur}KB / budget: {max}KB\n\nBreakdown (top):\n{detail}\n\n- Remove or shrink embedded images\n- Large logos can also use URL binding or a FILE field',
      imgRecompressed: 'Images were automatically re-compressed', saving: 'Saving...',
      moveUp: 'Up', moveDown: 'Down', renameHint: 'Double-click to rename',
      footers: 'Footer rows (totals etc.)', addFooter: 'Add footer row', minRows: 'Min rows',
      groups: 'Grouping', addGroup: 'Add group level', groupField: 'Group by field',
      groupNote: 'Groups form on consecutive equal values (source order preserved - no auto sort). With "New page per group", use {GROUP.code} {GSUM.code} {GCOUNT} in free element expressions',
      gHeaderRow: 'Show header row', gHeaderExpr: 'Header expression', gRowH: 'Row height (mm)',
      gRepeatColHeader: 'Repeat column header', gFooterRow: 'Show footer row (totals)',
      gAggs: 'Column aggregates', aggNone: '—', aggSum: 'Sum', aggCount: 'Count', aggAvg: 'Avg',
      gNewPage: 'New page per group', gKeepTogether: 'Keep group together (if possible)',
      gRepeatOnBreak: 'Repeat header after page break', gLevel: 'Level',
      recordsSource: '★ View records (all)',
      recordsNote: 'Rows = records of the list view (uses the view filter & sort; print from the list view). {RCOUNT} = record count, {TSUM.code} = sum over all records',
      previewRecords: 'Showing {n} records',
      aggRcount: 'Count (RCOUNT)',
      groupDialog: 'Grouping & sort', groupBtn: 'Grouping…', groupNone: 'None',
      rowSort: 'Detail row sort', addSortKey: 'Add sort key',
      sortNote: 'When unset, source order is preserved (view / subtable order)',
      sortAsc: 'Ascending', sortDesc: 'Descending', sortNone: 'None (source order)',
      gKeys: 'Group key', addKeyField: 'Add key field',
      gKeysNote: 'Multiple keys = composite group (e.g. Material + Thickness as ONE group). Add another level to nest',
      gSort: 'Sort', aggSrc: 'Source', showTableHeader: 'Show header row',
      colBind: 'Bind', colBindField: 'Field', colBindExpr: 'Expression',
      exprBtn: 'Expr…', levels: 'Group levels', gOptions: 'Options',
      tplGroups: 'Print groups', tplGroupsBtn: '📑 Print groups…', addTplGroup: 'Add print group',
      tplGroupName: 'Group name', tplGroupMembers: 'Templates',
      tplGroupsNote: 'Selected templates print as ONE combined job (in template-list order). Paper settings come from the first member. Groups appear in the print menu with 📑',
      tplGroupEmpty: 'Select at least 2 templates',
      searchPh: 'search...',
      elKind: 'Kind', textEl: 'Text', fieldEl: 'Field',
      pad: 'Padding (mm)', placeHint: 'Click on the page to place (Esc to cancel)',
      cellPad: 'Cell padding (mm)',
      dupTpl: 'Duplicate template', copySuffix: ' (copy)',
      conds: 'Conditional format', addCond: 'Add condition', condValue: 'Value', condHide: 'Hide',
      opEq: 'equals', opNe: 'not equals', opContains: 'contains', opGt: 'greater than',
      opGte: '>= (at least)', opLt: 'less than', opLte: '<= (at most)', opEmpty: 'is empty', opNotempty: 'is not empty',
      condN: 'Condition', condIf: 'Field', condStyle: 'Style', condSample: 'Sample',
      outputUnit: 'Output unit', unitRecord: 'Per record', unitRow: 'Per subtable row (labels)',
      rowSubtable: 'Target subtable', customSize: 'Custom', paperW: 'Width (mm)', paperH: 'Height (mm)',
      previewCapped: '(showing first {n} pages; print outputs all)',
      showInList: 'Show on list view',
      pdfSection: 'Save as PDF', pdfField: 'PDF attachment field', pdfFileName: 'File name',
      pdfMode: 'Save mode', pdfAppend: 'Append', pdfReplace: 'Replace',
      pdfFileNameHint: 'e.g. Quote_{Invoice_No}  ({fieldCode} tokens allowed)', exprClear: 'Clear',
      printVia: 'Print method', viaBrowser: 'Browser print', viaPdf: 'Via PDF (keeps paper size)',
      sheetSection: 'Sheet layout (N-up)', sheetEnabled: 'Impose on sheet', sheetPaper: 'Sheet paper',
      sheetMarginT: 'Margin top/bottom (mm)', sheetMarginL: 'Margin left/right (mm)', sheetGapX: 'Gap X (mm)', sheetGapY: 'Gap Y (mm)',
      sheetStart: 'Start position', sheetCount: 'Labels/sheet',
      sheetCutlines: 'Show cut lines', sheetDivide: 'Divide evenly', sheetDivideApply: 'Apply',
      sheetDivideDone: 'Label size set to {w} x {h} mm ({c} cols x {r} rows)',
      autoFit: 'Shrink to fit', multiSel: '{n} selected - edits apply to all',
      borderW: 'Border (mm)', borderColor: 'Border color', textStyle: 'Style',
      paginate: 'Paginate (multi-page)', contTop: 'Continuation top (mm)', contBottom: 'Bottom margin (mm)',
      repeatAllPages: 'Show on all pages', pageVar: 'Page number', pagesVar: 'Total pages',
      previewPage: 'Page',
      footerNote: 'Record fields rendered right after the last table row',
      symbology: 'Type', ctxCopy: 'Copy', ctxCut: 'Cut', ctxPaste: 'Paste',
      bringFront: 'Bring to front', forward: 'Bring forward', backward: 'Send backward', sendBack: 'Send to back'
    }
  };
  function t(k) { return (I18N[LANG] && I18N[LANG][k]) || I18N.en[k] || k; }

  /* ---------------- constants ---------------- */
  var PX_PER_MM = 96 / 25.4;
  var PAPER_PRESETS = {
    A3: [297, 420], A4: [210, 297], A5: [148, 210],
    B4: [257, 364], B5: [182, 257], Letter: [215.9, 279.4]
  };
  var FONT_FAMILIES = ['Noto Sans JP', 'Yu Gothic', 'Meiryo', 'MS Gothic', 'MS Mincho', 'sans-serif', 'serif', 'monospace'];
  var STD_COLORS = ['#000000', '#404040', '#808080', '#bfbfbf', '#ffffff',
    '#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050',
    '#00b050', '#00b0f0', '#0070c0', '#002060', '#7030a0',
    '#e67e22', '#ffb6c1', '#8b4513'];
  function ensureColorPalette() {
    if (document.getElementById('rpt-std-colors')) return;
    var dl = document.createElement('datalist');
    dl.id = 'rpt-std-colors';
    STD_COLORS.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c;
      dl.appendChild(o);
    });
    document.body.appendChild(dl);
  }
  var DATE_FORMATS = ['YYYY/MM/DD', 'YYYY-MM-DD', 'YYYY年M月D日', '和暦(令和n年M月D日)', 'M/D', 'YYYY/MM/DD HH:mm'];
  var CONFIG_LIMIT = 60000; // per-key safety below Kintone 65535

  /* ---------------- state ---------------- */
  var state = {
    templates: [],
    buttonLabel: '',
    selectedTemplateId: null,
    selectedElementId: null,
    fields: [],          // flattened field defs
    subtables: [],       // { code,label,fields:[...] }
    zoom: 1,
    dirty: false,
    collapsed: {},
    images: {},
    clipboard: null,
    pendingAdd: null,
    multiIds: [],
    undoStack: [], redoStack: []
  };

  var els = {};

  /* ---------------- utils ---------------- */
  function $(id) { return document.getElementById(id); }
  function uuid() {
    return 'e' + Math.random().toString(16).slice(2, 8) + Date.now().toString(36);
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function round1(v) { return Math.round(v * 10) / 10; }
  function setStatus(m) { els.statusMsg.textContent = m || ''; }
  function markDirty() { state.dirty = true; setStatus(t('unsaved')); }
  function currentTpl() {
    return state.templates.find(function (x) { return x.id === state.selectedTemplateId; }) || null;
  }
  function currentEl() {
    var tpl = currentTpl(); if (!tpl) return null;
    return (tpl.elements || []).find(function (e) { return e.id === state.selectedElementId; }) || null;
  }
  function pxPerMm() { return PX_PER_MM * state.zoom; }

  /* ---------------- undo / redo ---------------- */
  function snapshot() { return JSON.stringify(state.templates); }
  function saveUndo() {
    state.undoStack.push(snapshot());
    if (state.undoStack.length > 60) state.undoStack.shift();
    state.redoStack = [];
  }
  function undo() {
    if (!state.undoStack.length) return;
    state.redoStack.push(snapshot());
    state.templates = JSON.parse(state.undoStack.pop());
    afterHistoryRestore();
  }
  function redo() {
    if (!state.redoStack.length) return;
    state.undoStack.push(snapshot());
    state.templates = JSON.parse(state.redoStack.pop());
    afterHistoryRestore();
  }
  function afterHistoryRestore() {
    if (!currentTpl()) state.selectedTemplateId = state.templates.length ? state.templates[0].id : null;
    if (!currentEl()) state.selectedElementId = null;
    markDirty();
    refreshTemplateList(); renderCanvas(); renderProps();
  }

  /* ---------------- field loading ---------------- */
  function loadFields() {
    var appId = kintone.app.getId();
    var fieldsP = kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', { app: appId });
    // form layout gives the order the fields appear on the kintone form
    var layoutP = kintone.api(kintone.api.url('/k/v1/preview/app/form/layout', true), 'GET', { app: appId })
      .catch(function () { return null; });
    return Promise.all([fieldsP, layoutP])
      .then(function (results) {
        var resp = results[0], layout = results[1];
        var flat = [], subs = [];
        Object.keys(resp.properties).forEach(function (code) {
          var p = resp.properties[code];
          if (p.type === 'SUBTABLE') {
            var sf = [];
            Object.keys(p.fields).forEach(function (c2) {
              var q = p.fields[c2];
              sf.push({ code: q.code, label: q.label || q.code, type: q.type });
            });
            subs.push({ code: p.code, label: p.label || p.code, fields: sf });
          } else if (['GROUP', 'REFERENCE_TABLE', 'SPACER', 'HR', 'LABEL'].indexOf(p.type) < 0) {
            flat.push({ code: p.code, label: p.label || p.code, type: p.type });
          }
        });
        // system fields
        flat.push({ code: '$id', label: LANG === 'ja' ? 'レコード番号' : 'Record ID', type: '__ID__' });

        // sort everything by form-layout position; unknown codes keep their place at the end
        var order = {};
        var n = 0;
        function walk(rows) {
          (rows || []).forEach(function (row) {
            if (row.type === 'GROUP') { order[row.code] = n++; walk(row.layout); return; }
            if (row.type === 'SUBTABLE') {
              order[row.code] = n++;
              (row.fields || []).forEach(function (f) { if (f.code) order[f.code] = n++; });
              return;
            }
            (row.fields || []).forEach(function (f) { if (f.code) order[f.code] = n++; });
          });
        }
        if (layout && layout.layout) walk(layout.layout);
        function pos(code) { return (code in order) ? order[code] : 100000 + n; }
        function byLayout(a, b) { return pos(a.code) - pos(b.code); }
        if (n > 0) {
          flat.sort(byLayout);
          subs.sort(byLayout);
          subs.forEach(function (st) { st.fields.sort(byLayout); });
        }
        state.fields = flat;
        state.subtables = subs;
      })
      .catch(function (e) {
        console.error('field load failed', e);
        state.fields = []; state.subtables = [];
      });
  }

  function treeGroup(id, title, itemsHtml, deep) {
    var col = !!state.collapsed[id];
    return '<div class="rpt-tree-group">' +
      '<div class="rpt-tree-head" data-group="' + esc(id) + '">' +
      '<span class="arrow">' + (col ? '▸' : '▾') + '</span>' + esc(title) + '</div>' +
      '<div class="rpt-tree-body' + (col ? ' collapsed' : '') + '">' + itemsHtml + '</div></div>';
  }
  function fieldItemHtml(f, subCode) {
    return '<div class="rpt-field-item" draggable="true" data-code="' + esc(f.code) + '"' +
      (subCode ? ' data-subcode="' + esc(subCode) + '"' : '') + ' title="' + esc(f.code) + '">' +
      esc(f.label) + '<span class="ftype">' + esc(f.type) + '</span></div>';
  }
  function renderFieldPalette() {
    var q = (els.fieldSearch.value || '').toLowerCase();
    function match(f) {
      return !q || f.label.toLowerCase().indexOf(q) >= 0 || f.code.toLowerCase().indexOf(q) >= 0;
    }
    var inner = '';
    // main app fields
    var flat = state.fields.filter(match);
    var flatHtml = '';
    flat.forEach(function (f) { flatHtml += fieldItemHtml(f, null); });
    inner += treeGroup('g_app', t('appFields'), flatHtml);
    // each subtable = its own node with its fields
    state.subtables.forEach(function (st) {
      var stHtml = '<div class="rpt-field-item" draggable="true" data-subtable="' + esc(st.code) + '">' +
        '▦ ' + esc(st.label) + '<span class="ftype">SUBTABLE</span></div>';
      st.fields.filter(match).forEach(function (f) { stHtml += fieldItemHtml(f, st.code); });
      inner += treeGroup('g_st_' + st.code, '▦ ' + st.label, stHtml);
    });
    els.fieldPalette.innerHTML = treeGroup('g_root', t('dataSource'), inner);

    els.fieldPalette.querySelectorAll('.rpt-tree-head').forEach(function (head) {
      head.addEventListener('click', function () {
        var id = head.getAttribute('data-group');
        state.collapsed[id] = !state.collapsed[id];
        renderFieldPalette();
      });
    });
    els.fieldPalette.querySelectorAll('.rpt-field-item').forEach(function (item) {
      item.addEventListener('dragstart', function (ev) {
        ev.dataTransfer.setData('text/plain', JSON.stringify({
          code: item.getAttribute('data-code') || '',
          subcode: item.getAttribute('data-subcode') || '',
          subtable: item.getAttribute('data-subtable') || ''
        }));
      });
    });
  }

  /* ---------------- template management ---------------- */
  function defaultTemplate() {
    return {
      id: uuid(), name: t('newTpl'),
      paper: { size: 'A4', orientation: 'portrait', wmm: 210, hmm: 297 },
      grid: { size: 1 },
      elements: []
    };
  }
  function paperDims(tpl) {
    var p = tpl.paper || {};
    var base = PAPER_PRESETS[p.size] || [p.wmm || 210, p.hmm || 297];
    var w = base[0], h = base[1];
    if (p.orientation === 'landscape') { var tmp = w; w = h; h = tmp; }
    return { w: w, h: h };
  }
  function addTemplate() {
    saveUndo();
    var tpl = defaultTemplate();
    state.templates.push(tpl);
    state.selectedTemplateId = tpl.id;
    state.selectedElementId = null;
    if (els.selGrid) els.selGrid.value = String(tpl.grid.size);
    markDirty(); refreshTemplateList(); renderCanvas(); renderProps();
  }
  // even-division intent persists: recompute label size whenever sheet params change
  function applyDivision(tpl) {
    var s = tpl.sheet;
    if (!s || !s.divCols || !s.divRows) return;
    var sp = RPTC.paperDims({ paper: { size: s.paper || 'A4', orientation: s.orientation || 'portrait', wmm: s.wmm, hmm: s.hmm } });
    var mL = Number(s.marginLeft); if (isNaN(mL)) mL = 10;
    var mT = Number(s.marginTop); if (isNaN(mT)) mT = 10;
    var gX = Number(s.gapX) || 0, gY = Number(s.gapY) || 0;
    var w = Math.floor((sp.w - mL * 2 - gX * (s.divCols - 1)) / s.divCols * 10) / 10;
    var h = Math.floor((sp.h - mT * 2 - gY * (s.divRows - 1)) / s.divRows * 10) / 10;
    if (w > 0 && h > 0) {
      tpl.paper.size = 'Custom';
      tpl.paper.wmm = w;
      tpl.paper.hmm = h;
    }
  }
  function duplicateTemplate(id) {
    var src = state.templates.find(function (x) { return x.id === id; });
    if (!src) return;
    saveUndo();
    var copy = JSON.parse(JSON.stringify(src));
    copy.id = uuid();
    copy.name = (src.name || '') + t('copySuffix');
    (copy.elements || []).forEach(function (e) { e.id = uuid(); });
    // embedded images are shared by id in state.images, so references stay valid
    var idx = state.templates.indexOf(src);
    state.templates.splice(idx + 1, 0, copy);
    state.selectedTemplateId = copy.id;
    state.selectedElementId = null;
    markDirty(); refreshTemplateList(); renderCanvas(); renderProps();
  }
  function deleteTemplate(id) {
    if (!confirm(t('confirmDelTpl'))) return;
    saveUndo();
    state.templates = state.templates.filter(function (x) { return x.id !== id; });
    if (state.selectedTemplateId === id) {
      state.selectedTemplateId = state.templates.length ? state.templates[0].id : null;
      state.selectedElementId = null;
    }
    markDirty(); refreshTemplateList(); renderCanvas(); renderProps();
  }
  function openTemplateGroupsDialog() {
    var work = JSON.parse(JSON.stringify(state.templateGroups || []));
    var m = modalShell('📑 ' + t('tplGroups'));
    m.box.style.width = '520px'; m.box.style.maxHeight = '85vh';
    var list = document.createElement('div');
    list.style.cssText = 'overflow-y:auto;flex:1;min-height:100px;padding:2px;';
    m.box.appendChild(list);
    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-plain" data-act="cancel">' + esc(t('cancel')) + '</button>' +
      '<button type="button" class="rpt-btn-primary" data-act="ok">OK</button>';
    m.box.appendChild(foot);

    function render() {
      var h = '<div class="rpt-grp-note">' + esc(t('tplGroupsNote')) + '</div>';
      work.forEach(function (g, i) {
        h += '<div class="rpt-grp-card"><div class="rpt-grp-body">';
        h += '<div class="rpt-grp-row"><label>' + esc(t('tplGroupName')) + '</label>' +
          '<input type="text" data-tgname="' + i + '" value="' + esc(g.name || '') + '" style="flex:1;">' +
          '<button type="button" class="rpt-btn-mini rpt-btn-danger" data-tgdel="' + i + '">✕ ' + esc(t('delete')) + '</button></div>';
        h += '<div class="rpt-grp-row" style="align-items:flex-start;"><label>' + esc(t('tplGroupMembers')) + '</label>' +
          '<div class="rpt-grp-opts" style="flex-direction:column;align-items:flex-start;gap:3px;">';
        state.templates.forEach(function (tp) {
          var on = (g.ids || []).indexOf(tp.id) >= 0;
          h += '<label><input type="checkbox" data-tgm="' + i + '" value="' + esc(tp.id) + '"' + (on ? ' checked' : '') + '>' + esc(tp.name) + '</label>';
        });
        h += '</div></div>';
        if ((g.ids || []).length < 2) {
          h += '<div style="font-size:10px;color:#c0392b;margin-left:90px;">' + esc(t('tplGroupEmpty')) + '</div>';
        }
        h += '</div></div>';
      });
      h += '<button type="button" class="rpt-btn-mini" data-tgadd="1">＋ ' + esc(t('addTplGroup')) + '</button>';
      list.innerHTML = h;
      wire();
    }
    function wire() {
      list.querySelectorAll('[data-tgadd]').forEach(function (n) {
        n.addEventListener('click', function () { work.push({ name: '', ids: [] }); render(); });
      });
      list.querySelectorAll('[data-tgdel]').forEach(function (n) {
        n.addEventListener('click', function () { work.splice(Number(n.getAttribute('data-tgdel')), 1); render(); });
      });
      list.querySelectorAll('[data-tgname]').forEach(function (n) {
        n.addEventListener('change', function () { work[Number(n.getAttribute('data-tgname'))].name = n.value; });
      });
      list.querySelectorAll('[data-tgm]').forEach(function (n) {
        n.addEventListener('change', function () {
          var g = work[Number(n.getAttribute('data-tgm'))];
          g.ids = g.ids || [];
          var id = n.value;
          if (n.checked) { if (g.ids.indexOf(id) < 0) g.ids.push(id); }
          else g.ids = g.ids.filter(function (x) { return x !== id; });
          // keep member order = template-list order (predictable print order)
          var order = {};
          state.templates.forEach(function (tp, k) { order[tp.id] = k; });
          g.ids.sort(function (a, b) { return (order[a] || 0) - (order[b] || 0); });
          render();
        });
      });
    }
    foot.querySelector('[data-act="cancel"]').addEventListener('click', m.close);
    foot.querySelector('[data-act="ok"]').addEventListener('click', function () {
      state.templateGroups = work
        .map(function (g) { return { name: (g.name || '').trim(), ids: g.ids || [] }; })
        .filter(function (g) { return g.name && g.ids.length >= 2; });
      markDirty(); refreshTemplateList();
      m.close();
    });
    render();
  }

  function refreshTemplateList() {
    var html = '';
    state.templates.forEach(function (tp) {
      html += '<div class="rpt-tpl-item' + (tp.id === state.selectedTemplateId ? ' active' : '') + '" data-id="' + esc(tp.id) + '" draggable="true">' +
        '<span class="name">' + esc(tp.name) + '</span>' +
        '<button type="button" class="rpt-tpl-dup" data-dup="' + esc(tp.id) + '" title="' + esc(t('dupTpl')) + '">⧉</button>' +
        '<button type="button" class="rpt-tpl-del" data-del="' + esc(tp.id) + '">✕</button></div>';
    });
    var ngroups = (state.templateGroups || []).length;
    html += '<div style="margin-top:6px;border-top:1px dashed #dfe5ec;padding-top:6px;">' +
      '<button type="button" class="rpt-btn-mini" id="btn-tpl-groups" style="width:100%;text-align:left;">' +
      esc(t('tplGroupsBtn')) + (ngroups ? ' (' + ngroups + ')' : '') + '</button>';
    (state.templateGroups || []).forEach(function (g) {
      html += '<div style="font-size:11px;color:#7a8694;padding:2px 4px;">📑 ' + esc(g.name) +
        ' <span style="color:#aab4c0;">(' + (g.ids || []).length + ')</span></div>';
    });
    html += '</div>';
    els.templateList.innerHTML = html || '<div style="color:#999;font-size:12px;">' + esc(t('noTpl')) + '</div>';
    var tgBtn = $('btn-tpl-groups');
    if (tgBtn) tgBtn.addEventListener('click', function (ev) { ev.stopPropagation(); openTemplateGroupsDialog(); });
    els.templateList.querySelectorAll('.rpt-tpl-item').forEach(function (n) {
      n.title = t('renameHint');
      n.addEventListener('click', function (ev) {
        if (ev.target.getAttribute('data-del') || ev.target.getAttribute('data-dup')) return;
        if (ev.target.tagName === 'INPUT') return;
        state.selectedTemplateId = n.getAttribute('data-id');
        state.selectedElementId = null;
        refreshTemplateList(); renderCanvas(); renderProps();
      });
      var nameEl = n.querySelector('.name');
      nameEl.addEventListener('dblclick', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        var tpl = state.templates.find(function (x) { return x.id === n.getAttribute('data-id'); });
        if (!tpl) return;
        var input = document.createElement('input');
        input.type = 'text';
        input.value = tpl.name;
        nameEl.innerHTML = '';
        nameEl.appendChild(input);
        input.focus(); input.select();
        var done = false;
        function commit(cancel) {
          if (done) return; done = true;
          var v = input.value.trim();
          if (!cancel && v && v !== tpl.name) {
            saveUndo();
            tpl.name = v;
            markDirty();
          }
          refreshTemplateList(); renderProps();
        }
        input.addEventListener('blur', function () { commit(false); });
        input.addEventListener('keydown', function (ke) {
          if (ke.key === 'Enter') commit(false);
          if (ke.key === 'Escape') commit(true);
        });
      });
    });
    // drag & drop reorder
    var dragTplIdx = -1;
    var items = Array.prototype.slice.call(els.templateList.querySelectorAll('.rpt-tpl-item'));
    items.forEach(function (item, idx) {
      item.addEventListener('dragstart', function (ev) {
        dragTplIdx = idx;
        item.classList.add('dragging');
        if (ev.dataTransfer) { ev.dataTransfer.effectAllowed = 'move'; try { ev.dataTransfer.setData('text/plain', String(idx)); } catch (e) { } }
      });
      item.addEventListener('dragend', function () {
        dragTplIdx = -1;
        items.forEach(function (i2) { i2.classList.remove('dragging', 'drop-above', 'drop-below'); });
      });
      item.addEventListener('dragover', function (ev) {
        if (dragTplIdx < 0 || idx === dragTplIdx) return;
        ev.preventDefault();
        if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
        items.forEach(function (i2) { i2.classList.remove('drop-above', 'drop-below'); });
        item.classList.add(idx < dragTplIdx ? 'drop-above' : 'drop-below');
      });
      item.addEventListener('drop', function (ev) {
        ev.preventDefault();
        if (dragTplIdx < 0 || idx === dragTplIdx) return;
        saveUndo();
        var moved = state.templates.splice(dragTplIdx, 1)[0];
        state.templates.splice(idx, 0, moved);
        dragTplIdx = -1;
        markDirty(); refreshTemplateList();
      });
    });
    els.templateList.querySelectorAll('.rpt-tpl-dup').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        duplicateTemplate(b.getAttribute('data-dup'));
      });
    });
    els.templateList.querySelectorAll('.rpt-tpl-del').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        deleteTemplate(b.getAttribute('data-del'));
      });
    });
  }

  /* ---------------- element factory ---------------- */
  function baseGeom(type) {
    switch (type) {
      case 'text': return { x: 20, y: 20, w: 60, h: 10 };
      case 'field': return { x: 20, y: 35, w: 60, h: 10 };
      case 'rect': return { x: 20, y: 20, w: 60, h: 30 };
      case 'line': return { x: 20, y: 20, w: 80, h: 0.5 };
      case 'image': return { x: 20, y: 20, w: 40, h: 30 };
      case 'table': return { x: 15, y: 60, w: 180, h: 80 };
      case 'ellipse': return { x: 20, y: 20, w: 40, h: 40 };
      case 'barcode': return { x: 20, y: 20, w: 55, h: 15 };
      case 'qr': return { x: 20, y: 20, w: 25, h: 25 };
    }
    return { x: 20, y: 20, w: 40, h: 10 };
  }
  var lastTextStyle = { fontFamily: 'Noto Sans JP', fontSize: 11 };
  // snug box height for a font size: 1pt = 0.3528mm, tight 1.3 line-height
  function snugH(pt) { return round1(pt * 0.3528 * 1.3 + 0.3); }
  function newElement(type, extra) {
    var g = baseGeom(type);
    var el = {
      id: uuid(), type: type,
      x: g.x, y: g.y, w: g.w, h: g.h
    };
    if (type === 'text') {
      Object.assign(el, { text: t('sampleText'), fontFamily: lastTextStyle.fontFamily, fontSize: lastTextStyle.fontSize, bold: false, italic: false, underline: false, strike: false, align: 'left', valign: 'middle', color: '#000000', bg: '', borderW: 0, borderColor: '#000000' });
    } else if (type === 'field') {
      Object.assign(el, { fieldCode: '', fontFamily: lastTextStyle.fontFamily, fontSize: lastTextStyle.fontSize, bold: false, italic: false, underline: false, strike: false, align: 'left', valign: 'middle', color: '#000000', bg: '', borderW: 0, borderColor: '#000000', format: 'none', decimals: 0, prefix: '', suffix: '', blankText: '', dateFmt: 'YYYY/MM/DD' });
    } else if (type === 'rect' || type === 'ellipse') {
      Object.assign(el, { strokeColor: '#000000', strokeWidth: 0.3, fill: '', radius: 0 });
    } else if (type === 'line') {
      Object.assign(el, { strokeColor: '#000000', strokeWidth: 0.3, dir: 'horizontal' });
    } else if (type === 'image') {
      Object.assign(el, { bindType: 'field', fieldCode: '', url: '', fit: 'contain' });
    } else if (type === 'barcode') {
      Object.assign(el, { bindType: 'field', fieldCode: '', text: '', showText: true, fontSize: 8, symbology: 'CODE128' });
    } else if (type === 'qr') {
      Object.assign(el, { bindType: 'field', fieldCode: '', text: '' });
    } else if (type === 'table') {
      Object.assign(el, {
        subtableCode: '', columns: [], headerH: 8, rowH: 7,
        fontFamily: 'Noto Sans JP', fontSize: 9, headerBg: '#f0f0f0',
        strokeColor: '#000000', strokeWidth: 0.2
      });
    }
    if (extra) Object.assign(el, extra);
    if (el.type === 'text' || el.type === 'field') {
      el.h = snugH(el.fontSize || 11); // default height hugs the text
    }
    return el;
  }
  // click-to-place: toolbar arms a type; the next click on the page drops it there
  function armAdd(type, btnId) {
    if (state.pendingAdd && state.pendingAdd.type === type) { cancelAdd(); return; } // toggle off
    cancelAdd();
    state.pendingAdd = { type: type, btnId: btnId };
    if (els.paper) els.paper.style.cursor = 'crosshair';
    var b = $(btnId); if (b) b.classList.add('rpt-tool-armed');
    setStatus('＋ ' + t(type === 'text' ? 'textEl' : type) + ' - ' + t('placeHint'));
  }
  function cancelAdd() {
    if (!state.pendingAdd) return;
    var b = $(state.pendingAdd.btnId); if (b) b.classList.remove('rpt-tool-armed');
    state.pendingAdd = null;
    if (els.paper) els.paper.style.cursor = '';
    setStatus('');
  }
  function addElement(type, extra) {
    var tpl = currentTpl();
    if (!tpl) { alert(t('noTpl')); return; }
    saveUndo();
    var el = newElement(type, extra);
    tpl.elements.push(el);
    state.selectedElementId = el.id;
    markDirty(); renderCanvas(); renderProps();
  }
  function selectionIds() {
    if (state.multiIds.length > 1) return state.multiIds.slice();
    return state.selectedElementId ? [state.selectedElementId] : [];
  }
  function selectionEls() {
    var tpl = currentTpl(); if (!tpl) return [];
    var ids = selectionIds();
    return tpl.elements.filter(function (e) { return ids.indexOf(e.id) >= 0; });
  }
  function deleteSelection() {
    var tpl = currentTpl(); if (!tpl) return;
    var ids = selectionIds(); if (!ids.length) return;
    saveUndo();
    tpl.elements = tpl.elements.filter(function (e) { return ids.indexOf(e.id) < 0; });
    state.selectedElementId = null; state.multiIds = [];
    markDirty(); renderCanvas(); renderProps();
  }
  function deleteElement(id) {
    if (state.multiIds.length > 1 && state.multiIds.indexOf(id) >= 0) { deleteSelection(); return; }
    var tpl = currentTpl(); if (!tpl) return;
    saveUndo();
    tpl.elements = tpl.elements.filter(function (e) { return e.id !== id; });
    if (state.selectedElementId === id) state.selectedElementId = null;
    markDirty(); renderCanvas(); renderProps();
  }
  function duplicateElement(id) {
    var tpl = currentTpl(); if (!tpl) return;
    var src = tpl.elements.find(function (e) { return e.id === id; });
    if (!src) return;
    saveUndo();
    var copy = JSON.parse(JSON.stringify(src));
    copy.id = uuid(); copy.x = round1(copy.x + 5); copy.y = round1(copy.y + 5);
    tpl.elements.push(copy);
    state.selectedElementId = copy.id;
    markDirty(); renderCanvas(); renderProps();
  }

  /* ---------------- canvas rendering ---------------- */
  function renderCanvas() {
    var tpl = currentTpl();
    var paper = els.paper, page = els.page;
    els.elements.innerHTML = '';
    els.guides.innerHTML = '';
    if (!tpl) {
      paper.style.width = '0px'; paper.style.height = '0px';
      els.grid.style.display = 'none';
      return;
    }
    var d = paperDims(tpl);
    // outer paper: pixel footprint for scroll layout; inner page: true mm, scaled
    paper.style.width = (d.w * pxPerMm()) + 'px';
    paper.style.height = (d.h * pxPerMm()) + 'px';
    page.style.width = d.w + 'mm';
    page.style.height = d.h + 'mm';
    page.style.transform = 'scale(' + state.zoom + ')';

    var g = (tpl.grid && tpl.grid.size) || 1;
    if (els.chkGrid.checked) {
      els.grid.style.display = 'block';
      els.grid.style.position = 'absolute';
      els.grid.style.inset = '0';
      els.grid.style.pointerEvents = 'none';
      els.grid.style.backgroundImage =
        'linear-gradient(to right, rgba(52,152,219,.16) 1px, transparent 1px),' +
        'linear-gradient(to bottom, rgba(52,152,219,.16) 1px, transparent 1px)';
      els.grid.style.backgroundSize = g + 'mm ' + g + 'mm';
    } else {
      els.grid.style.display = 'none';
    }

    var liveIds = {};
    (tpl.elements || []).forEach(function (e) { liveIds[e.id] = 1; });
    state.multiIds = (state.multiIds || []).filter(function (id) { return liveIds[id]; });
    if (!state.selectedElementId || state.multiIds.length === 1) state.multiIds = state.multiIds.length === 1 ? [] : state.multiIds;
    if (!state.selectedElementId) state.multiIds = [];
    (tpl.elements || []).forEach(function (el) {
      try {
        els.elements.appendChild(buildElNode(el));
      } catch (err) {
        console.error('[ReportDesigner] element render failed:', err, '\nelement data:', JSON.stringify(el));
        els.elements.appendChild(buildErrorNode(el, err));
      }
    });
    renderGroupBox(tpl);
    els.zoomLabel.textContent = Math.round(state.zoom * 100) + '%';
  }

  function fieldTypeOf(code, subCode) {
    if (subCode === '$RECORDS') subCode = null; // records-as-rows: row fields ARE record fields
    if (subCode) {
      var st = state.subtables.find(function (z) { return z.code === subCode; });
      var f0 = st && st.fields.find(function (f) { return f.code === code; });
      return f0 ? f0.type : '';
    }
    var f = state.fields.find(function (x) { return x.code === code; });
    return f ? f.type : '';
  }
  function defaultFmtFor(code, subCode) {
    var ty = fieldTypeOf(code, subCode);
    if (ty === 'NUMBER' || ty === 'CALC') return { type: 'number', decimals: 0, thousands: true };
    if (ty === 'DATE') return { type: 'date', dateFmt: 'YYYY/MM/DD' };
    if (ty === 'DATETIME' || ty === 'CREATED_TIME' || ty === 'UPDATED_TIME') return { type: 'date', dateFmt: 'YYYY/MM/DD HH:mm' };
    if (ty === 'TIME') return { type: 'time', timeFmt: 'HH:mm' };
    return { type: 'general' };
  }
  function defaultAlignFor(code, subCode) {
    var ty = fieldTypeOf(code, subCode);
    return (ty === 'NUMBER' || ty === 'CALC') ? 'right' : 'left';
  }
  function fieldLabel(code) {
    var f = state.fields.find(function (x) { return x.code === code; });
    if (f) return f.label;
    var found = null;
    state.subtables.forEach(function (st) {
      st.fields.forEach(function (x) { if (x.code === code) found = x.label; });
    });
    return found || code || t('fieldNotSet');
  }

  function textStyleCss(el) {
    // identical to RPTC.textCss so designer == print
    return RPTC.textCss(el);
  }

  function buildErrorNode(el, err) {
    var node = document.createElement('div');
    node.className = 'rpt-el' + ((el.id === state.selectedElementId || state.multiIds.indexOf(el.id) >= 0) ? ' selected' : '');
    node.setAttribute('data-id', el.id);
    node.style.left = (Number(el.x) || 0) + 'mm';
    node.style.top = (Number(el.y) || 0) + 'mm';
    node.style.width = Math.max(Number(el.w) || 20, 5) + 'mm';
    node.style.height = Math.max(Number(el.h) || 8, 5) + 'mm';
    var inner = document.createElement('div');
    inner.className = 'rpt-el-inner';
    inner.style.cssText = 'border:0.4mm solid #c0392b;background:#fdecea;color:#c0392b;' +
      'font-size:7pt;padding:1mm;align-items:flex-start;overflow:hidden;';
    inner.textContent = '⚠ ' + (el.type || '?') + ': ' + String(err && err.message || err);
    node.appendChild(inner);
    var tagEl = document.createElement('div');
    tagEl.className = 'rpt-el-tag';
    tagEl.style.background = '#c0392b';
    tagEl.textContent = '⚠ error';
    node.appendChild(tagEl);
    makeInteractive(node, el);
    return node;
  }
  function buildElNode(el) {
    var node = document.createElement('div');
    node.className = 'rpt-el' + ((el.id === state.selectedElementId || state.multiIds.indexOf(el.id) >= 0) ? ' selected' : '');
    node.setAttribute('data-id', el.id);
    node.style.left = el.x + 'mm';
    node.style.top = el.y + 'mm';
    node.style.width = Math.max(el.w, 0.5) + 'mm';
    node.style.height = Math.max(el.h, 0.5) + 'mm';

    var inner = document.createElement('div');
    inner.className = 'rpt-el-inner';
    var tag = el.type;

    if (el.type === 'text') {
      inner.style.cssText = textStyleCss(el) + RPTC.borderCss(el);
      inner.innerHTML = '<span style="white-space:pre-wrap;">' + esc(el.text || '') + '</span>';
      tag = t('text');
    } else if (el.type === 'field') {
      inner.style.cssText = textStyleCss(el) + RPTC.borderCss(el) + ((Number(el.borderW) > 0) ? '' : 'outline:1px dotted #8ab6e8;outline-offset:-1px;');
      inner.textContent = el.expr ? el.expr : '{' + fieldLabel(el.fieldCode) + '}';
      tag = t('field');
    } else if (el.type === 'rect' || el.type === 'ellipse') {
      inner.style.cssText = 'border:' + (el.strokeWidth || 0.3) + 'mm solid ' + el.strokeColor + ';' +
        (el.fill ? 'background:' + el.fill + ';' : '') +
        (el.type === 'ellipse' ? 'border-radius:50%;' :
          (el.radius ? 'border-radius:' + el.radius + 'mm;' : ''));
      tag = t(el.type);
    } else if (el.type === 'line') {
      var lw = (el.strokeWidth || 0.3);
      if (el.dir === 'vertical') {
        inner.style.cssText = 'display:block;';
        inner.innerHTML = '<div style="border-left:' + lw + 'mm solid ' + el.strokeColor + ';width:0;height:100%;margin:0 auto;"></div>';
      } else {
        inner.style.cssText = 'display:flex;align-items:center;';
        inner.innerHTML = '<div style="border-top:' + lw + 'mm solid ' + el.strokeColor + ';height:0;width:100%;"></div>';
      }
      tag = t('line');
    } else if (el.type === 'image') {
      if (el.bindType === 'embed' && el.imageId && state.images[el.imageId]) {
        var fitCss = el.fit === 'cover' ? 'cover' : el.fit === 'stretch' ? '100% 100%' : 'contain';
        inner.style.cssText = 'background-image:url(' + state.images[el.imageId] + ');' +
          'background-size:' + fitCss + ';background-position:center;background-repeat:no-repeat;';
      } else {
        inner.style.cssText = 'border:1px dashed #999;color:#999;font-size:8pt;align-items:center;justify-content:center;';
        inner.textContent = '🖼 ' + (el.bindType === 'url' ? (el.url || 'URL') : fieldLabel(el.fieldCode));
      }
      tag = t('image');
    } else if (el.type === 'barcode') {
      var sym = el.symbology || 'CODE128';
      var SAMPLES = { CODE128: 'SAMPLE123', EAN13: '4901234567894', EAN8: '49123456',
        CODE39: 'SAMPLE', ITF: '1234567890', ITF14: '00012345678905', codabar: 'A123456A', UPC: '042100005264' };
      var bSample = el.bindType === 'text' ? (el.text || SAMPLES[sym] || 'SAMPLE') : (SAMPLES[sym] || 'SAMPLE');
      var showTextB = el.showText !== false;
      inner.style.cssText = 'flex-direction:column;background:#fff;';
      inner.innerHTML = '<div class="rpt-bc-img" style="height:' + (showTextB ? '75%' : '100%') +
        ';width:100%;display:flex;align-items:center;justify-content:center;color:#bbb;font-size:8pt;">' + esc(sym) + '</div>' +
        (showTextB ? '<div style="height:25%;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:' +
          (el.fontSize || 8) + 'pt;color:#666;">' + esc(el.bindType === 'text' ? bSample : '{' + fieldLabel(el.fieldCode) + '}') + '</div>' : '');
      (function (target) {
        RPTC.barcodeDataURL(bSample, sym).then(function (bcSrc) {
          if (bcSrc && target && target.isConnected) {
            target.style.color = 'transparent';
            target.style.backgroundImage = 'url(' + bcSrc + ')';
            target.style.backgroundSize = '100% 100%';
            target.style.backgroundRepeat = 'no-repeat';
          }
        });
      })(inner.querySelector('.rpt-bc-img'));
      tag = t('barcode');
    } else if (el.type === 'qr') {
      var qSample = el.bindType === 'text' ? (el.text || 'SAMPLE') : ('{' + (el.fieldCode || 'QR') + '}');
      inner.style.cssText = 'align-items:center;justify-content:center;border:1px dashed #ccc;color:#999;font-size:8pt;';
      inner.textContent = '▩ ' + (el.bindType === 'text' ? (el.text || 'QR') : fieldLabel(el.fieldCode));
      (function (target, txt) {
        RPTC.qrDataURL(txt).then(function (qrSrc) {
          if (qrSrc && target && target.isConnected) {
            target.textContent = '';
            target.style.border = 'none';
            target.style.backgroundImage = 'url(' + qrSrc + ')';
            target.style.backgroundSize = 'contain';
            target.style.backgroundPosition = 'center';
            target.style.backgroundRepeat = 'no-repeat';
          }
        });
      })(inner, qSample);
      tag = t('qr');
    } else if (el.type === 'table') {
      inner.classList.add('rpt-el-table');
      inner.style.cssText = 'display:block;overflow:visible;font-family:' + (el.fontFamily || 'Noto Sans JP') + ',sans-serif;font-size:' + (el.fontSize || 9) + 'pt;';
      var cols = el.columns || [];
      if (cols.length) {
        var footers = el.footers || [];
        var bw = (el.strokeWidth || 0.2), bc = (el.strokeColor || '#000');
        var headerH = (el.headerH || 8), rowH = (el.rowH || 7);
        var basePad = (el.cellPad == null || el.cellPad === '') ? 1 : Number(el.cellPad) || 0;
        var cellBase = 'border:' + bw + 'mm solid ' + bc + ';padding:0 ' + basePad + 'mm;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;';
        function colPadC(c) { // per-column override, same rule as the print renderer
          return (c && c.pad != null && c.pad !== '') ? 'padding:0 ' + (Number(c.pad) || 0) + 'mm;' : '';
        }
        var totalW = cols.reduce(function (a, c) { return a + (Number(c.width) || 0); }, 0);
        var colgroup = '';
        var showHead = el.showHeader !== false;
        var thead = '<tr style="height:' + headerH + 'mm;background:' + (el.headerBg || '#f0f0f0') + ';">';
        cols.forEach(function (c) {
          colgroup += '<col style="width:' + c.width + 'mm;">';
          thead += '<th style="' + cellBase + colPadC(c) + 'text-align:' + (c.align || 'left') + ';font-weight:bold;">' +
            esc(c.label || (c.expr ? '(式)' : fieldLabel(c.fieldCode))) + '</th>';
        });
        thead += '</tr>';
        if (!showHead) thead = '';
        var groups = (el.groups || []).filter(function (g) { return groupKeyFieldsCfg(g).length; });
        var ghH = 0, gfH = 0;
        var ghRows = '', gfRows = '';
        groups.forEach(function (g, gi) {
          var hdr = g.header || {};
          if (hdr.show !== false) {
            var hh = Number(hdr.h) || rowH;
            ghH += hh;
            var kf = groupKeyFieldsCfg(g);
            ghRows += '<tr style="height:' + hh + 'mm;"><td colspan="' + cols.length + '" style="' + cellBase +
              'background:' + (hdr.bg || '#f5f5f5') + ';font-weight:bold;color:#b8860b;">▼ ' +
              esc(hdr.expr || kf.map(function (f) { return '{' + fieldLabel(f) + '}'; }).join(' × ')) + (g.newPage ? ' ⤓' : '') + '</td></tr>';
          }
          if (g.repeatColHeader) { ghH += headerH; ghRows += thead.replace(/<th /g, '<td ').replace(/<\/th>/g, '</td>'); }
          var ftr = g.footer || {};
          if (ftr.show) {
            var fh = Number(ftr.h) || rowH;
            gfH += fh;
            var aggN = Object.keys(ftr.aggs || {}).length;
            gfRows = '<tr style="height:' + fh + 'mm;"><td colspan="' + cols.length + '" style="' + cellBase +
              'background:' + (ftr.bg || '#fafafa') + ';font-weight:bold;color:#b8860b;text-align:right;">' +
              esc((ftr.label || '') + ' Σ×' + aggN) + '</td></tr>' + gfRows;
          }
        });
        var totalCap = Math.max(0, Math.floor((el.h - (showHead ? headerH : 0) - ghH - gfH) / rowH));
        var dataCap = Math.max(0, totalCap - footers.length);
        var padTo = el.fillRows ? dataCap : Math.min(dataCap, Math.max(3, Number(el.minRows) || 0));
        var showN = Math.min(dataCap, padTo);
        var rows = ghRows;
        for (var r = 0; r < showN; r++) {
          rows += '<tr style="height:' + rowH + 'mm;">';
          cols.forEach(function (c) {
            var ph = r < 3 ? (c.expr ? esc(c.expr) : '{' + esc(fieldLabel(c.fieldCode)) + '}') : '&nbsp;';
            rows += '<td style="' + cellBase + colPadC(c) + 'text-align:' + (c.align || 'left') + ';color:#aaa;">' + ph + '</td>';
          });
          rows += '</tr>';
        }
        rows += gfRows;
        footers.forEach(function (f) {
          var val = (f.bind === 'text') ? (f.text || '') : '{' + fieldLabel(f.fieldCode) + '}';
          var extra = (f.color ? 'color:' + f.color + ';' : '') + (f.bold ? 'font-weight:bold;' : '');
          rows += '<tr style="height:' + rowH + 'mm;">';
          if (cols.length > 1) {
            rows += '<td colspan="' + (cols.length - 1) + '" style="' + cellBase + extra + 'text-align:right;">' + esc(f.label || '') + '</td>';
            rows += '<td style="' + cellBase + extra + 'text-align:right;color:' + (f.color || '#aaa') + ';">' + esc(val) + '</td>';
          } else {
            rows += '<td style="' + cellBase + extra + 'text-align:right;">' + esc((f.label || '') + ' ' + val) + '</td>';
          }
          rows += '</tr>';
        });
        inner.innerHTML = '<table style="border-collapse:collapse;table-layout:fixed;width:' + totalW + 'mm;">' +
          '<colgroup>' + colgroup + '</colgroup>' + thead + rows + '</table>';
      } else {
        inner.innerHTML = '<div style="color:#999;font-size:8pt;padding:4px;">▦ ' + esc(t('subtable')) + ': ' + esc(el.subtableCode || t('fieldNotSet')) + '</div>';
      }
      tag = t('table') + (((el.groups || []).filter(function (g) { return groupKeyFieldsCfg(g).length; }).length) ? ' ▼G' : '');
    }

    node.appendChild(inner);

    var tagEl = document.createElement('div');
    tagEl.className = 'rpt-el-tag';
    tagEl.textContent = tag + ((el.conds && el.conds.length) ? ' ⚡' : '');
    node.appendChild(tagEl);

    if (el.id === state.selectedElementId && state.multiIds.length < 2) {
      ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(function (pos) {
        var h = document.createElement('div');
        h.className = 'rpt-handle ' + pos;
        h.setAttribute('data-handle', pos);
        node.appendChild(h);
      });
      if (el.type === 'table' && (el.columns || []).length) {
        var acc = 0;
        el.columns.forEach(function (c, i) {
          acc += Number(c.width) || 0;
          var ch = document.createElement('div');
          ch.className = 'rpt-colhandle';
          // centered ON the printed border line; grip zone = header row only (Excel-style)
          ch.style.left = 'calc(' + acc + 'mm - 4.5px)';
          ch.style.height = (el.headerH || 8) + 'mm';
          ch.title = (c.label || c.fieldCode) + ' : ' + c.width + 'mm';
          attachColResize(ch, el, i);
          node.appendChild(ch);
        });
        var ths = inner.querySelectorAll('th');
        ths.forEach(function (thEl, i) {
          if (el.columns[i]) attachColReorder(thEl, el, i, node);
        });
      }
    }

    makeInteractive(node, el);
    return node;
  }

  function colWidth(c) { return c ? (Number(c.width) || 0) : 0; }
  function syncTableW(el) {
    var sum = (el.columns || []).reduce(function (a, c) { return a + colWidth(c); }, 0);
    if (sum > 0) el.w = round1(sum);
  }
  function attachColResize(handle, el, colIdx) {
    handle.addEventListener('pointerdown', function (ev) {
      if (ev.button !== 0) return;
      ev.preventDefault(); ev.stopPropagation();
      var s = pxPerMm();
      var startX = ev.clientX;
      var col = el.columns[colIdx];
      var orig = Number(col.width) || 10;
      var undoSaved = false;
      var raf = null;
      function onMove(mv) {
        var dmm = (mv.clientX - startX) / s;
        if (!undoSaved && Math.abs(dmm) > 0.2) { saveUndo(); undoSaved = true; }
        col.width = Math.max(3, Math.round((orig + dmm) * 2) / 2); // 0.5mm steps
        syncTableW(el); // Excel-like: table grows/shrinks, other columns shift
        if (!raf) raf = requestAnimationFrame(function () { raf = null; renderCanvas(); });
      }
      function onUp() {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        if (undoSaved) { markDirty(); renderCanvas(); renderProps(); }
      }
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    });
  }
  function attachColReorder(th, el, idx, node) {
    th.addEventListener('pointerdown', function (ev) {
      if (ev.button !== 0) return;
      ev.preventDefault(); ev.stopPropagation();
      var s = pxPerMm();
      var startX = ev.clientX;
      var started = false;
      var indicator = null;
      var target = idx;
      function boundaryX(t) {
        var acc = 0;
        for (var i = 0; i < t; i++) acc += Number(el.columns[i].width) || 0;
        return acc * s;
      }
      function calcTarget(clientX) {
        var rect = node.getBoundingClientRect();
        var xmm = (clientX - rect.left) / s;
        var acc = 0;
        for (var i = 0; i < el.columns.length; i++) {
          var wcol = Number(el.columns[i].width) || 0;
          if (xmm < acc + wcol / 2) return i;
          acc += wcol;
        }
        return el.columns.length;
      }
      function onMove(mv) {
        if (!started && Math.abs(mv.clientX - startX) < 4) return;
        if (!started) {
          started = true;
          indicator = document.createElement('div');
          indicator.className = 'rpt-colinsert';
          node.appendChild(indicator);
          th.style.opacity = '0.4';
        }
        target = calcTarget(mv.clientX);
        indicator.style.left = (boundaryX(target) - 1) + 'px';
        indicator.style.display = 'block';
      }
      function onUp() {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        th.style.opacity = '';
        if (indicator && indicator.parentNode) indicator.parentNode.removeChild(indicator);
        if (!started) return;
        var from = idx, to = target;
        if (to > from) to--;
        if (to !== from) {
          saveUndo();
          var c = el.columns.splice(from, 1)[0];
          el.columns.splice(to, 0, c);
          markDirty(); renderCanvas(); renderProps();
        }
      }
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    });
  }

  /* ---------------- drag / resize / snap ---------------- */
  function snapVal(v, tpl) {
    if (!els.chkSnap.checked) return round1(v);
    var g = (tpl.grid && tpl.grid.size) || 1;
    return round1(Math.round(v / g) * g);
  }

  /* ---------------- neighbor (smart) snapping ----------------
   * While dragging/resizing, edges and centers magnetize to other elements'
   * edges/centers, and resize also magnetizes to EQUAL width/height of a
   * neighbor. Neighbor snap wins over grid snap within SMART_EPS. */
  var SMART_EPS = 1.0; // mm
  function snapEdges(tpl, excludeIds) {
    var xs = [], ys = [], ws = [], hs = [];
    (tpl.elements || []).forEach(function (o) {
      if (excludeIds.indexOf(o.id) >= 0) return;
      xs.push(o.x, o.x + o.w / 2, o.x + o.w);
      ys.push(o.y, o.y + o.h / 2, o.y + o.h);
      ws.push(o.w); hs.push(o.h);
    });
    return { xs: xs, ys: ys, ws: ws, hs: hs };
  }
  function nearest(val, arr) {
    var best = null;
    arr.forEach(function (a) {
      var d = Math.abs(a - val);
      if (d <= SMART_EPS && (best == null || d < Math.abs(best - val))) best = a;
    });
    return best;
  }
  // snap a position: tries the element's left/center/right (or top/middle/bottom)
  function smartSnapPos(raw, size, cands) {
    var offs = [0, size / 2, size];
    var bestX = null, bestD = null;
    offs.forEach(function (o) {
      var hit = nearest(raw + o, cands);
      if (hit != null) {
        var d = Math.abs(hit - (raw + o));
        if (bestD == null || d < bestD) { bestD = d; bestX = round1(hit - o); }
      }
    });
    return bestX; // null when nothing in range
  }


  function clearGuides() { els.guides.innerHTML = ''; }
  function showGuides(model, tpl) {
    clearGuides();
    var s = pxPerMm();
    var eps = 1; // mm
    var cand = (tpl.elements || []).filter(function (o) { return o.id !== model.id; });
    var vx = [model.x, model.x + model.w / 2, model.x + model.w];
    var hy = [model.y, model.y + model.h / 2, model.y + model.h];
    cand.forEach(function (o) {
      [o.x, o.x + o.w / 2, o.x + o.w].forEach(function (ox) {
        vx.forEach(function (mx) {
          if (Math.abs(ox - mx) < eps) {
            var g = document.createElement('div');
            g.className = 'rpt-guide-v'; g.style.left = ox + 'mm';
            els.guides.appendChild(g);
          }
        });
      });
      [o.y, o.y + o.h / 2, o.y + o.h].forEach(function (oy) {
        hy.forEach(function (my) {
          if (Math.abs(oy - my) < eps) {
            var g = document.createElement('div');
            g.className = 'rpt-guide-h'; g.style.top = oy + 'mm';
            els.guides.appendChild(g);
          }
        });
      });
    });
  }

  function makeInteractive(node, model) {
    if (model.type === 'text' || model.type === 'field') {
      node.addEventListener('dblclick', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        openExprEditor(model);
      });
    }
    if (model.type === 'image') {
      node.addEventListener('dblclick', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        pickImageFile(model);
      });
    }
    node.addEventListener('contextmenu', function (ev) {
      ev.preventDefault(); ev.stopPropagation();
      if (state.selectedElementId !== model.id) {
        state.selectedElementId = model.id;
        renderCanvas(); renderProps();
      }
      showCtxMenu(ev.clientX, ev.clientY, elementCtxItems(model));
    });
    node.addEventListener('pointerdown', function (ev) {
      if (ev.button !== 0) return;
      ev.preventDefault(); ev.stopPropagation();
      var tpl = currentTpl(); if (!tpl) return;

      // Ctrl/Cmd/Shift+click: toggle membership in the multi-selection
      if (ev.ctrlKey || ev.metaKey || ev.shiftKey) {
        if (!state.multiIds.length && state.selectedElementId) state.multiIds = [state.selectedElementId];
        var at = state.multiIds.indexOf(model.id);
        if (at >= 0) {
          state.multiIds.splice(at, 1);
          if (state.selectedElementId === model.id) {
            state.selectedElementId = state.multiIds[state.multiIds.length - 1] || null;
          }
        } else {
          state.multiIds.push(model.id);
          state.selectedElementId = model.id;
        }
        if (state.multiIds.length === 1) { state.selectedElementId = state.multiIds[0]; state.multiIds = []; }
        renderCanvas(); renderProps();
        return;
      }

      // plain click on a member of an active multi-selection: drag the group
      if (state.multiIds.length > 1 && state.multiIds.indexOf(model.id) >= 0) {
        if (state.selectedElementId !== model.id) {
          state.selectedElementId = model.id;
          renderCanvas(); renderProps();
          var freshG = els.elements.querySelector('[data-id="' + model.id + '"]');
          if (freshG) startDrag(freshG, model, ev, null);
          return;
        }
        startDrag(node, model, ev, null);
        return;
      }

      state.multiIds = [];
      if (state.selectedElementId !== model.id) {
        state.selectedElementId = model.id;
        renderCanvas(); renderProps();
        // re-grab the freshly rendered node and continue drag on it
        var fresh = els.elements.querySelector('[data-id="' + model.id + '"]');
        if (fresh) startDrag(fresh, model, ev, null);
        return;
      }
      var handle = ev.target.getAttribute && ev.target.getAttribute('data-handle');
      startDrag(node, model, ev, handle);
    });
  }

  function selectionBBox() {
    var sel = selectionEls();
    if (sel.length < 2) return null;
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    sel.forEach(function (e) {
      x0 = Math.min(x0, e.x); y0 = Math.min(y0, e.y);
      x1 = Math.max(x1, e.x + e.w); y1 = Math.max(y1, e.y + e.h);
    });
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }
  function renderGroupBox(tpl) {
    if (state.multiIds.length < 2) return;
    var bb = selectionBBox();
    if (!bb) return;
    var box = document.createElement('div');
    box.className = 'rpt-groupbox';
    box.style.left = bb.x + 'mm';
    box.style.top = bb.y + 'mm';
    box.style.width = bb.w + 'mm';
    box.style.height = bb.h + 'mm';
    ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach(function (pos) {
      var hd = document.createElement('div');
      hd.className = 'rpt-handle rpt-ghandle rpt-h-' + pos;
      hd.setAttribute('data-ghandle', pos);
      hd.addEventListener('pointerdown', function (ev) {
        if (ev.button !== 0) return;
        ev.preventDefault(); ev.stopPropagation();
        startGroupResize(tpl, ev, pos, bb, box);
      });
      box.appendChild(hd);
    });
    els.elements.appendChild(box);
  }
  // Scale every selected element proportionally within the selection bounding box.
  function startGroupResize(tpl, ev, handle, bb, boxNode) {
    var s = pxPerMm();
    var startX = ev.clientX, startY = ev.clientY;
    var origs = selectionEls().map(function (e) {
      return { m: e, x: e.x, y: e.y, w: e.w, h: e.h };
    });
    var undoSaved = false;
    function onMove(mv) {
      var dx = (mv.clientX - startX) / s;
      var dy = (mv.clientY - startY) / s;
      if (!undoSaved && (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3)) { saveUndo(); undoSaved = true; }
      if (!undoSaved) return;
      var nx = bb.x, ny = bb.y, nw = bb.w, nh = bb.h;
      if (handle.indexOf('e') >= 0) nw = bb.w + dx;
      if (handle.indexOf('s') >= 0) nh = bb.h + dy;
      if (handle.indexOf('w') >= 0) { nx = bb.x + dx; nw = bb.w - dx; }
      if (handle.indexOf('n') >= 0) { ny = bb.y + dy; nh = bb.h - dy; }
      nw = Math.max(nw, 2); nh = Math.max(nh, 2);
      nx = snapVal(Math.max(nx, 0), tpl); ny = snapVal(Math.max(ny, 0), tpl);
      var sx = nw / bb.w, sy = nh / bb.h;
      origs.forEach(function (o) {
        o.m.x = round1(nx + (o.x - bb.x) * sx);
        o.m.y = round1(ny + (o.y - bb.y) * sy);
        o.m.w = Math.max(round1(o.w * sx), 1);
        o.m.h = Math.max(round1(o.h * sy), 0.2);
        var n2 = els.elements.querySelector('[data-id="' + o.m.id + '"]');
        if (n2) updateNodeGeom(n2, o.m);
      });
      boxNode.style.left = nx + 'mm';
      boxNode.style.top = ny + 'mm';
      boxNode.style.width = (bb.w * sx) + 'mm';
      boxNode.style.height = (bb.h * sy) + 'mm';
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      if (undoSaved) { markDirty(); renderCanvas(); renderProps(); }
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }
  function startDrag(node, model, ev, handle) {
    var tpl = currentTpl(); if (!tpl) return;
    var s = pxPerMm();
    var startX = ev.clientX, startY = ev.clientY;
    var orig = { x: model.x, y: model.y, w: model.w, h: model.h };
    var moved = false;
    var undoSaved = false;
    var group = null;
    if (!handle && state.multiIds.length > 1 && state.multiIds.indexOf(model.id) >= 0) {
      group = [];
      state.multiIds.forEach(function (id) {
        if (id === model.id) return;
        var m = tpl.elements.find(function (e) { return e.id === id; });
        if (m) group.push({ m: m, x: m.x, y: m.y });
      });
    }

    function onMove(mv) {
      var dx = (mv.clientX - startX) / s;
      var dy = (mv.clientY - startY) / s;
      if (!moved && (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3)) moved = true;
      if (!moved) return;
      if (!undoSaved) { saveUndo(); undoSaved = true; }

      var d = paperDims(tpl);
      if (!handle) {
        var rawX = Math.min(Math.max(orig.x + dx, 0), d.w - model.w);
        var rawY = Math.min(Math.max(orig.y + dy, 0), d.h - model.h);
        var edges = els.chkSnap.checked ? snapEdges(tpl, group ? group.map(function (g) { return g.m.id; }) : [model.id]) : null;
        var sx = edges ? smartSnapPos(rawX, model.w, edges.xs) : null;
        var sy = edges ? smartSnapPos(rawY, model.h, edges.ys) : null;
        model.x = sx != null ? sx : snapVal(rawX, tpl);
        model.y = sy != null ? sy : snapVal(rawY, tpl);
        if (group) {
          // followers keep their relative offsets (primary's snapped delta applies to all)
          var gdx = model.x - orig.x, gdy = model.y - orig.y;
          group.forEach(function (g) {
            g.m.x = round1(Math.max(0, g.x + gdx));
            g.m.y = round1(Math.max(0, g.y + gdy));
            var n2 = els.elements.querySelector('[data-id="' + g.m.id + '"]');
            if (n2) updateNodeGeom(n2, g.m);
          });
        }
      } else {
        var x = orig.x, y = orig.y, w = orig.w, h = orig.h;
        if (handle.indexOf('e') >= 0) w = orig.w + dx;
        if (handle.indexOf('s') >= 0) h = orig.h + dy;
        if (handle.indexOf('w') >= 0) { x = orig.x + dx; w = orig.w - dx; }
        if (handle.indexOf('n') >= 0) { y = orig.y + dy; h = orig.h - dy; }
        if (w < 1) { w = 1; }
        if (h < 0.2) { h = 0.2; }
        var ed = els.chkSnap.checked ? snapEdges(tpl, [model.id]) : null;
        var hitX = false, hitY = false, hitW = false, hitH = false;
        if (ed) {
          // 1) the moving edge magnetizes to a neighbor edge
          if (handle.indexOf('e') >= 0) {
            var r = nearest(x + w, ed.xs); if (r != null) { w = r - x; hitW = true; }
          }
          if (handle.indexOf('w') >= 0) {
            var l = nearest(x, ed.xs); if (l != null) { w = (orig.x + orig.w) - l; x = l; hitX = hitW = true; }
          }
          if (handle.indexOf('s') >= 0) {
            var b = nearest(y + h, ed.ys); if (b != null) { h = b - y; hitH = true; }
          }
          if (handle.indexOf('n') >= 0) {
            var tp2 = nearest(y, ed.ys); if (tp2 != null) { h = (orig.y + orig.h) - tp2; y = tp2; hitY = hitH = true; }
          }
          // 2) equal-size magnet: match a neighbor's exact W/H (only if the edge didn't already stick)
          if (/[ew]/.test(handle) && !hitW) {
            var ew = nearest(w, ed.ws);
            if (ew != null) { if (handle.indexOf('w') >= 0) { x = (orig.x + orig.w) - ew; hitX = true; } w = ew; hitW = true; }
          }
          if (/[ns]/.test(handle) && !hitH) {
            var eh = nearest(h, ed.hs);
            if (eh != null) { if (handle.indexOf('n') >= 0) { y = (orig.y + orig.h) - eh; hitY = true; } h = eh; hitH = true; }
          }
        }
        model.x = hitX ? round1(Math.max(x, 0)) : snapVal(Math.max(x, 0), tpl);
        model.y = hitY ? round1(Math.max(y, 0)) : snapVal(Math.max(y, 0), tpl);
        model.w = hitW ? round1(w) : (els.chkSnap.checked ? (snapVal(w, tpl) || round1(w)) : round1(w));
        model.h = hitH ? round1(h) : (els.chkSnap.checked ? (snapVal(h, tpl) || round1(h)) : round1(h));
        if (model.h < 0.2) model.h = 0.2;
        if (model.w < 1) model.w = 1;
      }
      updateNodeGeom(node, model);
      showGuides(model, tpl);
      updateGeomInputs(model);
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      clearGuides();
      if (moved && model.type === 'table' && handle && /[ew]/.test(handle) &&
          model.columns && model.columns.length) {
        // resize absorbs into the edge column only (east -> last, west -> first);
        // all other column widths stay untouched
        var sum = model.columns.reduce(function (a, c) { return a + (Number(c.width) || 0); }, 0);
        var delta = model.w - sum;
        if (delta) {
          var tcol = model.columns[handle.indexOf('w') >= 0 ? 0 : model.columns.length - 1];
          tcol.width = Math.max(3, Math.round(((Number(tcol.width) || 0) + delta) * 2) / 2);
        }
        syncTableW(model); // table width snaps back to the true column sum
      }
      if (moved) { markDirty(); renderCanvas(); renderProps(); }
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }

  function updateNodeGeom(node, el) {
    node.style.left = el.x + 'mm';
    node.style.top = el.y + 'mm';
    node.style.width = Math.max(el.w, 0.5) + 'mm';
    node.style.height = Math.max(el.h, 0.5) + 'mm';
  }
  function updateGeomInputs(el) {
    ['x', 'y', 'w', 'h'].forEach(function (k) {
      var inp = document.querySelector('#props-body [data-prop="' + k + '"]');
      if (inp) inp.value = el[k];
    });
  }

  /* ---------------- properties panel ---------------- */
  function propRow(label, inputHtml) {
    return '<div class="rpt-prop-row"><label>' + esc(label) + '</label>' + inputHtml + '</div>';
  }
  function inp(el, key, type, attrs) {
    var v = el[key]; if (v == null) v = '';
    return '<input type="' + type + '" data-prop="' + key + '" value="' + esc(v) + '" ' + (attrs || '') + '>';
  }
  function chk(el, key) {
    return '<input type="checkbox" data-prop="' + key + '" ' + (el[key] ? 'checked' : '') + '>';
  }
  function sel(el, key, options) {
    var h = '<select data-prop="' + key + '">';
    options.forEach(function (o) {
      var val = typeof o === 'string' ? o : o.v;
      var lab = typeof o === 'string' ? o : o.l;
      h += '<option value="' + esc(val) + '"' + (String(el[key]) === String(val) ? ' selected' : '') + '>' + esc(lab) + '</option>';
    });
    return h + '</select>';
  }
  function colorInp(el, key) {
    var v = el[key] || '#000000';
    return '<input type="color" list="rpt-std-colors" data-prop="' + key + '" value="' + esc(v) + '" style="width:44px;padding:0;height:24px;">' +
      '<button type="button" class="rpt-btn-mini" data-clear="' + key + '">' + esc(t('none')) + '</button>';
  }
  function fieldSelOptions(includeSubtableOf) {
    var opts = [{ v: '', l: t('fieldNotSet') }];
    if (includeSubtableOf === '$RECORDS') {
      state.fields.forEach(function (f) { opts.push({ v: f.code, l: f.label }); });
      return opts;
    }
    if (includeSubtableOf) {
      var st = state.subtables.find(function (x) { return x.code === includeSubtableOf; });
      if (st) st.fields.forEach(function (f) { opts.push({ v: f.code, l: f.label }); });
    } else {
      state.fields.forEach(function (f) { opts.push({ v: f.code, l: f.label }); });
      // per-row output: the target subtable's fields bind like normal fields
      var tpl = currentTpl();
      if (tpl && tpl.outputUnit === 'row' && tpl.rowSubtable) {
        var rst = state.subtables.find(function (x) { return x.code === tpl.rowSubtable; });
        if (rst) rst.fields.forEach(function (f) { opts.push({ v: f.code, l: '▦ ' + f.label }); });
      }
    }
    return opts;
  }

  function renderProps() {
    var tpl = currentTpl();
    var el = currentEl();
    var body = els.propsBody;

    if (!tpl) { els.propsTitle.textContent = t('properties'); body.innerHTML = ''; return; }

    if (!el) {
      // paper + template props
      els.propsTitle.textContent = t('paper');
      var h = '';
      h += propRow(t('tplName'), '<input type="text" data-tprop="name" value="' + esc(tpl.name) + '">');
      h += propRow(t('paperSize'), (function () {
        var s = '<select data-tprop="paper.size">';
        Object.keys(PAPER_PRESETS).forEach(function (k) {
          s += '<option value="' + k + '"' + (tpl.paper.size === k ? ' selected' : '') + '>' + k + '</option>';
        });
        s += '<option value="Custom"' + (tpl.paper.size === 'Custom' ? ' selected' : '') + '>' + esc(t('customSize')) + '</option>';
        return s + '</select>';
      })());
      if (tpl.paper.size === 'Custom') {
        if (!tpl.paper.wmm) tpl.paper.wmm = 100;
        if (!tpl.paper.hmm) tpl.paper.hmm = 100;
        h += propRow(t('paperW'), '<input type="number" data-tprop="paper.wmm" min="10" step="1" value="' + esc(tpl.paper.wmm) + '">');
        h += propRow(t('paperH'), '<input type="number" data-tprop="paper.hmm" min="10" step="1" value="' + esc(tpl.paper.hmm) + '">');
      }
      h += propRow(t('orientation'), '<select data-tprop="paper.orientation">' +
        '<option value="portrait"' + (tpl.paper.orientation !== 'landscape' ? ' selected' : '') + '>' + esc(t('portrait')) + '</option>' +
        '<option value="landscape"' + (tpl.paper.orientation === 'landscape' ? ' selected' : '') + '>' + esc(t('landscape')) + '</option></select>');
      h += '<div class="rpt-prop-section">' + esc(t('outputUnit')) + '</div>';
      h += propRow(t('outputUnit'), '<select data-tprop="outputUnit">' +
        '<option value="record"' + (tpl.outputUnit !== 'row' ? ' selected' : '') + '>' + esc(t('unitRecord')) + '</option>' +
        '<option value="row"' + (tpl.outputUnit === 'row' ? ' selected' : '') + '>' + esc(t('unitRow')) + '</option></select>');
      if (tpl.outputUnit === 'row') {
        h += propRow(t('rowSubtable'), (function () {
          var s = '<select data-tprop="rowSubtable"><option value="">' + esc(t('fieldNotSet')) + '</option>';
          state.subtables.forEach(function (st) {
            s += '<option value="' + esc(st.code) + '"' + (tpl.rowSubtable === st.code ? ' selected' : '') + '>' + esc(st.label) + '</option>';
          });
          return s + '</select>';
        })());
      }
      h += '<div class="rpt-prop-section">' + esc(t('properties')) + '</div>';
      h += propRow(t('buttonLabel'), '<input type="text" id="inp-button-label" value="' + esc(state.buttonLabel) + '">');
      h += propRow(t('showInList'), '<input type="checkbox" data-tprop="showInList"' + (tpl.showInList !== false ? ' checked' : '') + '>');
      h += propRow(t('printVia'), '<select data-tprop="printVia">' +
        '<option value="browser"' + (tpl.printVia !== 'pdf' ? ' selected' : '') + '>' + esc(t('viaBrowser')) + '</option>' +
        '<option value="pdf"' + (tpl.printVia === 'pdf' ? ' selected' : '') + '>' + esc(t('viaPdf')) + '</option></select>');
      if (!tpl.sheet) tpl.sheet = { enabled: false, paper: 'A4', orientation: 'portrait', marginTop: 10, marginLeft: 10, gapX: 0, gapY: 0, startPos: 1 };
      h += '<div class="rpt-prop-section">' + esc(t('sheetSection')) + '</div>';
      h += propRow(t('sheetEnabled'), '<input type="checkbox" data-tprop="sheet.enabled"' + (tpl.sheet.enabled ? ' checked' : '') + '>');
      if (tpl.sheet.enabled) {
        h += propRow(t('sheetPaper'), (function () {
          var s = '<select data-tprop="sheet.paper">';
          Object.keys(PAPER_PRESETS).forEach(function (k) {
            s += '<option value="' + k + '"' + ((tpl.sheet.paper || 'A4') === k ? ' selected' : '') + '>' + k + '</option>';
          });
          s += '</select><select data-tprop="sheet.orientation">' +
            '<option value="portrait"' + (tpl.sheet.orientation !== 'landscape' ? ' selected' : '') + '>' + esc(t('portrait')) + '</option>' +
            '<option value="landscape"' + (tpl.sheet.orientation === 'landscape' ? ' selected' : '') + '>' + esc(t('landscape')) + '</option></select>';
          return s;
        })());
        h += propRow(t('sheetMarginT'), '<input type="number" data-tprop="sheet.marginTop" min="0" step="0.5" value="' + esc(tpl.sheet.marginTop) + '">');
        h += propRow(t('sheetMarginL'), '<input type="number" data-tprop="sheet.marginLeft" min="0" step="0.5" value="' + esc(tpl.sheet.marginLeft) + '">');
        h += propRow(t('sheetGapX'), '<input type="number" data-tprop="sheet.gapX" min="0" step="0.5" value="' + esc(tpl.sheet.gapX) + '">');
        h += propRow(t('sheetGapY'), '<input type="number" data-tprop="sheet.gapY" min="0" step="0.5" value="' + esc(tpl.sheet.gapY) + '">');
        h += propRow(t('sheetCutlines'), '<input type="checkbox" data-tprop="sheet.cutlines"' + (tpl.sheet.cutlines ? ' checked' : '') + '>');
        var lay = RPTC.sheetLayout(tpl);
        if (lay) {
          h += propRow(t('sheetStart'), '<input type="number" data-tprop="sheet.startPos" min="1" max="' + lay.perSheet + '" value="' + esc(tpl.sheet.startPos || 1) + '">');
          h += propRow(t('sheetCount'), '<span style="font-weight:bold;color:#3498db;">' + lay.cols + ' × ' + lay.rows + ' = ' + lay.perSheet + '</span>');
        }
        h += propRow(t('sheetDivide'),
          '<input type="number" id="inp-div-cols" min="1" max="10" value="' + esc(tpl.sheet.divCols || 2) + '" style="width:52px;" title="列">' +
          '<span style="color:#888;">×</span>' +
          '<input type="number" id="inp-div-rows" min="1" max="12" value="' + esc(tpl.sheet.divRows || 3) + '" style="width:52px;" title="行">' +
          '<button type="button" class="rpt-btn-mini" id="btn-div-apply">' + esc(t('sheetDivideApply')) + '</button>');
      }
      h += '<div class="rpt-prop-section">' + esc(t('pdfSection')) + '</div>';
      h += propRow(t('pdfField'), (function () {
        var s = '<select data-tprop="pdfField"><option value="">' + esc(t('fieldNotSet')) + '</option>';
        state.fields.filter(function (f) { return f.type === 'FILE'; }).forEach(function (f) {
          s += '<option value="' + esc(f.code) + '"' + (tpl.pdfField === f.code ? ' selected' : '') + '>' + esc(f.label) + '</option>';
        });
        return s + '</select>';
      })());
      if (tpl.pdfField) {
        h += propRow(t('pdfFileName'), '<input type="text" data-tprop="pdfFileName" value="' + esc(tpl.pdfFileName || '') + '" placeholder="' + esc(tpl.name + '_{$id}') + '" title="' + esc(t('pdfFileNameHint')) + '">' +
          '<button type="button" class="rpt-btn-mini" id="btn-pdf-fname" title="' + esc(t('exprTitle')) + '">…</button>');
        h += propRow(t('pdfMode'), '<select data-tprop="pdfMode">' +
          '<option value="append"' + (tpl.pdfMode !== 'replace' ? ' selected' : '') + '>' + esc(t('pdfAppend')) + '</option>' +
          '<option value="replace"' + (tpl.pdfMode === 'replace' ? ' selected' : '') + '>' + esc(t('pdfReplace')) + '</option></select>');
      }
      body.innerHTML = h;

      body.querySelectorAll('[data-tprop]').forEach(function (input) {
        input.addEventListener('change', function () {
          saveUndo();
          var path = input.getAttribute('data-tprop').split('.');
          var obj = tpl;
          for (var i = 0; i < path.length - 1; i++) obj = obj[path[i]];
          obj[path[path.length - 1]] = (input.type === 'checkbox') ? input.checked
            : (input.type === 'number') ? (Number(input.value) || 0) : input.value;
          if (path[0] === 'sheet' &&
              ['marginTop', 'marginLeft', 'gapX', 'gapY', 'paper', 'orientation'].indexOf(path[1]) >= 0) {
            applyDivision(tpl); // keep even division in sync
          }
          markDirty(); refreshTemplateList(); renderCanvas(); renderProps();
        });
      });
      var bl = $('inp-button-label');
      if (bl) bl.addEventListener('change', function () { state.buttonLabel = bl.value; markDirty(); });
      var da = $('btn-div-apply');
      if (da) da.addEventListener('click', function () {
        var c = Math.max(1, Number($('inp-div-cols').value) || 1);
        var r = Math.max(1, Number($('inp-div-rows').value) || 1);
        saveUndo();
        tpl.sheet.divCols = c;
        tpl.sheet.divRows = r;
        applyDivision(tpl);
        markDirty(); renderCanvas(); renderProps();
        alert(t('sheetDivideDone').replace('{w}', tpl.paper.wmm).replace('{h}', tpl.paper.hmm).replace('{c}', c).replace('{r}', r));
      });
      var pf = $('btn-pdf-fname');
      if (pf) pf.addEventListener('click', function () {
        openExprEditor({ __generic: true, initial: tpl.pdfFileName || (tpl.name + '_{$id}'),
          onOk: function (v) {
            saveUndo();
            tpl.pdfFileName = v.trim();
            markDirty(); renderProps();
          } });
      });
      return;
    }

    // ----- element props -----
    els.propsTitle.textContent = t(el.type) || el.type;
    var h2 = '';
    h2 += '<div class="rpt-prop-section">' + esc(t('posSize')) + '</div>';
    h2 += propRow('X (mm)', inp(el, 'x', 'number', 'step="0.1"'));
    h2 += propRow('Y (mm)', inp(el, 'y', 'number', 'step="0.1"'));
    h2 += propRow('W (mm)', inp(el, 'w', 'number', 'step="0.1"'));
    h2 += propRow('H (mm)', inp(el, 'h', 'number', 'step="0.1"'));

    if (el.type === 'text' || el.type === 'field') {
      h2 += '<div class="rpt-prop-section">' + esc(t('content')) + '</div>';
      h2 += propRow(t('elKind'), '<select id="el-kind-switch">' +
        '<option value="text"' + (el.type === 'text' ? ' selected' : '') + '>' + esc(t('textEl')) + '</option>' +
        '<option value="field"' + (el.type === 'field' ? ' selected' : '') + '>' + esc(t('fieldEl')) + '</option></select>');
      if (el.type === 'text') {
        h2 += propRow(t('text'), '<textarea data-prop="text" rows="2">' + esc(el.text) + '</textarea>');
      } else {
        h2 += propRow(t('bindField'), sel(el, 'fieldCode', fieldSelOptions()));
        h2 += '<div class="rpt-prop-section">' + esc(t('format')) + '</div>';
        h2 += propRow(t('fmtType'), '<button type="button" class="rpt-btn-mini" id="btn-el-fmt" style="flex:1;text-align:left;">' +
          esc(fmtSummary(RPTC.normalizeFmt(el))) + ' …</button>');
        h2 += propRow(t('prefix'), inp(el, 'prefix', 'text'));
        h2 += propRow(t('suffix'), inp(el, 'suffix', 'text'));
        h2 += propRow(t('blankText'), inp(el, 'blankText', 'text'));
      }
      h2 += '<div class="rpt-prop-section">' + esc(t('style')) + '</div>';
      h2 += propRow(t('fontFamily'), sel(el, 'fontFamily', FONT_FAMILIES));
      h2 += propRow(t('fontSize'), inp(el, 'fontSize', 'number', 'min="4" max="96" step="0.5"'));
      h2 += propRow(t('textStyle'),
        '<span class="rpt-stylebar">' +
        '<button type="button" class="rpt-style-btn' + (el.bold ? ' on' : '') + '" data-styletoggle="bold" title="' + esc(t('bold')) + '"><b>B</b></button>' +
        '<button type="button" class="rpt-style-btn' + (el.italic ? ' on' : '') + '" data-styletoggle="italic" title="' + esc(t('italic')) + '"><i>I</i></button>' +
        '<button type="button" class="rpt-style-btn' + (el.underline ? ' on' : '') + '" data-styletoggle="underline" title="U"><span style="text-decoration:underline;">U</span></button>' +
        '<button type="button" class="rpt-style-btn' + (el.strike ? ' on' : '') + '" data-styletoggle="strike" title="S"><span style="text-decoration:line-through;">abc</span></button>' +
        '</span>');
      h2 += propRow(t('align'), sel(el, 'align', [
        { v: 'left', l: t('left') }, { v: 'center', l: t('center') }, { v: 'right', l: t('right') }]));
      h2 += propRow(t('pad'), inp(el, 'pad', 'number', 'min="0" max="20" step="0.5"'));
      h2 += propRow(t('valign'), sel(el, 'valign', [
        { v: 'top', l: t('top') }, { v: 'middle', l: t('middle') }, { v: 'bottom', l: t('bottom') }]));
      h2 += propRow(t('autoFit'), chk(el, 'autoFit'));
      h2 += propRow(t('color'), colorInp(el, 'color'));
      h2 += propRow(t('bg'), colorInp(el, 'bg'));
      h2 += propRow(t('borderW'), inp(el, 'borderW', 'number', 'min="0" max="5" step="0.1"'));
      if (Number(el.borderW) > 0) h2 += propRow(t('borderColor'), colorInp(el, 'borderColor'));
    } else if (el.type === 'rect' || el.type === 'ellipse') {
      h2 += '<div class="rpt-prop-section">' + esc(t('style')) + '</div>';
      h2 += propRow(t('strokeColor'), colorInp(el, 'strokeColor'));
      h2 += propRow(t('strokeWidth'), inp(el, 'strokeWidth', 'number', 'min="0" step="0.1"'));
      h2 += propRow(t('fill'), colorInp(el, 'fill'));
      if (el.type === 'rect') h2 += propRow(t('radius'), inp(el, 'radius', 'number', 'min="0" step="0.5"'));
    } else if (el.type === 'barcode' || el.type === 'qr') {
      h2 += '<div class="rpt-prop-section">' + esc(t('content')) + '</div>';
      h2 += propRow(t('bindType'), sel(el, 'bindType', [
        { v: 'field', l: t('bindField') }, { v: 'text', l: t('bindText') }]));
      h2 += propRow(t('bindField'), sel(el, 'fieldCode', fieldSelOptions()));
      h2 += propRow(t('bindText'), inp(el, 'text', 'text'));
      if (el.type === 'barcode') {
        h2 += propRow(t('symbology'), sel(el, 'symbology', RPTC.BARCODE_FORMATS.map(function (f) { return { v: f.v, l: f.l }; })));
        h2 += propRow(t('showText'), chk(el, 'showText'));
        h2 += propRow(t('fontSize'), inp(el, 'fontSize', 'number', 'min="4" max="24" step="0.5"'));
      }
    } else if (el.type === 'line') {
      h2 += '<div class="rpt-prop-section">' + esc(t('style')) + '</div>';
      h2 += propRow(t('lineDir'), sel(el, 'dir', [
        { v: 'horizontal', l: t('horizontal') }, { v: 'vertical', l: t('vertical') }]));
      h2 += propRow(t('strokeColor'), colorInp(el, 'strokeColor'));
      h2 += propRow(t('strokeWidth'), inp(el, 'strokeWidth', 'number', 'min="0.1" step="0.1"'));
    } else if (el.type === 'image') {
      h2 += '<div class="rpt-prop-section">' + esc(t('content')) + '</div>';
      h2 += '<div style="font-size:11px;color:#3498db;margin:4px 0;">💡 ' + esc(t('dblclickImg')) + '</div>';
      h2 += propRow(t('bindType'), sel(el, 'bindType', [
        { v: 'field', l: t('bindField') }, { v: 'url', l: 'URL' }, { v: 'embed', l: t('embed') }]));
      h2 += propRow(t('bindField'), sel(el, 'fieldCode', fieldSelOptions()));
      h2 += propRow('URL', inp(el, 'url', 'text'));
      h2 += propRow(t('fit'), sel(el, 'fit', [
        { v: 'contain', l: t('contain') }, { v: 'cover', l: t('cover') }, { v: 'stretch', l: t('stretch') }]));
    } else if (el.type === 'table') {
      h2 += '<div class="rpt-prop-section">' + esc(t('content')) + '</div>';
      h2 += propRow(t('subtable'), (function () {
        var s = '<select data-prop="subtableCode"><option value="">' + esc(t('fieldNotSet')) + '</option>';
        s += '<option value="$RECORDS"' + (el.subtableCode === '$RECORDS' ? ' selected' : '') + '>' + esc(t('recordsSource')) + '</option>';
        state.subtables.forEach(function (st) {
          s += '<option value="' + esc(st.code) + '"' + (el.subtableCode === st.code ? ' selected' : '') + '>' + esc(st.label) + '</option>';
        });
        return s + '</select>';
      })());
      if (el.subtableCode === '$RECORDS') {
        h2 += '<div style="font-size:10px;color:#1d5c8c;background:#eaf3fc;border-radius:4px;padding:4px 6px;margin:2px 0 4px;">' + esc(t('recordsNote')) + '</div>';
      }
      h2 += propRow(t('cellPad'), inp(el, 'cellPad', 'number', 'min="0" max="10" step="0.5" placeholder="1"'));
      h2 += propRow(t('showTableHeader'),
        '<input type="checkbox" data-prop="showHeader"' + (el.showHeader !== false ? ' checked' : '') + '>');
      h2 += propRow(t('headerH'), inp(el, 'headerH', 'number', 'min="3" step="0.5"'));
      h2 += propRow(t('rowH'), inp(el, 'rowH', 'number', 'min="3" step="0.5"'));
      h2 += propRow(t('fontSize'), inp(el, 'fontSize', 'number', 'min="4" max="48" step="0.5"'));
      h2 += propRow(t('bg'), colorInp(el, 'headerBg'));
      h2 += propRow(t('fillRows'), chk(el, 'fillRows'));
      h2 += propRow(t('minRows'), inp(el, 'minRows', 'number', 'min="0" max="100"'));
      h2 += propRow(t('paginate'), chk(el, 'paginate'));
      if (el.paginate) {
        if (el.contTop == null) el.contTop = 15;
        if (el.contBottom == null) el.contBottom = 10;
        h2 += propRow(t('contTop'), inp(el, 'contTop', 'number', 'min="0" step="1"'));
        h2 += propRow(t('contBottom'), inp(el, 'contBottom', 'number', 'min="0" step="1"'));
      }
      h2 += '<div class="rpt-prop-section">' + esc(t('groups')) + '</div>';
      h2 += '<div class="rpt-prop-row"><button type="button" class="rpt-btn-mini" id="btn-group-dialog" style="flex:1;text-align:left;">' +
        esc(groupSummaryLabel(el)) + '</button></div>';
      h2 += '<div class="rpt-prop-section">' + esc(t('columns')) + '</div>';
      h2 += '<div id="col-list"></div>';
      h2 += '<button type="button" class="rpt-btn-mini" id="btn-add-col">＋ ' + esc(t('addColumn')) + '</button>';
      h2 += '<div class="rpt-prop-section">' + esc(t('footers')) + '</div>';
      h2 += '<div style="font-size:10px;color:#888;margin-bottom:4px;">' + esc(t('footerNote')) + '</div>';
      h2 += '<div id="footer-list"></div>';
      h2 += '<button type="button" class="rpt-btn-mini" id="btn-add-footer">＋ ' + esc(t('addFooter')) + '</button>';
    }

    if (state.multiIds.length > 1) {
      h2 = '<div class="rpt-prop-row" style="background:#eaf3fc;border-radius:4px;padding:5px 8px;color:#1d5c8c;font-size:11px;">⧉ ' +
        esc(t('multiSel').replace('{n}', state.multiIds.length)) + '</div>' + h2;
    }
    var anyPaginate = (tpl.elements || []).some(function (e) { return e.type === 'table' && e.paginate; });
    if (el.type !== 'table' || !el.paginate) {
      h2 += propRow(t('repeatAllPages'),
        '<input type="checkbox" data-prop="repeatAllPages"' + (el.repeatAllPages ? ' checked' : '') +
        (anyPaginate ? '' : ' disabled title="改ページするテーブルがある場合のみ有効"') + '>');
    }
    h2 += '<div class="rpt-prop-section">' + esc(t('conds')) + '</div>';
    h2 += '<div class="rpt-prop-row"><button type="button" class="rpt-btn-mini" id="btn-el-cond" style="flex:1;text-align:left;">' + esc(condBtnLabel(el)) + '</button></div>';
    h2 += '<div class="rpt-prop-section"></div>';
    h2 += '<div class="rpt-prop-row">' +
      '<button type="button" class="rpt-btn-mini" id="btn-el-dup">' + esc(t('duplicate')) + '</button>' +
      '<button type="button" class="rpt-btn-mini rpt-btn-danger" id="btn-el-del">' + esc(t('delete')) + '</button></div>';

    body.innerHTML = h2;

    // wire generic prop inputs
    body.querySelectorAll('[data-prop]').forEach(function (input) {
      var ev = (input.type === 'text' || input.tagName === 'TEXTAREA') ? 'change' : 'change';
      input.addEventListener(ev, function () {
        saveUndo();
        var key = input.getAttribute('data-prop');
        var val;
        if (input.type === 'checkbox') val = input.checked;
        else if (input.type === 'number') val = Number(input.value) || 0;
        else val = input.value;
        el[key] = val;
        if (key === 'subtableCode') el.columns = [];
        if (state.multiIds.length > 1 && state.multiIds.indexOf(el.id) >= 0) {
          selectionEls().forEach(function (other) {
            if (other === el || !(key in other)) return;
            other[key] = val;
            if (key === 'fontSize' && (other.type === 'text' || other.type === 'field')) {
              other.h = snugH(val);
            }
          });
        }
        if ((key === 'fontSize' || key === 'fontFamily') && (el.type === 'text' || el.type === 'field')) {
          lastTextStyle[key] = val; // new elements inherit the last-used font
        }
        if (key === 'fontSize' && (el.type === 'text' || el.type === 'field')) {
          el.h = snugH(val); // box height follows the font both ways
        }
        markDirty(); renderCanvas(); renderProps();
      });
    });
    body.querySelectorAll('[data-clear]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        saveUndo();
        el[btn.getAttribute('data-clear')] = '';
        markDirty(); renderCanvas(); renderProps();
      });
    });
    var kindSw = $('el-kind-switch');
    if (kindSw) kindSw.addEventListener('change', function () {
      if (kindSw.value === el.type) return;
      saveUndo();
      if (kindSw.value === 'field') {
        // text -> field: a single {code} token carries over as the binding
        var mTok = /^\s*\{([^{}]+)\}\s*$/.exec(el.text || '');
        el.type = 'field';
        el.fieldCode = (mTok && mTok[1]) || el.fieldCode || '';
        delete el.text;
      } else {
        // field -> text: keep showing the same value via an expression token
        el.type = 'text';
        el.text = el.expr || (el.fieldCode ? '{' + el.fieldCode + '}' : '');
      }
      markDirty(); renderCanvas(); renderProps();
    });
    var fmtBtn = $('btn-el-fmt');
    if (fmtBtn) fmtBtn.addEventListener('click', function () {
      openFormatDialog(RPTC.normalizeFmt(el), sampleFvFor(el.fieldCode, null), function (newFmt) {
        saveUndo();
        el.fmt = newFmt;
        el.format = ''; // clear legacy
        markDirty(); renderCanvas(); renderProps();
      });
    });
    document.querySelectorAll('#props-body [data-styletoggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        saveUndo();
        var key = btn.getAttribute('data-styletoggle');
        var val = !el[key];
        el[key] = val;
        if (state.multiIds.length > 1 && state.multiIds.indexOf(el.id) >= 0) {
          selectionEls().forEach(function (other) {
            if (other === el) return;
            if (other.type === 'text' || other.type === 'field') other[key] = val;
          });
        }
        markDirty(); renderCanvas(); renderProps();
      });
    });
    var condB = $('btn-el-cond');
    if (condB) condB.addEventListener('click', function () {
      openCondEditor(el, fieldSelOptions());
    });
    var dup = $('btn-el-dup'), del = $('btn-el-del');
    if (dup) dup.addEventListener('click', function () { duplicateElement(el.id); });
    if (del) del.addEventListener('click', function () {
      if (confirm(t('confirmDelEl'))) deleteElement(el.id);
    });

    if (el.type === 'table') {
      var gbtn = $('btn-group-dialog');
      if (gbtn) gbtn.addEventListener('click', function () { openGroupDialog(el); });
      renderColumnEditor(el); renderFooterEditor(el);
    }
  }

  function groupKeyFieldsCfg(g) {
    var a = (g && (g.fieldCodes || (g.fieldCode ? [g.fieldCode] : []))) || [];
    return a.filter(function (c) { return !!c; });
  }
  function groupSummaryLabel(el) {
    var gs = (el.groups || []).filter(function (g) { return groupKeyFieldsCfg(g).length; });
    if (!gs.length && !(el.rowSort || []).length) return t('groupBtn') + ' ' + t('groupNone');
    var parts = gs.map(function (g) {
      var s = groupKeyFieldsCfg(g).map(fieldLabel).join('＋');
      if (g.sort === 'asc') s += '↑'; else if (g.sort === 'desc') s += '↓';
      if (g.newPage) s += '⤓';
      return s;
    });
    var lbl = parts.join(' › ') || t('groupNone');
    if ((el.rowSort || []).length) lbl += ' ⇅';
    return t('groupBtn') + ' ' + lbl;
  }

  /* ---------------- grouping & sort dialog ---------------- */
  function openGroupDialog(el) {
    // work on a deep copy; commit on OK
    var work = {
      groups: JSON.parse(JSON.stringify(el.groups || [])),
      rowSort: JSON.parse(JSON.stringify(el.rowSort || []))
    };
    work.groups.forEach(function (g) {
      if (!g) return;
      if (!g.fieldCodes) g.fieldCodes = g.fieldCode ? [g.fieldCode] : [];
      delete g.fieldCode;
      g.header = g.header || { show: true, expr: '', h: el.rowH || 7, bg: '#f5f5f5' };
      g.footer = g.footer || { show: false, label: '', h: el.rowH || 7, aggs: {} };
      var aggs = g.footer.aggs || {};
      Object.keys(aggs).forEach(function (k) {
        if (typeof aggs[k] === 'string') aggs[k] = { fn: aggs[k], src: k };
      });
      g.footer.aggs = aggs;
      if (!g.sort) g.sort = 'none';
    });
    var expanded = work.groups.length ? 0 : -1;

    var m = modalShell('▼ ' + t('groupDialog'));
    m.box.style.width = '700px'; m.box.style.maxHeight = '88vh';
    var list = document.createElement('div');
    list.style.cssText = 'overflow-y:auto;flex:1;min-height:120px;padding:2px 4px 2px 2px;';
    m.box.appendChild(list);
    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-plain" data-act="cancel">' + esc(t('cancel')) + '</button>' +
      '<button type="button" class="rpt-btn-primary" data-act="ok">OK</button>';
    m.box.appendChild(foot);

    function fieldSel(cls, cur, style) {
      var s = '<select data-' + cls + (style ? ' style="' + style + '"' : '') + '>';
      fieldSelOptions(el.subtableCode).forEach(function (o) {
        s += '<option value="' + esc(o.v) + '"' + (cur === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
      });
      return s + '</select>';
    }
    function dirSel(cls, cur, withNone) {
      var opts = withNone
        ? [{ v: 'none', l: t('sortNone') }, { v: 'asc', l: '↑ ' + t('sortAsc') }, { v: 'desc', l: '↓ ' + t('sortDesc') }]
        : [{ v: 'asc', l: '↑ ' + t('sortAsc') }, { v: 'desc', l: '↓ ' + t('sortDesc') }];
      var s = '<select data-' + cls + '>';
      opts.forEach(function (o) {
        s += '<option value="' + o.v + '"' + ((cur || (withNone ? 'none' : 'asc')) === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
      });
      return s + '</select>';
    }
    function chk(cls, checked, label) {
      return '<label><input type="checkbox" data-' + cls + (checked ? ' checked' : '') + '>' + esc(label) + '</label>';
    }

    function render() {
      var h = '';
      // ===== group levels =====
      h += '<div class="rpt-grp-sec">' + esc(t('levels')) + '</div>';
      h += '<div class="rpt-grp-note">' + esc(t('gKeysNote')) + '</div>';
      work.groups.forEach(function (g, i) {
        var keys = groupKeyFieldsCfg(g);
        var open = (i === expanded);
        var sub = keys.map(fieldLabel).join('＋') || t('fieldNotSet');
        if (g.sort === 'asc') sub += ' ↑'; else if (g.sort === 'desc') sub += ' ↓';
        if (g.newPage) sub += ' ⤓';
        h += '<div class="rpt-grp-card">';
        h += '<div class="rpt-grp-head" data-toggle="' + i + '">' +
          '<span><span class="rpt-grp-title">' + (open ? '▾' : '▸') + ' ' + esc(t('gLevel')) + ' ' + (i + 1) + '</span>' +
          '<span class="rpt-grp-sub">' + esc(sub) + '</span></span>' +
          '<span>' +
          '<button type="button" class="rpt-btn-mini" data-gup="' + i + '"' + (i === 0 ? ' disabled' : '') + '>▲</button>' +
          '<button type="button" class="rpt-btn-mini" data-gdown="' + i + '"' + (i === work.groups.length - 1 ? ' disabled' : '') + '>▼</button>' +
          '<button type="button" class="rpt-btn-mini rpt-btn-danger" data-gdel="' + i + '">✕</button>' +
          '</span></div>';
        if (open) {
          h += '<div class="rpt-grp-body">';
          // key chips + per-level sort on ONE row
          h += '<div class="rpt-grp-row"><label>' + esc(t('gKeys')) + '</label>';
          g.fieldCodes.forEach(function (fc, ki) {
            h += '<span class="rpt-grp-chip">' + fieldSel('gkey="' + i + '-' + ki + '"', fc) +
              '<button type="button" data-gkeydel="' + i + '-' + ki + '" title="' + esc(t('delete')) + '">✕</button></span>';
          });
          h += '<button type="button" class="rpt-btn-mini" data-gkeyadd="' + i + '">＋</button>';
          h += '<span class="rpt-grp-inline">' + esc(t('gSort')) + '</span>' + dirSel('gsort="' + i + '"', g.sort, true);
          h += '</div>';
          // header row
          h += '<div class="rpt-grp-row"><label>' + esc(t('gHeaderRow')) + '</label>' +
            '<input type="checkbox" data-ghshow="' + i + '"' + (g.header.show !== false ? ' checked' : '') + '>';
          if (g.header.show !== false) {
            h += '<input type="text" data-ghexpr="' + i + '" value="' + esc(g.header.expr || '') + '" placeholder="' +
              esc(keys.map(function (k) { return '{' + k + '}'; }).join(' × ') || t('gHeaderExpr')) + '" style="flex:1;min-width:150px;">' +
              '<button type="button" class="rpt-btn-mini" data-ghexprbtn="' + i + '">' + esc(t('exprBtn')) + '</button>' +
              '<span class="rpt-grp-inline">' + esc(t('gRowH')) + '</span><input type="number" data-ghh="' + i + '" min="3" step="0.5" value="' + esc(g.header.h || el.rowH || 7) + '">' +
              '<input type="color" list="rpt-std-colors" data-ghbg="' + i + '" value="' + esc(g.header.bg || '#f5f5f5') + '" title="' + esc(t('bg')) + '" style="width:32px;padding:0;height:22px;">';
          }
          h += '</div>';
          if (g.header.show !== false) {
            h += '<div class="rpt-grp-row"><label></label><div class="rpt-grp-opts">' +
              chk('grch="' + i + '"', g.repeatColHeader, t('gRepeatColHeader')) + '</div></div>';
          }
          // footer row
          h += '<div class="rpt-grp-row"><label>' + esc(t('gFooterRow')) + '</label>' +
            '<input type="checkbox" data-gfshow="' + i + '"' + (g.footer.show ? ' checked' : '') + '>';
          if (g.footer.show) {
            h += '<span class="rpt-grp-inline">' + esc(t('label')) + '</span>' +
              '<input type="text" data-gflabel="' + i + '" value="' + esc(g.footer.label || '') + '" style="width:110px;">' +
              '<span class="rpt-grp-inline">' + esc(t('gRowH')) + '</span>' +
              '<input type="number" data-gfh="' + i + '" min="3" step="0.5" value="' + esc(g.footer.h || el.rowH || 7) + '">';
          }
          h += '</div>';
          if (g.footer.show) {
            h += '<div class="rpt-grp-aggs">';
            (el.columns || []).forEach(function (c, ci) {
              if (!c) return;
              var akey = c.fieldCode || ('#' + ci);
              var a = (g.footer.aggs || {})[akey] || {};
              var colName = c.label || (c.expr ? c.expr : fieldLabel(c.fieldCode));
              h += '<div class="cell"><span title="' + esc(colName) + '">' + esc(colName) + '</span>' +
                '<select data-gaggfn="' + i + '-' + ci + '" style="width:76px;">';
              [{ v: '', l: t('aggNone') }, { v: 'sum', l: t('aggSum') }, { v: 'count', l: t('aggCount') }, { v: 'avg', l: t('aggAvg') }].forEach(function (o) {
                h += '<option value="' + o.v + '"' + ((a.fn || '') === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
              });
              h += '</select>';
              if ((c.useExpr || c.expr) && a.fn && a.fn !== 'count') {
                h += fieldSel('gaggsrc="' + i + '-' + ci + '"', a.src || '', 'max-width:110px;');
              }
              h += '</div>';
            });
            h += '</div>';
          }
          // options
          h += '<div class="rpt-grp-row"><label>' + esc(t('gOptions')) + '</label><div class="rpt-grp-opts">' +
            chk('gnp="' + i + '"', g.newPage, t('gNewPage')) +
            chk('gkt="' + i + '"', g.keepTogether, t('gKeepTogether')) +
            chk('grob="' + i + '"', g.repeatOnBreak, t('gRepeatOnBreak')) +
            '</div></div>';
          h += '</div>';
        }
        h += '</div>';
      });
      h += '<button type="button" class="rpt-btn-mini" data-gadd="1">＋ ' + esc(t('addGroup')) + '</button>';

      // ===== detail row sort =====
      h += '<div class="rpt-grp-sec">' + esc(t('rowSort')) + '</div>';
      h += '<div class="rpt-grp-note">' + esc(t('sortNote')) + '</div>';
      work.rowSort.forEach(function (s, i) {
        h += '<div class="rpt-grp-row">' + fieldSel('rsfield="' + i + '"', s.fieldCode) + ' ' +
          dirSel('rsdir="' + i + '"', s.dir, false) +
          ' <button type="button" class="rpt-btn-mini rpt-btn-danger" data-rsdel="' + i + '">✕</button></div>';
      });
      h += '<button type="button" class="rpt-btn-mini" data-rsadd="1">＋ ' + esc(t('addSortKey')) + '</button>';

      list.innerHTML = h;
      wire();
    }

    function q(attr, fn) {
      list.querySelectorAll('[data-' + attr + ']').forEach(function (n) {
        fn(n, n.getAttribute('data-' + attr));
      });
    }
    function pair(v) { var p = v.split('-'); return [Number(p[0]), Number(p[1])]; }
    function wire() {
      q('toggle', function (n, v) {
        n.addEventListener('click', function (ev) {
          if (ev.target.tagName === 'BUTTON') return;
          expanded = (expanded === Number(v)) ? -1 : Number(v);
          render();
        });
      });
      q('rsadd', function (n) { n.addEventListener('click', function () { work.rowSort.push({ fieldCode: '', dir: 'asc' }); render(); }); });
      q('rsdel', function (n, v) { n.addEventListener('click', function () { work.rowSort.splice(Number(v), 1); render(); }); });
      q('rsfield', function (n, v) { n.addEventListener('change', function () { work.rowSort[Number(v)].fieldCode = n.value; }); });
      q('rsdir', function (n, v) { n.addEventListener('change', function () { work.rowSort[Number(v)].dir = n.value; }); });
      q('gadd', function (n) {
        n.addEventListener('click', function () {
          work.groups.push({ fieldCodes: [''], sort: 'none',
            header: { show: true, expr: '', h: el.rowH || 7, bg: '#f5f5f5' },
            footer: { show: false, label: '', h: el.rowH || 7, aggs: {} },
            repeatColHeader: false, newPage: false, keepTogether: false, repeatOnBreak: false });
          expanded = work.groups.length - 1;
          render();
        });
      });
      q('gdel', function (n, v) { n.addEventListener('click', function () { work.groups.splice(Number(v), 1); if (expanded >= work.groups.length) expanded = work.groups.length - 1; render(); }); });
      q('gup', function (n, v) { n.addEventListener('click', function () { var i = Number(v); if (i > 0) { var tmp = work.groups[i]; work.groups[i] = work.groups[i - 1]; work.groups[i - 1] = tmp; if (expanded === i) expanded = i - 1; render(); } }); });
      q('gdown', function (n, v) { n.addEventListener('click', function () { var i = Number(v); if (i < work.groups.length - 1) { var tmp = work.groups[i]; work.groups[i] = work.groups[i + 1]; work.groups[i + 1] = tmp; if (expanded === i) expanded = i + 1; render(); } }); });
      q('gkey', function (n, v) { var p = pair(v); n.addEventListener('change', function () { work.groups[p[0]].fieldCodes[p[1]] = n.value; render(); }); });
      q('gkeydel', function (n, v) { var p = pair(v); n.addEventListener('click', function () { work.groups[p[0]].fieldCodes.splice(p[1], 1); render(); }); });
      q('gkeyadd', function (n, v) { n.addEventListener('click', function () { work.groups[Number(v)].fieldCodes.push(''); render(); }); });
      q('gsort', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].sort = n.value; }); });
      q('ghshow', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].header.show = n.checked; render(); }); });
      q('ghexpr', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].header.expr = n.value; }); });
      q('ghexprbtn', function (n, v) {
        n.addEventListener('click', function () {
          var g = work.groups[Number(v)];
          openExprEditor({ __generic: true, __fieldScope: el.subtableCode, initial: g.header.expr || '',
            onOk: function (val) { g.header.expr = val; render(); } });
        });
      });
      q('ghh', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].header.h = Number(n.value) || 0; }); });
      q('ghbg', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].header.bg = n.value; }); });
      q('grch', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].repeatColHeader = n.checked; }); });
      q('gfshow', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].footer.show = n.checked; render(); }); });
      q('gflabel', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].footer.label = n.value; }); });
      q('gfh', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].footer.h = Number(n.value) || 0; }); });
      q('gaggfn', function (n, v) {
        var p = pair(v);
        n.addEventListener('change', function () {
          var g = work.groups[p[0]], c = (el.columns || [])[p[1]] || {};
          var akey = c.fieldCode || ('#' + p[1]);
          g.footer.aggs = g.footer.aggs || {};
          if (n.value) g.footer.aggs[akey] = { fn: n.value, src: (g.footer.aggs[akey] && g.footer.aggs[akey].src) || c.fieldCode || '' };
          else delete g.footer.aggs[akey];
          render();
        });
      });
      q('gaggsrc', function (n, v) {
        var p = pair(v);
        n.addEventListener('change', function () {
          var g = work.groups[p[0]], c = (el.columns || [])[p[1]] || {};
          var akey = c.fieldCode || ('#' + p[1]);
          if (g.footer.aggs[akey]) g.footer.aggs[akey].src = n.value;
        });
      });
      q('gnp', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].newPage = n.checked; }); });
      q('gkt', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].keepTogether = n.checked; }); });
      q('grob', function (n, v) { n.addEventListener('change', function () { work.groups[Number(v)].repeatOnBreak = n.checked; }); });
    }

    foot.querySelector('[data-act="cancel"]').addEventListener('click', m.close);
    foot.querySelector('[data-act="ok"]').addEventListener('click', function () {
      saveUndo();
      work.groups.forEach(function (g) { g.fieldCodes = groupKeyFieldsCfg(g); });
      el.groups = work.groups.filter(function (g) { return g.fieldCodes.length; });
      el.rowSort = work.rowSort.filter(function (s) { return s && s.fieldCode; });
      markDirty(); renderCanvas(); renderProps();
      m.close();
    });

    render();
  }

  function renderColumnEditor(el) {
    var wrap = $('col-list'); if (!wrap) return;
    var html = '';
    (el.columns || []).forEach(function (c, i) {
      html += '<div class="rpt-col-item" data-idx="' + i + '">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
        '<span style="font-size:11px;color:#666;">' + (i + 1) + '. ' + esc(c.label || c.fieldCode || '') + '</span>' +
        '<span>' +
        '<button type="button" class="rpt-btn-mini" data-colup="' + i + '" title="' + esc(t('moveUp')) + '"' + (i === 0 ? ' disabled' : '') + '>▲</button>' +
        '<button type="button" class="rpt-btn-mini" data-coldown="' + i + '" title="' + esc(t('moveDown')) + '"' + (i === el.columns.length - 1 ? ' disabled' : '') + '>▼</button>' +
        '</span></div>';
      var isExprCol = !!(c.useExpr || c.expr);
      html += propRow(t('colBind'), (function () {
        var s = '<select data-cbind="' + i + '">';
        [{ v: 'field', l: t('colBindField') }, { v: 'expr', l: t('colBindExpr') }].forEach(function (o) {
          s += '<option value="' + o.v + '"' + ((isExprCol ? 'expr' : 'field') === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
        });
        return s + '</select>';
      })());
      if (isExprCol) {
        html += propRow(t('colBindExpr'), '<input type="text" data-cprop="expr" value="' + esc(c.expr || '') + '" placeholder="{材質} x {板厚}">' +
          '<button type="button" class="rpt-btn-mini" data-colexpr="' + i + '">' + esc(t('exprBtn')) + '</button>');
      } else {
        html += propRow(t('bindField'), (function () {
          var s = '<select data-cprop="fieldCode">';
          fieldSelOptions(el.subtableCode).forEach(function (o) {
            s += '<option value="' + esc(o.v) + '"' + (c.fieldCode === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
          });
          return s + '</select>';
        })());
      }
      html += propRow(t('label'), '<input type="text" data-cprop="label" value="' + esc(c.label || '') + '">');
      html += propRow(t('pad'), '<input type="number" data-cprop="pad" min="0" max="10" step="0.5" value="' + esc(c.pad == null ? '' : c.pad) + '" placeholder="' + esc(el.cellPad == null || el.cellPad === '' ? 1 : el.cellPad) + '">');
      html += propRow(t('colWidth'), '<input type="number" data-cprop="width" min="3" step="0.5" value="' + esc(c.width) + '">');
      html += propRow(t('align'), (function () {
        var s = '<select data-cprop="align">';
        [{ v: 'left', l: t('left') }, { v: 'center', l: t('center') }, { v: 'right', l: t('right') }].forEach(function (o) {
          s += '<option value="' + o.v + '"' + ((c.align || 'left') === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
        });
        return s + '</select>';
      })());
      html += propRow(t('fmtType'), '<button type="button" class="rpt-btn-mini" data-colfmt="' + i + '" style="flex:1;text-align:left;">' +
        esc(fmtSummary(RPTC.normalizeFmt(c))) + ' …</button>');
      html += propRow(t('conds'), '<button type="button" class="rpt-btn-mini" data-colcond="' + i + '" style="flex:1;text-align:left;">' +
        esc(condBtnLabel(c)) + '</button>');
      html += '<button type="button" class="rpt-btn-mini rpt-btn-danger" data-coldel="' + i + '">✕ ' + esc(t('delete')) + '</button>';
      html += '</div>';
    });
    wrap.innerHTML = html;

    wrap.querySelectorAll('.rpt-col-item').forEach(function (item) {
      var idx = Number(item.getAttribute('data-idx'));
      item.querySelectorAll('[data-cprop]').forEach(function (input) {
        input.addEventListener('change', function () {
          saveUndo();
          var key = input.getAttribute('data-cprop');
          el.columns[idx][key] = (input.type === 'number') ? (Number(input.value) || 0) : input.value;
          if (key === 'width') syncTableW(el);
          markDirty(); renderCanvas();
        });
      });
    });
    function swapCols(a, b) {
      saveUndo();
      var tmp = el.columns[a]; el.columns[a] = el.columns[b]; el.columns[b] = tmp;
      markDirty(); renderCanvas(); renderProps();
    }
    wrap.querySelectorAll('[data-colup]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-colup'));
        if (i > 0) swapCols(i, i - 1);
      });
    });
    wrap.querySelectorAll('[data-coldown]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-coldown'));
        if (i < el.columns.length - 1) swapCols(i, i + 1);
      });
    });
    wrap.querySelectorAll('[data-cbind]').forEach(function (selEl) {
      selEl.addEventListener('change', function () {
        saveUndo();
        var i = Number(selEl.getAttribute('data-cbind'));
        if (selEl.value === 'expr') {
          el.columns[i].useExpr = true;
          if (!el.columns[i].expr && el.columns[i].fieldCode) el.columns[i].expr = '{' + el.columns[i].fieldCode + '}';
        } else {
          el.columns[i].useExpr = false;
          el.columns[i].expr = '';
        }
        markDirty(); renderCanvas(); renderProps();
      });
    });
    wrap.querySelectorAll('[data-colexpr]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-colexpr'));
        openExprEditor({ __generic: true, __fieldScope: el.subtableCode, initial: el.columns[i].expr || '',
          onOk: function (val) {
            saveUndo();
            el.columns[i].expr = val;
            markDirty(); renderCanvas(); renderProps();
          } });
      });
    });
    wrap.querySelectorAll('[data-colcond]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-colcond'));
        // condition field: row-level (subtable) fields first, record fields also usable
        var opts = (el.subtableCode === '$RECORDS')
          ? fieldSelOptions('$RECORDS')
          : fieldSelOptions(el.subtableCode).concat(fieldSelOptions().slice(1));
        openCondEditor(el.columns[i], opts);
      });
    });
    wrap.querySelectorAll('[data-colfmt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-colfmt'));
        var c = el.columns[i];
        openFormatDialog(RPTC.normalizeFmt(c), sampleFvFor(c.fieldCode, el.subtableCode), function (newFmt) {
          saveUndo();
          c.fmt = newFmt; c.format = '';
          markDirty(); renderCanvas(); renderProps();
        });
      });
    });
    wrap.querySelectorAll('[data-coldel]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        saveUndo();
        el.columns.splice(Number(btn.getAttribute('data-coldel')), 1);
        syncTableW(el);
        markDirty(); renderCanvas(); renderProps();
      });
    });
    var addBtn = $('btn-add-col');
    if (addBtn) addBtn.addEventListener('click', function () {
      saveUndo();
      el.columns = el.columns || [];
      el.columns.push({ fieldCode: '', label: '', width: 30, align: 'left', format: 'none' });
      syncTableW(el);
      markDirty(); renderCanvas(); renderProps();
    });
  }

  function renderFooterEditor(el) {
    var wrap = $('footer-list'); if (!wrap) return;
    var html = '';
    (el.footers || []).forEach(function (f, i) {
      html += '<div class="rpt-col-item" data-fidx="' + i + '">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
        '<span style="font-size:11px;color:#666;">' + (i + 1) + '. ' + esc(f.label || '') + '</span>' +
        '<span>' +
        '<button type="button" class="rpt-btn-mini" data-fup="' + i + '"' + (i === 0 ? ' disabled' : '') + '>▲</button>' +
        '<button type="button" class="rpt-btn-mini" data-fdown="' + i + '"' + (i === el.footers.length - 1 ? ' disabled' : '') + '>▼</button>' +
        '</span></div>';
      html += propRow(t('label'), '<input type="text" data-fprop="label" value="' + esc(f.label || '') + '">');
      html += propRow(t('bindField'), (function () {
        var fopts;
        if (el.subtableCode === '$RECORDS') {
          fopts = [{ v: '', l: t('fieldNotSet') }, { v: 'RCOUNT', l: t('aggRcount') }];
          state.fields.forEach(function (fd) { fopts.push({ v: 'TSUM.' + fd.code, l: 'Σ ' + fd.label }); });
        } else {
          fopts = fieldSelOptions();
        }
        var s = '<select data-fprop="fieldCode">';
        fopts.forEach(function (o) {
          s += '<option value="' + esc(o.v) + '"' + (f.fieldCode === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
        });
        return s + '</select>';
      })());
      html += propRow(t('fmtType'), '<button type="button" class="rpt-btn-mini" data-ffmt="' + i + '" style="flex:1;text-align:left;">' +
        esc(fmtSummary(RPTC.normalizeFmt(f))) + ' …</button>');
      html += propRow(t('pad'), '<input type="number" data-fprop="pad" min="0" max="10" step="0.5" value="' + esc(f.pad == null ? '' : f.pad) + '" placeholder="' + esc(el.cellPad == null || el.cellPad === '' ? 1 : el.cellPad) + '">');
      html += propRow(t('align'), (function () {
        var s = '<select data-fprop="align">';
        [{ v: 'left', l: t('left') }, { v: 'center', l: t('center') }, { v: 'right', l: t('right') }].forEach(function (o) {
          s += '<option value="' + o.v + '"' + ((f.align || 'right') === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
        });
        return s + '</select>';
      })());
      html += propRow(t('color'), '<input type="color" list="rpt-std-colors" data-fprop="color" value="' + esc(f.color || '#000000') + '" style="width:44px;padding:0;height:24px;">' +
        '<button type="button" class="rpt-btn-mini" data-fclear="' + i + '">' + esc(t('none')) + '</button>');
      html += propRow(t('bold'), '<input type="checkbox" data-fprop="bold"' + (f.bold ? ' checked' : '') + '>');
      html += '<button type="button" class="rpt-btn-mini rpt-btn-danger" data-fdel="' + i + '">✕ ' + esc(t('delete')) + '</button>';
      html += '</div>';
    });
    wrap.innerHTML = html;

    wrap.querySelectorAll('.rpt-col-item[data-fidx]').forEach(function (item) {
      var idx = Number(item.getAttribute('data-fidx'));
      item.querySelectorAll('[data-fprop]').forEach(function (input) {
        input.addEventListener('change', function () {
          saveUndo();
          var key = input.getAttribute('data-fprop');
          el.footers[idx][key] = (input.type === 'checkbox') ? input.checked : input.value;
          markDirty(); renderCanvas();
        });
      });
    });
    function swapF(a, b) {
      saveUndo();
      var tmp = el.footers[a]; el.footers[a] = el.footers[b]; el.footers[b] = tmp;
      markDirty(); renderCanvas(); renderProps();
    }
    wrap.querySelectorAll('[data-fup]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-fup'));
        if (i > 0) swapF(i, i - 1);
      });
    });
    wrap.querySelectorAll('[data-fdown]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-fdown'));
        if (i < el.footers.length - 1) swapF(i, i + 1);
      });
    });
    wrap.querySelectorAll('[data-ffmt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-ffmt'));
        var f = el.footers[i];
        openFormatDialog(RPTC.normalizeFmt(f), sampleFvFor(f.fieldCode, null), function (newFmt) {
          saveUndo();
          f.fmt = newFmt; f.format = '';
          markDirty(); renderCanvas(); renderProps();
        });
      });
    });
    wrap.querySelectorAll('[data-fclear]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        saveUndo();
        el.footers[Number(btn.getAttribute('data-fclear'))].color = '';
        markDirty(); renderCanvas(); renderProps();
      });
    });
    wrap.querySelectorAll('[data-fdel]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        saveUndo();
        el.footers.splice(Number(btn.getAttribute('data-fdel')), 1);
        markDirty(); renderCanvas(); renderProps();
      });
    });
    var addBtn = $('btn-add-footer');
    if (addBtn) addBtn.addEventListener('click', function () {
      saveUndo();
      el.footers = el.footers || [];
      el.footers.push({ label: '', fieldCode: '', bind: 'field', color: '', bold: false });
      markDirty(); renderCanvas(); renderProps();
    });
  }

  /* ---------------- canvas drop (field palette) ---------------- */
  function initCanvasDnD() {
    var paper = els.paper;
    paper.addEventListener('dragover', function (ev) { ev.preventDefault(); });
    paper.addEventListener('drop', function (ev) {
      ev.preventDefault();
      var tpl = currentTpl(); if (!tpl) return;
      var data;
      try { data = JSON.parse(ev.dataTransfer.getData('text/plain')); } catch (e) { return; }
      var rect = paper.getBoundingClientRect();
      var s = pxPerMm();
      var x = snapVal((ev.clientX - rect.left) / s, tpl);
      var y = snapVal((ev.clientY - rect.top) / s, tpl);
      if (data.subtable) {
        var st = state.subtables.find(function (z) { return z.code === data.subtable; });
        var cols = [];
        if (st) st.fields.slice(0, 5).forEach(function (f) {
          cols.push({ fieldCode: f.code, label: f.label, width: 30,
            align: defaultAlignFor(f.code, st.code), fmt: defaultFmtFor(f.code, st.code) });
        });
        addElement('table', { x: x, y: y, subtableCode: data.subtable, columns: cols,
          w: Math.max(30, cols.reduce(function (a, c) { return a + c.width; }, 0)) });
      } else if (data.subcode && tpl.outputUnit === 'row' && data.subcode === tpl.rowSubtable) {
        addElement('field', { x: x, y: y, fieldCode: data.code, fmt: defaultFmtFor(data.code, data.subcode) });
      } else if (data.subcode) {
        // subtable field: add as a column to a matching table under the cursor (or any matching table)
        var hit = (tpl.elements || []).find(function (e2) {
          return e2.type === 'table' && e2.subtableCode === data.subcode &&
            x >= e2.x && x <= e2.x + e2.w && y >= e2.y && y <= e2.y + e2.h;
        }) || (tpl.elements || []).find(function (e2) {
          return e2.type === 'table' && e2.subtableCode === data.subcode;
        });
        var stf = null;
        state.subtables.forEach(function (z) {
          if (z.code === data.subcode) z.fields.forEach(function (f) { if (f.code === data.code) stf = f; });
        });
        var col = { fieldCode: data.code, label: stf ? stf.label : data.code, width: 30,
          align: defaultAlignFor(data.code, data.subcode), fmt: defaultFmtFor(data.code, data.subcode) };
        if (hit) {
          saveUndo();
          hit.columns = hit.columns || [];
          hit.columns.push(col);
          state.selectedElementId = hit.id;
          markDirty(); renderCanvas(); renderProps();
        } else {
          addElement('table', { x: x, y: y, subtableCode: data.subcode, columns: [col] });
        }
      } else if (data.code) {
        addElement('field', { x: x, y: y, fieldCode: data.code, fmt: defaultFmtFor(data.code, null) });
      }
    });
    paper.addEventListener('contextmenu', function (ev) {
      if (ev.target !== paper && ev.target !== els.page && ev.target !== els.grid && ev.target !== els.elements) return;
      ev.preventDefault();
      var rect = paper.getBoundingClientRect();
      var s = pxPerMm();
      var mx = (ev.clientX - rect.left) / s, my = (ev.clientY - rect.top) / s;
      showCtxMenu(ev.clientX, ev.clientY, [
        { label: t('ctxPaste') + ' (Ctrl+V)', action: function () { pasteElement(mx, my); }, disabled: !state.clipboard }
      ]);
    });
    // placement beats selection: capture phase runs before element nodes'
    // own pointerdown handlers, so an armed tool places even over other items
    paper.addEventListener('pointerdown', function (ev) {
      if (!state.pendingAdd) return;
      ev.stopPropagation();
      ev.preventDefault();
      var tpl = currentTpl();
      if (tpl) {
        var rect = els.page.getBoundingClientRect();
        var s = rect.width / paperDims(tpl).w;
        var x = snapVal(Math.max(0, (ev.clientX - rect.left) / s), tpl);
        var y = snapVal(Math.max(0, (ev.clientY - rect.top) / s), tpl);
        var type = state.pendingAdd.type;
        cancelAdd();
        addElement(type, { x: x, y: y });
      } else cancelAdd();
    }, true);
    paper.addEventListener('pointerdown', function (ev) {
      if (ev.target === paper || ev.target === els.page || ev.target === els.grid || ev.target === els.elements) {
        state.selectedElementId = null;
        renderCanvas(); renderProps();
      }
    });
  }

  /* ---------------- clipboard / z-order / context menu ---------------- */
  function copyElement(el) {
    if (state.multiIds.length > 1 && state.multiIds.indexOf(el.id) >= 0) {
      state.clipboard = JSON.stringify(selectionEls());
    } else {
      state.clipboard = JSON.stringify(el);
    }
  }
  function cutElement(el) { copyElement(el); deleteElement(el.id); }
  function pasteElement(atX, atY) {
    var tpl = currentTpl();
    if (!tpl || !state.clipboard) return;
    var data;
    try { data = JSON.parse(state.clipboard); } catch (e) { return; }
    var arr = Array.isArray(data) ? data : [data];
    if (!arr.length) return;
    saveUndo();
    var minX = Math.min.apply(null, arr.map(function (e) { return e.x; }));
    var minY = Math.min.apply(null, arr.map(function (e) { return e.y; }));
    var newIds = [];
    arr.forEach(function (el) {
      el.id = uuid();
      if (typeof atX === 'number' && typeof atY === 'number') {
        el.x = round1(atX + (el.x - minX));
        el.y = round1(atY + (el.y - minY));
      } else {
        el.x = round1(el.x + 5); el.y = round1(el.y + 5);
      }
      tpl.elements.push(el);
      newIds.push(el.id);
    });
    state.selectedElementId = newIds[newIds.length - 1];
    state.multiIds = newIds.length > 1 ? newIds : [];
    markDirty(); renderCanvas(); renderProps();
  }
  function zOrder(el, mode) {
    var tpl = currentTpl(); if (!tpl) return;
    var arr = tpl.elements;
    var i = arr.indexOf(el);
    if (i < 0) return;
    saveUndo();
    arr.splice(i, 1);
    if (mode === 'front') arr.push(el);
    else if (mode === 'back') arr.unshift(el);
    else if (mode === 'forward') arr.splice(Math.min(i + 1, arr.length), 0, el);
    else arr.splice(Math.max(i - 1, 0), 0, el); // backward
    markDirty(); renderCanvas();
  }
  function closeCtxMenu() {
    var m = $('rpt-ctxmenu');
    if (m && m.parentNode) m.parentNode.removeChild(m);
  }
  function showCtxMenu(clientX, clientY, items) {
    closeCtxMenu();
    var menu = document.createElement('div');
    menu.id = 'rpt-ctxmenu';
    menu.className = 'rpt-ctxmenu';
    items.forEach(function (it) {
      if (it === '-') {
        var hr = document.createElement('div');
        hr.className = 'rpt-ctx-sep';
        menu.appendChild(hr);
        return;
      }
      var row = document.createElement('div');
      row.className = 'rpt-ctx-item' + (it.disabled ? ' disabled' : '');
      row.textContent = it.label;
      if (!it.disabled) row.addEventListener('pointerdown', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        closeCtxMenu();
        it.action();
      });
      menu.appendChild(row);
    });
    menu.style.left = clientX + 'px';
    menu.style.top = clientY + 'px';
    document.body.appendChild(menu);
    // keep on screen
    var r = menu.getBoundingClientRect();
    if (r.right > window.innerWidth) menu.style.left = (clientX - r.width) + 'px';
    if (r.bottom > window.innerHeight) menu.style.top = (clientY - r.height) + 'px';
    setTimeout(function () {
      document.addEventListener('pointerdown', function once() {
        document.removeEventListener('pointerdown', once);
        closeCtxMenu();
      });
    }, 0);
  }
  function elementCtxItems(el) {
    return [
      { label: t('ctxCopy') + ' (Ctrl+C)', action: function () { copyElement(el); } },
      { label: t('ctxCut') + ' (Ctrl+X)', action: function () { cutElement(el); } },
      { label: t('ctxPaste') + ' (Ctrl+V)', action: function () { pasteElement(); }, disabled: !state.clipboard },
      { label: t('duplicate') + ' (Ctrl+D)', action: function () { duplicateElement(el.id); } },
      { label: t('delete'), action: function () { deleteElement(el.id); } },
      '-',
      { label: t('bringFront'), action: function () { zOrder(el, 'front'); } },
      { label: t('forward'), action: function () { zOrder(el, 'forward'); } },
      { label: t('backward'), action: function () { zOrder(el, 'backward'); } },
      { label: t('sendBack'), action: function () { zOrder(el, 'back'); } }
    ];
  }

  /* ---------------- keyboard ---------------- */
  function initKeyboard() {
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && state.pendingAdd) { cancelAdd(); return; }
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      var typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'z') { ev.preventDefault(); undo(); return; }
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'y') { ev.preventDefault(); redo(); return; }
      if (typing) return;
      var el = currentEl(); var tpl = currentTpl();
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'v') {
        ev.preventDefault(); pasteElement(); return;
      }
      if (!el || !tpl) return;
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'c') {
        ev.preventDefault(); copyElement(el); return;
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'x') {
        ev.preventDefault(); cutElement(el); return;
      }
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'd') {
        ev.preventDefault(); duplicateElement(el.id); return;
      }
      if (ev.key === 'Delete' || ev.key === 'Backspace') {
        ev.preventDefault(); deleteElement(el.id); return;
      }
      var step = ev.shiftKey ? 0.1 : ((tpl.grid && tpl.grid.size) || 5);
      var moved = false;
      if (ev.key === 'ArrowLeft') { el.x = round1(Math.max(0, el.x - step)); moved = true; }
      if (ev.key === 'ArrowRight') { el.x = round1(el.x + step); moved = true; }
      if (ev.key === 'ArrowUp') { el.y = round1(Math.max(0, el.y - step)); moved = true; }
      if (ev.key === 'ArrowDown') { el.y = round1(el.y + step); moved = true; }
      if (moved) {
        ev.preventDefault(); saveUndo(); markDirty();
        renderCanvas(); updateGeomInputs(el);
      }
    });
  }

  /* ---------------- format dialog (Stimulsoft-style) ---------------- */
  function fmtSummary(fmt) {
    switch (fmt.type) {
      case 'number': return t('fmtNum') + ' (' + (Number(fmt.decimals) || 0) + ')';
      case 'currency': return t('fmtCur') + ' ' + (fmt.symbol == null ? '¥' : fmt.symbol);
      case 'date': return t('fmtDateCat') + ': ' + (fmt.dateFmt || 'YYYY/MM/DD');
      case 'time': return t('fmtTime') + ': ' + (fmt.timeFmt || 'HH:mm');
      case 'percent': return t('fmtPct');
      case 'bool': return t('fmtBool');
      case 'custom': return t('fmtCustom') + ': ' + (fmt.custom || '');
    }
    return t('fmtGeneral');
  }
  function sampleFvFor(code, subCode) {
    var ty = fieldTypeOf(code, subCode);
    var now = new Date();
    function iso(d) { return d.toISOString(); }
    if (ty === 'NUMBER' || ty === 'CALC') return { type: ty, value: '1234567.89' };
    if (ty === 'DATE') return { type: ty, value: now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) };
    if (ty === 'DATETIME' || ty === 'CREATED_TIME' || ty === 'UPDATED_TIME') return { type: ty, value: iso(now) };
    if (ty === 'TIME') return { type: ty, value: '09:30' };
    return { type: ty || 'SINGLE_LINE_TEXT', value: 'ABC-123' };
  }
  function openFormatDialog(initialFmt, sampleFv, onOK) {
    var fmt = JSON.parse(JSON.stringify(initialFmt || { type: 'general' }));
    var m = modalShell(t('fmtDialog'));
    m.box.style.width = '600px'; m.box.style.height = '470px';

    var body = document.createElement('div');
    body.className = 'rpt-fmt-body';
    body.style.marginBottom = '4px';
    var catPane = document.createElement('div');
    catPane.className = 'rpt-fmt-cats';
    var rightPane = document.createElement('div');
    rightPane.className = 'rpt-fmt-right';
    var sampleBar = document.createElement('div');
    sampleBar.className = 'rpt-fmt-sample';
    sampleBar.innerHTML = '<div class="lbl">' + esc(t('sample')) + '</div>' +
      '<div id="fmt-sample" class="val"></div>';
    var propsPane = document.createElement('div');
    propsPane.className = 'rpt-fmt-props';
    rightPane.appendChild(sampleBar); rightPane.appendChild(propsPane);
    body.appendChild(catPane); body.appendChild(rightPane);
    m.box.appendChild(body);

    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-plain" data-act="cancel">' + esc(t('cancel')) + '</button>' +
      '<button type="button" class="rpt-btn-primary" data-act="ok">OK</button>';
    m.box.appendChild(foot);

    var CATS = [
      { id: 'general', label: t('fmtGeneral') }, { id: 'number', label: t('fmtNum') },
      { id: 'currency', label: t('fmtCur') }, { id: 'date', label: t('fmtDateCat') },
      { id: 'time', label: t('fmtTime') }, { id: 'percent', label: t('fmtPct') },
      { id: 'bool', label: t('fmtBool') }, { id: 'custom', label: t('fmtCustom') }
    ];
    function refreshSample() {
      var out = RPTC.formatValue(fmt, sampleFv);
      var n = propsPane.ownerDocument.getElementById('fmt-sample');
      if (n) n.textContent = out;
    }
    function frow(label, inputHtml) {
      return '<div class="rpt-fmt-row"><label>' + esc(label) + '</label>' + inputHtml + '</div>';
    }
    function renderCat() {
      var ch = '';
      CATS.forEach(function (c) {
        ch += '<div class="rpt-fmt-cat' + (fmt.type === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' +
          esc(c.label) + '</div>';
      });
      catPane.innerHTML = ch;
      catPane.querySelectorAll('.rpt-fmt-cat').forEach(function (n) {
        n.addEventListener('click', function () {
          fmt.type = n.getAttribute('data-cat');
          renderCat(); renderFmtProps(); refreshSample();
        });
      });
    }
    function renderFmtProps() {
      var h = '';
      if (fmt.type === 'number') {
        h += frow(t('decimals'), '<input type="number" data-f="decimals" min="0" max="6" value="' + (Number(fmt.decimals) || 0) + '">');
        h += frow(t('thousands'), '<input type="checkbox" data-f="thousands"' + (fmt.thousands !== false ? ' checked' : '') + '>');
      } else if (fmt.type === 'currency') {
        h += frow(t('symbol'), '<input type="text" data-f="symbol" value="' + esc(fmt.symbol == null ? '¥' : fmt.symbol) + '">');
        h += frow(t('decimals'), '<input type="number" data-f="decimals" min="0" max="6" value="' + (Number(fmt.decimals) || 0) + '">');
        h += frow(t('symbolPos'), '<select data-f="symbolPos"><option value="before"' + (fmt.symbolPos !== 'after' ? ' selected' : '') + '>' + esc(t('before')) +
          '</option><option value="after"' + (fmt.symbolPos === 'after' ? ' selected' : '') + '>' + esc(t('after')) + '</option></select>');
      } else if (fmt.type === 'date') {
        var s = '<select data-f="dateFmt">';
        DATE_FORMATS.forEach(function (p) {
          s += '<option value="' + esc(p) + '"' + ((fmt.dateFmt || 'YYYY/MM/DD') === p ? ' selected' : '') + '>' + esc(p) + '</option>';
        });
        h += frow(t('dateFmt'), s + '</select>');
      } else if (fmt.type === 'time') {
        h += frow(t('fmtTime'), '<select data-f="timeFmt"><option value="HH:mm"' + ((fmt.timeFmt || 'HH:mm') === 'HH:mm' ? ' selected' : '') + '>HH:mm</option>' +
          '<option value="H時m分"' + (fmt.timeFmt === 'H時m分' ? ' selected' : '') + '>H時m分</option></select>');
      } else if (fmt.type === 'percent') {
        h += frow(t('decimals'), '<input type="number" data-f="decimals" min="0" max="6" value="' + (Number(fmt.decimals) || 0) + '">');
        h += frow(t('x100'), '<input type="checkbox" data-f="x100"' + (fmt.x100 !== false ? ' checked' : '') + '>');
      } else if (fmt.type === 'bool') {
        h += frow(t('trueText'), '<input type="text" data-f="trueText" value="' + esc(fmt.trueText == null ? '✓' : fmt.trueText) + '">');
        h += frow(t('falseText'), '<input type="text" data-f="falseText" value="' + esc(fmt.falseText == null ? '' : fmt.falseText) + '">');
      } else if (fmt.type === 'custom') {
        h += frow(t('customPtn'), '<input type="text" data-f="custom" value="' + esc(fmt.custom || '') + '">');
        h += '<div class="rpt-fmt-note">' + esc(t('customHint')) + '</div>';
      }
      propsPane.innerHTML = '<div class="rpt-fmt-hd">' + esc(t('properties')) + '</div>' + h;
      propsPane.querySelectorAll('[data-f]').forEach(function (input) {
        input.addEventListener('input', apply);
        input.addEventListener('change', apply);
        function apply() {
          var k = input.getAttribute('data-f');
          if (input.type === 'checkbox') fmt[k] = input.checked;
          else if (input.type === 'number') fmt[k] = Number(input.value) || 0;
          else fmt[k] = input.value;
          refreshSample();
        }
      });
    }
    renderCat(); renderFmtProps(); refreshSample();

    foot.querySelector('[data-act="cancel"]').addEventListener('click', m.close);
    foot.querySelector('[data-act="ok"]').addEventListener('click', function () {
      onOK(fmt); m.close();
    });
  }

  /* ---------------- condition editor (Stimulsoft-style highlight) ---------------- */
  function opOptions() {
    return [
      { v: 'eq', l: t('opEq') }, { v: 'ne', l: t('opNe') }, { v: 'contains', l: t('opContains') },
      { v: 'gt', l: t('opGt') }, { v: 'gte', l: t('opGte') }, { v: 'lt', l: t('opLt') },
      { v: 'lte', l: t('opLte') }, { v: 'empty', l: t('opEmpty') }, { v: 'notempty', l: t('opNotempty') }];
  }
  // target: element or table column (holds .conds). fieldOpts: [{v,l}] for the condition field.
  function openCondEditor(target, fieldOpts, onDone) {
    var conds = JSON.parse(JSON.stringify(target.conds || []));
    var m = modalShell('⚡ ' + t('conds'));
    m.box.style.width = '640px'; m.box.style.maxHeight = '80vh';

    var list = document.createElement('div');
    list.style.cssText = 'overflow-y:auto;flex:1;min-height:120px;';
    m.box.appendChild(list);

    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'rpt-btn-mini';
    addBtn.textContent = '＋ ' + t('addCond');
    m.box.appendChild(addBtn);

    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-plain" data-act="cancel">' + esc(t('cancel')) + '</button>' +
      '<button type="button" class="rpt-btn-primary" data-act="ok">OK</button>';
    m.box.appendChild(foot);

    function sampleStyle(c) {
      return (c.color ? 'color:' + c.color + ';' : 'color:#333;') +
        (c.bg ? 'background:' + c.bg + ';' : '') +
        (c.bold ? 'font-weight:bold;' : '') +
        (c.hide ? 'opacity:.25;text-decoration:line-through;' : '');
    }
    function render() {
      var h = '';
      conds.forEach(function (c, i) {
        var noVal = (c.op === 'empty' || c.op === 'notempty');
        h += '<div class="rpt-cond-card" data-ci="' + i + '">';
        h += '<div class="rpt-cond-head"><span class="rpt-cond-num">' + esc(t('condN')) + ' ' + (i + 1) + '</span>' +
          '<span class="rpt-cond-sample" data-sample style="' + sampleStyle(c) + '">AaBb あア亜 123</span>' +
          '<button type="button" class="rpt-cond-del" data-cdel="' + i + '" title="' + esc(t('delete')) + '">✕</button></div>';
        // if: field + operator
        h += '<div class="rpt-cond-row"><label>' + esc(t('condIf')) + '</label>' +
          '<select data-cc="fieldCode" style="flex:1.4;">';
        fieldOpts.forEach(function (o) {
          h += '<option value="' + esc(o.v) + '"' + (c.fieldCode === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
        });
        h += '</select><select data-cc="op" style="flex:1;">';
        opOptions().forEach(function (o) {
          h += '<option value="' + o.v + '"' + ((c.op || 'eq') === o.v ? ' selected' : '') + '>' + esc(o.l) + '</option>';
        });
        h += '</select></div>';
        // value
        h += '<div class="rpt-cond-row"><label>' + esc(t('condValue')) + '</label>' +
          '<input type="text" data-cc="value" value="' + esc(c.value == null ? '' : c.value) + '"' +
          (noVal ? ' disabled placeholder="-"' : '') + '></div>';
        // style chips
        h += '<div class="rpt-cond-row"><label>' + esc(t('condStyle')) + '</label><span class="rpt-chips">';
        h += '<span class="rpt-chip' + (c.color ? ' on' : '') + '"><input type="checkbox" data-cc="useColor"' + (c.color ? ' checked' : '') + '>' +
          '<input type="color" list="rpt-std-colors" data-cc="color" value="' + esc(c.color || '#cc0000') + '"' + (c.color ? '' : ' disabled') + '>' + esc(t('color')) + '</span>';
        h += '<span class="rpt-chip' + (c.bg ? ' on' : '') + '"><input type="checkbox" data-cc="useBg"' + (c.bg ? ' checked' : '') + '>' +
          '<input type="color" list="rpt-std-colors" data-cc="bg" value="' + esc(c.bg || '#ffff88') + '"' + (c.bg ? '' : ' disabled') + '>' + esc(t('bg')) + '</span>';
        h += '<span class="rpt-chip' + (c.bold ? ' on' : '') + '"><input type="checkbox" data-cc="bold"' + (c.bold ? ' checked' : '') + '><b>' + esc(t('bold')) + '</b></span>';
        h += '<span class="rpt-chip' + (c.hide ? ' on' : '') + '"><input type="checkbox" data-cc="hide"' + (c.hide ? ' checked' : '') + '>' + esc(t('condHide')) + '</span>';
        h += '</span></div>';
        h += '</div>';
      });
      list.innerHTML = h || '<div style="color:#999;font-size:12px;padding:16px;text-align:center;">＋ ' + esc(t('addCond')) + '</div>';

      list.querySelectorAll('.rpt-cond-card').forEach(function (item) {
        var i = Number(item.getAttribute('data-ci'));
        var c = conds[i];
        function refreshSample() {
          var sp = item.querySelector('[data-sample]');
          if (sp) sp.style.cssText = sampleStyle(c);
          item.querySelectorAll('.rpt-chip').forEach(function (chip) {
            var cb = chip.querySelector('input[type=checkbox]');
            chip.classList.toggle('on', cb.checked);
          });
        }
        item.querySelectorAll('[data-cc]').forEach(function (input) {
          input.addEventListener('change', function () {
            var k = input.getAttribute('data-cc');
            if (k === 'useColor') {
              c.color = input.checked ? item.querySelector('[data-cc="color"]').value : '';
              item.querySelector('[data-cc="color"]').disabled = !input.checked;
            } else if (k === 'useBg') {
              c.bg = input.checked ? item.querySelector('[data-cc="bg"]').value : '';
              item.querySelector('[data-cc="bg"]').disabled = !input.checked;
            } else if (k === 'color') { c.color = input.value; }
            else if (k === 'bg') { c.bg = input.value; }
            else if (input.type === 'checkbox') c[k] = input.checked;
            else c[k] = input.value;
            if (k === 'op') { render(); return; }
            refreshSample();
          });
          if (input.type === 'color') input.addEventListener('input', function () {
            if (input.getAttribute('data-cc') === 'color' && c.color !== '') c.color = input.value;
            if (input.getAttribute('data-cc') === 'bg' && c.bg !== '') c.bg = input.value;
            refreshSample();
          });
        });
      });
      list.querySelectorAll('[data-cdel]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          conds.splice(Number(btn.getAttribute('data-cdel')), 1);
          render();
        });
      });
    }
    render();

    addBtn.addEventListener('click', function () {
      conds.push({ fieldCode: (fieldOpts[1] ? fieldOpts[1].v : ''), op: 'eq', value: '', color: '', bg: '', bold: false, hide: false });
      render();
    });
    foot.querySelector('[data-act="cancel"]').addEventListener('click', m.close);
    foot.querySelector('[data-act="ok"]').addEventListener('click', function () {
      saveUndo();
      target.conds = conds.filter(function (c) { return c.fieldCode; });
      markDirty(); renderCanvas(); renderProps();
      if (onDone) onDone();
      m.close();
    });
  }
  function condBtnLabel(target) {
    var n = (target.conds || []).length;
    return '⚡ ' + t('conds') + (n ? ' (' + n + ')' : '') + ' …';
  }

  /* ---------------- embedded image import ---------------- */
  function pickImageFile(el) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        compressImage(String(reader.result), file.type, function (dataURL) {
          if (!dataURL) { alert(t('imgTooBig')); return; }
          saveUndo();
          var id = uuid();
          state.images[id] = dataURL;
          el.bindType = 'embed';
          el.imageId = id;
          markDirty(); renderCanvas(); renderProps();
          updateUsageMeter();
        });
      };
      reader.readAsDataURL(file);
    });
    input.click();
  }
  function canvasHasAlpha(ctx, w, h) {
    try {
      var d = ctx.getImageData(0, 0, w, h).data;
      var step = Math.max(4, (Math.floor(d.length / 4 / 4000) * 4)); // sample ~4000 px
      for (var i = 3; i < d.length; i += step) {
        if (d[i] < 250) return true;
      }
    } catch (e) { return true; } // be safe: assume alpha
    return false;
  }
  function compressImage(dataURL, mime, cb, targetChars) {
    var TARGET = targetChars || RPTC.IMG_TARGET_CHARS;
    var img = new Image();
    img.onload = function () {
      // detect transparency once at a small size
      var probe = document.createElement('canvas');
      var ps = Math.min(1, 200 / Math.max(img.width, img.height));
      probe.width = Math.max(1, Math.round(img.width * ps));
      probe.height = Math.max(1, Math.round(img.height * ps));
      var pctx = probe.getContext('2d');
      pctx.drawImage(img, 0, 0, probe.width, probe.height);
      var maybePng = (mime === 'image/png' || mime === 'image/gif' || mime === 'image/webp');
      var hasAlpha = maybePng && canvasHasAlpha(pctx, probe.width, probe.height);

      var maxDim = 800, quality = 0.82, attempts = 0;
      function attempt() {
        attempts++;
        var scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var out;
        if (hasAlpha) {
          // NEVER convert to JPEG: transparency must survive. Shrink dims instead.
          out = canvas.toDataURL('image/png');
          if (out.length > TARGET && Math.max(canvas.width, canvas.height) > 120 && attempts < 10) {
            maxDim = Math.round(Math.max(canvas.width, canvas.height) * 0.75);
            return attempt();
          }
          // small transparent stamps/logos: accept slight overage rather than kill alpha
          cb(out.length > TARGET * 1.5 ? null : out);
          return;
        }
        var usePng = maybePng;
        out = usePng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', quality);
        if (out.length > TARGET && usePng) { mime = 'image/jpeg'; return attempt(); }
        if (out.length > TARGET && attempts < 7) { maxDim = Math.round(maxDim * 0.72); quality = Math.max(0.45, quality - 0.08); return attempt(); }
        cb(out.length > TARGET ? null : out);
      }
      attempt();
    };
    img.onerror = function () { cb(null); };
    img.src = dataURL;
  }

  /* ---------------- template export / import ---------------- */
  function exportTemplate() {
    var tpl = currentTpl(); if (!tpl) return;
    var imgs = {};
    (tpl.elements || []).forEach(function (e) {
      if (e.type === 'image' && e.bindType === 'embed' && e.imageId && state.images[e.imageId]) {
        imgs[e.imageId] = state.images[e.imageId];
      }
    });
    var blob = new Blob([JSON.stringify({ template: tpl, images: imgs }, null, 1)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (tpl.name || 'template') + '.rpt.json';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
  }
  function importTemplate() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(String(reader.result));
          var tpl = data.template || data;
          if (!tpl || !tpl.elements) throw new Error('bad format');
          saveUndo();
          tpl.id = uuid();
          Object.keys(data.images || {}).forEach(function (id) { state.images[id] = data.images[id]; });
          state.templates.push(tpl);
          state.selectedTemplateId = tpl.id;
          state.selectedElementId = null;
          markDirty(); refreshTemplateList(); renderCanvas(); renderProps();
        } catch (e) { alert(t('importFail')); }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  /* ---------------- expression editor ---------------- */
  function modalShell(titleText) {
    var overlay = document.createElement('div');
    overlay.className = 'rpt-modal-overlay';
    var box = document.createElement('div');
    box.className = 'rpt-modal';
    box.innerHTML = '<div class="rpt-modal-title"><span>' + esc(titleText) + '</span>' +
      '<button type="button" class="rpt-modal-x" title="' + esc(t('cancel')) + '">✕</button></div>';
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    function closeIt() { if (overlay.parentNode) document.body.removeChild(overlay); }
    box.querySelector('.rpt-modal-x').addEventListener('click', closeIt);
    overlay.addEventListener('pointerdown', function (ev) {
      if (ev.target === overlay) closeIt();
    });
    return { overlay: overlay, box: box, close: function () {
      if (overlay.parentNode) document.body.removeChild(overlay);
    } };
  }

  function openExprEditor(el) {
    var m = modalShell(t('exprTitle'));
    var generic = !!(el && el.__generic);
    var initial = generic ? (el.initial || '')
      : (el.type === 'text') ? (el.text || '') : (el.expr || (el.fieldCode ? '{' + el.fieldCode + '}' : ''));

    var body = document.createElement('div');
    body.className = 'rpt-expr-body';
    var left = document.createElement('div');
    left.className = 'rpt-expr-left';
    // toolbar: clear (handy when pasting a field over existing content)
    var tools = document.createElement('div');
    tools.className = 'rpt-expr-tools';
    var clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'rpt-btn-mini';
    clearBtn.textContent = '🗑 ' + t('exprClear');
    tools.appendChild(clearBtn);
    left.appendChild(tools);
    var ta = document.createElement('textarea');
    ta.value = initial;
    clearBtn.addEventListener('click', function () { ta.value = ''; ta.focus(); });
    var hint = document.createElement('div');
    hint.className = 'rpt-expr-hint';
    hint.textContent = t('exprHint');
    left.appendChild(ta); left.appendChild(hint);

    var flist = document.createElement('div');
    flist.className = 'rpt-expr-fields';
    var fh = '';
    state.fields.forEach(function (f) {
      fh += '<div class="rpt-field-item" data-ins="' + esc(f.code) + '" title="' + esc(f.code) + '">' +
        esc(f.label) + '<span class="ftype">' + esc(f.type) + '</span></div>';
    });
    var tplX = currentTpl();
    if (tplX && tplX.outputUnit === 'row' && tplX.rowSubtable) {
      var rstX = state.subtables.find(function (x) { return x.code === tplX.rowSubtable; });
      if (rstX) {
        fh += '<div class="rpt-field-group">▦ ' + esc(rstX.label) + '</div>';
        rstX.fields.forEach(function (f) {
          fh += '<div class="rpt-field-item" data-ins="' + esc(f.code) + '" title="' + esc(f.code) + '">' +
            esc(f.label) + '<span class="ftype">' + esc(f.type) + '</span></div>';
        });
      }
    }
    // expressions scoped to a table (column expr / group header): show that table's row fields
    if (el && el.__fieldScope && el.__fieldScope !== '$RECORDS') {
      var scopeSt = state.subtables.find(function (x) { return x.code === el.__fieldScope; });
      if (scopeSt) {
        fh += '<div class="rpt-field-group">▦ ' + esc(scopeSt.label) + '</div>';
        scopeSt.fields.forEach(function (f) {
          fh += '<div class="rpt-field-item" data-ins="' + esc(f.code) + '" title="' + esc(f.code) + '">' +
            esc(f.label) + '<span class="ftype">' + esc(f.type) + '</span></div>';
        });
      }
    }
    fh += '<div class="rpt-field-group">SYSTEM</div>';
    fh += '<div class="rpt-field-item" data-ins="PAGE">' + esc(t('pageVar')) + '<span class="ftype">PAGE</span></div>';
    fh += '<div class="rpt-field-item" data-ins="PAGES">' + esc(t('pagesVar')) + '<span class="ftype">PAGES</span></div>';
    flist.innerHTML = fh;
    flist.querySelectorAll('[data-ins]').forEach(function (item) {
      item.addEventListener('dblclick', function () {
        var token = '{' + item.getAttribute('data-ins') + '}';
        var s0 = ta.selectionStart, s1 = ta.selectionEnd;
        ta.value = ta.value.slice(0, s0) + token + ta.value.slice(s1);
        ta.focus();
        ta.selectionStart = ta.selectionEnd = s0 + token.length;
      });
    });

    body.appendChild(left); body.appendChild(flist);
    m.box.appendChild(body);

    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-plain" data-act="cancel">' + esc(t('cancel')) + '</button>' +
      '<button type="button" class="rpt-btn-primary" data-act="ok">OK</button>';
    m.box.appendChild(foot);

    foot.querySelector('[data-act="cancel"]').addEventListener('click', m.close);
    foot.querySelector('[data-act="ok"]').addEventListener('click', function () {
      if (generic) {
        el.onOk(ta.value);
        m.close();
        return;
      }
      saveUndo();
      var v = ta.value;
      if (el.type === 'text') {
        el.text = v;
      } else {
        // single {code} token -> plain field binding; anything else -> expression
        var mm = v.trim().match(/^\{([^{}]+)\}$/);
        if (mm) { el.fieldCode = mm[1].trim(); el.expr = ''; }
        else { el.expr = v; }
      }
      markDirty(); renderCanvas(); renderProps();
      m.close();
    });
    ta.focus();
  }

  /* ---------------- help ---------------- */
  function helpBasicHtml() {
    if (LANG === 'ja') {
      return '' +
      '<h3>はじめに</h3>' +
      '<p>帳票デザイナーは、kintoneのレコードから見積書・請求書・ラベル等を自由レイアウトで印刷/PDF化するプラグインです。左のツリーからフィールドをキャンバスへドラッグして配置し、印刷はレコード詳細画面・一覧画面のボタンから行います。設定は必ず右上の<b>保存</b>で確定してください。</p>' +
      '<h3>テンプレート</h3>' +
      '<ul><li>＋で追加、⧉で複製(見積書→請求書の流用に便利)、✕で削除。名前はダブルクリックで変更。</li>' +
      '<li>ドラッグ&ドロップで並べ替え。この順序が印刷ボタンのメニュー順になります。</li>' +
      '<li>用紙サイズは A3〜B5 とカスタム(mm指定)。ラベルはカスタムで実寸を指定します。</li></ul>' +
      '<h3>要素の配置と編集</h3>' +
      '<ul><li>テキスト/フィールド/図形/画像/バーコード/QR/テーブルをツールバーから追加。</li>' +
      '<li><kbd>Ctrl</kbd>または<kbd>Shift</kbd>+クリックで複数選択。まとめて移動・削除・コピーでき、紫の枠のハンドルで全体をまとめて拡縮できます。プロパティ変更は選択中の全要素に適用されます(X/Yを揃えると整列にも使えます)。</li>' +
      '<li>テキスト/フィールドのダブルクリックで式エディタ。<code>{フィールドコード}</code>を文章に混ぜられます。</li>' +
      '<li>「自動縮小」をONにすると、文字が枠に入らない場合にフォントを自動で縮小します。</li></ul>' +
      '<h3>テーブルとフッター行</h3>' +
      '<p>サブテーブルを表として印刷します。列はサブテーブルのフィールドをテーブルへドロップして追加。合計・値引・総合計などはフッター行(レコードのフィールドを表の最下部に表示)で設定します。列幅はヘッダー行のグリップで調整、列ヘッダーのドラッグで並べ替え。</p>' +
      '<h3>条件書式</h3>' +
      '<p>要素・テーブル列の「⚡条件書式」で、値に応じて文字色/背景/太字/非表示を切り替えます。列の条件は行ごとの値で判定されます(例: 数量=0 を赤)。</p>' +
      '<h3>複数ページ(改ページ)</h3>' +
      '<p>テーブルの「改ページする」をONにすると、収まらない行が2ページ目以降に流れます。ロゴ等は「全ページ表示」をON。<code>{PAGE}</code> <code>{PAGES}</code>でページ番号を印字できます。フッター行は最終ページのみに出ます。</p>' +
      '<h3>ラベル出力(行毎)</h3>' +
      '<p>出力単位を「サブテーブル行毎」にすると、1行=1枚でラベルを出力します。対象サブテーブルのフィールドは通常のフィールドと同様に配置できます(▦印)。</p>' +
      '<h3>シート印刷(面付け)</h3>' +
      '<ul><li>「シートに面付けする」で、小さいラベルをA4等に複数配置して印刷します。</li>' +
      '<li><b>均等分割</b>: 列×行を指定して適用すると、ラベルサイズがシートを均等に分割するサイズに自動設定されます。余白や間隔を変更すると自動で再計算されます。</li>' +
      '<li><b>切り取り線</b>: 境界に点線を印字します。<b>開始位置</b>: 使いかけのラベルシートの続きから印刷できます。</li></ul>' +
      '<h3>印刷グループ(複数テンプレートの一括印刷)</h3>' +
      '<p>テンプレート一覧下の<b>「📑 印刷グループ…」</b>で、複数テンプレートをまとめた名前付きグループを作成できます(例: 加工指示書＋事務所控)。グループは印刷メニューに📑付きで表示され、メンバーを<b>1つの印刷ジョブとして連結出力</b>します(テンプレート一覧の順・先頭テンプレートの用紙設定)。詳細画面には通常テンプレートのみのグループ、一覧画面には★一覧のレコード型のみのグループが表示されます(一覧はレコード取得1回を全メンバーで共有)。テンプレートを削除するとグループから自動で外れます。</p>' +
      '<h3>PDF保存と印刷方式</h3>' +
      '<ul><li>「PDF保存先フィールド」を設定すると、印刷メニューに「📄 PDF保存」が追加され、レコードの添付ファイルへ保存します。ファイル名には<code>{フィールドコード}</code>が使えます。</li>' +
      '<li>印刷方式「PDF経由」は、印刷プレビューが用紙サイズ(ラベル寸法)通りに表示されます。プリンタドライバがA4に固定される場合に有効です。PDFビューアで「実際のサイズ」を選ぶと原寸で印刷されます。</li></ul>' +
      '<h3>ショートカット</h3>' +
      '<table>' +
      '<tr><td><kbd>Ctrl+Z</kbd> / <kbd>Ctrl+Y</kbd></td><td>元に戻す / やり直し</td></tr>' +
      '<tr><td><kbd>Ctrl+C</kbd> / <kbd>X</kbd> / <kbd>V</kbd></td><td>コピー / 切り取り / 貼り付け(複数選択対応)</td></tr>' +
      '<tr><td><kbd>Ctrl+D</kbd></td><td>複製</td></tr>' +
      '<tr><td><kbd>Delete</kbd></td><td>選択要素を削除</td></tr>' +
      '<tr><td>矢印キー</td><td>グリッド単位で移動 (<kbd>Shift</kbd>+矢印: 0.1mm)</td></tr>' +
      '<tr><td><kbd>Ctrl/Shift</kbd>+クリック</td><td>複数選択に追加/解除</td></tr>' +
      '<tr><td>右クリック</td><td>コピー・重なり順などのメニュー</td></tr>' +
      '</table>' +
      '<h3>ヒント</h3>' +
      '<ul><li>ツールバーの容量メーターは設定容量(上限256KB)の使用量です。埋め込み画像が大きいと増えます。</li>' +
      '<li>プレビュー(👁)は最新レコードのデータで全ページを表示します。⚠が出たらフィールドコードを確認してください。</li>' +
      '<li>テンプレートは書き出し/読み込みで他のアプリへ移植できます。</li></ul>';
    }
    return '' +
      '<h3>Getting started</h3><p>Drag fields from the tree onto the canvas; print from the record detail or list view button. Always press <b>Save</b> to persist settings.</p>' +
      '<h3>Templates</h3><ul><li>＋ add, ⧉ duplicate, ✕ delete, double-click to rename, drag to reorder (menu order follows).</li><li>Paper: A3-B5 or Custom (mm) for labels.</li><li><b>📑 Print groups</b> (below the template list): bundle several templates into a named group that prints as ONE combined job - shown in the print menu with 📑. Detail view lists groups of record templates; the list view lists groups of view-records templates (one shared fetch).</li></ul>' +
      '<h3>Elements</h3><ul><li><kbd>Ctrl</kbd>/<kbd>Shift</kbd>+click multi-selects; move, delete, copy together; drag the purple box handles to scale the group; property edits apply to all selected.</li><li>Double-click text/field for the expression editor; mix <code>{fieldCode}</code> with text.</li><li>"Shrink to fit" auto-reduces the font when content overflows.</li></ul>' +
      '<h3>Tables</h3><p>Drop subtable fields to add columns. Totals go in footer rows. Resize columns via header grips; drag headers to reorder.</p>' +
      '<h3>Conditional format</h3><p>⚡ per element/column: color, background, bold, hide by value; column rules evaluate per row.</p>' +
      '<h3>Multi-page</h3><p>Enable "Paginate" on the table; flag repeated elements "Show on all pages"; use <code>{PAGE}</code>/<code>{PAGES}</code>. Footers print on the last page.</p>' +
      '<h3>Labels & sheets</h3><p>Output unit "Per subtable row" prints one page per row. Sheet layout imposes labels onto A4 etc.: "Divide evenly" sizes the label automatically (margins recalc live), cut lines optional, start position resumes partial sheets.</p>' +
      '<h3>PDF</h3><p>Set a PDF attachment field to add a Save-PDF action; filename accepts <code>{fieldCode}</code>. Print method "Via PDF" keeps the paper size in print preview.</p>' +
      '<h3>Shortcuts</h3><table><tr><td><kbd>Ctrl+Z/Y</kbd></td><td>Undo/redo</td></tr><tr><td><kbd>Ctrl+C/X/V/D</kbd></td><td>Copy/cut/paste/duplicate</td></tr><tr><td><kbd>Delete</kbd></td><td>Delete selection</td></tr><tr><td>Arrows</td><td>Nudge (Shift: 0.1mm)</td></tr></table>';
  }
  function helpGroupingHtml() {
    if (LANG === 'ja') {
      return '' +
      '<h3>グループ化の基本</h3>' +
      '<p>テーブル要素を選択し、プロパティの<b>「グループ化…」</b>ボタンからダイアログを開きます。グループは<b>連続する同一値</b>で作られます(自動並び替えなし)。並び順が揃っていないデータは、レベルの「並び替え」を昇順/降順にするか、ビュー/サブテーブル側で揃えてください。数値は数値として比較されます(板厚 9 &lt; 12 &lt; 25)。</p>' +
      '<h3>複合キーとネスト</h3>' +
      '<ul><li><b>複合キー</b>: 1レベルに複数フィールド(例: 材質＋板厚)を追加すると、いずれかの値が変わった時点で新しいグループになります。ヘッダー・小計は1つです。</li>' +
      '<li><b>ネスト</b>: レベルを複数追加すると入れ子になります(レベル1: 形状 → レベル2: 板厚 など)。フッターは内側から順に閉じます。</li></ul>' +
      '<h3>グループヘッダー / フッター(集計)</h3>' +
      '<ul><li>ヘッダー式には <code>{フィールドコード}</code> と自由テキストを混在できます(例: <code>{材質} × {板厚}mm</code>)。未入力時はキー値を表示。</li>' +
      '<li>フッター行では列ごとに <b>合計/件数/平均</b> を選択。集計値は列の表示形式で整形されます。式列には「集計元」フィールドを指定します。</li>' +
      '<li>「列見出しを再表示」でグループ開始ごとに列ヘッダーを再印字できます。</li></ul>' +
      '<h3>改ページオプション</h3>' +
      '<ul><li><b>グループ毎に改ページ</b>: グループ境界で改ページし、そのページは1ページ目と同じ設計レイアウトを再描画します(加工指示書スタイル)。</li>' +
      '<li><b>グループを分割しない</b>: 残り領域に入らない場合はグループごと次ページへ(1ページを超えるグループは分割されます)。</li>' +
      '<li><b>ページまたぎ時ヘッダー再表示</b>: グループが複数ページにわたる時、続きページの先頭にヘッダーを再印字します。</li></ul>' +
      '<h3>変数(自由要素の式で使用可能)</h3>' +
      '<table>' +
      '<tr><td><code>{GROUP.コード}</code></td><td>そのページのグループキー値(グループ毎に改ページ時)</td></tr>' +
      '<tr><td><code>{GSUM.コード}</code></td><td>グループ内の合計</td></tr>' +
      '<tr><td><code>{GCOUNT}</code></td><td>グループ内の行数</td></tr>' +
      '<tr><td><code>{RCOUNT}</code></td><td>★一覧のレコード: 総件数</td></tr>' +
      '<tr><td><code>{TSUM.コード}</code></td><td>★一覧のレコード: 全件合計(テーブルフッターでも選択可)</td></tr>' +
      '</table>' +
      '<h3>★ 一覧のレコード(全件)</h3>' +
      '<p>テーブルのデータソースで選択すると、行=一覧ビューのレコードになります。列・グループ化・集計は通常フィールドでそのまま設定でき、一覧画面のボタンからビューの絞込・並び順どおりに全件を1つの帳票として印刷します(500件/リクエストで自動取得、上限10,000件)。このテンプレートはレコード詳細画面には表示されません。</p>' +
      '<h3>式列 / ヘッダー行の非表示</h3>' +
      '<ul><li>列のバインドを「式」にすると <code>{板厚}x{幅}x{長さ}</code> のような複合表示ができます。</li>' +
      '<li>テーブルの「ヘッダー行を表示」をOFFにすると列見出しを出力しません(自作ヘッダーをテキスト要素で組む場合)。</li></ul>';
    }
    return '' +
      '<h3>Grouping basics</h3>' +
      '<p>Select the table and open the <b>"Grouping…"</b> dialog from the property panel. Groups form on <b>consecutive equal values</b> (no implicit re-sort). Set the level sort to asc/desc, or pre-sort the view/subtable. Numbers compare numerically (9 &lt; 12 &lt; 25).</p>' +
      '<h3>Composite keys & nesting</h3>' +
      '<ul><li><b>Composite key</b>: multiple fields on one level (e.g. Material + Thickness) form ONE group per key combination - one header, one subtotal.</li>' +
      '<li><b>Nesting</b>: add more levels to nest (L1 Shape → L2 Thickness). Footers close innermost-first.</li></ul>' +
      '<h3>Group header / footer (totals)</h3>' +
      '<ul><li>Header expression mixes <code>{fieldCode}</code> with free text (e.g. <code>{Material} × {Thickness}mm</code>).</li>' +
      '<li>Footer rows: pick <b>Sum/Count/Avg</b> per column; values use the column format. Expression columns take a "Source" field.</li></ul>' +
      '<h3>Page options</h3>' +
      '<ul><li><b>New page per group</b>: each group re-renders the full designed page-1 layout.</li>' +
      '<li><b>Keep together</b>: whole group moves to the next page when it would split (page-sized groups still split).</li>' +
      '<li><b>Repeat header after break</b>: re-prints active group headers on continuation pages.</li></ul>' +
      '<h3>Variables</h3>' +
      '<table>' +
      '<tr><td><code>{GROUP.code}</code></td><td>group key value on that page (with new-page groups)</td></tr>' +
      '<tr><td><code>{GSUM.code}</code></td><td>sum within the group</td></tr>' +
      '<tr><td><code>{GCOUNT}</code></td><td>row count of the group</td></tr>' +
      '<tr><td><code>{RCOUNT}</code> / <code>{TSUM.code}</code></td><td>View-records source: total count / total sum</td></tr>' +
      '</table>' +
      '<h3>View records source / expression columns / header-off</h3>' +
      '<p>Data source "View records (all)" makes rows = the list view records (full paged fetch, view filter &amp; sort, cap 10,000; list view only). Column bind "Expression" allows composite cells like <code>{T}x{W}x{L}</code>. Uncheck "Show header row" to build your own header from free elements.</p>';
  }

  function helpApiHtml() {
    if (LANG === 'ja') {
      return '' +
      '<h3>JavaScript API とは</h3>' +
      '<p>このプラグインは、レコード詳細・一覧画面で <code>window.ReportDesigner</code> を公開します。同一アプリ内の別のJSカスタマイズから、保存済みテンプレートを名前で指定して印刷・レンダリング・PDF化できます。自作ボタンから複数の帳票を1つの印刷ジョブとして出力する、といった使い方が可能です。</p>' +
      '<h3>メソッド一覧</h3>' +
      '<div class="rpt-api-sig">ReportDesigner.templates() → string[]</div>' +
      '<p>保存済みテンプレート名の一覧を返します。ブラウザのコンソールで確認できます。</p>' +
      '<p><b>印刷グループ名も指定可能</b>: <code>print(&#39;指示書セット&#39;)</code> のようにグループ名を渡すと、メンバーのテンプレートに自動展開されます。</p>' +
      '<div class="rpt-api-sig">ReportDesigner.print(名前 | [名前, ...], options?) → Promise</div>' +
      '<p>テンプレートを印刷します。配列を渡すと複数テンプレートのページを結合し、<b>1つの印刷ジョブ</b>として出力します(先頭テンプレートの用紙設定・印刷方式を使用。用紙サイズの混在は不可)。</p>' +
      '<div class="rpt-api-sig">ReportDesigner.render(名前 | [名前, ...], options?) → Promise&lt;pages&gt;</div>' +
      '<p>印刷せずページオブジェクトの配列を返します。独自処理に。</p>' +
      '<div class="rpt-api-sig">ReportDesigner.pdf(名前 | [名前, ...], options?) → Promise&lt;Blob&gt;</div>' +
      '<p>PDFのBlobを返します。レコード添付への保存やダウンロードに利用できます。</p>' +
      '<h3>options とデータ解決</h3>' +
      '<table>' +
      '<tr><td><code>record</code></td><td>手元のレコードオブジェクトを使用</td></tr>' +
      '<tr><td><code>recordId</code></td><td>指定IDのレコードをREST APIで取得</td></tr>' +
      '<tr><td><code>records</code></td><td>★一覧レコード型: 取得済みレコード配列を使用</td></tr>' +
      '<tr><td><code>query</code></td><td>★一覧レコード型: 指定クエリで全件ページング取得(limit/offsetは自動管理)</td></tr>' +
      '</table>' +
      '<p>省略時: 通常テンプレートは<b>表示中のレコード</b>(詳細画面)、★一覧レコード型は<b>現在のビューの絞込・並び順</b>を使用します。テンプレート名が見つからない場合は、利用可能な名前一覧付きのエラーになります。</p>' +
      '<h3>サンプル1: ボタン1つで2帳票を印刷</h3>' +
      '<pre>kintone.events.on(&#39;app.record.detail.show&#39;, function (event) {\n' +
      '  var btn = document.createElement(&#39;button&#39;);\n' +
      '  btn.textContent = &#39;一括印刷&#39;;\n' +
      '  btn.onclick = function () {\n' +
      '    <span class="cm">// 加工指示書と事務所控を1つの印刷ジョブに結合</span>\n' +
      '    ReportDesigner.print([&#39;加工指示書&#39;, &#39;事務所控&#39;])\n' +
      '      .catch(function (e) { alert(e.message); });\n' +
      '  };\n' +
      '  kintone.app.record.getHeaderMenuSpaceElement().appendChild(btn);\n' +
      '  return event;\n' +
      '});</pre>' +
      '<h3>サンプル2: レコードIDを指定して印刷</h3>' +
      '<pre><span class="cm">// 一覧画面のカスタムボタン等、対象レコードが開かれていない場面で</span>\n' +
      'ReportDesigner.print(&#39;加工指示書&#39;, { recordId: 123 });</pre>' +
      '<h3>サンプル3: ★一覧レコード型に明示クエリ</h3>' +
      '<pre><span class="cm">// ビューに関係なく、条件と並び順を指定して集計レポートを出力</span>\n' +
      'ReportDesigner.print(&#39;材料在庫&#39;, {\n' +
      '  query: &#39;鋼材名 like "SS400" order by 板厚 asc, 幅 asc&#39;\n' +
      '});</pre>' +
      '<h3>サンプル4: PDFを生成してレコードに添付</h3>' +
      '<pre>ReportDesigner.pdf(&#39;加工指示書&#39;).then(function (blob) {\n' +
      '  var fd = new FormData();\n' +
      '  fd.append(&#39;__REQUEST_TOKEN__&#39;, kintone.getRequestToken());\n' +
      '  fd.append(&#39;file&#39;, blob, &#39;report.pdf&#39;);\n' +
      '  return fetch(&#39;/k/v1/file.json&#39;, { method: &#39;POST&#39;, body: fd })\n' +
      '    .then(function (r) { return r.json(); });\n' +
      '}).then(function (resp) {\n' +
      '  <span class="cm">// resp.fileKey をレコード更新APIで添付フィールドへ</span>\n' +
      '});</pre>' +
      '<h3>注意事項</h3>' +
      '<ul><li>APIはプラグインのJSが読み込まれる画面(詳細・一覧)で利用できます。</li>' +
      '<li>複数テンプレート結合時は先頭テンプレートの用紙設定を使用します。</li>' +
      '<li>★一覧レコード型のクエリ取得は500件/リクエスト、上限10,000件です。</li></ul>';
    }
    return '' +
      '<h3>JavaScript API</h3>' +
      '<p>The plugin exposes <code>window.ReportDesigner</code> on record detail and list views, so other customizations in the same app can print saved templates by name - e.g. one custom button printing two reports as a single job.</p>' +
      '<div class="rpt-api-sig">ReportDesigner.templates() → string[]</div>' +
      '<div class="rpt-api-sig">ReportDesigner.print(name | [names], options?) → Promise</div>' +
      '<p>Arrays combine several templates into ONE print job (first template&#39;s paper settings; mixed paper sizes unsupported). <b>Print group names resolve too</b> and expand to their members.</p>' +
      '<div class="rpt-api-sig">ReportDesigner.render(name | [names], options?) → Promise&lt;pages&gt;</div>' +
      '<div class="rpt-api-sig">ReportDesigner.pdf(name | [names], options?) → Promise&lt;Blob&gt;</div>' +
      '<h3>Options &amp; data resolution</h3>' +
      '<table>' +
      '<tr><td><code>record</code></td><td>use a record object you already have</td></tr>' +
      '<tr><td><code>recordId</code></td><td>fetch the record via REST API</td></tr>' +
      '<tr><td><code>records</code></td><td>view-records templates: use your own array</td></tr>' +
      '<tr><td><code>query</code></td><td>view-records templates: paged fetch with this query</td></tr>' +
      '</table>' +
      '<p>Defaults: normal templates use the open detail record; view-records templates use the current view. Unknown names reject with the list of available names.</p>' +
      '<h3>Example: one button, two reports</h3>' +
      '<pre>kintone.events.on(&#39;app.record.detail.show&#39;, function (event) {\n' +
      '  var btn = document.createElement(&#39;button&#39;);\n' +
      '  btn.textContent = &#39;Print all&#39;;\n' +
      '  btn.onclick = function () {\n' +
      '    ReportDesigner.print([&#39;WorkOrder&#39;, &#39;OfficeCopy&#39;])\n' +
      '      .catch(function (e) { alert(e.message); });\n' +
      '  };\n' +
      '  kintone.app.record.getHeaderMenuSpaceElement().appendChild(btn);\n' +
      '  return event;\n' +
      '});</pre>' +
      '<h3>Example: PDF blob</h3>' +
      '<pre>ReportDesigner.pdf(&#39;WorkOrder&#39;, { recordId: 123 }).then(function (blob) {\n' +
      '  <span class="cm">// upload via /k/v1/file.json, then attach fileKey to a record</span>\n' +
      '});</pre>';
  }

  function helpHtml(tab) {
    if (tab === 'grouping') return helpGroupingHtml();
    if (tab === 'api') return helpApiHtml();
    return helpBasicHtml();
  }

  function openHelp() {
    var m = modalShell('？ ' + (LANG === 'ja' ? 'ヘルプ' : 'Help') + ' - Report Designer v' + VERSION);
    m.box.style.width = '760px'; m.box.style.maxHeight = '85vh';
    var tabs = document.createElement('div');
    tabs.className = 'rpt-help-tabs';
    var defs = [
      { id: 'basic', l: LANG === 'ja' ? '基本' : 'Basics' },
      { id: 'grouping', l: LANG === 'ja' ? 'グループ化・並び替え' : 'Grouping & sort' },
      { id: 'api', l: 'JavaScript API' }];
    var body = document.createElement('div');
    body.className = 'rpt-help-body';
    function show(id) {
      body.innerHTML = helpHtml(id);
      body.scrollTop = 0;
      tabs.querySelectorAll('.rpt-help-tab').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-tab') === id);
      });
    }
    defs.forEach(function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rpt-help-tab';
      b.setAttribute('data-tab', d.id);
      b.textContent = d.l;
      b.addEventListener('click', function () { show(d.id); });
      tabs.appendChild(b);
    });
    m.box.appendChild(tabs);
    m.box.appendChild(body);
    show('basic');
    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-primary" data-act="ok">OK</button>';
    foot.querySelector('[data-act="ok"]').addEventListener('click', m.close);
    m.box.appendChild(foot);
  }

  /* ---------------- preview ---------------- */
  function fetchSampleRecord() {
    var appId = kintone.app.getId();
    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET',
      { app: appId, query: 'order by $id desc limit 1' })
      .then(function (resp) { return (resp.records && resp.records[0]) || null; })
      .catch(function () { return null; });
  }
  function fetchSampleRecords(n) {
    var appId = kintone.app.getId();
    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET',
      { app: appId, query: 'order by $id desc limit ' + (n || 100) })
      .then(function (resp) { return resp.records || []; })
      .catch(function () { return []; });
  }

  function openPreview() {
    var tpl = currentTpl();
    if (!tpl) { alert(t('noTpl')); return; }
    var m = modalShell('👁 ' + t('preview') + ' - ' + tpl.name);
    m.box.style.width = '90vw'; m.box.style.height = '90vh';

    var note = document.createElement('div');
    note.style.cssText = 'font-size:12px;color:#888;margin-bottom:6px;';
    note.textContent = t('previewLoading');
    m.box.appendChild(note);

    var scroll = document.createElement('div');
    scroll.className = 'rpt-preview-scroll';
    m.box.appendChild(scroll);

    var foot = document.createElement('div');
    foot.className = 'rpt-modal-foot';
    foot.innerHTML = '<button type="button" class="rpt-btn-plain" data-act="close">' + esc(t('close')) + '</button>';
    m.box.appendChild(foot);
    foot.querySelector('[data-act="close"]').addEventListener('click', m.close);

    var isRecMode = RPTC.usesRecordsSource(tpl);
    (isRecMode
      ? fetchSampleRecords(100).then(function (records) { return RPTC.recordsToRec(records); })
      : fetchSampleRecord()
    ).then(function (rec) {
      var missing = RPTC.missingFieldCodes(tpl, rec || {});
      var msgs = [];
      if (isRecMode) msgs.push(t('previewRecords').replace('{n}', (rec && rec.RCOUNT && rec.RCOUNT.value) || '0'));
      else if (rec) msgs.push(t('previewUsing').replace('{id}', (rec.$id && rec.$id.value) || '?'));
      else msgs.push(t('noRecordSample'));
      if (missing.length) msgs.push('⚠ ' + t('missingCodes') + missing.join(', '));
      note.textContent = msgs.join('　');
      note.style.color = missing.length ? '#c0392b' : '#888';
      return RPTC.renderPages(tpl, rec || {}, state.images).then(function (allPages) {
        var CAP = 20;
        var pages = allPages.slice(0, CAP);
        if (allPages.length > CAP) {
          note.textContent += '　' + t('previewCapped').replace('{n}', CAP);
        }
        var d = RPTC.effectivePaperDims(tpl);
        pages.forEach(function (page, i) {
          if (allPages.length > 1) {
            var cap = document.createElement('div');
            cap.style.cssText = 'text-align:center;color:#eee;font-size:12px;margin:8px 0 4px;';
            cap.textContent = t('previewPage') + ' ' + (i + 1) + ' / ' + allPages.length;
            scroll.appendChild(cap);
          }
          var pageDiv = document.createElement('div');
          pageDiv.className = 'rpt-preview-page';
          pageDiv.style.width = d.w + 'mm';
          pageDiv.style.height = d.h + 'mm';
          pageDiv.innerHTML = page.html;
          scroll.appendChild(pageDiv);
          RPTC.injectImages(pageDiv, page.images);
        });
      });
    }).catch(function (e) {
      console.error(e);
      note.textContent = String(e && e.message || e);
    });
  }

  /* ---------------- save / load ---------------- */
  function loadConfig() {
    var conf = kintone.plugin.app.getConfig(PLUGIN_ID) || {};
    state.buttonLabel = conf.buttonLabel || (LANG === 'ja' ? '帳票出力' : 'Print report');
    // migrate legacy global showListButton -> per-template showInList
    var legacyHideList = conf.showListButton === 'false';
    state.templates.forEach(function (tp) {
      if (tp.showInList == null) tp.showInList = !legacyHideList;
    });
    try {
      state.templates = conf.templates ? JSON.parse(conf.templates) : [];
    } catch (e) { state.templates = []; }
    try {
      state.templateGroups = conf.templateGroups ? JSON.parse(conf.templateGroups) : [];
    } catch (e) { state.templateGroups = []; }
    state.images = RPTC.reassembleImages(conf);
    try {
      state.templates.forEach(function (tp) {
        (tp.elements || []).forEach(function (e) {
          if (e.type === 'table' && e.columns) {
            e.columns = e.columns.filter(function (c) { return !!c; }); // drop corrupt entries
            if (e.columns.length) syncTableW(e);
          }
        });
      });
    } catch (err) {
      console.error('[ReportDesigner] template migration failed (continuing):', err);
    }
    if (state.templates.length) state.selectedTemplateId = state.templates[0].id;
  }
  function usedImages() {
    var used = {};
    state.templates.forEach(function (tp) {
      (tp.elements || []).forEach(function (e) {
        if (e.type === 'image' && e.bindType === 'embed' && e.imageId && state.images[e.imageId]) {
          used[e.imageId] = state.images[e.imageId];
        }
      });
    });
    return used;
  }
  function buildConf() {
    var chunked = RPTC.chunkImages(usedImages());
    // prune group members whose template no longer exists
    var liveIds = {};
    state.templates.forEach(function (tp) { liveIds[tp.id] = true; });
    var groupsOut = (state.templateGroups || []).map(function (g) {
      return { name: g.name, ids: (g.ids || []).filter(function (id) { return liveIds[id]; }) };
    }).filter(function (g) { return g.name && g.ids.length >= 2; });
    var conf = {
      templates: JSON.stringify(state.templates),
      templateGroups: JSON.stringify(groupsOut),
      buttonLabel: state.buttonLabel || '',
      imagesMeta: JSON.stringify(chunked.meta)
    };
    Object.keys(chunked.keys).forEach(function (k) { conf[k] = chunked.keys[k]; });
    return conf;
  }
  // Recompress any embedded image over the per-image budget. cb(recompressedCount)
  function recompressOversized(cb) {
    var ids = Object.keys(usedImages()).filter(function (id) {
      return (state.images[id] || '').length > RPTC.IMG_TARGET_CHARS;
    });
    if (!ids.length) { cb(0); return; }
    var left = ids.length, count = 0;
    ids.forEach(function (id) {
      var mime = (String(state.images[id]).match(/^data:([^;]+);/) || [])[1] || 'image/jpeg';
      compressImage(state.images[id], mime, function (out) {
        if (out) { state.images[id] = out; count++; }
        left--;
        if (left <= 0) cb(count);
      });
    });
  }
  function showBusy(msg) {
    hideBusy();
    var ov = document.createElement('div');
    ov.id = 'rpt-busy';
    ov.className = 'rpt-modal-overlay';
    ov.innerHTML = '<div class="rpt-busy-box"><div class="rpt-spinner"></div><div style="margin-top:10px;font-size:13px;color:#444;">' + esc(msg) + '</div></div>';
    document.body.appendChild(ov);
  }
  function hideBusy() {
    var ov = $('rpt-busy');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  }
  function updateUsageMeter() {
    var el = $('usage-label');
    var conf = buildConf();
    var total = RPTC.configTotalBytes(conf);
    var kb = Math.ceil(total / 1024), maxKb = Math.floor(RPTC.CONFIG_TOTAL_BUDGET / 1024);
    var pct = total / RPTC.CONFIG_TOTAL_BUDGET;
    if (el) {
      el.textContent = kb + '/' + maxKb + 'KB';
      el.style.color = pct > 1 ? '#c0392b' : pct > 0.8 ? '#d68910' : '#888';
    }
    // detailed breakdown always available for diagnosis
    console.log('[ReportDesigner v' + VERSION + '] config usage', kb + 'KB /', maxKb + 'KB', RPTC.configBreakdown(conf).slice(0, 8));
    return { conf: conf, total: total, kb: kb, maxKb: maxKb };
  }
  function saveConfig() {
    if (JSON.stringify(state.templates).length > CONFIG_LIMIT) { alert(t('tooBig')); return; }
    showBusy(t('saving'));
    recompressOversized(function (n) {
      var u = updateUsageMeter();
      if (u.total > RPTC.CONFIG_TOTAL_BUDGET) {
        hideBusy();
        var detail = RPTC.configBreakdown(u.conf).slice(0, 6).map(function (b) {
          return '  ' + b.key + ': ' + b.kb + 'KB';
        }).join('\n');
        alert(t('cfgOver').replace('{cur}', u.kb).replace('{max}', u.maxKb).replace('{detail}', detail));
        setStatus(t('cfgUsage') + ': ' + u.kb + 'KB / ' + u.maxKb + 'KB');
        return;
      }
      kintone.plugin.app.setConfig(u.conf, function () {
        hideBusy();
        state.dirty = false;
        setStatus(t('saved') + (n ? ' (' + t('imgRecompressed') + ')' : '') +
          ' - ' + t('cfgUsage') + ': ' + u.kb + 'KB / ' + u.maxKb + 'KB');
      });
    });
  }

  /* ---------------- init ---------------- */
  function cacheEls() {
    els.statusMsg = $('status-msg');
    els.templateList = $('template-list');
    els.fieldPalette = $('field-palette');
    els.fieldSearch = $('field-search');
    if (els.fieldSearch) els.fieldSearch.placeholder = t('searchPh');
    els.paper = $('rpt-paper');
    els.page = $('rpt-page');
    els.grid = $('rpt-grid');
    els.elements = $('rpt-elements');
    els.guides = $('rpt-guides');
    els.propsBody = $('props-body');
    els.propsTitle = $('props-title');
    els.chkSnap = $('chk-snap');
    els.chkGrid = $('chk-grid');
    els.selGrid = $('sel-gridsize');
    els.zoomLabel = $('zoom-label');
  }
  function applyI18nLabels() {
    var lg = document.querySelector('.rpt-logo');
    if (lg) { lg.innerHTML = ''; lg.style.display = 'none'; }
    var map = {
      'i18n-title': 'title', 'i18n-snap': 'snap', 'i18n-grid': 'grid',
      'i18n-templates': 'templates', 'i18n-add-template': 'addTemplate',
      'i18n-fields': 'dataSource', 'i18n-preview': 'preview', 'props-title': 'properties',
      'i18n-export': 'exportTpl', 'i18n-import': 'importTpl'
    };
    Object.keys(map).forEach(function (id) {
      var n = $(id); if (n) n.textContent = t(map[id]);
    });
    $('btn-save').textContent = t('save');
    $('btn-cancel').textContent = t('cancel');
  }
  function initToolbar() {
    $('btn-add-text').addEventListener('click', function () { armAdd('text', 'btn-add-text'); });
    $('btn-add-rect').addEventListener('click', function () { armAdd('rect', 'btn-add-rect'); });
    $('btn-add-line').addEventListener('click', function () { armAdd('line', 'btn-add-line'); });
    $('btn-add-image').addEventListener('click', function () { armAdd('image', 'btn-add-image'); });
    $('btn-add-ellipse').addEventListener('click', function () { armAdd('ellipse', 'btn-add-ellipse'); });
    $('btn-add-barcode').addEventListener('click', function () { addElement('barcode'); });
    $('btn-add-qr').addEventListener('click', function () { addElement('qr'); });
    $('btn-add-table').addEventListener('click', function () { addElement('table'); });
    $('btn-preview').addEventListener('click', openPreview);
    $('btn-help').addEventListener('click', openHelp);
    $('btn-undo').addEventListener('click', undo);
    $('btn-redo').addEventListener('click', redo);
    $('btn-zoom-in').addEventListener('click', function () {
      state.zoom = Math.min(2, round1(state.zoom + 0.25)); renderCanvas();
    });
    $('btn-zoom-out').addEventListener('click', function () {
      state.zoom = Math.max(0.25, round1(state.zoom - 0.25)); renderCanvas();
    });
    els.chkGrid.addEventListener('change', renderCanvas);
    els.selGrid.addEventListener('change', function () {
      var tpl = currentTpl(); if (!tpl) return;
      tpl.grid = tpl.grid || {};
      tpl.grid.size = Number(els.selGrid.value) || 5;
      markDirty(); renderCanvas();
    });
    els.fieldSearch.addEventListener('input', renderFieldPalette);
    $('btn-add-template').addEventListener('click', addTemplate);
    $('btn-export-tpl').addEventListener('click', exportTemplate);
    $('btn-import-tpl').addEventListener('click', importTemplate);
    $('btn-save').addEventListener('click', saveConfig);
    $('btn-cancel').addEventListener('click', function () { history.back(); });
  }

  function init() {
    cacheEls();
    ensureColorPalette();
    applyI18nLabels();
    loadConfig();
    initToolbar();
    initCanvasDnD();
    initKeyboard();
    loadFields().then(function () {
      renderFieldPalette();
      refreshTemplateList();
      var tpl = currentTpl();
      if (tpl && tpl.grid && tpl.grid.size) els.selGrid.value = String(tpl.grid.size);
      renderCanvas();
      renderProps();
      updateUsageMeter();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(kintone.$PLUGIN_ID);