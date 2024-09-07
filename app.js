document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const context = document.getElementById('context').value;
    const screenshots = document.getElementById('screenshots').files;
    const formData = new FormData();

    formData.append('context', context); 
    for (const screenshot of screenshots) {
        formData.append('images', screenshot); 
    }

    try {
        const response = await fetch('http://localhost:3000/generate-content', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        displayOutput(result.result); 
    } catch (error) {
        console.error('Error generating test cases:', error);
        displayOutput('Failed to generate testing instructions. Please try again.');
    }
});

// function displayOutput(testCases) {
//     const outputDiv = document.getElementById('output');
//     outputDiv.textContent = testCases; 
// }
function displayOutput(testCases) {
    const outputDiv = document.getElementById('output');
    
    const htmlContent = marked.parse(testCases);

    outputDiv.innerHTML = htmlContent;
}
