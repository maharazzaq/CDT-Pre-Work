document.addEventListener("DOMContentLoaded", function() {
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];
  const artistName = document.getElementById('artist-name');
  const artworkTitle = document.getElementById('artwork-title');
  const artworkDate = document.getElementById('artwork-date');

  fetch('https://api.artic.edu/api/v1/artworks')
      .then(response => response.json())
      .then(data => {
          const artworks = data.data.slice(0, 20); // Fetching 20 artworks for a fuller gallery
          artworks.forEach(art => {
              const artworkDiv = document.createElement('div');
              artworkDiv.classList.add('artwork');
              
              const imageUrl = art.image_id
                  ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
                  : 'https://via.placeholder.com/200';

              artworkDiv.innerHTML = `
                  <img src="${imageUrl}" alt="${art.title}">
                  <div class="info">
                      <p>${art.artist_display}</p>
                      <p>${art.date_display}</p>
                  </div>
              `;

              artworkDiv.addEventListener('click', () => {
                  artistName.textContent = art.artist_display || 'Unknown Artist';
                  artworkTitle.textContent = `Title: ${art.title || 'Unknown Title'}`;
                  artworkDate.textContent = `Date: ${art.date_display || 'Unknown Date'}`;
                  modal.style.display = 'block';
              });

              gallery.appendChild(artworkDiv);
          });
      })
      .catch(error => {
          console.error('Error fetching artworks:', error);
      });

  // Close the modal when the user clicks on <span> (x)
  span.onclick = function() {
      modal.style.display = 'none';
  }

  // Close the modal when the user clicks anywhere outside of the modal
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }
});
