if (!CSS.supports('selector(:where())')) {
    const galleryFigures = document.querySelectorAll("figure")

    // loop over each HTML figure element to find if figcaption is present
    for (let figure of galleryFigures) {
        console.log(figure.children.length)
        if (figure.children.length === 2) {
            figure.style.height = '18rem';
            figure.style.borderRadius = '10px';
            figure.style.background = 'linear-gradient(to right, #935116, #FAE5D3)'
            figure.style.color = 'white';
            figure.style.backgroundSize = '400% 400%';
        }
    }
}

