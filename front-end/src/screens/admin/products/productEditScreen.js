import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsProduct } from "../../../features/admin/productDetailsSlice";
//import { useGetProductQuery } from "../../../features/products/productsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  resetUpdateProduct,
  updateProduct,
} from "../../../features/admin/productUpdateSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";

const ProductEditScreen = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInstock, setCountInstock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { isLoading, error, product } = productDetails;

  // const { data, isError, isLoading, isFetching, isSuccess } =
  //   useGetProductQuery(id);

  const productUpdate = useSelector((state) => state.productUpdate);

  const {
    isLoading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      navigate("/productlist");
    }
    if (!product || product._id !== id || successUpdate) {
      dispatch(resetUpdateProduct());
      dispatch(detailsProduct(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInstock(product.countInstock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, id, navigate, product, successUpdate]);
  //   const productDetails = useSelector((state) => state.productDetails);
  //   const { loading, error, product } = productDetails;
  // useEffect(() => {
  //   console.log(id);

  //   console.log(data)

  // if (isSuccess) {

  // }
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target]: e.target.value,
      };
    });
  };
  const uploadFileHandler = () => {};
  const submitHandler = (e) => {
    e.preventDefault();

    const storage = getStorage();
    const storageRef = ref(storage, imageFile.name);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // console.log({...inputs, image: downloadURL})

          dispatch(
            updateProduct({
              _id: id,
              name,
              price,
              image: downloadURL,
              category,
              brand,
              countInstock,
              description,
            })
          );
        });
      }
    );
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {id}</h1>
        </div>
        {loadingUpdate && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {errorUpdate && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorUpdate}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                // onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter Image"
                value={image}
                // onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                type="file"
                label="Choose Image"
                onChange={(e) => setImageFile(e.target.files[0])}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                // onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                // onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInstock}
                // onChange={(e) => setCountInstock(e.target.value)}
                // onChange={handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
export default ProductEditScreen;
