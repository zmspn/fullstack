import SingleCountry from "./SingleCountry";


const Content = ({countryList, setCountryList}) => {
    if (countryList.length === 1) {
        return (
            <div>{countryList.map((country) =>
                <SingleCountry country={country}/>
            )}</div>
        )
    } else if (countryList.length
        < 11 && countryList.length !== 0) {
        return (
            <p>{countryList.map((country) =>
                <li key={country.name}>{country.name}
                    <button onClick={() => setCountryList([country])}>show</button>
                </li>
            )}</p>
        )
    }
else if (countryList.length > 10)
    {
        return (
            <p>too many results</p>
        )
    }
else
    {
        return (
            <p>no results</p>
        )
    }
}
export default Content