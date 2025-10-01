import UIKit

@objc(GradientBorderTextInput)
class GradientBorderTextInput: UITextField {
    
    private var gradientLayer: CAGradientLayer?
    private var borderLayer: CAShapeLayer?
    
    @objc var gradientColors: [String] = ["#0000FF", "#FF0000"] {
        didSet {
            updateGradientBorder()
        }
    }
    
    @objc var borderWidth: CGFloat = 4.0 {
        didSet {
            updateGradientBorder()
        }
    }
    
    @objc var cornerRadius: CGFloat = 8.0 {
        didSet {
            updateGradientBorder()
        }
    }
    
    @objc var value: String? {
        get {
            return text
        }
        set {
            text = newValue
        }
    }
    
    @objc var fontSize: CGFloat = 16.0 {
        didSet {
            font = UIFont.systemFont(ofSize: fontSize)
        }
    }
    
    @objc var textColorHex: String? {
        didSet {
            if let colorString = textColorHex, let color = UIColor(hex: colorString) {
                self.textColor = color
            }
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    private func setupView() {
        // 기본 스타일 설정
        backgroundColor = UIColor.clear
        borderStyle = .none
        
        // 패딩 설정
        let paddingView = UIView(frame: CGRect(x: 0, y: 0, width: 12, height: frame.height))
        leftView = paddingView
        leftViewMode = .always
        
        let rightPaddingView = UIView(frame: CGRect(x: 0, y: 0, width: 12, height: frame.height))
        rightView = rightPaddingView
        rightViewMode = .always
        
        updateGradientBorder()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        updateGradientBorder()
    }
    
    private func updateGradientBorder() {
        // 기존 레이어 제거
        gradientLayer?.removeFromSuperlayer()
        borderLayer?.removeFromSuperlayer()
        
        // 그라디언트 레이어 생성
        gradientLayer = CAGradientLayer()
        guard let gradientLayer = gradientLayer else { return }
        
        gradientLayer.frame = bounds
        gradientLayer.colors = gradientColors.compactMap { UIColor(hex: $0)?.cgColor }
        gradientLayer.startPoint = CGPoint(x: 0, y: 0.5)
        gradientLayer.endPoint = CGPoint(x: 1, y: 0.5)
        
        // 마스크 레이어 생성 (테두리만 보이도록)
        let maskLayer = CAShapeLayer()
        let outerPath = UIBezierPath(roundedRect: bounds, cornerRadius: cornerRadius)
        let innerRect = bounds.insetBy(dx: borderWidth, dy: borderWidth)
        let innerPath = UIBezierPath(roundedRect: innerRect, cornerRadius: max(0, cornerRadius - borderWidth))
        
        outerPath.append(innerPath.reversing())
        maskLayer.path = outerPath.cgPath
        maskLayer.fillRule = .evenOdd
        
        gradientLayer.mask = maskLayer
        
        // 레이어를 뷰에 추가
        layer.insertSublayer(gradientLayer, at: 0)
    }
    
    // 텍스트 영역 조정 (패딩 적용)
    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.insetBy(dx: borderWidth + 12, dy: borderWidth + 8)
    }
    
    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.insetBy(dx: borderWidth + 12, dy: borderWidth + 8)
    }
    
    override func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.insetBy(dx: borderWidth + 12, dy: borderWidth + 8)
    }
}

// UIColor 확장 (hex 색상 지원)
extension UIColor {
    convenience init?(hex: String) {
        let r, g, b, a: CGFloat
        
        if hex.hasPrefix("#") {
            let start = hex.index(hex.startIndex, offsetBy: 1)
            let hexColor = String(hex[start...])
            
            if hexColor.count == 6 {
                let scanner = Scanner(string: hexColor)
                var hexNumber: UInt64 = 0
                
                if scanner.scanHexInt64(&hexNumber) {
                    r = CGFloat((hexNumber & 0xff0000) >> 16) / 255
                    g = CGFloat((hexNumber & 0x00ff00) >> 8) / 255
                    b = CGFloat(hexNumber & 0x0000ff) / 255
                    a = 1.0
                    
                    self.init(red: r, green: g, blue: b, alpha: a)
                    return
                }
            }
        }
        
        return nil
    }
}
