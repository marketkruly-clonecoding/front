import { cls } from '@libs/cls';

interface IButton {
    size: "small" | "middle" | "large"; // 340px ,  , 430px
    backcolor: "white" | "purple"
    text: string;
    [key: string]: any;

}

const Button = ({ size, text, backcolor }: IButton) => {
    return (
        <button className={cls(
            backcolor === "white" ? "border-2 border-purple-800 text-purple-800" : "bg-purple-800 text-white",
            "p-3 rounded-sm",
            size === "small" ? "w-[110px] p-2" : size === "middle" ? "w-[340px]" : "w-[430px]"
        )}>{text}</button>
    )
}

export default Button;