// harness + grades.js (기본 덱 규칙 검사에 등급이 필요함)
const fs=require('fs'),path=require('path');
const J=path.join(__dirname,'../../js');
const {load}=require('../balance/harness');
module.exports=(dir)=>{dir=dir||J;return load(dir, fs.readFileSync(path.join(dir,'grades.js'),'utf8')+';this.gradeOf=gradeOf;');};
