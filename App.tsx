/**
 * Sample React Native App with Gradient Border TextInput
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { GradientBorderTextInput } from './src/components';
import { colors } from './src/constants/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  return (
    <ScrollView
      style={[styles.container, { paddingTop: safeAreaInsets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Gradient Border TextInput 테스트</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRIMARY_GRADIENT (청록 → 연두)</Text>
        <GradientBorderTextInput
          placeholder="PRIMARY_GRADIENT 입력"
          value={text1}
          onChangeText={text => setText1(text)}
          gradientColors={[...colors.PRIMARY_GRADIENT]}
          borderWidth={4}
          cornerRadius={8}
          textColor={colors.UNCHANGED_BLACK}
          style={StyleSheet.flatten([
            styles.input,
            { backgroundColor: colors.UNCHANGED_WHITE },
          ])}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          문서 색상 그라디언트 (단색 → PRIMARY_DOCUMENT_COLOR)
        </Text>
        <GradientBorderTextInput
          placeholder="문서 색상 입력"
          value={text2}
          onChangeText={setText2}
          gradientColors={[
            colors.PRIMARY_DOCUMENT_COLOR,
            colors.PRIMARY_DOCUMENT_COLOR,
          ]}
          borderWidth={2}
          cornerRadius={8}
          fontSize={16}
          textColor={colors.UNCHANGED_BLACK}
          style={StyleSheet.flatten([
            styles.input,
            { backgroundColor: colors.PRIMARY_DOCUMENT_BACKGROUND_COLOR },
          ])}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          질문 색상 그라디언트 (PRIMARY_QUESTION_COLOR)
        </Text>
        <GradientBorderTextInput
          placeholder="질문 색상 입력"
          value={text3}
          onChangeText={setText3}
          gradientColors={[
            colors.PRIMARY_QUESTION_COLOR,
            colors.PRIMARY_QUESTION_COLOR,
          ]}
          borderWidth={2}
          cornerRadius={8}
          fontSize={16}
          textColor={colors.UNCHANGED_BLACK}
          style={StyleSheet.flatten([
            styles.input,
            { backgroundColor: colors.PRIMARY_QUESTION_BACKGROUND_COLOR },
          ])}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>입력된 값들:</Text>
        <Text style={styles.resultText}>PRIMARY_GRADIENT: {text1}</Text>
        <Text style={styles.resultText}>문서 색상: {text2}</Text>
        <Text style={styles.resultText}>질문 색상: {text3}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  input: {
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default App;
