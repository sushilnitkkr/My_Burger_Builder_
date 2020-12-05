import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component{
    // This could be a functional component, does not have to be a class component.
    componentDidUpdate(){
        console.log("Order Summary willUpdate.");
    }
    render(){
        const ingredientSummary =Object.keys(this.props.ingredients)
        .map(igKey =>{
            return (
                <li key ={igKey}>
                    <span style ={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
    
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A Delecious burger with the following ingredient</p>
            <ul>
                {ingredientSummary}
            </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType ="Danger" clicked ={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType ="Success" clicked ={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>

        );
        }

};

export default OrderSummary;