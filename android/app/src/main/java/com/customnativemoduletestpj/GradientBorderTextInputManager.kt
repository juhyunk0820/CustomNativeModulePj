package com.customnativemoduletestpj

import android.graphics.Color
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = GradientBorderTextInputManager.REACT_CLASS)
class GradientBorderTextInputManager : SimpleViewManager<GradientBorderTextInput>() {

    companion object {
        const val REACT_CLASS = "GradientBorderTextInput"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): GradientBorderTextInput {
        return GradientBorderTextInput(reactContext)
    }

    @ReactProp(name = "gradientColors")
    fun setGradientColors(view: GradientBorderTextInput, colors: ReadableArray?) {
        colors?.let {
            val colorArray = IntArray(it.size())
            for (i in 0 until it.size()) {
                val colorString = it.getString(i)
                colorArray[i] = Color.parseColor(colorString)
            }
            view.setGradientColors(colorArray)
        }
    }

    @ReactProp(name = "borderWidth", defaultFloat = 4f)
    fun setBorderWidth(view: GradientBorderTextInput, borderWidth: Float) {
        view.setBorderWidth(borderWidth)
    }

    @ReactProp(name = "cornerRadius", defaultFloat = 8f)
    fun setCornerRadius(view: GradientBorderTextInput, cornerRadius: Float) {
        view.setCornerRadius(cornerRadius)
    }

    @ReactProp(name = "placeholder")
    fun setPlaceholder(view: GradientBorderTextInput, placeholder: String?) {
        view.hint = placeholder
    }

    @ReactProp(name = "value")
    fun setValue(view: GradientBorderTextInput, value: String?) {
        view.setText(value)
    }

    @ReactProp(name = "fontSize", defaultFloat = 16f)
    fun setFontSize(view: GradientBorderTextInput, fontSize: Float) {
        view.textSize = fontSize
    }

    @ReactProp(name = "textColor")
    fun setTextColor(view: GradientBorderTextInput, textColor: String?) {
        textColor?.let {
            view.setTextColor(Color.parseColor(it))
        }
    }
}

