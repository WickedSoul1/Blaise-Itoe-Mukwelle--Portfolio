const buttons = document.querySelectorAll(".filter button");

const cards = document.querySelectorAll(".project-card");

buttons.forEach(button => {

button.addEventListener("click", () => {

buttons.forEach(btn => btn.classList.remove("active"));

button.classList.add("active");

const filter = button.dataset.filter;

cards.forEach(card => {

if(filter==="all"){

card.classList.remove("hide");

}

else if(card.classList.contains(filter)){

card.classList.remove("hide");

}

else{

card.classList.add("hide");

}

});

});

});


// Scroll Reveal Animation

const reveals = document.querySelectorAll(".reveal");

function reveal(){

reveals.forEach(section=>{

const top = section.getBoundingClientRect().top;

if(top < window.innerHeight - 120){

section.classList.add("active");

}

});

}

window.addEventListener("scroll", reveal);

reveal();

// Project images: restore saved images or use SVG placeholders; enable per-card uploads
document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.project-card');
	cards.forEach((card, idx) => {
		const i = idx + 1;
		const img = document.getElementById(`projectImg${i}`);
		const titleEl = card.querySelector('.content h2');
		const title = titleEl ? titleEl.textContent.trim() : `Project ${i}`;

		// helper to generate SVG placeholder
		function svgPlaceholder(text, w=800, h=450){
			const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%23eef9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Poppins, sans-serif' font-size='28' fill='%2323395d'>${text}</text></svg>`;
			return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
		}

		const label = document.querySelector(`label[for="projectUpload${i}"]`);

		// restore saved image if present
		try {
			const saved = localStorage.getItem(`projectImage-${i}`);
			if (saved && img) {
				img.src = saved;
				if (label) label.style.display = 'none';
			} else if (img) img.src = svgPlaceholder(title);
		} catch (e) {
			if (img) img.src = svgPlaceholder(title);
		}

		// upload handler for project images
		const upload = document.getElementById(`projectUpload${i}`);
		if (upload && img) {
			upload.addEventListener('change', (event) => {
				const file = event.target.files && event.target.files[0];
				if (!file) return;
				const reader = new FileReader();
				reader.onload = (loadEvent) => {
					const dataUrl = loadEvent.target.result;
					img.src = dataUrl;
					if (label) label.style.display = 'none';
					try {
						localStorage.setItem(`projectImage-${i}`, dataUrl);
					} catch (err) {
						console.error('Could not save project image', err);
					}
				};
				reader.readAsDataURL(file);
			});
		}
	});
});