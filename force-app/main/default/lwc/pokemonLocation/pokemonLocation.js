import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const NAME = 'Pokemon__c.Name';
const LATITUDE = 'Pokemon__c.Location__Latitude__s';
const LONGITUDE = 'Pokemon__c.Location__Longitude__s';
const pokemonFields = [NAME, LATITUDE, LONGITUDE];

export default class PokemonLocation extends LightningElement {
  @api recordId;
  mapMarkers = [];
  name;
  cardTitle;

  @wire(getRecord, { recordId: '$recordId', fields: pokemonFields })
  getPokemon({ error, data }) {
    if (error) {
      console.error('Error', error);
    } else if (data) {
      this.name = getFieldValue(data, NAME);
      this.cardTitle = this.name;
      const latitude = getFieldValue(data, LATITUDE);
      const longitude = getFieldValue(data, LONGITUDE);
      this.mapMarkers = [
        {
          location: { Latitude: latitude, Longitude: longitude },
          title: this.name,
          description: `Coords: ${latitude}, ${longitude}`,
        },
      ];
      console.log('Success', JSON.stringify(data));
    }
  }
}
