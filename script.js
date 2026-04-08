const pages = [
  {
    number: 3,
    tag: "Opening",
    title: "About Me",
    description: "This is the strongest opener because it immediately defines who you are, how your path evolved, and what kind of value your work creates. It deserves a large, uninterrupted stage.",
    bullets: [
      "Warm and credible positioning",
      "Strong educator-to-designer transition",
      "Best used as the first key visual"
    ]
  },
  {
    number: 5,
    tag: "Structure",
    title: "Personal Skills",
    description: "This page works as a quick orienting layer. It is not louder than the project pages, but it helps visitors understand the four pillars behind the rest of the portfolio.",
    bullets: [
      "Easy capability scan",
      "Supports the portfolio story",
      "Good calm pause before case studies"
    ]
  },
  {
    number: 6,
    tag: "Trust",
    title: "Clients",
    description: "The content here adds credibility without needing too much explanation. In this layout it appears like a proof point, not a heavy logo wall.",
    bullets: [
      "Shows local and international range",
      "Builds institutional trust",
      "Works best as supporting evidence"
    ]
  },
  {
    number: 8,
    tag: "Case Study 01",
    title: "Complex Research into E-Learning",
    description: "One of the most persuasive pages visually. It contains process, screenshots, and output evidence, so it benefits from a large image-first treatment.",
    bullets: [
      "Great process visibility",
      "Strong proof of instructional design work",
      "Excellent scroll centerpiece"
    ]
  },
  {
    number: 9,
    tag: "Case Study 02",
    title: "Structured QA Framework",
    description: "This page gives the portfolio depth. It proves that your value is not only design but also quality systems, review logic, and refinement.",
    bullets: [
      "Shows rigor behind the scenes",
      "Highlights QA expertise clearly",
      "Adds strong operational credibility"
    ]
  },
  {
    number: 10,
    tag: "Case Study 03",
    title: "Teacher Development Framework",
    description: "This broadens the portfolio beyond course design into framework-level and policy-connected work. It makes the profile feel more strategic.",
    bullets: [
      "Shows scale and structure",
      "Connects policy with execution",
      "Strengthens seniority impression"
    ]
  },
  {
    number: 11,
    tag: "Case Study 04",
    title: "TVET Monitoring & Assessment",
    description: "This page is rich in documentary proof. It helps the overall site feel evidence-based and mature, which is why it should remain large and centered.",
    bullets: [
      "Strong M&E credibility",
      "Useful evidence artifacts",
      "Balances design with evaluation"
    ]
  },
  {
    number: 12,
    tag: "Case Study 05",
    title: "IELTS & Communication Training",
    description: "This page gives the portfolio a more human side. It balances frameworks and systems with direct learner support and communication work.",
    bullets: [
      "Warm and relatable",
      "Shows learner-facing strength",
      "Rounds out the portfolio well"
    ]
  },
  {
    number: 13,
    tag: "Closing",
    title: "Contact",
    description: "A clean final note. It works well as the closing image before the separate contact panel at the end of the site.",
    bullets: [
      "Simple ending",
      "Clear close to the journey",
      "Good final touchpoint"
    ]
  }
];

const storyList = document.getElementById('storyList');
const progressRail = document.getElementById('progressRail');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function pagePath(number) {
  return `assets/pages/page-${String(number).padStart(2, '0')}.png`;
}

function createDots() {
  pages.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    dot.dataset.index = String(i);
    progressRail.appendChild(dot);
  });
}

function buildSection(item, index) {
  const section = document.createElement('section');
  section.className = `story-section ${index % 2 === 1 ? 'reverse' : ''}`;
  section.dataset.index = String(index);

  const frameWrap = document.createElement('div');
  frameWrap.className = 'story-frame-wrap';
  const frame = document.createElement('div');
  frame.className = 'story-frame';

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Open page ${item.number}`);

  const img = document.createElement('img');
  img.src = pagePath(item.number);
  img.alt = `${item.title} — portfolio page ${String(item.number).padStart(2, '0')}`;
  img.onerror = () => {
    button.innerHTML = `
      <div class="story-fallback">
        <div>
          <strong>Missing file: page-${String(item.number).padStart(2, '0')}.png</strong>
          <span>Add it to <code>assets/pages/</code></span>
        </div>
      </div>
    `;
  };

  button.appendChild(img);
  button.addEventListener('click', () => openLightbox(pagePath(item.number), `${item.title} · Page ${String(item.number).padStart(2, '0')}`));
  frame.appendChild(button);
  frameWrap.appendChild(frame);

  const cardWrap = document.createElement('div');
  cardWrap.className = 'story-card-wrap';
  const card = document.createElement('article');
  card.className = 'story-card';
  card.innerHTML = `
    <div class="story-kicker"><span class="story-number">${String(item.number).padStart(2, '0')}</span>${item.tag}</div>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <ul>${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
  `;
  cardWrap.appendChild(card);

  section.appendChild(frameWrap);
  section.appendChild(cardWrap);
  return section;
}

function renderSections() {
  pages.forEach((item, index) => storyList.appendChild(buildSection(item, index)));
}

function openLightbox(src, caption) {
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxImage.src = src;
  lightboxCaption.textContent = caption;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

function setupLightbox() {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
}

function setupProgress() {
  const dots = [...document.querySelectorAll('.progress-dot')];
  const sections = [...document.querySelectorAll('.story-section')];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.dataset.index);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section) => observer.observe(section));
}

createDots();
renderSections();
setupLightbox();
setupReveal();
setupProgress();
