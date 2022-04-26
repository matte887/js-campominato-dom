// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

/*
    1. Creare la griglia
        1.1 Creare un numero di div pari al livello scelto.
        1.2 In ogni div inserire un numero progressivo.
    2. Aggiungere un event listener ad ogni div per fare in modo che venga aggiunta una classe per fargli cambiare colore.

*/

// Aggiungo un eventListener al tasto play: la griglia compare.
document.getElementById("play").addEventListener("click", function() {
    // Richiamo il valore del selettore della scelta livello...
    const difficultySelector = document.getElementById("level").value;
    
    let difficulty;
    
    // ...e assegno un valore diverso alla difficulty a seconda della selezione.
    if (difficultySelector === "easy") {
        difficulty = 100;
    } else if (difficultySelector === "medium") {
        difficulty = 81;
    } else if (difficultySelector === "crazy") {
        difficulty = 49;
    }

    // Seleziono il contenitore HTML
    const gameContainer = document.querySelector(".game-grid");
    // Tolgo la classe .hidden dalla griglia
    gameContainer.classList.remove("hidden");
    
    // Resetto il doppio click sul tasto play
    gameContainer.innerHTML = "";

    // Seleziono l'elemento html che contiene il risultato e lo faccio sparire al click del play.
    document.getElementById("result").innerHTML = "";
    
    // Aggiungo la classe hidden all'istruzione
    const instruction = document.querySelector("h2");
    instruction.classList.add("hidden");

    // Setto il numero di bombe
    const nbrOfBombs = 16;
    // Richiamo la funzione che piazza le bombe.
    const bombsArray = generateRndDigitInRange(nbrOfBombs, difficulty);
    console.log("Le bombe sono sotto: ", bombsArray);

    // Calcolo il numero di celle senza bomba per poter stabilire la vincita...
    const safeCellsNumber = difficulty - nbrOfBombs;
    // ...a questo scopo servirà anche un array dove mettere le celle cliccate.
    const clickedSafeCells = [];

    // Creo un ciclo che richiama la funzione che genera i div un numero di volte corrispondente al livello scelto.
    for (let i = 1; i <= difficulty; i++) {
        // Richiamo la funzione che genera gli elementi div
        const gridElement = generateGridElement(i);
        
        // Appendo il div al contenitore HTML.
        gameContainer.append(gridElement);

        // Aggiungo l'opportuna classe al gridElement per settare la sua dimensione.
        if (difficultySelector === "easy") {
            gridElement.classList.add("easy");
        } else if (difficultySelector === "medium") {
            gridElement.classList.add("medium");
        } else if (difficultySelector === "crazy") {
            gridElement.classList.add("crazy");
        }
        
        // Aggiungo un event listener
        gridElement.addEventListener("click", handleCellClick);
        

        /**
         * Descrizione: la funzione colora l'elemento di un colore diverso a seconda che sia o no nell'array
         * La funziona non ritorna niente.
         */
        function handleCellClick() {
            // Prelevo il numero della cella cliccata
            const thisCell = parseInt(this.querySelector("span").textContent);
            // Se questo numero è presente nell'array delle bombe...
            if (bombsArray.includes(thisCell)) {
                // ...l'utente perde.
                this.classList.add("bomb");
                endGame(clickedSafeCells.length, "lose");
            // Altrimenti
            } else {
                this.classList.add("clicked");
                
                // annullo eventuali ulteriori click su this...
                this.style.pointerEvents = "none";
                // ...e pusho il numero in un altro array.
                clickedSafeCells.push(thisCell);
                console.log("Celle sicure cliccate: ", clickedSafeCells);

                // Faccio comparire il risultato
                if (clickedSafeCells.length >= safeCellsNumber) {
                    endGame(clickedSafeCells.length, "win");
                }
            }; 

            
            /**
             * Descrizione: la funzione stampa il messaggio di fine gioco.
             * @param {number} clickedSafeCells
             * @param {string} response -> "win" se il giocatore ha vinto, sennò "lose".
             * La funzione non restituisce nulla.
             */
            function endGame(clickedSafeCells, response) {
                const result = document.getElementById("result");
                let resultMessage;
                if (response === "win") {
                    resultMessage = `Hai vinto!`;
                } else if (response === "lose") {
                    resultMessage = `Hai perso! Hai indovinato solo ${clickedSafeCells} celle!`;
                }
                result.innerHTML = resultMessage;
                result.classList.remove("hidden");
            }

        };
        
    };
});



// FUNCTIONS
/**
 * Descrizione: la funzione crea un div con dentro il numero i.
 * @param {Number} digitToPush -> è il numero di celle che voglio creare.
 * @returns {any} -> restituisce un div che rappresenta l'elemento della griglia.
 */
function generateGridElement(digitToPush) {
    // Creo un nuovo elemento HTML.
    const newElement = document.createElement("div");

    // Aggiungo uno span all'elemento appena creato.
    newElement.innerHTML = `<span>${digitToPush}</span>`;

    // Assegno la classe grid-element al div.
    newElement.classList.add("grid-element");    

    // Restituisco il risultato
    return newElement;
}

/**
 * Descrizione: la funzione genera numberOfDigits numeri tra 1 e upperLimit.
 * @param {number} numberOfDigits -> numero di digit che vogliamo generare.
 * @param {number} upperLimit -> limite superiore entro i quali i numeri generati devono stare.
 * @returns {any} array con i numeri generati.
 */
function generateRndDigitInRange(numberOfDigits, upperLimit) {
    let rndDigits = [];

    while (rndDigits.length < numberOfDigits) {
        const thisDigit = getRndInteger(1, upperLimit);
        if (!rndDigits.includes(thisDigit)) {
            rndDigits.push(thisDigit);
        };
    };

    return rndDigits;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


