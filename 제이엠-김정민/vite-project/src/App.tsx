import './App.css'
// 1. List Component를 Import
import List from './components/List';

function App() {
  const nickname = 'jungmin'
  const name = '김정민'
  const sweetPotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
  return (
    <>
      <strong className='school'>명지대학교</strong>
      <p className ='student'>{nickname}/{name}</p>
      <h1>{`${nickname}은 ${sweetPotato} 튀김을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho,idx)=> (
          // 2. <li key = {idx}>{yaho}입니다.</li> -> List 컴포넌트를 호출출
          <List key={idx} tech={yaho}/>
        ))}
      </ul>
    </>
  )
}

export default App
