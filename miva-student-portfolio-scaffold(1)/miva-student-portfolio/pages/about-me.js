const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", revealSections);

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            section.classList.add("active");

        }

    });

}

revealSections();

const skills = document.querySelector(".skills");

window.addEventListener("scroll", () => {

    const top = skills.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        document.querySelectorAll(".progress").forEach(bar => {

            bar.style.width = bar.classList.contains("html") ? "95%" :
                              bar.classList.contains("css") ? "90%" :
                              bar.classList.contains("js") ? "80%" :
                              "85%";

        });

    }

});

// Profile picture upload: preview + save to localStorage
const profilePic = document.getElementById('profilePic');
const profileUpload = document.getElementById('profileUpload');
const removeBtn = document.getElementById('removeProfile');

function loadSavedProfile() {
    try {
        const data = localStorage.getItem('profileImage');
        if (data && profilePic) profilePic.src = data;
    } catch (e) {
        console.error('Could not load profile image from localStorage', e);
    }
}

function saveImageToLocalStorage(dataUrl) {
    try {
        localStorage.setItem('profileImage', dataUrl);
    } catch (e) {
        console.error('Could not save profile image to localStorage', e);
    }
}

function handleFileSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        if (profilePic) profilePic.src = dataUrl;
        saveImageToLocalStorage(dataUrl);
    };
    reader.readAsDataURL(file);
}

function removeProfile() {
    try {
        localStorage.removeItem('profileImage');
        // revert to bundled asset if available
        if (profilePic) profilePic.src = 'assets/profile picture.png';
        if (profileUpload) profileUpload.value = '';
    } catch (e) {
        console.error('Could not remove profile image', e);
    }
}

if (profileUpload) profileUpload.addEventListener('change', handleFileSelect);
if (removeBtn) removeBtn.addEventListener('click', removeProfile);
document.addEventListener('DOMContentLoaded', loadSavedProfile);