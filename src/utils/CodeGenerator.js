const CodeGenerator = (selectedDevices)=>{

    let functionDefines ='';
    let functionCalls ='';

    selectedDevices.get('pallet').map(box=>{
        const boxId=box.get('id')
        box.getIn(['info', 'buttons']).map(btn=>{
            const eventCode = btn.get('eventCode')
            if(eventCode===null) return;
            functionDefines+=
`
/*
* box id: ${boxId}, 
* button index: ${btn.get('idx')}
* button event code: ${eventCode}
*/
size_t command_code_e${eventCode}(size_t before) {
    size_t result = 1;
    //define logic code in here
    
    return result;
}
`

            functionCalls+=
`   
    siba.add_event(${eventCode}, command_code_e${eventCode});`
        })
    })

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

    add_ctrl_cmd_group(); //add all control command

    add_sensing_group(); //add all sensing event

    //connect SIBA IoT platform
    #if ENV
    siba.init(ssid, password, hw_auth_key);

    #else
    siba.init(hw_auth_key);

    #endif

    /* put your other setup code here */

}

void loop() {
    //keep alive your device and SIBA platform
    siba.verify_connection();
}

`

    return codeString;
}

export default CodeGenerator;