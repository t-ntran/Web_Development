document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const toggleButton = document.getElementById('toggleButton');
  
    // Check the user's preference from localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      body.classList.add(currentTheme);
    }
  
    // Toggle between light and dark mode
    toggleButton.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
  
      // Save the user's preference to localStorage
      localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
  
      // Optionally, you can include additional logic for other theme changes
    });
  });
  