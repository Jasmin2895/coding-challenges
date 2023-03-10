class Picker {
    constructor(target, width, height) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;

        this.context = this.target.getContext('2d');

        this.pickerCircle = { x: 10, y: 10, width: 7, height: 7 };

        this.listenForEvents();
    }

    draw() {
        this.build();
    }

    build() {
        let gradient = this.context.createLinearGradient(0, 0, this.width, 0);

        // Color Stops
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");

        //fill colors
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        //Apply white and black colors for new color shades
        gradient = this.context.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        //Circle
        this.context.beginPath();
        this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2)

        this.context.strokeStyle = 'black';
        this.context.shadowColor = 'grey';
        this.context.stroke();
        this.context.closePath();
    }

    listenForEvents() {
        let isMouseDown = false;
        const onMouseDown = (e) => {
            let currentX = e.clientX - this.target.offsetLeft;
            let currentY = e.clientY - this.target.offsetTop;
            if (currentY > this.pickerCircle.y && currentY < this.pickerCircle.y + this.pickerCircle.width && currentX > this.pickerCircle.x && currentX < this.pickerCircle.x + this.pickerCircle.width) {
                isMouseDown = true;
            } else {
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const onMouseMove = (e) => {
            if (isMouseDown) {
                let currentX = e.clientX - this.target.offsetLeft;
                let currentY = e.clientY - this.target.offsetTop;
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const onMouseUp = () => {
            isMouseDown = false;
        }

        //Register 
        this.target.addEventListener("mousedown", onMouseDown);
        this.target.addEventListener("mousemove", onMouseMove);
        this.target.addEventListener("mousemove", () => this.onChangeCallback(this.getPickedColor()));


        document.addEventListener("mouseup", onMouseUp);
    }

    getPickedColor() {
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        return { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }
}

let picker = new Picker(document.getElementById("color-picker"), 400, 300);

//Draw 
setInterval(() => picker.draw(), 1);

picker.onChange((color) => {
    let selectedColor = document.getElementsByClassName("selected")[0];
    selectedColor.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    let codeBlock = document.getElementsByTagName('code')[0]
    codeBlock.innerText = `background-color: rgb(${color.r}, ${color.g}, ${color.b})`
});


function applyOpacity() {
    let opacity = document.getElementById('opacity').value
    console.log("applyOpacity", opacity)
    let selectedColor = document.getElementsByClassName("selected")[0];
    selectedColor.style.opacity = opacity
    let codeBlock = document.getElementsByTagName('code')[0]
    codeBlock.innerText = `${codeBlock.innerText}\n opacity:${opacity}`
}

// apply similar filters for contrast, opacity, hue-rotate and drop shadow.
function adjustFilter(attribute) {
    let selectedColor = document.getElementsByClassName("selected")[0];
    let codeBlock = document.getElementsByTagName('code')[0]
    switch (attribute) {
        case 'contrast':
            let colorContrast = document.getElementById('contrast').value;
            selectedColor.style.filter = `contrast(${colorContrast}%)`
            codeBlock.innerText = replaceExistingValue(codeBlock.innerText, `filter:contrast`, `filter:contrast(${colorContrast}%)`)
            break;
        case 'grayscale':
            let grayscaleContrast = document.getElementById('grayscale').value;
            selectedColor.style.filter = `grayscale(${grayscaleContrast}%)`
            codeBlock.innerText = `${codeBlock.innerText}\n filter:grayscale(${grayscaleContrast}%)`
            break;
        case 'brightness':
            let brightnessContrast = document.getElementById('brightness').value;
            selectedColor.style.filter = `brightness(${brightnessContrast}%)`
            codeBlock.innerText = `${codeBlock.innerText}\n filter:brightness(${brightnessContrast}%)`
            break;
        case 'saturate':
            let saturateContrast = document.getElementById('saturate').value;
            selectedColor.style.filter = `saturate(${saturateContrast}%)`
            codeBlock.innerText = `${codeBlock.innerText}\n filter:saturate(${saturateContrast}%)`
            break;
        case 'sepia':
            let sepiaContrast = document.getElementById('sepia').value;
            selectedColor.style.filter = `sepia(${sepiaContrast}%)`
            codeBlock.innerText = `${codeBlock.innerText}\n filter:sepia(${sepiaContrast}%)`
            break;
        default:
            break;
    }
}

function replaceExistingValue(existingText, searchSubstring, newFilterValue) {
    console.log(existingText.indexOf(searchSubstring) > 0)
    if (existingText.indexOf(searchSubstring) > 0) {
        const re = new RegExp('\b' + searchSubstring + '.*\b', "g");
        console.log("re", re, existingText)
        const newStr = existingText.replace(re, "fgvbjn");
        console.log("newStr", newStr)
        console.log(newStr);
        return newStr
    } else {

        return `${existingText} \n ${newFilterValue}`
    }
}
