import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {

    constructor() {
        super();
        this.addFish = this.addFish.bind(this);

        // Initial State
        this.state = {
            fishes: {},
            order: {},
        };
    }

    addFish(fish) {
        // Create a copy of the current state
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();

        // Update the state
        fishes[`fish-${timestamp}`] = fish;

        // Set the state
        this.setState({ fishes }); // Same as this.setState({ fishes: fishes });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        );
    }
}

export default App;
