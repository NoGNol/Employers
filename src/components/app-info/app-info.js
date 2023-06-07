import './app-info.css';

const AppInfo = ({countEmployers, countEmployersIncrease}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {countEmployers}</h2>
            <h2>Премию получат: {countEmployersIncrease}</h2>  
        </div>
    )
};

export default AppInfo;