import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  const addTask = async () => {
    if (task.length > 0) {
      const newTasks = [...tasks, { text: task, done: false }];
      setTasks(newTasks);
      setTask('');
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks)); 
    }
  };

  const toggleTask = async (index) => {
    const newTasks = tasks.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks)); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Save" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleTask(index)}>
            <Text style={[styles.task, item.done && styles.taskDone]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  task: {
    fontSize: 18
  },
  taskDone: {
    textDecorationLine: 'line-through'
  },
});

export default TodoScreen;
