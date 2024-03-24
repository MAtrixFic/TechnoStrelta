"use server"

async function getUsers() {
    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/api/media/getUsers')
    if(!response.ok){
        throw new Error('Something went wrong with getting users')
    }
    return response.json()
}