import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Employee() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  const handleImageClick = (imageSrc) => {
    // Open the image in a new tab
    window.open(imageSrc, "_blank");
  };

  useEffect(() => {
    axios
      .get("http://13.48.91.251:8081/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://13.48.91.251:8081/delete/" + id)
      .then((res) => {
        console.log("Delete response:", res.data);
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCPage(n) {
    setCurrentPage(n);
  }
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search Name"
          className="form-control w-25"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records
              .filter((employee) => {
                if (search === "") {
                  return employee;
                } else if (
                  employee.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return employee;
                }
              })
              .map((employee, index) => {
                return (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>
                      {
                        <img
                          src={
                            `http://13.48.91.251:8081/images/` + employee.image
                          }
                          alt=""
                          style={{ cursor: "pointer" }}
                          className="employee_image"
                          onClick={() =>
                            handleImageClick(
                              `http://13.48.91.251:8081/images/` +
                                employee.image
                            )
                          }
                        />
                      }
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.address}</td>
                    <td>{employee.salary}</td>
                    <td>
                      <Link
                        to={`/employeeEdit/` + employee.id}
                        className="btn btn-primary btn-sm me-2"
                      >
                        edit
                      </Link>
                      <button
                        onClick={(e) => handleDelete(employee.id)}
                        className="btn btn-sm btn-danger"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {number.map((n, index) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={index}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Employee;
