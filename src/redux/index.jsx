export { setValues } from "./valuesReducer";
export { setAllOptionsData, setCheckAnketa } from "./storedDataReducer";

const hh = [
  { label: "Оператор", value: "Оператор", id: 11 },
  { label: "Сотувчи", value: "Сотувчи", id: 1 },
  { label: "Омборчи", value: "Омборчи", id: 2 },
  { label: "Юк ташувчи", value: "Юк ташувчи", id: 3 },
  { label: "Шартнома бўлими мутаҳассиси", value: "Шартнома бўлими мутаҳассиси", id: 4,},
  { label: "Ундирувчи", value: "Ундирувчи", id: 5 },
  { label: "Реклама бўлими мутахассиси", value: "Реклама бўлими мутахассиси", id: 6, },
  { label: "Мерчандайзер", value: "Мерчандайзер", id: 7 },
  { label: "Фаррош", value: "Фаррош", id: 8 },
  { label: "Ошпаз", value: "Ошпаз", id: 9 },
  { label: "Хайдовчи (Лабо)", value: "Хайдовчи (Лабо)", id: 10 },
]

const fgnQ_pos = [
    { label: "Оператор", value: "Оператор", id: 11 },
    { label: "Сотувчи", value: "Сотувчи", id: 1 },
    { label: "Фаррош", value: "Фаррош", id: 8 },
    { label: "Бухгалтерия", value: "Бухгалтерия", id: 12 },
    { label: "Ошпаз", value: "Ошпаз", id: 9 },
  ]

  const othQ_pos = [
    { label: "Сотувчи", value: "Сотувчи", id: 1 },
    { label: "Фаррош", value: "Фаррош", id: 8 },
    { label: "Ошпаз", value: "Ошпаз", id: 9 },
]

// Фарғонага қизлар учун: 
// [
//   { label: "Оператор", value: "Оператор", id: 11 },
//   { label: "Сотувчи", value: "Сотувчи", id: 1 },
//   { label: "Фаррош", value: "Фаррош", id: 8 },
//   { label: "Бухгалтерия", value: "Бухгалтерия", id: 12 },
//   { label: "Ошпаз", value: "Ошпаз", id: 9 },
// ]
// -------------------
// Қолган барча филиалларга:
// [
//   { label: "Сотувчи", value: "Сотувчи", id: 1 },
//   { label: "Фаррош", value: "Фаррош", id: 8 },
//   { label: "Ошпаз", value: "Ошпаз", id: 9 },
// ]