import React, {useState} from "react";
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import './ContactData.scss';
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';
import axios from '../../../axios-orders';


interface IMyComponentProps {
    someValue: string,
    ing: [string],
    prc: number,
    history: any,
    price: number,
    onOrderBurger: any;
    loading: boolean
}

interface InputInterface {
    elementType: string,
    elementConfig: {
        type: string,
        placeholder: string
    },
    value: string,
    valid: boolean,
    validation: object,
    touched: boolean
}

const ContactData = (props: IMyComponentProps) => {

    const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
    );


    const [formIsValid, setFormIsValid] = useState(false);
    // const [price, setPrice] = useState(0);
    // const [ingredients, setIngredients] = useState([]);


   const orderHandler = (event: any) => {
       event.preventDefault();

       const formData = {};
       for (let formElementIdentifier in orderForm){
           (formData as any)[formElementIdentifier] = (orderForm as any)[formElementIdentifier].value;
       }

       const order = {
           ingredients: props.ing,
           price: props.prc,
           orderData: formData
       };

       props.onOrderBurger(order);
    };

    function checkValidity(value: string, rules: {required: boolean, minLength: number, maxLength: number}) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

   const inputChangeHandler = (event: any, inputIdentifier: string) => {
       const updatedOrderForm = {
           ...orderForm
       };

       const updatedFormElement = {
       ...(updatedOrderForm as any)[inputIdentifier]
       };
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
       updatedFormElement.touched = true;
       (updatedOrderForm as any)[inputIdentifier] = updatedFormElement;

       let formIsValid = true;
       for (let inputIdentifier in updatedOrderForm) {
           formIsValid = (updatedOrderForm as any)[inputIdentifier].valid && formIsValid;
       }
       setOrderForm(updatedOrderForm);
       setFormIsValid(formIsValid);

   };

        const formElementsArray = [];
        for(let key in orderForm) {
            const configInput: InputInterface = (orderForm as any)[key];
            formElementsArray.push({
                    id: key,
                    config: configInput
                })
        }
        let form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event: any) => inputChangeHandler(event, formElement.id)}
                    />
                    )
                )}
                <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
            </form>
        );
        if(props.loading) {
            form = <Spinner/>
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
}

const mapStateToProps = (state: any) => {
    return {
        ing: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onOrderBurger: (orderData: any) => dispatch(actions.purchaseBurger(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
