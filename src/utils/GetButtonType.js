const GetButtonType = (type)=>{
    let btnType

    switch (type) {
        case '1':
            btnType = '제어'
            break;
        case '2':
            btnType = '조회-예약'
            break;
        case '3':
            btnType = '조회-센싱'
            break;
        case '4':
            btnType = '조회-단일'
            break;
        case '5':
            btnType = '예약'
            break;

        default:
            break;
    }

    return btnType;
}

export default GetButtonType;