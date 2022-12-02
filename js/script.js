const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const current_rotation = 0;
const ope= document.querySelector(".open");
const capa = document.querySelector(".capa");

const type = document.querySelector(".type");
const ability = document.querySelector(".ability");
const back = document.querySelector(".display");

const display = document.querySelector(".display");

const pokemonIcon = document.querySelector(".pokemon__anime");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btns = document.querySelector(".buttons");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const shiny = document.querySelector(".shiny");
const btnStats = document.querySelector(".btn__stats");
const stats = document.querySelector(".stats");

const hp = document.querySelector(".hp");
const atk = document.querySelector(".atk");
const def = document.querySelector(".def");
const satk = document.querySelector(".satk");
const sdef = document.querySelector(".sdef");
const spd = document.querySelector(".spd");
const rod = document.querySelector(".rot");


let searchPokemon = 2;

function abre(){
  capa.style.display = "block";
  document.getElementById('cp').style.animation = "capa 1.3s";

  setTimeout(() => {
    timm();
  }, 1300);
}
function timm() {
  capa.style.display = "none";
}
function fecha(){
  capa.style.display = "block";
  document.getElementById('cp').style.animation = "cape 1.3s";
}




async function fetchPokemon(pokemon) {
  const APIResponse = await fetch(
//    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/$(pokemon)`
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

async function renderPokemon(pokemon) {

  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  pokemonImage.style.display = "block";
  pokemonImage.src = "images/loading.svg";

  const data = await fetchPokemon(pokemon);

  if (data) {
//    back.innerHTML = `https://pokeapi.co/api/v2/pokemon-color/7`;

    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.species.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = 
//      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
      data["sprites"]["other"]["official-artwork"]["front_default"]
//    data["sprites"]["other"]["dream_world"]["front_default"]
//    data["sprites"]["other"]["home"]["front_default"]

    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found!";
    pokemonNumber.innerHTML = "";
    input.value = "";
  }

  let showShiny = false;
  pokemonIcon.src = "images/loading.svg";

  shiny.addEventListener("click", () => {

    showShiny = !showShiny;

    if (showShiny === true) {
        pokemonImage.src = "images/loading.svg";

      if (pokemonName.innerHTML === "Not found!") {
        pokemonImage.style.display = "none";
        stats.style.display = "none";
        showShiny.style.display = "none";
        showStats.style.display = "none";
      } else{
       pokemonImage.src = 
         data["sprites"]["other"]["home"]["front_default"]
 //        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_shiny"];
      }   
      if (data.id > 898) {
        pokemonImage.src = data["sprites"]["other"]["official-artwork"]["front_default"]
        showShiny.style.display = "none";
      }
      pokemonImage.src = 
//        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_shiny"];
        data["sprites"]["other"]["home"]["front_default"]

    } else {
      
      if (pokemonName.innerHTML === "Not found!") {
        pokemonImage.style.display = "none";
        pokemonImage.innerHTML = "none";
        stats.style.display = "none";
        showShiny.style.display = "none";
        showStats.style.display = "none";
      } else {

        pokemonImage.style.display = "block";
       pokemonImage.src = 
        data["sprites"]["other"]["official-artwork"]["front_default"]      

      }
    }
  });

  let showStats = false;
  btnStats.addEventListener("click", () => {
    typeWrite(titulo);

    pokemonIcon.style.display = "block";
    pokemonIcon.src = "images/loading.svg";
    /*    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`*/


    if (data.id < 650) {

    pokemonIcon.style.display = "block";

    pokemonIcon.src = 
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
//      data["sprites"]["other"]["official-artwork"]["front_default"]
//["home"]["front_default"]
  } else {
    pokemonIcon.style.display = "none";

  }


    showStats = !showStats;

    if (showStats === true) {
      if (pokemonName.innerHTML === "Not found!") {
        pokemonImage.innerHTML = "none";
        stats.style.display = "none";
        showShiny.style.display = "none";
        showStats.style.display = "none";
      }

      form.style.display = "none";
      btns.style.display = "none";
      stats.style.display = "inline-block";
      if (data.id > 905) {
        stats.style.display = "none";
      }
//      pokemonImage.src = 
//        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`
//      if (data.id > 898) {
//        pokemonImage.src = data["sprites"]["other"]["official-artwork"]["front_default"]
//      }

      hp.innerHTML = `<span style="color: black; text-align: left;">Hp:</span> ${data["stats"]["0"]["base_stat"]}`;
      atk.innerHTML = `<span style="color: black">Attack:</span> ${data["stats"]["1"]["base_stat"]}`;
      def.innerHTML = `<span style="color: black">Deffense:</span> ${data["stats"]["2"]["base_stat"]}`;
//      satk.innerHTML = `<span style="color: black">Sp. Attack:</span> ${data["stats"]["3"]["base_stat"]}`;
//      sdef.innerHTML = `<span style="color: black">Sp. Deffense:</span> ${data["stats"]["4"]["base_stat"]}`;
      spd.innerHTML = `<span style="color: black">Speed:</span> ${data["stats"]["5"]["base_stat"]}`;
      type.innerHTML = `<span style="color: black">Type: </span>${data["types"]["0"]["type"]["name"]}`;
      ability.innerHTML = `<span style="color: black">Ability: </span>${data["abilities"]["0"]["ability"]["name"]}, ${data["abilities"]["1"]["ability"]["name"]}`;


    } else {
      form.style.display = "inline-block";
      btns.style.display = "flex";
      stats.style.display = "none";
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);

  }
});

btnNext.addEventListener("click", () => {
  if (searchPokemon < 905) {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  }


});

renderPokemon(searchPokemon);

function typeWrite(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 26 * i)

  });
}
const titulo = document.querySelector('.tit');
//typeWrite(titulo);











