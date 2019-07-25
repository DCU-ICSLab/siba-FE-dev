const makeCommand = (cmd) => {

let additionalString='';

cmd.get('additional').map((add,index)=>{
    if(index!==0)
        additionalString+=','
    additionalString+=makeAdditional(add)
})

if(additionalString==='')
return `{
            "btnType" : ${cmd.get('btnType')},
            "eventCode" : ${cmd.get('eventCode')},
            "additional" : []
        }`

else
return `{
            "btnType" : ${cmd.get('btnType')},
            "eventCode" : ${cmd.get('eventCode')},
            "additional" : [
                ${additionalString}
            ]
        }`
}

const makeAdditional = (additional) => {

return `{
                    "type" : ${additional.get('type')},
                    "value" : ${additional.get('value')}
                }`

}

const SendJsonGenerator = (cmdList)=>{

let cmdString='';

if(cmdList.size===0){
return `{
    "cmdList" : []
}
`    
}

cmdList.map((cmd,index)=>{
    if(index!==0)
        cmdString+=','
    cmdString+=makeCommand(cmd)
})

let codeString = 
`{
    "cmdList" : [
        ${cmdString}
    ]
}
`

    return codeString;
}

export default SendJsonGenerator;