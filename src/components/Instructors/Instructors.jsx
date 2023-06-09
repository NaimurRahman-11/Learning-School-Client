import { useQuery } from "@tanstack/react-query";



const Instructors = () => {

    


    const { data: users = [] } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        const data = await res.json();
        return data.filter(user => user.role === 'instructor'); 
    });

    return (
        <div className="container">
            <h1>{users.length}</h1>
            <table className="table">
                <thead>
                    <tr>
                    <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* Add additional columns if needed */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(instructor => (
                        <tr key={instructor.id}>
                            <td> {instructor.photo ? (
                                    <img src={instructor.photo} className="img-fluid rounded" style={{ objectFit: "contain", height: "130px" }} />
                                ) : (
                                    "No photo"
                                )}</td>
                            <td>{instructor.name}</td>
                            <td>{instructor.email}</td>
                            {/* Add additional columns if needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Instructors;