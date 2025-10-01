import React

@objc(GradientBorderTextInputManager)
class GradientBorderTextInputManager: RCTViewManager {
    
    override func view() -> UIView! {
        return GradientBorderTextInput()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

