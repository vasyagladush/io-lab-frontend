// AdminVotingTemplate.js
import { Button, TextInput, Select, Label, Textarea, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useGetSurveys } from "../hooks/useGetSurveys";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";
import { Spinner } from "../../../../../components/ui-kit";
import { div } from "framer-motion/client";

const SurveysList = () => {
  const [voteName, setVoteName] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, 16));
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState("1-5");

  const { getSurveys, surveysData, loading } = useGetSurveys();
  const { showNotification } = useNotification();
  const [selectedRating, setSelectedRating] = useState({});
  const handleVote = (surveyId: number, rating: number) => {
    setSelectedRating((prev) => ({ ...prev, [surveyId]: rating }));
    console.log(`Oddano głos: ${rating} dla głosowania ID ${surveyId}`);
  };

  useEffect(() => { getSurveys() }, [])
  

  return (
    <div className="flex flex-col gap-4">
      <h2 className='center text-xl font bold text-black-900'>Głosowania
      {surveysData.map((survey) => {
        return (
          <Card onClick={()=> {console.log("dziala")}} key={survey.id} className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{survey.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{survey.body}</p>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <div>
                <span className="font-medium">Rozpoczęcie: </span>
                {new Date(survey.startAt).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Zakończenie: </span>
                {new Date(survey.finishesAt).toLocaleString()}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                
            </div>



            <Button color="blue" className="mt-4 w-full">Głosuj</Button>
          </Card>
        );
      })}
      </h2>
    </div>
  );
};

export default SurveysList;
