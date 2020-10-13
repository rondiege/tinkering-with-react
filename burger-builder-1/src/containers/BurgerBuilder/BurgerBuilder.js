import React, {Component} from "react";
import Burger from "../../components/Burger/burger";

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad : 1,
            bacon: 2,
            cheese: 2,
            meat:1
        }
    }

    render() {

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;