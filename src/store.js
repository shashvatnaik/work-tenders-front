import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import firebase from 'firebase';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const config = {
    "type": "service_account",
    "project_id": "work-tenders",
    "private_key_id": "e6b14844179b8d11671babd955ac3a7ba014cc04",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDyJTLcuspXGK8q\nUHps/QJgyuU77Gh4O/1LtcY6vUqxLHHTwgDj9yEf2k2xbmsasaCXh52mOMH9fDVw\n5KE0xVHGJX/ARznuLd3GdgXz+vLTzMDTPaULb69KVoAk8e3AuHZ/+VwloZrgCSgk\n3ecJ8lWO18dYxLEj6J4lT05doP/BZLDgpdUS1M23nO/CHIAS1cSCyAChfz8+IDJO\n3wRmAILB5gIeOtnPG/xTTAlzCL+6bJX9xQ4zUXSt3QcdkO4lHz2qc7CgSkUvXzvu\nOZ5egCmDtCANQhS7GesuRKlLCp5/xmwAFmNIdDBaf5UJiQ4JYX0XP1JbxyTOKqG+\njigkP5rNAgMBAAECggEAF9H++eXKJ90+xgvar0QIatsqx8VO1Z0ZIsyD7p1Wbq1v\nmSQ5kDNsZ8TC5dR15s9Ye++UW5izxKrmWu+yyA0tKS/hLFoVYc/TREWx+jlSj/FR\nerZSuRhIhyiRPJEsEUxUI+y02uLV6HoeH9pQcxMKxZ2Gd74Jqv2kKQlvLRi8cBq1\nq2PnS/03SiWkM2DSdPoZ7G94NAoxXkuCB9GEtymweVOim9p/LOAuO8i4x8TFm6aB\n8HGMRrRxMNqQyoLbjugrQT+K0dStlzb9Yd28BYKiiZgPv66Eww+o1ygKv8mmy82V\nx/bLjv0DsCOsDF/Yv3hJIsFPyiEf/b1wtc1nz++cpQKBgQD52BpIClg+tNiqe9tE\nZ+tJT1SE1jY+KBiDwjwO6aMQ85QQSl3T9XDTb18gs6t3gc1swEn2ftYw4Tr83Ozh\naJiwdlWlObK3dSW19qGXNIZ4+qUkOCYe0J6q39i9qlE+Bz4H+bUZguoDmyC5lqiV\nxg0ZFFVkl8ozTrNIqHdh21kLPwKBgQD4HIkPzBHZ4uxcvcazFCklIa+To3tMbub9\nKLVcx6z+sM/7TGnyYNyNeRyTl99P6Gf7k9PFxsxagDQ4gn3EoqWEh9SpJbp68xqR\nF1seqV+ef6nfXyoombzQS9heJ1HVeTFTpKysdKGJQxGoGpv3yzXe3hYaQtwZh4KH\nI20n1bCS8wKBgQDXRkoW6rrwhPjvpLrgrT4Bs9Yag0zHr9q3pOQE4XE9CPP6OWmx\nWZl2xU7NKaLD3Vc4rlLMjqtWAKvH90AwVOTDn6LaM+X2x3zP1guT8pEvqqAinjLS\neGVOzIO/oQJRlQHw80sFCVVD+CVxZAwsyTK9+lQ90cBLBzPZljcPXWXTFwKBgQCo\nkzrM8OpwEC5oFMkcg2YxRGH2/eyYUgG/oBkZoNF5esjVBWY2uHkh5lf0MAwaTt3X\noOkSR7AxDUpt2rt5DslG8sMa6fd58hLq4eOXQZ0mI7dXfWE3lL0lCWNJFY4UbPOG\n0SxBQD1A9cDZZrrx8a/4bQy3axYAgoG9L+TKW/ZM4QKBgQCt91PPZT8D2rW8LksJ\nUG7UfVKeCgp9hkbBmhx3nTfmc2a2yGhErP7FxpZAzklbfgmpqyQUeHNdIXWR9utm\nvr6M/pC6TrY2eaupXvgYEXQ4GyNy0BiXUrMXnT4DbkndJ4f5Wea2bwb1tewPjiDO\nAQA4atX7plc0J9isbDzCi7ngFQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-kylrh@work-tenders.iam.gserviceaccount.com",
    "client_id": "103467270193502428241",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kylrh%40work-tenders.iam.gserviceaccount.com",
    "storageBucket": "work-tenders.appspot.com"
};

firebase.initializeApp(config);
console.log('firebase initiated');

const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export default createStore(
    rootReducer(history),
    initialState,
    composedEnhancers,
    firebase
);