
const Filter = ({ filter, setFilter }) => {
    return (
        <div className='filters shadow container'>
            <form>
                <div className="camp">
                    <label htmlFor="">Expenses Filter</label>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value=""> -- Select</option>
                        <option value="saving">Saving</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="health">Health</option>
                        <option value="fun">Fun</option>
                        <option value="others">Others</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filter