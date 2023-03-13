import DatePicker from 'react-native-datepicker';

export default <DatePicker
    style={{ width: 200 }}
    date={this.state.date}
    mode="date"
    placeholder="select date"
    format="YYYY-MM-DD"
    minDate="2016-05-01"
    maxDate="2023-06-01"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
        dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
        },
        dateInput: {
            marginLeft: 36
        }
    }}
    onDateChange={(date) => { this.setState({ date: date }) }}
/>
