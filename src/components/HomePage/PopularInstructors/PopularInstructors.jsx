import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";


const PopularInstructors = () => {

    const { data: users = [] } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        const data = await res.json();
        return data.filter(user => user.role === 'instructor'); 
    });



    return (
        <div className="container">
            <Fade>
            <h1 className="text-center p-5">Popular Instructors</h1>    
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      {users.map((instructor, index) => (
        <div className="col mb-4" key={index}>
          <div className="card">
            <img src={instructor.photo} className="card-img-top img-fluid" alt="" style={{ objectFit: "contain", height: "230px" }} />
            <div className="card-body">
              <h5 className="card-title">{instructor.name}</h5>
              <p className="card-text">{instructor.email}</p>
              
            
                      
                     
            </div>
          </div>
        </div>
      ))}
    </div>
        </Fade>
  </div>
    );
};

export default PopularInstructors;