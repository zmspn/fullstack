import axios from 'axios'
import {useState} from "react";
import Content from './Content'
function App() {
const [countryList, setCountryList] = useState('')

    const handleCountryChange = (event) => {
        console.log("country::", event.target.value)
        axios
            .get('https://restcountries.eu/rest/v2/name/'+ event.target.value)
            .then(r => {
                setCountryList(r.data)

            })
    }

    return (
        <div className="App">
            <form>
                <div>find countries:<input
                    onChange={handleCountryChange}/>
                </div>
            </form>
            <Content countryList={countryList} setCountryList={setCountryList}/>
        </div>

    );
}

export default App;
