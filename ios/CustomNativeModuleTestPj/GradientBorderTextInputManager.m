#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(GradientBorderTextInputManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(gradientColors, NSArray)
RCT_EXPORT_VIEW_PROPERTY(borderWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(value, NSString)
RCT_EXPORT_VIEW_PROPERTY(fontSize, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(textColorHex, NSString)

@end
