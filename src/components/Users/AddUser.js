import React, {useState} from 'react';

import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card'


const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title : 'Invalid input',
                message : 'Please enter a valid usename and age'
            });
            return;
        }
        if(+enteredAge < 1){
            setError({
                title : 'Invalid input',
                message : 'Please enter a valid Age'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    };

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const agechangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
            {error && <ErrorModal title = {error.title} message = {error.message} onConfirm = {errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit = {addUserHandler}>
                    <label htmlFor = "userName"> User Name</label>
                    <input 
                        type="text" 
                        id = "userName" 
                        onChange = {usernameChangeHandler}
                        value = {enteredUsername}
                    />
                    <label htmlFor = "age"> Age (Years)</label>
                    <input 
                        type = "number" 
                        id = "age" 
                        onChange = {agechangeHandler}
                        value = {enteredAge}
                    />
                    <Button type = "submit"> Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;