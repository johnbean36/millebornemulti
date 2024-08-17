import '../App.css';

function Welcome({nHandleSubmit, nHandleChange}){
    return (
        <div className="enter-name">
            <div>
                <h1 id="welcome">Welcome to Kilometer Coupe</h1>
                <form onSubmit={nHandleSubmit}>
                    <div className="wstyling">
                        <div>
                            <label htmlFor="enter">Enter a name to play: </label>
                            <input onChange={nHandleChange} type="text" id="enter" />
                        </div>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Welcome;