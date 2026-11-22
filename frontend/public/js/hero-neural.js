/* ============================================================
   ABC AI SYSTEM — 3D CYBER-CRYSTAL & AUTONOMOUS ROBOTIC PERCEPTION CORE (v6)
   Next-Gen Clean Sci-Fi Visualization:
   • 3D Polyhedral Geodesic Crystal (Nested Icosahedron & Dodecahedron)
   • Data Packets (Photons) gliding smoothly along crystalline neural struts
   • Robotic Sensor Iris with Mechanical Aperture & Interactive Mouse Pupil Tracking
   • Concentric Gyroscopic Armature Rings with Angle Marks & Comet Satellites
   • Harmonic Neural Reasoning Waveform (Sinusoidal transformer frequency ring)
   • Soft 360° LiDAR Spatial Sweep (Dynamic optical illumination)
   • Clean, Minimalist High-Precision HUD — Zero visual clutter, pure mathematical beauty.
   ============================================================ */
(function (global) {
  'use strict';

  var cleanupActiveAnimation = null;

  function initHeroNeural() {
    if (cleanupActiveAnimation) {
      cleanupActiveAnimation();
      cleanupActiveAnimation = null;
    }

    var canvas = document.querySelector('.hero-neural-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var reduced = false;
    try {
      reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 470, H = 470, CX = 235, CY = 235;
    var running = false, raf = 0, startT = 0;
    var MOUSE = { x: 0, y: 0, tx: 0, ty: 0, pupilX: 0, pupilY: 0 };

    /* ============ 1. MATHEMATICAL 3D ICOSAHEDRON (CYBER-CRYSTAL) ============ */
    var PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio ~1.618
    var RAW_VERTS = [
      [-1,  PHI, 0], [ 1,  PHI, 0], [-1, -PHI, 0], [ 1, -PHI, 0],
      [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
      [ PHI, 0, -1], [ PHI, 0,  1], [-PHI, 0, -1], [-PHI, 0,  1]
    ];

    // Normalize vertices to unit sphere
    var VERTS = [];
    for (var i = 0; i < RAW_VERTS.length; i++) {
      var v = RAW_VERTS[i];
      var len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      VERTS.push([v[0] / len, v[1] / len, v[2] / len]);
    }

    // Connect edges between all vertex pairs with distance ~ 1.051
    var EDGES = [];
    for (i = 0; i < VERTS.length; i++) {
      for (var j = i + 1; j < VERTS.length; j++) {
        var dx = VERTS[i][0] - VERTS[j][0];
        var dy = VERTS[i][1] - VERTS[j][1];
        var dz = VERTS[i][2] - VERTS[j][2];
        var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist > 0.95 && dist < 1.15) {
          EDGES.push([i, j]);
        }
      }
    }

    // Inner Core Octahedron (Nested Transformer Lattice)
    var INNER_RAW = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ];
    var INNER_EDGES = [
      [0, 2], [2, 1], [1, 3], [3, 0], // Equator
      [4, 0], [4, 1], [4, 2], [4, 3], // Top pyramid
      [5, 0], [5, 1], [5, 2], [5, 3]  // Bottom pyramid
    ];

    /* ============ 2. DATA PACKET PHOTONS GLIDING ON EDGES ============ */
    var PACKETS = [];
    for (var p = 0; p < 14; p++) {
      PACKETS.push({
        edge: Math.floor(Math.random() * EDGES.length),
        prog: Math.random(),
        spd: 0.008 + Math.random() * 0.012,
        forward: Math.random() > 0.5,
        col: p % 2 === 0 ? [6, 182, 212] : [96, 165, 250]
      });
    }

    /* ============ 3. 3D PROJECTION WITH SPRING PARALLAX ============ */
    function project3D(x, y, z, rotX, rotY, rotZ, scale) {
      // Rotation around X
      var cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      var y1 = y * cosX - z * sinX;
      var z1 = y * sinX + z * cosX;

      // Rotation around Y
      var cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      var x2 = x * cosY + z1 * sinY;
      var z2 = -x * sinY + z1 * cosY;

      // Rotation around Z
      var cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
      var x3 = x2 * cosZ - y1 * sinZ;
      var y3 = x2 * sinZ + y1 * cosZ;

      // Perspective projection
      var cameraDist = 3.2;
      var fov = cameraDist / (cameraDist - z2 * 0.7);
      return {
        px: CX + x3 * scale * fov,
        py: CY - y3 * scale * fov,
        z: z2,
        fov: fov
      };
    }

    /* ============ 4. DRAWING MODULES ============ */

    // Module A: High-Precision Futuristic HUD & Corner Reticles
    function drawHudReticle() {
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
      ctx.lineWidth = 1;

      var pad = 16;
      var bLen = 12;

      // Corner Precision Brackets
      ctx.beginPath();
      // TL
      ctx.moveTo(pad, pad + bLen); ctx.lineTo(pad, pad); ctx.lineTo(pad + bLen, pad);
      // TR
      ctx.moveTo(W - pad - bLen, pad); ctx.lineTo(W - pad, pad); ctx.lineTo(W - pad, pad + bLen);
      // BL
      ctx.moveTo(pad, H - pad - bLen); ctx.lineTo(pad, H - pad); ctx.lineTo(pad + bLen, H - pad);
      // BR
      ctx.moveTo(W - pad - bLen, H - pad); ctx.lineTo(W - pad, H - pad); ctx.lineTo(W - pad, H - pad - bLen);
      ctx.stroke();

      // Outer Fine Circular Grid Markings
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.beginPath();
      ctx.arc(CX, CY, 195, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    // Module B: 3D Outer Gyroscopic Gimbal Rings with Degree Marks
    function drawGimbalRings(t) {
      ctx.save();

      // Ring 1: Calibrated Major Orbit
      var r1 = 168;
      var tilt1 = 0.45 + MOUSE.y * 0.15;
      var spin1 = t * 0.25;

      ctx.beginPath();
      var pts = 64;
      for (var k = 0; k <= pts; k++) {
        var phi = (k / pts) * Math.PI * 2;
        var rx = Math.cos(phi) * r1;
        var rz = Math.sin(phi) * r1;
        var ry = rz * Math.sin(tilt1);
        rz = rz * Math.cos(tilt1);

        var p = project3D(rx / r1, ry / r1, rz / r1, 0, spin1, 0, r1);
        if (k === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Calibrated Angle Ticks on Ring 1
      for (var deg = 0; deg < 12; deg++) {
        var theta = (deg / 12) * Math.PI * 2;
        var rx1 = Math.cos(theta) * (r1 - 4);
        var rz1 = Math.sin(theta) * (r1 - 4);
        var ry1 = rz1 * Math.sin(tilt1);
        rz1 = rz1 * Math.cos(tilt1);
        var p1 = project3D(rx1 / r1, ry1 / r1, rz1 / r1, 0, spin1, 0, r1);

        var rx2 = Math.cos(theta) * (r1 + 4);
        var rz2 = Math.sin(theta) * (r1 + 4);
        var ry2 = rz2 * Math.sin(tilt1);
        rz2 = rz2 * Math.cos(tilt1);
        var p2 = project3D(rx2 / r1, ry2 / r1, rz2 / r1, 0, spin1, 0, r1);

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      // Orbiting Satellite Beacon on Ring 1
      var satPhi = spin1 * 2.2;
      var sx = Math.cos(satPhi) * r1;
      var sz = Math.sin(satPhi) * r1;
      var sy = sz * Math.sin(tilt1);
      sz = sz * Math.cos(tilt1);
      var sp = project3D(sx / r1, sy / r1, sz / r1, 0, spin1, 0, r1);

      // Satellite Glow
      var satGlow = ctx.createRadialGradient(sp.px, sp.py, 0, sp.px, sp.py, 10);
      satGlow.addColorStop(0, 'rgba(6, 182, 212, 0.95)');
      satGlow.addColorStop(0.4, 'rgba(37, 99, 235, 0.4)');
      satGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = satGlow;
      ctx.beginPath();
      ctx.arc(sp.px, sp.py, 10, 0, Math.PI * 2);
      ctx.fill();

      // Satellite Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sp.px, sp.py, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Ring 2: Counter-Rotating Secondary Dashed Ring
      var r2 = 142;
      var tilt2 = -0.38 + MOUSE.y * 0.12;
      var spin2 = -t * 0.18;

      ctx.beginPath();
      for (k = 0; k <= pts; k++) {
        phi = (k / pts) * Math.PI * 2;
        rx = Math.cos(phi) * r2;
        rz = Math.sin(phi) * r2;
        ry = rz * Math.sin(tilt2);
        rz = rz * Math.cos(tilt2);

        p = project3D(rx / r2, ry / r2, rz / r2, 0, spin2, 0, r2);
        if (k === 0) ctx.moveTo(p.px, p.py);
        else ctx.lineTo(p.px, p.py);
      }
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    }

    // Module C: Harmonic Sinusoidal Neural Reasoning Waveform Ring
    function drawHarmonicWaveRing(t) {
      ctx.save();
      var baseR = 118;
      var segments = 72;
      ctx.beginPath();

      for (var s = 0; s <= segments; s++) {
        var theta = (s / segments) * Math.PI * 2;
        var wave = Math.sin(theta * 6 + t * 2.8) * 4.5 + Math.cos(theta * 3 - t * 1.6) * 3;
        var curR = baseR + wave;
        var wx = Math.cos(theta) * curR;
        var wy = Math.sin(theta) * curR * 0.42; // Tilted perspective
        var px = CX + wx;
        var py = CY + wy;

        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      var waveGrad = ctx.createLinearGradient(CX - baseR, CY, CX + baseR, CY);
      waveGrad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      waveGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.55)');
      waveGrad.addColorStop(1, 'rgba(6, 182, 212, 0.4)');

      ctx.strokeStyle = waveGrad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    }

    // Module D: Soft Robotic 360° LiDAR Spatial Sweep
    function drawLidarSweep(t) {
      ctx.save();
      var sweepAng = t * 1.8;
      var sweepR = 155;

      // Soft Semi-Transparent Cone
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.arc(CX, CY, sweepR, sweepAng - 0.42, sweepAng, false);
      ctx.closePath();

      var coneGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, sweepR);
      coneGrad.addColorStop(0, 'rgba(6, 182, 212, 0.16)');
      coneGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.06)');
      coneGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = coneGrad;
      ctx.fill();

      // Crisp Leading Edge
      var lx = CX + Math.cos(sweepAng) * sweepR;
      var ly = CY + Math.sin(sweepAng) * sweepR;
      var lineGrad = ctx.createLinearGradient(CX, CY, lx, ly);
      lineGrad.addColorStop(0, 'rgba(16, 185, 129, 0.85)');
      lineGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineTo(lx, ly);
      ctx.stroke();

      ctx.restore();
    }

    // Module E: 3D Crystalline Geodesic Core (Icosahedron & Octahedron)
    function drawCyberCrystal(t) {
      var rotX = 0.35 + MOUSE.y * 0.45;
      var rotY = t * 0.45 + MOUSE.x * 0.55;
      var rotZ = t * 0.12;
      var crystalR = 86;

      // Project Outer Vertices
      var projVerts = [];
      for (var i = 0; i < VERTS.length; i++) {
        var v = VERTS[i];
        projVerts.push(project3D(v[0], v[1], v[2], rotX, rotY, rotZ, crystalR));
      }

      // Draw Outer Edges (Struts)
      ctx.save();
      for (var e = 0; e < EDGES.length; e++) {
        var edge = EDGES[e];
        var p1 = projVerts[edge[0]];
        var p2 = projVerts[edge[1]];
        var midZ = (p1.z + p2.z) * 0.5;
        var depthAlpha = Math.max(0.12, (midZ + 1.2) / 2.4);

        var edgeGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        edgeGrad.addColorStop(0, 'rgba(6, 182, 212, ' + (depthAlpha * 0.75) + ')');
        edgeGrad.addColorStop(0.5, 'rgba(147, 197, 253, ' + (depthAlpha * 0.95) + ')');
        edgeGrad.addColorStop(1, 'rgba(37, 99, 235, ' + (depthAlpha * 0.75) + ')');

        ctx.strokeStyle = edgeGrad;
        ctx.lineWidth = 1.0 + depthAlpha * 0.6;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      // Draw Data Packet Photons gliding along edges
      for (var pk = 0; pk < PACKETS.length; pk++) {
        var pkt = PACKETS[pk];
        pkt.prog += pkt.spd;
        if (pkt.prog >= 1.0) {
          pkt.prog = 0.0;
          pkt.edge = Math.floor(Math.random() * EDGES.length);
        }

        var curEdge = EDGES[pkt.edge];
        var nA = projVerts[pkt.forward ? curEdge[0] : curEdge[1]];
        var nB = projVerts[pkt.forward ? curEdge[1] : curEdge[0]];

        var curX = nA.px + (nB.px - nA.px) * pkt.prog;
        var curY = nA.py + (nB.py - nA.py) * pkt.prog;
        var curZ = nA.z + (nB.z - nA.z) * pkt.prog;
        var pAlpha = Math.max(0.2, (curZ + 1.2) / 2.4);

        ctx.fillStyle = 'rgba(' + pkt.col.join(',') + ', ' + pAlpha + ')';
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // White core spark
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(curX, curY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Outer Vertices (Nodes)
      for (var vIdx = 0; vIdx < projVerts.length; vIdx++) {
        var pv = projVerts[vIdx];
        var vDepth = Math.max(0.35, (pv.z + 1.2) / 2.4);
        var nodeR = 2.8 * vDepth;

        // Subtle soft halo
        ctx.fillStyle = 'rgba(6, 182, 212, ' + (vDepth * 0.45) + ')';
        ctx.beginPath();
        ctx.arc(pv.px, pv.py, nodeR * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Luminous Node Core
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.arc(pv.px, pv.py, nodeR, 0, Math.PI * 2);
        ctx.fill();

        // High photon center
        if (pv.z > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pv.px, pv.py, nodeR * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Inner Core Octahedron (Dual nested transformer crystal)
      var innerR = 44;
      var innerProj = [];
      for (var inIdx = 0; inIdx < INNER_RAW.length; inIdx++) {
        var iv = INNER_RAW[inIdx];
        innerProj.push(project3D(iv[0], iv[1], iv[2], -rotX * 0.8, -rotY * 0.8, -rotZ, innerR));
      }

      for (var ie = 0; ie < INNER_EDGES.length; ie++) {
        var iEdge = INNER_EDGES[ie];
        var ip1 = innerProj[iEdge[0]];
        var ip2 = innerProj[iEdge[1]];
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ip1.px, ip1.py);
        ctx.lineTo(ip2.px, ip2.py);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Module F: Robotic Sensor Iris & Interactive Tracking Pupil
    function drawRoboticPupilCore(t) {
      ctx.save();

      // Smooth spring pupil tracking
      MOUSE.pupilX += (MOUSE.tx * 14 - MOUSE.pupilX) * 0.08;
      MOUSE.pupilY += (MOUSE.ty * 14 - MOUSE.pupilY) * 0.08;

      var eyeCX = CX + MOUSE.pupilX;
      var eyeCY = CY + MOUSE.pupilY;

      // 1. Quantum Singularity Corona
      var coronaR = 26 + Math.sin(t * 3.5) * 2;
      var corona = ctx.createRadialGradient(eyeCX, eyeCY, 0, eyeCX, eyeCY, coronaR * 2.2);
      corona.addColorStop(0, 'rgba(6, 182, 212, 0.95)');
      corona.addColorStop(0.35, 'rgba(37, 99, 235, 0.55)');
      corona.addColorStop(0.7, 'rgba(139, 92, 246, 0.2)');
      corona.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(eyeCX, eyeCY, coronaR * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Mechanical Aperture Blade Ring (Breathes gently)
      var bladeR = 18 + Math.sin(t * 2.0) * 1.5;
      var blades = 8;
      var bSpin = t * 0.6;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1.2;
      for (var b = 0; b < blades; b++) {
        var ang = bSpin + (b / blades) * Math.PI * 2;
        var bx1 = eyeCX + Math.cos(ang) * (bladeR * 0.45);
        var by1 = eyeCY + Math.sin(ang) * (bladeR * 0.45);
        var bx2 = eyeCX + Math.cos(ang + 0.55) * (bladeR * 1.15);
        var by2 = eyeCY + Math.sin(ang + 0.55) * (bladeR * 1.15);
        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(bx2, by2);
        ctx.stroke();
      }

      // 3. Ultra-Bright Focal Pupil
      var pupilGlow = ctx.createRadialGradient(eyeCX, eyeCY, 0, eyeCX, eyeCY, 8);
      pupilGlow.addColorStop(0, '#ffffff');
      pupilGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.9)');
      pupilGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = pupilGlow;
      ctx.beginPath();
      ctx.arc(eyeCX, eyeCY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Sharp white photon center
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeCX, eyeCY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Module G: Minimalist Clean Telemetry Footer HUD
    function drawTelemetryFooter(t) {
      ctx.save();
      var textY = H - 22;

      ctx.fillStyle = 'rgba(3, 105, 161, 0.7)';
      ctx.font = '700 8.5px "Plus Jakarta Sans", monospace';
      ctx.textAlign = 'center';

      var ms = (11 + Math.sin(t * 2) * 1.2).toFixed(0);
      var text = '● CYBER·ROBOTIC CORE // DETERMINISTIC // ' + ms + 'ms INFERENCE // ON-PREMISE AIRGAPPED';
      ctx.fillText(text, CX, textY);

      ctx.restore();
    }

    /* ============ 5. MAIN ANIMATION LOOP ============ */
    function render(t) {
      ctx.clearRect(0, 0, W, H);

      drawHudReticle();
      drawGimbalRings(t);
      drawHarmonicWaveRing(t);
      drawLidarSweep(t);
      drawCyberCrystal(t);
      drawRoboticPupilCore(t);
      drawTelemetryFooter(t);
    }

    function loop(ts) {
      if (!running) return;
      if (!startT) startT = ts;
      if (!document.hidden) {
        MOUSE.x += (MOUSE.tx - MOUSE.x) * 0.05;
        MOUSE.y += (MOUSE.ty - MOUSE.y) * 0.05;
        render((ts - startT) / 1000);
      }
      raf = window.requestAnimationFrame(loop);
    }

    function startNow() {
      if (!running) {
        running = true;
        if (!raf) raf = window.requestAnimationFrame(loop);
      }
    }

    function stopNow() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function resize() {
      W = canvas.clientWidth || 470;
      H = canvas.clientHeight || 470;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      CX = W / 2;
      CY = H / 2;
      ctx.scale(DPR, DPR);
      if (reduced) render(0);
    }

    resize();

    // Mouse Tracking Event Listener
    function onPointerMove(e) {
      var r = canvas.getBoundingClientRect();
      MOUSE.tx = ((e.clientX - r.left) / r.width - 0.5) * 1.5;
      MOUSE.ty = ((e.clientY - r.top) / r.height - 0.5) * 1.5;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    if (window.IntersectionObserver && !reduced) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var vis = entry.isIntersecting && !document.hidden;
          if (vis && !running) startNow();
          else if (!vis && running) stopNow();
        });
      }, { threshold: 0.05 });
      io.observe(canvas);
      setTimeout(startNow, 150);
    } else if (!reduced) {
      startNow();
    } else {
      render(0);
    }

    cleanupActiveAnimation = function () {
      stopNow();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
    };
  }

  // Global Registration
  global.initHeroNeuralAnimation = initHeroNeural;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroNeural);
  } else {
    initHeroNeural();
  }
})(typeof window !== 'undefined' ? window : this);
