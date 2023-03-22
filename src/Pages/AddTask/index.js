import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../../Redux/Slice'
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTask = ({ navigation }) => {
    const [taskDescription, setTaskDescription] = useState('')
    const [taskName, setTaskName] = useState('')
    const [activeStatus, setActiveStatus] = useState({ item: '', index: null })
    const [datePicker, setDatePicker] = useState(false);
    const [state, setState] = useState({ date: new Date(), mode: '', show: false, pressDate: '', pressTime: '', timestamp: '' });
    const dispatch = useDispatch()
    const HandleSave = () => {
        if (Object.keys(AddTaskObj).some(key => AddTaskObj[key] === '')) {
            alert('Please Fill All Fields')
        } else {
            dispatch(addTask(AddTaskObj))
            navigation.navigate('TaskList')
        }
    }
    const getList = useSelector(state => state.allTaskReducer.AddTask)
    const AddTaskObj = {
        id: getList.length + 1, taskName: taskName, taskDescription: taskDescription, taskDate: state.date, taskTime: state.timestamp, taskStatus: activeStatus.item, taskMakingTime: new Date().getTime()
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || state.date;
        state.mode == 'date' ? setState({ ...state, date: currentDate, show: false, pressDate: currentDate.toDateString() }) : setState({ ...state, show: false, pressTime: currentDate.toLocaleTimeString(), timestamp: event?.nativeEvent?.timestamp })
    };
    return (
        <View style={styles.MainContainer}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Add Task</Text>
                <TouchableOpacity style={styles.SaveBtn} onPress={HandleSave}>
                    <Text style={styles.SaveText}>Save</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.StatusTypeTitle}>Status Type</Text>
            <View style={styles.StatusTypeView}>
                {StatusType.map((item, index) => <TouchableOpacity style={[styles.StatusTypeBtn, { borderColor: activeStatus.index == index ? '#e74c3c' : 'black' }]} key={index} onPress={() => setActiveStatus({ item, index })}>
                    <Text style={styles.StatusTypeText}>{item}</Text>
                </TouchableOpacity>)}
            </View>
            <Text style={styles.StatusTypeTitle}>Date & Time</Text>
            <View style={styles.DateTime}>
                <TouchableOpacity style={styles.DateBtn} onPress={() => setState({ ...state, mode: 'date', show: true }) + setDatePicker(!datePicker)}>
                    <Text style={styles.DateText}>{state.pressDate ? state.pressDate : 'Date'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DateBtn} onPress={() => setState({ ...state, mode: 'time', show: true }) + setDatePicker(!datePicker)}>
                    <Text style={styles.DateText}>{state.pressTime ? state.pressTime : 'Time'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.NoteTitleView}>
                <TextInput
                    placeholder="Note Title"
                    style={styles.NoteTitle}
                    placeholderTextColor="#000"
                    onChangeText={(text) => setTaskName(text)}
                />
            </View>
            <View style={styles.TextInputView}>
                <TextInput
                    placeholder="Task Name"
                    style={styles.TextInput}
                    multiline={true}
                    placeholderTextColor="#000"
                    scrollEnabled={true}
                    onChangeText={(text) => setTaskDescription(text)}
                />
            </View>
            <Modal visible={state.show} transparent={true}>
                <View style={styles.ModalView}>
                    <DateTimePicker
                        value={state.mode == 'date' ? state.date : new Date()}
                        mode={state.mode}
                        // is24Hour={true}
                        onChange={onChange}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default AddTask

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Header: {
        backgroundColor: '#000',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    SaveBtn: {
        position: 'absolute',
        right: 15,
        backgroundColor: '#e74c3c',
        paddingHorizontal: 15,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SaveText: {
        color: '#fff',
        fontSize: 18,
    },
    HeaderText: {
        color: '#fff',
        fontSize: 20,
    },
    NoteTitleView: {
        height: 55,
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
    },
    NoteTitle: {
        height: 50,
        width: width,
        backgroundColor: '#fff',
        fontSize: 20,
        textAlignVertical: 'top',
        color: '#000',
    },
    TextInputView: {
        height: height,
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    TextInput: {
        height: height,
        width: width,
        backgroundColor: '#fff',
        fontSize: 20,
        textAlignVertical: 'top',
        color: '#000',
    },
    StatusTypeTitle: {
        color: '#000',
        fontSize: 18,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    StatusTypeView: {
        height: 50,
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    StatusTypeBtn: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginHorizontal: 10,
        borderWidth: 1
    },
    StatusTypeText: {
        color: '#000',
        fontSize: 18,
    },

    DateTime: {
        height: 50,
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    DateBtn: {
        height: 40,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginHorizontal: 10,
        borderWidth: 1
    },
    DateText: {
        color: '#000',
        fontSize: 18,
    },

    ModalView: {
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const StatusType = ['Pending', 'Completed', 'Today']