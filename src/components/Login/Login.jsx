import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { useContext, useState } from "react";

import { GoogleAuthProvider } from "firebase/auth";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";


const Login = () => {

    const { register, handleSubmit } = useForm();

    const { signIn, googleSignIn } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const [errorMessage, setErrorMessage] = useState(null);


    const navigate = useNavigate();
    const location = useLocation();
    useTitle('Login');

    const from = location.state?.from?.pathname || '/';

    // const handleLogin = data => console.log(data);



    const handleLogin = event => {
        // event.preventDefault();
        // const form = event.target;

        // const email = form.email.value;
        // const password = form.password.value;

        console.log(event.email, event.password);
        signIn(event.email, event.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                setErrorMessage(error.message);
                console.log(error);
            });


    }


    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log('sign in', user);
                navigate(from, { replace: true });

            })
            .catch(error => {
                setErrorMessage(error.message);
                console.log(error);

            })
    }

    return (
        <div className="container mb-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        {...register("email")}
                                        placeholder="Enter your email"


                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        {...register("password")}
                                        maxLength="6" placeholder="Enter your password"


                                        required
                                    />
                                </div>
                                <button type="submit" className="btn primaryBtn w-100">
                                    Login
                                </button>
                            </form>
                            <p className="mt-3 text-center">
                                New to Learning School?{" "}
                                <Link to="/register">Sign up here</Link>.
                            </p>

                           <hr />
                            <div className="text-center">
                            <Link className="" onClick={handleGoogleSignIn}><button className="btn primaryBtn">Sign in with <FaGoogle  className='iconSize'></FaGoogle></button></Link>
                            </div>
                           
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;

