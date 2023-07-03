import React, { useState } from "react";
import Axios from "../Axios";
import { toast } from "react-hot-toast";

const CreateProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [featured, setfeatured] = useState(false);
  const [rating, setrating] = useState("");
  const [company, setcompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/product/create", {
        name,
        price,
        featured,
        rating,
        company,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("something went wrong...!");
    }
  };

  return (
    <>
      <div className="form-container d-flex" style={{ minHeight: "90vh" }}>
        <div className="card col-3 m-auto ">
          <form onSubmit={handleSubmit} className="p-4">
            <h4 className="title">Add Product</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="form-control"
                placeholder="Enter Product Name"
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
              <button className="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
