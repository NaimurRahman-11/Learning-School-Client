import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel className="mt-1">
        <div >
                {/* <img src="https://img.freepik.com/premium-photo/painting-music-instruments_1379-1800.jpg?w=1380" /> */}
                <img src="https://img.freepik.com/free-photo/creative-illustration-with-electric-guitar-generative-ai_169016-30096.jpg?w=1380&t=st=1686136529~exp=1686137129~hmac=42ac2233310288b131d9e9679156dba403d809bf3b51929431ac32683438d39c" alt="" />
            
        </div>
        <div>
            <img src="https://img.freepik.com/free-photo/creative-illustration-with-saxophone-emblem-logo-generative-ai_169016-30130.jpg?w=1380&t=st=1686136286~exp=1686136886~hmac=0639a0c5817f474ae45310a2f261337a877b45a2a9ea204c8df1287b7ea69059" />
            
        </div>
        <div>
            <img src="https://img.freepik.com/premium-photo/saxophone-isolated-white-background-generative-ai_123447-17413.jpg?w=1380" />
            
        </div>
    </Carousel>
    );
};

export default Banner;