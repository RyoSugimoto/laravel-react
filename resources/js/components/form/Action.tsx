type ActionProps = React.PropsWithChildren<{
    className?: string;
}>;

const Action: React.FC<ActionProps> = ({ className = '', children }) => {
    return <div
        className={`flex flex-wrap gap-2 ${className}`}
    >
        {children}
    </div>
};

export default Action;
