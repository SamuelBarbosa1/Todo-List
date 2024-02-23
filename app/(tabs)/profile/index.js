import { StyleSheet, Text, View } from 'react-native'
import React, { useState }  from 'react'


const index = () => {
  const [completedTasks,setCompletedTask] = useState(0)
  const [pendingTask,setPendingTasks] = useState(0)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})