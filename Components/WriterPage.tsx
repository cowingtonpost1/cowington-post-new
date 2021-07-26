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
    const myRef = useRef()
    const [text, setText] = useState('')
    const [selection, setSelection] = useState('cow')

    // console.log(quill)
    // Quill.register('modules/imageResize', ImageResize)

    const { quill, quillRef } = useQuill({theme: "snow"})
    
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
                                    console.log(err)
                                })
                                .catch((err) => {
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
