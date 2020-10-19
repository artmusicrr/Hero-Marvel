import axios from "axios";

const urlBaseMarvel = "http://gateway.marvel.com/v1/public/";
const PUBLIC_KEY = "df0e37f3094d9268aae49338d1bb385b";
const PRIVATE_KEY = "2c6dbf76711c8cbf2475dd190ce5d5495530f782";

import md5 from "js-md5";

export default {
  getAllCharacters: (limit: any, callback: any) => {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
    const urlHeros = `${urlBaseMarvel}/characters?ts=${timestamp}&orderBy=name&limit=${limit}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;

    axios.get(urlHeros).then((heros) => {
      if (callback) {
        callback(heros);
      }
    });
  },

  getDetailCharacters: (id: number, callback: any) => {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
    const urlHeros = `${urlBaseMarvel}/characters/${id}?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;

    axios.get(urlHeros).then((hero) => {
      if (callback) {
        callback(hero);
      }
    });
  },
};
