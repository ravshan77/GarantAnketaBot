export default function formatPhoneNumber(str){
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '');
  //Check if the input is of correct (\d{4})
  let match = cleaned.match(/\d/g);

  if (match) {
    return ['+(', +998, ') ', match[0] + match[1] , ' ', match[2], match[3], match[4], "-", match[5], match[6], match[7], match[8]].join('')
  }
  
  return "+(998) -- --- -- --";
}