const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=require('path').join(__dirname,'../../js');
const ctx={console:{log(){},error(){},warn(){}},Math,JSON,Object,Array,Set,Map,parseInt,parseFloat,isNaN};ctx.window=ctx;ctx.document={querySelector(){return null},querySelectorAll(){return[]},addEventListener(){}};
vm.createContext(ctx);
for(const f of ['data.js','names.js','retired.js','specials.js','uniques.js','highcards.js','pincards.js','rarespells.js','counterspells.js','upgrades.js','decks.js','cards.js','grades.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx,{filename:f});
module.exports=ctx;
