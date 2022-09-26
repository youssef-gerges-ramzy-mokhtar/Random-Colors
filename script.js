"use strict";

// HTML Elements //
const colorField = document.getElementById("color")
const submitBtn = document.getElementById("submit")
const randomColorBtn = document.getElementById("randomColor")
const pageTitle = document.getElementById("title")
const errorMsg = document.getElementById("error")

// validColor() check if the color entered by the user is valid HexaDecmial Color Value, and displays error messages for the user
function validColor(color) {
	if (color === "") {
		errorMsg.textContent = "Input Field is Empty";
		return false;
	}

	if (color[0] !== "#") {
		errorMsg.textContent = "Please include # at the beggining of the Hex Color";
		return false
	}

	if (color.length !== 7 && color.length !== 4) {
		errorMsg.textContent = "Hex Color length is invalid."
		return false;
	}

	for (let i = 1; i < color.length; i++) {
		const validHex1 = color[i] >= '0' && color[i] <= '9'
		const validHex2 = color[i] >= 'a' && color[i] <= 'f'
		const validHex3 = color[i] >= 'A' && color[i] <= 'F'
		if (!validHex1 && !validHex2 && !validHex3) {
			errorMsg.textContent = "Invalid Hex Digits";
			return false
		}
	}

	return true
}


// isBlack() checks if the color hex value is a black color
function isBlack(color) {
	if (color === "#000000") return true;
	if (color === "#000") return true;

	return false;
}


// changeElColors() changes the pageTitle, colorField & submitBtn based on the specifed color
function changeElColors(color) {
	pageTitle.style.color = color
	
	colorField.style.color = color
	colorField.style.borderColor = color
	
	errorMsg.style.color = color
}


// generateRandomColor() generates a random hex color and returns this color
function generateRandomColor() {
	const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
	let color = "#"

	for (let i = 0; i < 6; i++) {
		const randomHexDigit = Math.floor(Math.random() * hex.length)
		color += hex[randomHexDigit]
	}

	return color
}


// colorElements() changes the color of the HTML Elements based on a color
function colorElements(color) {
	// Setting the HTML Elements in the page to the specified color
	document.body.style.backgroundColor = color
	colorField.style.backgroundColor = color
	submitBtn.style.backgroundColor = color
	randomColorBtn.style.backgroundColor = color

	// Removing any previous error messages, and any text in the input field
	colorField.value = ""
	errorMsg.textContent = ""
}


randomColorBtn.addEventListener("click", function(e) {
	e.preventDefault()

	const randomColor = generateRandomColor()
	colorElements(randomColor)
})

submitBtn.addEventListener("click", function(e) {
	e.preventDefault()
	const color = colorField.value

	if (!validColor(color)) return

	colorElements(color)

	if (isBlack(color)) changeElColors("white")
	else changeElColors("black")
})