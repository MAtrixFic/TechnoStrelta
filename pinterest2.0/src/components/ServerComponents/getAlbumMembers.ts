"use server"
import { cookies } from "next/headers";

async function getAlbumsMember(albumId: string) {
    const formData = new FormData();
    const token = cookies().get('jwt')?.value
    if (!token) {
        throw new Error('No token provided')
    }
    formData.append('token', token);
    formData.append('albumId', albumId);
    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/media/getAlbumsMedia', {
        body: formData,
    })
    if (!response.ok) {
        throw new Error('Something went wrong with getting tags')
    }
    return response.json()

}
export default getAlbumsMember;