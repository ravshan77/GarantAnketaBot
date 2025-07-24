import { ANKETA_FORM_PATH, ANKETA_SEND_FORM_URL, SELECT, STRING, DATE, WTABLE, UPLOAD_IMAGE, DEPENDENT_ON_ANOTHER_STRING, NUMBER, DEPENDENT_ON_ANOTHER_SELECT, MULTIPLE_SELECT, TEXTAREA, PHONE, MONTH, WTABLE_CHILDREN_CONECT_MARTIAL_STATUS, WOMAN_GENDER_CHECK_MULTIPLE_SELECT, } from "../constants";
import { setValues } from "../redux";
import getOptions from "../server/getOptions";
const branches = "branches"
const positions = "positions"
const states = "states"
const region = "region"


export const anketaForma = {
  path: ANKETA_FORM_PATH,
  form: {
    url: ANKETA_SEND_FORM_URL,
    title: "Accountlar",
    gridTemplates: { columns: "repeat(8, 1fr)" },
    sendDeafultValue:{
      trip:null,
      anketa_childrens:[],
      anketa_progs:[],
      anketa_worked_befores:[],
      anketa_languages:[],
      anketa_relations:[],
      education_place:[]
    },
    optionsUrl: {
      [branches]: import.meta.env.VITE_BRANCHES,
      [states]: import.meta.env.VITE_STATES,
      [positions]: "/anketa/positons/for/telegram-bot"
    },
    inputs: [
      {
        name: "first_name",
        label: "Ism",
        required: true,
        type: STRING,
        gridColumn: "1 / 9",
        gridRow: "1 / 2",
        tour: { isTour: "ref4" },
      },
      {
        name: "last_name",
        label: "Familiya",
        required: true,
        type: STRING,
        gridColumn: "1 / 9",
        gridRow: "2 / 3",
      },
      {
        name: "father_name",
        label: "Otasining ismi",
        required: true,
        type: STRING,
        gridColumn: "1 / 9",
        gridRow: "3 / 4",
      },  
      {
        name: "age",
        label: "Tug'ilgan sana",
        required: true,
        type: DATE,
        gridColumn: "1 / 5",
        gridRow: "4 / 5",
      },
      {
        name: "gender",
        label: "Jinsingiz",
        required: true,
        type: SELECT,
        gridColumn: "5 / 9",
        gridRow: "4 / 5",
        options:"gender",
        inFunc: ({values, value, dispatch }) => {  
          if ("2" === value) {
            dispatch(setValues({...values, gender: value, trip:null, anketa_healthys: [
              {question:"Yuragingizdan shikoyatingiz bormi?", status:"", id:"2", description:"", isGender:false, inputId:"anketa_healthys.1.status"},
              {question:"Og'ir jarroxlik amaliyotini o'taganmisiz", status:"", id:"3", description:"", isGender:false, inputId:"anketa_healthys.2.status"},
              {question:"Ko'zingizdan shikoyatingiz bormi?", status:"", id:"4", description:"", isGender:false, inputId:"anketa_healthys.3.status"},
              {question:"Bir joyda turib yoki o'tirib ishlay olasizmi?", status:"", id:"6", description:"", isGender:false, inputId:"anketa_healthys.5.status"},
            ]}))
          }else{
            dispatch(setValues({...values, gender: value, anketa_healthys: [
              {question:"Og'ir narsalar ko'tara olasizmi?", status:"", id:"1", description:"", isGender:true, inputId:"anketa_healthys.0.status"},
              {question:"Yuragingizdan shikoyatingiz bormi?", status:"", id:"2", description:"", isGender:false, inputId:"anketa_healthys.1.status"},
              {question:"Og'ir jarroxlik amaliyotini o'taganmisiz", status:"", id:"3", description:"", isGender:false, inputId:"anketa_healthys.2.status"},
              {question:"Ko'zingizdan shikoyatingiz bormi?", status:"", id:"4", description:"", isGender:false, inputId:"anketa_healthys.3.status"},
              {question:"Bel og'rig'idan shikoyatingiz bormi?", status:"", id:"5", description:"", isGender:true, inputId:"anketa_healthys.4.status"},
              {question:"Bir joyda turib yoki o'tirib ishlay olasizmi?", status:"", id:"6", description:"", isGender:false, inputId:"anketa_healthys.5.status"},
            ]}))
          }
        }
      },
      {
        name: "martial_status",
        label: "Oilaviy xolatingiz",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "5 / 6",
        options:"married",
        inFunc: ({values, value, dispatch }) => {  
          if ("Турмуш_курмаган" === value) {
            dispatch(setValues({...values, martial_status: value, anketa_childrens:[] }))
          }else{
            dispatch(setValues({...values, martial_status:value}))
          }
        }
      },
      {
        name: "anketa_childrens",
        label: "Farzandlari",
        type: WTABLE_CHILDREN_CONECT_MARTIAL_STATUS,
        gridColumn: "1 / 9",
        gridRow: "6 / 9",
        WTable: {
          newRow: { gender: "", date: "" },
          height: "175px",
          tour:{
            isTour: "ref1",
          },
          columns: [
            [
              {
                title: "№",
                sequence: true,
                type: STRING,
                style: { textAlign: "center", width:"27px" },
              },
              {
                title: "Jinsi",
                field: "gender",
                style: { width: "90px", textAlign: "center" },
                type: SELECT,
                options: "gender_children",
                required: true,
              },
              {
                title: "Tug'ilgan sanasi",
                field: "date",
                style: { width: "100%", textAlign: "center" },
                type: MONTH,
                required: true,
              },
              {
                delete: true,
                style:{width:"40px", textAlign: "center"},
                tour: {
                  isTour: "ref2",
                },
              },
            ],
          ],
        },
      },
      {
        name: "anketa_relations",
        label: "Oilaviy tarkibingiz",
        type: WTABLE,
        gridColumn: "1 / 9",
        gridRow: "9 / 13",
        WTable: {
          newRow: { who: "", date: "", job: "" }, 
          height: "300px",
          columns: [
            [
              {
                title: "Kim",
                field: "who",
                style: { width: "140px"},
                type: SELECT,
                options: "kinship",
                required: true,
                rowSpan: 2
              },
              {
                title: "Tug'ilgan sanasi",
                field: "date",
                style: { width: "100%"},
                type: MONTH,
                required: true,
                options:"degrees",
              },
              {
                delete: true,
                style:{width:"40px"},
                rowSpan:2
              },
            ],
            [
              {
                title: "Qayerda ishlaydi",
                field: "job",
                style: { width: "100%", },
                type: STRING,
                required: true
              },
            ]
          ],
        },
      },
      {
        name: "education",
        label: "Ma'lumotingiz",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "13 / 14",
        options:"educational_degree",
      },
      {
        name: "education_place",
        label: "Ta'lim muassasalari nomi va bitirgan yilingiz",
        required: true,
        type: WTABLE,
        gridColumn: "1 / 9",
        gridRow: "14 / 16",
        WTable: {
          newRow: { start_date: "", education_name: "", end_date:"", specialty:"" },
          height: "225px",
          columns: [
            [
              {
                title: "№",
                sequence: true,
                type: STRING,
                style: { textAlign: "center", width:"27px" },
                rowSpan:2,
              },
              {
                title: "O'qishga qabul qilingan yil",
                field: "start_date",
                style: { width: "160px", textAlign: "center" },
                // type: DATE,
                type: MONTH,
                required: true,
              },
              {
                title: "Ta'lim muassasasi nomi",
                field: "education_name",
                style: { minWidth: "300px", textAlign: "start" },
                type: STRING,
                required: true,
              },
              {
                delete: true,
                style:{ width:"35px"},
                rowSpan:2
              },
            ],
            [
              

              {
                title: "O'qishni bitirgan yil",
                field: "end_date",
                style: { width: "160px", textAlign: "center" },
                // type: DATE,
                type: MONTH,
                max: new Date(new Date().setFullYear(new Date().getFullYear() + 5))
              },
              {
                title: "Mutaxassisligingiz",
                field: "specialty",
                style: { minWidth: "300px", textAlign: "start" },
                type: STRING,
                required: true,
              },
            ]
          ],
        },
      },
      {
        name: "height",
        label: "Bo'y va vazningiz(sm/kg)",
        required: true,
        type: STRING,
        placeholder:"Misol uchun: 167sm/60kg",
        gridColumn: "1 / 9",
        gridRow: "16 / 17",
      },
      {
        name: "now_study",
        label: "Siz hozirda qaysidir universitet, litsey yoki kollej talabasimisiz?",
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "17 / 18",
        options:"switch",
        required: true,
        inFunc: ({values, value, dispatch }) => {  
          if("2" === value) {
            dispatch(setValues({...values, now_study: value, type_education:null}))
          } else{
            dispatch(setValues({...values, now_study: value,}))
          }
      }
      },  
      {
        name: "type_education",
        label: "Qanday ta'lim shakli?",
        type: DEPENDENT_ON_ANOTHER_SELECT,
        gridColumn: "1 / 9",
        gridRow: "18 / 19",
        options:"education_type",
        observeValue: { dependent_name:"now_study", dependent_value:"2" },
        tour: { isTour: "ref3" },
        popupInfo:{ infoText: "Agarda hozir talaba bo'lsangiz, qanday ta'lim shakli bo'yicha tahsil olayotganingizni tanlang, aks holda maydonni bo'sh qoldiring." }
        // required: true,
      },
      {
        name: "anketa_languages",
        label: "Qaysi tillarni bilasiz?",
        type: WTABLE,
        gridColumn: "1 / 9",
        gridRow: "19 / 22",
        WTable: {
          newRow: { name: "", level: "" },
          height: "175px",
          columns: [
            [
              {
                title: "Til",
                field: "name",
                style: { width: "100%", textAlign: "center" },
                type: SELECT,
                options: "languages",
                required: true,
              },
              {
                title: "Qay darajada",
                field: "level",
                style: { width: "100%", textAlign: "center" },
                type: SELECT,
                required: true,
                options:"degrees"
              },
              {
                delete: true,
                style:{width:"40px", textAlign: "center"}
              },
            ],
          ],
        },
      },
      {
        name: "state_id",
        label: "Viloyat (Haqiqiy turar joy)",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "22 / 23",
        options: states,
        inFunc: ({values, value, dispatch }) => { 
          getOptions({ optionsUrl: {[region]: import.meta.env.VITE_REGION_URL + value}, dispatch});
          dispatch(setValues({...values, state_id: value})) 
        }
      },  
      {
        name: "region_id",
        label: "Shaxar/Tuman (Haqiqiy turar joy)",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "23 / 24",
        options: region,
      },  
      {
        name: "address",
        label: "Manzilingiz (Haqiqiy turar joy MFY, ko'cha)",
        required: true,
        type: STRING,
        gridColumn: "1 / 9",
        gridRow: "24 / 25",
      }, 
      {
        name: "branch_id",
        label: "Qaysi filialda ishlashni xohlaysiz?",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "25 / 26",
        options: branches,
      },
      {
        name: "position",
        label: "Qaysi lavozimda ishlashni xohlaysiz?",
        required: true,
        type: WOMAN_GENDER_CHECK_MULTIPLE_SELECT,
        gridColumn: "1 / 9",
        gridRow: "26 / 27",
        options: positions,
        popupInfo:{ infoText: "Ushbu maydonda siz qiziqishingiz va xohishingizga qarab bir nechta lavozimlarni tanlashingiz mumkin." }
      },
      {
        name: "worked_company",
        label: "Avval bizning kompaniyamizda ishlaganmisiz?",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "27 / 28",
        options:"switch"
      },
      {
        name: "citizen",
        label: "O'zbekiston Respublikasi fuqarosimisiz?",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "28 / 29",
        options:"switch"
      },
      {
        name: "job_now",
        label: "Hozirda ish bilan ta'minlangamisiz?",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "29 / 30",
        options:"switch"
      },
      {
        name: "relation_company",
        label: "GARANT komponyasida ishlaydigan yaqin qarindoshingiz bormi?",
        placeholder:"Agar bo'lsa, to'liq familiyasi, ismi va lavozimni yozing.",
        required: true,
        type: STRING,
        gridColumn: "1 / 9",
        gridRow: "30 / 31",
      },
      {
        name: "anketa_progs",
        label: "Qaysi dasturlardan foydalana olasiz?",
        type: WTABLE,
        gridColumn: "1 / 9",
        gridRow: "31 / 34",
        WTable: {
          newRow: { name: "", level: "" },
          height: "175px",
          columns: [
            [
              {
                title: "Dastur",
                field: "name",
                style: { width: "100%", textAlign: "center" },
                type: SELECT,
                options: "programma",
                required: true,
              },
              {
                title: "Qay darajada",
                field: "level",
                style: { width: "100%", textAlign: "center" },
                type: SELECT,
                required: true,
                options:"degrees"
              },
              {
                delete: true,
                style:{width:"40px", textAlign: "center"}
              },
            ],
          ],
        },
      },
      {
        name: "anketa_healthys",
        label: "Sog'ligingiz xaqida ma'lumotlar",
        type: WTABLE,
        gridColumn: "1 / 9",
        gridRow: "34 / 38",
        WTable: {
          height: "265px",
          columns: [
            [
              {
                title: "Savollar",
                field: "question",
                style: { width: "100%", textAlign: "center", minWidth:"230px", fontSize:"12px", color:"#000 !important" },
                type: STRING,
                disabled:true,
              },
              {
                title: "Javob",
                field: "status",
                style: { width: "50px", textAlign: "center" },
                type: SELECT,
                options: "switch",
                required: true,
              },
              {
                title: "Izoh",
                field: "description",
                style: { width: "100%", textAlign: "start", minWidth:"250px" },
                type: STRING,
              },
            ],
          ],
        },
      },
      {
        name: "other_info",
        label: "Qo'shimcha malumotlar",
        type: TEXTAREA,
        rows:"2",
        gridColumn: "1 / 9",
        gridRow: "38 / 39",
        placeholder:"Ixtiyoriy"
        // required: true,
      },
      {
        name: "anketa_worked_befores",
        label: "Qayerda qachon va kim bo'lib ishlagansiz?. Sizning rasmiy va norasmiy ish tajribangiz biz uchun muhim.",
        type: WTABLE,
        gridColumn: "1 / 9",
        gridRow: "39 / 43",
        WTable: {
          newRow: { start_date: "", end_date: "", company_name: "", position:"", },
          height: "250px",
          columns: [
            [
              {
                title: "№",
                sequence: true,
                type: STRING,
                style: { textAlign: "center", width:"27px" },
                rowSpan:2,
              },
              {
                title: "Ishga qabul qilingan sana",
                field: "start_date",
                style: { width: "160px", textAlign: "center" },
                // type: DATE,
                type: MONTH,
                required: true,
              },
              {
                title: "Tashkilot nomi",
                field: "company_name",
                style: { width: "100%", minWidth:"250px", textAlign: "center" },
                type: STRING,
                required: true,
              },
              {
                delete: true,
                style:{ width:"40px", textAlign: "center"},
                rowSpan:2
              },
            ],
            [
              {
                title: "Ishdan bo'shagan sana",
                field: "end_date",
                style: { width: "160px", textAlign: "center" },
                // type: DATE,
                type: MONTH,
                // required: true,
              },
              {
                title: "Qanday lavozimda",
                field: "position",
                style: { width: "100%", minWidth:"250px", textAlign: "center" },
                type: STRING,
                required: true,
              },
            ]
          ],
        },
      },
      {
        name: "salary_last_job",
        label: "Oxirgi ish joyida olgan ish xaqingiz (so'm)?",
        type: NUMBER,
        gridColumn: "1 / 9",
        gridRow: "43 / 44",
        // required: true,
      },
      {
        name: "payload",
        label: "Qancha maosh olishni xoxlaysiz(so'm) ?",
        required: true,
        type: NUMBER,
        gridColumn: "1 / 9",
        gridRow: "44 / 45",
      },
      {
        name: "is_car",
        label: "Shaxsiy avtomabilingiz bormi?",
        type: SELECT,
        options:"switch",
        placeholder:"Agar bo'lsa to'liq rusumini yozing!",
        gridColumn: "1 / 9",
        gridRow: "45 / 46",
        required: true,
      },
      {
        name: "about_car",
        label: "Avtomabilingiz rusumi",
        type: DEPENDENT_ON_ANOTHER_SELECT,
        gridColumn: "1 / 9",
        gridRow: "46 / 47",
        options:"casr",
        observeValue: { dependent_name:"is_car", dependent_value: "2" },
      },
      {
        name: "trip",
        label: "Xizmat safariga bora olasizmi(Boshqa viloyat yoki tuman filiallarimizda ishlay olasizmi)?",
        required: true,
        type: DEPENDENT_ON_ANOTHER_SELECT,
        gridColumn: "1 / 9",
        gridRow: "47 / 48",
        options:"switch",
        observeValue: { dependent_name:"gender", dependent_value: "2" }, //? Аёл (check for gender selection)
      },
      {
        name: "about_vacancy",
        label: "Bo'sh ish o'rni haqida qayerdan bildingiz?",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "48 / 49",
        options:"found_job"
      },
      {
        name: "whether_convicted",
        label: "Sudlanganmisiz",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "49 / 50",
        options:"switch",
        inFunc: ({values, value, dispatch }) => {  
            if("2" === value) {
              dispatch(setValues({...values, whether_convicted: value, whether_convicted_description:null}))
            } else{
              dispatch(setValues({...values, whether_convicted: value,}))
            }
        }
      },
      {
        name: "whether_convicted_description",
        label: "Sudlanganligingiz (Qaysi moddalar bo'yicha)",
        type: DEPENDENT_ON_ANOTHER_STRING,
        gridColumn: "1 / 9",
        gridRow: "50 / 51",
        observeValue: { dependent_name:"whether_convicted", dependent_value:"2" },
        popupInfo:{ infoText: "Agar Sudlangan bo‘lsangiz! Qaysi moddalar bo‘yicha va qachon sudlanganligingiz haqida batafsil yozing." }
      },

      {
        name: "eddition_phone_number",
        label: "Qo'shimcha telefon raqam",
        type: PHONE,
        gridColumn: "1 / 9",
        gridRow: "51 / 52",
        // required: true,
      }, 
      {
        name: "image",
        label: `Shaxsiy rasmingiz`,
        note: <span> (xatolik ro'y bersa bizga bog'laning: 99 194 0851)</span>,
        type: UPLOAD_IMAGE,
        labelName:"personal_image",
        gridColumn: "3 / 7",
        gridRow: "52 / 53",
        required: true,
        height: "185px",
        actionUrl: import.meta.env.VITE_STORE_IMAGE,
        deletImage: { url: import.meta.env.VITE_DELETE_IMAGE, deletFileName: import.meta.env.VITE_IMAGE_FILE },
      },
      {
        name: "pasport_type",
        label: "Pasport turi",
        required: true,
        type: SELECT,
        gridColumn: "1 / 9",
        gridRow: "53 / 54",
        options:"pasport_type"
      }, 

      {
        name: "pasport_image_first",
        label: "Pasport rasmi(yoki ID card)",
        labelName:"pas_front_image",
        type: UPLOAD_IMAGE,
        gridColumn: "1 / 5",
        gridRow: "54 / 56",
        required: true,
        height: "185px",
        actionUrl: import.meta.env.VITE_STORE_IMAGE,
        deletImage: { url: import.meta.env.VITE_DELETE_IMAGE, deletFileName: import.meta.env.VITE_IMAGE_FILE },
        popupInfo:{ infoText: `Pasportingiz oddiy bo'lsa, uning asosiy sahifasi rasmini yuklang. Agar ID karta bo'lsa, uning old tomon rasmini yuklang.` },
      },

      {
        name: "pasport_image_second",
        label: "ID card orqa tomon rasmi",
        type: UPLOAD_IMAGE,
        labelName:"pas_back_image",
        gridColumn: "5 / 9",
        gridRow: "54 / 56",
        required: true,
        height: "185px",
        actionUrl: import.meta.env.VITE_STORE_IMAGE,
        observeValue: { dependent_name:"pasport_type", dependent_value:"Оддий" },
        deletImage: { url: import.meta.env.VITE_DELETE_IMAGE, deletFileName: import.meta.env.VITE_IMAGE_FILE },
        popupInfo:{ infoText: `ID kartaning orqa tomon rasmini yuklang.` },
      },
    ],
  },
};

export default anketaForma;