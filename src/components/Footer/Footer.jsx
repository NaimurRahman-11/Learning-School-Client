import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
    return (
        <div className='container bgFooter rounded'>
            <footer className="text-center ">
                <div className="container ">
                    <div className="row align-items-center">
                        <div className="col-lg-4 mb-5">
                        <img src={logo} className='logo' alt="" /> <br />
                            <p>
                            Ignite your musical passion with our online instrument learning website. Master guitar, piano, drums, and more at your own pace. Expert instructors, interactive lessons, and a supportive community await. Start your musical journey today!
                            </p>
                        </div>

                        <div className="col-lg-4 mb-5">
                            <h4>Contact Us</h4>
                            <p>
                                Email: school@learningschool.com <br />
                                Phone: 123-456-7890 <br />
                                Address: 123 Main St, Anytown USA
                            </p>
                        </div>

                        <div className="col-lg-4">
                            <h4>Follow Us</h4>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#">
                                        <FaFacebook></FaFacebook>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <FaTwitter></FaTwitter>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">
                                        <FaInstagram></FaInstagram>
                                    </a>
                                </li>

                                <li className="list-inline-item">
                                    <a href="#">
                                        <FaLinkedin></FaLinkedin>
                                    </a>
                                </li>

                                <li className="list-inline-item">
                                    <a href="#">
                                        <FaPinterest></FaPinterest>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <p>
                                &copy; 2023 Learning School. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;