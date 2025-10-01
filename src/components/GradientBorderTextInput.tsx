import React from 'react';
import {
  requireNativeComponent,
  ViewStyle,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from 'react-native';

export interface GradientBorderTextInputProps
  extends Omit<TextInputProps, 'style'> {
  /**
   * 그라디언트 색상 배열 (hex 형식)
   * @example ['#FF0000', '#00FF00', '#0000FF']
   */
  gradientColors?: string[];

  /**
   * 테두리 두께
   * @default 4
   */
  borderWidth?: number;

  /**
   * 모서리 둥글기
   * @default 8
   */
  cornerRadius?: number;

  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;

  /**
   * 입력 값
   */
  value?: string;

  /**
   * 폰트 크기
   * @default 16
   */
  fontSize?: number;

  /**
   * 텍스트 색상 (hex 형식)
   * @example '#000000'
   */
  textColor?: string;

  /**
   * 텍스트 변경 이벤트
   */
  onChangeText?: (text: string) => void;

  /**
   * 스타일
   */
  style?: ViewStyle;
}

interface NativeGradientBorderTextInputProps
  extends GradientBorderTextInputProps {
  textColorHex?: string;
  onChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const NativeGradientBorderTextInput =
  requireNativeComponent<NativeGradientBorderTextInputProps>(
    'GradientBorderTextInput',
  );

export const GradientBorderTextInput: React.FC<
  GradientBorderTextInputProps
> = ({
  gradientColors = ['#0000FF', '#FF0000'],
  borderWidth = 4,
  cornerRadius = 8,
  fontSize = 16,
  textColor = '#000000',
  onChangeText,
  style,
  ...props
}) => {
  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (onChangeText) {
      onChangeText(event.nativeEvent.text);
    }
  };

  const defaultStyle = {
    height: 50,
    minWidth: 200,
  };

  const combinedStyle = StyleSheet.flatten([defaultStyle, style]);

  return (
    <NativeGradientBorderTextInput
      {...props}
      gradientColors={gradientColors}
      borderWidth={borderWidth}
      cornerRadius={cornerRadius}
      fontSize={fontSize}
      textColorHex={textColor}
      onChange={handleChange}
      style={combinedStyle}
    />
  );
};

export default GradientBorderTextInput;
