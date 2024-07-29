const dateElement = document.getElementById('currentDate');

function updateDateTime() {
  dateElement.textContent = new Date().toLocaleString(); 
}

updateDateTime(); // Initial display
setInterval(updateDateTime, 1000); // Update every second