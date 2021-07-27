import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function ProductSimple(props) {
    return (
        <Link href={props.href} prefetch={true} passHref>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                _bg={useColorModeValue('gray.100', 'gray.600')}
            >
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${props.image})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}
                >
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        alt="Image"
                        src={props.image}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Heading
                        fontSize={'3xl'}
                        fontFamily={'body'}
                        fontWeight={500}
                    >
                        {props.title}
                    </Heading>
                </Stack>
            </Box>
        </Link>
    )
}
