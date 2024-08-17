import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import { assets } from "./../../assets/assets";
import { toast } from "react-toastify";


const defaultData = {
    name: "",
    description: '',
    price: '',
    category: ""
}

const Add = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState(defaultData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleSet({ name, value });
    };
    const handleSet = ({ name, value }) => {
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post('http://localhost:4000/api/food/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setData(defaultData);
            setImage(false);
            toast.success(response.data.message);

            console.log('Response:', response.data);
        } catch (error) {
            toast.error(error.message);
            console.error('Error while submitting data:', error);
        }
    };

    return (
        <div className="container">
            <div className="row add-image flex-col">
                <p className="col-2">Upload Image</p>
                <div className="col-8">
                    <label htmlFor="image">
                        <img width={120} src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="row add-product-name flex-col">
                <p className="col-md-2">Product name</p>
                <input
                    type="text"
                    name="name"
                    value={data?.name}
                    placeholder="Type here"
                    onChange={handleChange}
                />
            </div>
            <div className="row add-product-description flex-col">
                <p className="col-md-2">Product description</p>
                <textarea
                    name="description"
                    value={data?.description}
                    rows={6}
                    onChange={handleChange}
                />
            </div>
            <div className="row add-category flex-col">
                <p className="col-md-2">Product category</p>
                <select
                    value={data?.category}
                    name="category"
                    onChange={handleChange}
                >
                    <option value="Salad">Salad</option>
                    <option value="Cake">Cake</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="row add-price flex-col">
                <p className="col-md-2">Product price</p>
                <input
                    type="number"
                    value={data?.price}
                    name="price"
                    onChange={handleChange}
                />
            </div>
            <button className="button" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
};

export default Add;
