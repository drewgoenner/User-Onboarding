import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const Users = styled.div`
display: flex;
flex-wrap: wrap;
border: 2px solid black;
margin 10px;
background: #115DA8;

`;

const TosLabel = styled.label`
margin: 10px;
`;


const TextField = styled.div`
margin: 10px;
`;

const UserList = styled.ul`
list-style: none;
background-color: #00a86b;
width: 20%;
margin: 15px;
text-align: center;
padding: 0 0 5px 0;
border-radius: 15px;

`;

const FormDiv = styled.div`
align-content: center;
margin: 50px;
`;

const JoinTeam = styled.h1`
font-size: 30px;
`;


const MyForm = ({errors, touched, values, isSubmitting, status}) => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
      if (status) {
        setUsers([...users, status]);
      }
    }, [users, status]);


    return(
        <FormDiv>
            <JoinTeam>Join the Team!</JoinTeam>
            <Form>
                <TextField>
                    <Field type = 'name' name = 'name' placeholder = 'name'/>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                </TextField>

                <TextField>
                    <Field type = 'email' name = 'email' placeholder = 'email'/>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </TextField>

                <TextField>
                    <Field type = 'book' name ='book' placeholder ='favorite book'/>
                    {touched.book && errors.book && <p>{errors.book}</p>}
                </TextField>

                <TextField>
                    <Field type = 'tl' name = 'tl' placeholder = 'favorite tl'/>
                    {touched.tl && errors.tl && <p>{errors.tl}</p>}
                </TextField>

                <TextField>
                    <Field type = 'animal' name ='animal' placeholder = 'favorite animal'/>
                    {touched.animal && errors.animal &&<p>{errors.animal}</p>}
                </TextField>

                <Field component="select" className="matrix" name="favMatrix">
                    <option>Favorite Matrix Film</option>
                    <option value="The Matrix">The Matrix</option>
                    <option value="The Matrix">The Matrix</option>
                    <option value="The Matrix">The Matrix</option>
                </Field>

                <TextField>
                    <Field type = 'password' name = 'password' placeholder = 'password'/>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </TextField>

                <TosLabel>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    {touched.tos && errors.tos && <p>{errors.tos}</p>}
                    Accept TOS     
                </TosLabel>

                    <button type='submit' disabled = {isSubmitting}>Submit</button>
                
            </Form>

            <Users>
                {users.map(user => (
                <UserList key={user.id}>
                    
                    <li>Name: {user.name}</li>                    
                    <li>Email: {user.email}</li>
                    <li>Favorite Matrix Film: {user.favMatrix}</li>
                    <li>Favorite Book: {user.book}</li>
                    <li>Favorite TL: {user.tl}</li>
                    <li>Favorite Animal: {user.animal}</li>
                    <li>Password: {user.password}</li>
                </UserList>
            
                ))}
             </Users>
        </FormDiv>
    )
}

const FormikMyForm = withFormik({mapPropsToValues({name, email, book, tl, animal, favMatrix, password, tos}){
    return {

        name: name || '',
        email: email || '',
        favMatrix: favMatrix || '',
        book: book || '',
        tl: tl || '',
        animal: animal || '',
        password: password || '',
        tos: tos || false

    };
},
validationSchema: Yup.object().shape({
    name: Yup.string("Only letters please")
        .required("Your Name is Required"),
    email: Yup.string()
        .email("Email not valid")
        .required("An Email is Required"),
    book: Yup.string()
        .required("Everyone has a favorite book!"),
    tl: Yup.string()
        .required("Choose wisely"),
    animal: Yup.string()
        .required("Pick an animal, ANY animal"),

    password: Yup.string()
        .min(8, "Your Password Must be 8 or More Characters")
        .required("Password is required"),
    tos: Yup.bool().oneOf([true], "You Must Accept the TOS")
}),
handleSubmit(values, {resetForm, setStatus, setErrors, setSubmitting}) {

    if (values.tl !== 'Leslie R') {
        setErrors({tl: "You have chosen...poorly. Try again"});
        setSubmitting(false);
    } else {
    
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log(res);
            setStatus(res.data)
            resetForm();
            setSubmitting(false);
            
        })
        .catch(err => {
        console.log(err);
        setSubmitting(false)
        });
    }
    
}

})(MyForm)

export default FormikMyForm