import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState(" ");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event) {
    axios.get("http://localhost:4000/past5Games", {params: {username: searchText}})
    .then(function (response) {
      setGameList(response.data)
    }).catch(function (error) {
      console.log(error);
    })
  }

  console.log(gameList);

  return (
    <div className="App">
      <h2>Welcome</h2>
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={getPlayerGames}>Get the past 5 games from ur player</button>
      {gameList.length !== 0 ?
        <>
          <p>we have data</p>
          {
            gameList.map((gameData, index) => 
              <>
                <h2>Game {index + 1} </h2>
                <div>
                  {gameData.info.participants.map((data, participantsIndex) => 
                    <p>Player {participantsIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>
                  )
                  }
                </div>
              </>
            )
          }
        </>
      :
        <>
          <p>we have no data</p>
        </>

      }
    </div>
  );
}

export default App;
