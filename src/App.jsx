import React, { useState } from 'react'
import { X } from 'lucide-react';

const App = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [tasks, setTasks] = useState([]);

  const toggleStatus = (index)=>{
    if(tasks[index].status) return
    const updatedTasks = tasks.map((task, i) => 
    i === index ? { ...task, status: true } : task)
    setTasks(updatedTasks);
  }

  const deletetask = (index)=>{
    const filteredtask = tasks.filter((_,i)=>i!==index)
    setTasks(filteredtask)
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    const newtask=[...tasks]
    newtask.push({title, detail, status:false})
    setTasks(newtask)
    console.log(tasks)
    setTitle("")
    setDetail("")
  }
  return (
    <div className='h-screen lg:flex bg-black text-white'>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} className='flex gap-4 lg:w-1/2 p-10 flex-col items-start'>
          <h1 className='text-3xl font-bold '>Add Notes</h1>

          <input onChange={(e)=>{
            setTitle(e.target.value)
          }}
           className='outline:none px-5 py-2 font-medium text-xl border-2 w-full rounded'
           type='text' 
           placeholder='Enter notes heading'
           value={title}></input>
          <textarea onChange={(e)=>{
            setDetail(e.target.value)
          }}
          type='text'
          placeholder='Enter deatils here'
          className='px-5 w-full font-medium h-32 py-2 flex items-start flex-row border-2 outline:none rounded'
          value={detail}/>
          <button className='bg-white active:scale-95 font-medium w-full outline-none text-black px-5 py-2 rounded'>Add Note</button>
        </form>
        <div className='lg:w-1/2 lg:border-l-2 p-10 h-screen flex flex-col'>
        <h1 className='font-bold text-3xl'>Recent Notes</h1>
        <div className='flex flex-wrap gap-5 mt-5  overflow-y-auto'>
          {tasks.map((task, idx)=>{
            return <div className=' relative h-52 w-40 p-5 rounded-2xl bg-center bg-cover bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEzjsu-k3BrjVnVKjaCKqpPW_IJ67t1hrlg&s")]'>
              <button className='bg-red-600 rounded-full' onClick={()=>{deletetask(idx)}}><X size={20} /></button>
              <h3 className='leading-tight text-black text-xl font-bold'>{task.title}</h3>
              <p className='mt-4 leading-tight font-medium text-gray-500'>{task.detail}</p>
              <button 
                  onClick={() => toggleStatus(idx)}
                  className={`py-1 px-2 rounded-lg text-xs mt-6 font-bold transition-colors ${
                  task.status ? 'bg-green-500 text-white' : 'bg-gray-900 text-white'}`}>
                 {task.status ? 'Done' : 'Mark Done'}
              </button>
            </div>
          })}
        </div>
        </div>
    </div>
  )
}

export default App
