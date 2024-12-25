type PostListProps = React.PropsWithChildren<{}>;

export default ({ children }: PostListProps) => {
    return <div className="grid gap-4">
        {children}
    </div>
};
