@import "tailwindcss";

:root {
  --ink: #f1eee6;
  --muted: #9fa6a0;
  --paper: #111614;
  --paper-deep: #090d0c;
  --line: rgba(223, 216, 196, 0.16);
  --gold: #c7a96b;
  --silver: #aeb8b8;
  --display: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia,
    serif;
  --sans: "Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif;
  --mono: var(--font-geist-mono), "SFMono-Regular", Consolas, monospace;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--paper-deep);
}

body {
  margin: 0;
  background: var(--paper-deep);
  color: var(--ink);
  font-family: var(--sans);
  overflow-x: hidden;
}

button,
input {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
  text-decoration: none;
}

.site-shell {
  --gold: var(--foundation-accent, #c7a96b);
  --silver: var(--foundation-silver, #aeb8b8);
  --season-main: var(--foundation-secondary, #647c5a);
  --season-bright: var(--foundation-accent, #d2b66f);
  --season-deep: #101a16;
  --season-glow: rgba(104, 137, 95, 0.32);
  background: var(--foundation-primary, var(--paper));
  min-height: 100vh;
  transition:
    background-color 1.2s ease,
    color 1.2s ease;
}

.site-shell[data-season="spring"] {
  --season-main: #719a73;
  --season-bright: #a8c89d;
  --season-deep: #10211a;
  --season-glow: rgba(72, 133, 104, 0.4);
}

.site-shell[data-season="summer"] {
  --season-main: #4f7058;
  --season-bright: #d7bd7a;
  --season-deep: #0c1713;
  --season-glow: rgba(69, 111, 83, 0.42);
}

.site-shell[data-season="autumn"] {
  --season-main: #9e4b31;
  --season-bright: #d79a49;
  --season-deep: #20100d;
  --season-glow: rgba(155, 62, 37, 0.42);
}

.site-shell[data-season="winter"] {
  --season-main: #738991;
  --season-bright: #bcc9c9;
  --season-deep: #101a1e;
  --season-glow: rgba(107, 139, 151, 0.35);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hero {
  isolation: isolate;
  min-height: 900px;
  height: 100svh;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  background:
    radial-gradient(circle at 73% 42%, var(--season-glow), transparent 34%),
    linear-gradient(126deg, #080c0b 0%, var(--season-deep) 56%, #0a0d0c 100%);
  transition: background 1.4s ease;
}

.atmosphere,
.atmosphere::before,
.atmosphere::after {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: -1;
}

.atmosphere::before {
  content: "";
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, black, transparent 88%);
}

.atmosphere::after {
  content: "";
  border: 1px solid rgba(235, 223, 197, 0.08);
  border-radius: 50%;
  width: 48vw;
  height: 48vw;
  left: auto;
  right: -8vw;
  top: 12vh;
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(100px);
  opacity: 0.26;
  transition: background-color 1.2s ease;
}

.orb-one {
  width: 34vw;
  height: 34vw;
  right: 8vw;
  top: 12vh;
  background: var(--season-main);
}

.orb-two {
  width: 24vw;
  height: 24vw;
  left: -12vw;
  bottom: -4vw;
  background: var(--season-bright);
  opacity: 0.08;
}

.grain {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.site-header {
  width: min(1420px, calc(100% - 72px));
  margin: 0 auto;
  min-height: 102px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid rgba(235, 223, 197, 0.14);
  z-index: 10;
}

.brand {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 13px;
}

.brand-mark {
  width: 39px;
  height: 39px;
  border: 1px solid rgba(222, 198, 142, 0.58);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--gold);
  font-family: var(--display);
  font-size: 18px;
  line-height: 1;
  box-shadow: inset 0 0 0 4px rgba(201, 171, 108, 0.05);
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-family: var(--display);
  font-size: 19px;
  letter-spacing: 0.19em;
  line-height: 1;
}

.brand small {
  margin-top: 5px;
  color: #a8ada8;
  font-family: var(--sans);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.primary-nav {
  display: flex;
  align-items: center;
  gap: 34px;
  color: #c2c5c0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.primary-nav a,
.footer-links a,
.text-link {
  position: relative;
}

.primary-nav a::after,
.footer-links a::after,
.text-link::after {
  content: "";
  position: absolute;
  height: 1px;
  left: 0;
  right: 100%;
  bottom: -5px;
  background: var(--season-bright);
  transition: right 0.25s ease;
}

.primary-nav a:hover::after,
.footer-links a:hover::after,
.text-link:hover::after {
  right: 0;
}

.header-action {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d9d6cc;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.arrow {
  display: inline-block;
  transition: transform 0.25s ease;
}

a:hover .arrow,
button:hover .arrow {
  transform: translate(3px, -3px);
}

.hero-grid {
  width: min(1420px, calc(100% - 72px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.91fr) minmax(520px, 1.09fr);
  align-items: center;
  min-height: 0;
}

.hero-copy {
  position: relative;
  z-index: 3;
  padding: 50px 0 38px;
}

.eyebrow,
.section-kicker {
  margin: 0 0 24px;
  color: var(--season-bright);
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: color 1.2s ease;
}

.hero h1 {
  margin: 0;
  max-width: 760px;
  font-family: var(--display);
  font-size: clamp(64px, 7vw, 112px);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 0.83;
}

.hero h1 em {
  color: var(--season-bright);
  font-weight: 400;
  transition: color 1.2s ease;
}

.hero-dek {
  max-width: 570px;
  margin: 34px 0 0;
  color: #b9bdb7;
  font-family: var(--display);
  font-size: 19px;
  line-height: 1.65;
}

.hero-actions {
  margin-top: 37px;
  display: flex;
  align-items: center;
  gap: 27px;
}

.button {
  min-height: 52px;
  padding: 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.button-primary {
  background: var(--season-bright);
  color: #0b100e;
}

.button-primary:hover {
  background: #ede4d1;
}

.button-outline {
  border: 1px solid rgba(232, 221, 194, 0.3);
  color: #e4e0d5;
}

.button-outline:hover {
  border-color: var(--season-bright);
}

.text-link {
  color: #c8c8c0;
  font-size: 11px;
  font-weight: 600;
}

.tree-stage {
  align-self: stretch;
  min-height: 650px;
  position: relative;
}

.oak-scene {
  position: absolute;
  inset: -8% -4% 0 -9%;
  cursor: crosshair;
  filter: drop-shadow(0 30px 44px rgba(0, 0, 0, 0.34));
}

.oak-scene canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.tree-caption {
  position: absolute;
  top: 11%;
  right: 2%;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: #e0ddd3;
}

.tree-caption > span {
  color: var(--season-bright);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  transition: color 1.2s ease;
}

.tree-caption p {
  margin: -5px 0 0;
  font-family: var(--display);
  font-size: 28px;
  font-style: italic;
  line-height: 1;
}

.tree-caption small {
  display: block;
  margin-top: 9px;
  color: #929b95;
  font-family: var(--sans);
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.interaction-note {
  position: absolute;
  right: 1%;
  bottom: 9%;
  margin: 0;
  color: rgba(226, 225, 215, 0.46);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.season-nav {
  width: min(1420px, calc(100% - 72px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(235, 223, 197, 0.14);
}

.season-nav button {
  min-height: 96px;
  padding: 0 26px;
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  gap: 8px;
  color: #7f8882;
  border: 0;
  border-right: 1px solid rgba(235, 223, 197, 0.1);
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.season-nav button:last-child {
  border-right: 0;
}

.season-nav button > span,
.season-nav button > small {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.season-nav button strong {
  font-family: var(--display);
  font-size: 19px;
  font-weight: 400;
}

.season-nav button > small {
  justify-self: end;
}

.season-nav button:hover,
.season-nav button.is-active {
  color: #e9e5da;
  background: rgba(255, 255, 255, 0.03);
}

.season-nav button.is-active > span,
.season-nav button.is-active > small {
  color: var(--season-bright);
}

.manifesto-strip {
  min-height: 86px;
  padding: 0 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3.6vw, 58px);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: #8f9690;
  background: #0d1210;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
}

.manifesto-strip i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0.6;
}

.manifesto-item {
  display: contents;
}

.section {
  width: min(1320px, calc(100% - 80px));
  margin: 0 auto;
  padding: 140px 0;
}

.section-heading {
  margin-bottom: 62px;
  display: grid;
  grid-template-columns: 1fr minmax(320px, 460px);
  align-items: end;
  gap: 60px;
}

.section-heading h2,
.library-header h2,
.standard-copy h2,
.newsletter-copy h2 {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(44px, 5vw, 74px);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.96;
}

.section-heading > p {
  margin: 0;
  color: #969e98;
  font-family: var(--display);
  font-size: 17px;
  line-height: 1.7;
}

.compact-heading {
  display: block;
}

.editorial-section {
  border-bottom: 1px solid var(--line);
}

.featured-grid {
  display: grid;
  grid-template-columns: 1.14fr 0.86fr;
  gap: 24px;
}

.feature-card {
  overflow: hidden;
  border: 1px solid var(--line);
  background: rgba(21, 27, 24, 0.72);
  transition:
    transform 0.32s ease,
    border-color 0.32s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(200, 171, 108, 0.4);
}

.feature-main {
  display: grid;
  grid-template-rows: minmax(400px, 1.2fr) auto;
}

.feature-art {
  position: relative;
  overflow: hidden;
  min-height: 400px;
  background:
    radial-gradient(circle at 30% 38%, rgba(196, 149, 153, 0.34), transparent 14%),
    radial-gradient(circle at 61% 67%, rgba(113, 87, 130, 0.45), transparent 18%),
    linear-gradient(145deg, #34232d, #1a2224 60%, #101718);
}

.feature-art::before {
  content: "";
  position: absolute;
  width: 340px;
  height: 340px;
  top: 10%;
  left: 20%;
  border: 1px solid rgba(233, 216, 191, 0.18);
  border-radius: 45% 55% 47% 53%;
  box-shadow:
    inset 0 0 80px rgba(192, 124, 135, 0.12),
    0 0 80px rgba(106, 76, 113, 0.18);
  transform: rotate(-12deg);
}

.feature-art::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 49.8%, rgba(255, 255, 255, 0.08) 50%, transparent 50.2%),
    linear-gradient(transparent 49.8%, rgba(255, 255, 255, 0.06) 50%, transparent 50.2%);
  background-size: 74px 74px;
  mask-image: radial-gradient(circle, black 10%, transparent 70%);
}

.feature-roman {
  position: absolute;
  right: 8%;
  bottom: 3%;
  color: rgba(255, 255, 255, 0.08);
  font-family: var(--display);
  font-size: 190px;
  font-style: italic;
}

.feature-art > small {
  position: absolute;
  left: 30px;
  bottom: 25px;
  color: rgba(235, 229, 216, 0.52);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.cell {
  position: absolute;
  z-index: 1;
  border: 1px solid rgba(215, 173, 170, 0.4);
  border-radius: 46% 54% 60% 40%;
  box-shadow: inset 0 0 36px rgba(214, 146, 164, 0.12);
}

.cell-a {
  width: 82px;
  height: 82px;
  top: 24%;
  left: 18%;
}

.cell-b {
  width: 132px;
  height: 119px;
  top: 43%;
  left: 54%;
  transform: rotate(27deg);
}

.cell-c {
  width: 46px;
  height: 52px;
  top: 18%;
  right: 18%;
}

.feature-content {
  padding: 34px 36px 38px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 9px 20px;
  color: #9fa59f;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.article-meta span:first-child {
  color: var(--gold);
}

.feature-content h3,
.article-body h3 {
  margin: 18px 0 13px;
  font-family: var(--display);
  font-size: 35px;
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.05;
}

.feature-content p,
.article-body p {
  margin: 0;
  color: #959d97;
  font-family: var(--display);
  font-size: 15px;
  line-height: 1.65;
}

.feature-content > a {
  margin-top: 24px;
  display: inline-flex;
  gap: 12px;
  color: #d6d3ca;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.feature-stack {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
}

.feature-small {
  display: grid;
  grid-template-columns: minmax(180px, 0.66fr) minmax(240px, 1.34fr);
}

.feature-small .feature-content {
  padding: 30px;
}

.feature-small .feature-content h3 {
  font-size: 25px;
}

.feature-small .feature-content p {
  font-size: 13px;
}

.feature-mini-art {
  position: relative;
  overflow: hidden;
  min-height: 255px;
  border-right: 1px solid var(--line);
  background: #1c2a2c;
}

.art-tide {
  background:
    radial-gradient(circle at 50% 30%, rgba(99, 165, 172, 0.3), transparent 23%),
    linear-gradient(160deg, #183036, #14201f 65%, #101616);
}

.art-rust {
  background:
    radial-gradient(circle at 60% 35%, rgba(200, 105, 65, 0.34), transparent 22%),
    linear-gradient(160deg, #39251f, #201c1a 65%, #121513);
}

.contour {
  position: absolute;
  border: 1px solid rgba(221, 218, 203, 0.17);
  border-radius: 45% 55% 52% 48%;
}

.contour-one {
  width: 230px;
  height: 230px;
  left: -80px;
  top: 28px;
  transform: rotate(24deg);
}

.contour-two {
  width: 150px;
  height: 190px;
  right: -75px;
  bottom: -40px;
  transform: rotate(-34deg);
}

.feature-mini-art > strong {
  position: absolute;
  left: 24px;
  bottom: 20px;
  color: rgba(240, 234, 220, 0.66);
  font-family: var(--display);
  font-size: 42px;
  font-style: italic;
  font-weight: 400;
}

.lenses-section {
  border-bottom: 1px solid var(--line);
}

.lens-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.lens-card {
  position: relative;
  min-height: 430px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  color: #d8dad4;
  border: 0;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: #111715;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.5s ease,
    transform 0.3s ease;
}

.lens-card::before,
.lens-card::after {
  content: "";
  position: absolute;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lens-card::before {
  width: 210px;
  height: 210px;
  right: -60px;
  bottom: -60px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  box-shadow:
    0 0 0 25px rgba(255, 255, 255, 0.018),
    0 0 0 58px rgba(255, 255, 255, 0.012);
}

.lens-card::after {
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.05));
}

.lens-card:hover,
.lens-card.is-active {
  transform: translateY(-8px);
}

.lens-card:hover::before,
.lens-card:hover::after,
.lens-card.is-active::before,
.lens-card.is-active::after {
  opacity: 1;
}

.lens-spring:hover,
.lens-spring.is-active {
  background: #173025;
}

.lens-summer:hover,
.lens-summer.is-active {
  background: #18281f;
}

.lens-autumn:hover,
.lens-autumn.is-active {
  background: #3a2018;
}

.lens-winter:hover,
.lens-winter.is-active {
  background: #18292f;
}

.lens-number {
  color: #727b75;
  font-family: var(--mono);
  font-size: 9px;
}

.lens-season {
  margin-top: 76px;
  color: var(--gold);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.lens-card strong {
  margin-top: 16px;
  font-family: var(--display);
  font-size: 42px;
  font-weight: 400;
  letter-spacing: -0.04em;
}

.lens-card p {
  margin: 16px 0 0;
  color: #929a94;
  font-family: var(--display);
  font-size: 14px;
  line-height: 1.6;
}

.lens-card.is-active p,
.lens-card:hover p {
  color: #b8beb8;
}

.lens-cta {
  margin-top: auto;
  display: flex;
  gap: 12px;
  color: #d5d6d0;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.library-section {
  padding-bottom: 110px;
}

.library-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 50px;
  margin-bottom: 48px;
}

.search-field {
  width: min(410px, 100%);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border-bottom: 1px solid rgba(230, 223, 204, 0.3);
}

.search-field input {
  width: 100%;
  padding: 14px 4px;
  color: #e5e3db;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--display);
  font-size: 15px;
}

.search-field input::placeholder {
  color: #737c76;
}

.search-field > span:last-child {
  color: var(--gold);
  font-family: var(--display);
  font-size: 22px;
}

.filter-row {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
}

.filter-row button {
  padding: 9px 15px;
  color: #858e88;
  border: 1px solid rgba(228, 218, 194, 0.14);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.filter-row button:hover,
.filter-row button.is-active {
  color: #0c110f;
  border-color: var(--season-bright);
  background: var(--season-bright);
}

.article-list {
  border-top: 1px solid var(--line);
}

.article-row {
  min-height: 185px;
  display: grid;
  grid-template-columns: 90px 1fr 170px;
  align-items: center;
  gap: 32px;
  border-bottom: 1px solid var(--line);
  transition: background-color 0.28s ease;
}

.article-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.article-index {
  width: 64px;
  height: 82px;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #1b2d27;
}

.article-index::after {
  content: "";
  position: absolute;
  width: 62px;
  height: 62px;
  left: -23px;
  bottom: -22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
}

.article-index span {
  color: rgba(244, 238, 224, 0.78);
  font-family: var(--display);
  font-size: 23px;
  font-style: italic;
}

.accent-rust {
  background: #48251b;
}

.accent-tide {
  background: #19343a;
}

.accent-plum {
  background: #38242f;
}

.accent-gold {
  background: #493a20;
}

.accent-silver {
  background: #2b383a;
}

.article-body {
  padding: 30px 0;
}

.article-body h3 {
  margin: 13px 0 9px;
  font-size: 29px;
}

.article-body p {
  max-width: 760px;
  font-size: 14px;
}

.article-tail {
  min-height: 90px;
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
  justify-items: end;
  gap: 7px;
  border-left: 1px solid var(--line);
  color: #78817c;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.article-tail a {
  width: 34px;
  height: 34px;
  margin-top: 5px;
  display: grid;
  place-items: center;
  color: var(--gold);
  border: 1px solid rgba(210, 184, 124, 0.25);
  border-radius: 50%;
}

.empty-state {
  padding: 80px 20px;
  text-align: center;
  color: #9ca39d;
}

.empty-state button {
  margin-top: 13px;
  color: var(--gold);
  border: 0;
  background: transparent;
  cursor: pointer;
  text-decoration: underline;
}

.standard-section {
  width: 100%;
  max-width: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 15% 30%, rgba(90, 122, 100, 0.16), transparent 32%),
    #0b100f;
}

.standard-copy {
  padding: 120px max(5vw, calc((100vw - 1320px) / 2));
  padding-right: 7vw;
}

.standard-copy h2 {
  max-width: 680px;
}

.standard-copy > p:not(.section-kicker) {
  max-width: 610px;
  margin: 30px 0 34px;
  color: #9ea59f;
  font-family: var(--display);
  font-size: 18px;
  line-height: 1.75;
}

.standard-ledger {
  margin: 52px max(5vw, calc((100vw - 1320px) / 2)) 52px 0;
  padding: 32px;
  border: 1px solid rgba(216, 207, 187, 0.22);
  background: rgba(31, 36, 33, 0.74);
}

.ledger-head {
  padding-bottom: 18px;
  display: flex;
  justify-content: space-between;
  color: #8c958f;
  border-bottom: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.standard-ledger dl {
  margin: 0;
}

.standard-ledger dl > div {
  padding: 21px 0;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  border-bottom: 1px solid var(--line);
}

.standard-ledger dt {
  color: #818b85;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.standard-ledger dd {
  margin: 0;
  color: #9aa19c;
  font-family: var(--display);
  font-size: 13px;
  line-height: 1.4;
}

.standard-ledger dd strong {
  display: block;
  color: #e4dfd3;
  font-family: var(--sans);
  font-size: 17px;
  font-weight: 500;
}

.standard-ledger > p {
  margin: 24px 0 0;
  color: #737c76;
  font-family: var(--mono);
  font-size: 8px;
  line-height: 1.7;
  text-transform: uppercase;
}

.newsletter-section {
  min-height: 600px;
  padding: 100px max(5vw, calc((100vw - 1320px) / 2));
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) minmax(480px, 1.2fr);
  align-items: center;
  gap: 80px;
  background:
    radial-gradient(circle at 23% 50%, rgba(106, 137, 105, 0.19), transparent 29%),
    linear-gradient(120deg, #111a16, #0b100e);
}

.newsletter-tree {
  width: 360px;
  height: 360px;
  margin: auto;
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.newsletter-tree::before,
.newsletter-tree::after {
  content: "";
  position: absolute;
  background: #9d7f50;
  opacity: 0.5;
}

.newsletter-tree::before {
  width: 1px;
  height: 100%;
}

.newsletter-tree::after {
  width: 100%;
  height: 1px;
}

.newsletter-tree strong {
  width: 86px;
  height: 86px;
  display: grid;
  place-items: center;
  z-index: 2;
  color: var(--gold);
  border: 1px solid rgba(203, 175, 113, 0.6);
  border-radius: 50%;
  background: #101713;
  font-family: var(--display);
  font-size: 34px;
  font-weight: 400;
}

.newsletter-ring {
  position: absolute;
  border: 1px solid rgba(208, 183, 125, 0.22);
  border-radius: 50%;
}

.ring-one {
  inset: 20%;
}

.ring-two {
  inset: 8%;
}

.ring-three {
  inset: 0;
  border-style: dashed;
  animation: rotate-ring 30s linear infinite;
}

@keyframes rotate-ring {
  to {
    transform: rotate(360deg);
  }
}

.newsletter-copy {
  max-width: 720px;
}

.newsletter-copy > p:not(.section-kicker) {
  max-width: 610px;
  margin: 27px 0 32px;
  color: #9da49e;
  font-family: var(--display);
  font-size: 18px;
  line-height: 1.7;
}

.subscribe-form {
  max-width: 650px;
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid rgba(225, 215, 192, 0.32);
}

.subscribe-form input {
  width: 100%;
  padding: 17px 3px;
  color: #f0ede5;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: var(--display);
  font-size: 17px;
}

.subscribe-form input::placeholder {
  color: #6f7972;
}

.subscribe-form button {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--gold);
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.newsletter-copy > small {
  margin-top: 13px;
  display: block;
  color: #68726c;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.06em;
}

.subscribe-success {
  max-width: 650px;
  padding: 20px 0;
  color: #d1bc86;
  border-top: 1px solid rgba(225, 215, 192, 0.22);
  border-bottom: 1px solid rgba(225, 215, 192, 0.22);
  font-family: var(--display);
  font-size: 20px;
}

.site-footer {
  padding: 70px max(5vw, calc((100vw - 1320px) / 2)) 40px;
  background: #070a09;
}

.site-footer > .brand {
  margin-bottom: 50px;
}

.footer-links {
  padding: 28px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  color: #9ba19b;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
}

.footer-bottom {
  padding-top: 27px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 50px;
  color: #626b65;
  font-family: var(--mono);
  font-size: 8px;
  line-height: 1.6;
  text-transform: uppercase;
}

.footer-bottom p {
  max-width: 720px;
  margin: 0;
}

.footer-bottom span {
  text-align: right;
}

@media (max-width: 1100px) {
  .hero {
    min-height: 960px;
    height: auto;
  }

  .hero-grid {
    grid-template-columns: 1fr 0.9fr;
  }

  .hero h1 {
    font-size: clamp(62px, 8.4vw, 90px);
  }

  .tree-stage {
    min-height: 650px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .feature-stack {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
  }

  .feature-small {
    grid-template-columns: 0.65fr 1.35fr;
  }

  .lens-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .lens-card {
    min-height: 360px;
  }

  .standard-copy {
    padding-right: 5vw;
  }

  .newsletter-section {
    grid-template-columns: 0.7fr 1.3fr;
    gap: 40px;
  }

  .newsletter-tree {
    width: 280px;
    height: 280px;
  }
}

@media (max-width: 820px) {
  .site-header,
  .hero-grid,
  .season-nav {
    width: min(100% - 36px, 720px);
  }

  .site-header {
    min-height: 86px;
    grid-template-columns: 1fr auto;
  }

  .primary-nav {
    display: none;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .hero-copy {
    padding: 70px 0 0;
  }

  .hero h1 {
    font-size: clamp(62px, 15vw, 96px);
  }

  .hero-dek {
    font-size: 17px;
  }

  .tree-stage {
    min-height: 520px;
    margin-top: -15px;
  }

  .oak-scene {
    inset: -3% -10% -8%;
  }

  .tree-caption {
    top: 15%;
  }

  .season-nav button {
    min-height: 82px;
    padding: 0 13px;
    grid-template-columns: 1fr;
    align-content: center;
    gap: 4px;
  }

  .season-nav button > span {
    display: none;
  }

  .season-nav button > small {
    justify-self: start;
  }

  .season-nav button strong {
    font-size: 16px;
  }

  .manifesto-strip {
    justify-content: flex-start;
    overflow: hidden;
  }

  .section {
    width: min(100% - 36px, 720px);
    padding: 100px 0;
  }

  .section-heading {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .feature-stack {
    grid-template-columns: 1fr;
  }

  .lens-card {
    min-height: 330px;
  }

  .library-header {
    display: grid;
  }

  .search-field {
    width: 100%;
  }

  .article-row {
    grid-template-columns: 70px 1fr;
    gap: 18px;
  }

  .article-index {
    width: 54px;
    height: 72px;
  }

  .article-tail {
    min-height: 0;
    padding: 0 0 26px 88px;
    grid-column: 1 / -1;
    grid-template-columns: auto auto 1fr;
    justify-items: start;
    align-items: center;
    border-left: 0;
  }

  .article-tail a {
    margin: 0 0 0 auto;
  }

  .standard-section {
    grid-template-columns: 1fr;
  }

  .standard-copy {
    padding: 100px 24px 40px;
  }

  .standard-ledger {
    margin: 0 24px 80px;
  }

  .newsletter-section {
    padding: 90px 24px;
    grid-template-columns: 1fr;
  }

  .newsletter-tree {
    display: none;
  }

  .site-footer {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 560px) {
  .header-action {
    font-size: 0;
  }

  .header-action .arrow {
    font-size: 16px;
  }

  .hero-copy {
    padding-top: 52px;
  }

  .eyebrow {
    margin-bottom: 18px;
    max-width: 280px;
    line-height: 1.5;
  }

  .hero h1 {
    font-size: clamp(52px, 17vw, 74px);
    line-height: 0.9;
  }

  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 21px;
  }

  .tree-stage {
    min-height: 470px;
  }

  .tree-caption {
    right: 0;
  }

  .interaction-note {
    display: none;
  }

  .season-nav {
    overflow-x: auto;
    grid-template-columns: repeat(4, minmax(112px, 1fr));
  }

  .manifesto-item:nth-of-type(n + 3) {
    display: none;
  }

  .section-heading h2,
  .library-header h2,
  .standard-copy h2,
  .newsletter-copy h2 {
    font-size: 44px;
  }

  .feature-main {
    grid-template-rows: 310px auto;
  }

  .feature-art {
    min-height: 310px;
  }

  .feature-art::before {
    width: 250px;
    height: 250px;
    left: 12%;
  }

  .feature-content {
    padding: 27px 24px 30px;
  }

  .feature-content h3 {
    font-size: 30px;
  }

  .feature-small {
    grid-template-columns: 1fr;
  }

  .feature-mini-art {
    min-height: 210px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .lens-grid {
    grid-template-columns: 1fr;
  }

  .lens-card {
    min-height: 290px;
  }

  .lens-season {
    margin-top: 44px;
  }

  .article-row {
    grid-template-columns: 1fr;
    padding: 25px 0;
  }

  .article-index {
    display: none;
  }

  .article-body {
    padding: 0;
  }

  .article-body h3 {
    font-size: 26px;
  }

  .article-tail {
    padding: 0;
  }

  .standard-ledger {
    padding: 22px;
  }

  .standard-ledger dl > div {
    grid-template-columns: 1fr;
    gap: 9px;
  }

  .subscribe-form {
    grid-template-columns: 1fr;
  }

  .subscribe-form button {
    min-height: 52px;
    border-top: 1px solid rgba(225, 215, 192, 0.16);
  }

  .footer-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
  }

  .footer-bottom span {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
