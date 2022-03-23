import { ReactNode } from "react"

interface ButtonProps {
    text: string
    icon?: ReactNode
    onClick?: () => void
    enabled?: boolean
}

export function PrimaryButton(props: ButtonProps) {
    return (
        <button className="flex flex-row items-center gap-1 bg-primary rounded p-1 select-none" onClick={props.enabled === undefined || props.enabled ? props.onClick : undefined}>
            {
                props.icon ?
                    <div>
                        {props.icon}
                    </div>
                    :
                    <></>
            }
            <p>{props.text}</p>
        </button >
    )
}

export function SecondaryButton(props: ButtonProps) {
    return (
        <button className="flex flex-row items-center gap-1 bg-secondary rounded p-1 select-none" onClick={props.enabled === undefined || props.enabled ? props.onClick : undefined}>
            {
                props.icon ?
                    <div>
                        {props.icon}
                    </div>
                    :
                    <></>
            }
            <p>{props.text}</p>
        </button >
    )
}