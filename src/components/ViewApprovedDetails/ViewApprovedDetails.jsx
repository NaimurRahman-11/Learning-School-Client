import { Link, useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";


const ViewApprovedDetails = () => {

    useTitle('View Details');
    const { id } = useParams();

    

    const { data: classes, isLoading, error } = useQuery(
        ['classDetails', id],
        async () => {
          const response = await fetch(`http://localhost:5000/approved-classes/${id}`);
          const data = await response.json();
          return data;
        }
      );
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error fetching class details</div>;
    }
    
    const handleSelect = async () => {
        
    };
    

    return (
        <div>

            <h1>This is Approved view details page</h1>
            {classes && (
                <div className="container">
                    <div className="row align-items-center p-3 mb-5">
                        <div className="col-md-6">
                            <img src={classes.classPhotoURL} alt='' className="img-fluid" style={{ objectFit: "contain", height: "430px" }} />
                        </div>
                        <div className="col-md-4 shadow rounded p-5">
                            <h2>Toy Name: {classes.className}</h2>
                            <p className="text-muted">{classes.instructorName}</p>
                           
                            <p className="">Seller: {classes.instructorEmail}</p>
                           
                            
                            <h3>Price: ${classes.price}</h3>
                            <Link to='/'><button className="btn btn-warning mt-3">Home</button></Link>
                            <Link to=''> <button
                className="btn btn-warning mt-3 ms-2"
                onClick={handleSelect}
                
              >
                Select
              </button></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewApprovedDetails;