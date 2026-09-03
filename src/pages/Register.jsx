import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import FormAlert from "../components/FormAlert";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
    password2: "",
  });
  const [formError, setFormError] = useState("");
  const { name, tel, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }
  }, [isSuccess, user, navigate]);

  useEffect(() => {
    if (isError) setFormError(message);
  }, [isError, message]);

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (password !== password2) {
      setFormError("Passwords do not match");
      return;
    }
    dispatch(register({ name, tel, email, password, role: "user" }));
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter Your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              id="tel"
              name="tel"
              value={tel}
              onChange={onChange}
              placeholder="Enter Your phone number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Your password"
              required
            />
          </div>
          <FormAlert>{formError}</FormAlert>
          <div className="form-group">
            <button className="btn btn-block" disabled={isLoading}>
              {isLoading ? "Creating account…" : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Register;
