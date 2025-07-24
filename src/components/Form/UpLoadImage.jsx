import React, { useState, memo } from 'react';
import { message, Upload } from 'antd';
import { Image as MyImgae } from "antd"
import { BaseUrl } from '../../baseUrl';
import { POST } from '../../server/method';
import "./uploadImage.scss";
import { Delete, LoadingIcon, UploadImageIcon } from '../../assets';
import { useSelector } from "react-redux"
import { KORIB_CHIQILMOQDA } from '../../constants';
// import ImgCrop from 'antd-img-crop';
// .jpeg, .png, .jpg, .image, .img
const beforeUpload = (file) => {
  const isJpgOrPng =['image/jpeg', 'image/png', 'image/jpg', 'image/image', "image/img", "image/avif", "image/webp"].includes(file.type)  

  if (!isJpgOrPng) message.error('Siz faqat JPG, JPEG, PNG, IMAGE filellarini yuklashingiz kerak!');
  const isLt2M = file.size < 15000000;

  if (!isLt2M) message.error('Rasim hajmi juda katta(MB)!');

  return isJpgOrPng && isLt2M;
};

// lockalda Base, globalda BaseUrl

const UpLoadImage = ({ name,  setHandleChange, getValues, height, actionUrl, deletImage, observeValue, setSaveLoading }) => {
  const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      setSaveLoading(true)
    }else if(info.file.status === 'error'){
      setLoading(false)
      setSaveLoading(false)
      return message.error("Rasm saqlanmadi. Yuklashda xatolik")
    }

    if (info.file.status === 'done') {
      let target = { [name]: info.file.response };
      setHandleChange(target);
      message.success("Rasm yuklandi")
      setLoading(false)
      setSaveLoading(false)
      return
    }
  };

  const uploadRef = React.useRef(null);

  const handleRemove = async () => {
   await POST(deletImage?.url, { file: getValues(name)}).then((res) => {
      if (res.status === 200) {
        message.success("Rasm o'chirildi")
        let target = { [name]: null };
        setHandleChange(target);
      }
    }).catch(err => message.error("Xatolik! Rasm o'chirilmadi")).finally(() => {
      setLoading(false)
      setSaveLoading(false)
    })

  }

  const { isSendCheck } = useSelector(state => state?.storedDataReducer);
  const chechDisabled = isSendCheck === KORIB_CHIQILMOQDA

  const handleCheckIdCardMessage = () => {
    if (observeValue ? observeValue : chechDisabled) {
      message.warning("Pasport turi ID card bo'lsa, ID cardning orqa tomon rasmi joylashingiz mumkin", 4)
    }
  }

  return (
    <>
      { getValues(name) ? (
            <div style={{ width: "100%", height: "100%", }} className="uploadImage-wrap__div">
              <MyImgae src={getValues(name)} className='upload-image__upload' style={{ width: '100%', height: height }} />
              {chechDisabled ? null : <button type="button" className='delete__image' onClick={handleRemove}><Delete /></button>}
            </div>
          ) : 
        // <ImgCrop rotationSlider >
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            style={{ width: "100%", height: "100% !important" }}
            showUploadList={false}
            action={BaseUrl + actionUrl}
            headers={{ "Accept": "application/json ,text/plain" }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            ref={uploadRef}
            disabled={observeValue ? observeValue : chechDisabled }
            accept={".jpeg, .png, .jpg, .image, .img"}
            >
              <div onClick={handleCheckIdCardMessage} style={{ width: "100%", height:  height, display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                <div style={{ width: "100%", height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {loading ? <LoadingIcon /> : <UploadImageIcon />}
                </div>
                <div style={{ width: "100%" }} >
                  {loading ? "Yuklanmoqda" : observeValue ? "Faqat ID card uchun" : "Yuklash"}
                </div>
              </div>

          </Upload>
        // </ImgCrop>
      }
    </>
  );
};

export default memo(UpLoadImage);
