import React, {useMemo} from 'react';
import {View} from 'react-native';
import Colors from '../config/constants/Colors';

const Card = ({
  children,
  shadow,
  bgColor = Colors.WHITE,
  shadowColor = Colors.PRIMARY,
  padding = 16,
}) => {
  const finalShadow = useMemo(() => (shadow ? 4 : 0), [shadow]);

  const finalStyle = useMemo(
    () => ({
      elevation: finalShadow,
      backgroundColor: bgColor,
      shadowColor,
      padding,
      borderRadius: 8,
    }),
    [finalShadow, bgColor, shadowColor, padding],
  );

  return <View style={finalStyle}>{children}</View>;
};

export default Card;
