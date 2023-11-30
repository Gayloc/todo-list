import './App.css'
import Task from './task.js'
import { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import reactIcon from './assets/react.svg'

function App() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || { items: [] }

  const [taskList, setTaskList] = useState(tasks)

  const clearList = () => {
    const updatedItems = { items: [] }
    setTaskList(updatedItems)
    localStorage.setItem('tasks', JSON.stringify(updatedItems))
    return updatedItems
  }

  return (
    <div className='main-box'>
      <div className='box-title'>Todo-List<div className='info'>Powered by &nbsp;<img src={reactIcon} /><b>React</b></div></div>
      <div className='box-action'>
        <AddItem tasks={taskList} setTasks={setTaskList} />
        <button className='clear-button' onClick={clearList}><svg t="1701321075118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="954" width="200" height="200"><path d="M880 864c0 88.37-71.63 160-160 160H304c-88.37 0-160-71.63-160-160l-3.2-608H128c-26.51 0-48-21.49-48-48s21.49-48 48-48h768c26.51 0 48 21.49 48 48s-21.49 48-48 48h-16v608zM672 0c26.51 0 48 21.49 48 48s-21.49 48-48 48H352c-26.51 0-48-21.49-48-48s21.49-48 48-48h320z m-48 384c26.51 0 48 21.49 48 48v320c0 26.51-21.49 48-48 48s-48-21.49-48-48V432c0-26.51 21.49-48 48-48z m-224 0c26.51 0 48 21.49 48 48v320c0 26.51-21.49 48-48 48s-48-21.49-48-48V432c0-26.51 21.49-48 48-48z m384-128H240v608c0 35.35 28.65 64 64 64h416c35.35 0 64-28.65 64-64V256z" fill="#1A1A1A" p-id="955"></path></svg>清除</button>
      </div>
      <hr />
      <div className='box-content'>
        {
          (taskList != null && taskList.items.length > 0)
            ? (taskList.items.map((item, index) => {
              return (
                <Item task={item} setTaskList={setTaskList} key={index} index={index} />
              )
            }))
            : (
              <div className='no-content'>没有任务</div>
            )
        }
      </div>
    </div>
  )
}

function CheckCircle({ isCheck, onClick }) {
  if (isCheck) {
    return (
      <button className='check-circle checked' onClick={onClick}><svg t="1701320667785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="954" width="200" height="200"><path d="M497.02 735.89a65.784 65.784 0 0 1-14.11 12.51c-27.68 18.14-65.12 9.95-86.37-15.39L116.77 399.57C87.97 365.23 32 385.61 32 430.41c0 11.3 3.97 22.21 11.23 30.85l278.66 332.13c49.47 58.94 134.27 79.14 201.86 42.37 19.42-10.56 35.46-24.22 48.19-39.84l408.83-487.2A47.917 47.917 0 0 0 992 277.87c0-44.8-55.97-65.18-84.77-30.85L497.02 735.89z" fill="#1A1A1A" p-id="955"></path></svg></button>
    )
  } else {
    return (
      <button className='check-circle unchecked' onClick={onClick}><svg t="1701320667785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="954" width="200" height="200"><path d="M497.02 735.89a65.784 65.784 0 0 1-14.11 12.51c-27.68 18.14-65.12 9.95-86.37-15.39L116.77 399.57C87.97 365.23 32 385.61 32 430.41c0 11.3 3.97 22.21 11.23 30.85l278.66 332.13c49.47 58.94 134.27 79.14 201.86 42.37 19.42-10.56 35.46-24.22 48.19-39.84l408.83-487.2A47.917 47.917 0 0 0 992 277.87c0-44.8-55.97-65.18-84.77-30.85L497.02 735.89z" fill="#1A1A1A" p-id="955"></path></svg></button>
    )
  }
}

function Item({ task, setTaskList, index }) {
  const [check, setCheck] = useState(task.checked)
  const handleAdd = () => {
    task.checked = !task.checked
    setCheck(task.checked);
    setTaskList((state) => {
      localStorage.setItem('tasks', JSON.stringify(state))
      return state
    })
  }
  const handleDel = () => {
    setTaskList((state) => {
      const updatedItems = [...state.items]
      updatedItems.splice(index, 1)
      const updated = { items: updatedItems }
      localStorage.setItem('tasks', JSON.stringify(updated))
      return updated
    })
  }
  const datestr = new Date(task.date)
  return (
    <div className='item'>
      <div className='main-content'>
        <CheckCircle isCheck={check} onClick={handleAdd} />
        <div className='content'>
          {
            (check)
            ? (
            <p className='item-title'><del>{task.content}</del></p>
            )
            : (
              <p className='item-title'>{task.content}</p>
            )
          }
          <div className='date'>{datestr.toLocaleDateString()}</div>
        </div>
      </div>
      <button className='del-button' onClick={handleDel}><svg t="1701321075118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="954" width="200" height="200"><path d="M880 864c0 88.37-71.63 160-160 160H304c-88.37 0-160-71.63-160-160l-3.2-608H128c-26.51 0-48-21.49-48-48s21.49-48 48-48h768c26.51 0 48 21.49 48 48s-21.49 48-48 48h-16v608zM672 0c26.51 0 48 21.49 48 48s-21.49 48-48 48H352c-26.51 0-48-21.49-48-48s21.49-48 48-48h320z m-48 384c26.51 0 48 21.49 48 48v320c0 26.51-21.49 48-48 48s-48-21.49-48-48V432c0-26.51 21.49-48 48-48z m-224 0c26.51 0 48 21.49 48 48v320c0 26.51-21.49 48-48 48s-48-21.49-48-48V432c0-26.51 21.49-48 48-48z m384-128H240v608c0 35.35 28.65 64 64 64h416c35.35 0 64-28.65 64-64V256z" fill="#1A1A1A" p-id="955"></path></svg></button>
    </div>
  )
}

function AddItem({ tasks, setTasks }) {
  const inputRef = useRef()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleAdd = () => {
    if (inputRef.current.value.trim() !== '') {
      const newItem = new Task(inputRef.current.value, selectedDate)

      setTasks((state) => {
        const updatedTasks = {
          items: [...state.items, newItem],
        }

        localStorage.setItem('tasks', JSON.stringify(updatedTasks))

        return updatedTasks
      })

      inputRef.current.value = ''
    }
  }

  const handleDate = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className='add-item'>
      <input placeholder='添加项目' ref={inputRef} />
      <DatePicker selected={selectedDate} onChange={handleDate} placeholderText="选择日期" />
      <button onClick={handleAdd}><svg t="1701321255669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1110" width="200" height="200"><path d="M512 32c24.95 0 45.45 19.04 47.78 43.38L560 80v384h384c26.51 0 48 21.49 48 48 0 24.95-19.04 45.45-43.38 47.78L944 560H560v384c0 26.51-21.49 48-48 48-24.95 0-45.45-19.04-47.78-43.38L464 944V560H80c-26.51 0-48-21.49-48-48 0-24.95 19.04-45.45 43.38-47.78L80 464h384V80c0-26.51 21.49-48 48-48z" p-id="1111"></path></svg></button>
    </div>
  );
}


export default App
