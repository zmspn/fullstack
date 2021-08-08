const SingleCountry = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>

            <ul> {country.languages.map((lan) => (
                <li key={lan.name}>{lan.name}</li>
            ))}
            </ul>
            <img alt="pic" src={country.flag} width="150" height="100"/>
        </div>
    )
}
export default SingleCountry