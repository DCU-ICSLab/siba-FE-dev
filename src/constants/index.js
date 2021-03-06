
export const API_BASE_URL = 'http://39.117.253.166:4000';
//export const API_BASE_URL = 'http://203.250.32.29:10001';

export const OAUTH2_REDIRECT_URI = `${process.env.PUBLIC_URL === '' ? window.location.href : process.env.PUBLIC_URL}/oauth2/redirect`;

export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorize/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const ACCESS_TOKEN = 'accessToken';

export const BUTTON_TYPE = [{
    type: 1,
    name: 'button',
    headText: '사용할 수 있는 명령 목록 입니다.',
    footText: '수행할 명령을 클릭 해주세요.'
},
{
    type: 2,
    name: 'dynamic',
    headText: '값을 입력 해주세요.',
    footText: ''
},
{
    type: 3,
    name: 'time',
    headText: '시간을 설정해주세요.',
    footText: ''
},
{
    type: 5,
    name: 'entry',
    headText: '디바이스의 명령 목록 입니다.',
    footText: '수행할 명령을 클릭 해주세요.'
},
{
    type: 6,
    name: 'select',
    headText: '조회 박스 입니다.',
    footText: ''
},
{
    type: 7,
    name: 'judge',
    headText: '$==$',
    footText: ''
},
{
    type: 8,
    name: 'End',
    headText: '',
    footText: ''
}];


