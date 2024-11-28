import React from 'react';

export default React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ type, ...props }, ref) => {
    return <input
        type={type}
        ref={ref}
        {...props}
        className="border leading-tight rounded-sm px-2 py-1 w-full"
    />
});
