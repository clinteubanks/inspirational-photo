document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.getElementById('random-image');
    const quoteElement = document.getElementById('random-quote');
    const imageContainer = document.querySelector('.image-container'); // Get the container

    const images = [
        'Lisa_J_lowrez.jpg',
        'Clint_Linc_lowrez.jpg',
        'Clint_E_lowrez.jpg',
        'Lisa_Grace_lowrez.jpg'
    ];

    let quotes = [];
    let isInitialLoad = true; // Flag for initial load
    const FADE_DURATION = 500; // ms, should match CSS transition duration

    // Function to fetch and parse quotes
    async function loadQuotes() {
        try {
            const response = await fetch('quotes.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            quotes = text.split('\n')
                       .map(line => line.trim())
                       .filter(line => line.length > 0)
                       .map(line => line.replace(/^"|"$/g, ''));
            console.log("Quotes loaded:", quotes);
            if (quotes.length === 0) {
                console.error("No quotes loaded. Check quotes.txt format.");
                quoteElement.textContent = "Error loading quotes.";
                return;
            }
            // Start the cycle once quotes are loaded
            updateContent(); // Initial display
            setInterval(updateContent, 10000); // Update every 10 seconds
        } catch (error) {
            console.error('Error loading quotes:', error);
            quoteElement.textContent = "Failed to load quotes.";
        }
    }

    // Function to update image and quote
    function updateContent() {
        if (images.length === 0 || quotes.length === 0) {
            console.warn("No images or quotes available to display.");
            return;
        }

        const performUpdate = () => {
            // Select random image
            const randomImageIndex = Math.floor(Math.random() * images.length);
            const selectedImage = images[randomImageIndex];
            imageElement.src = selectedImage;
            imageElement.alt = `Random image ${randomImageIndex + 1}`;
            console.log("Selected image:", selectedImage);

            // Select random quote
            const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
            const selectedQuote = quotes[randomQuoteIndex];
            quoteElement.textContent = selectedQuote;
            console.log("Selected quote:", selectedQuote);

            // --- Advanced Features (Placeholder) ---
            adjustQuoteStyle(imageElement, quoteElement);

            // Fade back in
            imageContainer.classList.remove('fade-out');
        };

        if (isInitialLoad) {
            performUpdate();
            isInitialLoad = false;
        } else {
            // Fade out first
            imageContainer.classList.add('fade-out');
            setTimeout(performUpdate, FADE_DURATION); // Wait for fade-out to complete
        }
    }

    // Basic function to adjust quote style (placeholder for contrast/face detection)
    function adjustQuoteStyle(img, quoteP) {
        // For now, we use a semi-transparent background and text shadow in CSS.
        // Real face detection and dynamic color adjustment requires more complex JS or a library.
        console.log("Adjusting quote style (basic)");
        // Example: Reset to default styles (could be expanded)
        quoteP.style.color = 'white';
        quoteP.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        quoteP.style.bottom = '10%'; // Reset position
    }

    // Load quotes when the page is ready
    loadQuotes();
}); 