import { LanguageDropdown } from "@/components/LanguageDropdown";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { shareAsync } from "expo-sharing";
import { Button, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Resources() {
  
  const COTR_image = require("@/assets/images/COTR_Cover.png");

  let language = "eng";

  const downloadFromUrl = async () => {
    const filename = "COTR_" + language + ".docx";
    console.log("Trying to download from ", getDownloadUrlForLanguage(language))
    const result = await FileSystem.downloadAsync(
      getDownloadUrlForLanguage(language),
      FileSystem.documentDirectory + filename
    );
    console.log(result);
    save(result.uri, filename, result.headers["content-type"]);
  }  

  const save = async (uri: any, filename: any, mimetype: any) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(uri=permissions.directoryUri, filename=filename, mimetype=mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const onValueChange = (value: string) => {
    if (value === null) {
      console.log("No language selected. Defaulting to English.");
      language = "eng"
    }
    else {
      console.log("Language selected: ", value);
      language = value;
    }
  }

  const getDownloadUrlForLanguage = (language: string) => {
    let baseUrl = "https://gospelfor.africa/wp-content/uploads"
    switch (language) {
      case "eng":
        return baseUrl + "/2025/01/Church-on-the-Rock-English.docx"
      case "fre":
        return  baseUrl + "/2025/01/Church-on-the-Rock-French.docx";
      case "swa":
        return  baseUrl + "/2025/01/Church-on-the-Rock-Swahili-1.docx";
      case "por":
        return  baseUrl + "/2025/01/Church-on-the-Rock-Portuguese-2.docx";
      case "ara":
        return  baseUrl + "/2025/02/Church-on-the-Rock-Arabic.docx";
      case "che":
        return  baseUrl + "/2025/03/Church-on-the-Rock-Chichewa.docx";
      case "zul":
        return  baseUrl + "/2024/10/Church-on-the-Rock-Zulu.docx";
      default:
        console.log("No language selected. Defaulting to English.");
        return baseUrl + "/2025/01/Church-on-the-Rock-English.docx";
    }
  }

  return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Resources</Text>
          <View style={styles.section}>
            <Text style={styles.text}>Church on the Rock</Text>
            <Image source={ COTR_image } style={styles.image}/>
            <View>
              <Text style={styles.subtext} >Choose your language</Text>
              <LanguageDropdown onValueChange={(value) => {onValueChange(value)}}/>
              <Button title="Download" onPress={downloadFromUrl}/>
            </View>
          </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    paddingTop: 20,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: "center"
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
  button: {
    padding: 10,
  },
  section: {
    paddingTop: 40,
  }
})