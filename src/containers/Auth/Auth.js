import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updatedObject } from '../../utils/utils';
import { checkValidity } from '../../utils/checkValidity';

import classes from './Auth.module.css';

import * as actions from '../../store/actions';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail address',
        },
        value: '',
        validation: {
            required: true,
            isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
        },
        value: '',
        validation: {
            required: true,
            minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    signUp: true,
  }

  componentDidMount() {
    if(!this.props.buildingBurguer && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updatedObject(this.state.controls, {
      [controlName]: updatedObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true, 
      }),
    });
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        signUp: !prevState.signUp,
      }
    })
  };

  render() {

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

    let form = formElementsArray.map(element => (
      <Input 
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value} 
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => this.inputChangedHandler(event, element.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p> {this.props.error.message} </p>
      );
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button buttonType='Success'>
            Submit
          </Button>
        </form>
        <Button buttonType='Danger' clicked={this.switchAuthModeHandler}>
          Sign {this.state.signUp ? 'in' : 'up' }
        </Button>
      </div>
      
    );
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    buildingBurguer: state.burguerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);