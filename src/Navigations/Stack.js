import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native"
import TaskList from '../Pages/TaskList';
import AddTask from '../Pages/AddTask';
import EditTask from '../Pages/EditTask';

const Stack = createStackNavigator();
const Stack_Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="TaskList" component={TaskList} />
                <Stack.Screen name="AddTask" component={AddTask} />
                <Stack.Screen name="EditTask" component={EditTask} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Stack_Navigation