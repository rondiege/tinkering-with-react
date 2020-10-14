import React, {Component} from "react";
import Button from "../../UI/Button/Button"

class OrderSummary  extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary] DidUpdate');
    }

    render (){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><
                    span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            })

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <span>${this.props.price.toFixed(2)}</span></p>
                <p>Ready to checkout?</p>
                <Button btnType={"Danger"} clicked={this.props.cancelOrderAct}>CANCEL</Button>
                <Button btnType={"Success"} clicked={this.props.continueOrderAct}>CONTINUE</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;