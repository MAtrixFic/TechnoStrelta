"use server"
interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    avatar: string,
}
async function getUserData(userId: number): Promise<User> {
    const formData = new FormData();
    formData.append('id', userId.toString());
    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/api/media/getUser', {
        method: 'POST',
        body: formData
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    console.log(response.json())
    // return response.json()
}
export default getUserData;