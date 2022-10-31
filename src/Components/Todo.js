import React, { useEffect, useState } from 'react'
import '../App.css'
import todo from '../Image/todo.png'

//Get Item From Local Storage 
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    } else{
        return [];
    }
}


const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setEditItem] = useState(null);

    // Add Item
    const addItem = () => {
        if(!inputData){
            alert('Please Fill The Data.')
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map(element => {
                    if(element.id === isEditItem){
                        return {...element, name: inputData}
                    }
                    return element;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setEditItem(null);
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name: inputData}
            setItems([...items, allInputData])
            setInputData('');
        } 
    }
    //Edit Item
    const editItem = (id) => {
        let newEditItem = items.find(element => element.id === id);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setEditItem(id);
    }

    // Delete Unique Items
    const deleteItem = (index) => {
        const updateditems = items.filter((element) => {
            return index !== element.id;
        });

        setItems(updateditems);
    }

    // Remove All Items
    const removeAllItems = () => {
        setItems([]);
    }

    //Add Data To Local Storage 
     useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
     },[items]) 

     

  return (
    <div className='main-div'>
        <div className="child-div">
            <figure>
                <img src={todo} alt="" />
                <figcaption>Add Your List Hare 📝</figcaption>
            </figure>
            <div className="addItems">
                <input value={inputData} onChange={(e) => setInputData(e.target.value)} type="text"  placeholder='🖊️ Add items...'/>
                {
                    toggleSubmit ? <i className="fa fa-plus add-btn" title='Add item' onClick={addItem}></i> : <i className="far fa-edit add-btn" title='Add item' onClick={addItem}></i>
                }
            </div>
            <div className="showItems">
                {
                    items.map((element) => {
                        return(
                            <div className="eachItem" key={element.id}>
                                <h3>{element.name}</h3>
                                <div className="todo-btn">
                                <i className="far fa-edit add-btn" title='Edit Button' onClick={() => editItem(element.id)}></i>
                                <i className="far fa-trash-alt add-btn" title='Delete Button' onClick={() => deleteItem(element.id)}></i>
                                </div>
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