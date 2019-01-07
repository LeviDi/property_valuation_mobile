import * as React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

 const tabBarIcon = (name, size = 20) => ({ tintColor }) => ( 
    <Icon name={name} size={size} color={tintColor} style={{ backgroundColor: 'transparent' }} />
)

export default tabBarIcon
