import { useEffect, useState } from "react";
import { AddData, UpdateData } from "../api/GetUpdateData";
import PropTypes from "prop-types"

const Form = ({data,setData,updateDataApi,setUpdateDataApi}) => {
    const[addData,setAddData] = useState({
        title : "",
        body : ""
    })
    let isEmpty = Object.keys(updateDataApi).length === 0;
    useEffect(() => {
        updateDataApi && setAddData({
            title : updateDataApi.title || "",
            body : updateDataApi.body || ""
        })
    },[updateDataApi])
    const handleAddData = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setAddData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const addPostData = async() => {
        try {
            if(addData.title.trim() === "" && addData.body.trim() === ""){
                alert("Please Enter Title and Body")
                return;
            }
            const res = await AddData(addData);
            console.log("res",res);
            if(res.status === 201){
                alert("Data Added Successfully")
                setData([...data,res.data])
                setAddData(
                    {
                        title : "",
                        body : ""
                    }
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updatePostData = async() => {
        try {
            if(addData.title.trim() === "" && addData.body.trim() === ""){
                alert("Please Enter Title and Body")
                return;
            }
            const res = await UpdateData(updateDataApi.id,addData)
            // console.log("res",res);
            if(res.status === 200){
                alert("Data Updated Successfully");
                setData((prev) =>{
                    return prev.map((currElem) => {
                        return currElem.id === updateDataApi.id ?res.data : currElem;
                    })
                })
                setAddData({
                    title : "",
                    body : ""
                })
                setUpdateDataApi({});
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    const handleSubmitBtn = (e) =>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;

        if(action === "Add"){
            addPostData();           
        }else if(action === "Edit"){
            updatePostData();
        }
    }

  return (
    <form onSubmit={handleSubmitBtn} className="flex flex-row justify-center items-center gap-5 bg-gray-900 p-8">
        <label htmlFor="title"></label>
        <input 
            type="text" 
            autoComplete="off" 
            name="title" 
            placeholder="Title..." 
            className="py-2 px-4 rounded-md" 
            id="title"
            value={addData.title}
            onChange={handleAddData}
        />
        <label htmlFor="body"></label>
        <input 
            type="text" 
            autoComplete="off" 
            name="body" 
            placeholder="Body..." 
            className="py-2 px-4 rounded-md" 
            id="body"
            value={addData.body}
            onChange={handleAddData}
        />
        <button 
        className={`text-white shadow-md px-8 py-2 rounded-md 
            ${
                isEmpty ? "bg-[rgb(255,1,1)] hover:shadow-[0px_0px_15px_5px_rgb(255,1,1)]" :   
                "bg-[rgb(0,255,0)] hover:shadow-[0px_0px_15px_5px_rgb(0,255,0)]"
            }  
        transition-shadow duration-300`} value={isEmpty ? "Add" : "Edit"}>{ isEmpty ? "Add" : "Edit"}</button>
    </form>
  )
}
Form.propTypes = {
    data : PropTypes.array,
    setData : PropTypes.func,
    updateDataApi : PropTypes.object,
    setUpdateDataApi : PropTypes.func
}

export default Form
