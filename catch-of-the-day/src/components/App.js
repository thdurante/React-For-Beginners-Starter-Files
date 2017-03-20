import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {

    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

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

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        // Create a copy of the current state
        const order = {...this.state.order};

        // Update the state
        order[key] = order[key] + 1 || 1;

        // Set the state
        this.setState({ order }); // Same as this.setState({ order: order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        );
    }
}

export default App;
