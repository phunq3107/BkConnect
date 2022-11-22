import React, {useReducer} from 'react';
import PropTypes from 'prop-types';

LoginForm.propTypes = {
    onSubmit: PropTypes.func
};

const formReducer = (state,event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}

function LoginForm(props) {

    const [formData, setFormData] = useReducer(formReducer, {})
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleLoginSubmit = (e) =>{
        e.preventDefault();
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(formData);
        };
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <fieldset>
                    <label>
                        <p>Username</p>
                        <input name="username" onChange={handleChange}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input name="password" onChange={handleChange}/>
                    </label>
                </fieldset>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;