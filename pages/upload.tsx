export default function Upload() {
    const uploadPhoto = async (e) => {
        const file = e.target.files[0]
        const filename = encodeURIComponent(file.name)
        const res = await fetch(`/api/post-image?file=${filename}`)
        const { url, fields } = await res.json()
        const formData = new FormData()

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            //@ts-ignore
            formData.append(key, value)
        })

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (upload.ok) {
            console.log('Uploaded successfully!')
        } else {
            console.error('Upload failed.')
        }
    }

    return (
        <>
            <p>Upload a .png or .jpg image (max 1MB).</p>
            <input
                onChange={uploadPhoto}
                type="file"
                accept="image/png, image/jpeg"
            />
        </>
    )
}
