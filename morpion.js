// Initialisation variables
const player = ["❌", "⭕"];
let tour = 0;
const joueuractuel = player[tour];
let grille;
let drawscore = 0;
let winCountX = 0; // Compteur de victoires pour le joueur X
let winCountO = 0;
let h1 = document.getElementById("h1");

console.log("Init Valeurs OK, jeu prêt");

// Fonctions
function jouer(evt) {
  // Déclaration de la fonction jouer
  if (this.innerHTML == "") {
    // Si la case est vide
    this.innerHTML = player[tour]; // Ajouter au HTML le caractère du tour
    if (verify(this.dataset.index, player[tour])) {
      // Si la foncton verify est vraie, cela renvoie le player[tour]
      h1.innerHTML = "Le joueur " + player[tour] + " a gagné !";
      console.log("Le joueur " + player[tour] + " a gagné !"); // Console.log
      scoreboard(player[tour]); // Appel de la fonction qui permet d'ajouter +1 au mec qui a gagné
      renitialisation(); // Appel de la fonction rénitialisation
      return true; // La fonction retourne vraie pour une condition
    }
    alterner(); // Faire en sorte que l'autre joueur place
  }
  let empty = false; // Vérifier le match nul
  for (let i = 0; i < 9; i++) {
    // Pour toutes les cases d'index 0 à 9
    if (grille[i].innerHTML == "") {
      // Si la case est vide
      empty = true; // Grille pas complète
      break; // Pour ne pas que ça tourne en boucle
    }
  }
  if (!empty) {
    // SI cases full
    alert("Match nul !"); // Pop-up match nul
    draw(); //Lance la fonction draw
    console.log("Match nul !"); // Console.log
    for (let i = 0; i < 9; i++) {
      // Reset si match nul
      grille[i].innerHTML = "";
    }
  }
}
//Mise en place de l'alternance entre dles deux joueurs
function alterner() {
  tour = (tour + 1) % player.length;
  return joueuractuel;
}
function reset() {
  location.reload(true); // Reset all en refreshant la page
}
//Tableau d'affichage pour les victoires
function scoreboard(winner) {
  if (winner === "❌") {
    winCountX++; // Victoire =1
    console.log("Le joueur X a gagné ! Total de victoires : " + winCountX); //Message
    let winX = document.getElementById("winX"); //Je récup la balise winX dans le html
    winX.innerHTML = winCountX; // Je lui ajoute cette variable
  } else if (winner === "⭕") {
    winCountO++;
    console.log("Le joueur O a gagné ! Total de victoires : " + winCountO);
    let winO = document.getElementById("winO");
    winO.innerHTML = winCountO;
  }
}
function draw() {
  drawscore = drawscore + 1;
  console.log("Nombre de match nuls " + drawscore);
  let drawhtml = document.getElementById("drawhtml"); // HTML --> Variable
  drawhtml.innerHTML = drawscore;
}
function renitialisation() {
  let rejouer = confirm(
    "Le joueur " + player[tour] + " a gagné ! Voulez-vous rejouer ?"
  );

  if (rejouer) {
    // Si l'utilisateur veut rejouer
    for (let i = 0; i < 9; i++) {
      grille[i].innerHTML = "";
    }
    jouer = true; // La partie peut reprendre
  } else {
    // Si l'utilisateur clique sur "Annuler"
    h1.innerHTML = "Partie finie ! ";
  }

  return jouer;
}
function verify(pos, joueuractuel) {
  //Premier de la ligne
  ligne = Math.trunc(pos / 3) * 3;
  if (
    grille[ligne].innerHTML === joueuractuel &&
    grille[ligne + 1].innerHTML === joueuractuel &&
    grille[ligne + 2].innerHTML === joueuractuel
  ) {
    return true;
  }
  //Première colonne
  let colonne = pos % 3;
  if (
    grille[colonne].innerHTML === joueuractuel &&
    grille[colonne + 3].innerHTML === joueuractuel &&
    grille[colonne + 6].innerHTML === joueuractuel
  ) {
    return true;
  }

  //Diagonale \
  if (pos % 4 === 0) {
    if (
      grille[0].innerHTML === joueuractuel &&
      grille[4].innerHTML === joueuractuel &&
      grille[8].innerHTML === joueuractuel
    ) {
      return true;
    }
  }
  //Diagonale /
  if (pos == 2 || pos == 4 || pos == 6) {
    if (
      grille[2].innerHTML === joueuractuel &&
      grille[4].innerHTML === joueuractuel &&
      grille[6].innerHTML === joueuractuel
    ) {
      return true;
    }
  }
}

// Code principal
grille = document.querySelectorAll(".morpion td");
for (let i = 0; i < 9; i++) {
  grille[i].addEventListener("click", jouer);
  grille[i].dataset.index = i;
}
