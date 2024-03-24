"use server"
async function getTags() {
    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/media/getTags ')
if(!response.ok){
    throw new Error('Something went wrong with getting tags')
}
  return response.json()
}
export default getTags;