import type { ReactNode } from "react"
import type { FlexContainerProps } from "src/components/base/flex-box/flex-container"

import FlexContainer from "src/components/base/flex-box/flex-container"

type FlexCenteredFullScreenContainerProps = {
    children: ReactNode
    minHeight?: "100dvh" | "25dvh" | "33dvh" | "50dvh" | "66dvh" | "75dvh" | "80dvh" | "85dvh" | "90dvh" | "95dvh"
} & FlexContainerProps

export default function FlexCenteredFullScreenContainer(props: FlexCenteredFullScreenContainerProps) {
    const { children, minHeight, ...restOfProps } = props

    return (
        <FlexContainer
            // alignItems="flex-end"
            flexDirection="column"
            // justifyContent="space-around"
            minHeight={minHeight || "100dvh"}
            {...restOfProps}
        >
            {children}
        </FlexContainer>
    )
}
