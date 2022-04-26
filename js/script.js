// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

/*
    1. Creare la griglia
        1.1 Creare un numero di div pari al livello scelto.
        1.2 In ogni div inserire un numero progressivo.
    2. Aggiungere un event listener ad ogni div per fare in modo che venga aggiunta una classe per fargli cambiare colore.

*/


document.getElementById("play").addEventListener("click", function() {
    // Richiamo il selettore della scelta livello...
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
    // Resetto il doppio click sul tasto play
    gameContainer.innerHTML = "";

    // Tolgo la classe .hidden dalla griglia
    gameContainer.classList.remove("hidden");
                                  
    // Aggiungo la classe hidden all'istruzione
    const instruction = document.querySelector("h2");
    instruction.classList.add("hidden");
    
    
    // Creo un ciclo che richiama la funzione che genera i div un numero di volte corrispondente al livello scelto.
    for (let i = 1; i <= difficulty; i++) {
        // Richiamo la funzione che genera gli elementi div
        const gridElement = generateGridElement(i);
        
        // Appendo il div al contenitore HTML.
        gameContainer.append(gridElement);

        // Aggiungo l'opportuna classe al gridElement
        if (difficultySelector === "easy") {
            gridElement.classList.add("easy");
        } else if (difficultySelector === "medium") {
            gridElement.classList.add("medium");
        } else if (difficultySelector === "crazy") {
            gridElement.classList.add("crazy");
        }
        
        // Aggiungo un'event listener
        gridElement.addEventListener("click", handleCellClick);
    };
});



// FUNCTION
/**
 * Descrizione: la funzione crea un div con dentro il numero i.
 * @param {Number} digitToPush-> è il numero di celle che voglio creare.
 * @returns {any} -> restituisce un div che rappresenta l'elemento della griglia.
 */
function generateGridElement(digitToPush) {
    // Creo un nuovo elemento HTML.
    const newElement = document.createElement("div");

    // Aggiungo uno span all'elemento appena creato.
    newElement.innerHTML = `<span>${digitToPush}</span>`;

    // Assegno la classe grid-element al div.
    newElement.classList.add("grid-element");    

    console.log(newElement);

    return newElement;
};

/**
 * Descrizione: la funzione colora l'elemento
 * La funziona non ritorna niente
 */
function handleCellClick() {
    this.classList.add("clicked");
}