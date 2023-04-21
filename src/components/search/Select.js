const Select = () => {
    return(
        <div className="container-pole">
            <p className='fonts-roboto-regular name_search'>Категория</p>
            <select className='fonts-roboto-thin input_search'>
                <option value='' disabled selected hidden>Выберите категорию</option>
                <option>Категория 1</option>
                <option>Категория 2</option>
                <option>Категория 3</option>
                <option>Категория 4</option>
            </select>
        </div>
    )
}

export default Select;