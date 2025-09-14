import './style.css';
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

document.addEventListener('DOMContentLoaded', async () => {

  // --- 1. 3D Particle Background Initialization (with Error Handling) ---
  try {
    await loadSlim(tsParticles);
    await tsParticles.load({ id: "particles-js", options: { /* ... particle options ... */ } });
  } catch (error) {
    console.error("Error loading particles:", error);
  }

  // --- 2. Mobile Sidebar Toggle ---
  const sidebar = document.getElementById('sidebar') as HTMLElement;
  const menuButton = document.getElementById('menu-button') as HTMLButtonElement;
  if (sidebar && menuButton) {
    menuButton.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });
  }

  // --- 3. Live Table Search ---
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const activityTable = document.getElementById('activity-table') as HTMLElement;
  if (searchInput && activityTable) {
    const tableRows = activityTable.querySelectorAll('tr');
    searchInput.addEventListener('input', (e) => {
      const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
      tableRows.forEach(row => {
        const title = (row as HTMLElement).dataset.gameTitle?.toLowerCase() || '';
        if (title.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // --- 4. Staggered Entry Animations ---
  const animatedElements = document.querySelectorAll('.animate-in');
  animatedElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const delayValue = htmlElement.style.getPropertyValue('--delay');
    const delay = parseInt(delayValue || '0', 10);
    setTimeout(() => {
      element.classList.add('visible');
    }, delay);
  });
  
  // --- 5. Changeable Profile Picture ---
  const profileContainer = document.getElementById('profile-container') as HTMLElement;
  const profilePic = document.getElementById('profile-pic') as HTMLImageElement;
  const fileUpload = document.getElementById('file-upload') as HTMLInputElement;

  // On page load, check if a custom picture is saved in localStorage
  const savedPic = localStorage.getItem('userProfilePic');
  if (savedPic) {
    profilePic.src = savedPic;
  }

  // When the user clicks the profile picture container, trigger the hidden file input
  if (profileContainer && fileUpload) {
    profileContainer.addEventListener('click', () => {
      fileUpload.click();
    });
  }

  // When the user selects a new file
  if (fileUpload && profilePic) {
    fileUpload.addEventListener('change', () => {
      const file = fileUpload.files?.[0];
      if (file) {
        const reader = new FileReader();
        // Read the file as a Data URL (base64 string)
        reader.readAsDataURL(file);
        
        reader.onload = () => {
          const newPicDataUrl = reader.result as string;
          // Update the image on the page
          profilePic.src = newPicDataUrl;
          // Save the new image to localStorage
          localStorage.setItem('userProfilePic', newPicDataUrl);
        }
      }
    });
  }
});