const CodeGenerator = (selectedDevices)=>{

    let functionDefines ='';
    let functionCalls ='';

    selectedDevices.get('pallet').map(box=>{

        const boxType = box.get('type')
        console.log(boxType)

        //버튼 타입의 박스들에 대해서만 수행
        if(boxType===1 || boxType===5){
            

        const boxId=box.get('id')
        box.getIn(['info', 'buttons']).map(btn=>{
            const eventCode = btn.get('eventCode')

            //함수 이름 필터링
            let funcName 
            switch(btn.get('type')){

                case '1':
                    funcName='action'
                    break;

                case '5':
                    funcName='reservation'
                    break;
                default:
                    break;
            }
            functionDefines+=
`
/*
* box id: ${boxId}, 
* button index: ${btn.get('idx')}
* button event code: ${eventCode}
*/
size_t ${funcName}_${eventCode}(size_t before) {
    size_t result = 1;
    //define logic code in here
    
    return result;
}
`

            functionCalls+=
`   
    siba.add_event(${eventCode}, ${funcName}_${eventCode});`
        })
    }
    })

//-----------------------------------------------------------

    let codeString = 
`#include <SIBA.h>

/*
* Environment information:
* development is 1
* production is 0
*/
#define ENV 1

SIBA siba;

//your router information
const char* ssid = "your SIBA hub ssid";
const char* pwd = "your SIBA hub password";

//your device's key for authentication
const char* hw_auth_key = "${selectedDevices.get('devAuthKey')}";
${functionDefines}

void add_ctrl_cmd_group() {
    ${functionCalls}
}

void add_sensing_group() {
    
}

void setup() {
    Serial.begin(115200); //board's baud rate

    /* put your other setup code here 
    * ----------------------------------------------
    */


    
    /* ---------------------------------------------*/

    add_ctrl_cmd_group(); //add all control command

    add_sensing_group(); //add all sensing event


    //connect SIBA IoT platform
    #if ENV
    siba.init(ssid, password, hw_auth_key);

    #else
    siba.init(hw_auth_key);

    #endif
}

void loop() {
    //keep alive your device and SIBA platform
    siba.verify_connection();
}

`

    return codeString;
}

export default CodeGenerator;