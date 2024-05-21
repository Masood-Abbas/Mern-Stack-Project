import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify';

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // anvigate the page

  const navigate = useNavigate();

  // auth function

  const {storeTokenInLS} = useAuth();

  // handle login data

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const resData = await res.json();

      if (res.ok) {
      
        // localStorage.setItem("token",resData.token) direct storage

        //store the token in localstorage
        storeTokenInLS(resData.token);
        console.log("after login: ", resData);
       toast.success ("Login Successful");

        navigate("/");
      } else {
       toast.error(resData.message?resData.message:resData.extraDetail)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-img">
              <img
                src="/public/images/login.png"
                alt="login image"
                height="400"
                width="400"
              />
            </div>

            {/*login form */}

            <div className="registration-form">
              <div className="main-heading mb-3">
                <h1>Login Form</h1>
              </div>

              <br />

              <form onSubmit={submitForm}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="emial"
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleData}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    required
                    value={user.password}
                    onChange={handleData}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
// export default Login;
