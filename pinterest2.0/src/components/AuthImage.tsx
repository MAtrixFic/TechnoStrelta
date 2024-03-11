'use client'

import React, { useState } from 'react'
import Image from 'next/image';

const AuthImage = () => {
    const [imageData, useImageData] = useState<string>()

    return (
        <label className="auth__file">
            {imageData && <Image height={160} width={160} src={imageData} alt='Аватарка' className='auth__img' />}
            <input name='avatar' type="file" accept=".jpg, .jpeg, .png" onChange={event => {
                if (event.currentTarget.files !== null) {
                    const file = event.currentTarget.files[0];
                    const reader = new FileReader();

                    reader.onloadend = function () {
                        const base64 = reader.result;
                        useImageData(base64 as string)
                    };

                    reader.readAsDataURL(file);
                }
            }}
                required />
        </label>
    )
}

export default AuthImage
