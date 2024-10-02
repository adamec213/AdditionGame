let exerciseCount = 0;
let completeExcercise = false;

// Generate random binary numbers of length 8
function generateBinaryNumber(length) {
    let binary = '0';
    for (let i = 1; i < length; i++) {
        binary += Math.round(Math.random());
    }
    return binary;
}

// Perform bitwise addition and calculate the sum
function bitwiseAdd(bin1, bin2) {
    let sumResult = '';
    let carry = 0;

    for (let i = bin1.length - 1; i >= 0; i--) {
        let bit1 = parseInt(bin1[i], 2);
        let bit2 = parseInt(bin2[i], 2);
        let sum = bit1 + bit2 + carry;
        carry = sum >= 2 ? 1 : 0;
        sumResult = (sum % 2).toString(2) + sumResult;
    }

    if (carry) {
        sumResult = carry + sumResult;
    }

    return sumResult.padStart(9, '0');
}

// Populate binary numbers and reset the result message
function populateBinaryNumbers() {
    const length = 9; // Length of binary numbers (8 bits + 1 carry)
    const firstNumber = generateBinaryNumber(length);
    const secondNumber = generateBinaryNumber(length);

    const firstRow = document.getElementById('first-row');
    const secondRow = document.getElementById('second-row');
    const inputRow = document.getElementById('input-row');
    const carryToggleRow = document.getElementById('carry-toggle-row');
    const resultMessage = document.getElementById('result');

    firstRow.innerHTML = '';
    secondRow.innerHTML = '';
    inputRow.innerHTML = '';
    carryToggleRow.innerHTML = ''; // Clear carry toggle row
    resultMessage.style.display = 'none'; // Hide result message when a new task is generated

    const sumResult = bitwiseAdd(firstNumber, secondNumber);

    for (let i = 0; i < length; i++) {
        firstRow.innerHTML += `<div class="grid-item">${firstNumber[i]}</div>`;
        secondRow.innerHTML += `<div class="grid-item">${secondNumber[i]}</div>`;
        inputRow.innerHTML += `<input type="text" maxlength="1" id="bit${i}" onkeydown="handleEnterKey(event, ${i})">`;
        carryToggleRow.innerHTML += `<div class="carry-bit" id="carry${i}" onclick="toggleCarry(${i})"></div>`;
    }

    window.correctSum = sumResult;
}

// Handle Enter key press to move to the left
function handleEnterKey(event, currentIndex) {
    if (event.key === "Enter") {
        event.preventDefault();
        const previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
            document.getElementById(`bit${previousIndex}`).focus();
        }
    }
}

// Check if the user's input matches the correct sum
function checkAnswer() {
    let userSumAnswer = '';

    for (let i = 0; i <= 8; i++) {
        const sumInput = document.getElementById(`bit${i}`);
        sumInput.classList.remove('correct', 'incorrect');

        const userBitValue = sumInput.value;
        if (userBitValue === window.correctSum[i]) {
            sumInput.classList.add('correct');
        } else {
            sumInput.classList.add('incorrect');
        }

        userSumAnswer += userBitValue;
    }

    const result = document.getElementById('result');
    if (userSumAnswer === window.correctSum) {
        result.textContent = 'Richtig!';
        result.classList.remove('incorrect');
        result.classList.add('correct');
        result.style.display = 'block';
        incrementExerciseCounter();
    } else {
        result.textContent = 'Falsch, versuche es nochmal.';
        result.classList.remove('correct');
        result.classList.add('incorrect');
        result.style.display = 'block';
    }
}

// Toggle carry bits
function toggleCarry(index) {
    const carryBit = document.getElementById(`carry${index}`);
    carryBit.classList.toggle('active');
    carryBit.textContent = carryBit.classList.contains('active') ? '1' : '';
}

// Increment the exercise counter and update display
function incrementExerciseCounter() {
	if(!completeExcercise){
		exerciseCount += 1;
		completeExcercise = true;
	}
    document.getElementById('exercise-counter').textContent = `Gelöste Übungen: ${exerciseCount}`;
}

// Start a new exercise
function newExercise() {
	completeExcercise = false;
    populateBinaryNumbers();
    document.getElementById('result').style.display = 'none'; // Hide the result when a new exercise starts
}

// Initialize the game
newExercise();
