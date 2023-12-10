import { useState, useRef} from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState('');


  function handleClick() {
    // imas pristup svim method and properties of input element (znas sta sve moze input iz DOM-a)
    setEnteredPlayerName(playerName.current.value);

    // we are in imperative mode, we are instructing the browser that we want to empty value and get back focus
    // nema veze neka ga ovako ali trebas da pazis da ne koristis toliko refs da vrsis manipualaciju, to nije idea behind React
    playerName.current.value = '';
    playerName.current.focus();
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
