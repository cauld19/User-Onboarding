import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormPage = props => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(props.status) {
            setUsers([...users, props.status])
        }
    }, [props.status]);


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

                <label className="checkbox-container">
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={props.values.terms}
                    />
                    Terms of Service
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>name: {user.name}</li>
                    <li>email: {user.email}</li>
                    <li>password: {user.password}</li>
                </ul>
            ))}
        </div>
    )

}


const myMapPropsToValues = props => {
    return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        terms: props.terms || false
    };
};

const myHandleSubmit = (values, { setStatus }) => {
    console.log("submit pressed! ... sending...");
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
      })
      .catch(err => console.log(err));
  };

const yupSchema = Yup.object().shape({
    name: Yup.string().required("please enter a name"),
    email: Yup.string().required("please enter an email"),
    password: Yup.string().required("please enter a password")
  });

const formikObj = {
    mapPropsToValues: myMapPropsToValues,
    handleSubmit: myHandleSubmit,
    validationSchema: yupSchema
  };

const EnhancedFormHOC = withFormik(formikObj)

const EnhancedFormPage = EnhancedFormHOC(FormPage);



export default EnhancedFormPage;