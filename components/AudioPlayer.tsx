import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AudioPlayerProps {
    audioSource: any;
    title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSource, title }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [positionMillis, setPositionMillis] = useState<number>(0);
    const [durationMillis, setDurationMillis] = useState<number>(1);
    const [isAudioLoading, setIsAudioLoading] = useState<boolean>(true)

    useEffect(() => {
        let currentSound: Audio.Sound | null = null

        async function loadSound() {
            setIsAudioLoading(true)
            try {
                if (currentSound) {
                    await currentSound.unloadAsync();
                }
                
                const { sound: newSound} = await Audio.Sound.createAsync(audioSource);
                setSound(newSound);
                currentSound = newSound

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded) {
                        setIsAudioLoading(false)
                        setPositionMillis(status.positionMillis);
                        setDurationMillis(status.durationMillis || 1);

                        if (status.didJustFinish) {
                            console.log("Audio finished playing. Resetting to start.");
                            setIsPlaying(false);
                            setPositionMillis(0);
                        }
                    } else {
                        setIsAudioLoading(true)
                        if (status.error) {
                            console.error("Playback status error:", status.error);
                            setIsAudioLoading(false)
                        }
                    }
                });
            } catch (error) {
                console.error("Error loading sound:", error);
                setIsAudioLoading(false)
            }
        }

        loadSound();

        return () => {
            if (sound) {
                console.log("Unloading sound and removing listener for:", title);
                sound.unloadAsync();
            }
        };
    }, [audioSource]);

    const togglePlayPause = async () => {
        if (isAudioLoading || !sound) {
            console.log("Sound not loaded yet.");
            return;
        }

        try {
            if (isPlaying) {
                console.log("Pausing sound:", title);
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                console.log("Playing sound:", title);
                const status = await sound.getStatusAsync();
                if (status.isLoaded && status.positionMillis === status.durationMillis) {
                    await sound.replayAsync();
                } else {
                    await sound.playAsync();
                }
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Error during play/pause:", error);
        }
    };

    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const onSliderValueChange = async (value: number) => {
        if (isAudioLoading || !sound) {
            return;
        }
        try {
            await sound.setPositionAsync(value)
            setPositionMillis(value)
        } catch (error) {
            console.log("Error seeking audio: ", error)
        }
    };

    const disabledColor = "#A9A9A9"
    const enabledColor = "#1DA1F2"

    return (
        <View style={styles.audioPlayerContainer}>
            <Text style={styles.audioTitle}>{title}</Text>
            <View style={styles.controlsAndProgress}>
                <TouchableOpacity onPress={togglePlayPause} disabled={isAudioLoading}>
                    <Ionicons
                        style={styles.icon}
                        disabled={!sound}
                        name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
                        size={40}
                        color={isAudioLoading ? disabledColor : enabledColor}
                    />
                </TouchableOpacity>
                <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
                <Slider
                    style={styles.progressBar}
                    minimumValue={0}
                    maximumValue={durationMillis}
                    value={positionMillis}
                    onSlidingComplete={onSliderValueChange}
                    minimumTrackTintColor={isAudioLoading ? disabledColor : enabledColor}
                    maximumTrackTintColor="#D3D3D3"
                    thumbTintColor={isAudioLoading ? disabledColor : enabledColor}
                    disabled={!sound}
                />
                <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
            </View>
            {isAudioLoading && (
                <Text style={styles.loadingText}>Loading audio...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    audioPlayerContainer: {
        width: '90%',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    audioTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#555',
    },
    controlsAndProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    icon: {
        marginRight: 5,
    },
    progressBar: {
        flex: 1,
        marginHorizontal: 10,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
        width: 45,
        textAlign: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

export default AudioPlayer;
