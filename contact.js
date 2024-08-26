document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Send data to your backend
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // Show the success pop-up
      const popup = document.getElementById('popup-message');
      popup.style.display = 'block';

      // Hide the pop-up after 3 seconds
      setTimeout(() => {
        popup.style.display = 'none';
      }, 3000);

      // Reset the form fields
      document.getElementById('contactForm').reset();
      
    } else {
      alert('Failed to send message.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
});

// Close pop-up when clicking on close button
document.querySelector('.popup-close').addEventListener('click', function() {
  document.getElementById('popup-message').style.display = 'none';
});
