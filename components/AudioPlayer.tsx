import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { Asset } from "expo-asset";
import { Audio } from 'expo-av';
import * as FileSystem from "expo-file-system";
import { shareAsync } from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AudioPlayerProps {
    audioSource: any;
    title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSource, title }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [positionMillis, setPositionMillis] = useState<number>(0);
    const [durationMillis, setDurationMillis] = useState<number>(1);
    const [isAudioLoading, setIsAudioLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>(''); // State for custom message box

    const saveAudioToStorage = async () => {
        try {
            const asset = Asset.fromModule(audioSource);
            await asset.downloadAsync(); 

            // Use asset.localUri which should now contain the local file path.
            if (!asset.localUri) {
                console.error("Asset localUri is null after downloadAsync:", asset);
                return;
            }

            const sourceLocalUri = asset.localUri;
            const fileName = title + ".mp3";

            if (Platform.OS === "android") {
                try {
                    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
                    if (permissions.granted && permissions.directoryUri) {
                        console.log("DEBUG: Directory URI granted:", permissions.directoryUri);
                        console.log("DEBUG: File Name to create:", fileName);

                        const destinationUri = await FileSystem.StorageAccessFramework.createFileAsync(
                            permissions.directoryUri,
                            fileName,
                            "audio/mpeg"
                        );
                        console.log("DEBUG: Successfully created file URI:", destinationUri);

                        const audioContent = await FileSystem.readAsStringAsync(sourceLocalUri, {
                            encoding: FileSystem.EncodingType.Base64, // Use Base64 for binary data
                        });

                        await FileSystem.writeAsStringAsync(destinationUri, audioContent, {
                            encoding: FileSystem.EncodingType.Base64, // Ensure encoding matches
                        });

                    } else {
                        await shareAsync(sourceLocalUri);
                    }
                } catch (createFileError: any) { // Add type annotation for error
                    console.error("Error during direct file saving (createFileAsync/writeAsStringAsync), falling back to shareAsync:", createFileError);
                    if (createFileError.message && createFileError.message.includes("Call to function")) {
                        await shareAsync(sourceLocalUri);
                    }
                }
            } else {
                await shareAsync(sourceLocalUri);
            }
        } catch (error) {
            console.error("General error saving MP3 to local storage:", error);
        }
    };

    useEffect(() => {
        let currentSound: Audio.Sound | null = null;

        async function loadSound() {
            setIsAudioLoading(true);
            try {
                if (currentSound) {
                    await currentSound.unloadAsync();
                }

                const { sound: newSound } = await Audio.Sound.createAsync(audioSource);
                setSound(newSound);
                currentSound = newSound;

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded) {
                        setIsAudioLoading(false);
                        setPositionMillis(status.positionMillis);
                        setDurationMillis(status.durationMillis || 1);

                        if (status.didJustFinish) {
                            console.log("Audio finished playing. Resetting to start.");
                            setIsPlaying(false);
                            setPositionMillis(0);
                        }
                    } else {
                        setIsAudioLoading(true);
                        if (status.error) {
                            console.error("Playback status error:", status.error);
                            setIsAudioLoading(false);
                        }
                    }
                });
            } catch (error) {
                console.error("Error loading sound:", error);
                setIsAudioLoading(false);
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
            await sound.setPositionAsync(value);
            setPositionMillis(value);
        } catch (error) {
            console.log("Error seeking audio: ", error);
        }
    };

    const disabledColor = "#A9A9A9";
    const enabledColor = "#1DA1F2";

    return (
        <View style={styles.audioPlayerContainer}>
            <View style={styles.titleAndDownload}>
                <Text style={styles.audioTitle}>{title}</Text>
                {!isAudioLoading && (
                    <TouchableOpacity onPress={saveAudioToStorage}>
                        <Ionicons 
                            name={"download-outline"}
                            size={30} // Adjusted size for better fit next to title
                            color={enabledColor}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.controlsAndProgress}>
                <TouchableOpacity onPress={togglePlayPause} disabled={isAudioLoading}>
                    <Ionicons
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
    titleAndDownload: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    audioTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#555',
        flexShrink: 1,
        marginRight: 10,
    },
    controlsAndProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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
    messageBox: {
        marginTop: 10,
        padding: 8,
        backgroundColor: '#e0f7fa',
        borderRadius: 5,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 14,
        color: '#00796b',
    }
});

export default AudioPlayer;