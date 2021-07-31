import { useQuill } from 'react-quilljs'
import { useState, Component, useRef, useMemo, useEffect } from 'react'
import React from 'react'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { server } from '../../config/index'
import { Select, Box, Input, Checkbox } from '@chakra-ui/react'
import { useAlert } from 'react-alert'

export const EditArticle = (props) => {
    console.log(typeof props.article._id)
    const myRef = useRef(props.article.title)
    const [posted, setPosted] = useState(false)
    // setPosted(props.article.posted)
    const [text, setText] = useState('')
    const [selection, setSelection] = useState(props.article.topic)

    // console.log(quill)
    // Quill.register('modules/imageResize', ImageResize)

    const { quill, quillRef } = useQuill({ theme: 'snow' })
    useEffect(() => {
        if (myRef.current) {
            myRef.current.value = props.article.title
        }
    }, [myRef])
    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(props.article.content)
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
                    <Checkbox
                        isChecked={posted}
                        onChange={(e) => {
                            setPosted(e.target.checked)
                        }}
                        defaultValue={props.article.posted}
                    >
                        Posted
                    </Checkbox>
                </Form.Group>
                <Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => {
                            console.log('Button pressed')
                            console.log(typeof posted)

                            axios({
                                method: 'post',
                                url: server + '/api/writer/addArticle',
                                data: {
                                    posted: posted,
                                    _id: props.article._id,
                                    title: myRef.current.value,
                                    content: quill.root.innerHTML,
                                    topic: selection,
                                },
                            })
                                .then((err) => {
                                    alert.show(
                                        'Your article has been submitted for review.'
                                    )
                                    console.log(err)
                                })
                                .catch((err) => {
                                    alert.show('An Error occured.')
                                    console.log(err)
                                })
                        }}
                    >
                        Save
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}
export const getServerSideProps = async (context) => {
    const res = await fetch(server + `/api/article/${context.params.id}`)
    const article = await res.json()
    return {
        props: {
            article,
        },
    }
}
export default EditArticle
