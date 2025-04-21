import { useEffect, useState } from "react"
import { DeleteData, GetData } from "../api/GetUpdateData";
import Form from "./Form";

const UpdateData = () => {
    const [data, setData] = useState([]);
    const [updateDataApi,setUpdateDataApi] = useState({});

    const getData = async() =>{
        try{
            const res = await GetData();
            setData(res.data);
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    const handleDeleteBtn = async(id) =>{
        try {
            const res = await DeleteData(id);
            if(res.status == 200){
                alert("Deleted SuccessFully")
                const newUpdatedData = data.filter((currData) => {
                    return currData.id !== id;
                })
                setData(newUpdatedData);
            }
        } catch (error) {
            console.log(error)  
            
        }
    }
    const handleUpdatePost = (item) => {
        setUpdateDataApi(item);
    }

  return (
        <section className=" bg-gray-900">
            <Form data = {data} setData = {setData} updateDataApi = {updateDataApi} setUpdateDataApi = {setUpdateDataApi}/>
            <ol className="list-decimal list-inside grid grid-cols-3 text-white gap-5 col-span-3 px-5  pt-5">
                {data.map((item) => {
                    return (
                        <li key={item.id} className="bg-gray-800 p-4 shadow-md rounded-md mb-5 border-l-2 border-white-500">
                            <h3 className="inline ">{item.title}</h3>
                            <p className="my-8">{item.body}</p>
                            <button className="m-2 px-6 py-2 bg-[rgba(0,255,0,0.8)] rounded-md hover:shadow-[0_0_15px_3px_rgba(0,255,0,0.8)] transition-shadow duration-300" onClick={() => handleUpdatePost(item)}>Edit</button>
                            <button className="m-2 px-4 py-2 bg-[rgba(255,0,0,0.8)] rounded-md hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] transition-shadow duration-300" onClick={() => handleDeleteBtn(item.id)}>Delete</button>
                        </li>
                    )
                })}
            </ol>
        </section>
  )
}

export default UpdateData
