import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

    constructor() {
        super();
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        // Initial State
        this.state = {
            fishes: {},
            order: {},
        };
    }

    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // Check if there's any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef) {
            // Update App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
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

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
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
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                />
            </div>
        );
    }
}

export default App;
