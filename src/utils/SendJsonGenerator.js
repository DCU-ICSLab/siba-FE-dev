const makeCommand = (cmd) => {
return `{
            "btnType" : ${cmd.get('btnType')},
            "eventCode": ${cmd.get('eventCode')},
            "additional": []
        }`
}

const makeAdditional = () => {

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