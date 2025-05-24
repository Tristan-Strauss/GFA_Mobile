import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Image } from "react-native";

export default function About() {
  
  const GFA_Image = require("@/assets/images/GFA_Cover.png")
  const GFA_ABOUT_PEOPLE_IMAGE = require("@/assets/images/GFA_About_People.jpg")

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>About Us</Text>
        <Image style={styles.image1} source={GFA_Image} />

        <Text style={styles.subheading}>Who We Are</Text>
        <Text style={styles.text}>
            We are a Network of Churches (NOT a denomination), functioning in relationship (NOT by organisational structure). 
            Connected in our hearts (NOT by constitution), focused on building the Church of Jesus Christ;
            building ONLY on the foundation of Jesus Christ, following the teachings of the Apostles.
        </Text>

        <Text style={styles.subheading}>Our Vision</Text>
        <Text style={styles.text}>
            We as a network of Churches in sincere relationship with one another are building the Church of Jesus Christ on the 
            African continent in accordance with the Apostolic foundation.
        </Text>

        <Text style={styles.subheading}>Our Objectives</Text>
        <Text style={styles.text}>
            Network with like minded Churches. Build relationships leading to unity in the Spirit and the Faith. Ensure the Church 
            remains the "ground and pillar" of truth. Clearly present the Apostolic vision. Develop Godly character in Church members.
            Train, develop, equip and send native missionaries. Build Apostolic teams in each nation, region and continent.
        </Text>

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
