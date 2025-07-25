import Schema from 'validate'

export function anketaValidate(values) {

  const userAnketa = new Schema({
    first_name:{ type: String, required: true, message: "Ismingizni kiriting"},
    last_name:{ type: String, required: true, message: "Familiyangizni kiriting"},
    father_name:{ type: String, required: true, message: "Otangizning ismini kiriting"},
    age:{ type: String, required: true, message: "Yoshingizni kiriting"},
    gender:{ type: String, required: true, message: "Jinsingizni kiriting"},
    martial_status:{ type: String, required: true, message: "Oilaviy holatingizni kiriting" },
    anketa_childrens: [{
      gender: { type: String, required: true, message:"Jinsini kiriting" },
      date: { type: String, required: true, message:"Yoshini kiriting" },
      uuid: { type: String, required: false },
      id:{ type: Number, required: false },
      anketa_id: { type: Number, required: false},
      created_at: { type: String, required: false},
      updated_at: { type: String, required: false },
    }],
    anketa_relations:[{ 
      who:{ type: String, required: true, message:"Ma'lumotni kiriting"}, 
      date:{ type: String, required: true, message:"Ma'lumotni kiriting"}, 
      job:{ type: String, required: true, message:"Ma'lumotni kiriting"},
      uuid: {type: String, required: false },
      id:{ type: Number, required: false },
      anketa_id: { type: Number, required: false},
      created_at: { type: String, required: false},
      updated_at: { type: String, required: false },
    }],
    education:{ type: String, required: true, message: "Ma'lumotingiz"},
    education_place:[{ 
      start_date:{type: String, required: true, message:"Ma'lumotni kiriting"}, 
      education_name:{type: String, required: true, message:"Ma'lumotni kiriting"}, 
      end_date:{type: String, required: true, message:"Ma'lumotni kiriting"}, 
      specialty:{type: String, required: true, message:"Ma'lumotni kiriting"},
      uuid: {type: String, required: false },
      id:{ type: Number, required: false },
      anketa_id: { type: Number, required: false},
      created_at: { type: String, required: false},
      updated_at: { type: String, required: false },
    }],
    height:{ type: String, required:true, message:"Bo'y va vazningizni kiriting! (sm/kg)"},
    now_study:{ type: String, required: true, message: "Siz hozirda talabasimisiz?"},
    type_education:{ type: String, required: values.now_study === "2" ? false : true, message: "Qanday ta'lim shaklida tahsil olasiz?"},
    anketa_languages:[{
      name:{type: String, required: true, message:"Qaysi tilni bilasiz?" },
      level:{type: String, required: true, message:"Qay darajada?" },
      uuid: {type: String, required: false },
      id:{ type: Number, required: false },
      anketa_id: { type: Number, required: false},
      created_at: { type: String, required: false},
      updated_at: { type: String, required: false },
    }],
    state_id:{ type: String, required: true, message: "Viloyatni kiriting"},
    region_id:{ type: String, required: true, message: "Shahar/Tumanni kiriting"},
    address:{ type: String, required: true, message: "Manzilni kiriting"},
    branch_id:{ type: String, required: true, message: "Filialani kiriting"},
    // position:{type: Object, required: values?.position?.length > 0 ? false : true, message:"Lavozimni tanlang", },
    // position:[{
    //   value:{ type: String, required: true, message:"Ma'lumotni kiriting",},
    //   label:{ type: String, required: true, message:"Ma'lumotni kiriting",}, 
    //   id:{ required: false,}
    // }],
    worked_company: { type: String, required: true, message: "Ma'lumotni kiriting"},
    citizen:{ type: String, required: true, message: "Ma'lumotni kiriting"},
    job_now:{ type: String, required: true, message: "Ma'lumotni kiriting"},
    relation_company:{ type: String, required: true, message: "Ma'lumotni kiriting"},
    anketa_progs:[{
      name: {type: String, required: true, message:"Ma'lumotni kiriting" },
      level:{type: String, required: true, message:"Ma'lumotni kiriting" },
      uuid: {type: String, required: false },
      id:{ type: Number, required: false },
      anketa_id: { type: Number, required: false},
      created_at: { type: String, required: false},
      updated_at: { type: String, required: false },
    }],
    anketa_healthys:[{
      question: { required: false},
      status:{ required: true, message: "Ma'lumotni kiriting"},
      description:{ required:false},
      isGender: { required:false },
      inputId:{ required:false},
      id:{ required:false },
      anketa_id: { required: false},
      created_at: { required: false},
      updated_at: { required: false },
    }],
    other_info:{type:String, required:false, message:"Ma'lumotni kiriting"},
    anketa_worked_befores:[{
      start_date: {type: String, required: true, message:"Ma'lumotni kiriting" }, 
      company_name: {type: String, required: true, message:"Ma'lumotni kiriting" },
      end_date: {type: String, required: true, message:"Ma'lumotni kiriting" }, 
      position: {type: String, required: true, message:"Ma'lumotni kiriting" },
      uuid: {type: String, required: false },
      id:{ type: Number, required: false },
      anketa_id: { type: Number, required: false},
      created_at: { type: String, required: false},
      updated_at: { type: String, required: false },
    }],
    salary_last_job:{type:String, required:false},
    payload:{type:String, required:true, message:"Ma'lumotni kiriting" },
    is_car:{ type: String, required: true, message: "Ma'lumotni kiriting"},
    about_car:{ type: String, required: values?.is_car === "2" ? false : true, message: "Ma'lumotni kiriting"},
    trip:{ type: String, required: values?.gender === "2" ? false : true, message: "Ma'lumotni kiriting"},
    about_vacancy:{ type: String, required: true, message: "Ma'lumotni kiriting"},
    whether_convicted:{ type: String, required: true, message: "Ma'lumotni kiriting"},
    whether_convicted_description:{ type: String, required: values?.whether_convicted === "2" ? false : true, message: "Ma'lumotni kiriting"},
    eddition_phone_number:{type: String, required: false,},
    image: { type: String, required: true, message: "Shaxsiy rasm kiritilmagan" },
    pasport_type:{ type: String, required: true, message: "Pasport turini kiriting" },
    pasport_image_first: { type: String, required: true, message: "Pasport(ID-karta) rasmi kiritilmagan" },
    pasport_image_second: { type: String, required: values?.pasport_type === "ID карта" ? true : false, message: "ID-kartaning orqa tomon rasmi kiritilmagan", },
  });

  return userAnketa
}
