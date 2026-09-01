// Atualização dinâmica da data no topo (Formato Editorial)
const currentDateEl = document.getElementById('currentDate');
if (currentDateEl) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  currentDateEl.textContent = today.toLocaleDateString('pt-BR', options);
}

// Alternância de Tema Claro / Escuro
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  themeToggleBtn.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
});

// Modal para Leitura Completa de Notícias
const modal = document.getElementById('articleModal');
const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

const renderModalContent = (content) => {
  const paragraphs = String(content || '')
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  modalContent.innerHTML = paragraphs.length
    ? paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')
    : '<p>Conteúdo indisponível no momento.</p>';
};

document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const title = button.getAttribute('data-title');
    const tag = button.getAttribute('data-tag');
    const content = button.getAttribute('data-content');

    modalTitle.textContent = title;
    modalTag.textContent = tag;
    renderModalContent(content);

    modal.classList.add('active');
  });
});

const closeModal = () => modal.classList.remove('active');
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Validação do Formulário de Contato da Redação
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  const name = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  if (!name.value.trim()) {
    nameError.style.display = 'block';
    isValid = false;
  } else {
    nameError.style.display = 'none';
  }

  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.style.display = 'none';
  }

  const message = document.getElementById('message');
  const messageError = document.getElementById('messageError');
  if (!message.value.trim()) {
    messageError.style.display = 'block';
    isValid = false;
  } else {
    messageError.style.display = 'none';
  }

  if (isValid) {
    alert('Mensagem enviada com sucesso para a redação do TechPulse!');
    contactForm.reset();
  }
});