import type { InertiaLinkProps } from '@inertiajs/react';
import { Link as InertiaLink } from '@inertiajs/react';

type LinkProps = {
    withIcon?: boolean;
} & InertiaLinkProps;

const Link: React.FC<LinkProps> = ({withIcon = false, children, className, ...props}) => {
    return <InertiaLink
        className={`
            link
            ${withIcon && 'link-like-button'}
            ${className}
        `}
        {...props}
    >{children}</InertiaLink>
};

export default Link;
