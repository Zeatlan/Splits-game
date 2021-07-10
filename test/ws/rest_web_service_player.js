"use strict";

let request = require("request");

class RestWebServicePlayer {
  constructor(c, o, e, l, u) {
    this._color = c;
    this._opponent_color = o;
    this._engine = e;
    this._login = l;
    this._url = u;
    this._id = -1;
  }

  // public methods
  color() {
    return this._color;
  }

  move(resolve, reject, move) {
    if (move) {
      request({
        method: 'PUT',
        url: this._url + '/openxum/move/apply/',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache'
        },
        json: {
          id: this._id,
          game: this._engine.get_name(),
          move: JSON.stringify(move.to_object())
        },
        xhrFields: {withCredentials: true}
      }, (error, response, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    } else {
      request({
        method: 'GET',
        url: this._url + '/openxum/move/get/',
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache'
        },
        json: {
          id: this._id,
          game: this._engine.get_name(),
          color: this._color
        },
        xhrFields: {withCredentials: true}
      }, (error, response, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    }
    return null;
  }

  start(resolve, reject) {
    request({
      method: 'POST',
      url: this._url + '/openxum/game/create/',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      },
      json: {
        game: this._engine.get_name(),
        type: this._engine.get_type(),
        color: this._engine.current_color(),
        player_color: this._color,
        opponent_color: this._opponent_color,
        login: this._login
      },
      xhrFields: {withCredentials: true}
    }, (error, response, data) => {
      if (error) {
        reject(error);
      } else {

        console.log("CREATE", data);

        this._id = data.id;
        resolve();
      }
    });
  }
}

exports = module.exports = RestWebServicePlayer;