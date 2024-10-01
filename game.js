let solvedExercisesCount = 0; // Initialize counter for solved exercises

// Generate random binary numbers of length 8
function generateBinaryNumber(length) {
    let binary = '';
    binary += 0; // Add leading zero
    for (let i = 0; i < length - 1; i++) {
        binary += Math.round(Math.random()); // Random 0 or 1
    }
    return binary; // Return the 8-bit binary number
}

// Perform bitwise addition and calculate the sum
function bitwiseAdd(bin1, bin2) {
    let sumResult = '';
    let carry = 0;

    for (let i = bin1.length - 1; i >= 0; i--) {
        let bit1 = parseInt(bin1[i], 2);
        let bit2 = parseInt(bin2[i], 2);

        // Perform addition with carry
        let sum = bit1 + bit2 + carry;

        // Compute the sum for this position
        carry = sum >= 2 ? 1 : 0; // Update carry for next bit
        sumResult = (sum % 2).toString(2) + sumResult; // Add the result bit
    }

    // Handle any leftover carry
    if (carry) {
        sumResult = carry + sumResult;
    }

    // Ensure the sum result is always 9 bits long
    return sumResult.padStart(9, '0');
}

// Populate binary numbers and input fields in the UI
function populateBinaryNumbers() {
    const length = 9; // Length of binary numbers (8 bits + 1 carry)
    const firstNumber = generateBinaryNumber(length);
    const secondNumber = generateBinaryNumber(length);

    const firstRow = document.getElementById('first-row');
    const secondRow = document.getElementById('second-row');
    const inputRow = document.getElementById('input-row');
    const carryToggleRow = document.getElementById('carry-toggle-row');

    firstRow.innerHTML = '';
    secondRow.innerHTML = '';
    inputRow.innerHTML = '';
    carryToggleRow.innerHTML = ''; // Clear carry toggle row

    // Get the sum result
    const sumResult = bitwiseAdd(firstNumber, secondNumber);
    
    for (let i = 0; i < length; i++) {
        firstRow.innerHTML += `<div class="grid-item">${firstNumber[i]}</div>`;
        secondRow.innerHTML += `<div class="grid-item">${secondNumber[i]}</div>`;
        // Input fields for the result (9 total including carry)
        inputRow.innerHTML += `<input type="text" maxlength="1" id="bit${i}">`;
        // Add toggle for carry bits
        carryToggleRow.innerHTML += `<div class="carry-bit" id="carry${i}" onclick="toggleCarry(${i})"></div>`;
    }

    // Store the correct sum for validation
    window.correctSum = sumResult;
}

// Toggle carry bit display
function toggleCarry(index) {
    const carryElement = document.getElementById(`carry${index}`);
    carryElement.classList.toggle('active'); // Toggle the active class
    carryElement.innerHTML = carryElement.classList.contains('active') ? '1' : ''; // Show or hide carry
}

// Check if the user's input matches the correct sum
function checkAnswer() {
    let userSumAnswer = '';
    let correct = true;

    // Reset classes for sum input fields
    for (let i = 0; i < 9; i++) { // Include the carry input
        const sumInput = document.getElementById(`bit${i}`);
        sumInput.classList.remove('correct', 'incorrect');

        // Get user input for sum bits
        const userBitValue = sumInput.value;

        // Check if the bit is correct and apply corresponding class
        if (userBitValue === window.correctSum[i]) {
            sumInput.classList.add('correct');
        } else {
            sumInput.classList.add('incorrect');
            correct = false; // Mark as incorrect if any bit is wrong
        }

        // Accumulate user input to form the complete binary result
        userSumAnswer += userBitValue;
    }

    const result = document.getElementById('result');

    // Validate the final answer
    if (correct && userSumAnswer === window.correctSum) {
        result.textContent = 'Correct!';
        incrementCounter(); // Increment the counter if the answer is correct
    } else {
        result.textContent = 'Incorrect, try again.';
    }
}

// Increment the solved exercises counter
function incrementCounter() {
    solvedExercisesCount++; // Increment the count
    const counterElement = document.getElementById('counter');
    counterElement.textContent = `Solved Exercises: ${solvedExercisesCount}`; // Update the counter display

    // Show notification
    showNotification(solvedExercisesCount); // Show notification with new count
}

// Show notification for solved exercises
function showNotification(count) {
    const notification = document.getElementById('notification');
    notification.textContent = `Solved Exercises: ${count}`; // Set notification text
    notification.classList.add('show'); // Show the notification
    setTimeout(() => {
        notification.classList.remove('show'); // Hide after 3 seconds
    }, 3000);
}

// Initialize the

// Initialize the game
populateBinaryNumbers();
