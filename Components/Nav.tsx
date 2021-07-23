import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'

const WriterButton = () => {
    const user = useUser()
    return (
        <div>
            {(user.publicMetadata.writer||user.publicMetadata.admin)&&(
                <Nav.Link href="/writer">
                    Writer
                </Nav.Link>
            )}
        </div>
    )
}


function CowingtonNavbar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Link href="/">Cowington Post</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">All topics</Nav.Link>
                            <Nav.Link href="/topic/cow">Cow News</Nav.Link>
                            <SignedOut>
                                <Nav.Link href="/sign-in">Log in</Nav.Link>
                            </SignedOut>
                            <SignedIn>
                                <WriterButton />
                            </SignedIn>
                            {/* <NavDropdown
                                title="Dropdown"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            <UserButton></UserButton>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default CowingtonNavbar
