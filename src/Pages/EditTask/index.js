import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useReducer, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../Redux/Slice'
import DateTimePicker from '@react-native-community/datetimepicker';


const EditTask = ({ route, navigation }) => {
    const { getListData } = route.params
    const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }),
        { taskName: getListData.taskName, taskDescription: getListData.taskDescription, taskStatus: getListData.taskStatus, taskDate: getListData.taskDate, taskTime: getListData.taskTime, taskMakingTime: getListData.taskMakingTime });
    const [statePicker, setState] = useState({ date: new Date(), mode: '', show: false, pressDate: '', pressTime: '', timestamp: '' });
    const reduxDispatch = useDispatch()
    const HandleSave = () => {
        if (Object.keys(AddTaskObj).some(key => AddTaskObj[key] === '')) {
            alert('Please Fill All Fields')
        } else {
            reduxDispatch(updateTask(AddTaskObj)), navigation.navigate('TaskList')
        }
    }
    const AddTaskObj = {
        id: getListData.id, taskName: state.taskName, taskDescription: state.taskDescription,
        taskDate: state.taskDate, taskTime: state.taskTime, taskStatus: state.taskStatus, taskMakingTime: state.taskMakingTime
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || statePicker.date;
        state.mode == 'date' ? setState({ ...statePicker, show: false, pressDate: currentDate.toDateString() }) + dispatch({ taskDate: currentDate }) : setState({ ...statePicker, show: false, pressTime: currentDate.toLocaleTimeString() }) + dispatch({ taskTime: event?.nativeEvent?.timestamp })
    };
    const TimeSet = new Date(state.taskTime).toLocaleTimeString()
    const converTime = (time) => {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'pm' : 'am';
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return (`${hour}:${min} ${part}`)
    }
    const conertedTime = converTime(TimeSet)
    return (
        <View style={styles.MainContainer}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Edit Task</Text>
                <TouchableOpacity style={styles.SaveBtn} onPress={HandleSave}>
                    <Text style={styles.SaveText}>Save</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.StatusTypeTitle}>Status Type</Text>
            <View style={styles.StatusTypeView}>
                {StatusType.map((item, index) => <TouchableOpacity style={[styles.StatusTypeBtn, { borderColor: state.taskStatus == item ? '#e74c3c' : 'black' }]} key={index} onPress={() => dispatch({ taskStatus: item })}>
                    <Text style={styles.StatusTypeText}>{item}</Text>
                </TouchableOpacity>)}
            </View>
            <Text style={styles.StatusTypeTitle}>Date & Time</Text>
            <View style={styles.DateTime}>
                <TouchableOpacity style={styles.DateBtn} onPress={() => setState({ ...statePicker, mode: 'date', show: true })}>
                    <Text style={styles.DateText}>{statePicker.pressDate ? statePicker.pressDate : new Date(state.taskDate).toDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.DateBtn} onPress={() => setState({ ...statePicker, mode: 'time', show: true })}>
                    <Text style={styles.DateText}>{statePicker.pressTime ? statePicker.pressTime : conertedTime}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.NoteTitleView}>
                <TextInput
                    value={state.taskName}
                    placeholder="Note Title"
                    style={styles.NoteTitle}
                    placeholderTextColor="#000"
                    onChangeText={(text) => dispatch({ taskName: text })}
                />
            </View>
            <View style={styles.TextInputView}>
                <TextInput
                    value={state.taskDescription}
                    placeholder="Task Name"
                    style={styles.TextInput}
                    multiline={true}
                    scrollEnabled={true}
                    onChangeText={(text) => dispatch({ taskDescription: text })}
                />
            </View>
            <Modal visible={statePicker.show} transparent={true}>
                <View style={styles.ModalView}>
                    <DateTimePicker
                        value={statePicker.mode == 'date' ? statePicker.date : new Date()}
                        mode={statePicker.mode}
                        // is24Hour={true}
                        onChange={onChange}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default EditTask

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
