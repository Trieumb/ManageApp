import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import Colors from '../../config/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, fetchJobs } from '../../redux/thunks/job.thunks';

const JobManager = () => {
  const navigation = useNavigation();
  const jobs = useSelector(state => state.jobs.jobsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
    console.log('job', jobs);
  }, []);

  const onGotoUpdateTask = (item) => {
    navigation.navigate('UpdateTask', { item });
  }
  const handleDeleteJob = (jobId) => {
    Alert.alert('Xóa dữ liệu', 'Bạn có muốn xóa không?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đồng ý', onPress: () => dispatch(deleteJob(jobId)).then(() => {
          dispatch(fetchJobs());
        })
      },
    ],
      { cancelable: false });
  };

  const FlatListItem = ({ item, index }) => {

    const handleUpdateTask = () => {
      onGotoUpdateTask(item);
    };
    return (
      <View style={styles.flatListContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.textTitleItem}>Ngày tạo : </Text>
          <Text style={styles.textDate}>{item.startDate}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.textTitleItem}>Hoàn thành trước ngày : </Text>
          <Text style={styles.textDate}>{item.endDate}</Text>
        </View>
        <View style={styles.receiveContainer}>
          <Text style={styles.textTitleItem}>Người nhận : </Text>
          <Text style={styles.textDate}>{item.receiver}</Text>
        </View>
        <View>
          <Text style={[styles.textTitleItem, styles.textTitleDetail]}>
            Chi tiết công việc :{' '}
          </Text>
          <Text style={styles.textDetail}>{item.content}</Text>
        </View>
        <View style={styles.buttonActiveContainer}>
          <CustomButton style={styles.button} onPress={handleUpdateTask}>
            Sửa
          </CustomButton>
          <CustomButton
            style={styles.button}
            onPress={() => handleDeleteJob(item.id)}>
            Xóa
          </CustomButton>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return <FlatListItem item={item} index={index} />;
          }}></FlatList>
      </View>
    </View>
  );
};
export default JobManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY,
  },
  flatListContainer: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  receiveContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  textTitleItem: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    color: Colors.BACKDROP,
  },
  textTitleDetail: {
    color: Colors.PRIMARY,
  },
  textDate: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    color: Colors.PRIMARY,
  },
  textDetail: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  flatListItem: {},
  headerJob: {},
  buttonActiveContainer: {
    flexDirection: 'row',
    margin: 5,
  },
});
