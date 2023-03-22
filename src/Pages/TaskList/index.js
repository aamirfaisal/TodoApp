import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTask } from '../../Redux/Slice'

const TaskList = ({ navigation }) => {
    const [statusFilter, setStatusFilter] = useState({ item: 'All', index: 0 })
    const getList = useSelector(state => state.allTaskReducer.AddTask)
    const [filterArray, setFilterArray] = useState([])
    const dispatch = useDispatch()
    const HandleEdit = (item) => { navigation.navigate('EditTask', { getListData: item }) }
    const HandleDelete = (item) => { dispatch(removeTask(item)) }
    useEffect(() => { FilterArray() }, [statusFilter])
    const FilterArray = () => {
        if (statusFilter.item === 'Pending') {
            const FilterArray = getList.filter((v, i) => v.taskStatus === 'Pending')
            setFilterArray(FilterArray)
        } else if (statusFilter.item === 'Completed') {
            const FilterArray = getList.filter((v, i) => v.taskStatus === 'Completed')
            setFilterArray(FilterArray)
        } else {
            setFilterArray(getList)
        }
    }
    return (
        <View style={styles.MainConatiner}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Task List</Text>
            </View>
            <View style={styles.FilterView}>
                <Text style={styles.StatusTypeTitle}>Filter Status</Text>
                <View style={styles.Filter_ViewBtn}>
                    {StatusFilter.map((v, i) => <TouchableOpacity key={i} style={[styles.filterTypeBtn, { borderColor: statusFilter.index == i ? 'orange' : 'black' }]} onPress={() => setStatusFilter({ item: v, index: i })}>
                        <Text style={styles.filterTypeBtnText}>{v}</Text></TouchableOpacity>)}
                </View>
            </View>
            <View style={styles.TodoListView}>
                <FlatList data={filterArray} renderItem={({ item, index }) => <ShowTodoList item={item} onPress={() => HandleEdit(item)} HandleDelete={() => HandleDelete(item)} />} />
            </View>
            <TouchableOpacity style={styles.AddBtn} onPress={() => navigation.navigate('AddTask')}>
                <Text style={styles.AddBtnText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TaskList

const ShowTodoList = ({ item, onPress, HandleDelete }) => {
    const TimeSet = new Date(item?.taskTime).toLocaleTimeString()
    const converTime = (time) => {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'pm' : 'am';
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return (`${hour}:${min} ${part}`)
    }
    const conertedDate = new Date(item?.taskDate).toDateString()
    const conertedTime = converTime(TimeSet)
    return (
        <TouchableOpacity style={styles.ShowTodoList} onPress={onPress}>
            <View style={styles.ListHeader}>
                <Text style={styles.ListHeaderText}>{item?.taskName}</Text>
                <Text style={styles.ListHeaderText}>{item?.taskStatus}</Text>
            </View>
            <Text style={styles.TodoListDescription}>{item?.taskDescription}</Text>
            <View style={styles.Footer}>
                <Text style={styles.FooterText}>{conertedDate}</Text>
                <Text style={styles.FooterText}>{conertedTime}</Text>
            </View>
            <TouchableOpacity style={styles.DeleteBtn} onPress={HandleDelete}>
                <Text style={styles.DeleteBtnText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    MainConatiner: {
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
    HeaderText: {
        color: '#fff',
        fontSize: 20,
    },

    ShowTodoList: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 2,
        elevation: 2,
    },
    ListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ListHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    TodoListDescription: {
        fontSize: 16,
        marginTop: 10,
        color: '#000',
    },
    Footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    FooterText: {
        fontSize: 16,
        color: '#000',
    },

    AddBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#000',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddBtnText: {
        color: '#fff',
        fontSize: 30,
    },
    DeleteBtn: {
        position: 'absolute',
        top: '45%',
        right: 20,
        backgroundColor: '#000',
        width: 50,
        height: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    DeleteBtnText: {
        color: '#fff',
        fontSize: 16,
    },
    StatusTypeTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    Filter_ViewBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    filterTypeBtn: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginHorizontal: 10,
        borderWidth: 1
    },
    filterTypeBtnText: {
        color: '#000',
        fontSize: 18,
    },

})

const StatusFilter = ['All', 'Pending', 'Completed']