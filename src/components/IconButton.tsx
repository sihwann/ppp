import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import styled from "styled-components/native"

import { themeType } from "../../Types"
import { icons } from "../icons"

interface propTypes {
    icon: string
    onPress: () => void
    item: any
}

const IconButton = ({ icon, onPress, item }: propTypes) => {
    const _onPress = () => {
        onPress(item.id)
    }

    return (
        <TouchableOpacity onPress={_onPress}>
            <View>
                <Icon source={icon} completed={item.completed} />
            </View>
        </TouchableOpacity>
    )
}

IconButton.defaultProps = {
    item: { completed: false }
}

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
    tint-color: ${({ theme, completed }: { theme: themeType; completed: boolean }) =>
        completed ? theme.done : theme.text};
`

export default IconButton
