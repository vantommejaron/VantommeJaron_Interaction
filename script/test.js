('use strict');
// var ListTypes = [];
// var listTypes1 = [];
// var listTypes2 = [];
// var ListTypesId = [];

// DATA OPHALEN

const handleData = function (
  url,
  callbackFunctionName,
  callbackErrorFunctionName = null,
  method = 'GET',
  body = null
) {
  fetch(url, {
    method: method,
    body: body,
    // headers: {
    //   'content-type': 'application/json',
    // },
  })
    .then(function (response) {
      if (!response.ok) {
        console.warn(
          `>> Probleem bij de fetch(). Statuscode: ${response.status}`
        );
        if (callbackErrorFunctionName) {
          console.warn(
            `>> Callback errorfunctie ${callbackErrorFunctionName.name}(response) wordt opgeroepen`
          );
          callbackErrorFunctionName(response);
        } else {
          console.warn(
            '>> Er is geen callback errorfunctie meegegeven als parameter'
          );
        }
      } else {
        // console.info('>> Er is een response teruggekomen van de server');
        return response.json();
      }
    })
    .then(function (jsonObject) {
      if (jsonObject) {
        // console.info('>> JSONobject is aangemaakt');
        // console.info(
        //   `>> Callbackfunctie ${callbackFunctionName.name}(response) wordt opgeroepen`
        // );
        callbackFunctionName(jsonObject);
      }
    })
    .catch(function (error) {
      console.warn(`>>fout bij verwerken json: error`);
      if (callbackErrorFunctionName) {
        callbackErrorFunctionName(undefined);
      }
    });
};

// // FILTER ON ID 1 - 905
// let GetListPokemonIdLow = function (jsonObject) {
//   const pokemon_names = [];
//   const pokemon_ids = [];
//   var pokemons = jsonObject.results;
//   for (const item of pokemons) {
//     if (pokemon_names.length <= 904) {
//       pokemon_names.push(item.name);
//       const id = item.url;
//       const pokemon_id = id.split('/')[6];
//       pokemon_ids.push(pokemon_id);
//     }
//   }
//   console.log(pokemon_names);
//   var tellerindex = 1;
//   const ListTypesPokemon1 = [];
//   const ListTypesPokemon2 = [];
//   // plaats bepalen van item omdat ze niet in juiste volgorde staan
//   while (tellerindex <= 905) {
//     // console.log(tellerindex)
//     let index = ListTypesId.indexOf(tellerindex);
//     listIndex.push(index);
//     tellerindex++;
//   }
//   //  de items in een List steken die juist staan volgens id
//   for (let i = 0; i <= 904; i++) {
//     // console.log(ListTypes[listIndex[i]]);
//     ListTypesPokemon1.push(listTypes1[listIndex[i]]);
//     ListTypesPokemon2.push(listTypes2[listIndex[i]]);
//     // console.log(ListTypes)
//   }
//   // console.log(ListTypesPokemon1)
//   // console.log(pokemon_names)
//   // console.log(pokemon_ids)
//   Limit_Pokemons(
//     pokemon_names,
//     pokemon_ids,
//     ListTypesPokemon1,
//     ListTypesPokemon2
//   );
// };

// // FILTER ON ID 905 - 1
// let GetListPokemonIdHigh = function (jsonObject) {
//   const pokemon_names = [];
//   const pokemon_ids = [];
//   var pokemons = jsonObject.results;
//   for (const item of pokemons) {
//     if (pokemon_names.length <= 904) {
//       pokemon_names.push(item.name);
//       const id = item.url;
//       const pokemon_id = id.split('/')[6];
//       pokemon_ids.push(pokemon_id);
//     }
//   }
//   var tellerindex = 1;
//   const ListTypesPokemon1 = [];
//   const ListTypesPokemon2 = [];
//   // plaats bepalen van item omdat ze niet in juiste volgorde staan
//   while (tellerindex <= 905) {
//     // console.log(tellerindex)
//     let index = ListTypesId.indexOf(tellerindex);
//     listIndex.push(index);
//     tellerindex++;
//   }
//   //  de items in een List steken die juist staan volgens id
//   for (let i = 0; i <= 904; i++) {
//     // console.log(ListTypes[listIndex[i]]);
//     ListTypesPokemon1.push(listTypes1[listIndex[i]]);
//     ListTypesPokemon2.push(listTypes2[listIndex[i]]);
//     // console.log(ListTypes)
//   }
//   pokemon_names.reverse();
//   pokemon_ids.reverse();
//   ListTypesPokemon1.reverse();
//   ListTypesPokemon2.reverse();
//   // console.log(pokemon_names);
//   // console.log(pokemon_ids);
//   Limit_Pokemons(
//     pokemon_names,
//     pokemon_ids,
//     ListTypesPokemon1,
//     ListTypesPokemon2
//   );
// };

// POKEMONS VERSPRINGEN PER 40
let Limit_Pokemons = function (
  pokemon_names,
  pokemon_ids,
  ListTypesPokemon1,
  ListTypesPokemon2
) {


  let begin = 0;
  let einde = 40;
  let paginanummer = 1;
  const pokemon_names_limit = [];
  const pokemon_ids_limit = [];
  const pokemon_type1_limit = [];
  const pokemon_type2_limit = [];
  for (var teller = begin; teller < einde; teller++) {
    pokemon_names_limit.push(pokemon_names[teller]);
    pokemon_ids_limit.push(pokemon_ids[teller]);
    pokemon_type1_limit.push(ListTypesPokemon1[teller].toUpperCase());
    pokemon_type2_limit.push(ListTypesPokemon2[teller].toUpperCase());
  }

  ShowPokemon(
    pokemon_names_limit,
    pokemon_ids_limit,
    pokemon_type1_limit,
    pokemon_type2_limit
  );

  document
    .getElementById('view_more')
    .addEventListener('click', myFunctionMore);
  function myFunctionMore() {
    paginanummer++;
    if (paginanummer < 23) {
      begin = begin + 40;
      einde = einde + 40;
    } else if (paginanummer == 23) {
      begin = begin + 40;
      einde = einde + 25;
    } else {
    }

    if (paginanummer > 23) {
      paginanummer = 1;
      begin = 0;
      einde = 40;
    }

    // console.log(begin);
    // console.log(einde);
    const element = document.getElementById('paginanummer');
    element.innerHTML = `<button class="o-button__pagenummer" id="view_less"><svg class="pagenummer_icon"  xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
                              Pagina ${paginanummer} van 23
                        <button class="o-button__pagenummer" id="view_more"><svg class="pagenummer_icon"  xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>`;
    document
      .getElementById('view_more')
      .addEventListener('click', myFunctionMore);
    document
      .getElementById('view_less')
      .addEventListener('click', myFunctionLess);

    const pokemon_names_limit = [];
    const pokemon_ids_limit = [];
    const pokemon_type1_limit = [];
    const pokemon_type2_limit = [];

    for (var teller = begin; teller < einde; teller++) {
      pokemon_names_limit.push(pokemon_names[teller]);
      pokemon_ids_limit.push(pokemon_ids[teller]);
      pokemon_type1_limit.push(ListTypesPokemon1[teller].toUpperCase());
      pokemon_type2_limit.push(ListTypesPokemon2[teller].toUpperCase());
      window.scroll(0, 0);
    }
    ShowPokemon(
      pokemon_names_limit,
      pokemon_ids_limit,
      pokemon_type1_limit,
      pokemon_type2_limit
    );
  }
  document
    .getElementById('view_less')
    .addEventListener('click', myFunctionLess);
  function myFunctionLess() {
    paginanummer--;
    if (paginanummer == 22) {
      begin = begin - 40;
      einde = einde - 25;
    } else if (begin != 0) {
      begin = begin - 40;
      einde = einde - 40;
    } else if (begin == 0) {
      begin = 880;
      einde = 905;
      paginanummer = 23;
    }
    // console.log(begin)
    // console.log(einde)

    const element = document.getElementById('paginanummer');
        element.innerHTML = `<button class="o-button__pagenummer" id="view_less"><svg class="pagenummer_icon"  xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
                              Pagina ${paginanummer} van 23
                        <button class="o-button__pagenummer" id="view_more"><svg class="pagenummer_icon"  xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>`;
    document
      .getElementById('view_more')
      .addEventListener('click', myFunctionMore);
    document
      .getElementById('view_less')
      .addEventListener('click', myFunctionLess);

    const pokemon_names_limit = [];
    const pokemon_ids_limit = [];
    const pokemon_type1_limit = [];
    const pokemon_type2_limit = [];
    for (var teller = begin; teller < einde; teller++) {
      
      pokemon_names_limit.push(pokemon_names[teller]);
      pokemon_ids_limit.push(pokemon_ids[teller]);
      pokemon_type1_limit.push(ListTypesPokemon1[teller].toUpperCase());
      pokemon_type2_limit.push(ListTypesPokemon2[teller].toUpperCase());
      window.scrollTo(0, 0);
    }
    // console.log(pokemon_names_limit);
    // console.log(pokemon_ids_limit);
    // console.log(pokemon_type1_limit);
    // console.log(pokemon_type2_limit);

    ShowPokemon(
      pokemon_names_limit,
      pokemon_ids_limit,
      pokemon_type1_limit,
      pokemon_type2_limit
    );
  }
};

// // let GetPokemonIdLow = function (jsonObject) {
// //   const pokemon_names = [];
// //   const pokemon_ids = [];
// //   var pokemons = jsonObject.results;
// //   console.log(pokemons);
// //   for (const item of pokemons) {
// //     if (pokemon_names.length <= 904) {
// //       pokemon_names.push(item.name);
// //       const id = item.url;
// //       const pokemon_id = id.split('/')[6];
// //       pokemon_ids.push(pokemon_id);
// //     }
// //   }
// //   console.log(pokemon_ids);
// //   ShowPokemon(pokemon_names, pokemon_ids);
// // };

// // let GetPokemonIdHigh = function (jsonObject) {
// //   const pokemon_names = [];
// //   const pokemon_ids = [];
// //   var pokemons = jsonObject.results;
// //   console.log(pokemons);
// //   for (const item of pokemons) {
// //     if (pokemon_names.length <= 904) {
// //       pokemon_names.push(item.name);
// //       const id = item.url;
// //       const pokemon_id = id.split('/')[6];
// //       pokemon_ids.push(pokemon_id);
// //     }
// //   }
// //   pokemon_names.reverse();
// //   pokemon_ids.reverse();
// //   ShowPokemon(pokemon_names, pokemon_ids);
// // };

// // id omzetten naar een id met 3 cijfers

const IdNaarIdFoto = function (id) {
  var id = id.toString();
  if (id.length == 3) {
    return id;
  }

  if (id.length == 2) {
    id = `0${id.charAt(0)}${id.charAt(1)}`;
    return id;
  }

  if (id.length == 1) {
    id = `00${id.charAt(0)}`;
    return id;
  }
};

// Tonen van de pokekemons
let ShowPokemon = function (
  pokemon_names,
  pokemon_ids,
  pokemon_type1_limit,
  pokemon_type2_limit
) {
  let html = '';
  for (let item of pokemon_names) {
    const location_pokmeon_list = pokemon_names.indexOf(item);
    html += `<button data-pokemon_id="${pokemon_ids[location_pokmeon_list]}" class="card js-pokemon-popup">
                <div class="card-item-title">#${IdNaarIdFoto(pokemon_ids[location_pokmeon_list])}</div>
                  <div class="card-item-picture">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${IdNaarIdFoto(pokemon_ids[location_pokmeon_list])}.png" alt="">
                  </div>
                  <div class="card-item-name">${item.toUpperCase()}</div>
                  <div class="card-item-type">
                    <div class="position_type1"><div class="${pokemon_type1_limit[location_pokmeon_list]}">${pokemon_type1_limit[location_pokmeon_list]}</div>
                  </div>
                    <div class="position_type2"><div class="${pokemon_type2_limit[location_pokmeon_list]}">${pokemon_type2_limit[location_pokmeon_list]}</div>
                  </div>
                </div>
              </button> `;
  }
  document.querySelector('.js-pokemon_cards').innerHTML = html;
  ClosePopup();
};

// // let SortPokemonsOnIdLow = function () {
// //   var limit = 20;
// //   const x = handleData(
// //     `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}}`,
// //     GetPokemonIdLow
// //   );
// //   document.getElementById('view_more').addEventListener('click', myFunction);
// //   function myFunction() {
// //     limit = limit + 20;
// //     const x = handleData(
// //       `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}}`,
// //       GetPokemonIdLow
// //     );
// //   }
// //   return x;
// // };

// // let SortPokemonsOnIdHigh = function () {
// //   var limit = 20;
// //   const x = handleData(
// //     `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}}`,
// //     GetPokemonIdHigh
// //   );
// //   document.getElementById('view_more').addEventListener('click', myFunction);
// //   function myFunction() {
// //     limit = limit + 20;
// //     const x = handleData(
// //       `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}}`,
// //       GetPokemonIdHigh
// //     );
// //   }
// //   return x;
// // };

// // Sorteren van de pokemons

let Pokemon_Name_List = [];
let Pokemon_Name_List_sort = [];

let Pokemon_ID_List = [];
let Pokemon_ID_List_sort = [];

let Pokemon_Type1_List = [];
let Pokemon_Type1_List_sort = [];

let Pokemon_Type2_List = [];
let Pokemon_Type2_List_sort = [];

let Pokemon_Sort_List = [];

let SortPokemons = function () {
  MakeListPokemonLowId();

  var e = document.getElementById('dropdown-menu');
  e.addEventListener('click', myFunction);
  function myFunction() {
    console.log('klik')
    var value = e.options[e.selectedIndex].value;
    if (value == 'id_low') {
        Pokemon_Name_List = [];
        Pokemon_Name_List_sort = [];
        Pokemon_ID_List = [];
        Pokemon_ID_List_sort = [];
        Pokemon_Type1_List = [];
        Pokemon_Type1_List_sort = [];
        Pokemon_Type2_List = [];
        Pokemon_Type2_List_sort = [];
        Pokemon_Sort_List = [];
      console.log('Gesorteerd van 1 - 905');
      MakeListPokemonLowId();
    }
    if (value == 'id_high') {
      console.log('Gesorteerd van 905 - 1');
      Pokemon_Name_List = [];
      Pokemon_Name_List_sort = [];
      Pokemon_ID_List = [];
      Pokemon_ID_List_sort = [];
      Pokemon_Type1_List = [];
      Pokemon_Type1_List_sort = [];
      Pokemon_Type2_List = [];
      Pokemon_Type2_List_sort = [];
      Pokemon_Sort_List = [];
      MakeListPokemonHighId;
    }
  }
};

// // Inlezen van pokemons
// let getTypes = function () {
//   // for (let i = 1; i <= 905; i++) {
//   //   // var x = document.getElementById(i);
//   //   handleData(`https://pokeapi.co/api/v2/pokemon/${i}`, show1);
//   // }
//   let teller = 1;
//   while (teller <= 905) {
//     // console.log(teller)
//     handleData(`https://pokeapi.co/api/v2/pokemon/${teller}`, show1);
//     teller++;
//   }
// };

// // Types splitsen in 2
// let show1 = function (jsonObject) {
//   ListTypesId.push(jsonObject.id);
//   // console.log("--" + jsonObject.stats[6].base_stat);
//   // console.log(ListTypesId)

//   if (jsonObject.types.length == 1) {
//     var x = jsonObject.types[0].type.name;
//     var y = '';
//   }
//   if (jsonObject.types.length == 2) {
//     var x = jsonObject.types[0].type.name;
//     var y = jsonObject.types[1].type.name;
//   } else {
//   }

//   TypesPokemonById(x, y);
// };

// // List aanmaken met Id en types
// let listIndex = [];
// let TypesPokemonById = function (x, y) {
//   listTypes1.push(`${x}`);
//   listTypes2.push(`${y}`);
//   if (listTypes1.length == 905) {
//     for (let i = 0; i <= 905; i++) {
//       // console.log(ListTypesId[i])
//       ListTypes.push(`${ListTypesId[i]}/${listTypes1[i]}/${listTypes2[i]}`);
//     }
//     // console.log(ListTypesId);
//     // console.log(listTypes1);
//     // console.log(listTypes2);
//     // console.log(myArray)
//     // for (let item of ListTypes) {
//     //   const x = item.split("/")[0]
//     //   console.log(x)
//     // }

//     // console.log(ListTypesId)
//     // let index = ListTypesId.indexOf(2)
//     // console.log(index)SortPokemons

//     // index ophalen van de cijfers om in de juiste volgorde te zetten

//     // console.log(ListTypesPokemon);

//     // console.log(listIndex)

//     // for(let item of ListTypesId){
//     //   console.log(item)
//     // }
//     // console.log(sorted);
//   }
// };

function ClosePopup() {
  const buttons = document.querySelectorAll('.js-pokemon-popup');
  const cards = document.querySelector('.js-pokemon_cards');
  // console.log(cards)
  // console.log(buttons)
  for (const btn of buttons) {
    btn.addEventListener('click', function () {
      console.log('drukken!!');
      pokemon_id_popup = btn.dataset.pokemon_id;
      // console.log(pokemon_id_popup);
      var element = document.getElementById('close_popup_card');
      element.classList.remove('o-hide-accessible');
      // cards.classList.add('o-hide-pokemons-card');
      cards.classList.add('o-hide-pokemons-card');
      getPokemonInfo(pokemon_id_popup);
    });
  }
}

function getPokemonInfo(id) {
  console.log(id);
  handleData(`https://pokeapi.co/api/v2/pokemon/${id}`, ShowPokemonInfo);
}

function ShowPokemonInfo(jsonObject) {
  // console.log(jsonObject)
  
  let name_pokemon = jsonObject.forms[0].name;
  console.log(name);

  if (name_pokemon.includes('-')) {
    var name_position = name_pokemon.indexOf('-');
    console.log(name_position);
    var name = name_pokemon.slice(0, name_position);
  } else {
    name = name_pokemon;
  }

  let pokemon_nummer = jsonObject.id;
  let height = jsonObject.height / 10;
  let weight = jsonObject.weight / 10;
  // console.log(jsonObject.abilities);
  let abilities = [];

  for (let item of jsonObject.abilities) {
    if (!item.is_hidden) {
      abilities.push(item.ability.name);
    }
  }
  for (let i = 0; i < 6; i++) {
    if (!abilities[i]) {
      abilities.push('');
    }
  }
  // console.log(abilities);

  let stats = [];
  for (let item of jsonObject.stats) {
    // console.log(item.base_stat);
    stats.push(item.base_stat);
  }

  let html = ``;

  html += `<section class="o-row-popup">
                <h2 class="tekst_popup">${name.toUpperCase()} - ${IdNaarIdFoto(
                    pokemon_nummer
                  )}</h2>
                  
                  <svg class="close_popup" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                  <button  id="close_popup" class="button_close_popup"></button>
                    <div class="o-container">
                        <article>
                            <div class="o-layout o-layout--gutter o-layout--align-center">
                                <div class="o-layout__item u-1-of-2-bp3">
                                    <img class="popup-card" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${IdNaarIdFoto(
                                      pokemon_nummer
                                    )}.png" alt="">

                                </div>
                                <div class="o-layout__item u-1-of-2-bp3">
                                    <h2 class="popup_right_top_height">Height:<p class="pokemon_info"> &nbsp;${height} m</p> </h2>
                                    <h2 class="popup_right_top_weight">Weight:<p class="pokemon_info"> &nbsp;${weight} kg</p> </h2>
                                    <h2 class="popup_right_top_abilities">Abilities:<p class="pokemon_info">&nbsp;${
                                      abilities[0]
                                    } <br>&nbsp;${abilities[1]} <br>&nbsp;${
    abilities[2]
  } </p> </h2>
                                    <div class="Chart js-Chart">
                                        <canvas id="myChart" width="800px" height="200px"></canvas>
                                    </div>
                                </div>
                            <script src="script/chart.js"></script>
                    </article>
                </div>
            </section>`;
  document.querySelector('.js-popup_card').innerHTML = html;
  close_popupcard();
  ShowChart(stats);
}

function ShowChart(stats) {
  var canvasElement = document.getElementById('myChart');
  var config = {
    type: 'bar',
    data: {
      labels: [
        'HP',
        'Attack',
        'Defense',
        'Special Attack',
        'Special Defense',
        'Speed',
      ],
      datasets: [
        {
          label: 'STATS',
          // ----------------------------------------------------------------------- bezig met de procente te berekenen (hoogste dopzoeken op internet en dan stats delen erdoor)
          // data: [
          //       (stats[0]/255)*100,
          //       (stats[1]/181)*100,
          //       (stats[2]/211)*100,
          //       (stats[3]/173)*100,
          //       (stats[4]/230)*100,
          //       (stats[5]/160)*100,
          //       ],

          data: [stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]],

          backgroundColor: [
            'rgba(255, 259, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 259, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 2,
        },
      ],
    },
  };

  var pokemonChart = new Chart(canvasElement, config);
}

function close_popupcard() {
  const cards = document.querySelector('.js-pokemon_cards');
  var element = document.getElementById('close_popup_card');
  element.classList.add('c-pop-up');
  element.classList.add('c-pop-up-animation');

  document.getElementById('close_popup').addEventListener('click', myFunction);
  // document.getElementById('close_popup_card').addEventListener('click', myFunction);

  function myFunction() {
    console.log('klik');
    var element = document.getElementById('close_popup_card');
    element.classList.add('o-hide-accessible');
    element.classList.remove('c-pop-up-animation');
    element.classList.remove('c-pop-up');
    cards.classList.remove('o-hide-pokemons-card');
  }
}

function MakeListPokemonLowId() {
  for (let i = 1; i < 906; i++) {
    handleData(`https://pokeapi.co/api/v2/pokemon/${i}`, AddToListPokemonLow);
  }
}

function MakeListPokemonHighId() {
  for (let i = 1; i < 906; i++) {
    handleData(`https://pokeapi.co/api/v2/pokemon/${i}`, AddToListPokemonHigh);
  }
}

// function AddToListPokemon(data) : Listen maken van alle pokemon's (naam, id, type1, type2)
function AddToListPokemonLow(jsonObject) {
  // -------------------- list name --------------------
  if (jsonObject.name.includes('-')) {
    console.log(jsonObject.name);
    var name_position = jsonObject.name.indexOf('-');
    console.log(name_position);
    // Console.log(jsonObject.name.slice(0,8));
    var name = jsonObject.name.slice(0,name_position);
    Pokemon_Name_List.push(name);

  } else {
    Pokemon_Name_List.push(jsonObject.name);
  }
  // --------------------- list id ---------------------
  Pokemon_ID_List.push(jsonObject.id);
  // ---------------- list type1 & type2 ---------------
  if (jsonObject.types.length == 1) {
    Pokemon_Type1_List.push(jsonObject.types[0].type.name);
    Pokemon_Type2_List.push('');
  }
  if (jsonObject.types.length == 2) {
    Pokemon_Type1_List.push(jsonObject.types[0].type.name);
    Pokemon_Type2_List.push(jsonObject.types[1].type.name);
  } else {
  }

  // -------------- list klaar (sorteren) --------------
  if (Pokemon_ID_List.length == 905) {
    // ------------- loading weg doen -------------
    var element = document.getElementById('loader');
    element.classList.add('o-hide-accessible');
    // --------- positie van list bepalen ---------
    for (let i = 1; i < 906; i++) {
      Pokemon_Sort_List.push(Pokemon_ID_List.indexOf(i));
    }
    // ---- Listen op juiste posititie zetten -----
    for (let item of Pokemon_Sort_List) {
      Pokemon_Name_List_sort.push(Pokemon_Name_List[item]);
      Pokemon_ID_List_sort.push(Pokemon_ID_List[item]);
      Pokemon_Type1_List_sort.push(Pokemon_Type1_List[item]);
      Pokemon_Type2_List_sort.push(Pokemon_Type2_List[item]);
    }
    Limit_Pokemons(
      Pokemon_Name_List_sort,
      Pokemon_ID_List_sort,
      Pokemon_Type1_List_sort,
      Pokemon_Type2_List_sort
    );
    var element = document.getElementById('paginanummer');
    element.classList.remove('o-hide-accessible');
  } else {
    console.log(Pokemon_ID_List.length);
    console.log('loading...');
  }
}

function AddToListPokemonHigh(jsonObject) {
  // -------------------- list name --------------------
  Pokemon_Name_List.push(jsonObject.name);
  // --------------------- list id ---------------------
  Pokemon_ID_List.push(jsonObject.id);
  // ---------------- list type1 & type2 ---------------
  if (jsonObject.types.length == 1) {
    Pokemon_Type1_List.push(jsonObject.types[0].type.name);
    Pokemon_Type2_List.push('');
  }
  if (jsonObject.types.length == 2) {
    Pokemon_Type1_List.push(jsonObject.types[0].type.name);
    Pokemon_Type2_List.push(jsonObject.types[1].type.name);
  } else {
  }

  // -------------- list klaar (sorteren) --------------
  if (Pokemon_ID_List.length == 905) {
    // --------- positie van list bepalen ---------
    for (let i = 1; i < 906; i++) {
      Pokemon_Sort_List.push(Pokemon_ID_List.indexOf(i));
    }
    // ---- Listen op juiste posititie zetten -----
    for (let item of Pokemon_Sort_List) {
      Pokemon_Name_List_sort.push(Pokemon_Name_List[item]);
      Pokemon_ID_List_sort.push(Pokemon_ID_List[item]);
      Pokemon_Type1_List_sort.push(Pokemon_Type1_List[item]);
      Pokemon_Type2_List_sort.push(Pokemon_Type2_List[item]);

      // ------------ list opdraaien -----------
      Pokemon_Name_List_sort.reverse();
      Pokemon_ID_List_sort.reverse();
      Pokemon_Type1_List_sort.reverse();
      Pokemon_Type2_List_sort.reverse();
    }
    Limit_Pokemons(
      Pokemon_Name_List_sort,
      Pokemon_ID_List_sort,
      Pokemon_Type1_List_sort,
      Pokemon_Type2_List_sort
    );
  } else {
    console.log(Pokemon_ID_List.length);
    console.log('loading...');
  }
}

function DarkModeSwitcher() {
  toggle = document.querySelector('.js-darkmode-toggle');
  var dark_mode_id = document.getElementById('dark_mode');

  toggle.addEventListener('change', function () {
    if (toggle.checked) {
      dark_mode_id.classList.add('dark_mode');
    } else {
      dark_mode_id.classList.remove('dark_mode');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Form_validatie 👌');
  // getTypes();
  // SortPokemons();
  DarkModeSwitcher();
  SortPokemons();
  
});
