import React from 'react'

const NewTopicCard3 = (props) => {
    return (
        <div>
            <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img
                    className="block mx-4"
                    src={props.image}
                    alt="Woman's Face"
                />
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            {props.title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewTopicCard3
