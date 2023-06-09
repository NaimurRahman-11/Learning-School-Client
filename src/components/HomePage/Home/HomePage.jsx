
import useTitle from "../../hooks/useTitle";
import Banner from "../Banner/Banner";
import TopClasses from "../TopClasses/TopClasses";




const HomePage = () => {

    

    useTitle('Home');


    return (
        <div className='container'>
            
          
            <Banner></Banner>
            <TopClasses></TopClasses>


        </div>
    );
};

export default HomePage;