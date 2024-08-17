import React, { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

    const [list, setList] = useState([]);
    const URL = "http://localhost:4000"

    useEffect(() => {
        fetchlist();
    }, [])

    const fetchlist = async () => {
        const response = await axios.get(`${URL}/api/food/list`);
        if (response.data) {
            setList(response.data.data);
        }
        else {
            toast.error("Error");
        }
    }

    const handledelete = async (id) => {
        try {
            const response = await axios.delete(`${URL}/api/food//remove-item/${id}`);

            if (response.data) {
                toast.success(response?.data.message);
            }
            fetchlist();
        }
        catch (error) {
            toast.error('Error');
            console.log('Error', error);
        }
    }


    return (
        <div className='list'>
            <p> All Food List</p>
            <div className="list-table">
                <div className=" row">
                    <b className='col'>Image</b>
                    <b className='col'>Name</b>
                    <b className='col'>Category</b>
                    <b className='col'>Price</b>
                    <b className='col'>Action</b>
                </div>
                <div className='upper-mapping mt-4'>
                    {list?.map((item, index) => {
                        return (
                            <>
                                <div key={index} className=" mapping row">
                                    <div className="col" ><img height={70} src={`${URL}/images/${item?.image}`} /></div>
                                    <div className="col">{item.name}</div>
                                    <div className="col">{item?.category}</div>
                                    <div className="col">{item?.price}</div>
                                    <div onClick={() => { handledelete(item?._id) }} className="col cross fs-3 ">x</div>
                                </div>
                                <hr />
                            </>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default List