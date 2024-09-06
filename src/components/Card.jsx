import '../App.css';

function Card({deckName, cDeck}){
    return (<div>
        {deckName ? <div><img className="deck-image" src={`../../images/${deckName}`} /></div>:<div></div>}
    </div>)
}

export default Card;