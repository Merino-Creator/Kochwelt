function changeAmount() {
    var personen = parseFloat(document.getElementById("peopleCount").value);
    if (isNaN(personen) || personen < 1) {
        alert("Bitte gib eine gültige Anzahl an Portionen ein.");
        return;
    }

    var zeilen = document.querySelectorAll("#ingredientsTable td");

    for (var i = 0; i < zeilen.length; i++) {
        var zelle = zeilen[i];
        var originalMenge = parseFloat(zelle.getAttribute("data-original"));

        if (!isNaN(originalMenge)) {
            var neuerWert = Math.round(originalMenge * personen * 100) / 100;

            // Text ohne Mengenangabe ermitteln
            var einheitText = zelle.textContent.replace(/^\d+([.,]\d+)?\s*/, '');

            // Neuen Text schreiben
            zelle.textContent = neuerWert + ' ' + einheitText;
        }
    }
}