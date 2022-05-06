export const chartFormatPercent = (val) => {
  return val ? val.toFixed(0) + "%" : 0 + "%";
};

export const chartFormatDollar = (val) => {
  return "$" + val.toLocaleString();
};

export const chartNoFormat = (val) => {
  return val ? val.toFixed() : 0;
};

export const chartNoFormat2dec = (val) => {
  return val ? val.toFixed(2) : 0;
};

export const chartFormatratio = (val) => {
  return (val / 100).toFixed(2);
};

export const operatorOptions = [
  {label:'('},
  {label:')'},
  {label:'+'},
  {label:'-'},
  {label:'/'},
  {label:'%'},
  {label:'**'},
  {label:'++'},
  {label:'=='},
  {label:'!='},
  {label:'>'},
  {label:'<'},
  {label:'>='},
  {label:'<='},
  {label:'&&'},
  {label:'||'},
  {label:'!'},
  {label:'abs'},
  {label:'acos'},
  {label:'asin'},
  {label:'atan'},
  {label:'cbrt'},
  {label:'ceil'},
  {label:'cos'},
  {label:'exp'},
  {label:'floor'},
  {label:'log'},
  {label:'max'},
  {label:'min'},
  {label:'pow'},
  {label:'round'},
  {label:'sqrt'},
  {label:'trunc'}
];

export const convertToInternationalCurrencySystem =(labelValue)=> {

	// Nine Zeroes for Billions
	return Math.abs(Number(labelValue)) >= 1.0e+9

	? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
	// Six Zeroes for Millions 
	: Math.abs(Number(labelValue)) >= 1.0e+6

	? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
	// Three Zeroes for Thousands
	: Math.abs(Number(labelValue)) >= 1.0e+3

	? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

	: Math.abs(Number(labelValue)).toLocaleString('en-US');

}