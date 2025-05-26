import React from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AudioPlayer from '../../components/AudioPlayer';
import { useTranslation } from "react-i18next";


const apostlesDoctrineAudio = require("../../assets/audio/Apostles-Doctrine-1.mp3");
const repentanceAndFaithAudio = require("../../assets/audio/Repentance-Faith.mp3")
const baptismIntoChrist = require("../../assets/audio/Baptism-Christ.mp3")
const baptismIntoWater = require("../../assets/audio/Baptism-Water.mp3")
const baptismIntoHolySpirit = require("../../assets/audio/Baptism-Holy-Spirit.mp3")
const baptismIntoSufferings = require("../../assets/audio/Baptism-Suffering.mp3")
const layingHands = require("../../assets/audio/Laying-Hands.mp3")
const resurrection = require("../../assets/audio/Resurrection.mp3")
const eternalJudgements = require("../../assets/audio/Eternal-judgements.mp3")
const perfection = require("../../assets/audio/Perfection.mp3")

export default function Principals() {
    const { t } = useTranslation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>{t("screens.principals.title")}</Text>
            <Text style={styles.text}>{t("screens.principals.text.heading")}</Text>

            <AudioPlayer
                audioSource={apostlesDoctrineAudio}
                title={t("screens.principals.text.apostlesDoctrine")}
            />

            <AudioPlayer 
                audioSource={repentanceAndFaithAudio}
                title={t("screens.principals.text.repentanceAndFaith")}
            />

            <AudioPlayer 
                audioSource={baptismIntoChrist}
                title={t("screens.principals.text.baptismIntoChrist")}
            />
            
            <AudioPlayer
                audioSource={baptismIntoWater}
                title={t("screens.principals.text.baptismIntoWater")}
            />

            <AudioPlayer 
                audioSource={baptismIntoHolySpirit}
                title={t("screens.principals.text.baptismIntoHolySpirit")}
            />

            <AudioPlayer
                audioSource={baptismIntoSufferings}
                title={t("screens.principals.text.baptismIntoSufferings")}
            />

            <AudioPlayer 
                audioSource={layingHands}
                title={t("screens.principals.text.layingHands")}
            />

            <AudioPlayer 
                audioSource={resurrection}
                title={t("screens.principals.text.resurrection")}
            />

            <AudioPlayer 
                audioSource={eternalJudgements}
                title={t("screens.principals.text.eternalJudgements")}
            />

            <AudioPlayer 
                audioSource={perfection}
                title={t("screens.principals.text.perfection")}
            />
                
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 50,
    },
    text: {
        fontSize: 16,
        paddingHorizontal: 20,
        paddingTop: 15,
        textAlign: "left",
        lineHeight: 24,
    },
    heading: {
        paddingTop: 20,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
      subheading: {
        paddingTop: 20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
});
