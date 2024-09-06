import '../App.css';

function Play({player}){
    return (
        <div>
            <div className="players">{player ? <div>Play on {player}</div>: <div></div>}</div>
        </div>
    )
}

export default Play;