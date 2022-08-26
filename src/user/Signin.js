import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading ...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // event.preventdefault();
    setValues({ ...values, error: false, loading: true });
    console.log(values);
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("signin Request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin</p>;
      } else {
        return <p> redirect to user dashboard</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const SigninForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                value={password}
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Signin
            </button>
          </form>
          <p>{JSON.stringify(values)}</p>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="A page for user to signin !">
      {/* {loadingMessage()} */}
      {/* {errorMessage()} */}
      {SigninForm()}
      {/* {performRedirect()} */}
    </Base>
  );
};

export default Signin;
