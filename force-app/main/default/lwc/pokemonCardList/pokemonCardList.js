import { LightningElement } from 'lwc';
import getPokemons from '@salesforce/apex/PokemonClass.getPokemons'


export default class PokemonCardList extends LightningElement {
  pokemons;
  error;
  searchword=""
  connectedCallback(){
    this.loadPokemon(this.searchword)

  }
  handlesearch(event){
    this.searchword=event.target.value;
    this.loadPokemon(this.searchword)
    


  }
  loadPokemon(searchWords){
    getPokemons({searchKey:searchWords})
    .then(result=>{
      this.pokemons=result;
    })
    .catch(error=>{
      this.error=error;
    })
  }
}