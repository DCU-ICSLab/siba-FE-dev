const GetOutputType = (type) => {
    let output = '3rd-Server'
    switch (type) {
        case '1':
            output = '알림 톡'
            break;
        case '2':
            output = '제어'
            break;
        default:
            break;
    }

    return output
}

export default GetOutputType;