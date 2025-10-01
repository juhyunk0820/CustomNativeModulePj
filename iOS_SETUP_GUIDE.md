# iOS 네이티브 모듈 설정 가이드

## Xcode에서 Swift 파일 추가하기

1. **Xcode 열기**

   ```bash
   cd /Users/juhkang/Documents/Github/ReactNative/Cli/CustomNativeModuleTestPj
   open ios/CustomNativeModuleTestPj.xcworkspace
   ```

2. **Swift 파일들을 Xcode 프로젝트에 추가**

   - Xcode에서 `CustomNativeModuleTestPj` 폴더를 우클릭
   - "Add Files to 'CustomNativeModuleTestPj'..." 선택
   - 다음 파일들을 선택하여 추가:
     - `ios/CustomNativeModuleTestPj/GradientBorderTextInput.swift`
     - `ios/CustomNativeModuleTestPj/GradientBorderTextInputManager.swift`
     - `ios/CustomNativeModuleTestPj/GradientBorderTextInputManager.m`

3. **Bridging Header 설정**

   - Swift와 Objective-C를 함께 사용하므로 Bridging Header가 필요할 수 있습니다
   - Xcode가 자동으로 생성을 제안하면 "Create Bridging Header" 선택

4. **빌드 설정 확인**
   - Project Settings → Build Settings → Swift Compiler - General
   - "Install Objective-C Compatibility Header"가 YES로 설정되어 있는지 확인

## 빌드 및 실행

1. **iOS 시뮬레이터에서 실행**

   ```bash
   npx react-native run-ios
   ```

2. **특정 시뮬레이터 지정**
   ```bash
   npx react-native run-ios --simulator="iPhone 15"
   ```

## 문제 해결

### Swift 컴파일 오류가 발생하는 경우

- Clean Build Folder: Xcode → Product → Clean Build Folder
- Derived Data 삭제: Xcode → Preferences → Locations → Derived Data → 화살표 클릭 후 폴더 삭제

### 모듈을 찾을 수 없다는 오류

- Metro 서버 재시작:
  ```bash
  npx react-native start --reset-cache
  ```

### 네이티브 모듈이 인식되지 않는 경우

- iOS 폴더에서 Pod 재설치:
  ```bash
  cd ios && pod install && cd ..
  ```
