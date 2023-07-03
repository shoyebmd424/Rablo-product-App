import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";

const UpdateProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [featured, setfeatured] = useState(false);
  const [rating, setrating] = useState("");
  const [company, setcompany] = useState("");
  const [result, setresult] = useState(undefined);
  const prams = useParams();

  const getOneproduct = async () => {
    try {
      const data = await Axios.get(`/product/?_id=${prams.id}`);
      setresult(data.data.message[0]);
    } catch (error) {
      toast.error("somthing went wrong....!");
    }
  };
  useEffect(() => {
    getOneproduct();
    setname(result?.name);
    setprice(result?.price);
    setfeatured(result?.featured);
    setrating(result?.rating);
    setcompany(result?.company);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  console.log(result);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`/product/update/${prams.id}`, {
        name,
        price,
        featured,
        rating,
        company,
      });
      if (res && res.data.success) {
        console.log(res.data.message);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        return res.data.message;
      }
    } catch (error) {
      toast.error("something went wrong...!");
    }
  };

  // delete

  return (
    <Layout>
      <div className="form-container d-flex" style={{ minHeight: "90vh" }}>
        <div className="card col-3 m-auto ">
          <form onSubmit={handleSubmit} className="p-4">
            <h4 className="title">Update Product</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter product name "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                className="form-control"
                placeholder="Enter Product Price"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="Number"
                value={rating}
                onChange={(e) => setrating(e.target.value)}
                className="form-control"
                placeholder="Enter Product Rating"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={company}
                onChange={(e) => setcompany(e.target.value)}
                className="form-control"
                placeholder="Enter Product Company Name"
                required
              />
            </div>
            <div className="form-check mb-3 text-start">
              <input
                type="checkbox"
                name="featured"
                value={featured}
                onChange={(e) => {
                  setfeatured((c) => !c);
                }}
              />
              <label className="form-check-label ms-3">Featured</label>
            </div>
            <div>
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
