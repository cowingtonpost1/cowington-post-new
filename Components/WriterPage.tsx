import dynamic from 'next/dynamic'
import { useQuill } from 'react-quilljs'
import { useState, Component, useRef, useMemo } from 'react'
import React from 'react'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { server } from '../config/index'
import { Select, Box, Input } from '@chakra-ui/react'
import { useAlert } from 'react-alert'
import { useUser } from '@clerk/nextjs'

const modules = {
    ImageResize: {},
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

export const WriterPage = () => {
    const user = useUser()
    const myRef = useRef()
    const [text, setText] = useState('')
    const [selection, setSelection] = useState('cow')

    // console.log(quill)
    // Quill.register('modules/imageResize', ImageResize)

    const { quill, quillRef } = useQuill({ theme: 'snow' })

    const insertToEditor = (url) => {
        const range = quill.getSelection()
        quill.insertEmbed(range.index, 'image', url)
    }

    // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
    const saveToServer = async (file) => {
        // const body = new FormData()
        const formData = new FormData()
        // body.append('file', file)
        const filename = encodeURIComponent(file.name)
        const res = await fetch(`/api/upload-image/?file=${filename}`, {
            // method: 'POST',
        })
        const { url, fields, imageURL } = await res.json()
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            //@ts-ignore
            formData.append(key, value)
        })
        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })
        // const res: any = await fetch(
            // server + '/api/upload-image/?file=' + filename,
            // {
                // method: 'POST',
                // body,
            // }
        // )
        // const json = await res.json()
        // insertToEditor(json.imageURL)
        insertToEditor(imageURL)
    }

    // Open Dialog to select Image File
    const selectLocalImage = () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = () => {
            const file = input.files[0]
            saveToServer(file)
        }
    }

    React.useEffect(() => {
        if (quill) {
            // Add custom handler for Image Upload
            quill.getModule('toolbar').addHandler('image', selectLocalImage)
        }
    }, [quill])

    const alert = useAlert()
    // Insert Image(selected by user) to quill

    function handleChange(value) {
        setText(value)
    }

    return (
        <>
            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>Title</Form.Label>
                    <Input
                        type="text"
                        placeholder="Enter the title of the article here"
                        ref={myRef}
                    />
                </Form.Group>
                <Form.Group>
                    {/* <ReactQuill
                        value={text}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                    /> */}
                    <Box width={500} height={300} marginBottom={'5.5rem'}>
                        <div ref={quillRef}></div>
                    </Box>
                </Form.Group>
                <Form.Group>
                    <Select
                        value={selection}
                        onChange={(e) => {
                            const value = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            )
                            console.log(value)
                            setSelection(value[0])
                        }}
                    >
                        <option value="cow">Cow News</option>
                        <option value="computer">Computer Article</option>
                    </Select>
                </Form.Group>
                <Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => {
                            console.log('Button pressed')
                            axios({
                                method: 'post',
                                url: server + '/api/writer/addArticle',
                                data: {
                                    title: myRef.current.value,
                                    content: quill.root.innerHTML,
                                    topic: selection,
                                },
                            })
                                .then((err) => {
                                    if (user.publicMetadata.admin) {
                                        alert.success(
                                            'Your article has been posted!'
                                        )
                                    } else {
                                        alert.success(
                                            'Your article has been submitted for review.'
                                        )
                                    }
                                })
                                .catch((err) => {
                                    alert.show('An Error occured.')
                                    console.log(err)
                                })
                        }}
                    >
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default WriterPage
