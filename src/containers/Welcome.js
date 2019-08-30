import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';
import { KAKAO_AUTH_URL } from 'constants/index';
import {
    WelcomeItem
} from 'components';

class Welcome extends Component {

    componentDidMount() {
    }

    render() {

        return (
            <Fragment>
                {/* <div class="header__text-1 hidden-sm hidden-md hidden-lg">
				    설치가 필요 없는 <br class="visible-xs"/>클라우드 통합개발환경에 <br class="visible-xs"/>당신의 아이디어를 쏟아내세요!
                </div> */}
                <WelcomeItem>
                <div className="SocialLogin">
                    <a href={KAKAO_AUTH_URL} className="btn btn-block social-btn">
                        <div>카카오 로그인</div>
                    </a>
                </div>
                </WelcomeItem>
            </Fragment>
        )
    }
}


export default withRouter(
    connect(
        // props 로 넣어줄 스토어 상태값
        state => ({

        }),
        // props 로 넣어줄 액션 생성함수
        dispatch => ({
            basicActions: bindActionCreators(basicActions, dispatch),
        })
    )(Welcome)
)