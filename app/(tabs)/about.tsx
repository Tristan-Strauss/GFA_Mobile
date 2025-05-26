import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation()

  const GFA_Image = require("@/assets/images/GFA_Cover.png")
  const GFA_ABOUT_PEOPLE_IMAGE = require("@/assets/images/GFA_About_People.jpg")

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{t("screens.about.text.mainHeading")}</Text>
        <Image style={styles.image1} source={GFA_Image} />

        <Text style={styles.subheading}>{t("screens.about.text.subHeading1")}</Text>
        <Text style={styles.text}>{t("screens.about.text.description1")}</Text>

        <Text style={styles.subheading}>{t("screens.about.text.subHeading2")}</Text>
        <Text style={styles.text}>{t("screens.about.text.description2")}</Text>

        <Text style={styles.subheading}>{t("screens.about.text.subHeading3")}</Text>
        <Text style={styles.text}>{t("screens.about.text.description3")}</Text>

        <Image style={styles.image2} source={GFA_ABOUT_PEOPLE_IMAGE}/>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  heading: {
    paddingTop: 20,
    fontSize: 40,
    fontWeight: "bold",
  },
  subheading: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  image1: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  image2: {
    height: 350,
    width: 300,
    resizeMode: "contain",
  },
});
