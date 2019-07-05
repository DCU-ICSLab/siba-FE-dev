import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as basicActions from 'store/modules/basic';

class HomeAdmin extends Component {

    componentDidMount() {
    }

    render() {

        return (
            <Fragment>
                {/* <div class="header__text-1 hidden-sm hidden-md hidden-lg">
				    설치가 필요 없는 <br class="visible-xs"/>클라우드 통합개발환경에 <br class="visible-xs"/>당신의 아이디어를 쏟아내세요!
                </div> */}
                <div>123</div>

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
    )(HomeAdmin)
)