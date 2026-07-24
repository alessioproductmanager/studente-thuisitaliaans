/* ==========================================
   THUIS ITALIAANS — SCRIPT.JS
========================================== */
document.addEventListener('DOMContentLoaded', () => {
/* ===== REVIEWS CAROUSEL ===== */
const LG = (document.documentElement.lang || 'nl').slice(0,2).toLowerCase();
const ETICHETTA = ({nl:'Ga naar review', en:'Go to review', it:'Vai alla recensione'})[LG] || 'Ga naar review';
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
if (track) {
const cards = Array.from(track.children);
// build dots
cards.forEach((_, i) => {
const dot = document.createElement('button');
dot.setAttribute('aria-label', `${ETICHETTA} ${i + 1}`);
if (i === 0) dot.classList.add('active');
dot.addEventListener('click', () => {
cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
            });
dotsWrap.appendChild(dot);
        });
const dots = Array.from(dotsWrap.children);
const setActiveDot = () => {
const trackLeft = track.scrollLeft;
let closestIndex = 0;
let closestDistance = Infinity;
cards.forEach((card, i) => {
const distance = Math.abs(card.offsetLeft - trackLeft);
if (distance < closestDistance) {
closestDistance = distance;
closestIndex = i;
                }
            });
dots.forEach((dot, i) => dot.classList.toggle('active', i === closestIndex));
        };
track.addEventListener('scroll', () => {
window.requestAnimationFrame(setActiveDot);
        }, { passive: true });
const scrollByCard = (direction) => {
const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap
track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
        };
if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));
setActiveDot();
    }
/* il modulo di contatto ora vive in js/modulo-contatto.js */
});