import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {WINDOW_WITH} from '../../config/constants/DimensionsWindown';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import Colors from '../../config/constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJobs} from '../../redux/thunks/job.thunks';

const dataJob = [
  {
    key: '56gdffdgdfg',
    dateStart: '14/02',
    dateEnd: '18/02',
    receive: 'Hải',
    detail: ' Sản xuất thang Trúc Bạch - Hà Nội',
  },
  {
    key: '56gdffdgdfghfhgfhfgg',
    dateStart: '19/02',
    dateEnd: '21/02',
    receive: 'Hải',
    detail:
      'Sản xuất cửa thang Tiền Hải - Thái Bình, kích thước rộng 700 cao 1000. \n Sản xuất khung cabin và sàn thang Cẩm Phả - Quảng Ninh, kich thước cao 900, rộng 600, sâu 600 ',
  },
  {
    key: '56gdffdgdfghooofhgfhfgg',
    dateStart: '18/02',
    dateEnd: '25/02',
    receive: 'Hùng to',
    detail: 'Lắp đặt thang Việt Trì - Phú Thọ',
  },
];

const JobManager = () => {
  const navigation = useNavigation();
  const jobs = useSelector(state => state.jobs.jobsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
    console.log('job', jobs);
  }, []);

  const onGotoUpdteTask = () => {
    navigation.navigate('UpdateTask');
  };
  const deleteTask = () => {
    Alert.alert('Alert', 'Bạn có muốn xóa không?', [
      {
        text: 'Thoát',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const FlatListItem = ({item, index}) => {
    return (
      <View style={styles.flatListContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.textTitleItem}>Ngày tạo : </Text>
          <Text style={styles.textDate}>{item.value.dateStart}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.textTitleItem}>Hoàn thành trước ngày : </Text>
          <Text style={styles.textDate}>{item.value.dateEnd}</Text>
        </View>
        <View style={styles.receiveContainer}>
          <Text style={styles.textTitleItem}>Người nhận : </Text>
          <Text style={styles.textDate}>{item.value.receiver}</Text>
        </View>
        <View>
          <Text style={[styles.textTitleItem, styles.textTitleDetail]}>
            Chi tiết công việc :{' '}
          </Text>
          <Text style={styles.textDetail}>{item.value.content}</Text>
        </View>
        <View style={styles.buttonActiveContainer}>
          <CustomButton style={styles.button} onPress={onGotoUpdteTask}>
            Sửa
          </CustomButton>
          <CustomButton style={styles.button} onPress={deleteTask}>
            Xóa
          </CustomButton>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        {/* <FlatList
          data={jobs}
          keyExtractor={item => item.key}
          renderItem={({item, index}) => {
            return <FlatListItem item={item} index={index} />;
          }}></FlatList> */}
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
