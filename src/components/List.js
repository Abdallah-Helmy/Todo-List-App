import React, { useEffect, useRef, useState } from 'react';
import './List.css';

export const List = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      setList(JSON.parse(localStorage.getItem('tasks')));
    }
  }, []);

  const AddTaskhandler = () => {
    if (inputRef.current.value) {
      setList([...list, inputRef.current.value]);
      localStorage.setItem('tasks', JSON.stringify([...list, inputRef.current.value]));
      setValue('');
    }
  };

  const deletion = index => {
    if (index === 0) {
      list.splice(index, index + 1);
    } else {
      list.splice(index, index);
    }
    setList([...list]);
    localStorage.setItem('tasks', JSON.stringify([...list]));
  };

  const clearAll = () => {
    setList([]);
    localStorage.setItem('tasks', JSON.stringify([]));
  };

  return (
    <div className="h-100 d-flex justify-content-center mt-5">
      <div className="Todo-app">
        <div className="List-Input d-flex justify-content-between">
          <input type="text" value={value} onChange={e => setValue(e.target.value)} ref={inputRef} />
          <button className="btn btn-primary" onClick={AddTaskhandler}>
            Add Task
          </button>
        </div>
        <div className="tasks">
          {list.map((item, index) => {
            return (
              <div className="task d-flex align-items-center justify-content-between bg-light p-1 mb-2" key={index}>
                <h4>{item}</h4>
                <button className="btn btn-dark" onClick={() => deletion(index)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="clear-all d-flex justify-content-center mt-4">
          <div className="btn btn-danger" onClick={clearAll}>
            Clear All
          </div>
        </div>
      </div>
    </div>
  );
};
