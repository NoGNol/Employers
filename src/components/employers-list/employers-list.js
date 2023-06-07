import EmployersListItem from "../employers-list-item/employers-list-item";
import './employers-list.css'


const EmployersList = ({data, onDelete, onToggleProp, OnChangeSalary}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            // <EmployersListItem name={item.name} salary={item.salary}/> //or{...item}
            <EmployersListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
            data={data}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            OnChangeSalary={OnChangeSalary}
            /> //or{...item}
        )
    });
 

    return (
        <ul className="app-list list-group">
            {elements}
       </ul>
    )
}

export default EmployersList;