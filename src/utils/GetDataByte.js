const GetDataByte = (type) => {

    let output = {
        byte: 1,
        text: 'CHAR (1)'
    }
    switch (type) {
        case '1':
            output = {
                byte: 1,
                text: 'BYTE (1)'
            }
            break;
        case '2':
            output = {
                byte: 4,
                text: 'INTEGER (4)'
            }
            break;
        case '3':
            output = {
                byte: 8,
                text: 'LONG (8)'
            }
            break;
        case '4':
            output = {
                byte: 8,
                text: 'DOUBLE (8)'
            }
            break;
        case '5':
            output = {
                byte: 10,
                text: 'STRING (10)'
            }
            break;
        default:
            break;
    }

    return output
}

export default GetDataByte;