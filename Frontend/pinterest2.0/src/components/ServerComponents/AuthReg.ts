"use server "
async function registerUser(username: string, email: string, password: string, avatar: File): Promise<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    const response = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/api/auth/register', {
        method: 'POST',
        body: formData
    });
    if(!response.ok){
        throw new Error(response.statusText)
    }
    return response.json();
}

export default registerUser;