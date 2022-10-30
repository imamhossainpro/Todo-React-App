import React, { useState } from 'react'
import '../App.css'
import todo from '../Image/todo.png'

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);

    // Add Item
    const addItem = () => {
        if(!inputData){

        }else{
            setItems([...items, inputData])
            setInputData('');
        } 
    }

    // Delete Unique Items
    const deleteItem = (id) => {
        const updateditems = items.filter((elem, index) => {
            return index !== id;
        });

        setItems(updateditems);
    }
    // Remove All Items
    const removeAllItems = () => {
        setItems([]);
    }
  return (
    <div className='main-div'>
        <div className="child-div">
            <figure>
                <img src={todo} alt="" />
                <figcaption>Add Your List Hare 📝</figcaption>
            </figure>
            <div className="addItems">
                <input value={inputData} onChange={(e) => setInputData(e.target.value)} type="text"  placeholder='🖊️ Add items...'/>
                <i className="fa fa-plus add-btn" title='Add item' onClick={addItem}></i>
            </div>
            <div className="showItems">
                {
                    items.map((element, index) => {
                        return(
                            <div className="eachItem" key={index}>
                                <h3>{element}</h3>
                                <i className="far fa-trash-alt add-btn" title='Delete Button' onClick={() => deleteItem(index)}></i>
                             </div>
                        )
                    })
                }
            </div>
            {/* Clear All Buttons */}
            <div className="showItems">
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAllItems}><span>Check List</span></button>
            </div>
        </div>
    </div>
  )
}

export default Todo