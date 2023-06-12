import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className="container mb-5">
            <img src="https://img.freepik.com/premium-photo/painting-music-instruments_1379-1800.jpg?w=1380" className="img-fluid rounded" />
            
            <h1 className="text-center mt-5"><b>Welcome To The Musical Instrument Learnig School!</b></h1>
            <div className="mx-auto" style={{ maxWidth: "600px" }}>
    <p className="text-center p-3">Ignite your musical passion with our online instrument learning website. Master guitar, piano, drums, and more at your own pace. Expert instructors, interactive lessons, and a supportive community await. Start your musical journey today!</p>
            </div>
            
            <div className="text-center">
           <Link to='/register'> <button className="btn primaryBtn ">Get Started!</button></Link>
           </div>
        </div>
    );
};

export default Banner;