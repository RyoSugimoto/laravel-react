import type { PropsWithChildren } from "react";

const maxWidthClass = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
} as const;

type screenWidthName = keyof typeof maxWidthClass;

type ContainerProps = PropsWithChildren<{
    center?: boolean;
    maxWidth?: screenWidthName;
    hasPadding?: boolean;
}>;

export default ({ center = true, maxWidth = 'lg', hasPadding = true, children }: ContainerProps) => {
    return <div
        className={`container ${maxWidthClass[maxWidth]} ${center ? 'mx-auto' : '' } ${hasPadding ? 'px-4': ''}`}
    >
        {children}
    </div>
};
