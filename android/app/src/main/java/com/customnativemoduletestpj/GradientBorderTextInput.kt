package com.customnativemoduletestpj

import android.content.Context
import android.graphics.*
import android.graphics.drawable.GradientDrawable
import android.util.AttributeSet
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.content.ContextCompat

class GradientBorderTextInput @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : AppCompatEditText(context, attrs, defStyleAttr) {

    private var gradientColors: IntArray = intArrayOf(Color.BLUE, Color.RED)
    private var borderWidth: Float = 4f
    private var cornerRadius: Float = 8f
    private var gradientDrawable: GradientDrawable? = null

    init {
        setupGradientBorder()
    }

    fun setGradientColors(colors: IntArray) {
        this.gradientColors = colors
        setupGradientBorder()
    }

    fun setBorderWidth(width: Float) {
        this.borderWidth = width
        setupGradientBorder()
    }

    fun setCornerRadius(radius: Float) {
        this.cornerRadius = radius
        setupGradientBorder()
    }

    private fun setupGradientBorder() {
        // 그라디언트 테두리를 위한 GradientDrawable 생성
        gradientDrawable = GradientDrawable().apply {
            shape = GradientDrawable.RECTANGLE
            cornerRadius = this@GradientBorderTextInput.cornerRadius
            
            // 그라디언트 색상 설정
            colors = gradientColors
            orientation = GradientDrawable.Orientation.LEFT_RIGHT
            
            // 테두리 설정 (투명한 내부와 그라디언트 테두리)
            setStroke(borderWidth.toInt(), Color.TRANSPARENT)
        }

        // 배경을 투명하게 설정하고 그라디언트 테두리만 표시
        background = createGradientBorderDrawable()
        
        // 패딩 설정 (테두리 두께만큼)
        setPadding(
            (borderWidth + 12).toInt(),
            (borderWidth + 8).toInt(),
            (borderWidth + 12).toInt(),
            (borderWidth + 8).toInt()
        )
    }

    private fun createGradientBorderDrawable(): GradientDrawable {
        return GradientDrawable().apply {
            shape = GradientDrawable.RECTANGLE
            cornerRadius = this@GradientBorderTextInput.cornerRadius
            colors = gradientColors
            orientation = GradientDrawable.Orientation.LEFT_RIGHT
            
            // 내부는 투명하게, 테두리만 그라디언트로
            setStroke(borderWidth.toInt(), Color.TRANSPARENT)
        }
    }

    override fun onDraw(canvas: Canvas) {
        // 그라디언트 테두리 그리기
        drawGradientBorder(canvas)
        super.onDraw(canvas)
    }

    private fun drawGradientBorder(canvas: Canvas) {
        val paint = Paint().apply {
            isAntiAlias = true
            style = Paint.Style.STROKE
            strokeWidth = borderWidth
        }

        // 그라디언트 셰이더 생성
        val gradient = LinearGradient(
            0f, 0f, width.toFloat(), 0f,
            gradientColors,
            null,
            Shader.TileMode.CLAMP
        )
        paint.shader = gradient

        // 테두리 영역 계산 (stroke width의 절반만큼 안쪽으로)
        val halfStroke = borderWidth / 2
        val rect = RectF(
            halfStroke,
            halfStroke,
            width - halfStroke,
            height - halfStroke
        )

        // 둥근 모서리 사각형 그리기
        canvas.drawRoundRect(rect, cornerRadius, cornerRadius, paint)
    }
}

