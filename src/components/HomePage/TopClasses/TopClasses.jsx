import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const TopClasses = () => {
  const { data: approvedClasses = [] } = useQuery(['approved-classes'], async () => {
    const res = await fetch('http://localhost:5000/approved-classes')
    return res.json();
  })

  return (
      <div className="container">
          <h1 className="text-center p-5">Top Classes</h1>    
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {approvedClasses.map((instructor, index) => (
          <div className="col mb-4" key={index}>
            <div className="card">
              <img src={instructor.classPhotoURL} className="card-img-top img-fluid" alt="" style={{ objectFit: "contain", height: "230px" }} />
              <div className="card-body">
                <h5 className="card-title">{instructor.className}</h5>
                <p className="card-text">{instructor.email}</p>
                        {/* Add additional card content if needed */}
                        
                        <Link to={`/view-approved-details/${instructor._id}`}><button className="btn btn-warning">View Details</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopClasses;
