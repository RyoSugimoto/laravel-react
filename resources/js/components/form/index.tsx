import React, { PropsWithChildren } from "react"
import Input from "./Input";

export { Input };

export type HTMLFieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type FieldsProps = PropsWithChildren<{}>;

/** 複数の Item を囲むレイアウト用コンポーネント。 */
export function Fields({ children }: FieldsProps) {
    return <div
        className="grid gap-2"
    >{children}</div>
}

type ItemProps = PropsWithChildren<{}>;

/** 1つの項目に関する要素をまとめるコンポーネント。  */
export function Item({ children }: ItemProps) {
    return <div>{children}</div>
};

type LabelProps = PropsWithChildren<{
    htmlFor: string;
}>;

/** label 要素。  */
export function Label({ htmlFor, children }: LabelProps) {
    return <label htmlFor={htmlFor}>{children}</label>
};

type MessageProps = PropsWithChildren<{
    variant: 'error';
}>;

/** エラーなどのメッセージを表示するコンポーネント。 */
export function Message({ variant, children }: MessageProps) {
    return <p
        data-variant={variant}
        className="leading-tight mt-1 text-red-400"
    >{children}</p>
};
