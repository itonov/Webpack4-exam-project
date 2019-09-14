import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDragon: true
        };

        this.handleHideShowDragon = this.handleHideShowDragon.bind(this);
    }

    handleHideShowDragon() {
        const newDragonState = !this.state.showDragon;

        this.setState({
            showDragon: newDragonState
        });
    }

    render() {
        return (
            <section>
                <p>But you can have this dragon!</p>
                <p>Dragons are extremely powerful and have to be managed by React!</p>
                <button onClick={this.handleHideShowDragon}>
                    {
                        this.state.showDragon
                            ? 'Hide the dragon!'
                            : 'Show me the dragon!'
                    }
                </button>
                {
                    this.state.showDragon
                    &&
                    <img src="./images/dragon.png" alt="dragon"/>
                }
            </section>
        );
    }
}

export default App;
