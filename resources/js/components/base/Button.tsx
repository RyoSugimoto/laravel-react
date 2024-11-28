import React from 'react';

export default React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(({ children, ...props }, ref) => {
    return <button
        ref={ref}
        {...props}
        className=" bg-blue-700 border-2 inline-flex justify-center leading-none min-w-16 px-5 py-2 rounded-full text-white disabled:bg-gray-500 disabled:opacity-75"
    >{children}</button>
});
