import { useForm, Controller } from 'react-hook-form'
import { useAlert } from 'react-alert'
import React from 'react'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    CheckboxGroup,
    VStack,
    Checkbox,
    NumberInputField,
    NumberInput,
} from '@chakra-ui/react'
import { server } from '../config'

export default function HookForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        control,
    } = useForm()
    const alert = useAlert()

    function onSubmit(values) {
        return new Promise<void>(async (resolve, reject) => {
            setTimeout(async () => {
                const res = await fetch(server + '/api/writer/apply/', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (res.ok) {
                    alert.success('Success!')
                } else {
                    alert.error('An error occurred.')
                }
                resolve()
            }, 3000)
        })
    }

    // @ts-ignore
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                    id="name"
                    placeholder="name"
                    {...register('name', {
                        required: 'This is required',
                        minLength: {
                            value: 4,
                            message: 'Minimum length should be 4',
                        },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={'age'}>Age</FormLabel>
                <NumberInput>
                    <NumberInputField
                        id={'age'}
                        placeholder={'12'}
                        {...register('age', {
                            required: 'This is required',
                            valueAsNumber: true,
                            min: 1,
                            max: 100,
                        })}
                    />
                </NumberInput>
                <FormErrorMessage>
                    {errors.age && errors.age.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={'reason'}>
                    Why do you want to be writer on Cowington Post.
                </FormLabel>
                <CheckboxGroup>
                    <Controller
                        control={control}
                        name={'reason1'}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                            <Checkbox
                                onChange={onChange}
                                textTransform="capitalize"
                                ref={ref}
                                isChecked={value}
                            >
                                I Like Cows.
                            </Checkbox>
                        )}
                    />
                    <Controller
                        control={control}
                        name={'reason2'}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                            <Checkbox
                                onChange={onChange}
                                textTransform="capitalize"
                                ref={ref}
                                isChecked={value}
                            >
                                I Like The Cowington Post.
                            </Checkbox>
                        )}
                    />
                    <Controller
                        control={control}
                        name={'reason3'}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                            <Checkbox
                                onChange={onChange}
                                textTransform="capitalize"
                                ref={ref}
                                isChecked={value}
                            >
                                I like to write stories.
                            </Checkbox>
                        )}
                    />
                </CheckboxGroup>
            </FormControl>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
            >
                Submit
            </Button>
        </form>
    )
}
