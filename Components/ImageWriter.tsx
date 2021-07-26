import { Button, Box, SimpleGrid, Input } from '@chakra-ui/react'
import {useAlert} from 'react-alert'
export default function Upload() {
    const alert = useAlert()
    const uploadPhoto = async (e) => {
        const file = e.target.files[0]
        const filename = encodeURIComponent(file.name)
        const res = await fetch(`/api/post-image?file=${filename}`)
        const { url, fields } = await res.json()
        const formData = new FormData()

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (upload.ok) {
            console.log('Uploaded successfully!', {type: "success"})
            alert.show("Uploaded Successfully")
        } else {
            console.error('Upload failed.')
            alert.show("Upload Failed", {type: "error"})
        }
    }

    return (
        <SimpleGrid>
            <p>Upload a .png or .jpg image (max 1MB).</p>
            <Input
                type="file"
                onChange={uploadPhoto}
                accept="image/png, image/jpeg"
            />
        </SimpleGrid>
    )
}
