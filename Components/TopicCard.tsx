import Link from 'next/link'
import React from 'react'
import {
	Card,
	Button
} from 'react-bootstrap'

interface Topic {
    title: string
    image: string
    description: string
	href: string
}

const TopicCard = ({ Topic: topic}) => {
    return (
        <div>
			<Link href={topic.href}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={topic.image} />
                <Card.Body>
                    <Card.Title>{topic.title}</Card.Title>
                    <Card.Text>
						{topic.desctiption}
					</Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
			</Link>
        </div>
    )
}

export default TopicCard
