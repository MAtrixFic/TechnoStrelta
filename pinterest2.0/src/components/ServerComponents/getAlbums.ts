"use server"
import { cookies } from "next/headers";

async function getPublicAlbums() {
    const formData = new FormData();
    const token = cookies().get('jwt')?.value
    if (!token) {
        throw new Error('No token provided')
    }
    formData.append('token', token);
    // не уверен так как number 

    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/media/getPublicAlbums',{
        body: formData,
    })
    if(!response.ok){
        throw new Error('Something went wrong with getting public albums')
    }
    return response.json()
  }
  export default getPublicAlbums;