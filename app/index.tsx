import { useState } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

export default function ImagePickerExample() {
  // const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  // if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Permission not granted {permission?.status}</Text>
  //       <StatusBar style="auto" />
  //       <Button title="Request permission" onPress={requestPermission} />
  //     </View>
  //   );
  // }

  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    let cameraResponse = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ["images", "videos"],
      aspect: [4, 3],
      quality: 1,
    });

    console.log(cameraResponse);

    if (!cameraResponse.canceled) {
      setImage(cameraResponse.assets[0].uri);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="take picture" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
