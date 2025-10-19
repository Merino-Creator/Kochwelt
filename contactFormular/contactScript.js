function sendMail(event){
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("https://formspree.io/f/mgvnlewo", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(() => {
        window.location.href = "./send_mail.html";
    }).catch((error) => {
        console.log(error);
    });
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