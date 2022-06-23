import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function App() {
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });
    if (result.cancelled) return;
    let localUri = result.uri;
    let fileName = localUri.split("/").pop();
    if (fileName !== undefined) {
      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : "image";
      let formData = new FormData();
      formData.append("file", {
        // @ts-ignore
        uri: localUri,
        name: "newimage",
        type: "image/jpg",
      });

      axios
        .post(
          "https://1txfn5rjle.execute-api.us-east-2.amazonaws.com/staging/users/upload-image",
          formData,
          {
            headers: {
              Authorization:
                "Bearer ---",
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button onPress={uploadImage} title="UPLOAD" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
