"use server"
import { cookies } from "next/headers";

async function getMedias(){
    const formData = new FormData();
    const token = cookies().get('jwt')?.value
    if (!token) {
        throw new Error('No token provided')
    }
    formData.append('token', token);
    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/media/getPublicMedias',{
        body: formData,
    })
    if(!response.ok){
        throw new Error('Something went wrong with getting public albums')
    }
    return response.json()
  }