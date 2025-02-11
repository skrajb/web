const words = [
    "about", "above", "add", "after", "again", "air", "all", "almost", "along", 
    "also", "always", "America", "an", "and", "animal", "another", "answer", 
    "any", "are", "around", "as", "ask", "at", "away", "back", "be", "because", 
    "been", "before", "began", "begin", "being", "below", "between", "big", 
    "book", "both", "boy", "but", "by", "call", "came", "can", "car", "carry", 
    "change", "children", "city", "close", "come", "could", "country", "cut", 
    "day", "did", "different", "do", "does", "don't", "down", "each", "earth", 
    "eat", "end", "enough", "even", "every", "example", "eye", "face", "family", 
    "far", "father", "feet", "few", "find", "first", "follow", "food", "for", 
    "form", "found", "four", "from", "get", "girl", "give", "go", "good", "got", 
    "great", "group", "grow", "had", "hand", "hard", "has", "have", "he", "head", 
    "hear", "help", "her", "here", "high", "him", "his", "home", "house", "how", 
    "idea", "if", "important", "in", "Indian", "into", "is", "it", "its", "it's", 
    "just", "keep", "kind", "know", "land", "large", "last", "later", "learn", 
    "leave", "left", "let", "letter", "life", "light", "like", "line", "list", 
    "little", "live", "long", "look", "made", "make", "man", "many", "may", "me", 
    "mean", "men", "might", "mile", "miss", "more", "most", "mother", "mountain", 
    "move", "much", "must", "my", "name", "near", "need", "never", "new", "next", 
    "night", "no", "not", "now", "number", "of", "off", "often", "oil", "old", 
    "on", "once", "one", "only", "open", "or", "other", "our", "out", "over", 
    "own", "page", "paper", "part", "people", "picture", "place", "plant", "play", 
    "point", "put", "question", "quick", "quickly", "quite", "read", "really", 
    "right", "river", "run", "said", "same", "saw", "say", "school", "sea", 
    "second", "see", "seem", "sentence", "set", "she", "should", "show", "side", 
    "small", "so", "some", "something", "sometimes", "song", "soon", "sound", 
    "spell", "start", "state", "still", "stop", "story", "study", "such", "take", 
    "talk", "tell", "than", "that", "the", "their", "them", "then", "there", 
    "these", "they", "thing", "think", "this", "those", "thought", "three", 
    "through", "time", "to", "together", "too", "took", "tree", "try", "turn", 
    "two", "under", "until", "up", "us", "use", "very", "walk", "want", "was", 
    "watch", "water", "way", "we", "well", "went", "were", "what", "when", 
    "where", "which", "while", "white", "who", "why", "will", "with", "without", 
    "word", "work", "world", "would", "write", "year", "you", "young", "your"
];

const randomText = Array.from({ length: 5000 }, () =>
    words[Math.floor(Math.random() * words.length)]
);

let currentIndex = 0; // Index of the current word being typed
let highlightIndex = 0; // Index of the word currently highlighted
let correctWordsTyped = 0;
let wrongWords = 0;
let totalTypedWords = 0; // New variable to count all typed words
let timer = null;
let timeRemaining = 0;
let typedWords = [];
let testCompleted = false;
let wordsTypedCount = 0; // Count of words typed
let correctCharactersTyped = 0; // Count of correct characters typed
let wrongCharactersTyped = 0; // Count of wrong characters typed

const updateDisplayTime = () => {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (timeRemaining % 60).toString().padStart(2, "0");
    document.getElementById("time_remaining").textContent = `${minutes}:${seconds}`;
};

const resetTest = () => {
    clearInterval(timer);
    timer = null;
    timeRemaining = parseInt(document.getElementById("timer").value);
    currentIndex = 0; // Reset current index
    highlightIndex = 0; // Reset highlight index
    correctWordsTyped = 0;
    wrongWords = 0;
    totalTypedWords = 0; // Reset total typed words
    wordsTypedCount = 0; // Reset words typed count
    correctCharactersTyped = 0; // Reset correct characters count
    wrongCharactersTyped = 0; // Reset wrong characters count
timeTaken=0;
    typedWords = [];
    document.getElementById("typed_text").value = ""; // Clear the input on reset
    document.getElementById("results").innerHTML = "";
    document.getElementById("test_text").innerHTML = ""; // Clear previous text
    updateDisplayTime();
    updateLiveResults(); // Reset live results display
    displayNextWords(); // Display the first set of words
};

const displayNextWords = () => {
    const nextWords = randomText.slice(currentIndex, currentIndex + 10).join(" ");
    document.getElementById("test_text").innerHTML += `<div class="word-set">${nextWords}</div>`;
};


    document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        // Disable specific keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Disable Ctrl key
            if (event.ctrlKey) {
                event.preventDefault();
            }

            // Disable Ctrl + U
            if (event.ctrlKey && event.key === 'u') {
                event.preventDefault();
            }

            // Disable Ctrl + C
            if (event.ctrlKey && event.key === 'c') {
                event.preventDefault();
            }

            // Disable F12
            if (event.key === 'F12') {
                event.preventDefault();
            }
        });



const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
		    timeTaken++;
                updateDisplayTime();
            } else {
                clearInterval(timer);
                timer = null;
                showResults();
            }
        }, 1000);
    }
};
document.getElementById("timer").addEventListener("change", function() {
    // Update the timeRemaining variable with the selected value
    timeRemaining = parseInt(this.value);
    updateDisplayTime(); // Update the displayed time
    resetTest(); // Reset the test to apply the new timer
});

const showResults = () => {
    const totalTypedWords = correctWordsTyped + wrongWords;
    const accuracy = totalTypedWords > 0 ? ((correctWordsTyped / totalTypedWords) * 100).toFixed(2) : 0;
    const speed = (totalTypedWords / (timeTaken / 60)).toFixed(2); // Words per minute

    let message = "";

    if (speed > 50 && accuracy >= 95) {
        message = "🌟 🧙‍♂️Typing Wizard! 🌟";
    } else if (speed > 40 && accuracy >= 95) {
        message = "🎉Great Job!🎉 ";
    } else if (totalTypedWords > 30 && accuracy >= 95) {
        message = "👍 Nice Effort! 👍 ";
    } else if (speed < 30 && accuracy >= 95) {
        message = "🧐 Focus and Improve! <br>Practice makes perfect! 💪";
    } else {
        message = "🚧 Every expert was once a beginner! 🌱";
    }

    // Set the testCompleted flag to true
    testCompleted = true;

    // Disable the input field
    document.getElementById("typed_text").disabled = true;

    // Clear the input field when showing results
    document.getElementById("typed_text").value = ""; // Clear the input field

    document.getElementById("results").innerHTML = `<div style=" background-color: #f1f8e9;border-radius: 10px;padding: 20px;margin-top: 20px;box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);">
       
	   <center> <h1 style="color:red;">Result</h1><h2>${message}</h2></center>
      
	  <table><td><div class="results-item">Typing Speed</td><Td>:</td><td>${speed} WPM</td></div></tr><tr>
   <Td><div class="results-item"><span class="total-count">Total Typed Words</td><Td>:</td><td></span> ${totalTypedWords}</div></td>
<tr><td>        <div class="results-item"><span class="correct-count">Correct Words</td><Td>:</td><td></span> ${correctWordsTyped} (${correctCharactersTyped} Keystrokes)</div></td>
<tr> <td>       <div class="results-item" style="color:red";><span class="incorrect-count">Incorrect Words</td><Td>:</td><td></span> ${wrongWords} ( ${wrongCharactersTyped} Keystrokes)</div></td>
<tr><td>        <div class="results-item"><span class="accuracy">Accuracy</td><Td>:</td><td></span> ${accuracy}%</div>
    </div></tr></table>`;
	
};

const updateLiveResults = () => {
    document.getElementById("live_results").innerHTML = `
       <b> <div style="Color:green; background-color:#f3f2fd; background-radius:10px;"><table width="100%"><td>Correct Words: ${correctWordsTyped} 
        <td><b  style="Color:red">Incorrect Words: ${wrongWords}</b> 
        <td><b>Total Typed Words: ${correctWordsTyped + wrongWords}</b></b></table></div>
    `;
};

// Event listeners
document.getElementById("typed_text").addEventListener("keydown", (e) => {
    const allowBackspace = document.getElementById("backspace_toggle").checked; // Check if backspace is allowed

    if (e.key === " ") {
        // Allow space to be typed in the input field
        const typedText = document.getElementById("typed_text").value.trim();
        const currentWords = randomText.slice(currentIndex, currentIndex + 10); // Get the current 10 words

        // Check if the last typed word is correct
        const lastTypedWord = typedText.split(" ").pop(); // Get the last typed word
        const expectedWord = currentWords[highlightIndex]; // Get the expected word based on the highlight index

        // Increment correct or wrong word count
        if (lastTypedWord === expectedWord) {
            correctWordsTyped++;
            correctCharactersTyped += lastTypedWord.length; // Count correct characters
        } else if (lastTypedWord !== "") {
            wrongWords++;
            wrongCharactersTyped += lastTypedWord.length; // Count wrong characters
        }

        // Increment the count of words typed
        wordsTypedCount++;

        // Move to the next word (always skip to the next word)
        highlightIndex++; // Move to the next word regardless of correctness

        // Clear the input field after completing the set
        document.getElementById("typed_text").value = ""; // Clear the input field

        // Check if 10 words have been typed
        if (wordsTypedCount >= 10) {
            // Move to the next set of words
            currentIndex += 10; // Increment by 10 to move to the next set of words
            highlightIndex = 0; // Reset highlight index for the new set

            // Reset the words typed count
            wordsTypedCount = 0;

            // Check if there are more words to display
            if (currentIndex < randomText.length) {
                displayNextWords(); // Display the next set of words
            } else {
                // If no more words, show results
                showResults();
            }
        }

        // Update live results
        updateLiveResults();
    } else if (e.key === "Backspace" && !allowBackspace) {
        e.preventDefault(); // Prevent backspace if not allowed
    }
});

document.getElementById("typed_text").addEventListener("input", (e) => {
    const typedText = e.target.value.trim();
    const currentWords = randomText.slice(currentIndex, currentIndex + 10); // Get the current 10 words
    typedWords = typedText.split(" ");

    // Update total typed words
    totalTypedWords = typedWords.length;

    // Highlight the words
    const highlightEnabled = document.getElementById("highlight_toggle").checked;
    let highlightedWords = currentWords.map((word, index) => {
        if (highlightEnabled) {
            if (index === highlightIndex) {
                return `<span class="current">${word}</span>`; // Highlight the current word
            } else if (typedWords[index] === word) {
                return `<span class="correct">${word}</span>`;
            } else if (typedWords[index] !== undefined) {
                return `<span class="incorrect">${word}</span>`;
            }
        }
        return word;
    });
    document.getElementById("test_text").innerHTML = highlightedWords.join(" ");

    // Start the timer when the user starts typing
    if (!timer) {
        startTimer();
    }

    // Update live results
    updateLiveResults();
});

// Reset the test on page load
resetTest();

    function refreshPage() {
            location.reload(); // Reloads the current page
        }

// Dark mode toggle
document.getElementById("mode_toggle_img").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("mode_toggle_img").src = document.body.classList.contains("dark-mode")
        ? "https://img.icons8.com/ios-filled/50/000000/sun.png"
        : "https://img.icons8.com/ios-filled/50/000000/moon.png";
});

// Restart button
document.getElementById("restart_button").addEventListener("click", resetTest);

// Prevent actions if the test is completed
document.getElementById("typed_text").addEventListener("keydown", (e) => {
    if (testCompleted) {
        e.preventDefault(); // Prevent any key action
        return; // Exit the function if the test is completed
    }
});

document.getElementById("typed_text").addEventListener("input", (e) => {
    if (testCompleted) {
        return; // Exit the function if the test is completed
    }
});
