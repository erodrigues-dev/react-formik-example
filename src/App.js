import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css";

function App() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3).max(10).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(3).max(8).required(),
    }),
    onSubmit: handleSubmit,
  });

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    if (!formik.isValid) return;
    setSubmitting(true);
    console.log(values);
    await sleep(2000);
    console.log(">>>");
    setSubmitting(false);
    //resetForm();
  }

  return (
    <div className="App">
      <Form onSubmit={formik.handleSubmit}>
        <h3>Form using Formik and validate with Yup schema</h3>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isInvalid={formik.touched.name && !!formik.errors.name}
            isValid={formik.touched.name && !formik.errors.name}
          />
          <Form.Text className="text-danger">
            {formik.touched.name && formik.errors.name}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            placeholder="E-mail"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && !!formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
          />
          <Form.Text className="text-danger">
            {formik.touched.email && formik.errors.email}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={formik.touched.password && !!formik.errors.password}
            isValid={formik.touched.password && !formik.errors.password}
          />
          <Form.Text className="text-danger">
            {formik.touched.password && formik.errors.password}
          </Form.Text>
        </Form.Group>
        <Button
          variant="secondary"
          type="reset"
          className="mr-2"
          onClick={formik.handleReset}
        >
          Reset
        </Button>
        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Save
        </Button>
      </Form>
      <pre className="mt-5">{JSON.stringify(formik, null, 2)}</pre>
    </div>
  );
}

export default App;
