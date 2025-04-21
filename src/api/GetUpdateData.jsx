import axios from "axios";

export const Api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

export const GetData = () =>{
    return Api.get("/posts")
}

export const DeleteData = (id) => {
    return Api.delete(`/posts/${id}`)
}

export const AddData = (data) => {
    return Api.post("/posts",data)
}
export const UpdateData = (id,data) => {
    return Api.put(`/posts/${id}`,data)
}
