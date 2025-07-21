import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };
  // useEffect(() => {
  //   const saveTodos = localStorage.getItem('todos');
  //   if (saveTodos) {
  //     setTodos(JSON.parse(saveTodos));
  //   }
  // }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDeleteItem = (indexToDelete) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
  };
  const handleToggleComplete = (indextoToggle) => {
    const newTodos = todos.map((item, index) => {
      if (index === indextoToggle) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(newTodos);
  };
  return (
    <div>
      <div className="app-container">
        <h1>لیست کارهای باحال من 🤩</h1>
        <div className="input-form">
          <input
            type="text"
            placeholder="یه کار باحال بنویس..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="add-input"
          />
          <button onClick={handleAddItem} className="add-btn">
            اضافه کردن
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((item, index) => (
            <li
              key={index}
              className={`todo-item ${item.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span>{item.text}</span>
              <button
                onClick={() => handleDeleteItem(index)}
                className="delete-btn"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
