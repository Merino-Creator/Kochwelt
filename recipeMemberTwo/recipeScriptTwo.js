function changeAmount() {
  let personen = parseFloat((document.getElementById("peopleCount").value || "").replace(",", "."));
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

      // Text hinter der Zahl ermitteln (entfernt führende Zahl + optional Dezimal + Leerzeichen)
      let einheitText = zelle.textContent.replace(/^\d+([.,]\d+)?\s*/, '');

      zelle.textContent = neuerWert + ' ' + einheitText;
    }
  }
}


function toggleRespMenu(){
    document.getElementById("resp_menu").classList.toggle('resp_menu_closed')
}

function randomRecipe() {
    const pages = [
      "/recipeMemberOne/recipeMemberOne.html",
      "/recipeMemberTwo/recipeMemberTwo.html",
      "/recipeMemberThree/recipeMemberThree.html",
      "/extraRecipeOne/extraRecipeOne.html",
      "/extraRecipeTwo/extraRecipeTwo.html"
    ];

    const randomIndex = Math.floor(Math.random() * pages.length);
    const randomPage = pages[randomIndex];

    window.location.href = randomPage;
  }