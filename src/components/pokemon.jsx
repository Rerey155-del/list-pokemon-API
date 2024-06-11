import{ useEffect, useState } from "react";
import "../assets/style.css"
function Pokemon() {
  const [kumpulanPokemon, setKumpulanPokemon] = useState([]);

  async function getAllPokemon() {
    const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=20"; 
    const dataWoy = await fetch(apiURL);
    const jsondata = await dataWoy.json();

    // Mendapatkan detail setiap Pokemon
    const pokemonDetail = await Promise.all(
      jsondata.results.map(async (item) => {
        const dataWoyDetail = await fetch(item.url);
        return await dataWoyDetail.json();
      })
    );

    setKumpulanPokemon(pokemonDetail);
  }

  useEffect(() => {
    getAllPokemon();
    
  }, []); 

  console.log(kumpulanPokemon);

  
  return (
    <div className="wrapper p-20">
      <div className="content ">
 
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4  ">
            {kumpulanPokemon.map((item, index) => (
           <div className="item p-8 border bg-red-800 rounded-lg hover:bg-yellow-500 " key={index}>
            <div className="bounce-animation ">
              <div className="image mb-2">
                <img src={item.sprites.front_default} alt={item.name} className="w-full" />
              </div>
              <div className="title text-center font-semibold text-white ">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
