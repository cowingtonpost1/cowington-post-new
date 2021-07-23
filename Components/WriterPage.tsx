import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import { useState, Component } from 'react'
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { server } from '../config/index'

class writer extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' }
        this.myRef = React.createRef()

        this.handleChange = this.handleChange.bind(this)
        // this.showEditor = this.showEditor.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the title of the article here"
                            ref={this.myRef}
                        />
                    </Form.Group>
                    <Form.Group>
                        <ReactQuill
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log('Button pressed')
                                console.log(this.state)
                                console.log(this.myRef.current.value)

                                axios({
                                    method: 'post',
                                    url: server + '/api/writer/addArticle',
                                    data: {
                                        title: this.myRef.current.value,
                                        content: this.state.text,
                                    },
                                }).then((err) => {
                                    console.log(err)
                                }).catch((err) => {
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
}
export default writer
