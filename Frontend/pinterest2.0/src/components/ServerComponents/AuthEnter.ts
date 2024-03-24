'use server'

export default async function (username: string, password: string): Promise<any> {
    const fData = new FormData()
    fData.append('username', username)
    fData.append('password', password)
    const resData = await fetch('https://bhsfwwc1-5444.euw.devtunnels.ms/api/auth/entrance', {
        method: 'POST',
        body: fData
    })

    if(!resData.ok)
        throw new Error(resData.statusText)

    return resData.json()
}