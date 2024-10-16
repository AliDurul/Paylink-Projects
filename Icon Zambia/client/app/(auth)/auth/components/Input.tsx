import React from 'react'

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type: string;
}

export default function Input({ id, onChange, value, label, type }: InputProps) {
    return (
        <div className='relative'>
            <input
                value={value}
                id={id}
                type={type}
                onChange={onChange}
                placeholder=' '
                className='block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:right-0 peer'
            />
            <label
                htmlFor={id}
                className='absolute text-base text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'>
                {label}
            </label>
        </div>
    )
}
