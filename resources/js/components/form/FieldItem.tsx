type FieldItemProps = React.PropsWithChildren<{
}>;

const FieldItem: React.FC<FieldItemProps> = ({ children }) => {
    return <div
        className="grid gap-2"
    >
        {children}
    </div>
};

export default FieldItem;
