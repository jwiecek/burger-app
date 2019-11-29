import React, {useEffect} from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

interface IMyComponentProps {
    onFetchedOrders: any,
    orders: any,
    loading: boolean
}

const Orders = (props: IMyComponentProps) => {

    useEffect(() => {
        props.onFetchedOrders();
    }, []);

        let orders = <Spinner/>;

        if (!props.loading) {
            orders = props.orders.map((order: any) => (
                <Order ingredients={order.ingredients} price={+order.price} key={order.id}/>
            ));
        }

        return (
            <div>
                {orders}
            </div>

        )
};

const mapStateToProps = (state: any) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchedOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
