
import useTitle from "../../hooks/useTitle";
import Banner from "../Banner/Banner";




const HomePage = () => {

    

    useTitle('Home');


    return (
        <div className='container'>
            
          
            <Banner></Banner>


        </div>
    );
};

export default HomePage;