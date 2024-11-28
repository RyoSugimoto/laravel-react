import React from 'react';
import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';

export default ({ children, ...props }: React.PropsWithChildren<InertiaLinkProps>) => <Link className="text-cyan-300 underline" {...props}>{children}</Link>
