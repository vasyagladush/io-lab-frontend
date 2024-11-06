// AdminVotingTemplate.js
import { Card } from "flowbite-react";
import { useEffect } from "react";
import { useGetSurveys } from "../hooks/useGetSurveys";
import { useNavigate } from "react-router-dom";
import { NavigationAppRoutes } from "../../../../../constants/navigation-routes";

const SurveysList = () => {
  const navigate = useNavigate();
  const { getSurveys, surveysData, loading } = useGetSurveys();
  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <div className="flex flex-col gap-4">
        {surveysData.map((survey) => {
          return (
            <Card
              onClick={() => {
                navigate(
                  `${NavigationAppRoutes.Private.Admin.Surveys.INDEX}/${survey.id}`
                );
              }}
              key={survey.id}
              className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-md mb-1"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {survey.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{survey.body}</p>

              <div className="flex justify-between text-sm text-gray-600">
                <div>
                  <span className="font-medium">Rozpoczęcie: </span>
                  {new Date(survey.startAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Zakończenie: </span>
                  {new Date(survey.finishesAt).toLocaleString()}
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default SurveysList;
