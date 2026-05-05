'use client'

import { useEffect, useState } from 'react'

const TOGETHER_DATE = new Date(2015, 4, 6, 11, 0, 0)
const WEDDING_DATE  = new Date(2017, 4, 6, 11, 0, 0)

const FILHAS = [
  { nome: 'Helena',     sobrenome: 'Evangelista Oliveira', nascimento: new Date(2018, 4, 1),  foto: '/9anos/filha1.jpg', emoji: '🌸' },
  { nome: 'Maria Livia', sobrenome: 'Evangelista Oliveira', nascimento: new Date(2020, 2, 6),  foto: '/9anos/filha2.jpg', emoji: '💜' },
  { nome: 'Maíte',     sobrenome: 'Evangelista Oliveira', nascimento: new Date(2024, 8, 2),  foto: '/9anos/filha3.jpg', emoji: '⭐' },
]

function calcIdade(nasc: Date): string {
  const now = new Date()
  let years = now.getFullYear() - nasc.getFullYear()
  let months = now.getMonth() - nasc.getMonth()
  if (now.getDate() < nasc.getDate()) months--
  if (months < 0) { years--; months += 12 }
  if (years === 0) return `${months} ${months === 1 ? 'mês' : 'meses'}`
  if (years < 2)   return `${years} ano e ${months} ${months === 1 ? 'mês' : 'meses'}`
  return `${years} anos`
}

// ✏️ Carrosseis — coloque as fotos em public/9anos/
// Carossel 1 (namoro/casal): a01.jpg … a12.jpg
// Carossel 2 (família/casamento): b01.jpg … b12.jpg
// Carossel 3 (filhas): c01.jpg … c12.jpg
const make = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/9anos/${prefix}${String(i + 1).padStart(2, '0')}.jpg`)

const CAR1 = make('a', 20) // casal / namoro
const CAR2 = make('b', 20) // família / casamento
const CAR3 = make('c', 17) // filhas

interface Period { years: number; months: number; days: number; totalDays: number }
interface TimeElapsed { namoro: Period; casamento: Period; hours: number; minutes: number; seconds: number }

function calcPeriod(from: Date, now: Date): Period {
  const totalDays = Math.floor((now.getTime() - from.getTime()) / 86400000)
  let years = now.getFullYear() - from.getFullYear()
  let months = now.getMonth() - from.getMonth()
  let days = now.getDate() - from.getDate()
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate() }
  if (months < 0) { years--; months += 12 }
  return { years, months, days, totalDays }
}

function calcTime(): TimeElapsed {
  const now = new Date()
  const totalSeconds = Math.floor((now.getTime() - TOGETHER_DATE.getTime()) / 1000)
  return {
    namoro:    calcPeriod(TOGETHER_DATE, now),
    casamento: calcPeriod(WEDDING_DATE, now),
    hours:   Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  }
}

function CarItem({ src }: { src: string }) {
  const [err, setErr] = useState(false)
  return (
    <div className="car-item" style={err ? { background: 'rgba(232,160,191,0.04)', display:'flex', alignItems:'center', justifyContent:'center' } : {}}>
      {!err
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={src} alt="" onError={() => setErr(true)} />
        : <span style={{ fontSize: 24, opacity: 0.2 }}>📷</span>
      }
    </div>
  )
}

function Carousel({ srcs, dir, label }: { srcs: string[]; dir: 'left' | 'right'; label: string }) {
  const all = [...srcs, ...srcs] // duplica para loop infinito
  return (
    <div className="car-section fi">
      {label && <div className="car-label">{label}</div>}
      <div className="car-outer">
        <div className={`car-track car-${dir}`}>
          {all.map((src, i) => <CarItem key={i} src={src} />)}
        </div>
      </div>
    </div>
  )
}

function FilhaFoto({ src, nome }: { src: string; nome: string }) {
  const [err, setErr] = useState(false)
  return (
    <div className="filha-foto">
      {!err
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={src} alt={nome} onError={() => setErr(true)} />
        : <div className="filha-foto-ph">👶</div>
      }
    </div>
  )
}

type Heart = { id: number; x: number; size: number; delay: number; dur: number; emoji: string }

export default function NoveAnos() {
  const [time, setTime] = useState<TimeElapsed | null>(null)
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    setTime(calcTime())
    const emojis = ['❤️', '🌸', '✨', '💕', '🌺']
    setHearts(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 18 + 10,
        delay: Math.random() * 10,
        dur: Math.random() * 7 + 9,
        emoji: emojis[i % emojis.length],
      }))
    )

    const interval = setInterval(() => setTime(calcTime()), 1000)

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    setTimeout(() => {
      document.querySelectorAll('.fi').forEach(el => observer.observe(el))
    }, 100)

    return () => { clearInterval(interval); observer.disconnect() }
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Sacramento&family=Lato:wght@300;400&display=swap');

        .lp *, .lp *::before, .lp *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp {
          min-height: 100vh;
          background: #070710;
          color: #f0e6ff;
          font-family: 'Lato', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Corações flutuantes ── */
        .hf {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          animation: floatUp linear infinite;
          opacity: 0;
          will-change: transform;
        }
        @keyframes floatUp {
          0%   { transform: translateY(105vh) rotate(0deg);   opacity: 0;   }
          8%   { opacity: 0.45; }
          92%  { opacity: 0.18; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }

        /* ── Hero ── */
        .hero {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 20px 80px;
          position: relative;
          background: radial-gradient(ellipse at 50% 40%, #1c0a35 0%, #070710 68%);
          overflow: hidden;
        }
        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 18%, rgba(255,255,255,0.12) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 45% 65%, rgba(255,255,255,0.1) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.08) 0%, transparent 100%),
            radial-gradient(1px 1px at 12% 75%, rgba(255,255,255,0.1) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 60% 85%, rgba(255,255,255,0.12) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        .hero-nine {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(130px, 42vw, 230px);
          font-weight: 700;
          line-height: 0.85;
          background: linear-gradient(135deg, #e8a0bf 0%, #f4c95d 48%, #e8a0bf 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: shimmer 5s linear infinite;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 40px rgba(232,160,191,0.3));
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .hero-anos {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(13px, 4.5vw, 19px);
          font-weight: 300;
          letter-spacing: 0.55em;
          text-transform: uppercase;
          color: #f4c95d;
          margin-top: -6px;
          position: relative;
          z-index: 1;
        }

        .hero-div {
          width: 70px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e8a0bf, transparent);
          margin: 22px auto;
          position: relative;
          z-index: 1;
        }

        .hero-names {
          font-family: 'Sacramento', cursive;
          font-size: clamp(38px, 13vw, 68px);
          color: #f0e6ff;
          position: relative;
          z-index: 1;
          text-shadow: 0 0 50px rgba(232,160,191,0.45), 0 0 100px rgba(232,160,191,0.2);
          line-height: 1.1;
        }

        .hero-city {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(11px, 3vw, 14px);
          color: #5a4a6a;
          letter-spacing: 0.3em;
          margin-top: 8px;
          position: relative;
          z-index: 1;
        }
        .hero-date {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(11px, 3.2vw, 15px);
          color: #7a6b8a;
          letter-spacing: 0.35em;
          margin-top: 18px;
          position: relative;
          z-index: 1;
        }

        .scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2.2s ease-in-out infinite;
          color: #4a3a5a;
          font-size: 22px;
          z-index: 1;
        }
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(9px); }
        }

        /* ── Contador ── */
        .counter-sec {
          padding: 64px 20px 56px;
          text-align: center;
          background: #0b0818;
        }

        .sec-script {
          font-family: 'Sacramento', cursive;
          font-size: clamp(26px, 8vw, 40px);
          color: #e8a0bf;
          display: block;
          margin-bottom: 4px;
        }
        .sec-upper {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10px, 3vw, 14px);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #4a3a5a;
          display: block;
          margin-bottom: 40px;
        }

        .counter-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          max-width: 360px;
          margin: 0 auto 20px;
        }
        .c-item {
          background: rgba(232,160,191,0.05);
          border: 1px solid rgba(232,160,191,0.14);
          border-radius: 16px;
          padding: 22px 8px 18px;
        }
        .c-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 11vw, 56px);
          font-weight: 700;
          background: linear-gradient(135deg, #e8a0bf, #f4c95d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          display: block;
        }
        .c-lbl {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #4a3a5a;
          margin-top: 6px;
          display: block;
        }

        .clock-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 6vw, 28px);
          color: #2e2440;
          margin-top: 14px;
        }
        .clock-row span { color: #e8a0bf; font-weight: 600; }
        .clock-row .sep { color: #3a2a4a; margin: 0 1px; }

        .total-line {
          margin-top: 22px;
          font-size: 12px;
          color: #3a2a4a;
          letter-spacing: 0.08em;
        }
        .total-line strong { color: #f4c95d; }

        .period-block {
          max-width: 360px;
          margin: 0 auto 8px;
          background: rgba(232,160,191,0.04);
          border: 1px solid rgba(232,160,191,0.12);
          border-radius: 20px;
          padding: 24px 20px 20px;
        }
        .period-tag {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(14px, 4vw, 17px);
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #e8a0bf;
          margin-bottom: 4px;
        }
        .period-since {
          font-size: 10px;
          letter-spacing: 0.25em;
          color: #3a2a4a;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .c-item-gold {
          background: rgba(244,201,93,0.06) !important;
          border-color: rgba(244,201,93,0.18) !important;
        }
        .c-num-gold {
          background: linear-gradient(135deg, #f4c95d, #e8a0bf) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        .period-divider {
          text-align: center;
          color: #2e2040;
          font-size: 18px;
          margin: 16px 0;
          display: block;
        }

        /* ── Carta ── */
        .letter-sec {
          padding: 60px 20px;
          max-width: 480px;
          margin: 0 auto;
        }
        .letter-card {
          background: linear-gradient(145deg, #130b22 0%, #0e0618 100%);
          border: 1px solid rgba(244,201,93,0.14);
          border-radius: 22px;
          padding: 42px 28px 36px;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,160,191,0.04);
        }
        .letter-card::before {
          content: '❝';
          position: absolute;
          top: -18px;
          left: 24px;
          font-size: 56px;
          color: rgba(232,160,191,0.15);
          font-family: Georgia, serif;
          line-height: 1;
        }
        .letter-to {
          font-family: 'Sacramento', cursive;
          font-size: 30px;
          color: #e8a0bf;
          margin-bottom: 22px;
        }
        .letter-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17.5px;
          line-height: 1.95;
          color: #baafc6;
          font-style: italic;
        }
        .letter-sign {
          font-family: 'Sacramento', cursive;
          font-size: 34px;
          color: #f4c95d;
          text-align: right;
          margin-top: 26px;
        }

        /* ── Carrosseis ── */
        .carousels-sec {
          padding: 60px 0 64px;
          background: #0b0818;
          overflow: hidden;
        }
        .carousels-sec > .fi { padding: 0 16px; }

        .car-section { margin-bottom: 28px; }
        .car-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(11px, 3vw, 13px);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #3a2a4a;
          padding: 0 16px;
          margin-bottom: 12px;
        }
        .car-outer {
          overflow: hidden;
          width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 60px, black calc(100% - 60px), transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, black 60px, black calc(100% - 60px), transparent 100%);
        }
        .car-track {
          display: flex;
          gap: 10px;
          width: max-content;
          padding: 4px 0;
        }
        .car-left  { animation: carLeft  28s linear infinite; }
        .car-right { animation: carRight 28s linear infinite; }
        @keyframes carLeft  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes carRight { from { transform: translateX(-50%); } to { transform: translateX(0);    } }

        .car-item {
          width: 130px;
          height: 174px;
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(232,160,191,0.15);
          background: rgba(232,160,191,0.04);
        }
        .car-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        /* ── Final ── */
        .final-sec {
          padding: 80px 24px 100px;
          text-align: center;
          background: radial-gradient(ellipse at 50% 60%, #1c0a35 0%, #070710 70%);
        }
        .heart-big {
          font-size: 60px;
          animation: hb 1.6s ease-in-out infinite;
          display: block;
          margin: 0 auto 28px;
        }
        @keyframes hb {
          0%,100% { transform: scale(1); }
          14%      { transform: scale(1.22); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.12); }
          70%      { transform: scale(1); }
        }
        .final-quote {
          font-family: 'Sacramento', cursive;
          font-size: clamp(30px, 10vw, 52px);
          color: #f0e6ff;
          line-height: 1.4;
          text-shadow: 0 0 50px rgba(232,160,191,0.4);
        }
        .final-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #3a2a4a;
          margin-top: 24px;
        }

        /* ── Filhas ── */
        .filhas-sec {
          padding: 60px 16px 64px;
          background: #070710;
        }
        .filhas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          max-width: 480px;
          margin: 0 auto;
        }
        .filha-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }
        .filha-foto-wrap {
          position: relative;
          margin-bottom: 4px;
        }
        .filha-foto {
          width: clamp(88px, 26vw, 120px);
          height: clamp(88px, 26vw, 120px);
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(232,160,191,0.35);
          background: rgba(232,160,191,0.05);
          box-shadow: 0 0 24px rgba(232,160,191,0.15);
        }
        .filha-foto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .filha-foto-ph {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
        }
        .filha-emoji {
          position: absolute;
          bottom: 2px;
          right: 2px;
          font-size: 18px;
          background: #070710;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(232,160,191,0.2);
        }
        .filha-nome {
          font-family: 'Sacramento', cursive;
          font-size: clamp(18px, 5.5vw, 26px);
          color: #e8a0bf;
          line-height: 1.1;
        }
        .filha-sobrenome {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(8px, 2.2vw, 11px);
          color: #3a2a4a;
          letter-spacing: 0.05em;
          line-height: 1.3;
        }
        .filha-nasc {
          font-size: clamp(8px, 2vw, 10px);
          color: #f4c95d;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }
        .filha-idade {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(11px, 3vw, 14px);
          color: #7a6b8a;
          font-style: italic;
        }

        /* ── Fade in on scroll ── */
        .fi {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .fi.visible { opacity: 1; transform: translateY(0); }
        .fi.d1 { transition-delay: 0.1s; }
        .fi.d2 { transition-delay: 0.2s; }
        .fi.d3 { transition-delay: 0.3s; }
        .fi.d4 { transition-delay: 0.4s; }
        .fi.d5 { transition-delay: 0.5s; }
      `}</style>

      <div className="lp">
        {/* Corações flutuantes */}
        {hearts.map(h => (
          <div
            key={h.id}
            className="hf"
            style={{
              left: `${h.x}%`,
              bottom: -50,
              fontSize: h.size,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.dur}s`,
            }}
          >
            {h.emoji}
          </div>
        ))}

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-nine">11</div>
          <div className="hero-anos">Anos de Amor</div>
          <div className="hero-div" />
          <div className="hero-names">Tiago &amp; Nathalia</div>
          <div className="hero-date">💑 namoro: 06 · 05 · 2015 &nbsp;·&nbsp; 💍 casamento: 06 · 05 · 2017</div>
          <div className="hero-city">📍 Umuarama · PR</div>
          <div className="scroll-hint">↓</div>
        </section>

        {/* ── Contador ── */}
        <section className="counter-sec">
          <div className="fi">
            <span className="sec-script">Nossa história em números</span>
            <span className="sec-upper">cada segundo conta</span>
          </div>

          {time && (
            <>
              {/* Bloco Namoro */}
              <div className="period-block fi d1">
                <div className="period-tag">💑 Namorando</div>
                <div className="period-since">desde 06 · 05 · 2015</div>
                <div className="counter-grid" style={{ marginBottom: 0 }}>
                  <div className="c-item">
                    <span className="c-num">{time.namoro.years}</span>
                    <span className="c-lbl">Anos</span>
                  </div>
                  <div className="c-item">
                    <span className="c-num">{time.namoro.months}</span>
                    <span className="c-lbl">Meses</span>
                  </div>
                  <div className="c-item">
                    <span className="c-num">{time.namoro.days}</span>
                    <span className="c-lbl">Dias</span>
                  </div>
                </div>
                <div className="total-line" style={{ marginTop: 12 }}>
                  <strong>{time.namoro.totalDays.toLocaleString('pt-BR')}</strong> dias juntos
                </div>
              </div>

              {/* Divisor */}
              <div className="period-divider fi d2">✦</div>

              {/* Bloco Casamento */}
              <div className="period-block fi d2">
                <div className="period-tag">💍 Casados</div>
                <div className="period-since">desde 06 · 05 · 2017</div>
                <div className="counter-grid" style={{ marginBottom: 0 }}>
                  <div className="c-item c-item-gold">
                    <span className="c-num c-num-gold">{time.casamento.years}</span>
                    <span className="c-lbl">Anos</span>
                  </div>
                  <div className="c-item c-item-gold">
                    <span className="c-num c-num-gold">{time.casamento.months}</span>
                    <span className="c-lbl">Meses</span>
                  </div>
                  <div className="c-item c-item-gold">
                    <span className="c-num c-num-gold">{time.casamento.days}</span>
                    <span className="c-lbl">Dias</span>
                  </div>
                </div>
                <div className="total-line" style={{ marginTop: 12 }}>
                  <strong>{time.casamento.totalDays.toLocaleString('pt-BR')}</strong> dias de casados
                </div>
              </div>

              {/* Relógio ao vivo */}
              <div className="clock-row fi d3">
                <span>{pad(time.hours)}</span>
                <span className="sep">h</span>
                <span>{pad(time.minutes)}</span>
                <span className="sep">m</span>
                <span>{pad(time.seconds)}</span>
                <span className="sep">s</span>
              </div>
            </>
          )}
        </section>

        {/* ── Carta ── */}
        <section className="letter-sec fi">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span className="sec-script">Uma carta para você</span>
          </div>
          <div className="letter-card">
            <div className="letter-to">Meu amor, Nathalia,</div>
            <p className="letter-body">
              Desde o começo eu já sabia que queria ter uma família com você.
              Foi sempre o que pedi a Deus — uma mulher especial — e Ele me deu
              exatamente isso: você.
              <br /><br />
              Passamos por tudo juntos. Fomos ao topo, fomos ao fundo...
              mas o fundo ficou pra trás e lá não voltamos mais.
              <br /><br />
              O tempo passa rápido demais. Daqui alguns anos nossas filhas vão
              embora fazer suas próprias famílias — e vai sobrar só nós dois,
              viajando muito, aproveitando os netos e as netas
              (a Maria já avisou que quer 6 filhos 😂).
              <br /><br />
              Te amo para sempre, inha leoa. ❤️
            </p>
            <div className="letter-sign">Seu leão 🦁</div>
          </div>
        </section>

        {/* ── Carrosseis ── */}
        <section className="carousels-sec">
          <div className="fi" style={{ textAlign:'center', marginBottom: 36 }}>
            <span className="sec-script">Nossa história</span>
            <span className="sec-upper" style={{ display:'block', textAlign:'center' }}>em fotos</span>
          </div>
          <Carousel srcs={CAR1} dir="left"  label="" />
          <Carousel srcs={CAR2} dir="right" label="" />
          <Carousel srcs={CAR3} dir="left"  label="" />
        </section>

        {/* ── Filhas ── */}
        <section className="filhas-sec">
          <div className="fi" style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="sec-script">Nossas filhas</span>
            <span className="sec-upper" style={{ display: 'block', textAlign: 'center' }}>o maior presente do nosso amor</span>
          </div>
          <div className="filhas-grid">
            {FILHAS.map((f, i) => (
              <div key={i} className={`filha-card fi d${i + 1}`}>
                <div className="filha-foto-wrap">
                  <FilhaFoto src={f.foto} nome={f.nome} />
                  <span className="filha-emoji">{f.emoji}</span>
                </div>
                <div className="filha-nome">{f.nome}</div>
                <div className="filha-sobrenome">{f.sobrenome}</div>
                <div className="filha-nasc">
                  {f.nascimento.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
                <div className="filha-idade">{calcIdade(f.nascimento)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final ── */}
        <section className="final-sec fi">
          <span className="heart-big">❤️</span>
          <div className="final-quote">
            Te amo hoje,<br />amanhã e sempre
          </div>
          <div className="final-sub">11 anos namorando · 9 anos casados · 06 de Maio, 2026</div>
        </section>
      </div>
    </>
  )
}
