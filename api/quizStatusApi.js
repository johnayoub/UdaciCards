import { AsyncStorage } from 'react-native';

const KEY = 'UdaciCards:quizStatus';

function createTodayDateKey() {
    const date = new Date();

    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function getQuizStatusObject() {
    const defaultValue = {};

    return AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then(result => {
           if (result === null) {
               return AsyncStorage.setItem(KEY, JSON.stringify(defaultValue))
                   .then(() => {
                        return defaultValue;
                   });
           }

           return result;
        });
}

export function getQuizStatus(){
    return getQuizStatusObject()
        .then(dic => {
            return dic[createTodayDateKey()] || false;
        });
}

export function setQuizStatus() {
    return getQuizStatusObject()
        .then(dic => {
            const key = createTodayDateKey();

            if (dic[key]) {
                return;
            }
            else {
                dic[key] = true;

                return AsyncStorage.setItem(KEY, JSON.stringify(dic));
            }
        });
}