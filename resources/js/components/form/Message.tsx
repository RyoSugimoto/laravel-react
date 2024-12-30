/**
 * @var array<string, string>
 * 値はTailwindCSSのクラス
 */
const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    ghost: '',
} as const;

type MessageProps = React.PropsWithChildren<{
    variant?: keyof typeof variants;
}>;

const Message: React.FC<MessageProps> = ({ variant = 'primary', children }) => {
    return <div
        className={`text-sm px-2 py-1 rounded-sm ${variants[variant]}`}
        aria-live="assertive"
    >
        {children}
    </div>
};

export default Message;
