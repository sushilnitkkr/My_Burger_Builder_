import React ,{Component} from'react';
import {connect} from 'react-redux';
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm:{         
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false
            },
            pincode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Pincode'
                },
                value:'',
                validation:{
                    requierd:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false
            },         
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    requierd:true
                },
                valid:false,
                touched:false
            },      
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options: [
                        {value:'fastest' , displayValue:'fastest'},
                        {value:'cheepest' , displayValue:'cheepest'},
                    ]
                   
                },
                value:'fastest',
               // validation:{}, this one way ,we can also check condtion se in check validation methos
                valid:true
            },
        },
        formIsValid:false,
    
    }
    orderHandler = (event)=>{
        event.preventDefault();
       // console.log(this.props.ingredients);
        this.setState({ loading: true });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
           // this.setState({orderForm:formData});
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);

    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, inputIdentifire)=>{
        //console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifire]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifire] = updatedFormElement;
      //  console.log(updatedFormElement);
        let formIsValid = true;
        for(let inputIdentifire in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifire].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
        console.log(formIsValid)
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input
                     key = {formElement.id}
                     elementType = {formElement.config.elementType}
                     elementConfig = {formElement.config.elementConfig}
                     value = {formElement.config.value}
                     invalid = {!formElement.config.valid}
                     shouldValidate = {formElement.config.validation}
                     touched = {formElement.config.touched}
                     changed = {(event)=>this.inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType ="Success" disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className ={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
   
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));