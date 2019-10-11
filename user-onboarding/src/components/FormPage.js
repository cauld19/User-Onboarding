import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const FormPage = props => {



    const [users, setUsers] = useState([]);

    const removeUser = index => {
        const newUsers = [...users];
        newUsers.splice(index, 1);
        setUsers(newUsers)
      }

    useEffect(() => {
        if(props.status) {
            setUsers([...users, props.status])
        }
    }, [props.status]);

    console.log(users)


    return (
        <div className="main-form">
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {props.touched.name && props.errors.name && (
                    <p className="error">{props.errors.name}</p>
                )}

                <Field type="text" name="email" placeholder="email" />
                {props.touched.email && props.errors.email && (
                    <p className="error">{props.errors.email}</p>
                )}

                <Field type="text" name="password" placeholder="password" />
                {props.touched.password && props.errors.password && (
                    <p className="error">{props.errors.password}</p>
                )}

                <Field component="select" name="role" placeholder="role" >
                    <option value="">Role</option>
                    <option value="front-end">front-end</option>
                    <option value="back-end">back-end</option>
                    <option value="UI">UI</option>
                </Field>
                
                
                {props.touched.password && props.errors.password && (
                    <p className="error">{props.errors.password}</p>
                )}

                <label className="checkbox-container">
                    <Field type="checkbox" name="terms" checked={props.values.terms} />
                    {props.touched.terms && props.errors.terms && (
                        <p className="error">{props.errors.terms}</p>
                    )}
                    Terms of Service
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit!</button>
            </Form>
            {users.map((user, index) =>
                <ul key={user.id}>
                    <li>name: {user.name}</li>
                    <li>role: {user.role}</li>
                    <li>email: {user.email}</li>
                    <li>password: {user.password}</li>
                    <button onClick={() => removeUser(index)}>Delete</button>
                </ul>
            )}
        </div>
    )

}


const myMapPropsToValues = props => {
    return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        role: props.role || "",
        terms: props.terms || false
    };
};

const myHandleSubmit = (values, { setStatus, resetForm }) => {
    console.log("submit pressed! ... sending...");
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(Object.keys);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err));
  };

const yupSchema = Yup.object().shape({
    name: Yup.string().required("please enter a name"),
    email: Yup.string().required("please enter an email"),
    password: Yup.string().required("please enter a password"),
    terms: Yup.boolean().oneOf([true], 'Must Accept Terms of Service')
  });

const formikObj = {
    mapPropsToValues: myMapPropsToValues,
    handleSubmit: myHandleSubmit,
    validationSchema: yupSchema
  };

const EnhancedFormHOC = withFormik(formikObj)

const EnhancedFormPage = EnhancedFormHOC(FormPage);



export default EnhancedFormPage;