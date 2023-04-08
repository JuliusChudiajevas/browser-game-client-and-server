import { Entity } from "./src/Entity/entity.js";
import { Player } from "./src/Player/player.js";
import { DomGenerator } from "./src/Utils/domGenerator.js";

let playerList = [];
var entityList: Map<string, Entity> = new Map<string, Entity>();
var unUpdatedEntityIdList = new Set<string>();

type EntityData = {
  id: string;
  type: string;
  x: number;
  y: number;
};
const connectionDbg = "https://localhost:5001/";
const connection1 = "https://yuourip:port/";

function receiveData() {
  // console.log("received", "PLAYERLOL");//DBG
  const http = new XMLHttpRequest();
  http.open("GET", connection1 + "data");
  http.send();
  http.onload = () => {
    // console.log("http response:", http.response); //DBG
    let entities: Array<EntityData> = JSON.parse(http.response);

    for (const key of entityList.keys()) {
      unUpdatedEntityIdList.add(key);
    }

    entities.forEach((e) => {
      // console.log("foreach", "PLAYERLOL", e.type);//DBG
      if (!entityList.has(e.id)) {
        // console.log("if", "PLAYERLOL", e.id);//DBG
        switch (e.type) {
          case "player":
            entityList.set(e.id, new Player(e.id, e.x, e.y));
            // console.log("CASE", "PLAYERLOL", e.id);//DBG
            break;
        }
      }
      entityList.get(e.id).x = e.x;
      entityList.get(e.id).y = e.y;
      unUpdatedEntityIdList.delete(e.id);
    });

    for (const id of unUpdatedEntityIdList) {
      entityList.get(id).desctruct();
      entityList.delete(id);
    }
    unUpdatedEntityIdList.clear();
  };
}

function sendData(dataToSend: EntityData) {
  let data = JSON.stringify(dataToSend);
  const http = new XMLHttpRequest();
  http.open("POST", connection1 + "data");
  http.setRequestHeader("Accept", "application/json; charset=utf-8");
  http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  http.send(data);
}

function disconnect(dataToSend: EntityData) {
  dataToSend.type = "delete";
  let data = JSON.stringify(dataToSend);
  const http = new XMLHttpRequest();
  http.open("POST", connection1 + "onDisconnect");
  http.setRequestHeader("Accept", "application/json; charset=utf-8");
  http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  http.send(data);
}

//START
const httpConnect = new XMLHttpRequest();
httpConnect.open("GET", connection1 + "onConnect");
httpConnect.setRequestHeader("Access-Control-Allow-Origin", "*");
httpConnect.send();
httpConnect.onerror = () => {
  console.log("CANNOT CONNECT");
  return;
};

httpConnect.onload = () => {
  console.log("response", httpConnect.responseText);
  if (httpConnect.responseText == "-1") {
    console.log("Server full");
  }
  const P = new Player("player" + httpConnect.responseText, 10, 10, "cyan");
  entityList.set(P.entity.id, P);

  var interval = 2000 / 50;
  const game = setInterval(function () {
    P.update(interval);
    sendData(P.getData());
    receiveData();
  }, interval);

  window.addEventListener(
    "beforeunload",
    (e) => {
      clearInterval(game);
      disconnect(P.getData());
      return false;
    },
    false
  );
};
