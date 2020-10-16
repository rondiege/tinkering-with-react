import React, {Component} from "react";
import Burger from "../../components/Burger/burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        axios.get('/ingredients.json').then(response => {
            console.log(response.data);
            // const ingredients = Object.keys(response.data).map(key => ({key : 0} ));
            this.setState({ingredients: response.data, error: false});
            // alert("I did it!");
        }).catch(this.setState({error: true}));
    }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    //Best time to fetch data is during this function call... jk... the constructor is the right spot.
    // componentDidMount() {
    //     axios.get('/ingredients.json').then(response => {
    //         console.log(response.data);
    //         // const ingredients = Object.keys(response.data).map(key => ({key : 0} ));
    //         this.setState({ingredients: response.data});
    //         // alert("I did it!");
    //     })
    //
    // }

    // We are taking the ingredients as a parameter as the state might not be up to date yet
    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchase(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount === 0) {
            return;
        }
        const newCount = oldCount - 1;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchase(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            // in real life never do this on the frontend
            price: this.state.totalPrice,
            customer: {
                name: "MGCJ",
                address: {
                    street: "A place",
                    zipCode: "12345",
                    country: "Kenya"
                },
                email: "zappy@zaps.com",
                deliveryMethod: "fastest"
            }
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({loading: false, purchasing: false});
            console.log(response);
        }).catch(error => {
            this.setState({loading: false, purchasing: false});
            console.log(error)
        });

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>;

        // This is needed because ingredients start null because they are asynchronously
        // fetched from the db. So ingredients start out null
        if (this.state.ingredients) {
            burger = (<><Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />
            </>);

            orderSummary = <OrderSummary cancelOrderAct={this.purchaseCancelHandler}
                                         price={this.state.totalPrice}
                                         continueOrderAct={this.purchaseContinueHandler}
                                         ingredients={this.state.ingredients}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);