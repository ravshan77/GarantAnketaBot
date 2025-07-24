import DatePicker from "react-mobile-datepicker";
import dayjs from "dayjs";


export default function DateInput({value, onChange, name, isOpenDate, setIsOpenDate, col}) {

  if (isOpenDate) {
    document.getElementsByTagName('body')[0].style = 'overflow: hidden';
  }else{
    document.getElementsByTagName('body')[0].style = 'overflow: auto';
  }


  const monthMap = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
};

  const dateConfig = {
    year: {
      format: "YYYY",
      caption: "Yil",
      step: 1
    },
    month: {
      format: value => monthMap[value?.getMonth() + 1],
      caption: "Oy",
      step: 1
    },
    date: {
      caption: "Kun",
      format: "DD",
      step: 1,

    },
  };


  const onSelect = (e) => {
    onChange({[name]: dayjs(e).format("YYYY-MM-DD")})
    setIsOpenDate(false);
  }

  const onCancel = () => setIsOpenDate(false);


  return (
    <>
      <DatePicker
        value={ value ? new Date(value) : undefined}
        isOpen={isOpenDate}
        showCaption={true}
        onCancel={onCancel}
        onSelect={onSelect}
        theme="android-dark"
        max={col?.max ? col?.max : new Date()}
        min={new Date(1940, 0, 1)}
        headerFormat={"YYYY-MM-DD"}
        dateConfig={dateConfig}
        cancelText={"Bekor qilish"}
        confirmText={"Tanlash"}
        showFooter={true}
        />   
    </>
  );
}
