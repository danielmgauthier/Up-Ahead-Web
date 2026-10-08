// A random event colour for the page on every visit, with the binoculars to match, and a scatter
// of every pattern's shapes behind everything. A tap on empty space moves to the next colour and scatters the shapes again.

const colors = [
    ["pink", "#F52E55"], ["orange", "#F84D27"], ["yellow", "#F3A203"], ["green", "#11C844"],
    ["aqua", "#02C09E"], ["blue", "#02AADF"], ["indigo", "#3B60BD"], ["purple", "#6D45E1"],
];
let colorIndex = Math.floor(Math.random() * colors.length);

function applyColor() {
    const [name, hex] = colors[colorIndex];
    document.documentElement.style.setProperty("--hero", hex);
    // Safari tints its toolbar with this; the page's background is the colour at a tenth over white.
    const tint = [1, 3, 5].map((i) => Math.round(255 + (parseInt(hex.substr(i, 2), 16) - 255) * 0.1));
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", `rgb(${tint.join(" ")})`);
    const binoculars = document.getElementById("binoculars");
    if (binoculars) binoculars.src = `assets/upahead_${name}.png`;
}

// The background: the same scatter as assets/patterns/everything.svg, made here so it can be
// made again. The shapes are the app's patterns' (assets/shapes.json).
const TILE = 900;
const COUNT = 38;
let shapes = null;

function scatter() {
    if (!shapes) return;
    const names = [...shapes].sort(() => Math.random() - 0.5);
    const placed = [];
    const marks = [];
    const minimumDistance = TILE / Math.sqrt(COUNT) * 0.9;
    for (let attempts = 0; placed.length < COUNT && attempts < COUNT * 200; attempts++) {
        const drawn = 24 + Math.random() * 22;
        const margin = drawn * 0.8;
        const x = margin + Math.random() * (TILE - 2 * margin);
        const y = margin + Math.random() * (TILE - 2 * margin);
        if (placed.some((p) => Math.hypot(p.x - x, p.y - y) < minimumDistance)) continue;
        placed.push({ x, y });
        const scale = drawn / 200;
        const tilt = (Math.random() * 2 - 1) * 0.15 * (180 / Math.PI);
        marks.push(`<path transform="translate(${(x - drawn / 2).toFixed(1)} ${(y - drawn / 2).toFixed(1)}) scale(${scale.toFixed(3)}) rotate(${tilt.toFixed(1)})" stroke-width="${(2.5 / scale).toFixed(2)}" d="${names[placed.length % names.length]}"/>`);
    }
    // The stroke is black here; the page's opacity makes it faint.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}" width="${TILE}" height="${TILE}"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">${marks.join("")}</g></svg>`;
    document.documentElement.style.setProperty("--scatter", `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`);
}

applyColor();
fetch("assets/shapes.json").then((response) => response.json()).then((paths) => { shapes = paths; });

// Show the phones once every screenshot has decoded, so they appear together. A screenshot that
// fails to load still counts as done, so the row never stays hidden.
const phones = document.querySelector(".phones");
if (phones) {
    const images = [...phones.querySelectorAll("img")];
    Promise.all(images.map((image) => image.decode().catch(() => {}))).then(() => phones.classList.add("ready"));
}

document.addEventListener("click", (event) => {
    // Links, buttons and text are for their own purposes; anywhere else is empty space.
    if (event.target.closest("a, button, p, h1, h2, h3, li")) return;
    colorIndex = (colorIndex + 1) % colors.length;
    applyColor();
    scatter();
});
