// AdminVotingTemplate.js
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useGetSurveys } from "../hooks/useGetSurveys";
import { useVote } from "../hooks/useVote";

const SurveysList = () => {
  const { vote } = useVote();
  const { getSurveys, surveysData, loading } = useGetSurveys();
  const [selectedRating, setSelectedRating] = useState<any>({});
  const handleVote = (surveyId: number, rating: number) => {
    setSelectedRating((prev: any) => ({
      ...prev,
      [surveyId.toString()]: rating,
    }));
    console.log(`Oddano głos: ${rating} dla głosowania ID ${surveyId}`);
  };

  const handleVoteSubmit = (surveyId: number) => {
    vote({ grade: selectedRating[surveyId], surveyId }).then(() => {
      getSurveys();
    });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {surveysData.map((survey) => {
        return (
          <Card
            key={survey.id}
            className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-md mb-1"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {survey.title}
            </h3>
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
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleVote(survey.id, rating)}
                  className="px-3 py-1 rounded-full border border-gray-300"
                >
                  {rating}
                </button>
              ))}
            </div>

            <Button
              color="blue"
              className="mt-4 w-full"
              onClick={() => {
                handleVoteSubmit(survey.id);
              }}
            >
              Głosuj
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default SurveysList;
