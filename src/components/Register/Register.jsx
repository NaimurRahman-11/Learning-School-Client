import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";



const Register = () => {

    useTitle('Register');
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/';

    const [errorMessage, setErrorMessage] = useState(null);



    const { googleSignIn } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm();



    const validatePasswordMatch = (value) => {
        const confirmPassword = getValues("confirmPassword");
        return value === confirmPassword || "Passwords do not match";
    };


    const handleRegister = event => {



        createUser(event.email, event.password)
            .then(() => {

                reset();

                updateUserProfile(event.name, event.photoURL)
                    .then(() => {

                        const saveUser = { name: event.name, email: event.email, photo: event.photoURL }
                        fetch('https://learning-school-server-beige.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Registration Successful!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/')
                                }
                            })




                    })


            })
            .catch(error => console.log(error));
    }



    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;
                console.log('sign in', user);

                const saveUser = { name: user.displayName, email: user.email }
                fetch('https://learning-school-server-beige.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {

                        navigate(from, { replace: true });

                    })





            })
            .catch(error => {
                setErrorMessage(error.message);
                console.log(error);

            })
    }

    return (
        <div className="container mb-5 p-5" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/drawing-guitar-other-instruments-including-guitar_899870-7416.jpg?w=826')" }}>
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Register Here!</h3>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit(handleRegister)}>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        {...register("name")}


                                        required
                                    />
                                </div>

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
                                        {...register("password", {
                                            required: true,
                                            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                            validate: validatePasswordMatch,

                                        })}
                                        maxLength="6" placeholder="(Maximum Length is 6 )"


                                        required
                                    />

                                    {errors.password && (
                                        <p className="text-danger">
                                            Password must contain at least one capital letter and one special character.
                                        </p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        {...register("confirmPassword")}
                                        maxLength="6" placeholder="(Maximum Length is 6 )"


                                        required
                                    />

                                    {errors.confirmPassword && (
                                        <p className="text-danger">
                                            Password must contain at least one capital letter and one special character.
                                        </p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="photoURL" className="form-label">
                                        Photo URL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="photoURL"
                                        {...register("photoURL")}

                                    />
                                </div>
                                <button type="submit" className="btn primaryBtn w-100" >
                                    Submit
                                </button>
                            </form>
                            <p className="mt-3 text-center">
                                Already have an account?{" "}
                                <Link to="/login">Login here</Link>.
                            </p>

                            <hr />
                            <div className="text-center">
                                <Link className="" onClick={handleGoogleSignIn}><button className="btn primaryBtn">Sign in with <FaGoogle className='iconSize'></FaGoogle></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;