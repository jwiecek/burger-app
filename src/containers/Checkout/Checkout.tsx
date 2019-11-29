import React from "react";
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from "react-redux";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

interface IMyComponentProps1 {
    history: any,
    match: any,
    ing: any,
    purchased: any,
}

const Checkout = (props: any) => {

        const checkoutCancelledHandler = () => {
            props.history.goBack();
        };

        const checkoutContinuedHandler = () => {
            props.history.replace(props.match.path + '/contact-data');
        };

        let saladArr = Array(props.ing.salad).fill('salad');
        let baconArr = Array(props.ing.bacon).fill('bacon');
        let cheeseArr = Array(props.ing.cheese).fill('cheese');
        let meatArr = Array(props.ing.meat).fill('meat');

        const ingredientsList = [...saladArr, ...baconArr, ...cheeseArr, ...meatArr];

        let summary = <Redirect to="/"/>;

        if (props.ing) {
            const purchasedRedirect = props.purchased && <Redirect to="/"/> ;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={ingredientsList}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler}
                    />
                    <Route
                        path={props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            )
        }

        return summary;
};

const mapStateToProps = (state: any) => {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);

