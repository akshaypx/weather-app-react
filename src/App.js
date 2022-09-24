import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import axios from "axios";

function App() {
  const cityRef = useRef(null);
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [isData, setIsData] = useState(false);
  const [allCity, setAllCity] = useState([]);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=de72532c7fb171c714138c4802eda864&units=metric`
      );
      //console.log(response.data);
      setData(response.data);
      setIsData(true);
    } catch (err) {
      console.error(err.response.data.message);
      setIsError(true);
      setErr(err.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    setCity("");
    setIsError(false);
  };

  useEffect(() => {
    cityRef.current.focus();
    let endpoints = [
      "https://api.openweathermap.org/data/2.5/weather?q=london&appid=de72532c7fb171c714138c4802eda864&units=metric",
      "https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=de72532c7fb171c714138c4802eda864&units=metric",
      "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=de72532c7fb171c714138c4802eda864&units=metric",
      "https://api.openweathermap.org/data/2.5/weather?q=rome&appid=de72532c7fb171c714138c4802eda864&units=metric",
      "https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=de72532c7fb171c714138c4802eda864&units=metric",
      "https://api.openweathermap.org/data/2.5/weather?q=bangkok&appid=de72532c7fb171c714138c4802eda864&units=metric",
    ];

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => setAllCity(data));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid xs={12} sm={8} md={6}>
          {/* Heading */}
          <div className="app-div">
            <h1>Weather App in React JS</h1>
          </div>

          {isError && (
            <>
              <div className="app-div">
                <Alert severity="error">Error - {err}</Alert>
              </div>
            </>
          )}

          {/* Some Random City Data */}
          {isData && (
            <>
              <div className="app-div">
                <Card sx={{ minWidth: 275, backgroundColor: "#d8ffef" }}>
                  <CardContent>
                    <button
                      style={{
                        position: "relative",
                        top: "0px",
                        right: "0px",
                        display: "block",
                        width: "30px",
                        height: "30px",
                        borderRadius: "25px",
                        border: "0px none",
                        backgroundColor: "#d8ffef",
                      }}
                      onClick={() => setIsData(false)}
                    >
                      ✖
                    </button>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {data.sys.country} - {data.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {data.main.temp} °C {data.weather[0].main} -{" "}
                      {data.weather[0].description}
                    </Typography>
                    <br />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      min {data.main.temp_min}°C max {data.main.temp_max}
                      °C
                    </Typography>
                    <Typography variant="body2">
                      wind - {data.wind.speed} km/hr, humidity -{" "}
                      {data.main.humidity}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Input City */}
          <div className="app-div">
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                placeholder="Enter City Name Here..."
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                inputRef={cityRef}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={(e) => handleSubmit(e)}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </div>

          {/* Horizontal Rule */}
          <div className="app-div">
            <hr />
          </div>

          {allCity.length && (
            <div className="app-header">
              <h2>Capitals</h2>
              <table border="0" style={{ textAlign: "left", width: "100%" }}>
                <thead>
                  <tr style={{ fontSize: "14px" }}>
                    <th>Min</th>
                    <th>Max</th>
                    <th></th>
                    <th>Min</th>
                    <th>Max</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{Math.trunc(allCity[0].data.main.temp_min)} °</td>
                    <td>{Math.trunc(allCity[0].data.main.temp_max)} °</td>
                    <td>London</td>
                    <td>{Math.trunc(allCity[1].data.main.temp_min)} °</td>
                    <td>{Math.trunc(allCity[1].data.main.temp_max)} °</td>
                    <td>Tokyo</td>
                  </tr>
                  <tr>
                    <td>{Math.trunc(allCity[2].data.main.temp_min)} °</td>
                    <td>{Math.trunc(allCity[2].data.main.temp_max)} °</td>
                    <td>Paris</td>
                    <td>{Math.trunc(allCity[3].data.main.temp_min)} °</td>
                    <td>{Math.trunc(allCity[3].data.main.temp_max)} °</td>
                    <td>Rome</td>
                  </tr>
                  <tr>
                    <td>{Math.trunc(allCity[4].data.main.temp_min)} °</td>
                    <td>{Math.trunc(allCity[4].data.main.temp_max)} °</td>
                    <td>Berlin</td>
                    <td>{Math.trunc(allCity[5].data.main.temp_min)} °</td>
                    <td>{Math.trunc(allCity[5].data.main.temp_max)} °</td>
                    <td>Bangkok</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="footer">
            <p>Made by Akshay Srivastava</p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
