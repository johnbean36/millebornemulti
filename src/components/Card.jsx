import '../App.css';

function Card({deckName, cDeck}){
    console.log(cDeck);
    return (<div>
        {deckName ? <div draggable onDragStart={(e)=>{e.dataTransfer.setData('text/plain', cDeck)}} ><img className="deck-image" src={`../../images/${deckName}`} /></div>:<div></div>}
    </div>)
}

export default Card;