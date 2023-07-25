import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://13.48.91.251:8081/getUsers")
      .then((res) => {
        setData(res.data.Result);
        console.log(res.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container mt-4">
      <h3 className="text-center">Profile</h3>
      <div className="my-4 ">
        {data &&
          data.map((user, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-4 mx-auto">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Name</h5>
                      <p className="card-text">{user.username}</p>

                      <h5 className="card-title">Email</h5>
                      <p className="card-text">{user.email}</p>

                      <h5 className="card-title">Role</h5>
                      <p className="card-text">{user.role}</p>
                      <h5 className="card-title text-white">Password</h5>
                      <p className="card-text text-white">{user.password}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
