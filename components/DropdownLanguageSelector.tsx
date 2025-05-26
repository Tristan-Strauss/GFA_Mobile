// components/DropdownLanguageSelector.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../constants/languages';
import { Ionicons } from '@expo/vector-icons';

const DropdownLanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.selectedLanguage}>{supportedLanguages.find(lang => lang.code === i18n.language)?.name || ''}</Text>
        <Ionicons name={isDropdownOpen ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color="#333" />
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          {supportedLanguages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.dropdownItem}
              onPress={() => changeLanguage(lang.code)}
            >
              <Text style={styles.dropdownItemText}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    margin: 10
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  selectedLanguage: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default DropdownLanguageSelector;