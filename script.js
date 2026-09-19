// --- LÓGICA DO SLIDER COMPARATIVO (ANTES & DEPOIS) ---
const slider = document.getElementById('comparison-slider');
const beforeWrapper = document.querySelector('.img-before-wrapper');
const handle = document.querySelector('.slider-handle');

if (slider) {
  let isDragging = false;

  const updateSliderPosition = (x) => {
    const rect = slider.getBoundingClientRect();
    let position = x - rect.left;

    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percentage = (position / rect.width) * 100;
    beforeWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  slider.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Suporte a Telas Sensíveis ao Toque (Mobile)
  slider.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  });
}

// --- CALCULADORA DE ORÇAMENTO INSTANTÂNEO ---
function calculateTotal() {
  const itemPrice = parseFloat(document.getElementById('item-type').value) || 0;
  const imperChecked = document.getElementById('add-imper').checked;
  const petChecked = document.getElementById('add-pet').checked;

  let total = itemPrice;
  if (imperChecked) total += parseFloat(document.getElementById('add-imper').value);
  if (petChecked) total += parseFloat(document.getElementById('add-pet').value);

  document.getElementById('total-price').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
  return total;
}

// --- ENVIO VIA WHATSAPP ---
function sendWhatsApp() {
  const name = document.getElementById('client-name').value.trim();
  const neighborhood = document.getElementById('client-neighborhood').value.trim();
  const selectElement = document.getElementById('item-type');
  const selectedItemText = selectElement.options[selectElement.selectedIndex].text;
  
  const imper = document.getElementById('add-imper').checked ? "Sim" : "Não";
  const pet = document.getElementById('add-pet').checked ? "Sim" : "Não";
  const total = calculateTotal();

  if (!name || !neighborhood) {
    alert("Por favor, preencha seu nome e bairro antes de continuar.");
    return;
  }

  // NUMERO DO WHATSAPP DO NEGÓCIO (Coloque o número real com DDD aqui)
  const phoneNumber = "5500999999999"; 

  const message = `Olá! Gostaria de um orçamento para higienização:\n\n` +
    `👤 *Nome:* ${name}\n` +
    `📍 *Bairro/Cidade:* ${neighborhood}\n` +
    `🛋️ *Estofado:* ${selectedItemText}\n` +
    `🛡️ *Impermeabilização:* ${imper}\n` +
    `🐾 *Tratamento Pet:* ${pet}\n\n` +
    `💰 *Estimativa do Site:* R$ ${total.toFixed(2).replace('.', ',')}`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
