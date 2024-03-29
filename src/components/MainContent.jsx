import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import Image1 from "../assets/fajr-prayer (1).png";
import Image2 from "../assets/dhhr-prayer-mosque.png";
import Image3 from "../assets/asr-prayer-mosque.png";
import Image4 from "../assets/sunset-prayer-mosque.png";
import Image5 from "../assets/night-prayer-mosque.png";

export default function MainContent() {
  const [nextPrayerIndex, setNextPrayerIndex] = useState(1);

  const [timings, setTimings] = useState({
    Fajr: "4.20",
    Dhuhr: "12.02",
    Asr: "3.15",
    Maghrib: "6.00",
    Isha: "7.30",
  });
  const [remainingTime, setRemainingTime] = useState();
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهره",
    apiName: "cairo",
  });
  const [today, setToday] = useState("");
  const avilabCities = [
    {
      displayName: "الجيزة",
      apiName: "giza",
    },
    {
      displayName: "المنوفية",
      apiName: "monufia",
    },
    {
      displayName: "المنصوره",
      apiName: "mansoura",
    },
    {
      displayName: "بور سعيد",
      apiName: "Port Said",
    },
    {
      displayName: "السويس ",
      apiName: "Suez",
    },
    {
      displayName: "الأقصر ",
      apiName: "	Luxor",
    },
    {
      displayName: "طنطا ",
      apiName: "Tanta",
    },
    {
      displayName: "الإسماعيلية ",
      apiName: "Ismailia",
    },
    {
      displayName: "أسيوط	 ",
      apiName: "Asyut",
    },
    {
      displayName: "أسوان	 ",
      apiName: "Aswan",
    },
    {
      displayName: "المنيا	 ",
      apiName: "al-Minya",
    },
    {
      displayName: "سوهاج	 ",
      apiName: "Sohag",
    },
    {
      displayName: "مرسى مطروح ",
      apiName: "Marsa Matruh",
    },
    {
      displayName: "الإسكندرية  ",
      apiName: "Alexandria",
    },
    {
      displayName: " الفيوم ",
      apiName: "Fayyum",
    },
  ];

  const prayersArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
    },
    {
      key: "Asr",
      displayName: "العصر",
    },
    {
      key: "Maghrib",
      displayName: "المغرب",
    },
    {
      key: "Isha",
      displayName: "العشاء",
    },
  ];

  const getTimings = async () => {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/26-03-2024?city=${selectedCity.apiName}&country=EGY&method=8`
    );
    setTimings(res.data.data.timings);
    console.log(timings);
  };

  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    const t = moment();
    setToday(t.format("MMMM Do YYYY | h:mm a"));
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remaingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remaingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiffernce = midnightDiff + fajrMidnightDiff;
      remaingTime = totalDiffernce;
    }

    const durationRemainingTime = moment.duration(remaingTime);

    setRemainingTime(`
      ${durationRemainingTime.hours()}:
       ${durationRemainingTime.minutes()}:
      ${durationRemainingTime.seconds()}
      `);
    const Isha = timings["Isha"];
    const IshaMomet = moment(Isha, "hh:mm");
  };

  const handelCityChenge = (event) => {
    const cityObject = avilabCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(cityObject);
  };
  return (
    <>
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName} </h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي حتي صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1 style={{ direction: "ltr" }}> {remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.5" }} />

      <Stack
        justifyContent="space-around"
        style={{ marginTop: "10px" }}
        direction={{ sm: "row" }}
        spacing={{ xs: 2, sm: 2, md: 2, mr: 2 }}
      >
        <Prayer name="الفجر" time={timings.Fajr} img={Image1} />
        <Prayer name="الظهر" time={timings.Dhuhr} img={Image2} />
        <Prayer name="العصر" time={timings.Asr} img={Image3} />
        <Prayer name="المغرب" time={timings.Maghrib} img={Image4} />
        <Prayer name="العشا" time={timings.Isha} img={Image5} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "10px" }}
      >
        <FormControl style={{ width: "40%", color: "white" }}>
          <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
            القاهره
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handelCityChenge}
          >
            {avilabCities.map((city, index) => {
              return (
                <MenuItem value={city.apiName} key={index}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
