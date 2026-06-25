import { useEffect, useRef, useState } from "react";
import "./Game.css";

// ---------------------------------------------------------------------------
// Sound effects, synthesized with the Web Audio API (no audio files).
// Returns STABLE function identities (built once) so effects don't re-fire.
// ---------------------------------------------------------------------------
function useSounds() {
  const ref = useRef(null);
  if (!ref.current) {
    let ctx = null;
    const getCtx = () => {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC();
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    };
    const tone = (c, freq, startAt, dur, gain, type = "sine") => {
      const osc = c.createOscillator();
      const amp = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      osc.connect(amp);
      amp.connect(c.destination);
      const t = c.currentTime + startAt;
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + 0.01);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    };
    const noise = (c, dur, filterFreq, gain) => {
      const sr = c.sampleRate;
      const buf = c.createBuffer(1, Math.floor(sr * dur), sr);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const src = c.createBufferSource();
      src.buffer = buf;
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = filterFreq;
      const amp = c.createGain();
      amp.gain.value = gain;
      src.connect(f);
      f.connect(amp);
      amp.connect(c.destination);
      src.start();
    };
    ref.current = {
      ring: () => {
        const c = getCtx();
        tone(c, 659.25, 0.0, 0.7, 0.35);
        tone(c, 1318.5, 0.0, 0.4, 0.12);
        tone(c, 523.25, 0.38, 1.0, 0.35);
        tone(c, 1046.5, 0.38, 0.5, 0.12);
      },
      thunder: () => {
        const c = getCtx();
        noise(c, 1.4, 500, 0.7);
        tone(c, 70, 0.0, 1.2, 0.5);
        tone(c, 45, 0.05, 1.4, 0.5);
      },
      crash: () => {
        const c = getCtx();
        noise(c, 0.5, 1800, 0.6);
        tone(c, 120, 0.0, 0.3, 0.4, "square");
      },
      whack: () => {
        const c = getCtx();
        noise(c, 0.18, 2600, 0.5);
        tone(c, 200, 0.0, 0.12, 0.4, "square");
      },
      poof: () => {
        const c = getCtx();
        noise(c, 0.4, 1200, 0.35);
        tone(c, 320, 0.0, 0.25, 0.2, "triangle");
      },
    };
  }
  return ref.current;
}

const MOOD_EMOJI = { neutral: "😐", smile: "🙂", happy: "🙂", sad: "😢", cry: "😭" };
const MOOD_LEVELS = ["cry", "neutral", "smile"];

// 45+ gifts across snacks, love tokens, monuments, body organs and random stuff.
const GIFTS = [
  { emoji: "🍫", name: "some chocolate" }, { emoji: "🍦", name: "ice cream" },
  { emoji: "🍟", name: "some fries" }, { emoji: "🍪", name: "a biscuit" },
  { emoji: "🍩", name: "a donut" }, { emoji: "🍬", name: "candy" },
  { emoji: "🍭", name: "a lollipop" }, { emoji: "🍰", name: "a slice of cake" },
  { emoji: "🧁", name: "a cupcake" }, { emoji: "🍿", name: "popcorn" },
  { emoji: "🍕", name: "a pizza" }, { emoji: "🍔", name: "a burger" },
  { emoji: "🥭", name: "a mango" }, { emoji: "🍌", name: "a banana" },
  { emoji: "🌹", name: "a rose" }, { emoji: "💐", name: "a bouquet" },
  { emoji: "💍", name: "a ring" }, { emoji: "💌", name: "a love letter" },
  { emoji: "🎁", name: "a gift box" }, { emoji: "🎈", name: "balloons" },
  { emoji: "🧸", name: "a teddy bear" }, { emoji: "💋", name: "a kiss" },
  { emoji: "💝", name: "a heart box" }, { emoji: "📿", name: "a pearl necklace" },
  { emoji: "🌷", name: "a tulip" }, { emoji: "🕌", name: "the Taj Mahal" },
  { emoji: "🗼", name: "the Eiffel Tower" }, { emoji: "🏰", name: "a castle" },
  { emoji: "⛪", name: "a wedding chapel" }, { emoji: "🗽", name: "the Statue of Liberty" },
  { emoji: "❤️", name: "his heart" }, { emoji: "🫘", name: "his kidneys" },
  { emoji: "🧠", name: "his brain" }, { emoji: "🫁", name: "his lungs" },
  { emoji: "🦴", name: "a bone" }, { emoji: "🦷", name: "a tooth" },
  { emoji: "👁️", name: "an eye" }, { emoji: "🐄", name: "a cow" },
  { emoji: "💎", name: "a diamond" }, { emoji: "👑", name: "a crown" },
  { emoji: "🎸", name: "a guitar" }, { emoji: "🚗", name: "a car" },
  { emoji: "🌙", name: "the moon" }, { emoji: "⭐", name: "a star" },
  { emoji: "🌈", name: "a rainbow" }, { emoji: "🐈", name: "a kitten" },
  { emoji: "🐕", name: "a puppy" }, { emoji: "🦜", name: "a parrot" },
];

// What Mohit is thinking — he's come to apologize for his (unknown) mistakes.
const APOLOGIES = [
  "I'm so sorry, Aarohee…",
  "I know I made mistakes…",
  "I shouldn't have done it…",
  "Please forgive my mistakes…",
  "I was wrong, truly…",
  "I'll make it up to you…",
  "I can't undo what I did…",
  "Give me one more chance?",
];
const CRY_LINES = [
  "I never meant to hurt you…",
  "I'm so ashamed of myself…",
  "Please don't hate me…",
  "I just want to fix things…",
];
const GIFT_LINES = [
  (g) => `Please take ${g}…`,
  (g) => `I brought you ${g}…`,
  (g) => `Here, ${g} — for you…`,
  (g) => `Take ${g}, please…`,
];

const HITS = [
  { emoji: "✋", label: "a slap" }, { emoji: "🦵", label: "a kick" },
  { emoji: "🏏", label: "a bat" }, { emoji: "🪵", label: "a stick" },
  { emoji: "☂️", label: "an umbrella" }, { emoji: "🍳", label: "a frying pan" },
  { emoji: "👟", label: "a shoe" }, { emoji: "📚", label: "a stack of books" },
  { emoji: "🪑", label: "a chair" }, { emoji: "🥖", label: "a baguette" },
];

const ENTRANCES = ["run", "sky", "ground"];
const ENTRANCE_TEXT = {
  run: "comes sprinting in",
  sky: "drops out of the sky",
  ground: "erupts out of the ground",
};

const DEFAULT_LOCATION = { id: "living", name: "the living room", wall: "#43354f", floor: "#6b4f3a", broken: true };
const LOCATIONS = [
  { id: "hall", name: "the hall", wall: "#36435a", floor: "#5a4636" },
  { id: "kitchen", name: "the kitchen", wall: "#3f5249", floor: "#6b5d45" },
  { id: "bedroom", name: "the bedroom", wall: "#532f4a", floor: "#6b4f3a" },
  { id: "study", name: "the study", wall: "#3b3a5c", floor: "#5d4a36" },
  { id: "garden", name: "the garden", outdoor: true, sky: "#2f6ea5", ground: "#3c7d3c" },
  { id: "rooftop", name: "the rooftop", outdoor: true, sky: "#243056", ground: "#4a4a55" },
];

const RAIN = Array.from({ length: 30 }, (_, i) => ({
  x: 612 + ((i * 89) % 660),
  y: (i * 53) % 720,
  dur: 0.55 + (i % 5) * 0.12,
  delay: (i % 7) * 0.13,
}));

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const faceMood = (m) =>
  m === "smile" || m === "happy" ? "happy" : m === "cry" || m === "sad" ? "sad" : "neutral";

function Person({
  x, y, scale = 1, facing = 1,
  skin = "#f1c7a3", hair = "#3a2a20", hairLong = false,
  top = "#6366f1", bottom = "#1f2937", skirt = false,
  armRaised = false, mood = "happy", crying = false, name = "",
}) {
  const mouth =
    mood === "happy" ? "M -7 -167 Q 0 -160 7 -167"
    : mood === "sad" ? "M -7 -162 Q 0 -169 7 -162"
    : "M -6 -164 L 6 -164";
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx="0" cy="2" rx={34 * scale} ry={8 * scale} fill="rgba(0,0,0,0.28)" />
      <g transform={`scale(${scale * facing},${scale})`}>
        {hairLong && <path d="M -26 -176 Q -40 -120 -22 -92 L 22 -92 Q 40 -120 26 -176 Z" fill={hair} />}
        <rect x="-16" y="-78" width="13" height="76" rx="6" fill={skirt ? skin : bottom} />
        <rect x="3" y="-78" width="13" height="76" rx="6" fill={skirt ? skin : bottom} />
        <ellipse cx="-9" cy="-2" rx="11" ry="6" fill="#2b2b33" />
        <ellipse cx="9" cy="-2" rx="11" ry="6" fill="#2b2b33" />
        {skirt && <path d="M -16 -82 L 16 -82 L 30 -44 L -30 -44 Z" fill={bottom} />}
        <rect x="-23" y="-150" width="46" height="80" rx="16" fill={top} />
        <path d="M -20 -146 Q -34 -120 -28 -96" stroke={top} strokeWidth="12" strokeLinecap="round" fill="none" />
        <circle cx="-29" cy="-94" r="7" fill={skin} />
        {armRaised ? (
          <>
            <path d="M 20 -146 Q 40 -150 52 -172" stroke={top} strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="54" cy="-174" r="7" fill={skin} />
          </>
        ) : (
          <>
            <path d="M 20 -146 Q 34 -120 28 -96" stroke={top} strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="29" cy="-94" r="7" fill={skin} />
          </>
        )}
        <rect x="-6" y="-162" width="12" height="16" fill={skin} />
        <circle cx="0" cy="-180" r="27" fill={hair} />
        <circle cx="0" cy="-176" r="22" fill={skin} />
        <circle cx="-22" cy="-176" r="4" fill={skin} />
        <circle cx="22" cy="-176" r="4" fill={skin} />
        <circle cx="-8" cy="-178" r="2.6" fill="#27222b" />
        <circle cx="8" cy="-178" r="2.6" fill="#27222b" />
        <circle cx="-13" cy="-170" r="3.5" fill="rgba(244,114,182,0.45)" />
        <circle cx="13" cy="-170" r="3.5" fill="rgba(244,114,182,0.45)" />
        <path d={mouth} stroke="#a13a4a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {crying && (
          <g className="game2d-tears">
            <ellipse cx="-8" cy="-170" rx="2.3" ry="3.6" fill="#8ec5ff" />
            <ellipse cx="8" cy="-170" rx="2.3" ry="3.6" fill="#8ec5ff" />
          </g>
        )}
      </g>
      {name && (
        <text x="0" y={-108 * scale} textAnchor="middle" fontFamily="system-ui, sans-serif"
          fontWeight="700" fontSize={11 * scale} fill="#ffffff">{name}</text>
      )}
    </g>
  );
}

export default function Game() {
  const [phase, setPhase] = useState("intro"); // intro | door | opened | inside
  const [muted, setMuted] = useState(false);
  const [ignores, setIgnores] = useState(0);
  const [raining, setRaining] = useState(false);
  const [promptOn, setPromptOn] = useState(true);
  const [effect, setEffect] = useState(null); // null | lightning | break | hit
  const [giftIndex, setGiftIndex] = useState(0);
  const [giftsGiven, setGiftsGiven] = useState(0);
  const [aaroheeGift, setAaroheeGift] = useState("neutral");
  const [mohitLevel, setMohitLevel] = useState(2);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [arriving, setArriving] = useState(false);
  const [mohitHere, setMohitHere] = useState(true);
  const [entrance, setEntrance] = useState("run");
  const [hitItem, setHitItem] = useState(null);

  const { ring, thunder, crash, whack, poof } = useSounds();
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const timers = useRef([]);
  const schedule = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (phase !== "door") return;
    if (!mutedRef.current) ring();
    const id = setInterval(() => {
      if (!mutedRef.current) ring();
    }, 3500);
    return () => clearInterval(id);
  }, [phase, ring]);

  const handleIgnore = () => {
    const n = ignores + 1;
    setIgnores(n);
    setPromptOn(false);
    if (n === 1) {
      setRaining(true);
      schedule(() => setPromptOn(true), 1700);
    } else if (n === 2) {
      setEffect("lightning");
      if (!mutedRef.current) thunder();
      schedule(() => {
        setEffect(null);
        setPromptOn(true);
      }, 1700);
    } else {
      setEffect("break");
      if (!mutedRef.current) crash();
      schedule(() => {
        setEffect(null);
        setLocation(DEFAULT_LOCATION);
        setMohitHere(true);
        setPromptOn(true);
        setPhase("inside");
      }, 1800);
    }
  };

  // Gifts loop forever — pick a fresh random gift (never the same one twice running).
  const nextGift = () => {
    setGiftsGiven((g) => g + 1);
    setGiftIndex((prev) => {
      if (GIFTS.length < 2) return prev;
      let n = prev;
      while (n === prev) n = Math.floor(Math.random() * GIFTS.length);
      return n;
    });
  };
  const acceptGift = () => {
    setAaroheeGift("smile");
    setMohitLevel((l) => Math.min(2, l + 1));
    nextGift();
  };
  const throwGift = () => {
    setAaroheeGift("neutral");
    setMohitLevel((l) => Math.max(0, l - 1));
    nextGift();
  };
  const doHit = () => {
    setHitItem(rand(HITS));
    setEffect("hit");
    setMohitLevel(0);
    if (!mutedRef.current) whack();
    schedule(() => setEffect(null), 1200);
  };
  const goAway = () => {
    setLocation(rand(LOCATIONS.filter((l) => l.id !== location.id)));
    setEntrance(rand(ENTRANCES));
    setArriving(true);
    setMohitHere(false); // she thinks she got away…
    setPromptOn(false);
    schedule(() => {
      setMohitHere(true); // …then Mohit appears
      if (!mutedRef.current) poof();
    }, 1300);
    schedule(() => {
      setArriving(false);
      setPromptOn(true);
    }, 2900);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("intro");
    setIgnores(0);
    setRaining(false);
    setPromptOn(true);
    setEffect(null);
    setGiftIndex(0);
    setGiftsGiven(0);
    setAaroheeGift("neutral");
    setMohitLevel(2);
    setLocation(DEFAULT_LOCATION);
    setArriving(false);
    setMohitHere(true);
    setHitItem(null);
  };

  const inside = phase === "inside";
  const gift = GIFTS[giftIndex];
  const loc = location;
  const relief = inside && arriving && !mohitHere; // "finally he's gone" beat

  let aaroheeMood = "neutral";
  let mohitMood = "neutral";
  if (inside) {
    aaroheeMood = aaroheeGift;
    mohitMood = MOOD_LEVELS[mohitLevel];
  } else if (phase === "opened") {
    aaroheeMood = "smile";
    mohitMood = "smile";
  } else if (phase === "door") {
    mohitMood = raining ? "cry" : "neutral";
  }
  const aaroheeFace = relief ? "happy" : faceMood(aaroheeMood);
  const cloudLine = mohitMood === "cry"
    ? CRY_LINES[giftsGiven % CRY_LINES.length]
    : APOLOGIES[giftsGiven % APOLOGIES.length];
  const giftLine = GIFT_LINES[giftsGiven % GIFT_LINES.length](gift.name);

  const doorOpen = phase === "opened" || effect === "break";
  const shaking = effect === "break" || effect === "hit";
  const showMohit = !arriving || mohitHere;
  const mohitEntering = arriving && mohitHere;

  return (
    <div className={`game2d ${shaking ? "is-breaking" : ""}`}>
      <svg className="game2d-scene" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b1026" /><stop offset="1" stopColor="#243056" />
          </linearGradient>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a3b5c" /><stop offset="1" stopColor="#3a2e49" />
          </linearGradient>
          <radialGradient id="lamp" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="rgba(255,224,138,0.55)" /><stop offset="1" stopColor="rgba(255,224,138,0)" />
          </radialGradient>
          <clipPath id="extClip"><rect x="600" y="0" width="680" height="720" /></clipPath>
        </defs>

        {!inside ? (
          <>
            {/* ===== OUTDOOR / DOOR SCENE ===== */}
            <rect x="600" y="0" width="680" height="720" fill="url(#sky)" />
            {[[700, 80], [780, 150], [880, 60], [980, 120], [1080, 70], [1180, 140], [840, 220], [1130, 240], [960, 200]].map(
              ([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="2" fill="#fff" opacity={raining ? 0.15 : 0.8} />
            )}
            <circle cx="1120" cy="120" r="46" fill="#f5f3d0" opacity={raining ? 0.3 : 1} />
            <circle cx="1104" cy="108" r="46" fill="#243056" />
            <rect x="600" y="560" width="680" height="160" fill="#2c2740" />
            <rect x="600" y="560" width="680" height="14" fill="#3a3454" />
            <rect x="0" y="0" width="610" height="560" fill="url(#wall)" />
            <rect x="0" y="560" width="610" height="160" fill="#6b4f3a" />
            <rect x="0" y="556" width="610" height="10" fill="#7d5d45" />
            <rect x="120" y="120" width="120" height="90" rx="6" fill="#2c2438" stroke="#caa45a" strokeWidth="5" />
            <path d="M130 200 L175 150 L210 200 Z" fill="#6d5a86" />
            <circle cx="160" cy="150" r="10" fill="#caa45a" />
            <ellipse cx="80" cy="430" rx="150" ry="180" fill="url(#lamp)" />
            <rect x="72" y="360" width="10" height="190" fill="#caa45a" />
            <path d="M52 360 L102 360 L92 320 L62 320 Z" fill="#ffe08a" />
            <rect x="582" y="190" width="120" height="372" fill="#241d2e" />
            <rect x="596" y="206" width="92" height="356" fill="#171019" />
            <g className={`game2d-door ${doorOpen ? "is-open" : ""}`} style={{ transformOrigin: "598px 384px" }}>
              <rect x="598" y="206" width="92" height="356" rx="4" fill="#7a5638" />
              <rect x="612" y="226" width="64" height="140" rx="4" fill="#69492f" />
              <rect x="612" y="386" width="64" height="150" rx="4" fill="#69492f" />
              <circle cx="676" cy="392" r="6" fill="#e8c873" />
            </g>
            <g>
              <rect x="712" y="300" width="22" height="40" rx="6" fill="#1b1422" stroke="#3a3454" strokeWidth="2" />
              <circle cx="723" cy="320" r="7" fill="#ffd34d" className="game2d-bell-btn" />
            </g>
            {phase === "door" && (
              <g className="game2d-waves" stroke="#ffd34d" strokeWidth="3" fill="none">
                <path d="M 742 300 Q 760 320 742 340" />
                <path d="M 754 288 Q 782 320 754 352" />
                <path d="M 766 276 Q 804 320 766 364" />
              </g>
            )}
            {raining && (
              <g clipPath="url(#extClip)">
                <g fill="#39405c">
                  <ellipse cx="820" cy="150" rx="80" ry="42" />
                  <ellipse cx="900" cy="135" rx="70" ry="44" />
                  <ellipse cx="980" cy="160" rx="74" ry="40" />
                  <ellipse cx="900" cy="180" rx="110" ry="34" />
                </g>
                {RAIN.map((d, i) => (
                  <line key={i} className="game2d-rain" x1={d.x} y1={d.y} x2={d.x - 5} y2={d.y + 20}
                    stroke="#9fb6e0" strokeWidth="2" opacity="0.7"
                    style={{ animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
                ))}
              </g>
            )}
            {effect === "lightning" && (
              <g clipPath="url(#extClip)">
                <rect className="game2d-flash" x="600" y="0" width="680" height="720" fill="#ffffff" />
                <path className="game2d-bolt" d="M 836 116 L 812 230 L 846 236 L 818 320 L 862 250 L 832 244 Z"
                  fill="#fdf6b2" stroke="#fffbe0" strokeWidth="3" />
              </g>
            )}
            <Person x={phase === "opened" ? 470 : 340} y={556} scale={1.45} facing={1}
              skin="#f3cba6" hair="#2a1c14" hairLong top="#e84f8c" bottom="#7c3aed" skirt
              mood={faceMood(aaroheeMood)} name="Aarohee" />
            <Person x={840} y={556} scale={1.45} facing={-1}
              skin="#e6b58a" hair="#16100c" top="#2563eb" bottom="#1f2937"
              armRaised={phase === "door" || phase === "intro"}
              mood={faceMood(mohitMood)} crying={mohitMood === "cry"} name="Mohit" />
          </>
        ) : (
          <>
            {/* ===== INSIDE / RELOCATED SCENE ===== */}
            {loc.outdoor ? (
              <>
                <rect x="0" y="0" width="1280" height="560" fill={loc.sky} />
                <rect x="0" y="560" width="1280" height="160" fill={loc.ground} />
                {loc.id === "garden" && (
                  <>
                    <circle cx="180" cy="120" r="62" fill="#ffe98a" />
                    <rect x="1040" y="470" width="22" height="110" fill="#5b3a1c" />
                    <ellipse cx="1051" cy="450" rx="80" ry="95" fill="#2f6b2f" />
                  </>
                )}
                {loc.id === "rooftop" && (
                  <>
                    {[[120, 90], [320, 140], [560, 70], [820, 120], [1080, 90], [1200, 160]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="2" fill="#fff" opacity="0.8" />
                    ))}
                    <rect x="0" y="552" width="1280" height="8" fill="#888" />
                  </>
                )}
              </>
            ) : (
              <>
                <rect x="0" y="0" width="1280" height="560" fill={loc.id === "living" ? "url(#wall)" : loc.wall} />
                <rect x="0" y="560" width="1280" height="160" fill={loc.floor} />
                <rect x="0" y="556" width="1280" height="10" fill="#7d5d45" />
                <rect x="120" y="110" width="150" height="120" rx="8" fill="#1b2238" stroke="#caa45a" strokeWidth="6" />
                <line x1="195" y1="110" x2="195" y2="230" stroke="#caa45a" strokeWidth="4" />
                <line x1="120" y1="170" x2="270" y2="170" stroke="#caa45a" strokeWidth="4" />
                <rect x="60" y="430" width="300" height="110" rx="22" fill="#5b4a73" />
                <rect x="60" y="380" width="300" height="80" rx="22" fill="#6b5887" />
              </>
            )}
            {loc.broken && (
              <g transform="rotate(12 1180 470)">
                <rect x="1130" y="300" width="92" height="356" rx="4" fill="#7a5638" />
                <path d="M1140 360 L1180 420 L1160 470 L1205 520" stroke="#3a2a1c" strokeWidth="4" fill="none" />
              </g>
            )}

            {!arriving && (
              <>
                <g>
                  <circle cx="828" cy="252" r="9" fill="#ffffff" />
                  <circle cx="812" cy="228" r="14" fill="#ffffff" />
                  <ellipse cx="760" cy="150" rx="72" ry="46" fill="#ffffff" />
                  <ellipse cx="862" cy="134" rx="84" ry="52" fill="#ffffff" />
                  <ellipse cx="958" cy="156" rx="72" ry="46" fill="#ffffff" />
                  <ellipse cx="860" cy="186" rx="116" ry="40" fill="#ffffff" />
                  <text x="858" y="142" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="26" fill="#27222b">
                    {cloudLine}
                  </text>
                  <text x="858" y="180" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="22" fill="#27222b">
                    {giftLine}
                  </text>
                </g>
                <text key={giftsGiven} className="game2d-gift-pop" x="690" y="430" textAnchor="middle" fontSize="64">
                  {gift.emoji}
                </text>
              </>
            )}

            {effect === "hit" && hitItem && (
              <g>
                <text className="game2d-hit-weapon" x="730" y="390" textAnchor="middle" fontSize="74">{hitItem.emoji}</text>
                <g className="game2d-hit-impact">
                  <text x="770" y="335" textAnchor="middle" fontSize="92">💥</text>
                  <text x="770" y="300" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fff">POW!</text>
                </g>
              </g>
            )}

            <Person x={360} y={556} scale={1.45} facing={1}
              skin="#f3cba6" hair="#2a1c14" hairLong top="#e84f8c" bottom="#7c3aed" skirt
              mood={aaroheeFace} name="Aarohee" />
            {showMohit && (
              <g className={mohitEntering ? `game2d-enter-${entrance}` : ""} key={mohitEntering ? `${entrance}-${loc.id}` : "stay"}>
                <Person x={820} y={556} scale={1.45} facing={-1}
                  skin="#e6b58a" hair="#16100c" top="#2563eb" bottom="#1f2937" armRaised
                  mood={faceMood(mohitMood)} crying={mohitMood === "cry"} name="Mohit" />
              </g>
            )}
          </>
        )}
      </svg>

      {/* ===== MOOD CORNERS ===== */}
      {phase !== "intro" && (
        <>
          <div className="game2d-mood left">
            <span className="game2d-mood-emoji">{MOOD_EMOJI[aaroheeMood]}</span>
            <span className="game2d-mood-name">Aarohee</span>
          </div>
          <div className="game2d-mood right">
            <span className="game2d-mood-name">Mohit</span>
            <span className="game2d-mood-emoji">{MOOD_EMOJI[mohitMood]}</span>
          </div>
        </>
      )}

      {/* gift counter */}
      {inside && <div className="game2d-counter">🎁 Gift #{giftsGiven + 1}</div>}

      {/* relocation captions */}
      {relief && (
        <div className="game2d-caption">
          In {loc.name} at last… “Finally, he's gone!” 😌
        </div>
      )}
      {inside && arriving && mohitHere && (
        <div className="game2d-caption alarm">…but Mohit {ENTRANCE_TEXT[entrance]}! 😱</div>
      )}

      {/* ===== INTRO ===== */}
      {phase === "intro" && (
        <div className="game2d-overlay">
          <button className="game2d-cta" onClick={() => setPhase("door")}>▶ Start</button>
        </div>
      )}

      {/* ===== CONTROLS ===== */}
      {(phase === "door" || inside) && (
        <button className="game2d-mute" onClick={() => setMuted((m) => !m)} title={muted ? "Unmute" : "Mute"}>
          {muted ? "🔇" : "🔊"}
        </button>
      )}
      {inside && (
        <button className="game2d-restart" onClick={reset} title="Restart">↺</button>
      )}

      {/* ===== DOOR CHOICES ===== */}
      {phase === "door" && promptOn && (
        <div className="game2d-prompt">
          <div className="game2d-choices">
            <button className="game2d-choice open" onClick={() => setPhase("opened")}>🚪 Open the door</button>
            <button className="game2d-choice ignore" onClick={handleIgnore}>🙅‍♀️ Don't open</button>
          </div>
        </div>
      )}

      {/* ===== INSIDE: 4 GIFT-SCENE CHOICES ===== */}
      {inside && promptOn && !arriving && effect === null && (
        <div className="game2d-prompt">
          <div className="game2d-choices">
            <button className="game2d-choice accept" onClick={acceptGift}>💝 Accept</button>
            <button className="game2d-choice throw" onClick={throwGift}>🗑️ Throw it away</button>
            <button className="game2d-choice hit" onClick={doHit}>👊 Hit him</button>
            <button className="game2d-choice goaway" onClick={goAway}>🏃‍♀️ Go away</button>
          </div>
        </div>
      )}

      {/* ===== OPENED ENDING ===== */}
      {phase === "opened" && (
        <div className="game2d-result">
          <p className="game2d-result-text">Aarohee opens the door…</p>
          <p className="game2d-tbc">To be continued…</p>
          <button className="game2d-cta small" onClick={reset}>↺ Restart</button>
        </div>
      )}
    </div>
  );
}
