/* eslint-disable react/prop-types */
const AmiiboSearchUi = ({term, setTermFunc, searchAmiiboFunc, parseAmiiboResultFunc}) => {
    return (
        <>
            <button onClick={() => { searchAmiiboFunc(term, parseAmiiboResultFunc); } }>Search</button>

            <label>
                Name:
                <input value={term} onChange={e => setTermFunc(e.target.value.trim())} />
            </label>
        </>
    );
}

export default AmiiboSearchUi;