import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
const [users,setUsers]=useState([])
  const {authorizationToken}=useAuth()
  const getAllUserData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers:{
          Authorization:authorizationToken
        }
      });
      const data=await res.json()
      console.log(`user ${data}`);
      setUsers(data)
    } catch (error) {
      console.log(error);
    }
  };
  // delete the user by id
const deleteUser=async(id)=>{
try {
  const res = await fetch(`http://localhost:5000/api/admin//users/delete/${id}`, {
        method: "DELETE",
        headers:{
          Authorization:authorizationToken
        }
      })
      const data=await res.json()
      console.log(`user ${data}`);
      if(res.ok){
        getAllUserData();
      }
} catch (error) {
  console.log(error);
}
}



  useEffect(() => {
    getAllUserData();
  }, []);

  return (<>
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Update</td>
            <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser,index)=>{
              return(
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td><Link to={`/admin/useres/${id}/edit`}>Edit</Link></td>
                  <td><button onClick={()=>deleteUser(curUser._id)}>Delete</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  </>);
};
