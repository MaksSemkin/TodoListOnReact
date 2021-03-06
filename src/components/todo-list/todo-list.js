import React from 'react';
import './todo-list.css';
import TodoListItem from "../todo-list-item";

const Todolist = ({ todos,onDeleted, onToggleImportant, onToggleDone }) => {

  const elements = todos.map((item)=>{

      const {id,...itemProps} = item;
      return( <li key={id} className="list-group-item">
              <TodoListItem {...itemProps}
              onDelete = {()=> onDeleted(id)}
              onToggleImportant = {()=>onToggleImportant(id)}
              onToggleDone = {()=>onToggleDone(id)}

              />
      </li>
      );

  });

    return (
        <ul className={"list-group"}>
            {elements}

        </ul>
    );
};

export default Todolist
