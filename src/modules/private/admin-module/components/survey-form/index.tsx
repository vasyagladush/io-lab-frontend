// AdminVotingTemplate.js
import { Button, TextInput, Select, Label, Textarea } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { useCreateSurvey } from "../hooks/useCreateSurvey";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";
import { Spinner } from "../../../../../components/ui-kit";
import { useGetSurvey } from "../hooks/useGetSurvey";
import { useParams } from "react-router-dom";
import { useDownloadReport } from "../hooks/useDownloadReport";

const SurveyForm: FC<{ isCreating?: boolean }> = ({ isCreating = false }) => {
  const { id: surveyId } = useParams();
  const { surveyData, loading: surveyLoading, getSurvey } = useGetSurvey();

  useEffect(() => {
    if (!isCreating && surveyId) {
      getSurvey(surveyId);
    }
  }, [isCreating, surveyId]);

  useEffect(() => {
    if (surveyData) {
      setVoteName(surveyData.title);
      setStartTime(surveyData.startAt);
      setEndTime(surveyData.finishesAt);
      setDescription(surveyData.body);
    }
  }, [surveyData]);

  const [voteName, setVoteName] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, 16));
  const [description, setDescription] = useState("");
  // const [scale, setScale] = useState("1-5");

  const { createSurvey, loading } = useCreateSurvey();
  const { showNotification } = useNotification();

  const { downloadReport } = useDownloadReport();

  const handleSubmit = async () => {
    const res = await createSurvey({
      title: voteName,
      startAt: startTime,
      finishesAt: endTime,
      body: description,
    });

    if (!res)
      showNotification("Failed to create a survey", NotificationTypes.DANGER);
    else
      showNotification(
        "Survey successfully created",
        NotificationTypes.SUCCESS
      );
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
      <TextInput
        disabled={!isCreating}
        placeholder="Nazwa głosowania"
        value={voteName}
        onChange={(e) => setVoteName(e.target.value)}
      />

      <Label>Od:</Label>
      <TextInput
        disabled={!isCreating}
        type="datetime-local"
        value={startTime}
        min={new Date().toISOString().slice(0, 16)}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <Label>Do:</Label>
      <TextInput
        disabled={!isCreating}
        type="datetime-local"
        value={endTime}
        min={startTime}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <Textarea
        disabled={!isCreating}
        placeholder="Opis głosowania"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* <Label>{isCreating ? "Wybierz skalę:" : "Skala:"}</Label>
      <Select value={scale} onChange={(e) => setScale(e.target.value)}>
        disabled={!isCreating}
        <option value="1-5">Od 1 do 5</option>
        <option value="0-10">Od 0 do 10</option>
        <option value="0-5">Od 0 do 5</option>
      </Select> */}

      {isCreating && (
        <Button onClick={handleSubmit}>Wyślij {loading && <Spinner />}</Button>
      )}
      {!isCreating && (
        <Button
          disabled={!surveyId}
          color="gray"
          onClick={() => {
            downloadReport(surveyId!);
          }}
        >
          Pobierz raport
        </Button>
      )}
    </div>
  );
};

export default SurveyForm;
