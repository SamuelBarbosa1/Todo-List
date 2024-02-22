import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ModalContent, ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { BottomModal } from "react-native-modals"


const index = () => {
  const todos = [];
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("")
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            juaccounstifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Trabalho</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Pessoal</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9E8",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Tudo</Text>
        </Pressable>
        <Pressable>
          <AntDesign name="pluscircle" size={30} color="#7CB9E8" />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View></View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Sem Tarefas por hoje! adicione uma tarefa
              </Text>
              <Pressable style={{ marginTop: 15 }}>
                <AntDesign name="pluscircle" size={30} color="#7CB9E8" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View>
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Insira uma nova tarefa aqui"
            />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
