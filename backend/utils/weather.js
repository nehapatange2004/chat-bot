import dotenv from "dotenv";
dotenv.config();

export const get_weather_forecast = async ({region}) => {
    try {
        // if (!req.body) return res.send({"message": "No body received"});
        // if (!req.body.region) {
        //     return res.send({"message": "No region received"});
        // }
        // const region = req.body.region
        // console.log("Region: ", region)

        const WEATHER_API_KEY = process.env.WEATHER_API_KEY
        
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${region}`);
        const data = await response.json();
        // console.log(data);
        return data;
        // return res.send(data);
    } catch (err) {
        console.log("weather api error: ", err);
        return err;
        // res.send({ "message": "Internal server error" });
    }
}
