const boton = document.getElementById("buscar");
const input = document.getElementById("pokemon");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", buscarPokemon);

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        buscarPokemon();

    }

});

function buscarPokemon() {

    const nombre = input.value.toLowerCase().trim();

    if (nombre === "") {

        alert("Escribe el nombre de un Pokémon.");

        return;

    }

    resultado.innerHTML = "<h2>🔄 Buscando...</h2>";

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)

        .then(response => {

            if (!response.ok) {

                throw new Error();

            }

            return response.json();

        })

        .then(data => {

            mostrarPokemon(data);

        })

        .catch(() => {

            resultado.innerHTML =

            `
            <div class="error">

                <h2>Pokémon no encontrado</h2>

                <p>Intenta nuevamente.</p>

            </div>
            `;

        });

}

function mostrarPokemon(data){

    const tipo = data.types[0].type.name;

    const colores = {

        grass:"#78C850",
        fire:"#F08030",
        water:"#6890F0",
        electric:"#F8D030",
        psychic:"#F85888",
        ice:"#98D8D8",
        dragon:"#7038F8",
        dark:"#705848",
        fairy:"#EE99AC",
        bug:"#A8B820",
        rock:"#B8A038",
        ghost:"#705898",
        poison:"#A040A0",
        ground:"#E0C068",
        fighting:"#C03028",
        normal:"#A8A878",
        steel:"#B8B8D0",
        flying:"#A890F0"

    };

    resultado.innerHTML =

    `
    <div class="card" style="background:${colores[tipo]};">

        <img src="${data.sprites.other["official-artwork"].front_default}">

        <h2>${data.name.toUpperCase()}</h2>

        <p><strong>ID:</strong> ${data.id}</p>

        <p><strong>Tipo:</strong> ${data.types.map(t=>t.type.name).join(", ")}</p>

        <p><strong>Altura:</strong> ${data.height}</p>

        <p><strong>Peso:</strong> ${data.weight}</p>

        <h3>Habilidades</h3>

        <p>${data.abilities.map(a=>a.ability.name).join(", ")}</p>

        <h3>Estadísticas</h3>

        <p>❤️ HP: ${data.stats[0].base_stat}</p>

        <p>⚔ Ataque: ${data.stats[1].base_stat}</p>

        <p>🛡 Defensa: ${data.stats[2].base_stat}</p>

        <p>⚡ Velocidad: ${data.stats[5].base_stat}</p>

    </div>

    `;

}