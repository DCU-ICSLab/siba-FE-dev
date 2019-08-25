const GetRuleType = (type) => {
    let rule = ''
    switch (type) {
        case '1':
            rule = '규칙 없음'
            break;
        case '2':
            rule = '=='
            break;
        case '3':
            rule = '!='
            break;
        case '4':
            rule = '>'
            break;
        case '5':
            rule = '<'
            break;
        default:
            break;
    }

    return rule
}

export default GetRuleType;