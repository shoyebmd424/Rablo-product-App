/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Components/Layout";
import useFatch from "../Hooks/UseFetch";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Axios from "../Axios";

const Dashboard = () => {
  const [min, setmin] = useState(undefined);
  const [max, setmax] = useState(undefined);
  const [featured, setFeatured] = useState(false);
  const [list, setlist] = useState([]);
  // const navigate = useNavigate();
  const { data } = useFatch(`product/?&rmin=${min || 0}&pmax=${max || 99999}`);

  // Delete
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/product/delete/${id}`);
      setlist(list.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const HandleFeature = async () => {
    try {
      const res = await Axios.get(`/product/?featured=${featured}`);
      console.log(res);
      if (res && res.data.success) {
        setlist(res.data.message);
      } else {
        console.log(res.data);
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (!featured) {
      setlist(data);
    }
  }, [data, featured]);
  useEffect(() => {
    if (featured) {
      HandleFeature();
    }
  }, [featured]);
  return (
    <>
      <Layout>
        <div className="container-fluids">
          <div className="row">
            <div className="col-2">
              <div className="text-start">
                <Link to="/dashboard/add" className="btn mt-3 mb-5 btn-primary">
                  ADD Product
                </Link>
                <div>
                  <form action="" className="text-start">
                    <h2>Filter Products</h2>
                    <hr />
                    <div className="">
                      <input
                        type="text"
                        value={max}
                        onChange={(e) => setmax(e.target.value)}
                        className="m-2 "
                        placeholder="Maximum price"
                      />
                      <input
                        type="text"
                        value={min}
                        onChange={(e) => setmin(e.target.value)}
                        className="m-2"
                        placeholder="Minimum Rating"
                      />
                    </div>
                    <div className="form-check ms-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="featured"
                        value={featured}
                        onChange={(e) => {
                          setFeatured((c) => !c);
                        }}
                        onClick={HandleFeature}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Featured
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-9">
              <h1 className="my-4">All Products</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Serial Number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Featured</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Company</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((data, key) => (
                    <tr>
                      <th key={key} scope="row">
                        {key + 1}
                      </th>
                      <td className="text-capitalize">{data?.name}</td>
                      <td>{data?.price}</td>
                      <td>{data?.featured ? "Yes" : "No"}</td>
                      <td>{data?.rating}</td>
                      <td>{data?.company}</td>
                      <td>{data?.createdAt}</td>
                      <td>
                        <Link
                          to={`/dashboard/update/${data?._id}`}
                          className="btn btn-primary mx-2"
                        >
                          UPDATE
                        </Link>
                        <button
                          onClick={() => handleDelete(data?._id)}
                          className="btn btn-danger mx-2"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
