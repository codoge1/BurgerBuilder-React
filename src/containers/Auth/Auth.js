import React ,{ Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        formConfigs:{
            email:{
				elementType:'input',
				elementConfig:{
					type:'email',
					placeholder:'Your Email'
				},
				value:'',
				validation:{
					required:true,
				},
				isValid:false,
				touched:false,
            },
            password:{
				elementType:'input',
				elementConfig:{
					type:'password',
					placeholder:'Your Password'
				},
				value:'',
				validation:{
                    required:true,
                    min_length:6
				},
				isValid:false,
				touched:false,
			},
        },
        isSignUp:true,
        loading:false,
        error:'',
    }

    inputChangeHandler = (event, identifier) => {
		const updatedAuthForm = {...this.state.formConfigs};
		const updatedFormElement = {
			...updatedAuthForm[identifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.isValid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedAuthForm[identifier] = updatedFormElement;

		this.setState({formConfigs:updatedAuthForm});

	}

    checkValidation = (value, rule) => {
		let isValid = true;
		if (!rule) {
			return isValid;
		}
		if (rule.required) {
			isValid = isValid && value.trim() !== '';
		}
		if (rule.min_length) {
			isValid = isValid && value.length >= rule.min_length;
		}
		if (rule.max_length) {
			isValid = isValid && value.length <= rule.max_length;
		}
		return isValid;
    }
    
    switchBtn = () => {
        this.setState({isSignUp:!this.state.isSignUp});
    }

    signUpHandler = () => {
        this.setState({loading:true});
        const data  = {
            email:this.state.formConfigs.email.value,
            password:this.state.formConfigs.password.value,
            returnSecureToken:true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB43BrNC-5J5m_GLlqyk7NzF_OMDmjJPEo', data)
            .then(res => {
                this.setState({loading:false});
                this.props.createToken(res.data.idToken, res.data.localId);
                const expiration_time = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expiration_time',expiration_time);
                localStorage.setItem('user_id',res.data.localId);
            })
            .catch(error => {
                this.setState({error:error.response.data.error.message, loading:false});
            });
    }

    signInHandler = () => {
        this.setState({loading:true});
        const data  = {
            email:this.state.formConfigs.email.value,
            password:this.state.formConfigs.password.value,
            returnSecureToken:true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB43BrNC-5J5m_GLlqyk7NzF_OMDmjJPEo', data)
            .then(res => {
                this.setState({loading:false});
                console.log(res);
                this.props.createToken(res.data.idToken, res.data.localId);
                const expiration_time = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expiration_time',expiration_time);
                localStorage.setItem('user_id',res.data.localId);
            })
            .catch(error => {
                this.setState({error:error.response.data.error.message, loading:false});
            });
    }

    render() {
        const formElements = [];
        for (let key in this.state.formConfigs) {
            formElements.push({
                id:key,
                config:this.state.formConfigs[key]
            });
        }

        let redirect = null;
        let is_auth = this.props.token === null ? false : true;
        if (is_auth) {
            if (this.props.building) {
                redirect = <Redirect to='checkout' />
            } else {
                redirect = <Redirect to='/' />
            }
        }

        let form = formElements.map((element) => {
            return <Input 
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.isValid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangeHandler(event, element.id)}/>
        })
        let btn1 = null, btn2 = null;
        if (this.state.isSignUp) {
            btn1 = <Button btnType='Success' clicked={this.signUpHandler}>Sign Up</Button>
            btn2 = 'Switch to Sign In';
        } else {
            btn1 = <Button btnType='Success' clicked={this.signInHandler}>Sign In</Button>
            btn2 = 'Switch to Sign Up';
        }

        let error = null;
        if (this.state.error !== '') {
            error = <p style={{
                color:'red'
            }}>
                <em>{this.state.error}</em>
            </p>;
        }
        
        let alter = (
            <Aux>
                {error}
                {form}
                {btn1}<br />
                <Button btnType='Danger' clicked={this.switchBtn}>{btn2}</Button>
            </Aux>
        );
        if (this.state.loading) {
            alter = <Spinner />
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {alter}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token:state.token,
        building: state.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createToken:(token, id) => dispatch({type:actionTypes.SET_TOKEN, token:token, user_id:id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);