import { ReactNode } from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
    useColorMode,
} from '@chakra-ui/react'
import { SignedIn, UserButton, useUser, SignedOut } from '@clerk/clerk-react'
import DarkModeToggle from 'react-dark-mode-toggle'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const NavLink = (props) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={props.href}
    >
        {props.children}
    </Link>
)
const WriterButton = () => {
    const user = useUser()
    return (
        <div>
            {(user.publicMetadata.writer || user.publicMetadata.admin) && (
                <NavLink href="/writer">Writer</NavLink>
            )}
        </div>
    )
}
const AdminButton = () => {
    const user = useUser()
    return (
        <>
            {user.publicMetadata.admin && (
                <NavLink href="/admin">Admin</NavLink>
            )}
        </>
    )
}
export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { toggleColorMode } = useColorMode()
    const buttonBgColor = useColorModeValue('gray.200', 'gray.700')
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Link href="/">
                                <Heading>Cowington Post</Heading>
                            </Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            <NavLink href={'/'}>All Topics</NavLink>
                            <NavLink href={'/topic/cow'}>Cow News</NavLink>
                            <NavLink href={'/images'}>Cow Images</NavLink>
                            <SignedIn>
                                <WriterButton />
                                <AdminButton />
                            </SignedIn>
                            <SignedOut>
                                <NavLink href={'/sign-in'}>Log In</NavLink>
                            </SignedOut>
                            <DarkModeToggle onChange={toggleColorMode} checked={useColorModeValue(false,true)} />
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <UserButton />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink href={'/'}>All Topics</NavLink>
                            <NavLink href={'/topic/cow'}>Cow News</NavLink>
                            <NavLink href={'/images'}>Cow Images</NavLink>
                            <SignedIn>
                                <WriterButton />
                                <AdminButton />
                            </SignedIn>
                            <SignedOut>
                                <NavLink href={'/sign-in'}>Log In</NavLink>
                            </SignedOut>
                            {/* <DarkModeToggle
                                onChange={toggleColorMode}
                                checked={}
                                size={80}
                            /> */}
                            <Button
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: buttonBgColor,
                                }}
                                onClick={toggleColorMode}
                            >
                                Switch Color Scheme
                            </Button>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}
