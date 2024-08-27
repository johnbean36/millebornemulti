import '../App.css';

function Welcome({nHandleSubmit, nHandleChange}){
    return (
        <div className="enter-name">
            <div>
                <img className="banner" src="../../images/banner.png" />
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