import { Image, message } from 'antd';
import axios from 'axios';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Delete } from '../../assets';
import { BaseUrl } from '../../baseUrl';
import { KORIB_CHIQILMOQDA, tgUser } from '../../constants';
import { uuid } from '../../functions';
import { POST } from '../../server/method';
import "./uploadImage.scss";
import { sendBotError } from '../../functions/sendBotError';


// function convertHeicToPng(heicFile) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0);
//         canvas.toBlob((blob) => {
//           resolve(blob);
//         }, 'image/png');
//       };
//       img.onerror = () => {
//         reject(new Error('Failed to load the image.'));
//       };
//       img.src = event.target.result;
//     };

//     reader.onerror = () => {
//       reject(new Error('Failed to read the file.'));
//     };

//     reader.readAsDataURL(heicFile);
//   });
// }



function HtmlUploader({ name,  setHandleChange, getValues, actionUrl, deletImage, observeValue, setSaveLoading, labelName }){
  const [lockalLoading, setLockalLoading] = useState(false)
  const [progress, setProgress] = useState(0)


  const handleRemove = async () => {
    setSaveLoading(true)
    setLockalLoading(true)
    await POST(deletImage?.url, { file: getValues(name)}).then((res) => {
      if (res.status === 200) {
        message.success("Rasm o'chirildi")
        let target = { [name]: null };
        setHandleChange(target);
        setProgress(0)

        // inputni ham tozalash:
        const fileInput = document.getElementById(labelName);
        if (fileInput) fileInput.value = "";
      } else{
        sendBotError(res, "Rasm o'chirishda xato");
      }
      // console.log(res);
    }).catch(err => {
      sendBotError(err, "Rasm o'chirishda xato");
      if (err.message === "Request failed with status code 500") {
        let target = { [name]: null };
        setHandleChange(target);
        return
      }
      
      message.error("Xatolik! Rasm o'chirilmadi")
    }).finally(() => {
      setSaveLoading(false)
      setLockalLoading(false)
    })
  }


  const handleUpload = async (event) => {
    event.preventDefault()
    const input = event.target;
    // if (event.target.files[0].type === "") {
    //   // heic format
    //   return undefined
    // }
    
    
    try {
      setSaveLoading(true);
      setLockalLoading(true)
      const formData = new FormData();
      formData.append("file", input.files[0]);

      await axios.post(BaseUrl + actionUrl, formData,{
        onUploadProgress: progressEvent => {
          let percentComplete = progressEvent.loaded / progressEvent.total
          percentComplete = parseInt(percentComplete * 100);
          setProgress(percentComplete -1)
        }
      }).then(res => {
        if(res.status === 200){
          setHandleChange({[name] : res.data})
          setProgress(0)
          input.value = ""; // <-- bu yerda input tozalanadi ✅
        }else{
          sendBotError(res, "Rasm yuklashda xatolik");
        }}).catch(err => {
          sendBotError(err, "Rasm yuklashda xatolik");
          message.error("Rasm yuklashda xatolik")
        }).finally(() => {
          setSaveLoading(false)
          setLockalLoading(false)
        });


    // await axios({ method: "post", url: BaseUrl + actionUrl, data: formData, headers: { "Content-Type": "multipart/form-data" }, }).then(res => {
    //       if(res.status === 200){
    //         setHandleChange({[name] : res.data})
    //       }else{
    //         throw new Error("Rasm yuklashda xatolik")
    //       }
    //       }).catch(err => message.error("Rasm yuklashda xatolik")).finally(() => {
    //         setSaveLoading(false)
    //         setLockalLoading(false)
    //       });
    } catch(error) {
      message.log(error)
    }
  }

  
	
  const addIcon = <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 4V7M7 10V7M7 7H4M7 7H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  const { isSendCheck } = useSelector(state => state?.storedDataReducer);
  const chechDisabled = isSendCheck === KORIB_CHIQILMOQDA;

  const handleCheckIdCardMessage = () => {
    if (observeValue ? observeValue : chechDisabled) {
      message.warning("Pasport turi ID card bo'lsa, ID cardning orqa tomon rasmi joylashingiz mumkin", 4)
    }
  }

	return(
   <div className='wrap-up'>
    {chechDisabled ? null : <> 
        <label htmlFor={labelName} className='up-label' style={{display: getValues(name) ? "none" : "flex"}}>{addIcon}</label>
        {[0].includes(progress) ? null : <p style={{width: `${progress}%`, height:"5px", backgroundColor:"green"}} key={uuid()}></p>}
        <button type='button' onClick={handleRemove} className='up-delete' style={{display: getValues(name) ? "flex" : "none", left: getValues(name) ? "10px" : "70px"}}><Delete /></button>
		    <input  
          accept={"image/jpeg, image/png, image/jpg, image/image, image/img, image/raw, image/dng, image/raw, image/heic, image/*"} 
          type="file" 
          className='up-input' 
          name={name} 
          id={labelName} 
          onChange={handleUpload} 
        />
      </>
    }
			{getValues(name) ? (
				<div className='up-div'>
          <Image className='up-image' height={"200px"} width="100%" src={getValues(name)}  />
				</div>
			) : (
        <label onClick={handleCheckIdCardMessage} htmlFor={labelName} className='up-div'>
          <p className='up-title'>{lockalLoading ? `Yuklanmoqda: ${progress}%` : "Yuklash"}</p>
        </label>
			)}
		</div>
	)
}

export default HtmlUploader










// import ImageUploader from 'react-image-upload'
// import 'react-image-upload/dist/index.css'

// const HtmlUploader = () => {

//   function getImageFileObject(imageFile) {
//     const formData = new FormData();
//     formData.append("file", imageFile);
//     formData.append("name", "file");
//     console.log(formData)
//   }

//   function runAfterImageDelete(file) {
//     console.log({ file })
//   }

//   return (
//     <ImageUploader
//       onFileAdded={(img) => getImageFileObject(img)}
//       onFileRemoved={(img) => runAfterImageDelete(img)}
//     />
//   )
// }

// export default HtmlUploader










// import React from 'react';
// import ImagesUploader from 'react-images-uploader';
// // import 'react-images-uploader/styles.css';
// // import 'react-images-uploader/font.css';
 
// export const UpLoadImage = () => {
    
//         return (
//             <ImagesUploader
//                 url="http://localhost:5173/notmultiple"
//                 optimisticPreviews
//                 multiple={false}
//                 onLoadEnd={(err) => {
//                     if (err) {
//                         console.error(err);
//                     }
//                 }}
//                 label="Upload a picture"
//                 />
//         );
//     }
// export default UpLoadImage;


// import React, { Component } from 'react';
// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';
 
// export default class HtmlUploader extends Component {
//     render() {
//         return (
//             <ImagesUploader
//                 url="http://localhost:9090/multiple"
//                 optimisticPreviews
//                 onLoadEnd={(err) => {
//                     if (err) {
//                         console.error(err);
//                     }
//                 }}
//                 label="Upload multiple images"
//                 />
//         );
//     }
// }










// import { useState } from 'react';

// function FileUploadSingle() {
//   const [fileData, setFileData] = useState(null);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (e.target.files) {
//       setFileData(file)
//      await fetch('https://httpbin.org/post', {
//       method: 'POST',
//       body: file,
//       headers: {
//         'content-type': file.type,
//         'content-length': `${file.size}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//     }
//   };


//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />

//       <div>{fileData && `${fileData.name} - ${fileData.type}`}</div>

//       {/* <button type='button' onClick={handleUploadClick}>Upload</button> */}
//     </div>
//   );
// }

// export default FileUploadSingle;