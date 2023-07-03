import productSchema from "../Model/ProductSchema.js";
export const saveProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = new productSchema(req.body);
    await product.save();
    res.send({
      success: true,
      message: "New Product successfully saved ....!",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong....!" });
  }
};
// update product
export const updateProduct = async (req, res) => {
  try {
    await productSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.send({
      success: true,
      message: "Product have updated successfully...",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong.....!" });
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product have Deleted successfully...",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong.....!" });
  }
};

// get all products with filter
export const getAllProduct = async (req, res) => {
  try {
    const { rmin, pmax, ...other } = req.query;
    const products = await productSchema.find({
      ...other,
      price: { $lt: pmax || 999999 },
      rating: { $gt: rmin || 1 },
    });
    res.send({ success: true, message: products });
  } catch (error) {
    res.send({ success: false, message: "Something went wrong.....!" });
  }
};
