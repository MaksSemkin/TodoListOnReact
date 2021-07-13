import React,{Component} from 'react';


import AppHeader from "../app-header";
import Todolist from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoListItem from "../todo-list-item";
import ItemAddForm from "../item-add-form";

import './app.css'

export default class App extends Component {

    maxId = 100

    state = {
        todoData : [
            this.createTodoItem('Drink coffe'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')

            ],
        term: '',
        filter: 'all'
    };

    deleteItem = (id)=> {
        this.setState(({todoData})=> {
            const idx = todoData.findIndex((el) => el.id === id);

            const before = todoData.slice(0,idx);
            const after = todoData.slice(idx+1)
            const newArray = [...before, ...after];



            return {
                todoData: newArray
            }
        });
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }

    }

    addItem = (text)=> {

      const newItem = this.createTodoItem(text)


        this.setState(({todoData})=> {
            const newArray = [...todoData, newItem]
            return {
                todoData: newArray
            }
        })
    }
    onToggleImportant = (id) => {
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el) => el.id === id);

            const oldItem = todoData[idx];
            const newItem = {...oldItem, important: !oldItem.important}

            const newArray = [...todoData.slice(0,idx),newItem, ...todoData.slice(idx+1)];

            return {
                todoData: newArray
            };
        })

        console.log(id,' ToggledImportant')
    };

    onToggleDone = (id) => {
    this.setState(({todoData})=>{
        const idx = todoData.findIndex((el) => el.id === id);

        const oldItem = todoData[idx];
        const newItem = {...oldItem, done: !oldItem.done}

        const newArray = [...todoData.slice(0,idx),newItem, ...todoData.slice(idx+1)];

        return {
           todoData: newArray
        };
    })
        console.log(id, ' Done!')
    };

    searchS=(term)=> {
        this.setState({term})
    }

    onFilterChange=(filter)=> {
        this.setState({filter})
    }

    searchItems = (items,term) => {
            if(term ===0) {
                return items
            }

           return  items.filter((item)=> item.label.toLowerCase().match(term.toLowerCase()) );

        }

    activeItem=()=>{
        this.setState(({todoData})=> {
         const active = this.state.todoData.filter((el)=> !el.done)


            return {
             todoData : active
         }
        });
    }

    filter =(items,filter) => {
switch(filter) {
    case 'all':
        return items;
    case 'active' :
        return items.filter((item)=>!item.done);
    case 'done':
        return items.filter((item)=>item.done);
    default: return items
}

    }

    render() {
        const {todoData,term,filter} = this.state;
        const doneCount = this.state.todoData
            .filter((el)=> el.done ).length;

        const todoCount = todoData.length - doneCount;
        const visibleItems  = this.filter(this.searchItems(todoData,term),filter)

        return  (
            <div className="todo-app top-panel">

                <AppHeader toDo = {todoCount} done = {doneCount} />
                <SearchPanel
                searchS = {this.searchS}
                searchItems = {this.searchItems}
                text = {term}
                />
                <ItemStatusFilter filter = {filter}
                onFilterChange={ this.onFilterChange}/>
                <Todolist
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone = {this.onToggleDone}
                    todos={ visibleItems }
                    onDeleted = { this.deleteItem }
                />
                <ItemAddForm
                // todos = {this.state.todoData}
                onAdd = {this.addItem}
                />
            </div>
        )
    }


}
