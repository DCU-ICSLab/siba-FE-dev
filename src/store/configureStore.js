import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from 'store/modules';
import { createLogger } from 'redux-logger';
import penderMiddleware from 'redux-pender';
import { routerMiddleware } from 'connected-react-router'

//리덕스 스토어 생성 함수
export default function configureStore(history) {
  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        createLogger(),
        penderMiddleware()) //미들웨어 적용
    )
  );

  return store
}