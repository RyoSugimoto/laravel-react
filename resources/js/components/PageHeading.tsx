type PageHeadingProps = React.PropsWithChildren<{}>;

export default ({ children }: PageHeadingProps) => {
    return <h2 className="text-xl font-bold ff-pm">
        {children}
    </h2>
};
