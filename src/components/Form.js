import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Field, withFormik, yupToFormErrors} from 'formik';
import * as Yup from 'yup';


const MyForm = ({errors, touched, values, isSubmitting, status}) => {

    const [users, setUsers] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
      if (status) {
        setUsers([...users, status]);
      }
    }, [users, status]);


    return(
        <div className = 'form'>
            <Form>
                <div>
                    <Field type = 'name' name = 'name' placeholder = 'name'/>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                    <Field type = 'email' name = 'email' placeholder = 'email'/>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </div>

                <div>
                    <Field type = 'password' name = 'password' placeholder = 'password'/>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>

                <label>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    Accept TOS
                </label>

                    <button type='submit' disabled = {isSubmitting}>Submit</button>
                
            </Form>

            {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>email: {user.email}</li>
          <li>password: {user.password}</li>
        </ul>
      ))}
        </div>
    )
}

const FormikMyForm = withFormik({mapPropsToValues({name, email, password, tos}){
    return {
        name: name || '',
        email: email || '',
        password: password || '',
        tos: tos || false

    };
},
validationSchema: Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Password is required"),
    tos: Yup.bool()
        .oneOf([true], 'You Must Accept TOS')
        .required('Must accept TOS')
}),
handleSubmit(values, {resetForm, setStatus}) {
    
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log(res);
            setStatus(res.data)
            resetForm();
            
        })
        .catch(err => {
        console.log(err)
    });
    
}

})(MyForm)
export default FormikMyForm