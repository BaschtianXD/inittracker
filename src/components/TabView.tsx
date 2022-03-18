import React, { ReactNode } from "react";

interface TabViewProps {
    tabViewItems: TabViewItem[]
    selectedId: string
}

export interface TabViewItem {
    name: string,
    id: string,
    view: ReactNode,
    onTabButtonPress: () => void
}

function TabView(props: TabViewProps) {

    return (
        <div className="flex flex-col top-0 bottom-0 left-0 right-0 grow max-h-full">
            {props.tabViewItems.map(child => (
                child.id === props.selectedId ?
                    <div className="grow overflow-y-auto overscroll-contain" key={child.id} >
                        {child.view}
                    </div>
                    :
                    <></>
            ))}


            <div className='w-full flex flex-row justify-evenly bottom-0 bg-secondary h-10 shrink-0'>
                {props.tabViewItems.map(child => (
                    <div className={child.id === props.selectedId ? "bg-primary p-1 rounded my-auto" : "p-1 my-auto"} onClick={child.onTabButtonPress} key={child.id}>
                        {child.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabView