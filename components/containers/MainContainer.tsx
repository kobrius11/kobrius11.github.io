import { ComponentProps } from "../../interfaces/ComponentProps";

export default function MainContainer ({ children, className="" }: ComponentProps ) {
    return (
        <div className={`Container ${className}`}>
            { children }
      </div>
    );
}