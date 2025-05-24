import React from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AudioPlayer from '../../components/AudioPlayer';

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
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Biblical Foundation Series</Text>
            <Text style={styles.text}>
                The Foundations of the Christian faith are key to a life lived well before God.
                In Hebrews 6, the writer lays out the foundation stones that need to be laid in the believers life.
                This biblical foundation series explores each of these foundation stones in depth.
                This is the foundation “Jesus Christ”
            </Text>

            <AudioPlayer
                audioSource={apostlesDoctrineAudio}
                title="Teachings of the Apostles"
            />

            <AudioPlayer 
                audioSource={repentanceAndFaithAudio}
                title="Repentance and Faith"
            />

            <AudioPlayer 
                audioSource={baptismIntoChrist}
                title="Baptism into Christ"
            />
            
            <AudioPlayer
                audioSource={baptismIntoWater}
                title="Baptism into Water"
            />

            <AudioPlayer 
                audioSource={baptismIntoHolySpirit}
                title="Baptism into the Holy Spirit"
            />

            <AudioPlayer
                audioSource={baptismIntoSufferings}
                title="Baptism into the sufferings of Christ"
            />

            <AudioPlayer 
                audioSource={layingHands}
                title="Laying on of Hands"
            />

            <AudioPlayer 
                audioSource={resurrection}
                title="Ressurection of the dead"
            />

            <AudioPlayer 
                audioSource={eternalJudgements}
                title="Eternal Judgements"
            />

            <AudioPlayer 
                audioSource={perfection}
                title="Going onto Perfection"
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
