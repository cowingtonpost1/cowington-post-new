import { Button, Box, SimpleGrid, Input } from '@chakra-ui/react'
import { useAlert } from 'react-alert'
import { useSession } from '@clerk/clerk-react'
export default function Upload() {
    const session = useSession()
    const alert = useAlert()
    const uploadPhoto = async (e) => {
        const file = e.target.files[0]
        const filename = encodeURIComponent(file.name)
        console.log(filename)
        const res = await fetch(`/api/post-image/?file=${filename}`, {
            method: 'POST',
        })
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
            alert.success('Upload Successful.')
        } else {
            alert.error('Upload failed.')
        }
    }

    return (
        <SimpleGrid>
            <p>Upload a .png, .jpg or .HEIC image (max 1MB).</p>
            <Input
                type="file"
                onChange={uploadPhoto}
                accept="image/png, image/jpeg image/heic image/jpg image"
            />
        </SimpleGrid>
    )
}
