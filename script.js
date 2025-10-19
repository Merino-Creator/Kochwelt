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