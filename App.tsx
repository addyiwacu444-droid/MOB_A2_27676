import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [headline, setHeadline] = useState('Beginner Software Developer');
  const [bio, setBio] = useState('Passionate about learning mobile development and building React Native apps.');
  const [primarySkill, setPrimarySkill] = useState('TypeScript');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadSavedProfile();
  }, []);

  const loadSavedProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem('user_profile');
      if (saved) {
        const data = JSON.parse(saved);
        setHeadline(data.headline);
        setBio(data.bio);
        setPrimarySkill(data.primarySkill);
      }
    } catch (e) {
      console.log('Failed to load profile');
    }
  };

  const handleSaveProfile = async () => {
    if (headline.length < 5) {
      setErrorMsg('Headline must be at least 5 characters long.');
      return;
    }
    if (bio.length < 10) {
      setErrorMsg('Biography must be at least 10 characters long.');
      return;
    }
    if (!primarySkill.trim()) {
      setErrorMsg('Primary skill cannot be empty.');
      return;
    }

    setErrorMsg('');
    const profileData = { headline, bio, primarySkill };
    await AsyncStorage.setItem('user_profile', JSON.stringify(profileData));
    Alert.alert('Success', 'Profile saved successfully locally!');
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Adelphine Portfolio</Text>
      </View>

      {/* Main Content Area based on Tab */}
      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'Home' && (
          <View style={styles.section}>
            <Text style={styles.identityText}>My name is INEZAYE IWACU Adelphine.</Text>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>AI</Text>
            </View>
            <Text style={styles.headlineText}>{headline}</Text>
            <Text style={styles.bioText}>{bio}</Text>
            <Text style={styles.subHeader}>Verification Code: MOB-A2-7676</Text>
          </View>
        )}

        {activeTab === 'Skills' && (
          <View style={styles.section}>
            <Text style={styles.title}>Skills & Education</Text>
            <Text style={styles.itemTitle}>Skills:</Text>
            <Text style={styles.item}>1. React Native & TypeScript</Text>
            <Text style={styles.item}>2. Java Swing & GUI Development</Text>
            <Text style={styles.item}>3. HTML, CSS & Web Design</Text>
            <Text style={styles.item}>4. Database Management (MySQL / XAMPP)</Text>
            <Text style={styles.item}>5. Git & Version Control</Text>
            
            <Text style={[styles.itemTitle, { marginTop: 20 }]}>Education Timeline:</Text>
            <Text style={styles.item}>• INES-Ruhengeri - Bachelor's in Software Engineering (Ongoing)</Text>
          </View>
        )}

        {activeTab === 'Projects' && (
          <View style={styles.section}>
            <Text style={styles.title}>Project Portfolio</Text>
            <View style={styles.card}>
              <Text style={styles.itemTitle}>1. Personal Portfolio App</Text>
              <Text style={styles.item}>Problem: Need an offline-first mobile CV for recruiters.</Text>
              <Text style={styles.item}>Contribution: Developed UI components, navigation, and AsyncStorage persistence.</Text>
              <Text style={styles.item}>Tech: React Native, Expo, TypeScript</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.itemTitle}>2. Java Swing Management System</Text>
              <Text style={styles.item}>Problem: Local business inventory tracking without internet dependency.</Text>
              <Text style={styles.item}>Contribution: Created desktop forms and database connection handlers.</Text>
              <Text style={styles.item}>Tech: Java, Swing, JDBC, MySQL</Text>
            </View>
          </View>
        )}

        {activeTab === 'Editor' && (
          <View style={styles.section}>
            <Text style={styles.title}>Profile Editor</Text>
            <Text style={styles.label}>Professional Headline:</Text>
            <TextInput style={styles.input} value={headline} onChangeText={setHeadline} />

            <Text style={styles.label}>Short Biography:</Text>
            <TextInput style={[styles.input, { height: 70 }]} multiline value={bio} onChangeText={setBio} />

            <Text style={styles.label}>Primary Skill:</Text>
            <TextInput style={styles.input} value={primarySkill} onChangeText={setPrimarySkill} />

            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

            <View style={{ marginTop: 15 }}>
              <Button title="Save Profile Changes" onPress={handleSaveProfile} color="#007AFF" />
            </View>
          </View>
        )}

        {activeTab === 'About' && (
          <View style={styles.section}>
            <Text style={styles.title}>About & Release Info</Text>
            <Text style={styles.item}>App Name: Adelphine Portfolio</Text>
            <Text style={styles.item}>Student Name: INEZAYE IWACU Adelphine</Text>
            <Text style={styles.item}>Registration Number: 25/27676</Text>
            <Text style={styles.item}>Verification Code: MOB-A2-7676</Text>
            <Text style={styles.item}>App Version: 1.0.0</Text>
            <Text style={[styles.item, { color: '#666', marginTop: 10 }]}>Data-use statement: All edits are securely saved locally on device via AsyncStorage for complete offline accessibility.</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Tabs */}
      <View style={styles.tabBar}>
        <Text style={[styles.tabItem, activeTab === 'Home' && styles.activeTab]} onPress={() => setActiveTab('Home')}>Home</Text>
        <Text style={[styles.tabItem, activeTab === 'Skills' && styles.activeTab]} onPress={() => setActiveTab('Skills')}>Skills</Text>
        <Text style={[styles.tabItem, activeTab === 'Projects' && styles.activeTab]} onPress={() => setActiveTab('Projects')}>Projects</Text>
        <Text style={[styles.tabItem, activeTab === 'Editor' && styles.activeTab]} onPress={() => setActiveTab('Editor')}>Edit</Text>
        <Text style={[styles.tabItem, activeTab === 'About' && styles.activeTab]} onPress={() => setActiveTab('About')}>About</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 70, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', paddingTop: 20 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 100 },
  section: { backgroundColor: '#fff', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  identityText: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 15, textAlign: 'center' },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#3b82f6', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headlineText: { fontSize: 15, fontWeight: '600', color: '#475569', textAlign: 'center', marginBottom: 10 },
  bioText: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 15 },
  subHeader: { fontSize: 13, fontWeight: 'bold', color: '#0284c7', textAlign: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1e293b' },
  itemTitle: { fontSize: 15, fontWeight: 'bold', color: '#334155', marginBottom: 5 },
  item: { fontSize: 14, color: '#475569', marginBottom: 8 },
  card: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  label: { fontSize: 13, fontWeight: 'bold', color: '#334155', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', padding: 8, borderRadius: 6, marginTop: 5, backgroundColor: '#fff' },
  error: { color: '#dc2626', fontSize: 12, marginTop: 8 },
  tabBar: { flexDirection: 'row', height: 60, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e2e8f0', position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  activeTab: { color: '#2563eb', fontWeight: 'bold' },
});
