import React from "react";
import Button from "../../UI/Button/Button"

class OrderSummary  extends = (props) => {

const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><
            span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
    })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <span>${props.price.toFixed(2)}</span></p>
            <p>Ready to checkout?</p>
            <Button btnType={"Danger"} clicked={props.cancelOrderAct}>CANCEL</Button>
            <Button btnType={"Success"} clicked={props.continueOrderAct}>CONTINUE</Button>
      </React.Fragment>
    );
}

export default orderSummary;