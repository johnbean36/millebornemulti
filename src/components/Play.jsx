import '../App.css';

function handleDragOver(e){
    e.preventDefault();
}

function Play({player, playCard}){
    return (
        <div>
            <div onDragOver={handleDragOver} onDrop={(event)=>{
                const index = event.dataTransfer.getData('text');
                socket.emit('play_card', {card: index, id: player});
                setTurn(false);
                playCard(player, index)
                }} className="players">{player ? <div>Play on {player}</div>: <div></div>}</div>
        </div>
    )
}

export default Play;