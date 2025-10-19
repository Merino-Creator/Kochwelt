function changeAmount() {
    let personen = parseFloat(document.getElementById("peopleCount").value);
    if (isNaN(personen) || personen < 1) {
        alert("Bitte gib eine gültige Anzahl an Portionen ein.");
        return;
    }

    let zeilen = document.querySelectorAll("#ingredientsTable td");

    for (let i = 0; i < zeilen.length; i++) {
        let zelle = zeilen[i];
        let originalMenge = parseFloat(zelle.getAttribute("data-original"));

        if (!isNaN(originalMenge)) {
            let neuerWert = Math.round(originalMenge * personen * 100) / 100;

            // Text ohne Mengenangabe ermitteln
            let einheitText = zelle.textContent.replace(/^\d+([.,]\d+)?\s*/, '');

            // Neuen Text schreiben
            zelle.textContent = neuerWert + ' ' + einheitText;
        }
    }
}

function toggleRespMenu(){
    document.getElementById("resp_menu").classList.toggle('resp_menu_closed')
}