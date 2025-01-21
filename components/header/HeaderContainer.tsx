import { ComponentProps } from "../../interfaces/ComponentProps";
import MainContainer from "../containers/MainContainer";

export default function HeaderContainer ({ children, className="" }: ComponentProps ) {
    return (
        <MainContainer>
            <div className="flex items-center">
                <div className={`grid grid-cols-3 ${className}`}>
                    {children}
                </div>
            </div>
        </MainContainer>
    );
}