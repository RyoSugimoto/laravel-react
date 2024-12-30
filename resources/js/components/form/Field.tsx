import React from 'react';
import FieldItem from './FieldItem';
import Action from './Action';

type FieldProps = React.PropsWithChildren<{}>;

const Field: React.FC<FieldProps> = ({ children }) => {
    const validChildren = React.Children.map(children, child => {
        if (React.isValidElement(child) && (child.type === FieldItem || child.type === Action)) {
            return child;
        } else {
            console.warn('Invalid child component:', child);
            return null;
        }
    });

    return <div
        className="grid gap-4"
    >
        {validChildren}
    </div>
};

export default Field;
