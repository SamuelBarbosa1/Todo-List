import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const index = () => {
  const [completedTasks, setCompletedTask] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get("http://192.168.56.1:3000/todos/count");
      const { totalCompletedTask, totalPendingTodos } = response.data;
      setCompletedTask(totalCompletedTask);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTaskData();
  }, []);
  console.log("comp", completedTasks);
  console.log("pending", pendingTasks);
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: "https://lh3.googleusercontent.com/ogw/ANLem4Zmk7fohWyH7kB6YArqFy0WMfXnFtuX3PX3LSBf=s64-c-mo",
          }}
        />
      </View>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
      Mantenha planos por 15 dias
      </Text>
      <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
      Selecione categorias
      </Text>
      <View></View>

      <View style={{ marginVertical: 12 }}>
        <Text>Visão geral das tarefas</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "#89CFF0",
              padding: 5,
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {completedTasks}
            </Text>
            <Text style={{ marginTop: 4 }}>Tarefas concluídas</Text>
          </View>

          <View
           style={{
            backgroundColor: "#89CFF0",
            padding: 5,
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
            >
              {pendingTasks}
            </Text>
            <Text>Tarefas pendentes</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
//s
