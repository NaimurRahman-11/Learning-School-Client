
import { Bounce, Fade } from "react-awesome-reveal";
import useTitle from "../../hooks/useTitle";
import Banner from "../Banner/Banner";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import TopClasses from "../TopClasses/TopClasses";




const HomePage = () => {



    useTitle('Home');


    return (
        <div className='container'>


            <Banner></Banner>
            <TopClasses></TopClasses>
            <PopularInstructors></PopularInstructors>

            <div>
                <section className="subscribe-section py-5 mt-5 ">
                    <div className="container text-center">
                        <Bounce>
                        <h2>Subscribe to Our Newsletter</h2>
                        <p>Stay updated with the latest toys and offers!</p>
                        </Bounce>
                        <img
                            src="https://i.pinimg.com/originals/e2/12/7b/e2127b452438f766fab14c1480aebd0f.gif"
                            alt="Subscribe Image"
                            className="img-fluid mt-4 rounded mb-5"
                        />

                        <Fade cascade>
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            aria-label="Enter your email"
                                            aria-describedby="subscribe-btn"
                                            required
                                        />
                                        <button
                                            className="btn btn-warning"
                                            type="button"
                                            id="subscribe-btn"

                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </Fade>


                    </div>
                </section>
            </div>




        </div>
    );
};

export default HomePage;