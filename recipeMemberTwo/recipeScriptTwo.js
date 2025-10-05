document.addEventListener('DOMContentLoaded', function() {
    const recipeImage = document.getElementById('recipeImage');
    const imageInput = document.getElementById('imageInput');

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                recipeImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }); 
});
