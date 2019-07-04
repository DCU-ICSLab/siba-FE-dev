const SendJsonGenerator = ()=>{
let codeString = 
`{
    "cmdList" : [
        {
            "btnType" : 0,
            "eventCode": 2,
            "additional": [
               {
                    "type": "time",
                    "value": 1572400
                }
            ]
        },
    ]
}
`

    return codeString;
}

export default SendJsonGenerator;