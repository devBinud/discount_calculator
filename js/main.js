// ===== Service Worker Registration (PWA) =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
    .then(reg => console.log('✅ Service Worker registered:', reg.scope))
    .catch(err => console.error('❌ Service Worker registration failed:', err));
}

// ===== Install Prompt Handler =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.createElement('button');
  installBtn.textContent = 'Install App';
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #d28c24;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    font-size: 16px;
    z-index: 9999;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(installBtn);

  installBtn.addEventListener('click', () => {
    installBtn.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('✅ User accepted install prompt');
      } else {
        console.log('❌ User dismissed install prompt');
      }
      deferredPrompt = null;
    });
  });
});

// ===== Discount Calculation Logic =====
function calculateDiscount() {
  const originalPrice = parseFloat(document.getElementById("originalPrice").value);
  const discountPercent = parseFloat(document.getElementById("discountPercent").value);

  if (isNaN(originalPrice) || isNaN(discountPercent)) {
    alert("⚠️ Please enter valid numbers in both fields.");
    return;
  }

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  });

  document.getElementById("discountAmount").textContent = formatter.format(discountAmount);
  document.getElementById("finalPrice").textContent = formatter.format(finalPrice);
}

// ===== Reset Display on Input Change =====
function resetOutput() {
  document.getElementById("discountAmount").textContent = "₹0.00";
  document.getElementById("finalPrice").textContent = "₹0.00";
}

// ===== Attach Event Listeners After DOM Load =====
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("originalPrice").addEventListener("input", resetOutput);
  document.getElementById("discountPercent").addEventListener("input", resetOutput);
});
