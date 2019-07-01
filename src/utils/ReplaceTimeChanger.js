const ReplaceTimeGenerator = (day)=>{
    let krDay='토요일';
    switch(day){
        case 'Sunday':
            krDay='일요일'
            break;
        case 'Monday':
            krDay='월요일'
            break;
        case 'Tuesday':
            krDay='화요일'
            break;
        case 'Wednesday':
            krDay='수요일'
            break;
        case 'Thursday':
            krDay='목요일'
            break;
        case 'Friday':
            krDay='금요일'
            break;
        default:
            break;
    }

    return krDay;
}
    
export default ReplaceTimeGenerator;