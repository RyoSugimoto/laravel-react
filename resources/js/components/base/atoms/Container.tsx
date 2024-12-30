import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
    center?: boolean;
    className?: string;
    hasPadding?: boolean;
}>;

const Container: React.FC<ContainerProps> = ({
    center = true,
    hasPadding = true,
    className,
    children,
}, props) => {
    return <div
        className={`
            container
            ${center ? 'mx-auto' : '' }
            ${hasPadding ? 'px-4': ''}
            ${className}
        `}
        {...props}
    >
        {children}
    </div>
}

export default Container;
