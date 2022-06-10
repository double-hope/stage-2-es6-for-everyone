import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    try{
      const endpoint = `details/fighter/${id}.json`;
      const info = require(`../../../resources/api/${endpoint}`)
      return info;
    }catch (error){
      console.warn(error);
    }
  }
}

export const fighterService = new FighterService();
