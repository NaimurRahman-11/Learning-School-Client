import banner from "../../../assets/Banner1.jpg"

const Slider = () => {
    return (
        <div className="container">
            <div className="carousel-container p-3 mt-5 mb-5">
                <u> <h1 className='text-center mb-5 mt-5'><b>#Our Gallery#</b></h1></u>
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner rounded">
                    <div className="carousel-item active">
                            <img src="https://www.slideteam.net/wp/wp-content/uploads/2020/05/Banner.png" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item ">
                            <img src="https://img.pikbest.com/backgrounds/20190415/guitar-training-class-recruit-new-simple-yellow-banner_1823476.jpg!bwr800" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={banner} className="d-block w-100" alt="..." />
                        </div>
                        
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider;