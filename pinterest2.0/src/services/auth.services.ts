import axios from "axios"

export async function AsyncSendRegistrationRequest(photo: File, username: string, email: string, password: string, approvedPassword: string) {
    const form = new FormData();
    console.log(photo)
    form.append('my_file', photo);
    form.append('username', '321');
    console.log(form)
    axios.post('http://localhost:3001', { 'my_file': photo }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}