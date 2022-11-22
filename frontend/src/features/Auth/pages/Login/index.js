import React, {useEffect} from 'react';
import LoginForm from "../../components/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser, login} from "../../sessionSlice";


function Login(props) {

    const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.session.currentUser)

    // useEffect(() => {
    //     dispatch(getCurrentUser());
    // }, [dispatch]);

    const handleLogin = async (data) =>{
        try{
            const loginResult = await dispatch(login(data));
            // const getCurrentUserResult = await dispatch(getCurrentUser());
            // alert.log(currentUser.username);
        } catch (error){
            console.log(error);
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleLogin}/>
        </div>
    );
}

export default Login;