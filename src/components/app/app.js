import { Component } from 'react'

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [
                {name: 'asd', salary: 800, increase: false, rise: true, id: 1},
                {name: 'zcx', salary: 1000, increase: true, rise: false, id: 2},
                {name: 'qwe', salary: 1200, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all'
            
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];
            
            return {
                // data: newArr
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) =>{
        const newItem = {
            name, 
            salary, 
            increase:false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return{
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //     return{
        //         data: newArr
        //     }
        // })
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
    
    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if(item.id === id){
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //         }))
    // }

    searchEmp = (items, term) => {
        if (term.length === 0){
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) =>{
        this.setState({term: term});    
    }



    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise === true);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    OnChangeSalary = (name, newSalary) => {
        this.setState(({data}) =>({
            data: data.map(item => {
                if(item.name === name){
                    return {...item, salary: newSalary}
                }
                return item
            })
        }))
    }
    render() {
        const {data, term, filter} = this.state;
        const countEmployers = data.length;
        const countEmployersIncrease = data.filter(item => item.increase === true).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        //const visibleData = this.filterSalary(data);
        return (
            <div className="app">
                <AppInfo 
                countEmployers={countEmployers}
                countEmployersIncrease={countEmployersIncrease}
                />
    
                <div className="search-panel">
                  <SearchPanel 
                  onUpdateSearch={this.onUpdateSearch}
                  />
                  <AppFilter 
                  onFilterSelect={this.onFilterSelect}
                  filter={filter}
                  
                  />
    
                </div>
                <EmployersList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                OnChangeSalary={this.OnChangeSalary}
                />
                <EmployersAddForm 
                onAdd={this.addItem}
                />
            </div>
        );
    }
};

export default App;