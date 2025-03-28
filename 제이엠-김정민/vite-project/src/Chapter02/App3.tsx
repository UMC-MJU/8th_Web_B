import { useState } from 'react';

function App3() {
    // 초기 상태로 '김용민', 26, '매튜'를 가진 person 객체를 초기값으로 생성합니다.
    const [person, setPerson] = useState({
        name: '김정민',
        age: 25,
        nickname: '제이엠',
        // city가 들어갈 자리를 미리 만들어놔야한다.
        // 그래야 person에서 city라는 값이 있다고 타입이 추론이 됩니다.
        city: '',
        bornCity: '',
    });

    // city 값을 새로 추가하여 업데이트하는 함수
    const updateCity = ()=> {
        setPerson((prevPerson) => ({
            ...prevPerson, // 이전 person 객체의 복사본 생성
            city: '용인', // 새로 city 값을 추가하거나 업데이트
        }));
    };

    const updateBornCity = ()=> {
        setPerson((prevPerson) => ({
            ...prevPerson,
            bornCity: '이천',
        }));
    };

    // age 값을 1씩 증가시키는 함수
    const increaseAge = () => {
        setPerson((prevPerson) => ({
            ...prevPerson, // 이전 person 객체의 복사본을 생성합니다.
            age: prevPerson.age + 1, // 다른 key의 value는 유지, age 값을 기존 값에서 1 증가
        }));
    };

    return (
        <>
            <h1>이름: {person.name}</h1>
            <h2>나이: {person.age}</h2>
            <h3>닉네임: {person.nickname}</h3>
            {person.city && <h4>도시: {person.city}</h4>}
            {person.bornCity && <h4>출생도시: {person.bornCity}</h4>}
            <button onClick={updateCity}>도시 추가</button>
            <button onClick={increaseAge}>나이 증가</button>
            <button onClick={updateBornCity}>출생지역 추가</button>
        </>
    );
}

export default App3;
