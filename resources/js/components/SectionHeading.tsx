type SectionHeadingProps = React.PropsWithChildren<{}>;

export default ({ children }: SectionHeadingProps) => {
    return <h2 className="text-lg font-bold ff-pm">
        {children}
    </h2>
};
