const GetDataType = (type) => {
    
    let output = 'a'
    switch (type) {
        case '1':
            output = 1
            break;
        case '2':
            output = 10
            break;
        case '3':
            output = 100
            break;
        case '4':
            output = 3.14
            break;
        case '5':
            output = 'test'
            break;
        default:
            break;
    }

    return output
}

export default GetDataType;