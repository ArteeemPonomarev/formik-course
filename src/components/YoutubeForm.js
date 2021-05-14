import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    channel: ''
}
const onSubmit = (values) => {
    console.log('Form data', values)
}

const validate = (values) => {
    //values.name values.email values.channel
    //errors.name errors.email errors.channel
    //errors.name = 'This field is required'
    let errors = {}

    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }
    if (!values.channel) {
        errors.channel = 'Required'
    }

    return errors
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    channel: Yup.string().required('Required')
})

const YoutubeForm = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        //validate
    });

    //console.log('form values :', formik.values)
    console.log('Form errors', formik.errors)
    console.log('Visited fields', formik.touched)


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name={"name"}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           value={formik.values.name}/>
                    {
                        (formik.errors.name && formik.touched.name)
                        && <div className="error">{formik.errors.name}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name={"email"}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           value={formik.values.email}/>
                    {
                        (formik.errors.email && formik.touched.email) &&
                        <div className="error">{formik.errors.email}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" name={"channel"}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           value={formik.values.channel}/>
                    {
                        (formik.errors.channel && formik.touched.channel) &&
                        <div className="error">{formik.errors.channel}</div>
                    }
                </div>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
};

export default YoutubeForm;
