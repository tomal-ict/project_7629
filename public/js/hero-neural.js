/* ============================================================
   HERO — DEEP NEURAL CORE (v3)
   Advanced digital AI visualization, fully procedural:
   • 3D tumbling neural lattice (Fibonacci sphere + KNN edges)
   • live signals racing along edges with glow trails
   • true 3D orbit rings with comets
   • binary code-rain backdrop + holographic floor grid
   • energy shockwaves, scan sweep, telemetry ticker
   • live AI metrics + mouse parallax
   No pictures — pure canvas math.
   ============================================================ */
(function () {
  'use strict';

  var canvas = document.querySelector('.hero-neural-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var reduced = false;
  try { reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 468, H = 468, CX = 234, CY = 236, R = 154;
  var running = false, raf = 0, startT = 0, tick = 0;
  var PAR = { x: 0, y: 0, tx: 0, ty: 0 };

  var PAL = [
    [6, 182, 212],   /* cyan   */
    [37, 99, 235],   /* blue   */
    [79, 70, 229],   /* indigo */
    [124, 58, 237],  /* violet */
    [16, 185, 129]   /* emerald*/
  ];
  var CORE0 = [14, 165, 233];   /* vivid cyan core */

  /* ============ geometry ============ */
  var NODES = [], LINKS = [], SIGS = [];
  var LAT_R = 0.66;               /* lattice radius as fraction of R */

  function buildLattice() {
    var n = 168;
    var ga = Math.PI * (3 - Math.sqrt(5));
    NODES = [];
    for (var i = 0; i < n; i++) {
      var yv = 1 - (i / (n - 1)) * 2;          /* -1..1 */
      var rad = Math.sqrt(Math.max(0, 1 - yv * yv));
      var th = ga * i;
      var depth = 0.5 + 0.5 * Math.abs(yv);    /* polar denser */
      NODES.push({
        x: Math.cos(th) * rad,
        y: yv * 0.94,
        z: Math.sin(th) * rad,
        col: mixCol(CORE0, [139, 92, 246], depth * 0.55)
      });
    }
    /* KNN edges (cap degree 4) */
    var deg = new Array(n).fill(0);
    LINKS = [];
    var cands = [];
    for (i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var dx = NODES[i].x - NODES[j].x;
        var dy = NODES[i].y - NODES[j].y;
        var dz = NODES[i].z - NODES[j].z;
        cands.push([i, j, dx * dx + dy * dy + dz * dz]);
      }
    }
    cands.sort(function (a, b) { return a[2] - b[2]; });
    for (i = 0; i < cands.length; i++) {
      var a = cands[i][0], b = cands[i][1];
      if (deg[a] >= 4 || deg[b] >= 4) continue;
      LINKS.push([a, b]);
      deg[a]++; deg[b]++;
    }
  }

  function mixCol(c1, c2, t) {
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * t),
      Math.round(c1[1] + (c2[1] - c1[1]) * t),
      Math.round(c1[2] + (c2[2] - c1[2]) * t)
    ];
  }

  /* 3D rings — each defined by a tilt axis; tumble with the lattice */
  var RINGDEF = [
    { r: 1.28, axis: [1, 0.4, 0.2], spin: 0.55, col: [6, 182, 212] },
    { r: 1.60, axis: [-0.4, 1, 0.3], spin: -0.4, col: [79, 70, 229] },
    { r: 1.92, axis: [0.3, -0.5, 1], spin: 0.3, col: [16, 185, 129] }
  ];

  /* ============ projection ============ */
  var PROJ = { rotY: 0, tiltX: 0.44 };
  function project(n, o) {
    var ry = PROJ.rotY;
    var cyR = Math.cos(ry), syR = Math.sin(ry);
    var x1 = n.x * cyR + n.z * syR;
    var z1 = -n.x * syR + n.z * cyR;
    var tx = PROJ.tiltX;
    var cx = Math.cos(tx), sx = Math.sin(tx);
    var y2 = n.y * cx - z1 * sx;
    var z2 = n.y * sx + z1 * cx;
    var d = 2.6;
    var sc = d / (d - z2) * LAT_R * R;
    return {
      sx: CX + x1 * sc,
      sy: CY - y2 * sc,
      z: z2
    };
  }

  /* ============ matrix rain backdrop ============ */
  var RAIN = [];
  function buildRain() {
    RAIN = [];
    var cols = Math.floor(W / 18);
    for (var i = 0; i < cols; i++) {
      RAIN.push({ x: i * 18 + 5, head: Math.random() * H, len: 8 + (Math.random() * 14 | 0), v: 0.5 + Math.random() * 1.2 });
    }
  }

  function drawRain(t) {
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    for (var i = 0; i < RAIN.length; i++) {
      var c = RAIN[i];
      c.head += c.v;
      if (c.head > H + c.len * 10) c.head = -c.len * 6;
      for (var k = 0; k < c.len; k++) {
        var yy = c.head - k * 10;
        if (yy < 0 || yy > H) continue;
        var a = Math.max(0, 1 - k / c.len);
        var lead = k === 0;
        ctx.globalAlpha = lead ? 0.75 * a : 0.30 * a * (0.5 + 0.5 * Math.sin(i * 7.3 + tick / 4));
        ctx.fillStyle = lead ? 'rgba(2,132,199,1)' : 'rgba(6,182,212,1)';
        ctx.fillText((hash(i + k * 3, k) & 1) ? '1' : '0', c.x, yy);
      }
    }
    ctx.globalAlpha = 1;
  }

  function hash(a, b) {
    a = (a + b * 7919) | 0;
    a = ((a ^ 61) ^ (a >> 16)) | 0;
    a = ((a + (a << 3)) ^ (a >> 4)) | 0;
    a = (a + (a << 5)) | 0;
    return a < 0 ? -a : a;
  }

  /* ============ floor grid ============ */
  function drawFloor() {
    ctx.strokeStyle = 'rgba(2,132,199,0.10)';
    ctx.lineWidth = 1;
    var vy = CY + R * 0.55;
    ctx.beginPath();
    for (var x = -1.2; x <= 1.2; x += 0.3) {
      ctx.moveTo(CX + x * R * 0.4, vy - R * 0.05);
      ctx.lineTo(CX + x * R * 1.7, H + 4);
    }
    ctx.stroke();
    ctx.beginPath();
    for (var yy = 0; yy <= 4; yy++) {
      var k = yy / 4;
      var yk = vy + (H - vy) * Math.pow(k, 1.6);
      ctx.moveTo(CX - R * (0.35 + 1.2 * k), yk);
      ctx.lineTo(CX + R * (0.35 + 1.2 * k), yk);
    }
    ctx.stroke();
  }

  /* ============ lattice ============ */
  function drawLattice(t) {
    var n = NODES.length;
    var P = new Array(n);
    for (var i = 0; i < n; i++) P[i] = project(NODES[i], i);

    /* edges */
    ctx.lineWidth = 0.8;
    for (i = 0; i < LINKS.length; i++) {
      var a = LINKS[i][0], b = LINKS[i][1];
      var depth = clamp((P[a].z + P[b].z) / 2 * 0.62 + 0.5, 0, 1);
      ctx.strokeStyle = 'rgba(37,99,235,' + (0.08 + depth * 0.35).toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(P[a].sx, P[a].sy);
      ctx.lineTo(P[b].sx, P[b].sy);
      ctx.stroke();
    }

    /* nodes (depth sorted far→near) */
    var order = new Array(n);
    for (i = 0; i < n; i++) order[i] = i;
    order.sort(function (x, y) { return P[x].z - P[y].z; });

    ctx.globalCompositeOperation = 'source-over';
    for (i = 0; i < n; i++) {
      var idx = order[i];
      var d = clamp(P[idx].z * 0.62 + 0.5, 0, 1);
      var c = NODES[idx].col;
      var pr = (0.8 + d * 1.7) * (0.4 + Math.min(W, H) / 1100);
      ctx.globalAlpha = 0.30 + d * 0.65;
      ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
      ctx.fillRect(P[idx].sx - pr / 2, P[idx].sy - pr / 2, pr, pr);
      if (d > 0.72) {
        ctx.globalAlpha = (d - 0.72) * 0.55;
        ctx.fillStyle = 'rgba(224,246,255,1)';
        ctx.beginPath();
        ctx.arc(P[idx].sx, P[idx].sy, pr * 1.4, 0, 6.2832);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ============ signals ============ */
  function spawnSignal() {
    if (!LINKS.length || SIGS.length > 7) return;
    var l = LINKS[(Math.random() * LINKS.length) | 0];
    SIGS.push({
      a: l[0], b: l[1],
      t: Math.random() * 0.5,
      v: 0.006 + Math.random() * 0.011,
      col: PAL[(Math.random() * PAL.length) | 0]
    });
  }

  function drawSignals(t) {
    for (var i = SIGS.length - 1; i >= 0; i--) {
      var s = SIGS[i];
      s.t += s.v;
      if (s.t >= 1) { SIGS.splice(i, 1); continue; }
      var Pa = project(NODES[s.a], 0);
      var Pb = project(NODES[s.b], 0);
      var e = clamp(s.t, 0, 1);
      var x = Pa.sx + (Pb.sx - Pa.sx) * e;
      var y = Pa.sy + (Pb.sy - Pa.sy) * e;
      var g = ctx.createRadialGradient(x, y, 0, x, y, 9);
      g.addColorStop(0, 'rgba(' + s.col[0] + ',' + s.col[1] + ',' + s.col[2] + ',0.85)');
      g.addColorStop(1, 'rgba(' + s.col[0] + ',' + s.col[1] + ',' + s.col[2] + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, 6.2832);
      ctx.fill();
      /* deep head for contrast on light bg */
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, 6.2832);
      ctx.fill();
      ctx.strokeStyle = 'rgba(' + s.col[0] + ',' + s.col[1] + ',' + s.col[2] + ',0.9)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, 6.2832);
      ctx.stroke();
    }
  }

  /* ============ 3D orbit rings with comets ============ */
  function ringPoint(D, u) {
    var ax = D.axis[0], ay = D.axis[1], az = D.axis[2];
    var al = Math.sqrt(ax * ax + ay * ay + az * az);
    ax /= al; ay /= al; az /= al;
    var u2 = -az + Math.sin(u) * 0; /* dummy to keep axis stable */
    var ox = 1, oy = 0, oz = 0;
    var dot = ax * ox + ay * oy + az * oz;
    var rx = ox - ax * dot, ry = oy - ay * dot, rz = oz - az * dot;
    var rl = Math.sqrt(rx * rx + ry * ry + rz * rz);
    if (rl < 1e-4) { rx = 0; ry = 1; rz = 0; rl = 1; }
    rx /= rl; ry /= rl; rz /= rl;
    var cx2 = ay * rz - az * ry, cy2 = az * rx - ax * rz, cz2 = ax * ry - ay * rx;
    var cu = Math.cos(u), su = Math.sin(u);
    return {
      x: (rx * cu + cx2 * su) * D.r,
      y: (ry * cu + cy2 * su) * D.r,
      z: (rz * cu + cz2 * su) * D.r
    };
  }

  function drawRings(t) {
    for (var k = 0; k < RINGDEF.length; k++) {
      var D = RINGDEF[k];
      var base = 'rgba(' + D.col[0] + ',' + D.col[1] + ',' + D.col[2] + ',';
      var SEGS = 72;
      var pts = new Array(SEGS);
      for (var i = 0; i < SEGS; i++) {
        pts[i] = project(ringPoint(D, i / SEGS * Math.PI * 2), 0);
      }
      /* dashed segments, brightness by front/back */
      ctx.lineWidth = 1;
      for (i = 0; i < SEGS; i += 2) {
        var p1 = pts[i], p2 = pts[(i + 1) % SEGS];
        var dIt = clamp((p1.z + p2.z) * 0.5 * 0.62 + 0.5, 0, 1);
        ctx.strokeStyle = base + (0.16 + dIt * 0.7).toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
      /* comet: satellite + trail */
      var ph = t * D.spin * 1.2 + k * 2.4;
      for (var tr = 6; tr >= 0; tr--) {
        var tp = project(ringPoint(D, ph - tr * 0.055), 0);
        var ta = Math.pow(0.68, tr);
        ctx.globalAlpha = tr === 0 ? 1 : ta * 0.55;
        ctx.fillStyle = tr === 0 ? base + '1)' : base + '0.7)';
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, tr === 0 ? 2.6 : 0.5 + ta * 1.5, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  /* ============ central star core ============ */
  function drawStar(t) {
    var cr = R * 0.17;
    var pulse = 1 + 0.09 * Math.sin(t * 2.1);
    var g = ctx.createRadialGradient(CX, CY, 0, CX, CY, cr * pulse * 2.4);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.2, 'rgba(14,165,233,0.75)');
    g.addColorStop(0.5, 'rgba(37,99,235,0.30)');
    g.addColorStop(1, 'rgba(37,99,235,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(CX, CY, cr * pulse * 2.4, 0, 6.2832);
    ctx.fill();
    /* sparkle cross */
    var sA = t * 0.4;
    for (var a = 0; a < 2; a++) {
      var ang = sA + a * Math.PI / 2;
      ctx.strokeStyle = 'rgba(14,116,144,0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(CX + Math.cos(ang) * cr * 0.4, CY + Math.sin(ang) * cr * 0.4);
      ctx.lineTo(CX + Math.cos(ang) * cr * pulse * 1.8, CY + Math.sin(ang) * cr * pulse * 1.8);
      ctx.stroke();
    }
  }

  /* ============ shockwaves ============ */
  var WAVES = [];
  function spawnWave() {
    if (WAVES.length > 2) return;
    WAVES.push({ r: R * 0.28, v: R * 2.2, a: 0.5, col: PAL[(Math.random() * PAL.length) | 0] });
  }
  function drawWaves(ts) {
    ts = ts || 1;
    for (var i = WAVES.length - 1; i >= 0; i--) {
      var w = WAVES[i];
      w.r += w.v * 0.016;
      w.a *= 0.965;
      if (w.a < 0.02 || w.r > R * 1.55) { WAVES.splice(i, 1); continue; }
      ctx.globalAlpha = w.a;
      ctx.strokeStyle = 'rgba(' + w.col[0] + ',' + w.col[1] + ',' + w.col[2] + ',0.9)';
      ctx.lineWidth = 2.2 * w.a + 0.3;
      ctx.beginPath();
      ctx.arc(CX, CY, w.r, 0, 6.2832);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ============ scan sweep ============ */
  function drawScan(t) {
    var y = ((t * 0.22) % 1) * (H * 1.1) - H * 0.05;
    var g = ctx.createLinearGradient(0, y - 26, 0, y);
    g.addColorStop(0, 'rgba(14,165,233,0)');
    g.addColorStop(1, 'rgba(14,165,233,0.22)');
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 26, W, 26);
  }

  /* ============ telemetry ticker ============ */
  var TICK_STR = null, TICK_AT = 0;
  function telemetry(ts) {
    if (!TICK_STR || ts - TICK_AT > 1500) {
      TICK_AT = ts;
      TICK_STR = 'REALTIME  RX ' + (11 + Math.random() * 5).toFixed(1) + ' Gb/s  TX ' +
        (7 + Math.random() * 4).toFixed(1) + ' Gb/s  MEM ' + (30 + Math.random() * 50 | 0) + '%  HIT ' +
        (87 + Math.random() * 12).toFixed(1) + '%  NODES ' + (8200 + Math.random() * 700 | 0) +
        '  LAT ' + (8 + Math.random() * 14 | 0) + 'ms  ACC ' + (97 + Math.random() * 3).toFixed(1) + '%  ';
      var pad = '---- ';
      TICK_STR = pad + TICK_STR + pad + TICK_STR;
    }
    return TICK_STR;
  }

  function drawTicker(t) {
    var txt = telemetry(t * 1000);
    ctx.font = '8px monospace';
    ctx.textAlign = 'left';
    var w = ctx.measureText(txt).width;
    var off = (t * 30) % (w / 2);
    ctx.fillStyle = 'rgba(2,132,199,0.7)';
    ctx.fillText(txt, -off, H - 8);
    ctx.fillText(txt, w / 2 - off, H - 8);
  }

  /* ============ HUD brackets ============ */
  function drawHud() {
    var off = 14, m = 8;
    var corners = [[off, off], [W - off, off], [off, H - off], [W - off, H - off]];
    ctx.strokeStyle = 'rgba(30,64,175,0.55)';
    ctx.lineWidth = 1.2;
    for (var i = 0; i < 4; i++) {
      var x = corners[i][0], y = corners[i][1];
      ctx.beginPath();
      ctx.moveTo(x - m, y); ctx.lineTo(x + m, y);
      ctx.moveTo(x, y - m); ctx.lineTo(x, y + m);
      ctx.stroke();
    }
  }

  /* ============ metrics ============ */
  function $m(sel) { return document.querySelector(sel); }
  var elNodes = $m('[data-nodes]');
  var elLoad = $m('[data-load]');
  var elSync = $m('[data-sync]');
  var baseNodes = 8200, nodes = 8300;
  var loadVal = 42, loadTarget = 42, syncVal = 14;

  function updateMetrics(t) {
    if (elNodes) {
      nodes += (Math.random() - 0.42) * 46;
      nodes = Math.max(baseNodes, Math.min(baseNodes + 780, nodes));
      elNodes.textContent = Math.round(nodes).toLocaleString('en-US');
    }
    if (Math.random() < 0.025) loadTarget = 15 + Math.random() * 80;
    loadVal += (loadTarget - loadVal) * 0.03;
    if (elLoad) elLoad.textContent = Math.round(loadVal) + '%';
    syncVal = Math.max(7, Math.min(32, syncVal + (Math.random() - 0.5) * 4));
    if (elSync) elSync.innerHTML = Math.round(syncVal) + '<span>ms</span>';
  }

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ============ frame ============ */
  function render(t) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(PAR.x * R * 0.035, PAR.y * R * 0.035);

    PROJ.rotY = t * 0.3;
    PROJ.tiltX = 0.44 + 0.08 * Math.sin(t * 0.21) + PAR.y * 0.4;

    drawRain(t);
    drawFloor();
    drawScan(t);
    drawRings(t);
    drawLattice(t);
    drawSignals(t);
    drawStar(t);
    drawWaves(t);
    drawTicker(t);
    drawHud();

    tick++;
    if (tick % 6 === 0) spawnSignal();
    if (tick % 90 === 0) spawnWave();
    if (tick % 3 === 0) updateMetrics(t);
    ctx.restore();
  }

  /* ============ lifecycle ============ */
  function loop(ts) {
    if (!running) return;
    if (!startT) startT = ts;
    if (!document.hidden) {
      PAR.x += (PAR.tx - PAR.x) * 0.05;
      PAR.y += (PAR.ty - PAR.y) * 0.05;
      render((ts - startT) / 1000);
    }
    raf = window.requestAnimationFrame(loop);
  }

  function startNow() { if (!running) { running = true; if (!raf) raf = window.requestAnimationFrame(loop); } }
  function stopNow() { running = false; cancelAnimationFrame(raf); raf = 0; }

  function resize() {
    W = canvas.clientWidth || 468;
    H = canvas.clientHeight || 468;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    CX = W / 2;
    CY = H / 2 + H * 0.015;
    R = Math.min(W, H) * 0.33;
    if (reduced) render(0);
  }

  buildLattice();
  buildRain();
  resize();

  if (window.IntersectionObserver && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var vis = entry.isIntersecting && !document.hidden;
        if (vis && !running) startNow();
        else if (!vis && running) stopNow();
      });
    }, { threshold: 0.05 });
    io.observe(canvas);
    setTimeout(startNow, 400);
  } else if (!reduced) {
    startNow();
  } else {
    render(0);
  }

  window.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    PAR.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.3;
    PAR.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
  });

  window.addEventListener('resize', function () { resize(); });
})();