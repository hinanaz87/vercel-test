import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

const AllUsers = () => {
  const [id, setId] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  // const {id} = useParams();

  function fetchUsers() {
    axios({
      method: "GET",
      url: `https://lazy-red-chicken-suit.cyclic.app/users`,
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data.data);
      setUsers(res.data.data);
    });
  }

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("details"));
    // const isUser = JSON.parse(localStorage.getItem("isUser"));

    if (
      userDetails.role == "buyer" ||
      userDetails.role == "seller" ||
      userDetails.role == null ||
      userDetails.role == undefined
    ) {
      navigate("/");
      alert("You are not authorized to visit this page");
    }

    setId(userDetails.userId);

    fetchUsers();
  }, []);

  const status = (status) => {
    if (status) {
      return "Blocked";
    } else {
      return "Active";
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => navigate("/adminpage")}
            >
              Visit Home
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row ">
          <table className="table table-striped table-hover table-responsive mt-5">
            <thead>
              <tr
                style={{
                  backgroundColor: "lightgray",
                  color: "#016EB3",
                  fontSize: "18px",
                  fontWeight: "500",
                  height: "50px",
                  textAlign: "center",
                }}
              >
                <th scope="col">Sr#</th>
                <th scope="col">User Id</th>
                <th scope="col">User Name</th>
                <th scope="col">User UserName</th>
                <th scope="col">User Role</th>
                <th scope="col">User Email</th>
                <th scope="col">Created On</th>
                <th scope="col">Status(Blocked)</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            {users.map((user, ind) => {
              return (
                <>
                  <tr
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      height: "50px",
                      textAlign: "center",
                    }}
                  >
                    <td>{ind + 1}</td>
                    {/* <td><img src={user._id} style={{width:"150px"}} /> </td> */}
                    <td>{user.fullname}</td>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.createdOn}</td>
                    <td>{user.isBlocked == true ? "True" : "False"}</td>

                    <td>
                      <Link
                        to={`/user/${user._id}`}
                        class="btn btn-outline-primary"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <BsFillTrashFill
                        style={{ color: "red", fontSize: "40" }}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
