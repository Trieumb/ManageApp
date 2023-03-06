import { Text, View, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import { WINDOW_WITH } from '../../config/constants/DimensionsWindown';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import Colors from '../../config/constants/Colors';

const data = [
  {
    "key": "56gdffdgdfg",
    "dateStart": "14/02",
    "dateEnd": "19/02",
    "receive": "Hải",
    "detail": " Sản xuất thang Trúc Bạch - Hà Nội",
  },
  {
    "key": "56gdffdgdfghfhgfhfgg",
    "dateStart": "18/02",
    "dateEnd": "30/02",
    "receive": "Hải",
    "detail": " Cải thiện chất lượng ứng dụng trong thời gian ngắn hơn với ít nỗ lực hơn. Đơn giản hóa việc kiểm tra , phân loại và khắc phục sự cố. Cẩn thận triển khai các tính năng và giám sát việc áp dụng. Xác định, ưu tiên và khắc phục sớm các vấn đề về độ ổn định và hiệu suất .",
  },
  {
    "key": "56gdffdgdfghooofhgfhfgg",
    "dateStart": "18/02",
    "dateEnd": "30/02",
    "receive": "Hải",
    "detail": " Cải thiện chất lượng ứng dụng trong thời gian ngắn hơn với ít nỗ lực hơn. Đơn giản hóa việc kiểm tra , phân loại và khắc phục sự cố. Cẩn thận triển khai các tính năng và giám sát việc áp dụng. Xác định, ưu tiên và khắc phục sớm các vấn đề về độ ổn định và hiệu suất .",
  }
]

const JobManager = () => {

  const navigation = useNavigation()
  const handleOnpress = () => {
    navigation.navigate('Kho');
  }

  const onGotoAddTask = () => {
    navigation.navigate('addTask');
  }

  const onGotoUpdteTask = () => {
    navigation.navigate('UpdateTask');
  }
  const deleteTask = () => {
    Alert.alert('Alert', 'Bạn có muốn xóa không?', [
      {
        text: 'Thoát',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  const FlatListItem = ({ item, index }) => {
    return (
      <View style={styles.flatListContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.textTitleItem}>Ngày tạo : </Text>
          <Text style={styles.textDate}>{item.dateStart}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.textTitleItem}>Hoàn thành trước ngày : </Text>
          <Text style={styles.textDate}>{item.dateEnd}</Text>
        </View>
        <View style={styles.receiveContainer}>
          <Text style={styles.textTitleItem}>Người nhận : </Text>
          <Text style={styles.textDate}>{item.receive}</Text>
        </View>
        <View>
          <Text style={[styles.textTitleItem, styles.textTitleDetail]}>Chi tiết công việc : </Text>
          <Text style={styles.textDetail}>{item.detail}</Text>
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
    )
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList data={data}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />
          }}>
        </FlatList>
      </View>

      <View style={styles.buttonAddContainer}>
        <Pressable onPress={onGotoAddTask} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

    </View>
  )
}
export default JobManager

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY
  },
  a: {
    flexDirection: "row"
  },
  flatListContainer: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'space-between'
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
    color: Colors.BACKDROP
  },
  textTitleDetail: {
    color: Colors.PRIMARY
  },
  textDate: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    color: Colors.PRIMARY
  },
  textDetail: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  flatListItem: {


  },
  headerJob: {

  },
  buttonActiveContainer: {
    flexDirection: "row",
    margin: 5
  },
  buttonAddContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: 'center',
    margin: 10
  },
  addText: {
    color: Colors.WHITE,
    fontSize: FontSize.H5
  }
})