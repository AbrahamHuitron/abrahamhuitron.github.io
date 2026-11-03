# Abraham Huitron — Personal Website & Web Resume (`www.abrahamhuitron.com`)

Modern, analytics-inspired personal website and web-based resume for **Abraham Huitron** (Senior Data Analyst & Business Intelligence Specialist).

## Features
- **Analytics-Inspired Modern UI**: Dark & Light mode toggle (`localStorage` persisted) with executive KPI summary cards.
- **Interactive Experience & Skills**: Filter roles by category (`Power BI & Reporting`, `SQL & Data Eng`, `Leadership & Teaching`) or click any skill badge to highlight matching roles.
- **Print / Save as PDF**: Built-in `@media print` stylesheet that formats the entire site into a clean, ATS- and executive-ready printable resume when clicking **Print / Save PDF** (`Ctrl+P`).
- **Future-Ready JPEG Dashboard Gallery**: Pre-wired `#projects` section and full-screen Lightbox modal ready for Power BI `.jpg`/`.png` screenshots.

## How to Add Power BI JPEG Screenshots Later
1. Place your `.jpg` or `.png` dashboard images inside the `images/` folder (e.g., `images/sales-dashboard.jpg`).
2. Open `index.html` and locate `<section id="projects" class="section" hidden>`.
3. Remove the `hidden` attribute from `<section id="projects" class="section">`.
4. Uncomment `<a href="#projects">Projects</a>` in the top navigation bar.
5. Duplicate `<article class="gallery-card" ...>` inside `.gallery-grid` for each dashboard screenshot you want to showcase.
