/* ------------------------------- Input types ------------------------------ */
export const ANKETA_FORM_PATH = "/";
export const ANKETA_SEND_FORM_URL = import.meta.env.VITE_ANKETA_FORM_SEND_URL
export const STRING = "STRING";
export const SELECT = "SELECT";
export const DATE = "DATE";
export const NUMBER = "NUMBER";
export const WTABLE = "WTABLE";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const MONTH = "MONTH"
export const TEXTAREA = "TEXTAREA"
export const DEPENDENT_ON_ANOTHER_STRING ="DEPENDENT_ON_ANOTHER_STRING";
export const DEPENDENT_ON_ANOTHER_SELECT = "DEPENDENT_ON_ANOTHER_SELECT"
export const MULTIPLE_SELECT = "MULTIPLE_SELECT"
export const PHONE = "PHONE"
export const WTABLE_CHILDREN_CONECT_MARTIAL_STATUS = "WTABLE_CHILDREN_CONECT_MARTIAL_STATUS"
export const WOMAN_GENDER_CHECK_MULTIPLE_SELECT = "WOMAN_GENDER_CHECK_MULTIPLE_SELECT"
/* ------------------------------- Input types 👆------------------------------ */


/* --------------------------- Anketa check ststus -------------------------- */
export const KORIB_CHIQILMOQDA = "KO'RIB_CHIQILMOQDA"
export const YANGI = "YANGI"


export const checkAnketa = function(status){
  switch (status) {
    case 1:
      return KORIB_CHIQILMOQDA
    case 0:
      return YANGI
    default:
        return KORIB_CHIQILMOQDA;
      }
    }
/* --------------------------- Anketa check ststus 👆-------------------------- */

/* ---------------------------- Lockal save dates --------------------------- */
export const localSaveOptions = {
    married:[{name:"Турмуш қурган", id:"Турмуш_курган"}, {name:"Турмуш қурмаган", id:"Турмуш_курмаган"}, {name:"Ажрашган", id:"Ажрашган"},],
    gender_children: [{name:"ўғил", id: "ўғил" }, { name: "қиз", id: "қиз" }, ],
    switch:[{name:"Ха", id:1}, {name:"Йук", id:2}], 
    gender: [{name:"Эркак", id: 1 }, { name: "Аёл", id: 2 }, ],
    programma:[{ name:"Excel", id:"Excel"}, { name:"Word", id:"Word"}, { name:"PowerPoint", id:"PowerPoint"}, {name:"Adobe Photoshop", id:"Adobe Photoshop"}, {name:"CorelDRAW", id:"CorelDRAW"}, {name:"1C", id:"1C"}],
    degrees: [ { name:"10%", id:"10%"}, { name:"20%", id:"20%"}, { name:"30%", id:"30%"}, { name:"40%", id:"40%"}, { name:"50%", id:"50%"}, { name:"60%", id:"60%"}, { name:"70%", id:"70%"}, { name:"80%", id:"80%"}, { name:"90%", id:"90%"}, { name:"100%", id:"100%"}, ],
    languages: [{name:"Рус", id:"Рус"}, {name:"Тожик", id:"Тожик"}, {name:"Инглиз", id:"Инглиз"}, {name:"Киргиз", id:"Киргиз"}, {name:"Корейс", id:"Корейс"}, {name:"Турк", id:"Турк"}, {name:"Азарбайжон", id:"Азарбайжон"}, {name:"Немис", id:"Немис"}, {name:"Бошка", id:"Бошка"} ],
    found_job :[ {name:"Flayer", id:"Flayer"}, {name:"Banner(ko'cha reklamalari)", id:"Banner(ko'cha reklamalari)"}, {name:"hh.uz", id:"hh.uz"}, {name:"Tanishlar/Do'stlar", id:"Tanishlar/Do'stlar"}, {name:"olx.uz", id:"olx.uz"}, {name:"rabota.uz", id:"rabota.uz"},],
    kinship:[{name:"Отам", id: 1}, {name:"Онам", id: 2}, {name:"Турмуш уртоғим", id: 8}, {name:"Бобом", id:9}, {name:"Бувим", id:10}, {name:"Акам", id: 3}, {name:"Опам", id: 4}, {name:"Укам", id: 5}, {name:"Синглим", id: 6}, { name:"ўғлим", id:11}, { name:"қизим", id:12}, {name:"Қайни отам", id: 13}, {name:"Қайни онам", id: 14}, {name:"Қайни акам", id: 15}, {name:"Қайни опам", id: 16}, {name:"Қайни укам", id: 17}, {name:"Қайни синглим", id: 18}, ],
    pasport_type:[{id:"Оддий", name:"Оддий"},{id:"ID карта", name:"ID карта"} ],
    educational_degree:[{name:"Мактаб", id:"Мактаб"}, {name:"Колледж", id:"Колледж"}, {name:"Техникум", id:"Техникум"}, {name:"Бакалавр", id:"Бакалавр"}, {name:"Магистр", id:"Магистер"}, ],
    education_type: [{name:"Кундузги", id:"Кундузги"}, {name:"Кечки", id:"Кечки"}, {name:"Сиртқи", id:"Сиртқи"}, {name:"Масофавий", id:"Масофавий"},],
    // positions: [ 
    //   { label: "Сотувчи", value:"Сотувчи", id:1 }, 
    //   { label:"Омборчи", value:"Омборчи",id:2, }, 
    //   { label:"Юк ташувчи", value:"Юк ташувчи", id:3}, 
    //   { label:"Оператор", value:"Оператор", id:11}, 
    //   { label:"Шартнома бўлими мутаҳассиси", value:"Шартнома бўлими мутаҳассиси", id:4 }, 
    //   { label:"Ундирувчи", value:"Ундирувчи", id:5 }, 
    //   { label:"Реклама бўлими мутахассиси", value:"Реклама бўлими мутахассиси", id:6}, 
    //   { label:"Мерчандайзер", value:"Мерчандайзер", id:7}, 
    //   { label:"Фаррош", value:"Фаррош", id:8 }, 
    //   { label:"Ошпаз", value:"Ошпаз", id:9 }, 
    //   { label:"Хайдовчи (Лабо)", value:"Хайдовчи (Лабо)", id:10},  
    //   { label: "Мебел устаси", value: "Мебел устаси", id: 13 },
    //   { label: "Сварщик", value: "сварщик", id: 14 },
    // ],
    casr : [ {name:"Damas", id:"Damas"}, {name:"Labo", id:"Labo"}, {name:"Matiz", id:"Matiz"}, {name:"Nexia", id:"Nexia"}, {name:"Nexia 2", id:"Nexia 2"}, {name:"Nexia 3", id:"Nexia 3"}, {name:"Spark", id:"Spark"}, {name:"Lacetti", id:"Lacetti"}, {name:"Gentra", id:"Gentra"}, {name:"Cobalt", id:"Cobalt"}, {name:"Captiva", id:"Captiva"}, {name:"Epica", id:"Epica"}, {name:"Malibu", id:"Malibu"}, {name:"Malibu 2", id:"Malibu 2"}, {name:"Orlando", id:"Orlando"}, {name:"Tracker", id:"Tracker"}, {name:"Tracker 2", id:"Tracker 2"}, {name:"Equinox", id:"Equinox"}, {name:"Onix", id:"Onix"}, {name:"Бошка", id:"Бошка"}, ],
  }
/* ---------------------------- Lockal save dates 👆--------------------------- */
