// Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuButton.addEventListener('click', function() {
          const isExpanded = mobileMenu.classList.toggle('hidden');
          
          // Animate the menu button
          const icon = mobileMenuButton.querySelector('svg path');
          if (isExpanded) {
            icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
          } else {
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
          }
        });


        // Simple counter animation
        document.addEventListener('DOMContentLoaded', function() {
            const counter = document.querySelector('.counter');
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // ms
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + '+';
                }
            };
            
            updateCount();
            
            // Back to top button
            const backToTop = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.remove('opacity-0', 'invisible');
                    backToTop.classList.add('opacity-100', 'visible');
                } else {
                    backToTop.classList.remove('opacity-100', 'visible');
                    backToTop.classList.add('opacity-0', 'invisible');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Simple FAQ toggle
            const faqButtons = document.querySelectorAll('.border button');
            faqButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const content = button.nextElementSibling;
                    const icon = button.querySelector('i');
                    
                    if (content.style.display === 'block') {
                        content.style.display = 'none';
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        content.style.display = 'block';
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            });
        });
        






let tampilSapi = 3;

function renderStar(rating) {
  let starHTML = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      starHTML += '<i class="fas fa-star"></i>';
    } else if (i < rating) {
      starHTML += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starHTML += '<i class="far fa-star"></i>';
    }
  }
  return starHTML;
}

function tampilkanSapi() {
  const container = document.getElementById("cowCards");
  container.innerHTML = "";

  for (let i = 0; i < tampilSapi && i < sapiUnggulan.length; i++) {
    const sapi = sapiUnggulan[i];
    container.innerHTML += `
    <div class="bg-white rounded-xl overflow-hidden shadow-md card-hover transition duration-300">
      <div class="relative">
        <img src="${sapi.image}" alt="${sapi.nama}" class="w-full h-64 object-cover">
        ${sapi.badge ? `<div class="absolute top-4 right-4 ${sapi.badge === 'BEST SELLER' ? 'bg-accent text-secondary' : 'bg-red-500 text-white'} px-3 py-1 rounded-full font-bold text-sm">${sapi.badge}</div>` : ""}
      </div>
      <div class="p-6">
        <h3 class="font-heading text-xl font-bold mb-2">${sapi.nama}</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">Usia: ${sapi.usia}</span>
          <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">Berat: ${sapi.berat}</span>
          <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${sapi.lokasi}</span>
        </div>
        <div class="flex justify-between items-center mb-4">
          <div>
            ${sapi.hargaAsli ? `<span class="text-sm line-through text-gray-500">${sapi.hargaAsli}</span>` : ""}
            <p class="text-xl font-bold text-primary">${sapi.hargaDiskon}</p>
          </div>
          <div class="flex text-yellow-400">${renderStar(sapi.rating)}</div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button class="bg-primary hover:bg-green-700 text-white py-2 rounded-lg transition">Detail</button>
          <a href="https://wa.me/6285330000427?text=${encodeURIComponent(sapi.whatsapp)}" class="bg-green-100 hover:bg-green-200 text-primary py-2 rounded-lg text-center transition">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
    `;
  }
}

function lihatLebihBanyak() {
  tampilSapi += 3;
  tampilkanSapi();
}

document.addEventListener("DOMContentLoaded", tampilkanSapi);


function renderFAQ(data) {
  const faqContainer = document.getElementById("faqContainer");
  faqContainer.innerHTML = "";

  data.forEach((item, i) => {
    const faqEl = document.createElement("div");
    faqEl.className = "border rounded-lg overflow-hidden";

    faqEl.innerHTML = `
      <button class="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition" data-index="${i}">
        <span class="font-semibold">${item.tanya}</span>
        <i class="fas fa-chevron-down transition-transform"></i>
      </button>
      <div class="p-4 border-t hidden">
        <p>${item.jawab}</p>
      </div>
    `;
    faqContainer.appendChild(faqEl);
  });

  // Tambah toggle behavior
  document.querySelectorAll('#faqContainer button').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('i');
      const isOpen = !content.classList.contains("hidden");

      document.querySelectorAll('#faqContainer div.p-4').forEach(c => c.classList.add("hidden"));
      document.querySelectorAll('#faqContainer i').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove("hidden");
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderFAQ(faqs);

  const searchInput = document.querySelector('input[type="text"]');
  searchInput.addEventListener('input', e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = faqs.filter(faq => faq.tanya.toLowerCase().includes(keyword));
    renderFAQ(filtered);
  });
});


document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const subjek = document.getElementById('subjek').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  const nomorWA = '6281212345678'; // ganti sesuai nomor kamu
  const teks = `Halo, saya ingin menghubungi SapiMaju.%0A%0A*Nama:* ${nama}%0A*Email:* ${email}%0A*Subjek:* ${subjek}%0A*Pesan:* ${pesan}`;
  const linkWA = `https://wa.me/${nomorWA}?text=${teks}`;

  window.open(linkWA, '_blank');
});
